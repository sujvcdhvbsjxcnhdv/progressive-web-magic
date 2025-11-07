import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterGallery from "./pages/CharacterGallery";
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";
import VideoGenerator from "./pages/VideoGenerator";
import Pricing from "./pages/Pricing";
import Mine from "./pages/Mine";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-16">
          <Routes>
            <Route path="/" element={<CharacterGallery />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/chat/:characterId" element={<Chat />} />
            <Route path="/video" element={<VideoGenerator />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/mine" element={<Mine />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
