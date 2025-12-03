import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, FileText, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleClearCache = () => {
    toast.success("Cache cleared successfully!");
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Setting</h1>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.user_metadata?.avatar_url || profile?.avatar_url || undefined} />
            <AvatarFallback className="text-sm bg-primary/20">
              {profile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-lg">
        <Card className="mb-6">
          <CardContent className="p-4 space-y-1">
            <button 
              className="w-full flex items-center gap-3 py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors"
              onClick={() => toast.info("Terms of Service")}
            >
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span>Terms of Service</span>
            </button>
            
            <button 
              className="w-full flex items-center gap-3 py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors"
              onClick={() => toast.info("Privacy Policy")}
            >
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span>Privacy Policy</span>
            </button>
            
            <button 
              className="w-full flex items-center gap-3 py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors"
              onClick={handleClearCache}
            >
              <Trash2 className="w-5 h-5 text-muted-foreground" />
              <span>Clear Cache</span>
            </button>
          </CardContent>
        </Card>

        <button 
          className="w-full text-center py-3 text-primary hover:text-primary/80 transition-colors font-medium"
          onClick={() => setShowLogoutDialog(true)}
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="max-w-xs">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Are You Sure To Delete The Account?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-4 sm:justify-center">
            <AlertDialogAction 
              onClick={handleLogout}
              className="bg-transparent text-destructive hover:bg-destructive/10 border-0"
            >
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel className="bg-transparent border-0 hover:bg-muted">
              Later
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;