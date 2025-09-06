import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MoodSelector from './components/MoodSelector';
import QuickLogForm from './components/QuickLogForm';
import ProgressDisplay from './components/ProgressDisplay';
import MoodChart from './components/MoodChart';
import MoodHistory from './components/MoodHistory';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [moodEntries, setMoodEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('log');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for demonstration
  const mockMoodEntries = [
    {
      id: 1,
      mood: 'happy',
      intensity: 8,
      notes: 'Had a great day at work! Completed all my tasks and received positive feedback from my manager.',
      sleepQuality: 7,
      energyLevel: 8,
      triggers: ['Work', 'Exercise'],
      timestamp: new Date(Date.now() - 86400000)?.toISOString(), // Yesterday
      date: new Date(Date.now() - 86400000)?.toDateString()
    },
    {
      id: 2,
      mood: 'anxious',
      intensity: 6,
      notes: 'Feeling a bit overwhelmed with upcoming deadlines. Need to organize my schedule better.',
      sleepQuality: 5,
      energyLevel: 4,
      triggers: ['Work', 'Money'],
      timestamp: new Date(Date.now() - 172800000)?.toISOString(), // 2 days ago
      date: new Date(Date.now() - 172800000)?.toDateString()
    },
    {
      id: 3,
      mood: 'calm',
      intensity: 7,
      notes: 'Spent the morning meditating and reading. Feeling centered and peaceful.',
      sleepQuality: 8,
      energyLevel: 6,
      triggers: ['Exercise'],
      timestamp: new Date(Date.now() - 259200000)?.toISOString(), // 3 days ago
      date: new Date(Date.now() - 259200000)?.toDateString()
    },
    {
      id: 4,
      mood: 'stressed',
      intensity: 8,
      notes: 'Traffic was terrible this morning and I was late for an important meeting.',
      sleepQuality: 4,
      energyLevel: 3,
      triggers: ['Traffic', 'Work'],
      timestamp: new Date(Date.now() - 345600000)?.toISOString(), // 4 days ago
      date: new Date(Date.now() - 345600000)?.toDateString()
    },
    {
      id: 5,
      mood: 'energetic',
      intensity: 9,
      notes: 'Amazing workout session this morning! Feeling strong and motivated for the day ahead.',
      sleepQuality: 9,
      energyLevel: 9,
      triggers: ['Exercise'],
      timestamp: new Date(Date.now() - 432000000)?.toISOString(), // 5 days ago
      date: new Date(Date.now() - 432000000)?.toDateString()
    },
    {
      id: 6,
      mood: 'sad',
      intensity: 4,
      notes: 'Missing family today. Haven\'t seen them in a while due to work commitments.',
      sleepQuality: 6,
      energyLevel: 3,
      triggers: ['Family'],
      timestamp: new Date(Date.now() - 518400000)?.toISOString(), // 6 days ago
      date: new Date(Date.now() - 518400000)?.toDateString()
    },
    {
      id: 7,
      mood: 'happy',
      intensity: 7,
      notes: 'Had a wonderful dinner with friends. Good food and great conversations.',
      sleepQuality: 7,
      energyLevel: 6,
      triggers: ['Social Media'],
      timestamp: new Date(Date.now() - 604800000)?.toISOString(), // 7 days ago
      date: new Date(Date.now() - 604800000)?.toDateString()
    }
  ];

  // Mock monthly data for calendar
  const mockMonthlyData = [
    { date: '2025-01-15', mood: 'happy', intensity: 8 },
    { date: '2025-01-16', mood: 'calm', intensity: 7 },
    { date: '2025-01-17', mood: 'anxious', intensity: 6 },
    { date: '2025-01-18', mood: 'energetic', intensity: 9 },
    { date: '2025-01-19', mood: 'stressed', intensity: 8 }
  ];

  // Mock weekly trend data
  const mockWeeklyTrend = [
    { day: 'Mon', average: 6.5 },
    { day: 'Tue', average: 7.2 },
    { day: 'Wed', average: 5.8 },
    { day: 'Thu', average: 8.1 },
    { day: 'Fri', average: 6.9 },
    { day: 'Sat', average: 7.5 },
    { day: 'Sun', average: 6.3 }
  ];

  // Initialize with mock data
  useEffect(() => {
    setMoodEntries(mockMoodEntries);
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleIntensityChange = (newIntensity) => {
    setIntensity(newIntensity);
  };

  const handleLogMood = async (logEntry) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEntry = {
        ...logEntry,
        id: Date.now()
      };
      
      setMoodEntries(prev => [newEntry, ...prev]);
      setSelectedMood('');
      setIntensity(5);
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
    } catch (error) {
      console.error('Error logging mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEntry = (timestamp) => {
    setMoodEntries(prev => prev?.filter(entry => entry?.timestamp !== timestamp));
  };

  const handleEditEntry = (entry) => {
    setSelectedMood(entry?.mood);
    setIntensity(entry?.intensity);
    setActiveTab('log');
    // In a real app, you'd also populate the form with other entry data
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(moodEntries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `mood-tracker-data-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  const getCurrentStreak = () => {
    if (moodEntries?.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    const sortedEntries = [...moodEntries]?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    for (let i = 0; i < sortedEntries?.length; i++) {
      const entryDate = new Date(sortedEntries[i].timestamp);
      const daysDiff = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const tabs = [
    { id: 'log', label: 'Log Mood', icon: 'Plus' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'history', label: 'History', icon: 'History' }
  ];

  return (
    <>
      <Helmet>
        <title>Mood Tracker - E.A.T Emotional Support</title>
        <meta name="description" content="Track and analyze your emotional patterns with our comprehensive mood tracking system. Monitor your mental health journey with detailed insights and progress visualization." />
        <meta name="keywords" content="mood tracker, mental health, emotional wellness, mood analysis, mental health tracking" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 right-4 z-50 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-elevated animate-in slide-in-from-right">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Mood logged successfully!</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="pt-32 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Activity" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">Mood Tracker</h1>
                  <p className="text-text-secondary">Monitor your emotional well-being and discover patterns</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Flame" size={20} className="text-success" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">{getCurrentStreak()}</p>
                      <p className="text-sm text-text-secondary">Day Streak</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={20} className="text-primary" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">{moodEntries?.length}</p>
                      <p className="text-sm text-text-secondary">Total Entries</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="TrendingUp" size={20} className="text-accent" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {moodEntries?.length > 0 ? (moodEntries?.reduce((sum, entry) => sum + entry?.intensity, 0) / moodEntries?.length)?.toFixed(1) : '0.0'}
                      </p>
                      <p className="text-sm text-text-secondary">Avg Intensity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'log' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <MoodSelector
                    selectedMood={selectedMood}
                    onMoodSelect={handleMoodSelect}
                    intensity={intensity}
                    onIntensityChange={handleIntensityChange}
                  />
                  <QuickLogForm
                    selectedMood={selectedMood}
                    intensity={intensity}
                    onLogMood={handleLogMood}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {activeTab === 'progress' && (
                <ProgressDisplay
                  currentStreak={getCurrentStreak()}
                  totalEntries={moodEntries?.length}
                  monthlyData={mockMonthlyData}
                  weeklyTrend={mockWeeklyTrend}
                />
              )}

              {activeTab === 'analytics' && (
                <MoodChart
                  moodData={moodEntries}
                  onExportData={handleExportData}
                />
              )}

              {activeTab === 'history' && (
                <MoodHistory
                  moodEntries={moodEntries}
                  onDeleteEntry={handleDeleteEntry}
                  onEditEntry={handleEditEntry}
                />
              )}
            </div>

            {/* Quick Actions */}
            <div className="fixed bottom-6 right-6 z-40">
              <div className="flex flex-col space-y-3">
                {activeTab !== 'log' && (
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => setActiveTab('log')}
                    iconName="Plus"
                    className="w-14 h-14 rounded-full shadow-elevated hover:scale-105 transition-transform"
                    title="Quick Log"
                  />
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleExportData}
                  iconName="Download"
                  className="w-12 h-12 rounded-full shadow-gentle hover:scale-105 transition-transform"
                  title="Export Data"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MoodTracker;