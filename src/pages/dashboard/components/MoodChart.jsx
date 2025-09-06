import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodChart = () => {
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { day: 'Mon', mood: 7, date: '2025-08-12' },
    { day: 'Tue', mood: 6, date: '2025-08-13' },
    { day: 'Wed', mood: 8, date: '2025-08-14' },
    { day: 'Thu', mood: 5, date: '2025-08-15' },
    { day: 'Fri', mood: 9, date: '2025-08-16' },
    { day: 'Sat', mood: 8, date: '2025-08-17' },
    { day: 'Sun', mood: 7, date: '2025-08-18' }
  ];

  const monthlyData = [
    { day: 'Week 1', mood: 6.5, date: 'Jul 22-28' },
    { day: 'Week 2', mood: 7.2, date: 'Jul 29-Aug 4' },
    { day: 'Week 3', mood: 6.8, date: 'Aug 5-11' },
    { day: 'Week 4', mood: 7.5, date: 'Aug 12-18' }
  ];

  const yearlyData = [
    { day: 'Jan', mood: 6.2, date: '2025-01' },
    { day: 'Feb', mood: 6.8, date: '2025-02' },
    { day: 'Mar', mood: 7.1, date: '2025-03' },
    { day: 'Apr', mood: 6.9, date: '2025-04' },
    { day: 'May', mood: 7.4, date: '2025-05' },
    { day: 'Jun', mood: 7.8, date: '2025-06' },
    { day: 'Jul', mood: 7.2, date: '2025-07' },
    { day: 'Aug', mood: 7.6, date: '2025-08' }
  ];

  const getData = () => {
    switch (timeRange) {
      case 'week': return weeklyData;
      case 'month': return monthlyData;
      case 'year': return yearlyData;
      default: return weeklyData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-text-secondary mb-1">{data?.date}</p>
          <p className="text-sm text-primary">
            Mood Score: <span className="font-semibold">{payload?.[0]?.value}/10</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getMoodTrend = () => {
    const data = getData();
    const recent = data?.slice(-2);
    if (recent?.length < 2) return 'stable';
    return recent?.[1]?.mood > recent?.[0]?.mood ? 'improving' : 
           recent?.[1]?.mood < recent?.[0]?.mood ? 'declining' : 'stable';
  };

  const trendIcons = {
    improving: { icon: 'TrendingUp', color: 'text-success' },
    declining: { icon: 'TrendingDown', color: 'text-warning' },
    stable: { icon: 'Minus', color: 'text-text-secondary' }
  };

  const trend = getMoodTrend();
  const trendInfo = trendIcons?.[trend];

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Mood Trends
            </h2>
            <div className="flex items-center space-x-2">
              <Icon name={trendInfo?.icon} size={16} className={trendInfo?.color} />
              <span className={`text-sm capitalize ${trendInfo?.color}`}>
                {trend}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {['week', 'month', 'year']?.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="text-xs"
            >
              {range?.charAt(0)?.toUpperCase() + range?.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full h-64" aria-label="Mood Trend Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
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
              dataKey="mood" 
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Average this {timeRange}:</span>
          <span className="font-semibold text-foreground">
            {(getData()?.reduce((sum, item) => sum + item?.mood, 0) / getData()?.length)?.toFixed(1)}/10
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoodChart;