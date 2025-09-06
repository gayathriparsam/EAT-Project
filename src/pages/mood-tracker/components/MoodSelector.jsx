import React from 'react';
import Icon from '../../../components/AppIcon';

const MoodSelector = ({ selectedMood, onMoodSelect, intensity, onIntensityChange }) => {
  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-100 border-yellow-300 text-yellow-800', activeColor: 'bg-yellow-200 border-yellow-400' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 border-blue-300 text-blue-800', activeColor: 'bg-blue-200 border-blue-400' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-orange-100 border-orange-300 text-orange-800', activeColor: 'bg-orange-200 border-orange-400' },
    { id: 'stressed', label: 'Stressed', emoji: '😤', color: 'bg-red-100 border-red-300 text-red-800', activeColor: 'bg-red-200 border-red-400' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'bg-green-100 border-green-300 text-green-800', activeColor: 'bg-green-200 border-green-400' },
    { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'bg-purple-100 border-purple-300 text-purple-800', activeColor: 'bg-purple-200 border-purple-400' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Heart" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">How are you feeling?</h2>
          <p className="text-sm text-text-secondary">Select your current mood</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {moods?.map((mood) => (
          <button
            key={mood?.id}
            onClick={() => onMoodSelect(mood?.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              selectedMood === mood?.id ? mood?.activeColor : mood?.color
            } ${selectedMood === mood?.id ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
          >
            <div className="text-3xl mb-2">{mood?.emoji}</div>
            <div className="font-medium text-sm">{mood?.label}</div>
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Intensity Level</label>
            <span className="text-sm text-text-secondary">{intensity}/10</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => onIntensityChange(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${intensity * 10}%, var(--color-muted) ${intensity * 10}%, var(--color-muted) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-text-secondary mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;