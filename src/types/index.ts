// Global type definitions for the wellness app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  intensity: number; // 1-10
  notes?: string;
  timestamp: Date;
  tags?: string[];
}

export type MoodType = 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'anxious' 
  | 'calm' 
  | 'excited' 
  | 'neutral' 
  | 'frustrated' 
  | 'grateful' 
  | 'energetic';

export interface GratitudeEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: MoodType;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  mood?: MoodType;
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  tags?: string[];
  isLiked?: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  emotion?: MoodType;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface EmotionalState {
  current: MoodType;
  confidence: number; // 0-1
  timestamp: Date;
}

export interface ProgressStats {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  averageMood: number;
  improvement: number; // percentage
}