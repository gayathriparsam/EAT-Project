import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MoodChart = ({ moodData, onExportData }) => {
  const [chartType, setChartType] = useState('line');
  const [timeFilter, setTimeFilter] = useState('7days');
  const [moodFilter, setMoodFilter] = useState('all');

  // Filter data based on selected filters
  const getFilteredData = () => {
    let filtered = [...moodData];
    
    // Time filter
    const now = new Date();
    const filterDays = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      'all': Infinity
    };
    
    const daysToFilter = filterDays?.[timeFilter];
    if (daysToFilter !== Infinity) {
      const cutoffDate = new Date(now.getTime() - (daysToFilter * 24 * 60 * 60 * 1000));
      filtered = filtered?.filter(entry => new Date(entry.timestamp) >= cutoffDate);
    }
    
    // Mood filter
    if (moodFilter !== 'all') {
      filtered = filtered?.filter(entry => entry?.mood === moodFilter);
    }
    
    // Sort by date
    filtered?.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    // Format for chart
    return filtered?.map((entry, index) => ({
      ...entry,
      date: new Date(entry.timestamp)?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      dayIndex: index + 1
    }));
  };

  // Get mood distribution data
  const getMoodDistribution = () => {
    let filtered = getFilteredData();
    const distribution = {};
    
    filtered?.forEach(entry => {
      if (!distribution?.[entry?.mood]) {
        distribution[entry.mood] = { count: 0, totalIntensity: 0 };
      }
      distribution[entry.mood].count++;
      distribution[entry.mood].totalIntensity += entry?.intensity;
    });
    
    return Object.entries(distribution)?.map(([mood, data]) => ({
      mood: mood?.charAt(0)?.toUpperCase() + mood?.slice(1),
      count: data?.count,
      avgIntensity: (data?.totalIntensity / data?.count)?.toFixed(1),
      percentage: ((data?.count / filtered?.length) * 100)?.toFixed(1)
    }));
  };

  const chartData = getFilteredData();
  const distributionData = getMoodDistribution();

  const moodColors = {
    happy: '#FCD34D',
    sad: '#60A5FA',
    anxious: '#FB923C',
    stressed: '#F87171',
    calm: '#34D399',
    energetic: '#A78BFA'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-text-secondary">
            Mood: <span className="capitalize font-medium">{data?.mood}</span>
          </p>
          <p className="text-sm text-text-secondary">
            Intensity: <span className="font-medium">{data?.intensity}/10</span>
          </p>
          {data?.notes && (
            <p className="text-xs text-text-secondary mt-1 max-w-48 truncate">
              "{data?.notes}"
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">Mood Analytics</h2>
            <p className="text-sm text-text-secondary">Track your emotional patterns</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={onExportData}
          iconName="Download"
          iconPosition="left"
          className="self-start sm:self-auto"
        >
          Export Data
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted rounded-lg">
        {/* Chart Type */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Chart:</span>
          <div className="flex space-x-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                chartType === 'line' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-foreground'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                chartType === 'bar' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-foreground'
              }`}
            >
              Bar
            </button>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Period:</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e?.target?.value)}
            className="px-2 py-1 rounded text-xs bg-background border border-border text-foreground"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </div>

        {/* Mood Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Mood:</span>
          <select
            value={moodFilter}
            onChange={(e) => setMoodFilter(e?.target?.value)}
            className="px-2 py-1 rounded text-xs bg-background border border-border text-foreground"
          >
            <option value="all">All moods</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="anxious">Anxious</option>
            <option value="stressed">Stressed</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
          </select>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 10]}
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 10]}
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="intensity" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Mood Distribution */}
      {distributionData?.length > 0 && (
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Mood Distribution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {distributionData?.map((mood) => (
              <div key={mood?.mood} className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{mood?.mood}</span>
                  <span className="text-sm text-text-secondary">{mood?.percentage}%</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Count:</span>
                    <span className="text-foreground">{mood?.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Avg Intensity:</span>
                    <span className="text-foreground">{mood?.avgIntensity}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* No Data Message */}
      {chartData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="BarChart3" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Data Available</h3>
          <p className="text-text-secondary">Start logging your moods to see analytics here.</p>
        </div>
      )}
    </div>
  );
};

export default MoodChart;