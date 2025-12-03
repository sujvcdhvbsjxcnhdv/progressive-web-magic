import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Upload, ArrowLeft } from "lucide-react";
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
  {
    id: "1",
    name: "Beach Encounter",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    category: "Trending",
  },
  {
    id: "2",
    name: "Night Dance",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    category: "AI Dance",
  },
  {
    id: "3",
    name: "Cozy Moment",
    thumbnail: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
    category: "Trending",
  },
  {
    id: "4",
    name: "Party Night",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    category: "Party",
  },
  {
    id: "5",
    name: "Transform",
    thumbnail: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop",
    category: "From Creator",
  },
  {
    id: "6",
    name: "Couple Dance",
    thumbnail: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=400&h=300&fit=crop",
    category: "Couple Video",
  },
];

const categories = ["Trending", "Halloween", "From Creator", "AI Dance", "Couple Video", "Party"];

const VideoGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [quality, setQuality] = useState("standard");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [attemptedQuality, setAttemptedQuality] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleQualityChange = (value: string) => {
    if (!user && selectedFile) {
      setAttemptedQuality(value);
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
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          {/* Template Tab (Image to Video) */}
          <TabsContent value="template" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Select Template</h2>
              
              {/* Category Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer hover:shadow-lg transition-all ${
                      selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-3">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full aspect-video object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-medium text-sm">{template.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedTemplate && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Quality</h3>
                    <RadioGroup value={quality} onValueChange={handleQualityChange}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span>Standard</span>
                            <span className="text-sm text-muted-foreground">10 Credits</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                        <RadioGroupItem value="hd" id="hd" />
                        <Label htmlFor="hd" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span>HD</span>
                            <span className="text-sm text-muted-foreground">20 Credits</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="ultra" id="ultra" />
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
                    className="w-full" 
                    size="lg"
                    onClick={handleGenerate}
                  >
                    Generate Video
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Custom Tab (Text to Video) */}
          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Video Description</h3>
                  <Textarea
                    placeholder="Describe the video scene you want..."
                    className="min-h-[120px] resize-none"
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
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
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
                    <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                      <RadioGroupItem value="standard" id="text-standard" />
                      <Label htmlFor="text-standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>Standard</span>
                          <span className="text-sm text-muted-foreground">10 Credits</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                      <RadioGroupItem value="hd" id="text-hd" />
                      <Label htmlFor="text-hd" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>HD</span>
                          <span className="text-sm text-muted-foreground">20 Credits</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
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
                  className="w-full" 
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!textPrompt.trim()}
                >
                  Generate Video
                </Button>
              </CardContent>
            </Card>
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
