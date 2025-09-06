import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PostCard = ({ post }) => {
  const [reactions, setReactions] = useState(post?.reactions);
  const [userReaction, setUserReaction] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const reactionTypes = [
    { type: 'heart', icon: 'Heart', color: 'text-error', label: 'Heart' },
    { type: 'hug', icon: 'Users', color: 'text-warning', label: 'Hug' },
    { type: 'strength', icon: 'Zap', color: 'text-success', label: 'Strength' },
    { type: 'support', icon: 'Shield', color: 'text-primary', label: 'Support' }
  ];

  const handleReaction = (type) => {
    if (userReaction === type) {
      setReactions(prev => ({ ...prev, [type]: prev?.[type] - 1 }));
      setUserReaction(null);
    } else {
      if (userReaction) {
        setReactions(prev => ({ ...prev, [userReaction]: prev?.[userReaction] - 1 }));
      }
      setReactions(prev => ({ ...prev, [type]: prev?.[type] + 1 }));
      setUserReaction(type);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const shouldTruncate = post?.content?.length > 200;
  const displayContent = shouldTruncate && !isExpanded 
    ? post?.content?.substring(0, 200) + '...' 
    : post?.content;

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-gentle transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={18} color="white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-foreground">{post?.username}</h4>
              {post?.isVerified && (
                <Icon name="CheckCircle" size={14} className="text-success" />
              )}
              {post?.isModerator && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  Moderator
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <span>{formatTimeAgo(post?.timestamp)}</span>
              {post?.mood && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name={post?.mood?.icon} size={12} className={post?.mood?.color} />
                    <span>{post?.mood?.label}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" iconName="MoreHorizontal" />
        </div>
      </div>
      {/* Trigger Warning */}
      {post?.triggerWarning && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Trigger Warning</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">{post?.triggerWarning}</p>
        </div>
      )}
      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {displayContent}
        </p>
        {shouldTruncate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-primary hover:bg-transparent"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </Button>
        )}
      </div>
      {/* Tags */}
      {post?.tags && post?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      {/* Reactions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-1">
          {reactionTypes?.map((reaction) => (
            <Button
              key={reaction?.type}
              variant="ghost"
              size="sm"
              onClick={() => handleReaction(reaction?.type)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                userReaction === reaction?.type
                  ? 'bg-primary/10 text-primary' :'hover:bg-muted'
              }`}
            >
              <Icon 
                name={reaction?.icon} 
                size={16} 
                className={userReaction === reaction?.type ? 'text-primary' : reaction?.color} 
              />
              <span className="text-xs font-medium">{reactions?.[reaction?.type]}</span>
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            className="text-text-secondary hover:text-foreground"
          >
            {post?.comments || 0}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            iconName="Share"
            className="text-text-secondary hover:text-foreground"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Flag"
            className="text-text-secondary hover:text-error"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;