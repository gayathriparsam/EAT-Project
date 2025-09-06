import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ConversationSettings = ({ isOpen, onClose }) => {
  const [voiceSettings, setVoiceSettings] = useState({
    voice: 'female-calm',
    speed: 'normal',
    language: 'en-US'
  });

  const [emotionalState, setEmotionalState] = useState('neutral');

  const voiceOptions = [
    { value: 'female-calm', label: 'Female - Calm' },
    { value: 'female-warm', label: 'Female - Warm' },
    { value: 'male-gentle', label: 'Male - Gentle' },
    { value: 'male-confident', label: 'Male - Confident' }
  ];

  const speedOptions = [
    { value: 'slow', label: 'Slow' },
    { value: 'normal', label: 'Normal' },
    { value: 'fast', label: 'Fast' }
  ];

  const languageOptions = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' }
  ];

  const emotionalStates = [
    { value: 'happy', label: 'Happy', color: 'bg-success', icon: 'Smile' },
    { value: 'sad', label: 'Sad', color: 'bg-primary', icon: 'Frown' },
    { value: 'anxious', label: 'Anxious', color: 'bg-warning', icon: 'Zap' },
    { value: 'angry', label: 'Angry', color: 'bg-error', icon: 'Flame' },
    { value: 'neutral', label: 'Neutral', color: 'bg-muted', icon: 'Minus' },
    { value: 'excited', label: 'Excited', color: 'bg-accent', icon: 'Star' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 lg:relative lg:bg-transparent lg:inset-auto">
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border shadow-elevated lg:relative lg:w-80">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Settings</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            className="text-text-secondary hover:text-foreground"
          />
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-full">
          {/* Voice Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Voice Preferences</h4>
            
            <Select
              label="Voice Type"
              options={voiceOptions}
              value={voiceSettings?.voice}
              onChange={(value) => setVoiceSettings(prev => ({ ...prev, voice: value }))}
            />

            <Select
              label="Speaking Speed"
              options={speedOptions}
              value={voiceSettings?.speed}
              onChange={(value) => setVoiceSettings(prev => ({ ...prev, speed: value }))}
            />

            <Select
              label="Language"
              options={languageOptions}
              value={voiceSettings?.language}
              onChange={(value) => setVoiceSettings(prev => ({ ...prev, language: value }))}
            />
          </div>

          {/* Current Emotional State */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">How are you feeling?</h4>
            <div className="grid grid-cols-2 gap-2">
              {emotionalStates?.map((state) => (
                <button
                  key={state?.value}
                  onClick={() => setEmotionalState(state?.value)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    emotionalState === state?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-foreground'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${state?.color}`} />
                  <Icon name={state?.icon} size={16} />
                  <span className="text-sm font-medium">{state?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation History */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Conversation</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
                className="justify-start"
              >
                Export Chat
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Trash2"
                iconPosition="left"
                className="justify-start text-error border-error hover:bg-error hover:text-error-foreground"
              >
                Clear History
              </Button>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <h4 className="font-medium text-error">Need Immediate Help?</h4>
            </div>
            <p className="text-sm text-text-secondary mb-3">
              If you're in crisis, please reach out for professional support.
            </p>
            <Button
              variant="outline"
              fullWidth
              iconName="Phone"
              iconPosition="left"
              className="border-error text-error hover:bg-error hover:text-error-foreground"
            >
              Crisis Hotline: 988
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSettings;