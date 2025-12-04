import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginEmptyStateProps {
  message?: string;
}

const LoginEmptyState = ({ message }: LoginEmptyStateProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <LogIn className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-xl font-bold mb-2">Login Required</h2>
      <p className="text-muted-foreground mb-6 max-w-xs">
        {message || "You need to login to access this feature."}
      </p>
      <Button
        onClick={() => navigate(`/auth?returnUrl=${encodeURIComponent(location.pathname)}`)}
        className="gap-2 px-8"
      >
        <LogIn className="w-4 h-4" />
        Login
      </Button>
    </div>
  );
};

export default LoginEmptyState;
