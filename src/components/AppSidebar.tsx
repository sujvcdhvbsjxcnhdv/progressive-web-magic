import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, Video, CreditCard, User, Sun, Moon, Monitor } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasNewMessages?: boolean;
}

type Theme = "light" | "dark" | "system";

const AppSidebar = ({ open, onOpenChange, hasNewMessages = true }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const [theme, setTheme] = useState<Theme>("dark");

  const navItems = [
    { icon: Home, label: "Home", path: "/", hasNotification: false },
    { icon: MessageCircle, label: "Chat", path: "/chat", hasNotification: hasNewMessages },
    { icon: Video, label: "Video", path: "/video", hasNotification: false },
    { icon: CreditCard, label: "Pricing", path: "/pricing", hasNotification: false, tag: "Check your Plan" },
    { icon: User, label: "Mine", path: "/mine", hasNotification: false },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const handleNavigation = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 bg-background border-r border-border">
        <SheetHeader className="p-6 pb-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="text-2xl bg-secondary">
                {user ? (profile?.username?.charAt(0).toUpperCase() || "U") : "?"}
              </AvatarFallback>
            </Avatar>
            
            {/* Theme Toggle */}
            <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "light" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "dark" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "system" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>
        </SheetHeader>

        <nav className="px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors relative",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.hasNotification && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </div>
                <span className="font-medium">{item.label}</span>
                {item.tag && (
                  <span className="ml-auto text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default AppSidebar;
