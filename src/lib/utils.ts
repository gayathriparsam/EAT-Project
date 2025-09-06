import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return formatDate(date)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getMoodColor(mood: string): string {
  const moodColors: Record<string, string> = {
    happy: 'hsl(var(--success))',
    sad: 'hsl(var(--info))',
    angry: 'hsl(var(--destructive))',
    anxious: 'hsl(var(--warning))',
    calm: 'hsl(var(--success-foreground))',
    excited: 'hsl(var(--accent))',
    neutral: 'hsl(var(--muted))',
    frustrated: 'hsl(var(--destructive))',
    grateful: 'hsl(var(--primary))',
    energetic: 'hsl(var(--accent))'
  }
  
  return moodColors[mood] || 'hsl(var(--muted))'
}

export function getMoodEmoji(mood: string): string {
  const moodEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    anxious: '😰',
    calm: '😌',
    excited: '🤩',
    neutral: '😐',
    frustrated: '😤',
    grateful: '🙏',
    energetic: '⚡'
  }
  
  return moodEmojis[mood] || '😐'
}