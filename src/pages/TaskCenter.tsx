import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

const TaskCenter = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<VideoTask[]>(mockTasks);

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
        return <Badge className="bg-green-500">✅ Completed</Badge>;
      case "processing":
        return <Badge className="bg-blue-500">🔄 Processing</Badge>;
      case "queued":
        return <Badge variant="secondary">⏳ Queued</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">My Video Tasks</h1>
            <p className="text-sm text-muted-foreground">{tasks.length} tasks in queue</p>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={task.thumbnail}
                    alt={task.title}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {task.createdAt.toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>

                    {task.status === "processing" && (
                      <div className="mb-3">
                        <Progress value={task.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {task.progress}% • Est. {task.estimatedTime}
                        </p>
                      </div>
                    )}

                    {task.status === "queued" && (
                      <p className="text-sm text-muted-foreground mb-3">
                        Waiting in queue • Est. {task.estimatedTime}
                      </p>
                    )}

                    <div className="flex gap-2">
                      {task.status === "completed" && task.videoUrl && (
                        <>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            Play
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDownload(task)}>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Button
            className="w-full"
            onClick={() => navigate("/video")}
          >
            Create New Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCenter;
