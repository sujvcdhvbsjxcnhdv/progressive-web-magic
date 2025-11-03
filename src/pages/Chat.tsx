import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Image as ImageIcon, Smile } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

const Chat = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      content: "Hi there! I'm so happy to chat with you. How are you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (messageCount >= 3) {
      toast.error("Free message limit reached. Please subscribe to continue chatting.");
      navigate("/subscription");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setMessageCount((prev) => prev + 1);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: "That's interesting! Tell me more...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const quickActions = [
    "What are you doing?",
    "Send me a photo",
    "Tell me about yourself",
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="bg-primary/10 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600" />
          <div>
            <h2 className="font-semibold">Sophie</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {messageCount}/3 free messages
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Shared"
                  className="rounded-lg mb-2 max-w-full"
                />
              )}
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickActions.map((action) => (
            <Button
              key={action}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setInput(action)}
            >
              {action}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Smile className="w-5 h-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
