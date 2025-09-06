import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeCard = ({ userName, currentMood, onVibeCheck }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const moodEmojis = {
    happy: '😊',
    calm: '😌',
    anxious: '😰',
    sad: '😢',
    excited: '🤩',
    neutral: '😐'
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            {getCurrentGreeting()}, {userName}!
          </h1>
          <p className="text-text-secondary">
            How are you feeling today? Let's check in with your emotional wellness.
          </p>
        </div>
        <div className="hidden sm:block">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={32} className="text-primary" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Current mood:</span>
            <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full">
              <span className="text-lg">{moodEmojis?.[currentMood] || '😐'}</span>
              <span className="text-sm font-medium text-foreground capitalize">
                {currentMood || 'Not set'}
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onVibeCheck}
          iconName="Camera"
          iconPosition="left"
          className="breathing-animation"
        >
          Vibe Check
        </Button>
      </div>
    </div>
  );
};

export default WelcomeCard;