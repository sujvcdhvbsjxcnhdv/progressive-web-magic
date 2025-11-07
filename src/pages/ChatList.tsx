import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChatRecord {
  id: string;
  characterId: number;
  characterName: string;
  characterAvatar: string;
  lastMessage: string;
  timestamp: Date;
}

const mockChats: ChatRecord[] = [
  {
    id: "1",
    characterId: 1,
    characterName: "Luna",
    characterAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    lastMessage: "That's a great idea! Let me help you create that video.",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    characterId: 2,
    characterName: "Max",
    characterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    lastMessage: "I can help you with that coding tutorial video.",
    timestamp: new Date(Date.now() - 7200000),
  },
];

const ChatList = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatRecord[]>(mockChats);

  const handleDelete = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    toast.success("Chat deleted");
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Chats</h1>
          <p className="text-sm text-muted-foreground">{chats.length} conversations</p>
        </div>

        <div className="space-y-3">
          {chats.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No conversations yet</p>
                <Button onClick={() => navigate("/")}>
                  Start Chatting
                </Button>
              </CardContent>
            </Card>
          ) : (
            chats.map((chat) => (
              <Card
                key={chat.id}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/chat/${chat.characterId}`)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src={chat.characterAvatar}
                      alt={chat.characterName}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{chat.characterName}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(chat.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
