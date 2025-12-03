import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
import AppSidebar from "@/components/AppSidebar";
import PromoBanner from "@/components/PromoBanner";
import UserAvatarMenu from "@/components/UserAvatarMenu";

const characters = [
  {
    id: 1,
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    description: "Luna is your creative partner in the worl..",
    fullDescription: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    background: "Luna is your creative partner in the world of imagination. She excels at brainstorming ideas, crafting compelling narratives, and bringing your stories to life through AI-generated videos.",
    tags: ["Female", "Cute"],
  },
  {
    id: 2,
    name: "Aria",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    description: "Aria brings elegance and wisdom to every..",
    fullDescription: "Aria brings elegance and wisdom to every conversation. With her calm demeanor and thoughtful insights, she helps you navigate creative challenges with grace.",
    background: "Born from the fusion of art and technology, Aria has spent years studying human creativity and emotional intelligence to become the perfect creative companion.",
    tags: ["Female", "Elegant"],
  },
  {
    id: 3,
    name: "Maya",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
    description: "Maya is the adventurous spirit who loves..",
    fullDescription: "Maya is the adventurous spirit who loves exploring new ideas and pushing creative boundaries. She's always ready for the next exciting project.",
    background: "Growing up in a world of endless possibilities, Maya developed a passion for adventure and storytelling that makes every interaction feel like a new journey.",
    tags: ["Female", "Adventurous"],
  },
  {
    id: 4,
    name: "Sophie",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    description: "Sophie is your go-to companion for deep..",
    fullDescription: "Sophie is your go-to companion for deep conversations and meaningful connections. She listens attentively and offers thoughtful perspectives.",
    background: "With a background in psychology and creative arts, Sophie understands the human mind and uses this knowledge to create meaningful, impactful content.",
    tags: ["Female", "Thoughtful"],
  },
  {
    id: 5,
    name: "Chloe",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop",
    description: "Chloe brings energy and enthusiasm to..",
    fullDescription: "Chloe brings energy and enthusiasm to every project. Her positive attitude and creative spark make collaborating a joy.",
    background: "A natural entertainer at heart, Chloe has always been the life of the party. She channels that energy into helping you create vibrant, engaging content.",
    tags: ["Female", "Energetic"],
  },
  {
    id: 6,
    name: "Max",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "Max is the cool and confident creator..",
    fullDescription: "Max is the cool and confident creator who helps you bring bold ideas to life. His expertise spans multiple creative domains.",
    background: "With years of experience in digital content creation, Max has mastered the art of turning simple concepts into stunning visual stories.",
    tags: ["Male", "Cool"],
  },
  {
    id: 7,
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
    description: "Emma is the nurturing guide who helps..",
    fullDescription: "Emma is the nurturing guide who helps you develop your creative vision. She provides gentle encouragement and expert guidance.",
    background: "Emma spent years as a creative mentor before joining our team. Her patience and understanding make her perfect for helping newcomers find their voice.",
    tags: ["Female", "Nurturing"],
  },
  {
    id: 8,
    name: "Jake",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
    description: "Jake is the tech-savvy innovator who..",
    fullDescription: "Jake is the tech-savvy innovator who brings cutting-edge ideas to your projects. He's always exploring new ways to push creative boundaries.",
    background: "A former software engineer turned creative technologist, Jake bridges the gap between art and technology to create truly unique experiences.",
    tags: ["Male", "Tech-savvy"],
  },
  {
    id: 9,
    name: "Lily",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    description: "Lily is the artistic soul who sees beauty..",
    fullDescription: "Lily is the artistic soul who sees beauty in everything. Her aesthetic sensibility helps transform ordinary content into visual masterpieces.",
    background: "Trained in classical arts and modern design, Lily brings a unique perspective that blends traditional beauty with contemporary trends.",
    tags: ["Female", "Artistic"],
  },
  {
    id: 10,
    name: "Ryan",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
    description: "Ryan is the storyteller who crafts..",
    fullDescription: "Ryan is the storyteller who crafts compelling narratives that captivate audiences. His talent for words brings depth to every project.",
    background: "From screenplay writing to content creation, Ryan has honed his craft across multiple mediums, becoming a master of digital storytelling.",
    tags: ["Male", "Storyteller"],
  },
  {
    id: 11,
    name: "Zoe",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop",
    description: "Zoe is the trendsetter who stays ahead..",
    fullDescription: "Zoe is the trendsetter who stays ahead of the curve. She knows what's hot and helps you create content that resonates with modern audiences.",
    background: "With her finger on the pulse of social media and pop culture, Zoe transforms trending concepts into viral-worthy content.",
    tags: ["Female", "Trendy"],
  },
  {
    id: 12,
    name: "Alex",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop",
    description: "Alex is the versatile creator who adapts..",
    fullDescription: "Alex is the versatile creator who adapts to any style or genre. Whether it's comedy, drama, or documentary, Alex delivers excellence.",
    background: "Having worked across diverse creative fields, Alex brings a wealth of experience and adaptability to every collaboration.",
    tags: ["Male", "Versatile"],
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
                <UserAvatarMenu />
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
        {/* Promotional Banner */}
        <PromoBanner />

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
          {/* Fixed Header - Same as Home */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCharacter(null);
                  setShowBackground(false);
                }}
                className="relative p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
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
                    <UserAvatarMenu />
                  </>
                ) : (
                  <Button onClick={() => navigate("/auth")} size="sm" variant="default">
                    Login
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Character Image */}
          <div className="px-4">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={selectedCharacter.avatar}
                alt={selectedCharacter.name}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pt-6 pb-28 space-y-4">
            {/* Name */}
            <h2 className="text-2xl font-bold text-center">{selectedCharacter.name}</h2>
            
            {/* Info Card */}
            <div className="bg-card/50 rounded-2xl p-4 border border-border/50 space-y-4">
              {/* Tags - Highlighted */}
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full font-medium border border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-border/50" />

              {/* About - Full Description */}
              <div>
                <p className="text-foreground/90 text-sm leading-relaxed">
                  {selectedCharacter.fullDescription}
                </p>
              </div>
            </div>
            
            {/* Background Card */}
            <div className="bg-card/50 rounded-2xl p-4 border border-border/50">
              <h3 className="text-primary font-semibold text-sm mb-2">Background</h3>
              <p className={`text-muted-foreground text-sm leading-relaxed ${!showBackground ? 'line-clamp-3' : ''}`}>
                {selectedCharacter.background}
              </p>
              {selectedCharacter.background && selectedCharacter.background.length > 100 && (
                <button
                  onClick={() => setShowBackground(!showBackground)}
                  className="text-primary text-sm font-medium mt-3 flex items-center gap-1 hover:underline"
                >
                  {showBackground ? 'Show Less' : 'View More'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showBackground ? 'rotate-180' : ''}`} />
                </button>
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
