import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityGuidelines = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const guidelines = [
    {
      icon: 'Heart',
      title: 'Be Kind & Supportive',
      description: 'Offer encouragement and understanding to fellow community members'
    },
    {
      icon: 'Shield',
      title: 'Respect Privacy',
      description: 'Keep personal information shared in confidence and respect boundaries'
    },
    {
      icon: 'AlertTriangle',
      title: 'Use Trigger Warnings',
      description: 'Mark content that might be sensitive or triggering for others'
    },
    {
      icon: 'Users',
      title: 'Foster Inclusion',
      description: 'Welcome all members regardless of background or experience level'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">Community Guidelines</h3>
            <p className="text-sm text-text-secondary">Creating a safe space for everyone</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {isExpanded ? 'Hide' : 'View All'}
        </Button>
      </div>
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guidelines?.map((guideline, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={guideline?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{guideline?.title}</h4>
                <p className="text-xs text-text-secondary mt-1">{guideline?.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Crisis Support Available</p>
              <p className="text-xs text-text-secondary mt-1">
                If you're in crisis, please contact 988 Suicide & Crisis Lifeline immediately or reach out to our professional moderators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;