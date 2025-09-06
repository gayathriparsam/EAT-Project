import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const QuickLogForm = ({ selectedMood, intensity, onLogMood, isLoading }) => {
  const [notes, setNotes] = useState('');
  const [sleepQuality, setSleepQuality] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [selectedTriggers, setSelectedTriggers] = useState([]);

  const triggers = [
    'Work', 'Family', 'Health', 'Money', 'Relationships', 'Weather', 
    'Exercise', 'Sleep', 'Social Media', 'News', 'Traffic', 'Other'
  ];

  const handleTriggerToggle = (trigger) => {
    setSelectedTriggers(prev => 
      prev?.includes(trigger) 
        ? prev?.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!selectedMood) return;

    const logEntry = {
      mood: selectedMood,
      intensity,
      notes: notes?.trim(),
      sleepQuality,
      energyLevel,
      triggers: selectedTriggers,
      timestamp: new Date()?.toISOString(),
      date: new Date()?.toDateString()
    };

    onLogMood(logEntry);
    
    // Reset form
    setNotes('');
    setSleepQuality(5);
    setEnergyLevel(5);
    setSelectedTriggers([]);
  };

  const getMoodEmoji = (moodId) => {
    const moodEmojis = {
      happy: '😊',
      sad: '😢',
      anxious: '😰',
      stressed: '😤',
      calm: '😌',
      energetic: '⚡'
    };
    return moodEmojis?.[moodId] || '😐';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="PenTool" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Quick Log</h2>
          <p className="text-sm text-text-secondary">Add context to your mood entry</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Selection Summary */}
        {selectedMood && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getMoodEmoji(selectedMood)}</span>
              <div>
                <p className="font-medium text-foreground capitalize">{selectedMood}</p>
                <p className="text-sm text-text-secondary">Intensity: {intensity}/10</p>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <Input
            label="Notes (Optional)"
            type="text"
            placeholder="What's on your mind? Any specific thoughts or events..."
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            description="Share what might have influenced your mood today"
            className="resize-none"
          />
        </div>

        {/* Sleep Quality */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Sleep Quality</label>
            <span className="text-sm text-text-secondary">{sleepQuality}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={sleepQuality}
            onChange={(e) => setSleepQuality(parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${sleepQuality * 10}%, var(--color-muted) ${sleepQuality * 10}%, var(--color-muted) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Poor</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Energy Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Energy Level</label>
            <span className="text-sm text-text-secondary">{energyLevel}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-success) 0%, var(--color-success) ${energyLevel * 10}%, var(--color-muted) ${energyLevel * 10}%, var(--color-muted) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        {/* Triggers */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Possible Triggers</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {triggers?.map((trigger) => (
              <button
                key={trigger}
                type="button"
                onClick={() => handleTriggerToggle(trigger)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTriggers?.includes(trigger)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-muted/80'
                }`}
              >
                {trigger}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={!selectedMood}
          iconName="Save"
          iconPosition="left"
        >
          {isLoading ? 'Saving...' : 'Log Mood Entry'}
        </Button>
      </form>
    </div>
  );
};

export default QuickLogForm;