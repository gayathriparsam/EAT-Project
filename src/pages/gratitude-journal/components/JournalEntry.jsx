import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const JournalEntry = ({ onSave, isLoading }) => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const maxCharacters = 1000;

  const moodOptions = [
    { value: 'grateful', label: 'Grateful', color: 'text-green-600', icon: 'Heart' },
    { value: 'peaceful', label: 'Peaceful', color: 'text-blue-600', icon: 'Smile' },
    { value: 'hopeful', label: 'Hopeful', color: 'text-purple-600', icon: 'Sun' },
    { value: 'content', label: 'Content', color: 'text-teal-600', icon: 'Coffee' },
    { value: 'inspired', label: 'Inspired', color: 'text-orange-600', icon: 'Zap' }
  ];

  const handleSave = () => {
    if (entry?.trim()) {
      const newEntry = {
        id: Date.now(),
        content: entry,
        mood: mood,
        tags: tags,
        date: new Date()?.toISOString(),
        sentiment: Math.random() > 0.5 ? 'positive' : 'very positive', // Mock sentiment
        wordCount: entry?.split(' ')?.length
      };
      onSave(newEntry);
      setEntry('');
      setMood('');
      setTags([]);
    }
  };

  const addTag = () => {
    if (newTag?.trim() && !tags?.includes(newTag?.trim()) && tags?.length < 5) {
      setTags([...tags, newTag?.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags?.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && e?.ctrlKey) {
      handleSave();
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          New Gratitude Entry
        </h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span>{new Date()?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>
      {/* Mood Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          How are you feeling?
        </label>
        <div className="flex flex-wrap gap-2">
          {moodOptions?.map((moodOption) => (
            <button
              key={moodOption?.value}
              onClick={() => setMood(moodOption?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                mood === moodOption?.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-text-secondary border-border hover:border-primary/50'
              }`}
            >
              <Icon name={moodOption?.icon} size={16} />
              <span className="text-sm">{moodOption?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Main Entry Area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          What are you grateful for today?
        </label>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e?.target?.value)}
          onKeyPress={handleKeyPress}
          placeholder="Take a moment to reflect on the positive moments, people, or experiences that brought joy to your day. Even small things matter..."
          className="w-full h-32 sm:h-40 p-4 border border-border rounded-lg bg-input text-foreground placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          maxLength={maxCharacters}
        />
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs ${
            entry?.length > maxCharacters * 0.9 ? 'text-warning' : 'text-text-secondary'
          }`}>
            {entry?.length}/{maxCharacters} characters
          </span>
          <span className="text-xs text-text-secondary">
            Ctrl + Enter to save
          </span>
        </div>
      </div>
      {/* Tags Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Tags (optional)
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-error transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            </span>
          ))}
        </div>
        {tags?.length < 5 && (
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && addTag()}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
              maxLength={20}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={addTag}
              disabled={!newTag?.trim()}
              iconName="Plus"
            >
              Add
            </Button>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={handleSave}
          disabled={!entry?.trim() || isLoading}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
          className="flex-1"
        >
          Save Entry
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setEntry('');
            setMood('');
            setTags([]);
          }}
          disabled={!entry && !mood && tags?.length === 0}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Clear
        </Button>
      </div>
      {/* Writing Tips */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Writing Tips</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Be specific about what made you grateful</li>
              <li>• Include how it made you feel</li>
              <li>• Consider both big and small moments</li>
              <li>• Write in your own authentic voice</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;