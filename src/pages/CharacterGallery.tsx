import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Coins, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
import AppSidebar from "@/components/AppSidebar";
import featuredBanner from "@/assets/featured-banner.jpg";

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
  {
    id: 5,
    name: "Nova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    description: "Fashion & lifestyle content creator",
    fullDescription: "Nova is your style guide for fashion and lifestyle content. She helps create stunning visual content for beauty, fashion, and daily life inspiration.",
    background: "A fashion enthusiast with an eye for aesthetics and trends.",
    tags: ["Fashion", "Lifestyle"],
    conversations: 5678,
  },
  {
    id: 6,
    name: "Zephyr",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    description: "Adventure & travel storyteller",
    fullDescription: "Zephyr brings excitement to your travel and adventure content. From exotic destinations to thrilling experiences, he captures the spirit of exploration.",
    background: "A world traveler with stories from every corner of the globe.",
    tags: ["Travel", "Adventure"],
    conversations: 6789,
  },
];

const CharacterGallery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const credits = 150;
  const hasNewMessages = true; // This would come from a real notification system

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="relative p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
            {hasNewMessages && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
            )}
          </button>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1">
                  VIP
                </Badge>
                <div className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-full border">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">{credits}</span>
                </div>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")} size="sm" variant="default">
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AppSidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        hasNewMessages={hasNewMessages}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Banner */}
        <Card className="mb-6 overflow-hidden border-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={featuredBanner} 
                alt="Featured Characters" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                <div className="p-4 text-white w-full">
                  <h2 className="text-lg font-bold mb-1">与AI角色互动</h2>
                  <p className="text-xs opacity-90">发现独特的虚拟角色，享受沉浸式对话体验，或生成创意视频内容</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Character Grid - Waterfall/Masonry style */}
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
      </main>

      {/* Character Detail Dialog */}
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
                  if (!user) {
                    setSelectedCharacter(null);
                    setShowLoginPrompt(true);
                  } else {
                    setSelectedCharacter(null);
                    navigate(`/chat/${selectedCharacter.id}`);
                  }
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        message="Please login to start chatting with AI characters."
      />
    </div>
  );
};

export default CharacterGallery;
