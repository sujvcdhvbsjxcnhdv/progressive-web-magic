import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Coins } from "lucide-react";

const characters = [
  {
    id: 1,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    description: "Creative AI companion for storytelling",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "A professional storyteller with a passion for visual narratives and creative expression.",
    tags: ["Creative", "Storytelling"],
    conversations: 1234,
  },
  {
    id: 2,
    name: "Max",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    description: "Tech expert for dynamic video creation",
    fullDescription: "Max specializes in technical and educational content. From coding tutorials to tech reviews, he helps transform your technical ideas into engaging video content.",
    background: "A tech enthusiast with deep knowledge in programming and digital innovation.",
    tags: ["Tech", "Educational"],
    conversations: 2341,
  },
  {
    id: 3,
    name: "Aria",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    description: "Wellness guide for calming videos",
    fullDescription: "Aria brings peace and mindfulness to your content. She specializes in creating serene meditation videos, wellness tips, and relaxing visual experiences.",
    background: "A certified mindfulness coach dedicated to spreading calm and positivity through visual media.",
    tags: ["Wellness", "Meditation"],
    conversations: 3456,
  },
  {
    id: 4,
    name: "Echo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    description: "Music expert for rhythm and dance videos",
    fullDescription: "Echo is your go-to companion for music-driven content. From dance videos to music visualizations, he helps you create captivating audiovisual experiences.",
    background: "A passionate musician and performer who understands the power of music in storytelling.",
    tags: ["Music", "Dance"],
    conversations: 4567,
  },
];

const CharacterGallery = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null);
  const credits = 150;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">AIVibe</h1>
            <p className="text-sm text-muted-foreground">选择你喜欢的角色扮演</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1">
              VIP
            </Badge>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border">
              <Coins className="w-5 h-5 text-primary" />
              <span className="font-bold">{credits}</span>
            </div>
          </div>
        </div>

        <Card className="mb-6 overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 border-0">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">与AI角色互动</h2>
                <p className="text-sm opacity-90">发现独特的虚拟角色，享受沉浸式对话体验，或生成创意视频内容</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters.map((character) => (
            <Card
              key={character.id}
              className="cursor-pointer hover:shadow-lg transition-all overflow-hidden"
              onClick={() => setSelectedCharacter(character)}
            >
              <CardContent className="p-0">
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold mb-1">{character.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {character.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MessageCircle className="w-3 h-3" />
                    <span>{character.conversations.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {character.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedCharacter?.name}</DialogTitle>
            </DialogHeader>
            {selectedCharacter && (
              <div className="space-y-4">
                <img
                  src={selectedCharacter.avatar}
                  alt={selectedCharacter.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCharacter.fullDescription}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Background</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCharacter.background}
                  </p>
                </div>
                <div className="flex gap-2">
                  {selectedCharacter.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setSelectedCharacter(null);
                    navigate(`/chat/${selectedCharacter.id}`);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CharacterGallery;
