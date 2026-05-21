// State Layer - Type Definitions
// Single Source of Truth for all data shapes

// ============ MOOD TYPES ============
export type MoodType = 'love' | 'good' | 'depress' | 'sad' | 'worried';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  timestamp: number;
  reasons?: string[];
}

// ============ USER TYPES ============
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: number;
}

// ============ JOURNEY TYPES ============
export interface JourneyTask {
  id: string;
  title: string;
  timeRange: string;
  completed: boolean;
  icon: string;
  section: 'morning' | 'afternoon' | 'night';
}

export interface JourneySection {
  id: string;
  title: string;
  tasks: JourneyTask[];
}

// ============ CHALLENGE TYPES ============
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  completed: boolean;
  progress: number;
}

// ============ COMMUNITY TYPES ============
export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  views: string;
  timestamp: string;
}

export interface CommunityChannel {
  id: string;
  name: string;
  avatar: string;
}

// ============ THERAPIST TYPES ============
export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar: string;
}

// ============ ACHIEVEMENT TYPES ============
export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  total: number;
  icon: string;
}

// ============ RESCUE TYPES ============
export interface RescueSession {
  startedAt: number;
  exercisesCompleted: string[];
  currentExercise: string | null;
}

// ============ QUIZ TYPES ============
export interface QuizResult {
  primaryChallenge: string;
  recommendedFeatures: string[];
  initialMoodSuggestion?: string;
}

export interface QuizState {
  completed: boolean;
  responses: Record<string, any>;
  result?: QuizResult;
}

// ============ JOURNEY ENTRY TYPES ============
export interface JournalEntry {
  id: string;
  type: string;
  mood?: MoodType;
  responses: Record<number, string>;
  completedAt: number;
}

// ============ AUTH FORM TYPES ============
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export interface MoodLogForm {
  mood: MoodType;
  reasons?: string[];
}

// ============ NAVIGATION TYPES ============
export type ScreenId =
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'home'
  | 'community'
  | 'reports'
  | 'profile'
  | 'journey'
  | 'mood'
  | 'therapists'
  | 'settings'
  | 'rescue';

export type TabId = 'home' | 'community' | 'reports' | 'profile';
