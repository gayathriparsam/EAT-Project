import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 max-w-xs sm:max-w-md">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-primary' : 'bg-secondary'
      }`}>
        <Icon name={isUser ? 'User' : 'Bot'} size={16} color="white" />
      </div>
      <div className={`rounded-2xl px-4 py-3 max-w-xs sm:max-w-md ${
        isUser 
          ? 'bg-primary text-primary-foreground rounded-tr-md' 
          : 'bg-muted text-foreground rounded-tl-md'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        <div className={`flex items-center mt-2 space-x-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className={`text-xs ${
            isUser ? 'text-primary-foreground/70' : 'text-text-secondary'
          }`}>
            {formatTime(timestamp)}
          </span>
          {isUser && (
            <Icon name="Check" size={12} className="text-primary-foreground/70" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;