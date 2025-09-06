import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodHistory = ({ moodEntries, onDeleteEntry, onEditEntry }) => {
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      anxious: '😰',
      stressed: '😤',
      calm: '😌',
      energetic: '⚡'
    };
    return emojis?.[mood] || '😐';
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sad: 'bg-blue-100 text-blue-800 border-blue-200',
      anxious: 'bg-orange-100 text-orange-800 border-orange-200',
      stressed: 'bg-red-100 text-red-800 border-red-200',
      calm: 'bg-green-100 text-green-800 border-green-200',
      energetic: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors?.[mood] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getIntensityColor = (intensity) => {
    if (intensity >= 8) return 'text-red-600';
    if (intensity >= 6) return 'text-orange-600';
    if (intensity >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const sortedEntries = [...moodEntries]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'intensity-high':
        return b?.intensity - a?.intensity;
      case 'intensity-low':
        return a?.intensity - b?.intensity;
      case 'mood':
        return a?.mood?.localeCompare(b?.mood);
      default:
        return 0;
    }
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
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

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const toggleExpanded = (entryId) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">Mood History</h2>
            <p className="text-sm text-text-secondary">{moodEntries?.length} entries logged</p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1 rounded-lg text-sm bg-background border border-border text-foreground"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="intensity-high">High Intensity</option>
            <option value="intensity-low">Low Intensity</option>
            <option value="mood">Mood Type</option>
          </select>
        </div>
      </div>
      {/* Entries List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedEntries?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Entries Yet</h3>
            <p className="text-text-secondary">Start logging your moods to see your history here.</p>
          </div>
        ) : (
          sortedEntries?.map((entry) => (
            <div
              key={entry?.id || entry?.timestamp}
              className="border border-border rounded-lg p-4 hover:shadow-gentle transition-all duration-200"
            >
              {/* Entry Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getMoodEmoji(entry?.mood)}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMoodColor(entry?.mood)}`}>
                        {entry?.mood?.charAt(0)?.toUpperCase() + entry?.mood?.slice(1)}
                      </span>
                      <span className={`text-sm font-medium ${getIntensityColor(entry?.intensity)}`}>
                        {entry?.intensity}/10
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-text-secondary">{formatDate(entry?.timestamp)}</span>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-sm text-text-secondary">{formatTime(entry?.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleExpanded(entry?.timestamp)}
                    iconName={expandedEntry === entry?.timestamp ? "ChevronUp" : "ChevronDown"}
                    className="text-text-secondary hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditEntry(entry)}
                    iconName="Edit2"
                    className="text-text-secondary hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteEntry(entry?.timestamp)}
                    iconName="Trash2"
                    className="text-text-secondary hover:text-error"
                  />
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-3">
                {entry?.sleepQuality && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Moon" size={14} />
                    <span>Sleep: {entry?.sleepQuality}/10</span>
                  </div>
                )}
                {entry?.energyLevel && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={14} />
                    <span>Energy: {entry?.energyLevel}/10</span>
                  </div>
                )}
                {entry?.triggers && entry?.triggers?.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{entry?.triggers?.length} trigger{entry?.triggers?.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              {/* Notes Preview */}
              {entry?.notes && (
                <p className="text-sm text-foreground mb-3 line-clamp-2">
                  "{entry?.notes}"
                </p>
              )}

              {/* Expanded Details */}
              {expandedEntry === entry?.timestamp && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  {/* Full Notes */}
                  {entry?.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Notes:</h4>
                      <p className="text-sm text-text-secondary bg-muted rounded-lg p-3">
                        {entry?.notes}
                      </p>
                    </div>
                  )}

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {entry?.sleepQuality && (
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon name="Moon" size={16} className="text-text-secondary" />
                          <span className="text-sm font-medium text-foreground">Sleep Quality</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-background rounded-full h-2">
                            <div
                              className="h-2 bg-accent rounded-full transition-all duration-300"
                              style={{ width: `${(entry?.sleepQuality / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-foreground">{entry?.sleepQuality}/10</span>
                        </div>
                      </div>
                    )}

                    {entry?.energyLevel && (
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon name="Zap" size={16} className="text-text-secondary" />
                          <span className="text-sm font-medium text-foreground">Energy Level</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-background rounded-full h-2">
                            <div
                              className="h-2 bg-success rounded-full transition-all duration-300"
                              style={{ width: `${(entry?.energyLevel / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-foreground">{entry?.energyLevel}/10</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Triggers */}
                  {entry?.triggers && entry?.triggers?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Triggers:</h4>
                      <div className="flex flex-wrap gap-2">
                        {entry?.triggers?.map((trigger, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoodHistory;