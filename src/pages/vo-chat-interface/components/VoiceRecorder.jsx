import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceRecorder = ({ isRecording, onStartRecording, onStopRecording, onCancelRecording }) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveformBars, setWaveformBars] = useState(Array(20)?.fill(0));

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        // Simulate waveform animation
        setWaveformBars(prev => prev?.map(() => Math.random() * 100));
      }, 100);
    } else {
      setRecordingTime(0);
      setWaveformBars(Array(20)?.fill(0));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 600);
    const secs = Math.floor((seconds % 600) / 10);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (!isRecording) {
    return (
      <Button
        variant="default"
        size="icon"
        onClick={onStartRecording}
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg voice-indicator"
      >
        <Icon name="Mic" size={24} color="white" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-8 w-full max-w-md shadow-elevated">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-error rounded-full flex items-center justify-center mx-auto mb-4 breathing-animation">
            <Icon name="Mic" size={32} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Recording...</h3>
          <p className="text-2xl font-mono text-primary">{formatTime(recordingTime)}</p>
        </div>

        {/* Waveform Visualization */}
        <div className="flex items-center justify-center space-x-1 mb-8 h-16">
          {waveformBars?.map((height, index) => (
            <div
              key={index}
              className="bg-primary rounded-full transition-all duration-100"
              style={{
                width: '3px',
                height: `${Math.max(4, height * 0.6)}px`,
                opacity: height > 20 ? 1 : 0.3
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onCancelRecording}
            iconName="X"
            className="border-text-secondary text-text-secondary hover:border-error hover:text-error"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={onStopRecording}
            iconName="Send"
            className="bg-primary hover:bg-primary/90"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;