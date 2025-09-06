import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import JournalEntry from './components/JournalEntry';
import EntryCard from './components/EntryCard';
import ProgressStats from './components/ProgressStats';
import FilterControls from './components/FilterControls';
import CalendarView from './components/CalendarView';

const GratitudeJournal = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState('list'); // list, calendar, stats
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showInspiration, setShowInspiration] = useState(true);

  // Mock data for initial entries
  const mockEntries = [
    {
      id: 1,
      content: `Today I'm grateful for the warm cup of coffee that started my morning perfectly. The aroma filled my kitchen and gave me a moment of peace before the busy day began. I'm also thankful for my colleague Sarah who helped me with the presentation - her support made all the difference.`,
      mood: 'grateful',
      tags: ['morning', 'coffee', 'colleagues'],
      date: new Date(Date.now() - 86400000)?.toISOString(), // Yesterday
      sentiment: 'very positive',
      wordCount: 52
    },
    {
      id: 2,
      content: `I'm grateful for the unexpected phone call from my old friend Mark. We hadn't spoken in months, but it felt like no time had passed at all. These connections remind me how blessed I am to have such wonderful people in my life.`,
      mood: 'peaceful',
      tags: ['friendship', 'connection'],
      date: new Date(Date.now() - 172800000)?.toISOString(), // 2 days ago
      sentiment: 'positive',
      wordCount: 41
    },
    {
      id: 3,
      content: `Today was challenging, but I'm grateful for the lesson it taught me about resilience. Even when things don't go as planned, I can find strength I didn't know I had. My family's encouragement helped me push through.`,
      mood: 'hopeful',
      tags: ['resilience', 'family', 'growth'],
      date: new Date(Date.now() - 259200000)?.toISOString(), // 3 days ago
      sentiment: 'positive',
      wordCount: 38
    },
    {
      id: 4,
      content: `I'm grateful for the beautiful sunset I witnessed during my evening walk. The colors painted across the sky reminded me to slow down and appreciate the natural beauty around us. These moments of wonder are precious gifts.`,
      mood: 'content',
      tags: ['nature', 'beauty', 'mindfulness'],
      date: new Date(Date.now() - 345600000)?.toISOString(), // 4 days ago
      sentiment: 'very positive',
      wordCount: 44
    },
    {
      id: 5,
      content: `Today I'm thankful for my health and the ability to move my body. My morning yoga session reminded me not to take these simple pleasures for granted. Every breath, every stretch is a gift.`,
      mood: 'grateful',
      tags: ['health', 'yoga', 'mindfulness'],
      date: new Date(Date.now() - 432000000)?.toISOString(), // 5 days ago
      sentiment: 'positive',
      wordCount: 35
    }
  ];

  const inspirationalQuotes = [
    "Gratitude turns what we have into enough.",
    "The thankful heart opens the channels of the soul.",
    "Gratitude is not only the greatest of virtues but the parent of others.",
    "In ordinary life, we hardly realize that we receive a great deal more than we give, and that it is only with gratitude that life becomes rich.",
    "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow."
  ];

  useEffect(() => {
    // Initialize with mock data
    setEntries(mockEntries);
    setFilteredEntries(mockEntries);
  }, []);

  const handleSaveEntry = (newEntry) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingEntry) {
        // Update existing entry
        const updatedEntries = entries?.map(entry => 
          entry?.id === editingEntry?.id ? { ...newEntry, id: editingEntry?.id } : entry
        );
        setEntries(updatedEntries);
        setFilteredEntries(updatedEntries);
        setEditingEntry(null);
      } else {
        // Add new entry
        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        setFilteredEntries(updatedEntries);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    // Scroll to top to show the entry form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries?.filter(entry => entry?.id !== entryId);
      setEntries(updatedEntries);
      setFilteredEntries(updatedEntries);
    }
  };

  const handleShareEntry = (entry) => {
    if (navigator.share) {
      navigator.share({
        title: 'My Gratitude Entry',
        text: entry?.content,
        url: window.location?.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(entry?.content);
      alert('Entry copied to clipboard!');
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...entries];

    // Apply sentiment filter
    if (filters?.sentiment !== 'all') {
      filtered = filtered?.filter(entry => entry?.sentiment === filters?.sentiment);
    }

    // Apply mood filter
    if (filters?.mood !== 'all') {
      filtered = filtered?.filter(entry => entry?.mood === filters?.mood);
    }

    // Apply date range filter
    if (filters?.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          filtered = filtered?.filter(entry => {
            const entryDate = new Date(entry.date);
            entryDate?.setHours(0, 0, 0, 0);
            return entryDate?.getTime() === filterDate?.getTime();
          });
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          filtered = filtered?.filter(entry => new Date(entry.date) >= filterDate);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          filtered = filtered?.filter(entry => new Date(entry.date) >= filterDate);
          break;
        case 'quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          filtered = filtered?.filter(entry => new Date(entry.date) >= filterDate);
          break;
        case 'year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          filtered = filtered?.filter(entry => new Date(entry.date) >= filterDate);
          break;
      }
    }

    // Apply sorting
    switch (filters?.sortBy) {
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'sentiment':
        filtered?.sort((a, b) => {
          const sentimentOrder = { 'very positive': 3, 'positive': 2, 'neutral': 1 };
          return sentimentOrder?.[b?.sentiment] - sentimentOrder?.[a?.sentiment];
        });
        break;
      case 'wordCount':
        filtered?.sort((a, b) => b?.wordCount - a?.wordCount);
        break;
      default: // newest
        filtered?.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredEntries(filtered);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm?.trim()) {
      setFilteredEntries(entries);
      return;
    }

    let filtered = entries?.filter(entry =>
      entry?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      entry?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase())) ||
      entry?.mood?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    setFilteredEntries(filtered);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getRandomQuote = () => {
    return inspirationalQuotes?.[Math.floor(Math.random() * inspirationalQuotes?.length)];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Gratitude Journal
                </h1>
                <p className="text-lg text-text-secondary">
                  Cultivate positivity through daily reflection and appreciation
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                <Button
                  variant={activeView === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('list')}
                  iconName="List"
                  iconPosition="left"
                >
                  List
                </Button>
                <Button
                  variant={activeView === 'calendar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('calendar')}
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Calendar
                </Button>
                <Button
                  variant={activeView === 'stats' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('stats')}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  Stats
                </Button>
              </div>
            </div>
          </div>

          {/* Inspirational Quote */}
          {showInspiration && (
            <div className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Icon name="Quote" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground mb-1">
                      "{getRandomQuote()}"
                    </p>
                    <p className="text-sm text-text-secondary">
                      Daily inspiration for your gratitude practice
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInspiration(false)}
                  iconName="X"
                  className="text-text-secondary hover:text-foreground"
                />
              </div>
            </div>
          )}

          {/* Content based on active view */}
          {activeView === 'list' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Entry Form */}
              <div className="xl:col-span-1">
                <div className="sticky top-32">
                  <JournalEntry 
                    onSave={handleSaveEntry}
                    isLoading={isLoading}
                    editingEntry={editingEntry}
                  />
                </div>
              </div>

              {/* Right Column - Entries List */}
              <div className="xl:col-span-2 space-y-6">
                {/* Filter Controls */}
                <FilterControls
                  onFilterChange={handleFilterChange}
                  onSearch={handleSearch}
                  totalEntries={filteredEntries?.length}
                />

                {/* Entries List */}
                <div className="space-y-6">
                  {filteredEntries?.length > 0 ? (
                    filteredEntries?.map((entry) => (
                      <EntryCard
                        key={entry?.id}
                        entry={entry}
                        onEdit={handleEditEntry}
                        onDelete={handleDeleteEntry}
                        onShare={handleShareEntry}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                        <Icon name="BookOpen" size={32} className="text-text-secondary" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                        No entries found
                      </h3>
                      <p className="text-text-secondary mb-6">
                        Start your gratitude journey by writing your first entry, or adjust your filters to see more results.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Write First Entry
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeView === 'calendar' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <CalendarView
                  entries={entries}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                />
              </div>
              <div className="xl:col-span-1">
                <div className="sticky top-32">
                  <JournalEntry 
                    onSave={handleSaveEntry}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          )}

          {activeView === 'stats' && (
            <div className="space-y-8">
              <ProgressStats entries={entries} />
              
              {/* Recent Entries Preview */}
              <div className="bg-card rounded-xl p-6 shadow-gentle border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    Recent Entries
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setActiveView('list')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entries?.slice(0, 4)?.map((entry) => (
                    <div key={entry?.id} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {new Date(entry.date)?.toLocaleDateString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          entry?.sentiment === 'very positive' ? 'bg-green-100 text-green-700' :
                          entry?.sentiment === 'positive'? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {entry?.sentiment}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {entry?.content?.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GratitudeJournal;