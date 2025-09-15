import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EntryCard = ({ entry, onEdit, onDelete, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'very positive':
        return 'text-green-600 bg-green-50';
      case 'positive':
        return 'text-blue-600 bg-blue-50';
      case 'neutral':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'very positive':
        return 'Heart';
      case 'positive':
        return 'Smile';
      case 'neutral':
        return 'Meh';
      default:
        return 'Heart';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date?.getFullYear() !== now?.getFullYear() ? 'numeric' : undefined 
    });
  };

  const getPreview = (content, maxLength = 150) => {
    if (content?.length <= maxLength) return content;
    return content?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 shadow-elevated border border-border/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 group" id={`entry-${entry?.id}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl shadow-soft ${getSentimentColor(entry?.sentiment)} border border-current/20`}>
            <Icon name={getSentimentIcon(entry?.sentiment)} size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                {formatDate(entry?.date)}
              </span>
              {entry?.mood && (
                <span className="px-3 py-1 bg-secondary/30 text-secondary rounded-full text-xs border border-secondary/40 backdrop-blur-sm">
                  {entry?.mood}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-text-secondary flex items-center space-x-1">
                <Icon name="FileText" size={12} />
                <span>{entry?.wordCount} words</span>
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(entry?.sentiment)} border border-current/30`}>
                {entry?.sentiment}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowActions(!showActions)}
            iconName="MoreVertical"
            className="opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10"
          />
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-elevated z-10">
              <div className="py-2">
                <button
                  onClick={() => {
                    onEdit(entry);
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-text-secondary hover:text-foreground hover:bg-primary/5 transition-all"
                >
                  <Icon name="Edit" size={16} />
                  <span>Edit Entry</span>
                </button>
                <button
                  onClick={() => {
                    onShare(entry);
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-text-secondary hover:text-foreground hover:bg-primary/5 transition-all"
                >
                  <Icon name="Share2" size={16} />
                  <span>Share Entry</span>
                </button>
                <hr className="my-1 border-border/50" />
                <button
                  onClick={() => {
                    onDelete(entry?.id);
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-error hover:bg-error/5 transition-all"
                >
                  <Icon name="Trash2" size={16} />
                  <span>Delete Entry</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed">
          {isExpanded ? entry?.content : getPreview(entry?.content)}
        </p>
        
        {entry?.content?.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      {/* Tags */}
      {entry?.tags && entry?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {entry?.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => {
              // Add like functionality
              console.log('Liked entry:', entry.id);
            }}
            className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors group"
          >
            <Icon name="Heart" size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm">Appreciate</span>
          </button>
          <button 
            onClick={() => onShare(entry)}
            className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors group"
          >
            <Icon name="Share2" size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm">Share</span>
          </button>
          <button 
            onClick={() => {
              // Add reflect functionality
              console.log('Reflecting on entry:', entry.id);
            }}
            className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors group"
          >
            <Icon name="MessageCircle" size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm">Reflect</span>
          </button>
        </div>
        
        <div className="text-xs text-text-secondary flex items-center space-x-1">
          <Icon name="Clock" size={12} />
          <span>
            {new Date(entry.date)?.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
      {/* Click overlay to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default EntryCard;