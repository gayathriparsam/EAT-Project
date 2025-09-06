import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressDisplay = ({ currentStreak, totalEntries, monthlyData, weeklyTrend }) => {
  const today = new Date();
  const currentMonth = today?.getMonth();
  const currentYear = today?.getFullYear();
  
  // Generate calendar days for current month
  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
      const moodData = monthlyData?.find(entry => entry?.date === dateStr);
      days?.push({
        day,
        date: dateStr,
        mood: moodData?.mood || null,
        intensity: moodData?.intensity || 0
      });
    }
    
    return days;
  };

  const getMoodColor = (mood, intensity) => {
    if (!mood) return 'bg-gray-100';
    
    const baseColors = {
      happy: 'bg-yellow-200',
      sad: 'bg-blue-200',
      anxious: 'bg-orange-200',
      stressed: 'bg-red-200',
      calm: 'bg-green-200',
      energetic: 'bg-purple-200'
    };
    
    const intensityColors = {
      happy: intensity > 7 ? 'bg-yellow-400' : intensity > 4 ? 'bg-yellow-300' : 'bg-yellow-200',
      sad: intensity > 7 ? 'bg-blue-400' : intensity > 4 ? 'bg-blue-300' : 'bg-blue-200',
      anxious: intensity > 7 ? 'bg-orange-400' : intensity > 4 ? 'bg-orange-300' : 'bg-orange-200',
      stressed: intensity > 7 ? 'bg-red-400' : intensity > 4 ? 'bg-red-300' : 'bg-red-200',
      calm: intensity > 7 ? 'bg-green-400' : intensity > 4 ? 'bg-green-300' : 'bg-green-200',
      energetic: intensity > 7 ? 'bg-purple-400' : intensity > 4 ? 'bg-purple-300' : 'bg-purple-200'
    };
    
    return intensityColors?.[mood] || baseColors?.[mood] || 'bg-gray-200';
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = getDaysInMonth(currentMonth, currentYear);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Flame" size={20} color="white" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{currentStreak}</p>
              <p className="text-sm text-text-secondary">Day Streak</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{totalEntries}</p>
              <p className="text-sm text-text-secondary">Total Entries</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{monthlyData?.length}</p>
              <p className="text-sm text-text-secondary">This Month</p>
            </div>
          </div>
        </div>
      </div>
      {/* Monthly Calendar */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {monthNames?.[currentMonth]} {currentYear}
              </h3>
              <p className="text-sm text-text-secondary">Monthly mood overview</p>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames?.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-text-secondary py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays?.map((dayData, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                  dayData
                    ? `${getMoodColor(dayData?.mood, dayData?.intensity)} ${
                        dayData?.mood ? 'cursor-pointer hover:scale-105' : 'bg-muted'
                      }`
                    : ''
                }`}
                title={dayData?.mood ? `${dayData?.mood} (${dayData?.intensity}/10)` : ''}
              >
                {dayData?.day}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-secondary mb-2">Mood intensity:</p>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span className="text-text-secondary">Low (1-4)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary/60 rounded"></div>
              <span className="text-text-secondary">Medium (5-7)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span className="text-text-secondary">High (8-10)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Weekly Trend */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-gentle">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">Weekly Trend</h3>
            <p className="text-sm text-text-secondary">Average mood intensity</p>
          </div>
        </div>

        <div className="space-y-3">
          {weeklyTrend?.map((day, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-12 text-sm font-medium text-text-secondary">
                {day?.day}
              </div>
              <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(day?.average / 10) * 100}%` }}
                ></div>
              </div>
              <div className="w-8 text-sm font-medium text-foreground">
                {day?.average?.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDisplay;