import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ entries }) => {
  const calculateStreak = () => {
    if (!entries?.length) return 0;
    
    const sortedEntries = [...entries]?.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let currentDate = new Date();
    currentDate?.setHours(0, 0, 0, 0);
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      entryDate?.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else if (diffDays === streak + 1) {
        streak++;
      } else {
        break;
      }
      
      currentDate = new Date(entryDate);
    }
    
    return streak;
  };

  const getThisWeekEntries = () => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    weekStart?.setHours(0, 0, 0, 0);
    
    return entries?.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart;
    })?.length;
  };

  const getAverageSentiment = () => {
    if (!entries?.length) return 'No data';
    
    const sentimentScores = entries?.map(entry => {
      switch (entry?.sentiment) {
        case 'very positive': return 5;
        case 'positive': return 4;
        case 'neutral': return 3;
        default: return 4;
      }
    });
    
    const average = sentimentScores?.reduce((a, b) => a + b, 0) / sentimentScores?.length;
    
    if (average >= 4.5) return 'Very Positive';
    if (average >= 3.5) return 'Positive';
    return 'Neutral';
  };

  const getTotalWords = () => {
    return entries?.reduce((total, entry) => total + (entry?.wordCount || 0), 0);
  };

  const stats = [
    {
      label: 'Current Streak',
      value: calculateStreak(),
      unit: 'days',
      icon: 'Flame',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'This Week',
      value: getThisWeekEntries(),
      unit: 'entries',
      icon: 'Calendar',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Entries',
      value: entries?.length,
      unit: 'entries',
      icon: 'BookOpen',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Words Written',
      value: getTotalWords()?.toLocaleString(),
      unit: 'words',
      icon: 'PenTool',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const milestones = [
    { threshold: 1, title: 'First Entry', description: 'Started your gratitude journey' },
    { threshold: 7, title: 'Week Warrior', description: 'One week of gratitude' },
    { threshold: 30, title: 'Monthly Master', description: 'One month of reflection' },
    { threshold: 100, title: 'Gratitude Guru', description: '100 entries completed' }
  ];

  const getNextMilestone = () => {
    const totalEntries = entries?.length;
    return milestones?.find(milestone => milestone?.threshold > totalEntries);
  };

  const nextMilestone = getNextMilestone();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat) => (
          <div key={stat?.label} className="bg-card rounded-xl p-4 shadow-gentle border border-border">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
                  <span className="text-sm text-text-secondary">{stat?.unit}</span>
                </div>
                <p className="text-sm text-text-secondary">{stat?.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Overview */}
      <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Progress Overview
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              getAverageSentiment() === 'Very Positive' ? 'bg-green-500' :
              getAverageSentiment() === 'Positive' ? 'bg-blue-500' : 'bg-gray-500'
            }`} />
            <span className="text-sm text-text-secondary">
              Overall mood: {getAverageSentiment()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Streak Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Writing Streak</span>
              <span className="text-sm text-text-secondary">{calculateStreak()} days</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((calculateStreak() / 30) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {30 - calculateStreak() > 0 ? `${30 - calculateStreak()} days to reach 30-day streak` : 'Amazing streak!'}
            </p>
          </div>

          {/* Weekly Goal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Weekly Goal</span>
              <span className="text-sm text-text-secondary">{getThisWeekEntries()}/7</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((getThisWeekEntries() / 7) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {7 - getThisWeekEntries() > 0 ? `${7 - getThisWeekEntries()} more entries this week` : 'Weekly goal achieved!'}
            </p>
          </div>
        </div>
      </div>
      {/* Next Milestone */}
      {nextMilestone && (
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Icon name="Trophy" size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-heading font-semibold text-foreground mb-1">
                Next Milestone: {nextMilestone?.title}
              </h4>
              <p className="text-sm text-text-secondary mb-2">
                {nextMilestone?.description}
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-background rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(entries?.length / nextMilestone?.threshold) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {entries?.length}/{nextMilestone?.threshold}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Achievements */}
      <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {milestones?.map((milestone) => {
            const isAchieved = entries?.length >= milestone?.threshold;
            return (
              <div
                key={milestone?.threshold}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isAchieved
                    ? 'border-primary bg-primary/5 shadow-gentle'
                    : 'border-border bg-muted/50'
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    isAchieved ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'
                  }`}>
                    <Icon name="Trophy" size={20} />
                  </div>
                  <h4 className={`text-sm font-medium mb-1 ${
                    isAchieved ? 'text-foreground' : 'text-text-secondary'
                  }`}>
                    {milestone?.title}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {milestone?.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;