import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import LearningPathPage from "./pages/LearningPathPage";
import LessonPage from "./pages/LessonPage";
import Dashboard from "./pages/Dashboard";
import Curriculum from "./pages/Curriculum";
import Progress from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import VideoLibrary from "./pages/VideoLibrary";
import FeedbackPage from "./pages/FeedbackPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/videos" element={<VideoLibrary />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/path/:pathId" element={<LearningPathPage />} />
          <Route path="/path/:pathId/lesson/:lessonId" element={<LessonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
