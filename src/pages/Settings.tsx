import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Shield, Trash2, Zap, Video, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import UserAvatarMenu from "@/components/UserAvatarMenu";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock subscription data - replace with real data from database
const mockChatSubscription = {
  plan: "Plus",
  credits: 13164,
  dailyCredits: 60,
  membershipCredits: 13014,
  bonusCredits: 90,
  expiredDate: "2025-12-27",
  price: "$14.99",
  billingPeriod: "Monthly",
  billingRenewal: "2025-12-27",
};

const mockVideoSubscription = {
  plan: "Weekly",
  credits: 500,
  expiredDate: "2025-12-10",
  price: "$4.99",
  billingPeriod: "Weekly",
  billingRenewal: "2025-12-10",
};

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showChatSubscription, setShowChatSubscription] = useState(false);
  const [showVideoSubscription, setShowVideoSubscription] = useState(false);
  
  // Demo states - in real app, fetch from database
  const [hasChatSubscription] = useState(true);
  const [hasVideoSubscription] = useState(true);
  const userCredits = 13164;

  const handleClearCache = () => {
    toast.success("Cache cleared successfully!");
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // Get membership badge color
  const getMembershipBadge = () => {
    if (!hasChatSubscription) return null;
    const plan = mockChatSubscription.plan;
    if (plan === "Basic") return <Badge className="bg-purple-500 text-white text-xs">Basic</Badge>;
    if (plan === "Plus") return <Badge className="bg-pink-500 text-white text-xs">Plus</Badge>;
    if (plan === "Pro Yearly") return <Badge className="bg-yellow-500 text-white text-xs">Pro</Badge>;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/");
                }
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Setting</h1>
          </div>
          <div className="flex items-center gap-3">
            {getMembershipBadge()}
            {user && (
              <div className="flex items-center gap-1 text-sm">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>{userCredits.toLocaleString()}</span>
              </div>
            )}
            <UserAvatarMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-lg space-y-4">
        {/* Subscription Info Card */}
        <Card>
          <CardContent className="p-4 space-y-1">
            <button 
              className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors"
              onClick={() => setShowChatSubscription(true)}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Chat Membership</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                {hasChatSubscription && (
                  <span className="text-sm text-pink-500">{mockChatSubscription.plan}</span>
                )}
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
            
            <button 
              className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors"
              onClick={() => setShowVideoSubscription(true)}
            >
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-purple-500" />
                <span>Video Membership</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                {hasVideoSubscription && (
                  <span className="text-sm text-purple-500">{mockVideoSubscription.plan}</span>
                )}
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card>
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

      {/* Chat Subscription Dialog */}
      <Dialog open={showChatSubscription} onOpenChange={setShowChatSubscription}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Chat Membership
            </DialogTitle>
          </DialogHeader>
          
          {hasChatSubscription ? (
            <div className="space-y-4">
              {/* My Plan */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">My Plan</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-pink-500 font-semibold">{mockChatSubscription.plan}</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-lg">{mockChatSubscription.credits.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted px-3 py-1 rounded-full text-xs">Daily: <strong>{mockChatSubscription.dailyCredits}</strong></span>
                  <span className="bg-muted px-3 py-1 rounded-full text-xs">Membership: <strong>{mockChatSubscription.membershipCredits.toLocaleString()}</strong></span>
                  <span className="bg-muted px-3 py-1 rounded-full text-xs">Bonus: <strong>{mockChatSubscription.bonusCredits}</strong></span>
                </div>
              </div>
              
              {/* Billing Info */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Billing & Payment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expired Date</span>
                    <span>{mockChatSubscription.expiredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span>{mockChatSubscription.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing Period</span>
                    <span>{mockChatSubscription.billingPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing Renewal</span>
                    <span>{mockChatSubscription.billingRenewal}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No active subscription</p>
              <Button onClick={() => navigate("/pricing")}>Subscribe Now</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Subscription Dialog */}
      <Dialog open={showVideoSubscription} onOpenChange={setShowVideoSubscription}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-500" />
              Video Membership
            </DialogTitle>
          </DialogHeader>
          
          {hasVideoSubscription ? (
            <div className="space-y-4">
              {/* My Plan */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">My Plan</span>
                  <button 
                    className="text-xs text-primary underline cursor-pointer"
                    onClick={() => {
                      setShowVideoSubscription(false);
                      navigate("/credits-history");
                    }}
                  >
                    Credits Usage Details
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-purple-500 font-semibold">{mockVideoSubscription.plan}</span>
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4 text-purple-500" />
                    <span className="font-bold text-lg">{mockVideoSubscription.credits} credits</span>
                  </div>
                </div>
              </div>
              
              {/* Billing Info */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Billing & Payment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expired Date</span>
                    <span>{mockVideoSubscription.expiredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span>{mockVideoSubscription.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing Period</span>
                    <span>{mockVideoSubscription.billingPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing Renewal</span>
                    <span>{mockVideoSubscription.billingRenewal}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No active subscription</p>
              <Button onClick={() => navigate("/pricing")}>Subscribe Now</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="max-w-xs">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Are you sure you want to logout?
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
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;