import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import MoodChart from "./components/MoodChart";
import ProgressTracker from "./components/ProgressTracker";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import WelcomeCard from "./components/WelcomeCard";

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState("calm");
  const [userName] = useState("Gayathri");
  const [isVibeCheckActive, setIsVibeCheckActive] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      title: "Daily Check-in",
      message: "Don't forget to log your mood today!",
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      type: "achievement",
      title: "Streak Achievement!",
      message: "You've maintained a 5-day gratitude streak!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update timestamp for demo purposes
      console.log("Dashboard refreshed at:", new Date()?.toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleVibeCheck = async () => {
    setIsVibeCheckActive(true);

    // Simulate facial emotion detection
    setTimeout(() => {
      const detectedMoods = ["happy", "calm", "neutral", "excited"];
      const randomMood =
        detectedMoods?.[Math.floor(Math.random() * detectedMoods?.length)];
      setCurrentMood(randomMood);
      setIsVibeCheckActive(false);

      // Add notification about vibe check result
      const newNotification = {
        id: Date.now(),
        type: "info",
        title: "Vibe Check Complete",
        message: `Your current mood appears to be ${randomMood}. How accurate is this?`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }, 3000);
  };

  const handleLogMood = () => {
    console.log("Navigating to mood tracker...");
  };

  const handleAddGratitude = () => {
    console.log("Navigating to gratitude journal...");
  };

  const handleStartVoChat = () => {
    console.log("Starting VoChat session...");
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev?.map((notif) =>
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications?.filter((n) => !n?.read)?.length;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notifications Bar */}
          {unreadCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="Bell" size={20} className="text-primary" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      You have {unreadCount} new notification
                      {unreadCount > 1 ? "s" : ""}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {notifications?.find((n) => !n?.read)?.message}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    markNotificationAsRead(
                      notifications?.find((n) => !n?.read)?.id
                    )
                  }
                  iconName="X"
                >
                  Dismiss
                </Button>
              </div>
            </motion.div>
          )}

          {/* Vibe Check Loading Overlay */}
          {isVibeCheckActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="bg-card rounded-xl p-8 shadow-elevated border border-border max-w-sm mx-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 breathing-animation">
                    <Icon name="Camera" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Analyzing Your Vibe...
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Please look at the camera while we detect your current
                    emotional state.
                  </p>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <WelcomeCard
                  userName={userName}
                  currentMood={currentMood}
                  onVibeCheck={handleVibeCheck}
                />
              </motion.div>

              {/* Mood Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MoodChart />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuickActions
                  onLogMood={handleLogMood}
                  onAddGratitude={handleAddGratitude}
                  onStartVoChat={handleStartVoChat}
                />
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <RecentActivity />
              </motion.div>

              {/* Progress Tracker */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ProgressTracker />
              </motion.div>

              {/* Emergency Support Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-error/10 border border-error/20 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                    <Icon
                      name="AlertTriangle"
                      size={20}
                      className="text-error"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Need Immediate Help?
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Crisis support available 24/7
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    className="text-error border-error hover:bg-error hover:text-error-foreground"
                  >
                    Call 988 Lifeline
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    iconName="MessageSquare"
                    iconPosition="left"
                    className="text-error hover:bg-error/10"
                  >
                    Crisis Text Line
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              {
                label: "Days Active",
                value: "23",
                icon: "Calendar",
                color: "text-primary",
              },
              {
                label: "Mood Entries",
                value: "18",
                icon: "Activity",
                color: "text-success",
              },
              {
                label: "VoChat Sessions",
                value: "8",
                icon: "MessageCircle",
                color: "text-accent",
              },
              {
                label: "Community Posts",
                value: "6",
                icon: "Users",
                color: "text-secondary",
              },
            ]?.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-4 shadow-gentle border border-border"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={stat?.icon} size={16} className={stat?.color} />
                  <span className="text-xs text-text-secondary">
                    {stat?.label}
                  </span>
                </div>
                <div className="text-xl font-semibold text-foreground">
                  {stat?.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
