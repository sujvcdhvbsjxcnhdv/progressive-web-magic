import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Wand2, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: "1",
    name: "Beach Encounter",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    tags: ["Outdoor", "Romantic"],
  },
  {
    id: "2",
    name: "Night Dance",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    tags: ["Dance", "Party"],
  },
  {
    id: "3",
    name: "Cozy Moment",
    thumbnail: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
    tags: ["Indoor", "Intimate"],
  },
];

const VideoGenerator = () => {
  const [mode, setMode] = useState<"select" | "image" | "text">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleGenerate = () => {
    if (!selectedFile) {
      toast.error("Please upload an image first");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedVideo("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
      setIsGenerating(false);
      toast.success("Video generated successfully!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Video Generator</h1>
          <p className="text-muted-foreground">
            {mode === "select" && "Choose a generation mode"}
            {mode === "image" && "Upload image to generate video"}
            {mode === "text" && "Describe your video"}
          </p>
        </div>

        {mode === "select" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setMode("image")}>
              <CardContent className="p-8 text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-2">📸 Image to Video</h2>
                <p className="text-muted-foreground">Upload an image and transform it into a dynamic video</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setMode("text")}>
              <CardContent className="p-8 text-center">
                <Wand2 className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-2">✍️ Text to Video</h2>
                <p className="text-muted-foreground">Describe your vision and AI will create the video</p>
              </CardContent>
            </Card>
          </div>
        ) : !generatedVideo ? (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer hover:shadow-lg transition-all ${
                      selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full aspect-video object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {mode === "image" ? "Upload Image" : "Describe Your Video"}
                </h2>
                
                {mode === "text" && (
                  <div className="mb-4">
                    <textarea
                      className="w-full min-h-[120px] p-4 border border-input rounded-lg bg-background"
                      placeholder="Describe the content you want to create..."
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center mb-4">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {selectedFile ? selectedFile.name : "Click to upload an image"}
                    </p>
                    <Button variant="outline" type="button">
                      Select File
                    </Button>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">Realistic</Button>
                      <Button variant="outline" size="sm">Dreamy</Button>
                      <Button variant="outline" size="sm">Artistic</Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">5 seconds</Button>
                      <Button variant="outline" size="sm">10 seconds</Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMode("select");
                        setSelectedFile(null);
                        setTextPrompt("");
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      className="flex-1"
                      disabled={(mode === "image" && !selectedFile) || (mode === "text" && !textPrompt.trim()) || isGenerating}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "Generate Video (10 Credits)"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Generated Video</h2>
              <video
                src={generatedVideo}
                controls
                className="w-full rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setGeneratedVideo(null);
                    setSelectedFile(null);
                  }}
                >
                  Generate New
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoGenerator;
