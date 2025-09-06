import React from 'react';
import Icon from '../../../components/AppIcon';

const EmotionalStateIndicator = ({ currentState = 'neutral', onStateChange }) => {
  const emotionalStates = [
    { 
      value: 'happy', 
      label: 'Happy', 
      color: 'text-success', 
      bgColor: 'bg-success/10', 
      borderColor: 'border-success/20',
      icon: 'Smile' 
    },
    { 
      value: 'sad', 
      label: 'Sad', 
      color: 'text-primary', 
      bgColor: 'bg-primary/10', 
      borderColor: 'border-primary/20',
      icon: 'Frown' 
    },
    { 
      value: 'anxious', 
      label: 'Anxious', 
      color: 'text-warning', 
      bgColor: 'bg-warning/10', 
      borderColor: 'border-warning/20',
      icon: 'Zap' 
    },
    { 
      value: 'angry', 
      label: 'Angry', 
      color: 'text-error', 
      bgColor: 'bg-error/10', 
      borderColor: 'border-error/20',
      icon: 'Flame' 
    },
    { 
      value: 'neutral', 
      label: 'Neutral', 
      color: 'text-text-secondary', 
      bgColor: 'bg-muted', 
      borderColor: 'border-border',
      icon: 'Minus' 
    },
    { 
      value: 'excited', 
      label: 'Excited', 
      color: 'text-accent', 
      bgColor: 'bg-accent/10', 
      borderColor: 'border-accent/20',
      icon: 'Star' 
    }
  ];

  const currentStateData = emotionalStates?.find(state => state?.value === currentState) || emotionalStates?.[4];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Current Mood</h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${currentStateData?.bgColor} ${currentStateData?.borderColor}`}>
          <Icon name={currentStateData?.icon} size={14} className={currentStateData?.color} />
          <span className={`text-sm font-medium ${currentStateData?.color}`}>
            {currentStateData?.label}
          </span>
        </div>
      </div>
      <p className="text-xs text-text-secondary mb-4">
        Let me know how you're feeling to provide better support
      </p>
      <div className="grid grid-cols-3 gap-2">
        {emotionalStates?.map((state) => (
          <button
            key={state?.value}
            onClick={() => onStateChange && onStateChange(state?.value)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg border transition-all ${
              currentState === state?.value
                ? `${state?.bgColor} ${state?.borderColor} ${state?.color}`
                : 'border-border hover:border-primary/50 text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon name={state?.icon} size={16} />
            <span className="text-xs font-medium">{state?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionalStateIndicator;