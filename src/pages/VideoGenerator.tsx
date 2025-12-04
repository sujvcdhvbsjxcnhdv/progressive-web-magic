import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, Maximize2, Share2, X, Check, Camera, Sparkles, Plus, Settings2, RotateCw, Crop } from "lucide-react";
import UserAvatarMenu from "@/components/UserAvatarMenu";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
import BottomNav from "@/components/BottomNav";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
}

const templates: Template[] = [
  { id: "1", name: "Toy box me", thumbnail: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=400&h=400&fit=crop", category: "Trending" },
  { id: "2", name: "Portrait Glow", thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", category: "Trending" },
  { id: "3", name: "Singing Star", thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", category: "Trending" },
  { id: "4", name: "Fashion Model", thumbnail: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=400&fit=crop", category: "Trending" },
  { id: "5", name: "Dance Queen", thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop", category: "Trending" },
  { id: "6", name: "Glam Look", thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop", category: "Trending" },
  { id: "7", name: "Spooky Dance", thumbnail: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=400&fit=crop", category: "Halloween" },
  { id: "8", name: "Ghost Filter", thumbnail: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?w=400&h=400&fit=crop", category: "Halloween" },
  { id: "9", name: "Witch Vibes", thumbnail: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop", category: "Halloween" },
  { id: "10", name: "Pumpkin Magic", thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop", category: "Halloween" },
  { id: "11", name: "Creator Style", thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", category: "From Creator" },
  { id: "12", name: "Viral Move", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", category: "From Creator" },
  { id: "13", name: "Trending Now", thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop", category: "From Creator" },
  { id: "14", name: "Influencer", thumbnail: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop", category: "From Creator" },
  { id: "15", name: "Dance AI", thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", category: "AI Dance" },
  { id: "16", name: "Move Master", thumbnail: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=400&fit=crop", category: "AI Dance" },
  { id: "17", name: "Rhythm Queen", thumbnail: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=400&fit=crop", category: "AI Dance" },
  { id: "18", name: "Couple Magic", thumbnail: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&h=400&fit=crop", category: "Couple Video" },
  { id: "19", name: "Love Story", thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop", category: "Couple Video" },
  { id: "20", name: "Together", thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop", category: "Couple Video" },
];

// Sample photos (first 3 are samples with label)
const samplePhotos = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
];

// User's photos (demo data with different images)
const userPhotos = [
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
];

const categories = [
  { name: "Trending", emoji: "🔥" },
  { name: "Halloween", emoji: "🎃" },
  { name: "From Creator", emoji: "✨" },
  { name: "AI Dance", emoji: "💃" },
  { name: "Couple Video", emoji: "💑" },
];

type ViewMode = "list" | "template-detail" | "quality-select" | "processing";

const VideoGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [quality, setQuality] = useState("balanced");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showUploadGuide, setShowUploadGuide] = useState(false);
  const [showPhotoSelect, setShowPhotoSelect] = useState(false);
  const [showQualitySheet, setShowQualitySheet] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setSelectedPhotoUrl(url);
      toast.success("Image uploaded successfully!");
      setShowPhotoSelect(false);
      setViewMode("quality-select");
    }
  };

  const handleCustomImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCustomImage(url);
      toast.success("Image added!");
    }
  };

  const handleGenerate = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    const credits = quality === "instant" ? 100 : quality === "balanced" ? 150 : 300;
    toast.success(`Starting video generation, will cost ${credits} credits`);
    setViewMode("processing");
  };

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setViewMode("template-detail");
  };

  const handleGoCreate = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setShowPhotoSelect(true);
  };

  const handlePhotoClick = (photoUrl: string) => {
    setSelectedPhotoUrl(photoUrl);
    setShowPhotoSelect(false);
    setViewMode("quality-select");
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

  // Processing Page
  if (viewMode === "processing") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
          <div className="relative w-48 h-64 rounded-2xl overflow-hidden mb-6">
            <img
              src={selectedPhotoUrl || selectedTemplate?.thumbnail}
              alt="Processing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white font-medium">Processing..</p>
            </div>
          </div>
          <p className="text-muted-foreground text-center">
            Ready soon. You can leave this screen.
          </p>
        </div>

        <div className="p-6 space-y-3">
          <Button
            className="w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white"
            size="lg"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full border-purple-400 text-purple-400 hover:bg-purple-400/10"
            size="lg"
            onClick={() => {
              setViewMode("list");
              setSelectedPhotoUrl(null);
            }}
          >
            Template
          </Button>
        </div>
      </div>
    );
  }

  // Quality Selection Page
  if (viewMode === "quality-select" && selectedPhotoUrl) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="p-4 flex items-center justify-center relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4"
            onClick={() => {
              setViewMode("template-detail");
              setSelectedPhotoUrl(null);
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Select Quality</h1>
        </header>

        <div className="flex-1 px-6 py-4">
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-64 rounded-2xl overflow-hidden">
              <img
                src={selectedPhotoUrl}
                alt="Selected"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                <button className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white">
                  <RotateCw className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white">
                  <Crop className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-medium mb-4">Choose Mode</h3>
          <div className="space-y-3">
            <button
              onClick={() => setQuality("instant")}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${
                quality === "instant" 
                  ? "border-pink-500 bg-pink-500/10" 
                  : "border-border hover:border-pink-500/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Instant Mode</span>
                    <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">PRO</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Fast generation, lower quality · 100 credits</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${quality === "instant" ? "border-pink-500 bg-pink-500" : "border-muted-foreground"}`}>
                {quality === "instant" && <div className="w-full h-full rounded-full bg-pink-500" />}
              </div>
            </button>

            <button
              onClick={() => setQuality("balanced")}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${
                quality === "balanced" 
                  ? "border-pink-500 bg-pink-500/10" 
                  : "border-border hover:border-pink-500/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Balanced Mode</span>
                    <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">PRO</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Balanced speed and clarity · 150 credits</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${quality === "balanced" ? "border-pink-500 bg-pink-500" : "border-muted-foreground"}`}>
                {quality === "balanced" && <div className="w-full h-full rounded-full bg-pink-500" />}
              </div>
            </button>

            <button
              onClick={() => setQuality("ultra")}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${
                quality === "ultra" 
                  ? "border-pink-500 bg-pink-500/10" 
                  : "border-border hover:border-pink-500/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">HD</span>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Ultra Mode</span>
                    <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">PRO</span>
                  </div>
                  <p className="text-xs text-muted-foreground">High definition with fine detail · 300 credits</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${quality === "ultra" ? "border-pink-500 bg-pink-500" : "border-muted-foreground"}`}>
                {quality === "ultra" && <div className="w-full h-full rounded-full bg-pink-500" />}
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          <Button
            className="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium"
            size="lg"
            onClick={handleGenerate}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create
          </Button>
        </div>

        <LoginPrompt
          open={showLoginPrompt}
          onOpenChange={setShowLoginPrompt}
          message="Please login to generate videos."
        />
      </div>
    );
  }

  // Template Detail Page
  if (viewMode === "template-detail" && selectedTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <div className={`relative ${isFullscreen ? "h-screen" : ""}`}>
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black/30 hover:bg-black/50 rounded-full"
              onClick={() => {
                if (isFullscreen) {
                  setIsFullscreen(false);
                } else {
                  setViewMode("list");
                }
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black/30 hover:bg-black/50 rounded-full"
              onClick={() => setShowUploadGuide(true)}
            >
              <span className="text-sm font-medium">ⓘ</span>
            </Button>
          </div>

          {/* Video/Image display */}
          <div className={`relative ${isFullscreen ? "h-screen" : "aspect-[3/4]"}`}>
            <img
              src={selectedTemplate.thumbnail}
              alt={selectedTemplate.name}
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
              <h2 className="text-lg font-bold">{selectedTemplate.name}</h2>
              <Button 
                className="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium" 
                size="lg"
                onClick={handleGoCreate}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Go Create
              </Button>
            </div>
          )}
        </div>

        {/* Photo Selection Sheet */}
        <Sheet open={showPhotoSelect} onOpenChange={setShowPhotoSelect}>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
            <SheetHeader className="relative pb-4">
              <div className="absolute right-0 top-0">
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                  <img 
                    src={selectedTemplate.thumbnail} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <SheetTitle className="text-left">Select Photo</SheetTitle>
            </SheetHeader>

            <div className="space-y-4 overflow-y-auto max-h-[calc(70vh-100px)]">
              {/* Recent section with camera and photos */}
              <p className="text-sm text-muted-foreground">Recent</p>
              <div className="grid grid-cols-4 gap-2">
                {/* Camera button */}
                <label className="aspect-square rounded-xl bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Camera className="w-6 h-6 text-muted-foreground" />
                </label>
                
                {/* Sample photos (first 3 with "Sample" badge) */}
                {samplePhotos.map((photo, index) => (
                  <div
                    key={`sample-${index}`}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <img src={photo} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">Sample</span>
                  </div>
                ))}
              </div>
              
              {/* User's photos */}
              <div className="grid grid-cols-4 gap-2">
                {userPhotos.map((photo, index) => (
                  <div
                    key={`user-${index}`}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <img src={photo} alt={`User photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Upload Guidelines Modal */}
        <Dialog open={showUploadGuide} onOpenChange={setShowUploadGuide}>
          <DialogContent className="max-w-sm [&>button]:hidden">
            <div className="flex justify-end -mt-2 -mr-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploadGuide(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Good photos
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
                        alt="Clear"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">Clear</p>
                  </div>
                  <div className="space-y-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop"
                        alt="Facing forward"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">Facing forward</p>
                  </div>
                  <div className="space-y-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
                        alt="Above shoulder"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">Above shoulder</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Bad photos
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop"
                        alt="Too far"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-destructive">Too far</p>
                  </div>
                  <div className="space-y-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                        alt="Too close"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-destructive">Too close</p>
                  </div>
                  <div className="space-y-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop"
                        alt="Blurry"
                        className="w-full h-full object-cover blur-sm"
                      />
                      <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-destructive">Blurry</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-sm font-medium mb-1">Photo Tips</p>
                <p className="text-xs text-muted-foreground">
                  Take close-up shots and experiment with different poses, angles, and backgrounds.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <LoginPrompt
          open={showLoginPrompt}
          onOpenChange={setShowLoginPrompt}
          message="Please login to generate videos."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with back button */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">AI Video</h1>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <>
                <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full font-medium">PRO</span>
                <span className="text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  151
                </span>
              </>
            )}
            {user ? (
              <UserAvatarMenu />
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/auth")}
                className="text-primary font-medium"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="template" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-full">
            <TabsTrigger value="template" className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground">
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

            {/* Template Grid - Uniform sizes */}
            <div className="grid grid-cols-2 gap-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="relative cursor-pointer group overflow-hidden rounded-2xl aspect-square"
                  onClick={() => handleTemplateClick(template)}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            <div>
              <h3 className="text-base font-semibold mb-3">Type your idea</h3>
              <Textarea
                placeholder="Scene + motion + camera
e.g., Wear ethereal wings and dazzle like a..."
                className="min-h-[120px] resize-none rounded-xl bg-card border-border"
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground text-right mt-1">
                {textPrompt.length}/200
              </p>
            </div>

            <div className="flex gap-3">
              <label className="flex-1 border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleCustomImageChange}
                />
                {customImage ? (
                  <div className="relative">
                    <img src={customImage} alt="Custom" className="w-16 h-16 rounded-lg object-cover" />
                    <button 
                      onClick={(e) => { e.preventDefault(); setCustomImage(null); }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-background rounded-full flex items-center justify-center border"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">Add Image</span>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </>
                )}
              </label>

              <button 
                onClick={() => setShowQualitySheet(true)}
                className="flex-1 border border-border rounded-xl p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
              >
                <Settings2 className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-sm font-medium">Standard</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  10 Credits
                </span>
              </button>
            </div>

            <Button 
              className="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600" 
              size="lg"
              onClick={handleGenerate}
              disabled={!textPrompt.trim()}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create
            </Button>
          </TabsContent>
        </Tabs>

        {/* Quality Selection Sheet for Custom */}
        <Sheet open={showQualitySheet} onOpenChange={setShowQualitySheet}>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle>Choose Mode</SheetTitle>
            </SheetHeader>
            <div className="space-y-3 pb-6">
              <button
                onClick={() => { setQuality("standard"); setShowQualitySheet(false); }}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between ${
                  quality === "standard" ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Standard</span>
                </div>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  10 Credits
                </span>
              </button>
              <button
                onClick={() => { setQuality("hd"); setShowQualitySheet(false); }}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between ${
                  quality === "hd" ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <span className="font-medium">HD</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  20 Credits
                </span>
              </button>
              <button
                onClick={() => { setQuality("4k"); setShowQualitySheet(false); }}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between ${
                  quality === "4k" ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <span className="font-medium">4K</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  50 Credits
                </span>
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <LoginPrompt
          open={showLoginPrompt}
          onOpenChange={setShowLoginPrompt}
          message="Please login to generate videos."
        />
        <BottomNav />
      </div>
    </div>
  );
};

export default VideoGenerator;
