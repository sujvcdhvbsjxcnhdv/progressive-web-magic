import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
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
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [quality, setQuality] = useState("standard");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success("图片上传成功！");
    }
  };

  const handleGenerate = () => {
    const credits = quality === "standard" ? 10 : quality === "hd" ? 20 : 50;
    toast.success(`开始生成视频，将消耗 ${credits} 积分`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">AI 视频</h1>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="image">图生视频</TabsTrigger>
            <TabsTrigger value="text">文生视频</TabsTrigger>
          </TabsList>

          {/* 图生视频 Tab */}
          <TabsContent value="image" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">选择模板</h2>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
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
                      <h3 className="font-medium text-sm mb-1">{template.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {template.tags.join(" · ")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-3">
                      {selectedFile ? selectedFile.name : "点击上传参考图"}
                    </p>
                  </label>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">质量</h3>
                  <RadioGroup value={quality} onValueChange={setQuality}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>标准</span>
                          <span className="text-sm text-muted-foreground">10 积分</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                      <RadioGroupItem value="hd" id="hd" />
                      <Label htmlFor="hd" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>高清</span>
                          <span className="text-sm text-muted-foreground">20 积分</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="ultra" id="ultra" />
                      <Label htmlFor="ultra" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>超清</span>
                          <span className="text-sm text-muted-foreground">50 积分</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!selectedTemplate || !selectedFile}
                >
                  生成视频
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 文生视频 Tab */}
          <TabsContent value="text" className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">视频描述</h3>
                  <Textarea
                    placeholder="描述你想要的视频场景..."
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
                  <h3 className="text-sm font-medium mb-2">参考图片（可选）</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    上传参考图可提升效果(可选)
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
                        {selectedFile ? selectedFile.name : "点击上传参考图"}
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">质量</h3>
                  <RadioGroup value={quality} onValueChange={setQuality}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                      <RadioGroupItem value="standard" id="text-standard" />
                      <Label htmlFor="text-standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>标准</span>
                          <span className="text-sm text-muted-foreground">10 积分</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                      <RadioGroupItem value="hd" id="text-hd" />
                      <Label htmlFor="text-hd" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>高清</span>
                          <span className="text-sm text-muted-foreground">20 积分</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="ultra" id="text-ultra" />
                      <Label htmlFor="text-ultra" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>超清</span>
                          <span className="text-sm text-muted-foreground">50 积分</span>
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
                  生成视频
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoGenerator;
