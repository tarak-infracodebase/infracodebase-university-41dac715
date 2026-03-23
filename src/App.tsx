import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
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
import OfficeHours from "./pages/OfficeHours";
import CommunityCards from "./pages/CommunityCards";

const CLERK_PUBLISHABLE_KEY = "pk_test_ZGVsaWNhdGUta29pLTkyLmNsZXJrLmFjY291bnRzLmRldiQ";

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
        <Route path="/manifesto" element={<AppLayout><Manifesto /></AppLayout>} />
        <Route path="/cards" element={<AppLayout><CommunityCards /></AppLayout>} />

        {/* Protected routes (personal data) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/progress" element={<Navigate to="/dashboard?tab=progress" replace />} />

        {/* Public browsable routes (actions gated inline) */}
        <Route path="/curriculum" element={<AppLayout><Curriculum /></AppLayout>} />
        <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
        <Route path="/events" element={<AppLayout><Events /></AppLayout>} />
        <Route path="/videos" element={<AppLayout><VideoLibrary /></AppLayout>} />
        <Route path="/feedback" element={<AppLayout><FeedbackPage /></AppLayout>} />
        <Route path="/resources" element={<AppLayout><Resources /></AppLayout>} />
        <Route path="/appearance" element={<ProtectedRoute><Appearance /></ProtectedRoute>} />
        <Route path="/path/:pathId" element={<AppLayout><LearningPathPage /></AppLayout>} />
        <Route path="/path/:pathId/lesson/:lessonId" element={<AppLayout><LessonPage /></AppLayout>} />
        <Route path="/hands-on" element={<AppLayout><HandsOnExercises /></AppLayout>} />
        <Route path="/hands-on/:trackId" element={<AppLayout><HandsOnTrack /></AppLayout>} />
        <Route path="/hands-on/:trackId/:moduleId" element={<AppLayout><HandsOnModule /></AppLayout>} />
        <Route path="/office-hours" element={<AppLayout><OfficeHours /></AppLayout>} />

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
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
