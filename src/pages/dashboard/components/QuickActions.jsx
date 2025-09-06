import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onLogMood, onAddGratitude, onStartVoChat }) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'mood',
      title: 'Log Mood',
      description: 'Track how you\'re feeling',
      icon: 'Activity',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      onClick: () => {
        onLogMood();
        navigate('/mood-tracker');
      }
    },
    {
      id: 'gratitude',
      title: 'Add Gratitude',
      description: 'Write what you\'re grateful for',
      icon: 'Heart',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      onClick: () => {
        onAddGratitude();
        navigate('/gratitude-journal');
      }
    },
    {
      id: 'vochat',
      title: 'Start VoChat',
      description: 'Talk with AI support',
      icon: 'MessageCircle',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      onClick: () => {
        onStartVoChat();
        navigate('/vo-chat-interface');
      }
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Quick Actions
          </h2>
          <p className="text-sm text-text-secondary">
            Jump into your wellness routine
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.id}
            className="group cursor-pointer"
            onClick={action?.onClick}
          >
            <div className="bg-muted hover:bg-muted/80 rounded-lg p-4 transition-all duration-300 group-hover:shadow-gentle border border-transparent group-hover:border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={action?.icon} size={20} className={action?.textColor} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action?.title}
                  </h3>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-text-secondary group-hover:text-primary transition-colors" 
                />
              </div>
              <p className="text-sm text-text-secondary">
                {action?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Daily Wellness Tip
            </p>
            <p className="text-sm text-text-secondary">
              Take 5 deep breaths when feeling overwhelmed. It activates your parasympathetic nervous system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;