// Config Layer - Challenge Types
// Defines gamified challenges (different from Journey activities)

import { ImageSourcePropType } from 'react-native';

// Challenge category
export type ChallengeCategory = 'habit' | 'awareness' | 'social' | 'insight';

// Challenge milestone
export interface ChallengeMilestone {
  day: number;
  title: string;
  reward: string;
  illustration?: string;
}

// Challenge configuration
export interface ChallengeConfig {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  duration: number; // days
  goal: string;
  illustration: string;
  illustrationPng?: ImageSourcePropType;
  
  // Gamification
  completionsRequired: number;
  milestones: ChallengeMilestone[];
  
  // Requirements
  requiresDailyCheckIn: boolean;
  streakBonus: boolean;
  
  // Display
  difficulty: 'easy' | 'medium' | 'hard';
  color: string;
}

// Challenge configurations
export const CHALLENGE_CONFIGS: Record<string, ChallengeConfig> = {
  sevenDayHabit: {
    id: 'sevenDayHabit',
    title: '7-Day Habit Builder',
    description: 'Build a new healthy habit by completing it every day for a week',
    category: 'habit',
    duration: 7,
    goal: 'Complete your chosen habit daily',
    illustration: 'habit',
    illustrationPng: require('@assets/mental/PNG/daily balance.png'),
    completionsRequired: 7,
    requiresDailyCheckIn: true,
    streakBonus: true,
    difficulty: 'medium',
    color: '#5B8DEF',
    milestones: [
      { day: 1, title: 'First Step', reward: 'Habit Starter', illustration: 'achievement' },
      { day: 3, title: 'Getting Momentum', reward: 'Momentum Maker', illustration: 'achievement' },
      { day: 5, title: 'Halfway Hero', reward: 'Halfway Champion', illustration: 'achievement' },
      { day: 7, title: 'Habit Master', reward: 'Legendary Habit Builder', illustration: 'trophy' }
    ]
  },

  moodMastery: {
    id: 'moodMastery',
    title: 'Mood Mastery',
    description: 'Track your moods and understand their patterns',
    category: 'awareness',
    duration: 14,
    goal: 'Log mood and reason every day',
    illustration: 'mood range',
    illustrationPng: require('@assets/mental/PNG/mood range.png'),
    completionsRequired: 14,
    requiresDailyCheckIn: true,
    streakBonus: false,
    difficulty: 'easy',
    color: '#4ECDC4',
    milestones: [
      { day: 3, title: 'Aware', reward: 'Awareness Explorer', illustration: 'achievement' },
      { day: 7, title: 'Tracker', reward: 'Mood Tracker', illustration: 'achievement' },
      { day: 14, title: 'Master', reward: 'Mood Master', illustration: 'trophy' }
    ]
  },

  communityChampion: {
    id: 'communityChampion',
    title: 'Community Champion',
    description: 'Connect with others and share your journey',
    category: 'social',
    duration: 7,
    goal: 'Share 1 post and support 3 others',
    illustration: 'support',
    illustrationPng: require('@assets/mental/PNG/support.png'),
    completionsRequired: 4, // 1 share + 3 supports
    requiresDailyCheckIn: false,
    streakBonus: false,
    difficulty: 'easy',
    color: '#FFB347',
    milestones: [
      { day: 1, title: 'First Share', reward: 'Community Starter', illustration: 'achievement' },
      { day: 4, title: 'Supporter', reward: 'Supportive Soul', illustration: 'achievement' },
      { day: 7, title: 'Champion', reward: 'Community Champion', illustration: 'trophy' }
    ]
  },

  weeklyReflection: {
    id: 'weeklyReflection',
    title: 'Weekly Reflection',
    description: 'Deep dive into your week with guided journaling',
    category: 'insight',
    duration: 7,
    goal: 'Complete 3 guided journal sessions',
    illustration: 'put together',
    illustrationPng: require('@assets/mental/PNG/put together.png'),
    completionsRequired: 3,
    requiresDailyCheckIn: false,
    streakBonus: false,
    difficulty: 'medium',
    color: '#9B59B6',
    milestones: [
      { day: 1, title: 'First Insight', reward: 'Insight Seeker', illustration: 'achievement' },
      { day: 3, title: 'Deep Diver', reward: 'Reflection Diver', illustration: 'achievement' },
      { day: 7, title: 'Wise One', reward: 'Weekly Wisdom', illustration: 'trophy' }
    ]
  },

  rescueReady: {
    id: 'rescueReady',
    title: 'Rescue Ready',
    description: 'Learn the tools for when things get hard',
    category: 'awareness',
    duration: 7,
    goal: 'Complete 3 rescue sessions',
    illustration: 'online therapy',
    illustrationPng: require('@assets/mental/PNG/online therapy.png'),
    completionsRequired: 3,
    requiresDailyCheckIn: false,
    streakBonus: false,
    difficulty: 'easy',
    color: '#FF6B6B',
    milestones: [
      { day: 1, title: 'First Tool', reward: 'Tool Collector', illustration: 'achievement' },
      { day: 3, title: 'Practitioner', reward: 'Grounding Pro', illustration: 'achievement' },
      { day: 7, title: 'Ready', reward: 'Rescue Ready', illustration: 'trophy' }
    ]
  },

  journalWarrior: {
    id: 'journalWarrior',
    title: 'Journal Warrior',
    description: 'Express yourself through daily journaling',
    category: 'habit',
    duration: 30,
    goal: 'Write in your journal 20 days',
    illustration: 'journaling',
    illustrationPng: require('@assets/mental/PNG/journaling.png'),
    completionsRequired: 20,
    requiresDailyCheckIn: true,
    streakBonus: true,
    difficulty: 'hard',
    color: '#2ECC71',
    milestones: [
      { day: 5, title: 'First Week', reward: 'Week Warrior', illustration: 'achievement' },
      { day: 10, title: 'Getting Started', reward: 'Journal Jockey', illustration: 'achievement' },
      { day: 20, title: 'Halfway There', reward: 'Expression Expert', illustration: 'achievement' },
      { day: 30, title: 'Champion', reward: 'Journal Warrior', illustration: 'trophy' }
    ]
  }
} as const;

// Helper functions
export const getChallengeConfig = (id: string): ChallengeConfig | undefined => {
  return CHALLENGE_CONFIGS[id];
};

export const getChallengesByCategory = (category: ChallengeCategory): ChallengeConfig[] => {
  return Object.values(CHALLENGE_CONFIGS).filter(c => c.category === category);
};

export const getChallengeProgress = (challenge: ChallengeConfig, completions: number): number => {
  return Math.min(100, Math.round((completions / challenge.completionsRequired) * 100));
};

export default CHALLENGE_CONFIGS;