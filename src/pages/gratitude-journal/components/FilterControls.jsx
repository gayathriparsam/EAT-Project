import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ onFilterChange, onSearch, totalEntries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const sentimentOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'very positive', label: 'Very Positive' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' }
  ];

  const moodOptions = [
    { value: 'all', label: 'All Moods' },
    { value: 'grateful', label: 'Grateful' },
    { value: 'peaceful', label: 'Peaceful' },
    { value: 'hopeful', label: 'Hopeful' },
    { value: 'content', label: 'Content' },
    { value: 'inspired', label: 'Inspired' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'sentiment', label: 'By Sentiment' },
    { value: 'wordCount', label: 'By Length' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const filters = {
      sentiment: selectedSentiment,
      mood: selectedMood,
      dateRange: dateRange,
      sortBy: sortBy,
      [filterType]: value
    };

    switch (filterType) {
      case 'sentiment':
        setSelectedSentiment(value);
        break;
      case 'mood':
        setSelectedMood(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
      case 'sortBy':
        setSortBy(value);
        break;
    }

    onFilterChange(filters);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSentiment('all');
    setSelectedMood('all');
    setDateRange('all');
    setSortBy('newest');
    setShowAdvanced(false);
    
    onSearch('');
    onFilterChange({
      sentiment: 'all',
      mood: 'all',
      dateRange: 'all',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = searchTerm || selectedSentiment !== 'all' || 
                          selectedMood !== 'all' || dateRange !== 'all' || 
                          sortBy !== 'newest';

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Filter & Search
          </h3>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {totalEntries} entries
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
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
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search your gratitude entries..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
        
        <Select
          label="Sort By"
          options={sortOptions}
          value={sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
        
        <Select
          label="Sentiment"
          options={sentimentOptions}
          value={selectedSentiment}
          onChange={(value) => handleFilterChange('sentiment', value)}
        />
        
        <Select
          label="Mood"
          options={moodOptions}
          value={selectedMood}
          onChange={(value) => handleFilterChange('mood', value)}
        />
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Date Buttons */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quick Date Filters
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Today', value: 'today' },
                  { label: 'Yesterday', value: 'yesterday' },
                  { label: 'This Week', value: 'week' },
                  { label: 'Last Week', value: 'lastWeek' }
                ]?.map((option) => (
                  <Button
                    key={option?.value}
                    variant={dateRange === option?.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('dateRange', option?.value)}
                  >
                    {option?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Word Count Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Entry Length
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Short', value: 'short', desc: '< 50 words' },
                  { label: 'Medium', value: 'medium', desc: '50-150 words' },
                  { label: 'Long', value: 'long', desc: '> 150 words' }
                ]?.map((option) => (
                  <Button
                    key={option?.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange('wordCount', option?.value)}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <span className="text-sm font-medium">{option?.label}</span>
                    <span className="text-xs text-text-secondary">{option?.desc}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Active Filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="px-2 py-1 bg-background rounded-full text-xs">
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedSentiment !== 'all' && (
                  <span className="px-2 py-1 bg-background rounded-full text-xs">
                    Sentiment: {sentimentOptions?.find(opt => opt?.value === selectedSentiment)?.label}
                  </span>
                )}
                {selectedMood !== 'all' && (
                  <span className="px-2 py-1 bg-background rounded-full text-xs">
                    Mood: {moodOptions?.find(opt => opt?.value === selectedMood)?.label}
                  </span>
                )}
                {dateRange !== 'all' && (
                  <span className="px-2 py-1 bg-background rounded-full text-xs">
                    Date: {dateRangeOptions?.find(opt => opt?.value === dateRange)?.label}
                  </span>
                )}
                {sortBy !== 'newest' && (
                  <span className="px-2 py-1 bg-background rounded-full text-xs">
                    Sort: {sortOptions?.find(opt => opt?.value === sortBy)?.label}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;