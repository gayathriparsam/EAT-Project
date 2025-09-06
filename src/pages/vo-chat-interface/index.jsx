import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ChatMessage from './components/ChatMessage';
import VoiceRecorder from './components/VoiceRecorder';
import ChatInput from './components/ChatInput';
import ConversationSettings from './components/ConversationSettings';
import EmotionalStateIndicator from './components/EmotionalStateIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VoChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock conversation data
  const initialMessages = [
    {
      id: 1,
      message: `Hello! I'm here to provide emotional support and listen to whatever you'd like to share. How are you feeling today?`,
      isUser: false,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      message: "Hi, I've been feeling a bit overwhelmed lately with work and personal stuff. It's been hard to manage everything.",
      isUser: true,
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: 3,
      message: `I understand that feeling overwhelmed can be really challenging. It sounds like you're dealing with a lot right now.\n\nWould you like to talk about what's been weighing on you the most? Sometimes breaking things down can help make them feel more manageable.`,
      isUser: false,
      timestamp: new Date(Date.now() - 180000)
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message) => {
    const newMessage = {
      id: Date.now(),
      message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        `Thank you for sharing that with me. It takes courage to open up about difficult feelings.\n\nWhat you're experiencing sounds really valid. Can you tell me more about what specific aspects feel most overwhelming?`,
        `I hear you, and I want you to know that your feelings are completely understandable.\n\nIt's okay to feel this way when you're managing multiple responsibilities. Have you been able to take any time for yourself lately?`,
        `That sounds like a lot to handle. You're doing better than you might think by reaching out and talking about it.\n\nSometimes when we're overwhelmed, it helps to focus on just one thing at a time. What feels like the most urgent priority right now?`,`I appreciate you trusting me with these feelings. It's clear you're going through a challenging time.\n\nRemember that it's okay to not have everything figured out right now. What usually helps you feel more grounded when things get intense?`
      ];

      const randomResponse = aiResponses?.[Math.floor(Math.random() * aiResponses?.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        message: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1000);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate voice message processing
    handleSendMessage("I just shared my feelings through voice message about feeling anxious about upcoming deadlines and family responsibilities.");
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  };

  const handleEmotionChange = (emotion) => {
    setCurrentEmotion(emotion);
  };

  const handleClearChat = () => {
    setMessages([initialMessages?.[0]]);
  };

  return (
    <>
      <Helmet>
        <title>VoChat Interface - E.A.T Emotional Support</title>
        <meta name="description" content="AI-powered emotional support through voice and text communication in a safe, supportive environment." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-32 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)]">
              
              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col bg-card rounded-xl border border-border shadow-gentle overflow-hidden">
                
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="Bot" size={20} color="white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">AI Emotional Support</h2>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-error'}`} />
                        <span className="text-sm text-text-secondary">
                          {isConnected ? 'Connected' : 'Reconnecting...'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClearChat}
                      iconName="RotateCcw"
                      className="text-text-secondary hover:text-foreground"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSettingsOpen(true)}
                      iconName="Settings"
                      className="text-text-secondary hover:text-foreground lg:hidden"
                    />
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message?.message}
                      isUser={message?.isUser}
                      timestamp={message?.timestamp}
                    />
                  ))}
                  
                  {isTyping && (
                    <ChatMessage 
                      message=""
                      isUser={false}
                      timestamp={new Date()}
                      isTyping={true} 
                    />
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <ChatInput
                  onSendMessage={handleSendMessage}
                  onStartVoiceRecording={handleStartRecording}
                  disabled={isTyping}
                />
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-80 space-y-6">
                <EmotionalStateIndicator
                  currentState={currentEmotion}
                  onStateChange={handleEmotionChange}
                />

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Heart"
                      iconPosition="left"
                      className="justify-start text-sm"
                    >
                      Gratitude Journal
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Activity"
                      iconPosition="left"
                      className="justify-start text-sm"
                    >
                      Mood Tracker
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Users"
                      iconPosition="left"
                      className="justify-start text-sm"
                    >
                      Community Support
                    </Button>
                  </div>
                </div>

                {/* Conversation Stats */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Session Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Messages</span>
                      <span className="text-sm font-medium text-foreground">{messages?.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Session Time</span>
                      <span className="text-sm font-medium text-foreground">12 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Mood Trend</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="TrendingUp" size={14} className="text-success" />
                        <span className="text-sm font-medium text-success">Improving</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings Panel for Desktop */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-foreground">Settings</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSettingsOpen(true)}
                      iconName="Settings"
                      className="text-text-secondary hover:text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Voice</span>
                      <span className="text-sm font-medium text-foreground">Female - Calm</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Speed</span>
                      <span className="text-sm font-medium text-foreground">Normal</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Language</span>
                      <span className="text-sm font-medium text-foreground">English</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Recorder Overlay */}
        <VoiceRecorder
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onCancelRecording={handleCancelRecording}
        />

        {/* Settings Panel */}
        <ConversationSettings
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />

        {/* Mobile Emotional State Indicator */}
        <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40">
          <EmotionalStateIndicator
            currentState={currentEmotion}
            onStateChange={handleEmotionChange}
          />
        </div>
      </div>
    </>
  );
};

export default VoChatInterface;