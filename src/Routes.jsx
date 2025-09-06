import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import CommunityHub from './pages/community-hub';
import Dashboard from './pages/dashboard';
import GratitudeJournal from './pages/gratitude-journal';
import LoginRegister from './pages/login-register';
import MoodTracker from './pages/mood-tracker';
import VoChatInterface from './pages/vo-chat-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/vo-chat-interface" element={<VoChatInterface />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gratitude-journal" element={<GratitudeJournal />} />
        <Route path="/community-hub" element={<CommunityHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
