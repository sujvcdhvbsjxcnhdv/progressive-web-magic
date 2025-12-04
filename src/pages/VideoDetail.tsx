import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Maximize2, Share2, Sparkles } from "lucide-react";

const VideoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock video data - in real app, fetch based on id
  const video = {
    id: id || "1",
    title: "360° Spin",
    description: "Spin your style in every angle.",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    }
  };

  const handleTryAgain = () => {
    navigate("/video-generator");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20"
        >
          <Info className="w-5 h-5" />
        </Button>
      </header>

      {/* Video Player Area */}
      <div className="flex-1 relative">
        {isPlaying ? (
          <video
            src={video.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            controls
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <div 
            className="w-full h-full cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Top right buttons */}
        <div className="absolute top-16 right-4 flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-black/30 text-white hover:bg-black/50 rounded-full"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-xl font-bold">{video.title}</h1>
            <p className="text-white/70 text-sm mt-1">{video.description}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            className="flex-1 rounded-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold"
            onClick={handleTryAgain}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20 h-12 w-12"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
