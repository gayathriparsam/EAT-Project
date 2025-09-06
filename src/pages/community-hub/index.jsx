import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CommunityGuidelines from './components/CommunityGuidelines';
import MoodGroups from './components/MoodGroups';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import CommunityFilters from './components/CommunityFilters';
import TrendingTopics from './components/TrendingTopics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      username: "Sarah M.",
      content: `Today marks 30 days of my anxiety management journey. I wanted to share what's been helping me:\n\n1. Morning meditation (even just 5 minutes)\n2. Journaling before bed\n3. Setting small, achievable daily goals\n4. Connecting with this amazing community\n\nTo anyone struggling today - you're not alone. Small steps count. 💙`,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      mood: { id: 'hopeful', label: 'Hopeful', icon: 'Sunrise', color: 'text-accent' },
      tags: ['anxiety', 'progress', 'selfcare'],
      reactions: { heart: 23, hug: 15, strength: 8, support: 12 },
      comments: 7,
      isVerified: true,
      isModerator: false
    },
    {
      id: 2,
      username: "Alex Chen",
      content: `Having a really tough day. Work stress is overwhelming and I feel like I'm drowning. Just needed to put this somewhere safe.`,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      mood: { id: 'overwhelmed', label: 'Overwhelmed', icon: 'AlertCircle', color: 'text-error' },
      triggerWarning: "Work stress, feeling overwhelmed",
      tags: ['stress', 'work', 'support'],
      reactions: { heart: 45, hug: 32, strength: 18, support: 28 },
      comments: 15,
      isVerified: false,
      isModerator: false
    },
    {
      id: 3,
      username: "Dr. Maya Patel",
      content: `Reminder: It's okay to have bad days. Mental health isn't linear. Some days you'll feel strong, others you might struggle - both are valid parts of your journey.\n\nWhat matters is showing up for yourself, even in small ways. Whether that's taking a shower, eating a meal, or simply breathing through a difficult moment.\n\nYou're doing better than you think. 🌱`,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      mood: { id: 'grateful', label: 'Grateful', icon: 'Heart', color: 'text-success' },
      tags: ['mentalhealth', 'reminder', 'selfcompassion'],
      reactions: { heart: 89, hug: 45, strength: 67, support: 78 },
      comments: 23,
      isVerified: true,
      isModerator: true
    },
    {
      id: 4,
      username: "Jordan K.",
      content: `Three things I'm grateful for today:\n\n1. My morning coffee tasted perfect\n2. A stranger smiled at me on the bus\n3. I remembered to water my plants\n\nSometimes it's the tiny things that make the biggest difference. What are you grateful for today?`,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      mood: { id: 'grateful', label: 'Grateful', icon: 'Heart', color: 'text-success' },
      tags: ['gratitude', 'positivity', 'mindfulness'],
      reactions: { heart: 34, hug: 12, strength: 9, support: 16 },
      comments: 11,
      isVerified: false,
      isModerator: false
    },
    {
      id: 5,
      username: "Riley Thompson",
      content: `First panic attack in months hit me today at the grocery store. Felt embarrassed and scared. But I used the breathing techniques we've discussed here and made it through.\n\nThank you to everyone who shares coping strategies. They really do help when you need them most.`,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      mood: { id: 'anxious', label: 'Anxious', icon: 'Zap', color: 'text-warning' },
      triggerWarning: "Panic attack description",
      tags: ['anxiety', 'panicattack', 'coping', 'gratitude'],
      reactions: { heart: 56, hug: 78, strength: 34, support: 45 },
      comments: 19,
      isVerified: false,
      isModerator: false
    },
    {
      id: 6,
      username: "Anonymous User",
      content: `I've been lurking here for months, finally ready to post. Depression has been my companion for years, but reading everyone's stories gives me hope.\n\nStarting therapy next week. Scared but hopeful. Thank you all for showing me it's possible to get better.`,
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      mood: { id: 'hopeful', label: 'Hopeful', icon: 'Sunrise', color: 'text-accent' },
      tags: ['depression', 'therapy', 'hope', 'firstpost'],
      reactions: { heart: 67, hug: 89, strength: 45, support: 78 },
      comments: 25,
      isVerified: false,
      isModerator: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(post =>
        post?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        post?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        (post?.tags && post?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())))
      );
    }

    // Apply sort filter
    switch (currentFilter) {
      case 'popular':
        filtered?.sort((a, b) => {
          const aTotal = Object.values(a?.reactions)?.reduce((sum, val) => sum + val, 0);
          const bTotal = Object.values(b?.reactions)?.reduce((sum, val) => sum + val, 0);
          return bTotal - aTotal;
        });
        break;
      case 'reactions':
        filtered?.sort((a, b) => {
          const aTotal = Object.values(a?.reactions)?.reduce((sum, val) => sum + val, 0);
          const bTotal = Object.values(b?.reactions)?.reduce((sum, val) => sum + val, 0);
          return bTotal - aTotal;
        });
        break;
      case 'comments':
        filtered?.sort((a, b) => b?.comments - a?.comments);
        break;
      default: // recent
        filtered?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    setFilteredPosts(filtered);
  }, [posts, currentFilter, searchQuery]);

  const handlePostCreate = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 breathing-animation">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Loading Community Hub
                </h2>
                <p className="text-text-secondary">Connecting you with your support network...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 breathing-animation">
              <Icon name="Users" size={32} color="white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Community Hub
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Connect with others on similar journeys. Share experiences, offer support, and find strength in community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Community Guidelines */}
              <CommunityGuidelines />

              {/* Mood Groups */}
              <MoodGroups />

              {/* Filters */}
              <CommunityFilters 
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
              />

              {/* Create Post */}
              <CreatePost onPostCreate={handlePostCreate} />

              {/* Posts Feed */}
              <div className="space-y-6">
                {filteredPosts?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" size={32} className="text-text-secondary" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
                    <p className="text-text-secondary">
                      {searchQuery ? 'Try adjusting your search terms' : 'Be the first to share something!'}
                    </p>
                  </div>
                ) : (
                  filteredPosts?.map((post) => (
                    <PostCard key={post?.id} post={post} />
                  ))
                )}
              </div>

              {/* Load More */}
              {filteredPosts?.length > 0 && (
                <div className="text-center pt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Load More Posts
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <TrendingTopics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;