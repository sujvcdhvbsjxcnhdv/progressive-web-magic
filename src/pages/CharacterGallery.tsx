import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Character {
  id: string;
  name: string;
  avatar: string;
  description: string;
  tags: string[];
  isOnline: boolean;
}

const mockCharacters: Character[] = [
  {
    id: "1",
    name: "Sophie",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    description: "Gentle companion with a warm heart",
    tags: ["Gentle", "Caring", "Romantic"],
    isOnline: true,
  },
  {
    id: "2",
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    description: "Confident and charming personality",
    tags: ["Confident", "Playful", "Smart"],
    isOnline: true,
  },
  {
    id: "3",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    description: "Your energetic fitness coach",
    tags: ["Athletic", "Energetic", "Motivating"],
    isOnline: false,
  },
  {
    id: "4",
    name: "Aria",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    description: "Professional and sophisticated",
    tags: ["Professional", "Elegant", "Witty"],
    isOnline: true,
  },
];

const CharacterGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Video Generator</h1>
          <p className="text-muted-foreground">Choose an AI character to help create your video</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockCharacters.map((character) => (
            <Card
              key={character.id}
              className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => navigate(`/chat/${character.id}`)}
            >
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div
                    className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white ${
                      character.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{character.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {character.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {character.tags.map((tag) => (
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
    </div>
  );
};

export default CharacterGallery;
