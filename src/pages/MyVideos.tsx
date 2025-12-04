import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, RotateCw, Trash2, Check, Sparkles } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface VideoTask {
  id: string;
  title: string;
  status: "completed" | "processing" | "queued" | "failed";
  progress: number;
  thumbnail: string;
  videoUrl?: string;
  createdAt: Date;
  estimatedTime?: string;
  templateName?: string;
  templateDescription?: string;
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
  {
    id: "5",
    title: "Beach sunset dance",
    status: "completed",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: "6",
    title: "Fashion model shoot",
    status: "completed",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    createdAt: new Date(Date.now() - 8000000),
  },
  {
    id: "7",
    title: "Dance queen video",
    status: "failed",
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    createdAt: new Date(Date.now() - 9000000),
    templateName: "Washing machine repair",
    templateDescription: "Show off your strong muscles and have everyone hooked",
  },
  {
    id: "8",
    title: "Portrait glow effect",
    status: "completed",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    createdAt: new Date(Date.now() - 10000000),
  },
  {
    id: "9",
    title: "Singing star performance",
    status: "completed",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    createdAt: new Date(Date.now() - 11000000),
  },
  {
    id: "10",
    title: "Glam look transformation",
    status: "completed",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    createdAt: new Date(Date.now() - 12000000),
  },
];

const MyVideos = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<VideoTask[]>(mockTasks.slice(0, 10));
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [retryTask, setRetryTask] = useState<VideoTask | null>(null);

  const toggleSelectMode = () => {
    if (isSelectMode) {
      setSelectedIds(new Set());
    }
    setIsSelectMode(!isSelectMode);
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleDelete = () => {
    setTasks(tasks.filter(task => !selectedIds.has(task.id)));
    setSelectedIds(new Set());
    setIsSelectMode(false);
    setShowDeleteDialog(false);
  };

  const handleTaskClick = (task: VideoTask) => {
    if (isSelectMode) {
      toggleSelect(task.id);
      return;
    }

    if (task.status === "completed") {
      navigate(`/video/${task.id}`);
    } else if (task.status === "failed") {
      setRetryTask(task);
    }
  };

  const handleRetry = () => {
    // In real app, this would restart the video generation
    if (retryTask) {
      setTasks(tasks.map(t => 
        t.id === retryTask.id 
          ? { ...t, status: "processing" as const, progress: 0 }
          : t
      ));
    }
    setRetryTask(null);
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
      case "failed":
        return (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <RotateCw className="w-6 h-6 text-white mb-1" />
            <span className="text-white text-xs">Failed, try again</span>
          </div>
        );
      default:
        return null;
    }
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
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSelectMode}
            className={isSelectMode ? "text-primary" : ""}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 max-w-lg">
        <div className="grid grid-cols-2 gap-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="relative cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                <img
                  src={task.thumbnail}
                  alt={task.title}
                  className="w-full h-full object-cover"
                />
                {!isSelectMode && renderVideoStatus(task)}
                {isSelectMode && (
                  <div className="absolute top-2 right-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedIds.has(task.id) 
                        ? "bg-primary border-primary" 
                        : "border-white bg-black/30"
                    }`}>
                      {selectedIds.has(task.id) && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm font-medium mt-2 line-clamp-2">{task.title}</p>
              {task.status === "processing" && (
                <p className="text-xs text-muted-foreground">{task.progress}% · {task.estimatedTime}</p>
              )}
              {task.status === "completed" && (
                <p className="text-xs text-muted-foreground">Completed · {task.createdAt.toLocaleDateString()}</p>
              )}
              {task.status === "failed" && (
                <p className="text-xs text-red-400">Failed, try again</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Button - Fixed at bottom when in select mode */}
      {isSelectMode && selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
          <Button 
            variant="destructive" 
            className="px-8"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete ({selectedIds.size})
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-xs">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Delete {selectedIds.size} video{selectedIds.size > 1 ? 's' : ''}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-4 sm:justify-center">
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel className="bg-transparent border-0 hover:bg-muted">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Retry Dialog */}
      <Dialog open={!!retryTask} onOpenChange={(open) => !open && setRetryTask(null)}>
        <DialogContent className="max-w-xs p-0 bg-background border-border overflow-hidden">
          <div className="p-4">
            {retryTask && (
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden relative bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                  <img
                    src={retryTask.thumbnail}
                    alt={retryTask.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70 w-8 h-8">
                      <RotateCw className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{retryTask.templateName || retryTask.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {retryTask.templateDescription || "Show off your strong muscles and have everyone hooked"}
                  </p>
                </div>

                <Button 
                  className="w-full rounded-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold"
                  onClick={handleRetry}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyVideos;