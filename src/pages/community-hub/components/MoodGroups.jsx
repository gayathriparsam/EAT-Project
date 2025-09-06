import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodGroups = () => {
  const [activeGroup, setActiveGroup] = useState('all');

  const moodGroups = [
    {
      id: 'all',
      name: 'All Posts',
      icon: 'Globe',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      count: 1247,
      description: 'View all community posts'
    },
    {
      id: 'anxiety',
      name: 'Anxiety Support',
      icon: 'Zap',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      count: 342,
      description: 'Share experiences and coping strategies'
    },
    {
      id: 'gratitude',
      name: 'Gratitude Sharing',
      icon: 'Heart',
      color: 'text-success',
      bgColor: 'bg-success/10',
      count: 189,
      description: 'Celebrate positive moments together'
    },
    {
      id: 'motivation',
      name: 'Daily Motivation',
      icon: 'Sunrise',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      count: 156,
      description: 'Inspire and be inspired'
    },
    {
      id: 'depression',
      name: 'Depression Support',
      icon: 'Cloud',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      count: 98,
      description: 'Understanding and support for difficult days'
    },
    {
      id: 'wellness',
      name: 'Wellness Tips',
      icon: 'Leaf',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      count: 234,
      description: 'Share healthy habits and self-care'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Support Groups</h3>
          <p className="text-sm text-text-secondary">Find your community</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {moodGroups?.map((group) => (
          <button
            key={group?.id}
            onClick={() => setActiveGroup(group?.id)}
            className={`p-4 rounded-lg border transition-all duration-300 text-left hover:shadow-gentle ${
              activeGroup === group?.id
                ? 'border-primary bg-primary/5 shadow-gentle'
                : 'border-border bg-background hover:bg-muted'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 ${group?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={group?.icon} size={16} className={group?.color} />
              </div>
              <span className="text-xs text-text-secondary font-medium">{group?.count}</span>
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">{group?.name}</h4>
            <p className="text-xs text-text-secondary leading-relaxed">{group?.description}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Suggest New Group
        </Button>
      </div>
    </div>
  );
};

export default MoodGroups;