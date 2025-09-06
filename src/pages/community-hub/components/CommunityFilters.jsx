import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunityFilters = ({ onFilterChange, onSearchChange }) => {
  const [activeFilter, setActiveFilter] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filterOptions = [
    { id: 'recent', label: 'Most Recent', icon: 'Clock' },
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'reactions', label: 'Most Reactions', icon: 'Heart' },
    { id: 'comments', label: 'Most Comments', icon: 'MessageCircle' }
  ];

  const topicFilters = [
    { id: 'anxiety', label: 'Anxiety', count: 342 },
    { id: 'depression', label: 'Depression', count: 189 },
    { id: 'gratitude', label: 'Gratitude', count: 156 },
    { id: 'motivation', label: 'Motivation', count: 234 },
    { id: 'wellness', label: 'Wellness', count: 98 },
    { id: 'relationships', label: 'Relationships', count: 67 }
  ];

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search posts, topics, or users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>
      </div>
      {/* Sort Options */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Sort by</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            Advanced
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => handleFilterChange(filter?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                activeFilter === filter?.id
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted text-text-secondary'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span className="text-sm font-medium">{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Topic Filters */}
          <div>
            <h5 className="font-medium text-foreground mb-3">Filter by Topic</h5>
            <div className="flex flex-wrap gap-2">
              {topicFilters?.map((topic) => (
                <button
                  key={topic?.id}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full border border-border hover:bg-muted transition-all duration-200"
                >
                  <span className="text-sm">{topic?.label}</span>
                  <span className="text-xs text-text-secondary bg-muted px-1.5 py-0.5 rounded-full">
                    {topic?.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div>
            <h5 className="font-medium text-foreground mb-3">Time Range</h5>
            <div className="flex flex-wrap gap-2">
              {['Today', 'This Week', 'This Month', 'All Time']?.map((range) => (
                <button
                  key={range}
                  className="px-3 py-2 rounded-lg border border-border hover:bg-muted text-sm transition-all duration-200"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type */}
          <div>
            <h5 className="font-medium text-foreground mb-3">Content Type</h5>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All Posts', icon: 'FileText' },
                { label: 'With Images', icon: 'Image' },
                { label: 'Questions', icon: 'HelpCircle' },
                { label: 'Success Stories', icon: 'Star' }
              ]?.map((type) => (
                <button
                  key={type?.label}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-muted text-sm transition-all duration-200"
                >
                  <Icon name={type?.icon} size={16} />
                  <span>{type?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => {
                setActiveFilter('recent');
                setSearchQuery('');
                onFilterChange('recent');
                onSearchChange('');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFilters;