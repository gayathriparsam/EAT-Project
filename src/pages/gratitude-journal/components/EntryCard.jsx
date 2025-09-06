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
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border hover:shadow-elevated transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getSentimentColor(entry?.sentiment)}`}>
            <Icon name={getSentimentIcon(entry?.sentiment)} size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                {formatDate(entry?.date)}
              </span>
              {entry?.mood && (
                <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">
                  {entry?.mood}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-text-secondary">
                {entry?.wordCount} words
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(entry?.sentiment)}`}>
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
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-10">
              <div className="py-2">
                <button
                  onClick={() => {
                    onEdit(entry);
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted"
                >
                  <Icon name="Edit" size={16} />
                  <span>Edit Entry</span>
                </button>
                <button
                  onClick={() => {
                    onShare(entry);
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted"
                >
                  <Icon name="Share2" size={16} />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(entry?.id);
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-muted"
                >
                  <Icon name="Trash2" size={16} />
                  <span>Delete</span>
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
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors">
            <Icon name="Heart" size={16} />
            <span className="text-sm">Like</span>
          </button>
          <button 
            onClick={() => onShare(entry)}
            className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors"
          >
            <Icon name="Share2" size={16} />
            <span className="text-sm">Share</span>
          </button>
        </div>
        
        <div className="text-xs text-text-secondary">
          {new Date(entry.date)?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
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