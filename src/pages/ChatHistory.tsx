import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatSession {
  characterId: string;
  characterName: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
}

const mockHistory: ChatSession[] = [
  {
    characterId: "1",
    characterName: "Sophie",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "That's interesting! Tell me more...",
    timestamp: "2 hours ago",
  },
  {
    characterId: "2",
    characterName: "Luna",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "I'd love to hear about your day!",
    timestamp: "1 day ago",
  },
];

const ChatHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Conversations</h1>
          <p className="text-muted-foreground">Continue your chats with AI characters</p>
        </div>

        <div className="space-y-3">
          {mockHistory.map((session) => (
            <Card
              key={session.characterId}
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate(`/chat/${session.characterId}`)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <img
                  src={session.avatar}
                  alt={session.characterName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{session.characterName}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {session.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {session.timestamp}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
