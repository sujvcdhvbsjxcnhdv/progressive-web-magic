import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, ArrowLeft, Maximize2, Share2, Info, X, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  videoUrl?: string;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Toy box me",
    thumbnail: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=400&h=600&fit=crop",
    category: "Trending",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "2",
    name: "Portrait Glow",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    category: "Trending",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "3",
    name: "Singing Star",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    category: "Trending",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "4",
    name: "Fashion Model",
    thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    category: "Trending",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "5",
    name: "Spooky Dance",
    thumbnail: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=600&fit=crop",
    category: "Halloween",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "6",
    name: "Ghost Filter",
    thumbnail: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?w=400&h=600&fit=crop",
    category: "Halloween",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "7",
    name: "Creator Style",
    thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop",
    category: "From Creator",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "8",
    name: "Viral Move",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    category: "From Creator",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "9",
    name: "Dance AI",
    thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
    category: "AI Dance",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "10",
    name: "Couple Magic",
    thumbnail: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&h=600&fit=crop",
    category: "Couple Video",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
];

const categories = [
  { name: "Trending", emoji: "🔥" },
  { name: "Halloween", emoji: "🎃" },
  { name: "From Creator", emoji: "✨" },
  { name: "AI Dance", emoji: "💃" },
  { name: "Couple Video", emoji: "💑" },
];

const VideoGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [quality, setQuality] = useState("standard");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showTemplateDetail, setShowTemplateDetail] = useState(false);
  const [showUploadGuide, setShowUploadGuide] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleQualityChange = (value: string) => {
    if (!user && selectedFile) {
      setShowLoginPrompt(true);
    } else {
      setQuality(value);
    }
  };

  const handleGenerate = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    const credits = quality === "standard" ? 10 : quality === "hd" ? 20 : 50;
    toast.success(`Starting video generation, will cost ${credits} credits`);
    setShowTemplateDetail(false);
  };

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setShowTemplateDetail(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: selectedTemplate?.name,
        text: `Check out this template: ${selectedTemplate?.name}`,
        url: window.location.href,
      });
    } else {
      toast.success("Link copied to clipboard!");
    }
  };

  const filteredTemplates = templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">AI Video</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="template" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-full">
            <TabsTrigger value="template" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Template
            </TabsTrigger>
            <TabsTrigger value="custom" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Custom
            </TabsTrigger>
          </TabsList>

          {/* Template Tab */}
          <TabsContent value="template" className="space-y-4">
            {/* Category Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`whitespace-nowrap rounded-full px-4 ${
                    selectedCategory === category.name 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.emoji}{category.name}
                </Button>
              ))}
            </div>

            {/* Template Grid - Masonry style */}
            <div className="grid grid-cols-2 gap-3">
              {filteredTemplates.map((template, index) => (
                <div
                  key={template.id}
                  className={`relative cursor-pointer group overflow-hidden rounded-2xl ${
                    index % 3 === 0 ? "row-span-2" : ""
                  }`}
                  onClick={() => handleTemplateClick(template)}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      index % 3 === 0 ? "h-80" : "h-40"
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="font-medium text-white text-sm">{template.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Custom Tab */}
          <TabsContent value="custom" className="space-y-6">
            <div className="bg-card rounded-2xl p-4 space-y-4 border border-border">
              <div>
                <h3 className="text-sm font-medium mb-3">Video Description</h3>
                <Textarea
                  placeholder="Describe the video scene you want..."
                  className="min-h-[120px] resize-none rounded-xl"
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground text-right mt-1">
                  {textPrompt.length}/200
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Reference Image (Optional)</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Upload a reference image to improve results
                </p>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <input
                    type="file"
                    id="text-image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="text-image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {selectedFile ? selectedFile.name : "Click to upload reference image"}
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Quality</h3>
                <RadioGroup value={quality} onValueChange={handleQualityChange}>
                  <div className="flex items-center space-x-2 p-3 border rounded-xl mb-2">
                    <RadioGroupItem value="standard" id="text-standard" />
                    <Label htmlFor="text-standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>Standard</span>
                        <span className="text-sm text-muted-foreground">10 Credits</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-xl mb-2">
                    <RadioGroupItem value="hd" id="text-hd" />
                    <Label htmlFor="text-hd" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>HD</span>
                        <span className="text-sm text-muted-foreground">20 Credits</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-xl">
                    <RadioGroupItem value="ultra" id="text-ultra" />
                    <Label htmlFor="ultra" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>4K Ultra</span>
                        <span className="text-sm text-muted-foreground">50 Credits</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                className="w-full rounded-full" 
                size="lg"
                onClick={handleGenerate}
                disabled={!textPrompt.trim()}
              >
                Generate Video
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <LoginPrompt
          open={showLoginPrompt}
          onOpenChange={setShowLoginPrompt}
          message="Please login to generate videos."
        />

        {/* Template Detail Modal */}
        <Dialog open={showTemplateDetail} onOpenChange={setShowTemplateDetail}>
          <DialogContent className={`p-0 gap-0 border-0 ${isFullscreen ? "max-w-full h-full m-0 rounded-none" : "max-w-md"}`}>
            <div className="relative bg-black">
              {/* Back button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-4 z-50 text-white bg-black/30 hover:bg-black/50 rounded-full"
                onClick={() => {
                  if (isFullscreen) {
                    setIsFullscreen(false);
                  } else {
                    setShowTemplateDetail(false);
                  }
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              {/* Info button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white bg-black/30 hover:bg-black/50 rounded-full"
                onClick={() => setShowUploadGuide(true)}
              >
                <Info className="w-5 h-5" />
              </Button>

              {/* Video/Image display */}
              <div className={`relative ${isFullscreen ? "h-screen" : "aspect-[3/4]"}`}>
                <img
                  src={selectedTemplate?.thumbnail}
                  alt={selectedTemplate?.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Action buttons on right side */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-4">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="flex flex-col items-center text-white"
                  >
                    <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs">Full Screen</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center text-white"
                  >
                    <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs">Share</span>
                  </button>
                </div>

                {/* Video progress bar */}
                <div className="absolute bottom-20 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/30 rounded-full">
                      <div className="h-full w-1/3 bg-white rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              {!isFullscreen && (
                <div className="bg-background p-4 space-y-4">
                  <h2 className="text-lg font-bold">{selectedTemplate?.name}</h2>
                  <Button 
                    className="w-full rounded-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    onClick={handleGenerate}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Start Chat
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Upload Guidelines Modal */}
        <Dialog open={showUploadGuide} onOpenChange={setShowUploadGuide}>
          <DialogContent className="max-w-sm">
            <DialogHeader className="relative">
              <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <DialogTitle className="text-center">Please upload an HD front photo</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2"
                onClick={() => setShowUploadGuide(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Correct Example of Image Upload</p>
                <div className="flex gap-4">
                  <div className="w-20 h-24 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=250&fit=crop"
                      alt="Correct example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Clear</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Facing forward</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Above shoulder</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Bad Photo</p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="relative h-16 rounded-lg overflow-hidden mb-1">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=100&fit=crop"
                        alt="Too far"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-red-500/20" />
                    </div>
                    <p className="text-xs text-center text-destructive">Too far</p>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-16 rounded-lg overflow-hidden mb-1">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop"
                        alt="Too close"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-red-500/20" />
                    </div>
                    <p className="text-xs text-center text-destructive">Too close</p>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-16 rounded-lg overflow-hidden mb-1">
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=100&fit=crop"
                        alt="Blurry"
                        className="w-full h-full object-cover blur-sm"
                      />
                      <div className="absolute inset-0 bg-red-500/20" />
                    </div>
                    <p className="text-xs text-center text-destructive">Blurry</p>
                  </div>
                </div>
              </div>

              <Button className="w-full rounded-full" size="lg">
                Upload Photo
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Tips: Take close-up shots and experiment with different poses, angles, and backgrounds.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VideoGenerator;