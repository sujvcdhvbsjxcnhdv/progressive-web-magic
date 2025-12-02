import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, Video, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const navItems = [
    { icon: Home, label: "Home", path: "/", requiresAuth: false, hasNotification: false },
    { icon: MessageCircle, label: "Chat", path: "/chat", requiresAuth: true, hasNotification: true },
    { icon: Video, label: "Video", path: "/video", requiresAuth: false, hasNotification: false },
    { icon: CreditCard, label: "Pricing", path: "/pricing", requiresAuth: false, hasNotification: false },
    { icon: User, label: "Mine", path: "/mine", requiresAuth: true, hasNotification: false },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.requiresAuth && !user) {
      setLoginMessage(`Please login to access ${item.label}.`);
      setShowLoginPrompt(true);
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors flex-1 relative",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.hasNotification && (
                  <span className="absolute top-1 right-1/2 translate-x-2 w-2 h-2 bg-red-500 rounded-full" />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        message={loginMessage}
      />
    </>
  );
};

export default BottomNav;
