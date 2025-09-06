import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/vo-chat-interface', label: 'VoChat', icon: 'MessageCircle' },
    { path: '/gratitude-journal', label: 'Gratitude', icon: 'Heart' },
    { path: '/mood-tracker', label: 'Mood', icon: 'Activity' },
    { path: '/community-hub', label: 'Community', icon: 'Users' },
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement?.classList?.toggle('dark');
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...');
  };

  return (
    <>
      {/* Crisis Support Banner */}
      <div className={`bg-error text-error-foreground transition-all duration-400 ${isCrisisOpen ? 'h-auto py-3' : 'h-0 overflow-hidden'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Phone" size={20} />
              <span className="text-sm font-medium">Crisis Support: 988 Suicide & Crisis Lifeline</span>
              <a href="tel:988" className="text-sm underline hover:no-underline">
                Call Now
              </a>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCrisisOpen(false)}
              iconName="X"
              className="text-error-foreground hover:bg-error/20"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      {/* Main Header */}
      <header className="bg-background border-b border-border fixed top-0 left-0 right-0 z-50 shadow-gentle">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-3 breathing-animation">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} color="white" />
                </div>
                <span className="font-heading font-semibold text-xl text-foreground">
                  E.A.T
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-gentle'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Crisis Support Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCrisisOpen(!isCrisisOpen)}
                iconName="AlertTriangle"
                className="hidden sm:flex text-error border-error hover:bg-error hover:text-error-foreground"
              >
                Crisis Support
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                iconName={isDarkMode ? 'Sun' : 'Moon'}
                className="text-text-secondary hover:text-foreground"
              />

              {/* Profile Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-text-secondary hover:text-foreground"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} color="white" />
                  </div>
                </Button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground">John Doe</p>
                        <p className="text-xs text-text-secondary">john@example.com</p>
                      </div>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </Link>
                      <Link
                        to="/privacy"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted"
                      >
                        <Icon name="Shield" size={16} />
                        <span>Privacy</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-muted"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                iconName={isMenuOpen ? 'X' : 'Menu'}
                className="md:hidden text-text-secondary hover:text-foreground"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-400 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <nav className="px-4 py-4 border-t border-border bg-card">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              {/* Mobile Crisis Support */}
              <button
                onClick={() => {
                  setIsCrisisOpen(!isCrisisOpen);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-error hover:bg-muted mt-2"
              >
                <Icon name="AlertTriangle" size={20} />
                <span>Crisis Support</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      {/* Breadcrumb Indicator */}
      <div className="fixed top-16 left-0 right-0 bg-surface/80 backdrop-blur-sm border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Link to="/dashboard" className="flex items-center space-x-1 hover:text-foreground transition-colors">
              <Icon name="Home" size={16} />
              <span>Dashboard</span>
            </Link>
            {location?.pathname !== '/dashboard' && (
              <>
                <Icon name="ChevronRight" size={14} />
                <span className="text-foreground font-medium">
                  {navigationItems?.find(item => item?.path === location?.pathname)?.label || 'Current Page'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Overlay for mobile menu */}
      {(isMenuOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;