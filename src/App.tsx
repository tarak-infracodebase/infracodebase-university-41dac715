import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import LearningPathPage from "./pages/LearningPathPage";
import LessonPage from "./pages/LessonPage";
import Dashboard from "./pages/Dashboard";
import Curriculum from "./pages/Curriculum";
// Progress merged into Dashboard
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import VideoLibrary from "./pages/VideoLibrary";
import FeedbackPage from "./pages/FeedbackPage";
import Resources from "./pages/Resources";
import Appearance from "./pages/Appearance";
import Manifesto from "./pages/Manifesto";
import NotFound from "./pages/NotFound";
import HandsOnExercises from "./pages/HandsOnExercises";
import HandsOnTrack from "./pages/HandsOnTrack";
import HandsOnModule from "./pages/HandsOnModule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/progress" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/videos" element={<VideoLibrary />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/appearance" element={<Appearance />} />
            <Route path="/manifesto" element={<AppLayout><Manifesto /></AppLayout>} />
            <Route path="/path/:pathId" element={<LearningPathPage />} />
            <Route path="/path/:pathId/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/hands-on" element={<HandsOnExercises />} />
            <Route path="/hands-on/:trackId" element={<HandsOnTrack />} />
            <Route path="/hands-on/:trackId/:moduleId" element={<HandsOnModule />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
