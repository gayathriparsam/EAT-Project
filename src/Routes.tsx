// @ts-ignore
import ErrorBoundary from "./components/ErrorBoundary";
// @ts-ignore
import ScrollToTop from "./components/ScrollToTop";
// @ts-ignore
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
// @ts-ignore
import CommunityHub from './pages/community-hub';
// @ts-ignore
import Dashboard from './pages/dashboard';
// @ts-ignore
import GratitudeJournal from './pages/gratitude-journal';
// @ts-ignore
import LoginRegister from './pages/login-register';
// @ts-ignore
import MoodTracker from './pages/mood-tracker';
// @ts-ignore
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
