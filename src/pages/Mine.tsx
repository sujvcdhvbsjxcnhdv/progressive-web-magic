import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Play, Download, Sparkles, ChevronRight, Settings, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

interface VideoTask {
  id: string;
  title: string;
  status: "completed" | "processing" | "queued" | "failed";
  progress: number;
  thumbnail: string;
  videoUrl?: string;
  createdAt: Date;
  estimatedTime?: string;
}

const mockTasks: VideoTask[] = [
  {
    id: "1",
    title: "Toy box me Toy box me Toy box me",
    status: "processing",
    progress: 75,
    thumbnail: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=400&h=400&fit=crop",
    createdAt: new Date(Date.now() - 1800000),
    estimatedTime: "2 minutes",
  },
  {
    id: "2",
    title: "Toy box me",
    status: "completed",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    title: "Toy box me Toy box me Toy box me",
    status: "queued",
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
    createdAt: new Date(Date.now() - 600000),
    estimatedTime: "5 minutes",
  },
  {
    id: "4",
    title: "Toy box me Toy box me Toy box me",
    status: "queued",
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    createdAt: new Date(Date.now() - 300000),
    estimatedTime: "6 minutes",
  },
];

const Mine = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [tasks] = useState<VideoTask[]>(mockTasks);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  // Demo states - toggle to show different UI states
  const [hasVideoCredits] = useState(true); // Toggle to show no-credits state
  const videoCredits = hasVideoCredits ? 50 : 0;
  
  // Membership badges - demo values
  const chatMembershipTier = "plus"; // 'none' | 'basic' | 'plus' | 'pro'

  useEffect(() => {
    if (!user) {
      setShowLoginPrompt(true);
    }
  }, [user]);

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case "basic":
        return <Badge className="bg-purple-500 text-white text-[10px] px-1.5">PRO</Badge>;
      case "plus":
        return <Badge className="bg-pink-500 text-white text-[10px] px-1.5">PRO</Badge>;
      case "pro":
        return <Badge className="bg-yellow-500 text-white text-[10px] px-1.5">PRO</Badge>;
      default:
        return null;
    }
  };

  const renderVideoStatus = (task: VideoTask) => {
    switch (task.status) {
      case "processing":
        return (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-white text-xs">Processing...</span>
          </div>
        );
      case "completed":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          </div>
        );
      case "queued":
        return (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-orange-400">
            <span>🔥</span>
            <span>Queued · {task.estimatedTime}</span>
          </div>
        );
      case "failed":
        return (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <RotateCw className="w-6 h-6 text-white mb-1" />
            <span className="text-white text-xs">Retry</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Me</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 max-w-lg">
        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarImage src={user?.user_metadata?.avatar_url || profile?.avatar_url || undefined} />
            <AvatarFallback className="text-xl bg-primary/20">
              {profile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{profile?.username || user?.email?.split("@")[0] || "Guest User"}</h2>
            <div className="flex items-center gap-1 mt-1">
              {getMembershipBadge(chatMembershipTier)}
              {getMembershipBadge(chatMembershipTier)}
              {getMembershipBadge(chatMembershipTier)}
            </div>
          </div>
        </div>

        {/* AI Video Credits Card */}
        {hasVideoCredits ? (
          <Card className="mb-6 bg-gradient-to-r from-purple-600 to-pink-500 border-0 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-xl">{videoCredits} Credits</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full px-4"
                  onClick={() => navigate("/pricing")}
                >
                  Top Up
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6">
                <Avatar className="w-full h-full opacity-30">
                  <AvatarImage src={user?.user_metadata?.avatar_url || profile?.avatar_url || undefined} />
                </Avatar>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6 bg-gradient-to-br from-purple-900/80 to-purple-800/60 border-purple-700/50 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl">💬</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Premium Membership</h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-center gap-2">
                      <span>💬</span> Chat Freely
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✨</span> Access All Characters
                    </li>
                    <li className="flex items-center gap-2">
                      <span>⭐</span> Create 4K Videos
                    </li>
                  </ul>
                </div>
              </div>
              <Button 
                className="w-full bg-white text-purple-900 hover:bg-white/90 rounded-full font-semibold"
                onClick={() => navigate("/pricing")}
              >
                Join Now
              </Button>
              <div className="flex flex-col items-center justify-center mt-6 text-white/60">
                <div className="w-8 h-8 mb-2 opacity-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <p className="text-sm">No Video Yet</p>
                <p className="text-xs">Let's Make Your First One</p>
                <Button 
                  variant="outline"
                  className="mt-3 border-white/30 text-white hover:bg-white/10 rounded-full"
                  onClick={() => navigate("/video")}
                >
                  Create Video &gt;
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* My Videos Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">My Videos</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              More <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {tasks.map((task) => (
              <div key={task.id} className="relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                  <img
                    src={task.thumbnail}
                    alt={task.title}
                    className="w-full h-full object-cover"
                  />
                  {renderVideoStatus(task)}
                </div>
                <p className="text-sm font-medium mt-2 line-clamp-2">{task.title}</p>
                {task.status === "processing" && (
                  <p className="text-xs text-muted-foreground">{task.progress}% · {task.estimatedTime}</p>
                )}
                {task.status === "completed" && (
                  <p className="text-xs text-muted-foreground">Completed · {task.createdAt.toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={(open) => {
          setShowLoginPrompt(open);
          if (!open && !user) {
            navigate("/");
          }
        }}
        message="Please login to access your profile."
      />
    </div>
  );
};

export default Mine;