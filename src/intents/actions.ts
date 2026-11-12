// Intent Layer - Action Creators
// UI expresses intent through these actions
// Wires to Execute Layer (Firebase auth, local Zustand persistence)

import type {
  MoodType,
  LoginForm,
  SignupForm,
  ScreenId,
  TabId,
} from '@/state/types';
import { useStore, switchUserStorage } from '@/state/store';
import {
  describeFirebaseError,
  firebaseSignOut,
  signInWithGoogle,
} from '@/execute/firebase';
import { stopCloudSync } from '@/execute/cloud-sync';

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
      login: async () => {
        const message =
          'Email sign-in is not available yet. Use Continue with Google.';
        const store = useStore.getState();
        store.setError(message);
        throw new Error(message);
      },

      signup: async () => {
        const message =
          'Account creation uses Google. Tap Continue with Google to create your account.';
        const store = useStore.getState();
        store.setError(message);
        throw new Error(message);
      },

      logout: async () => {
        const store = useStore.getState();
        store.setLoading(true);

        try {
          // Flush the cloud copy while the Firebase session is still valid.
          await stopCloudSync();
          await firebaseSignOut();
        } catch (error) {
          console.warn('[Auth] Firebase sign-out failed:', describeFirebaseError(error));
        } finally {
          await switchUserStorage(null);
          store.clearUser();
          store.setLoading(false);
        }
      },

      socialLogin: async (provider) => {
        const store = useStore.getState();
        store.setLoading(true);
        store.setError(null);

        try {
          if (provider !== 'google') {
            throw new Error(`${provider} sign-in is not configured yet.`);
          }
          const user = await signInWithGoogle();
          await switchUserStorage(user.id);
          store.setUser(user);
        } catch (error) {
          store.setError(describeFirebaseError(error));
          throw error;
        } finally {
          store.setLoading(false);
        }
      },
    },

    mood: {
      logMood: async (mood, reasons) => {
        // Mood data is stored locally (Zustand + AsyncStorage persist).
        // Firebase/Firestore sync can be added later.
        useStore.getState().setMood(mood, reasons);
      },

      setMood: (mood) => {
        useStore.getState().setMood(mood);
      },

      addMoodEntry: async (mood, note) => {
        // Local-only for now: entry persists with the rest of the Zustand state.
        useStore.getState().setMood(mood, note ? [note] : undefined);
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
