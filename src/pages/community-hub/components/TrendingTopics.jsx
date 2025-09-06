import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingTopics = () => {
  const trendingTopics = [
    {
      id: 1,
      topic: 'Self Care Sunday',
      posts: 89,
      trend: 'up',
      percentage: 23,
      icon: 'Sparkles',
      color: 'text-success'
    },
    {
      id: 2,
      topic: 'Anxiety Coping',
      posts: 156,
      trend: 'up',
      percentage: 18,
      icon: 'Shield',
      color: 'text-warning'
    },
    {
      id: 3,
      topic: 'Gratitude Practice',
      posts: 67,
      trend: 'up',
      percentage: 15,
      icon: 'Heart',
      color: 'text-error'
    },
    {
      id: 4,
      topic: 'Sleep Hygiene',
      posts: 43,
      trend: 'up',
      percentage: 12,
      icon: 'Moon',
      color: 'text-primary'
    },
    {
      id: 5,
      topic: 'Mindfulness',
      posts: 78,
      trend: 'down',
      percentage: 5,
      icon: 'Brain',
      color: 'text-secondary'
    }
  ];

  const moderatorSpotlight = {
    name: 'Dr. Sarah Chen',
    title: 'Licensed Therapist',
    topic: 'Managing Holiday Stress',
    time: '2:00 PM EST',
    participants: 234
  };

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">Trending Topics</h3>
            <p className="text-sm text-text-secondary">What's popular today</p>
          </div>
        </div>

        <div className="space-y-3">
          {trendingTopics?.map((topic, index) => (
            <div
              key={topic?.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-text-secondary w-4">
                  {index + 1}
                </span>
                <div className={`w-8 h-8 ${topic?.color?.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center`}>
                  <Icon name={topic?.icon} size={16} className={topic?.color} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{topic?.topic}</h4>
                  <p className="text-xs text-text-secondary">{topic?.posts} posts</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 ${
                  topic?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={topic?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                  />
                  <span className="text-xs font-medium">{topic?.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Moderator Spotlight */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Star" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">Moderator Spotlight</h3>
            <p className="text-sm text-text-secondary">Live session today</p>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{moderatorSpotlight?.name}</h4>
              <p className="text-sm text-text-secondary mb-2">{moderatorSpotlight?.title}</p>
              <h5 className="font-medium text-foreground text-sm mb-1">{moderatorSpotlight?.topic}</h5>
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{moderatorSpotlight?.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{moderatorSpotlight?.participants} joined</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant="default"
            size="sm"
            iconName="Video"
            iconPosition="left"
            className="w-full mt-4"
          >
            Join Live Session
          </Button>
        </div>
      </div>
      {/* Community Stats */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">Community Stats</h3>
            <p className="text-sm text-text-secondary">This week's activity</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <div className="text-xs text-text-secondary">Active Members</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">89</div>
            <div className="text-xs text-text-secondary">New Posts Today</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">456</div>
            <div className="text-xs text-text-secondary">Supportive Reactions</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="text-xs text-text-secondary">Moderators Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;