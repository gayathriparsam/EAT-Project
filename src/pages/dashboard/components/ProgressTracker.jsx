import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = () => {
  const progressData = {
    moodLogging: {
      current: 18,
      goal: 30,
      streak: 5,
      title: 'Mood Logging',
      icon: 'Activity',
      color: 'text-primary',
      bgColor: 'bg-primary'
    },
    gratitudeJournal: {
      current: 12,
      goal: 20,
      streak: 3,
      title: 'Gratitude Journal',
      icon: 'Heart',
      color: 'text-success',
      bgColor: 'bg-success'
    },
    voChatSessions: {
      current: 8,
      goal: 15,
      streak: 2,
      title: 'VoChat Sessions',
      icon: 'MessageCircle',
      color: 'text-accent',
      bgColor: 'bg-accent'
    },
    communityEngagement: {
      current: 6,
      goal: 10,
      streak: 1,
      title: 'Community Posts',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary'
    }
  };

  const badges = [
    {
      id: 1,
      name: 'Mood Master',
      description: '7-day mood logging streak',
      icon: 'Award',
      earned: true,
      color: 'text-warning'
    },
    {
      id: 2,
      name: 'Gratitude Guru',
      description: 'Write 10 gratitude entries',
      icon: 'Star',
      earned: true,
      color: 'text-success'
    },
    {
      id: 3,
      name: 'Community Helper',
      description: 'Help 5 community members',
      icon: 'Heart',
      earned: false,
      color: 'text-text-secondary'
    },
    {
      id: 4,
      name: 'Wellness Warrior',
      description: '30-day consistency streak',
      icon: 'Shield',
      earned: false,
      color: 'text-text-secondary'
    }
  ];

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Target" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Progress Tracker
          </h2>
          <p className="text-sm text-text-secondary">
            Your wellness journey this month
          </p>
        </div>
      </div>
      {/* Progress Bars */}
      <div className="space-y-6 mb-8">
        {Object.entries(progressData)?.map(([key, data]) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={data?.icon} size={16} className={data?.color} />
                <span className="text-sm font-medium text-foreground">
                  {data?.title}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-text-secondary">
                  {data?.current}/{data?.goal}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Flame" size={14} className="text-warning" />
                  <span className="text-xs font-medium text-warning">
                    {data?.streak}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`${data?.bgColor} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${getProgressPercentage(data?.current, data?.goal)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Achievement Badges */}
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Trophy" size={16} className="text-warning" />
          <span>Achievement Badges</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges?.map((badge) => (
            <div
              key={badge?.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                badge?.earned
                  ? 'bg-warning/10 border-warning/30 shadow-gentle'
                  : 'bg-muted/50 border-border'
              }`}
            >
              <div className="text-center">
                <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  badge?.earned ? 'bg-warning/20' : 'bg-muted'
                }`}>
                  <Icon 
                    name={badge?.icon} 
                    size={16} 
                    className={badge?.earned ? 'text-warning' : 'text-text-secondary'} 
                  />
                </div>
                <h4 className={`text-xs font-medium mb-1 ${
                  badge?.earned ? 'text-foreground' : 'text-text-secondary'
                }`}>
                  {badge?.name}
                </h4>
                <p className="text-xs text-text-secondary leading-tight">
                  {badge?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Summary */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground">This Week's Summary</h4>
            <p className="text-xs text-text-secondary">
              You're doing great! Keep up the consistency.
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary">85%</div>
            <div className="text-xs text-text-secondary">Overall Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;