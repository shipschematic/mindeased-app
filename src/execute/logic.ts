// Execute Layer - Business Logic
// Core business rules and validation

import type { Challenge, MoodType } from '@/state/types';
import { z } from 'zod';

// ============= VALIDATION SCHEMAS =============
export const validationSchemas = {
  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),

  signup: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),

  moodLog: z.object({
    mood: z.enum(['love', 'good', 'depress', 'sad', 'worried']),
    reasons: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),

  journal: z.object({
    type: z.enum(['gratitude', 'sleep', 'problem_solving', 'goal_setting', 'free_writing']),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    mood: z.enum(['love', 'good', 'depress', 'sad', 'worried']).optional(),
    tags: z.array(z.string()).optional(),
  }),

  challenge: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    type: z.enum(['daily', 'weekly', 'ongoing']),
    category: z.enum(['mood', 'exercise', 'meditation', 'journal', 'habit']),
    steps: z.array(z.object({
      title: z.string().min(1),
      type: z.enum(['task', 'quiz', 'reflection', 'breathing']),
    })),
  }),

  appointment: z.object({
    therapistId: z.string(),
    date: z.number(),
    time: z.string(),
    type: z.enum(['initial', 'followup', 'crisis']),
  }),
};

// ============= BUSINESS RULES =============
export const businessRules = {
  // Mood tracking rules
  shouldShowMoodReminder: (lastMoodLogTime: number): boolean => {
    const hoursSinceLastLog = (Date.now() - lastMoodLogTime) / (1000 * 60 * 60);
    return hoursSinceLastLog >= 24;
  },

  getMoodTrend: (moodHistory: Array<{ mood: MoodType; timestamp: number }>): 'improving' | 'declining' | 'stable' => {
    if (moodHistory.length < 3) return 'stable';

    const recentMoods = moodHistory.slice(-7);
    const moodScores: Record<MoodType, number> = {
      love: 5,
      good: 4,
      worried: 3,
      sad: 2,
      depress: 1,
    };

    const avgFirstHalf = recentMoods.slice(0, Math.floor(recentMoods.length / 2))
      .reduce((sum, entry) => sum + moodScores[entry.mood], 0) / Math.floor(recentMoods.length / 2);

    const avgSecondHalf = recentMoods.slice(Math.floor(recentMoods.length / 2))
      .reduce((sum, entry) => sum + moodScores[entry.mood], 0) / Math.ceil(recentMoods.length / 2);

    if (avgSecondHalf > avgFirstHalf + 0.5) return 'improving';
    if (avgSecondHalf < avgFirstHalf - 0.5) return 'declining';
    return 'stable';
  },

  // Challenge rules
  canStartChallenge: (challenge: Challenge): boolean => {
    return !challenge.completed;
  },

  calculateProgress: (completed: number, total: number): number => {
    return Math.round((completed / total) * 100);
  },

  // Streak calculation
  calculateStreak: (completionDates: number[]): number => {
    if (completionDates.length === 0) return 0;

    const sortedDates = [...completionDates].sort((a, b) => b - a);
    const oneDay = 24 * 60 * 60 * 1000;
    let streak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diff = sortedDates[i - 1] - sortedDates[i];
      if (diff <= oneDay + 3600000) { // Allow 1 hour buffer
        streak++;
      } else {
        break;
      }
    }

    return streak;
  },
};

// ============= DATA TRANSFORMERS =============
export const transformers = {
  formatDuration: (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  },

  formatDate: (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  },

  formatTime: (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },
};
