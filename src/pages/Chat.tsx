import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

const characters = {
  "1": {
    name: "Luna",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    cover: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=800&fit=crop",
  },
  "2": {
    name: "Max",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
  },
  "3": {
    name: "Aria",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
  },
  "4": {
    name: "Echo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop",
  },
};

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      content: "Hi! I'm here to help you create amazing videos. What would you like to make today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const freeMessageLimit = 3;
  const userMessageCount = messages.filter(m => m.sender === "user").length;

  const character = characters[characterId as keyof typeof characters];

  if (!character) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    if (userMessageCount >= freeMessageLimit) {
      navigate("/pricing");
      toast.info("Upgrade to continue chatting");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: "That sounds interesting! Let me help you with that. Would you like to create a video about this?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${character?.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-4 bg-background/90 backdrop-blur-sm border-b flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/chat")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <img
            src={character?.avatar}
            alt={character?.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary"
          />
          <h1 className="text-lg font-bold">{character?.name}</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/90 backdrop-blur-sm"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-background/90 backdrop-blur-sm border-t">
        {userMessageCount >= freeMessageLimit && (
          <div className="mb-3 p-3 bg-primary/10 border border-primary rounded-lg text-center">
            <p className="text-sm text-primary font-medium">
              Free messages used ({userMessageCount}/{freeMessageLimit})
            </p>
            <Button size="sm" className="mt-2" onClick={() => navigate("/pricing")}>
              Upgrade to Continue
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              userMessageCount >= freeMessageLimit
                ? "Upgrade to send more messages..."
                : "Type your message..."
            }
            className="flex-1"
            disabled={userMessageCount >= freeMessageLimit}
          />
          <Button onClick={handleSend} size="icon" disabled={userMessageCount >= freeMessageLimit}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
