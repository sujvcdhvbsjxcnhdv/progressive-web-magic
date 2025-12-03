import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import featuredBanner from "@/assets/featured-banner.jpg";

const PromoBanner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer"
      onClick={() => navigate("/pricing")}
    >
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
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default PromoBanner;
