import React from "react";
import { Menu, Bell, User, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import Icon from "../AppIcon";

export interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showNotifications = true,
  notificationCount = 0,
  onMenuClick,
  onNotificationClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  
  const navigationItems = [
    { path: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/mood-tracker", label: "Mood Tracker", icon: "Heart" },
    { path: "/gratitude-journal", label: "Gratitude", icon: "BookOpen" },
    { path: "/community-hub", label: "Community", icon: "Users" },
    { path: "/vo-chat-interface", label: "AI Chat", icon: "MessageCircle" },
  ];
  
  const currentPage = navigationItems.find(item => item.path === location.pathname);
  const displayTitle = title || currentPage?.label || "Wellness App";
  
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={18} className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              {displayTitle}
            </h1>
          </div>
        </div>
        
        {/* Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(item.path)}
              className="flex items-center space-x-2"
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
        
        {/* Right section */}
        <div className="flex items-center space-x-2">
          {showNotifications && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationClick}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          )}
          
          {/* User menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative"
            >
              <User className="h-5 w-5" />
            </Button>
            
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-20">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to settings
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/login-register');
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;