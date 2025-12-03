import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Upload, ArrowLeft, Maximize2, Share2, X, Check, Camera, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

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
  { id: "4", name: "Fashion Model", thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop", category: "Trending" },
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

const samplePhotos = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=200&h=200&fit=crop",
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
  const [showPhotoSelect, setShowPhotoSelect] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [photoTab, setPhotoTab] = useState<"photos" | "collections">("photos");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success("Image uploaded successfully!");
      setShowPhotoSelect(false);
      handleGenerate();
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
    setShowPhotoSelect(false);
  };

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setShowTemplateDetail(true);
  };

  const handleGoCreate = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setShowPhotoSelect(true);
  };

  const handleSamplePhotoClick = (photoUrl: string) => {
    toast.success("Sample photo selected!");
    setShowPhotoSelect(false);
    handleGenerate();
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

  // Template Detail Page
  if (showTemplateDetail && selectedTemplate) {
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
                  setShowTemplateDetail(false);
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
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 right-12"
                onClick={() => setShowPhotoSelect(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </SheetHeader>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={photoTab === "photos" ? "default" : "outline"}
                size="sm"
                className="rounded-full flex-1"
                onClick={() => setPhotoTab("photos")}
              >
                Photos
              </Button>
              <Button
                variant={photoTab === "collections" ? "default" : "outline"}
                size="sm"
                className="rounded-full flex-1"
                onClick={() => setPhotoTab("collections")}
              >
                Collections
              </Button>
            </div>

            {photoTab === "photos" ? (
              <div className="space-y-4 overflow-y-auto max-h-[calc(70vh-140px)]">
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
                  
                  {/* Sample photos */}
                  {samplePhotos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleSamplePhotoClick(photo)}
                    >
                      <img src={photo} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[calc(70vh-140px)]">
                {[1, 2, 3].map((collection) => (
                  <div key={collection}>
                    <p className="text-sm text-muted-foreground mb-2">Collections {collection}</p>
                    <div className="grid grid-cols-4 gap-2">
                      {samplePhotos.slice(0, 4).map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleSamplePhotoClick(photo)}
                        >
                          <img src={photo} alt={`Collection ${collection} - ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Upload Guidelines Modal */}
        <Dialog open={showUploadGuide} onOpenChange={setShowUploadGuide}>
          <DialogContent className="max-w-sm">
            <DialogHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2"
                onClick={() => setShowUploadGuide(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>
            
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
                    <Label htmlFor="text-ultra" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>4K Ultra</span>
                        <span className="text-sm text-muted-foreground">50 Credits</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                className="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600" 
                size="lg"
                onClick={handleGenerate}
                disabled={!textPrompt.trim()}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Go Create
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <LoginPrompt
          open={showLoginPrompt}
          onOpenChange={setShowLoginPrompt}
          message="Please login to generate videos."
        />
      </div>
    </div>
  );
};

export default VideoGenerator;
