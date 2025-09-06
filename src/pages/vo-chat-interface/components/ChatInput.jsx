import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, onStartVoiceRecording, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Type your message or feelings..."
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="resize-none"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onStartVoiceRecording}
            disabled={disabled}
            className="w-12 h-12 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Icon name="Mic" size={20} />
          </Button>
          
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!message?.trim() || disabled}
            className="w-12 h-12 rounded-full"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;