import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const CalendarView = ({ entries, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }

    return days;
  };

  const getEntriesForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return entries?.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate?.toDateString() === dateStr;
    });
  };

  const getSentimentColor = (entries) => {
    if (!entries?.length) return '';
    
    const avgSentiment = entries?.reduce((acc, entry) => {
      switch (entry?.sentiment) {
        case 'very positive': return acc + 5;
        case 'positive': return acc + 4;
        case 'neutral': return acc + 3;
        default: return acc + 4;
      }
    }, 0) / entries?.length;

    if (avgSentiment >= 4.5) return 'bg-green-500';
    if (avgSentiment >= 3.5) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            iconName="Calendar"
            iconPosition="left"
          >
            Today
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
          />
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day Headers */}
        {dayNames?.map((day) => (
          <div key={day} className="p-2 text-center">
            <span className="text-sm font-medium text-text-secondary">{day}</span>
          </div>
        ))}
        
        {/* Calendar Days */}
        {days?.map((date, index) => {
          const dayEntries = getEntriesForDate(date);
          const hasEntries = dayEntries?.length > 0;
          
          return (
            <div key={index} className="aspect-square p-1">
              {date ? (
                <button
                  onClick={() => onDateSelect(date)}
                  className={`w-full h-full rounded-lg border-2 transition-all duration-200 relative ${
                    isSelected(date)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isToday(date)
                      ? 'border-primary bg-primary/10 text-primary'
                      : hasEntries
                      ? 'border-border bg-card hover:border-primary/50' :'border-transparent hover:border-border hover:bg-muted'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    isSelected(date) || isToday(date) ? '' : 'text-foreground'
                  }`}>
                    {date?.getDate()}
                  </span>
                  
                  {/* Entry Indicators */}
                  {hasEntries && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {dayEntries?.slice(0, 3)?.map((entry, entryIndex) => (
                        <div
                          key={entryIndex}
                          className={`w-1.5 h-1.5 rounded-full ${getSentimentColor([entry])}`}
                        />
                      ))}
                      {dayEntries?.length > 3 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                      )}
                    </div>
                  )}
                </button>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-text-secondary">Very Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-text-secondary">Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span className="text-sm text-text-secondary">Neutral</span>
          </div>
        </div>
        
        <div className="text-sm text-text-secondary">
          {entries?.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate?.getMonth() === currentMonth?.getMonth() && 
                   entryDate?.getFullYear() === currentMonth?.getFullYear();
          })?.length} entries this month
        </div>
      </div>
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <span className="text-sm text-text-secondary">
              {getEntriesForDate(selectedDate)?.length} entries
            </span>
          </div>
          
          {getEntriesForDate(selectedDate)?.length > 0 ? (
            <div className="space-y-2">
              {getEntriesForDate(selectedDate)?.map((entry, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-background rounded">
                  <div className={`w-2 h-2 rounded-full ${getSentimentColor([entry])}`} />
                  <span className="text-sm text-foreground flex-1">
                    {entry?.content?.substring(0, 60)}...
                  </span>
                  {entry?.mood && (
                    <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full">
                      {entry?.mood}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">No entries for this date</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;