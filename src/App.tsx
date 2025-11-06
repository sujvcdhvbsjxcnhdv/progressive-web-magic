import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterGallery from "./pages/CharacterGallery";
import Chat from "./pages/Chat";
import VideoGenerator from "./pages/VideoGenerator";
import Subscription from "./pages/Subscription";
import TaskCenter from "./pages/TaskCenter";
import Settings from "./pages/Settings";
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
            <Route path="/chat/:characterId" element={<Chat />} />
            <Route path="/video" element={<VideoGenerator />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/tasks" element={<TaskCenter />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
