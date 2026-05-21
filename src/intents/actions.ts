// Intent Layer - Action Creators
// UI expresses intent through these actions

import type {
  MoodType,
  LoginForm,
  SignupForm,
  ScreenId,
  TabId,
} from '@/state/types';

// ============= AUTH INTENTS =============
export interface AuthIntents {
  login: (credentials: LoginForm) => Promise<void>;
  signup: (data: SignupForm) => Promise<void>;
  logout: () => Promise<void>;
  socialLogin: (provider: 'google' | 'apple' | 'facebook') => Promise<void>;
}

// ============= MOOD INTENTS =============
export interface MoodIntents {
  logMood: (mood: MoodType, reasons?: string[]) => void;
  setMood: (mood: MoodType) => void;
  addMoodEntry: (mood: MoodType, note?: string) => void;
  clearMood: () => void;
  completeActivity: (activityId: string) => void;
}

// ============= NAVIGATION INTENTS =============
export interface NavigationIntents {
  navigateTo: (screen: ScreenId) => void;
  setActiveTab: (tab: TabId) => void;
  goBack: () => void;
}

// ============= JOURNEY INTENTS =============
export interface JourneyIntents {
  toggleTask: (taskId: string) => void;
}

// ============= COMBINED INTENTS INTERFACE =============
export interface AllIntents {
  auth: AuthIntents;
  mood: MoodIntents;
  navigation: NavigationIntents;
  journey: JourneyIntents;
}

// Intent implementation factory
import { useStore } from '@/state/store';

export const createIntents = (): AllIntents => {
  return {
    auth: {
      login: async (credentials) => {
        console.log('INTENT: Login', credentials.email);
        // Simulate auth - in real app, call API
        useStore.getState().setUser({
          id: '1',
          email: credentials.email,
          name: 'Kate Tanner',
          avatar: 'https://i.pravatar.cc/150?u=kate',
          createdAt: Date.now(),
        });
      },
      signup: async (data) => {
        console.log('INTENT: Signup', data.email);
        useStore.getState().setUser({
          id: '1',
          email: data.email,
          name: data.name,
          createdAt: Date.now(),
        });
      },
      logout: async () => {
        console.log('INTENT: Logout');
        useStore.getState().clearUser();
      },
      socialLogin: async (provider) => {
        console.log('INTENT: Social login', provider);
        useStore.getState().setUser({
          id: '1',
          email: 'user@example.com',
          name: 'Kate Tanner',
          createdAt: Date.now(),
        });
      },
    },
    mood: {
      logMood: (mood, reasons) => {
        console.log('INTENT: Mood logged', mood);
        useStore.getState().setMood(mood, reasons);
      },
      setMood: (mood) => {
        console.log('INTENT: Set mood', mood);
        useStore.getState().setMood(mood);
      },
      addMoodEntry: (mood, note) => {
        console.log('INTENT: Add mood entry', mood, note);
        useStore.getState().setMood(mood, note ? [note] : undefined);
      },
      clearMood: () => {
        console.log('INTENT: Clear mood');
        useStore.getState().setMood('good');
      },
      completeActivity: (activityId) => {
        console.log('INTENT: Complete activity', activityId);
        useStore.getState().completeActivity(activityId);
      },
    },
    navigation: {
      navigateTo: (screen) => {
        console.log('INTENT: Navigate to', screen);
        useStore.getState().setScreen(screen);
      },
      setActiveTab: (tab) => {
        console.log('INTENT: Set tab', tab);
        useStore.getState().setActiveTab(tab);
      },
      goBack: () => {
        console.log('INTENT: Go back');
      },
    },
    journey: {
      toggleTask: (taskId) => {
        console.log('INTENT: Toggle task', taskId);
        useStore.getState().toggleTaskComplete(taskId);
      },
    },
  };
};

// Hook for using intents in components
export const useIntents = (): AllIntents => {
  return createIntents();
};
