import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, Video, CreditCard, User, Download } from "lucide-react";
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

const AppSidebar = ({ open, onOpenChange, hasNewMessages = true }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const navItems = [
    { icon: Home, label: "Home", path: "/", hasNotification: false },
    { icon: MessageCircle, label: "Chat", path: "/chat", hasNotification: hasNewMessages },
    { icon: Video, label: "Video", path: "/video", hasNotification: false },
    { icon: CreditCard, label: "Pricing", path: "/pricing", hasNotification: false, tag: "Check your Plan" },
    { icon: User, label: "Mine", path: "/mine", hasNotification: false },
  ];


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
            
            {/* Add to Desktop Button */}
            <button
              onClick={async () => {
                if (deferredPrompt) {
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  if (outcome === 'accepted') {
                    setDeferredPrompt(null);
                  }
                } else {
                  // Fallback for iOS or if prompt not available
                  alert('To install: tap the share button and select "Add to Home Screen"');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              Add to Desktop
            </button>
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
