import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "expenditure" | "obtain";

// Mock data for credits history
const mockCreditsHistory = [
  { id: 1, date: "2025/10/23 20:29", description: "Video generation", amount: -120, type: "expenditure" },
  { id: 2, date: "2025/10/23 20:29", description: "Video generation", amount: -120, type: "expenditure" },
  { id: 3, date: "2025/10/22 15:30", description: "Daily bonus", amount: 50, type: "obtain" },
  { id: 4, date: "2025/10/22 10:00", description: "Video generation", amount: -120, type: "expenditure" },
  { id: 5, date: "2025/10/21 18:45", description: "Subscription bonus", amount: 500, type: "obtain" },
  { id: 6, date: "2025/10/21 14:20", description: "Video generation", amount: -120, type: "expenditure" },
  { id: 7, date: "2025/10/20 09:15", description: "Video generation", amount: -120, type: "expenditure" },
  { id: 8, date: "2025/10/19 16:30", description: "Purchase credits", amount: 200, type: "obtain" },
];

const CreditsHistory = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredHistory = mockCreditsHistory.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const totalCredits = 200; // Mock total credits

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Credits History</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-lg space-y-6">
        {/* UID */}
        <p className="text-sm text-muted-foreground">UID: 228749</p>

        {/* Credits Card */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-white" />
            <span className="text-3xl font-bold text-white">{totalCredits}</span>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 text-white border-0"
            onClick={() => navigate("/pricing")}
          >
            More
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "pb-2 px-4 text-sm font-medium transition-colors",
              filter === "all" 
                ? "text-foreground border-b-2 border-foreground" 
                : "text-muted-foreground"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter("expenditure")}
            className={cn(
              "pb-2 px-4 text-sm font-medium transition-colors",
              filter === "expenditure" 
                ? "text-foreground border-b-2 border-foreground" 
                : "text-muted-foreground"
            )}
          >
            Expenditure
          </button>
          <button
            onClick={() => setFilter("obtain")}
            className={cn(
              "pb-2 px-4 text-sm font-medium transition-colors",
              filter === "obtain" 
                ? "text-foreground border-b-2 border-foreground" 
                : "text-muted-foreground"
            )}
          >
            Obtain
          </button>
        </div>

        {/* History List */}
        <div className="space-y-0">
          {filteredHistory.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between py-4 border-b border-border last:border-0"
            >
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <p className="text-sm">{item.description}</p>
              </div>
              <span className={cn(
                "font-medium",
                item.amount > 0 ? "text-green-500" : "text-foreground"
              )}>
                {item.amount > 0 ? `+${item.amount}` : item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsHistory;
