// Intent Layer - Action Creators
// UI expresses intent through these actions
// Wires to Execute Layer (supabase services)

import type {
  MoodType,
  LoginForm,
  SignupForm,
  ScreenId,
  TabId,
} from '@/state/types';
import { useStore } from '@/state/store';
import {
  authService,
  moodService,
  challengeService,
  postService,
  therapistService,
  appointmentService,
  achievementService,
} from '@/execute/supabase';

// ============= AUTH INTENTS =============
export interface AuthIntents {
  login: (credentials: LoginForm) => Promise<void>;
  signup: (data: SignupForm) => Promise<void>;
  logout: () => Promise<void>;
  socialLogin: (provider: 'google' | 'apple' | 'facebook') => Promise<void>;
}

// ============= MOOD INTENTS =============
export interface MoodIntents {
  logMood: (mood: MoodType, reasons?: string[]) => Promise<void>;
  setMood: (mood: MoodType) => void;
  addMoodEntry: (mood: MoodType, note?: string) => Promise<void>;
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

// Intent implementation factory - wires UI to Execute layer
export const createIntents = (): AllIntents => {
  return {
    auth: {
      login: async (credentials) => {
        const store = useStore.getState();
        store.setLoading(true);
        store.setError(null);

        try {
          const result = await authService.login(credentials.email, credentials.password);
          if (!result.success || !result.data) {
            throw new Error(result.error || 'Login failed');
          }
          store.setUser(result.data);
        } catch (error) {
          store.setError(error instanceof Error ? error.message : 'Login failed');
          throw error;
        } finally {
          store.setLoading(false);
        }
      },

      signup: async (data) => {
        const store = useStore.getState();
        store.setLoading(true);
        store.setError(null);

        try {
          const result = await authService.signup(data.email, data.password, data.name);
          if (!result.success || !result.data) {
            throw new Error(result.error || 'Signup failed');
          }
          store.setUser(result.data);
        } catch (error) {
          store.setError(error instanceof Error ? error.message : 'Signup failed');
          throw error;
        } finally {
          store.setLoading(false);
        }
      },

      logout: async () => {
        const store = useStore.getState();
        store.setLoading(true);

        try {
          const result = await authService.logout();
          if (!result.success) {
            throw new Error(result.error || 'Logout failed');
          }
          store.clearUser();
        } catch (error) {
          store.setError(error instanceof Error ? error.message : 'Logout failed');
          throw error;
        } finally {
          store.setLoading(false);
        }
      },

      socialLogin: async (provider) => {
        const store = useStore.getState();
        store.setLoading(true);
        store.setError(null);

        try {
          const result = await authService.socialLogin(provider);
          if (!result.success) {
            throw new Error(result.error || 'Social login failed');
          }
          // OAuth redirects - session will be handled by auth state listener
        } catch (error) {
          store.setError(error instanceof Error ? error.message : 'Social login failed');
          throw error;
        } finally {
          store.setLoading(false);
        }
      },
    },

    mood: {
      logMood: async (mood, reasons) => {
        const store = useStore.getState();
        const user = store.user;

        // Always update local state immediately for responsive UI
        store.setMood(mood, reasons);

        // Sync to backend if authenticated
        if (user) {
          try {
            const result = await moodService.logMood(mood, user.id, reasons);
            if (!result.success) {
              console.warn('Failed to sync mood to server:', result.error);
            }
          } catch (error) {
            console.warn('Mood sync error:', error);
          }
        }
      },

      setMood: (mood) => {
        useStore.getState().setMood(mood);
      },

      addMoodEntry: async (mood, note) => {
        const store = useStore.getState();
        const user = store.user;

        store.setMood(mood, note ? [note] : undefined);

        if (user) {
          try {
            const result = await moodService.logMood(mood, user.id, note ? [note] : undefined);
            if (!result.success) {
              console.warn('Failed to sync mood entry:', result.error);
            }
          } catch (error) {
            console.warn('Mood entry sync error:', error);
          }
        }
      },

      clearMood: () => {
        useStore.getState().setMood('good');
      },

      completeActivity: (activityId) => {
        useStore.getState().completeActivity(activityId);
      },
    },

    navigation: {
      navigateTo: (screen) => {
        useStore.getState().setScreen(screen);
      },
      setActiveTab: (tab) => {
        useStore.getState().setActiveTab(tab);
      },
      goBack: () => {
        // Navigation handled by React Navigation
      },
    },

    journey: {
      toggleTask: (taskId) => {
        useStore.getState().toggleTaskComplete(taskId);
      },
    },
  };
};

// Hook for using intents in components
export const useIntents = (): AllIntents => {
  return createIntents();
};
