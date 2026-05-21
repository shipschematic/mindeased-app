// Intent Layer - Event Handlers
// Connect UI events to intents

import type { AllIntents } from './actions';
import { useStore } from '@/state/store';

// Handler factory that connects UI events to intents and state updates
export const createHandlers = (intents: AllIntents) => {
  return {
    // Auth handlers
    onLogin: async (email: string, password: string) => {
      try {
        useStore.getState().setLoading(true);
        await intents.auth.login({ email, password });
      } catch (error) {
        useStore.getState().setError(error instanceof Error ? error.message : 'Login failed');
      } finally {
        useStore.getState().setLoading(false);
      }
    },

    onSignup: async (
      name: string,
      email: string,
      password: string
    ) => {
      try {
        useStore.getState().setLoading(true);
        await intents.auth.signup({ name, email, password });
      } catch (error) {
        useStore.getState().setError(error instanceof Error ? error.message : 'Signup failed');
      } finally {
        useStore.getState().setLoading(false);
      }
    },

    onLogout: async () => {
      try {
        await intents.auth.logout();
        useStore.getState().clearUser();
      } catch (error) {
        console.error('Logout failed', error);
      }
    },

    // Mood handlers
    onMoodSelected: (mood: string, reasons?: string[]) => {
      intents.mood.logMood(
        mood as 'love' | 'good' | 'depress' | 'sad' | 'worried',
        reasons
      );
    },

    // Navigation handlers
    onNavigate: (screenId: string) => {
      intents.navigation.navigateTo(screenId as never);
    },

    onTabChange: (tabId: string) => {
      intents.navigation.setActiveTab(tabId as never);
    },

    // Journey handlers
    onToggleTask: (taskId: string) => {
      intents.journey.toggleTask(taskId);
    },
  };
};

export type Handlers = ReturnType<typeof createHandlers>;
