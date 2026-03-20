import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import LearningPathPage from "./pages/LearningPathPage";
import LessonPage from "./pages/LessonPage";
import Dashboard from "./pages/Dashboard";
import Curriculum from "./pages/Curriculum";
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
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";

const CLERK_PUBLISHABLE_KEY = "pk_live_Y2xlcmsuaW5mcmFjb2RlYmFzZS5jb20k";

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/sign-in/*" element={<SignInPage />} />
              <Route path="/sign-up/*" element={<SignUpPage />} />
              <Route path="/manifesto" element={<AppLayout><Manifesto /></AppLayout>} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/curriculum" element={<ProtectedRoute><Curriculum /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/videos" element={<ProtectedRoute><VideoLibrary /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
              <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
              <Route path="/appearance" element={<ProtectedRoute><Appearance /></ProtectedRoute>} />
              <Route path="/path/:pathId" element={<ProtectedRoute><LearningPathPage /></ProtectedRoute>} />
              <Route path="/path/:pathId/lesson/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
              <Route path="/hands-on" element={<ProtectedRoute><HandsOnExercises /></ProtectedRoute>} />
              <Route path="/hands-on/:trackId" element={<ProtectedRoute><HandsOnTrack /></ProtectedRoute>} />
              <Route path="/hands-on/:trackId/:moduleId" element={<ProtectedRoute><HandsOnModule /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
