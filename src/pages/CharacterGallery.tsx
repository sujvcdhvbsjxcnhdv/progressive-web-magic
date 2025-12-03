import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
import AppSidebar from "@/components/AppSidebar";
import featuredBanner from "@/assets/featured-banner.jpg";

const characters = [
  {
    id: 1,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    description: "Luna is your creative partner in the worl..",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    tags: ["Female", "Cute"],
    conversations: 1600,
  },
  {
    id: 2,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    description: "Luna is your creative partner in the worl..",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    tags: ["Female", "Cute"],
    conversations: 1600,
  },
  {
    id: 3,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
    description: "Luna is your creative partner in the worl..",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    tags: ["Female", "Cute"],
    conversations: 1600,
  },
  {
    id: 4,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    description: "Luna is your creative partner in the worl..",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    tags: ["Female", "Cute"],
    conversations: 1600,
  },
  {
    id: 5,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop",
    description: "Luna is your creative partner in the worl..",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    tags: ["Female", "Cute"],
    conversations: 1600,
  },
  {
    id: 6,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "Luna is your creative partner in the worl..",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    tags: ["Female", "Cute"],
    conversations: 1600,
  },
];


const CharacterGallery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const credits = 151;
  const hasNewMessages = true;

  const handleStartChat = () => {
    if (!user) {
      setSelectedCharacter(null);
      setShowLoginPrompt(true);
    } else if (selectedCharacter) {
      setSelectedCharacter(null);
      navigate(`/chat/${selectedCharacter.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
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
                <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 font-semibold">
                  PRO
                </Badge>
                <div className="flex items-center gap-1.5 bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
                  <Sparkles className="w-4 h-4 text-primary" />
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
      <main className="px-4 pb-6">
        {/* Featured Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <img 
            src={featuredBanner} 
            alt="Featured" 
            className="w-full h-36 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent flex items-center">
            <div className="p-5">
              <h1 className="text-2xl font-bold text-white mb-1">Chat & Play with AI</h1>
              <p className="text-sm text-white/80">Roleplay, talk, or make videos with virtual characters</p>
            </div>
          </div>
        </div>

        {/* Character Grid - Masonry style */}
        <div className="columns-2 gap-3 space-y-3">
          {characters.map((character, index) => (
            <div
              key={`${character.id}-${index}`}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setSelectedCharacter(character)}
            >
              <div className="relative rounded-xl overflow-hidden">
                {/* Character Image */}
                <img
                  src={character.avatar}
                  alt={character.name}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'
                  }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Character Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-bold text-white text-base mb-0.5">{character.name}</h3>
                  <p className="text-xs text-white/80 line-clamp-2 mb-2">
                    {character.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {character.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Character Detail Modal - Full Screen Style */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          {/* Header Image */}
          <div className="relative">
            <img
              src={selectedCharacter.avatar}
              alt={selectedCharacter.name}
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedCharacter(null);
                setShowBackground(false);
              }}
              className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Character Info - Overlapping position */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
              <div className="flex items-end gap-3">
                <img
                  src={selectedCharacter.avatar}
                  alt={selectedCharacter.name}
                  className="w-16 h-16 rounded-full border-4 border-background object-cover shadow-lg"
                />
                <div className="pb-1">
                  <h2 className="text-xl font-bold">{selectedCharacter.name}</h2>
                  <div className="flex gap-1.5 mt-1">
                    {selectedCharacter.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content - with padding top for overlapping avatar */}
          <div className="px-4 pt-12 pb-24 space-y-5">
            <div>
              <h3 className="font-bold text-base mb-2">About</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedCharacter.fullDescription}
              </p>
            </div>
            
            <div>
              <button
                onClick={() => setShowBackground(!showBackground)}
                className="flex items-center gap-2 font-bold text-base mb-2 w-full"
              >
                <span>Background</span>
                {showBackground ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              {showBackground && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedCharacter.background}
                </p>
              )}
            </div>
          </div>

          {/* Start Chat Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
            <Button
              className="w-full h-12 text-base font-semibold rounded-full"
              size="lg"
              onClick={handleStartChat}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chat
            </Button>
          </div>
        </div>
      )}

      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        message="Please login to start chatting with AI characters."
      />
    </div>
  );
};

export default CharacterGallery;
