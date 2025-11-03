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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
          <h1 className="text-3xl font-bold mb-2">AI Video Generator</h1>
          <p className="text-muted-foreground">Transform images into dynamic videos</p>
        </div>

        {!generatedVideo ? (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full aspect-video object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
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

                  <Button
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={!selectedFile || isGenerating}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Video"}
                  </Button>
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
