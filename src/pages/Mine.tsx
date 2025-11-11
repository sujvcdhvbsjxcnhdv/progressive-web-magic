import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Play, Download, Trash2, Coins, ChevronRight, Globe } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VideoTask {
  id: string;
  title: string;
  status: "completed" | "processing" | "queued";
  progress: number;
  thumbnail: string;
  videoUrl?: string;
  createdAt: Date;
  estimatedTime?: string;
}

const mockTasks: VideoTask[] = [
  {
    id: "1",
    title: "Beach Sunset Video",
    status: "completed",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    title: "Romantic Dance Scene",
    status: "processing",
    progress: 75,
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    createdAt: new Date(Date.now() - 1800000),
    estimatedTime: "2 minutes",
  },
  {
    id: "3",
    title: "Cozy Indoor Moment",
    status: "queued",
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
    createdAt: new Date(Date.now() - 600000),
    estimatedTime: "5 minutes",
  },
];

const Mine = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<VideoTask[]>(mockTasks);
  const [language, setLanguage] = useState("en");
  const credits = 50;
  const isVip = false;

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Task deleted");
  };

  const handleDownload = (task: VideoTask) => {
    if (task.videoUrl) {
      toast.success("Downloading video...");
    }
  };

  const getStatusBadge = (status: VideoTask["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white">✅ Completed</Badge>;
      case "processing":
        return <Badge className="bg-blue-500 text-white">🔄 Processing</Badge>;
      case "queued":
        return <Badge variant="secondary">⏳ Queued</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Mine</h1>

        {/* User Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=guest" />
                <AvatarFallback>GU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Guest User</h3>
                <p className="text-sm text-muted-foreground">免费用户</p>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg">{credits} Credits</span>
              </div>
              <Button 
                size="sm"
                onClick={() => navigate("/pricing")}
              >
                充值
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Videos Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">My Videos</h2>
              {tasks.length > 0 && (
                <Button variant="ghost" size="sm">
                  更多 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                还没有生成视频
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex gap-3 p-3 rounded-lg border">
                    <img
                      src={task.thumbnail}
                      alt={task.title}
                      className="w-24 h-18 object-cover rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-medium text-sm truncate">{task.title}</h3>
                        {getStatusBadge(task.status)}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        {task.createdAt.toLocaleDateString()}
                      </p>

                      {task.status === "processing" && (
                        <div>
                          <Progress value={task.progress} className="h-1.5 mb-1" />
                          <p className="text-xs text-muted-foreground">
                            {task.progress}% • {task.estimatedTime}
                          </p>
                        </div>
                      )}

                      {task.status === "queued" && (
                        <p className="text-xs text-muted-foreground">
                          Est. {task.estimatedTime}
                        </p>
                      )}

                      {task.status === "completed" && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleDownload(task)}>
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-lg">⚙️</span> Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span>Language</span>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <button className="w-full text-left py-2 hover:text-primary transition-colors">
                服务条款
              </button>

              <button className="w-full text-left py-2 hover:text-primary transition-colors">
                隐私政策
              </button>

              <button className="w-full text-left py-2 hover:text-primary transition-colors">
                清除缓存
              </button>

              <button className="w-full text-left py-2 text-destructive hover:text-destructive/80 transition-colors flex items-center gap-2">
                <span>🚪</span> Logout
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mine;
