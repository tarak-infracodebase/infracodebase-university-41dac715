import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GamificationProvider } from "@/hooks/GamificationProvider";
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
import OfficeHours from "./pages/OfficeHours";
import CommunityCards from "./pages/CommunityCards";
import Community from "./pages/Community";

const CLERK_PUBLISHABLE_KEY = "pk_live_Y2xlcmsuaW5mcmFjb2RlYmFzZS5jb20k";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/our-story" element={<Manifesto />} />
        <Route path="/manifesto" element={<Navigate to="/our-story" replace />} />
        <Route path="/community" element={<Community />} />
        <Route
          path="/cards"
          element={
            <AppLayout>
              <CommunityCards />
            </AppLayout>
          }
        />

        {/* Protected routes (personal data) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/progress" element={<Navigate to="/dashboard?tab=progress" replace />} />

        {/* Public browsable routes (actions gated inline) */}
        <Route path="/training" element={<Curriculum />} />
        <Route path="/curriculum" element={<Navigate to="/training" replace />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/videos" element={<VideoLibrary />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/appearance"
          element={
            <ProtectedRoute>
              <Appearance />
            </ProtectedRoute>
          }
        />
        <Route path="/path/:pathId" element={<LearningPathPage />} />
        <Route path="/path/:pathId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/hands-on" element={<HandsOnExercises />} />
        <Route path="/hands-on/:trackId" element={<HandsOnTrack />} />
        <Route path="/hands-on/:trackId/:moduleId" element={<HandsOnModule />} />
        <Route path="/workshops" element={<OfficeHours />} />
        <Route path="/office-hours" element={<Navigate to="/workshops" replace />} />

        {/* Public username profile route */}
        <Route path="/:username" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GamificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </GamificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
