import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'gratitude',
      title: 'Gratitude Entry',
      content: 'Grateful for the beautiful sunrise this morning and the peaceful moment it brought me.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'Heart',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'mood',
      title: 'Mood Log',
      content: 'Feeling calm and centered after morning meditation',
      mood: 'calm',
      score: 8,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: 'Activity',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'vochat',
      title: 'VoChat Session',
      content: 'Discussed anxiety management techniques with AI counselor',
      duration: '12 minutes',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'MessageCircle',
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'community',
      title: 'Community Interaction',
      content: 'Shared encouragement in the Daily Check-in group',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Users',
      color: 'text-secondary'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      calm: '😌',
      anxious: '😰',
      sad: '😢',
      excited: '🤩',
      neutral: '😐'
    };
    return emojis?.[mood] || '😐';
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Recent Activity
            </h2>
            <p className="text-sm text-text-secondary">
              Your latest wellness interactions
            </p>
          </div>
        </div>

        <Button variant="ghost" size="sm" iconName="MoreHorizontal">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-border">
                <Icon name={activity?.icon} size={18} className={activity?.color} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-foreground">
                  {activity?.title}
                </h3>
                <span className="text-xs text-text-secondary">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>

              <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                {activity?.content}
              </p>

              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                {activity?.type === 'mood' && (
                  <div className="flex items-center space-x-1">
                    <span>{getMoodEmoji(activity?.mood)}</span>
                    <span>Score: {activity?.score}/10</span>
                  </div>
                )}
                {activity?.type === 'vochat' && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Timer" size={12} />
                    <span>{activity?.duration}</span>
                  </div>
                )}
                {activity?.type === 'gratitude' && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Bookmark" size={12} />
                    <span>Saved</span>
                  </div>
                )}
                {activity?.type === 'community' && (
                  <div className="flex items-center space-x-1">
                    <Icon name="ThumbsUp" size={12} />
                    <span>3 likes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add New Entry
        </Button>
      </div>
    </div>
  );
};

export default RecentActivity;