// Execute Layer - Supabase Client
// Database and Authentication

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, Challenge } from '@/state/types';

// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Generic API response type
interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Create Supabase client with AsyncStorage for persistence
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ============= AUTH SERVICES =============
export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || '',
        avatar: data.user.user_metadata?.avatar,
        createdAt: new Date(data.user.created_at).getTime(),
      };

      return { data: user, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Login failed',
        success: false,
      };
    }
  },

  async signup(
    email: string,
    password: string,
    name: string
  ): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      const user: User = {
        id: data.user!.id,
        email: data.user!.email || '',
        name: data.user!.user_metadata?.name || name,
        createdAt: new Date(data.user!.created_at).getTime(),
      };

      return { data: user, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Signup failed',
        success: false,
      };
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Logout failed',
        success: false,
      };
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) throw error || new Error('No user found');

      return {
        data: {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || '',
          avatar: user.user_metadata?.avatar,
          createdAt: new Date(user.created_at).getTime(),
        },
        success: true,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get user',
        success: false,
      };
    }
  },
};

// ============= CHALLENGE SERVICES =============
export const challengeService = {
  async getChallenges(): Promise<ApiResponse<Challenge[]>> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*');

      if (error) throw error;

      return { data: data as Challenge[], success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get challenges',
        success: false,
      };
    }
  },

  async updateChallengeProgress(
    challengeId: string,
    progress: number
  ): Promise<ApiResponse<Challenge>> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .update({ progress })
        .eq('id', challengeId)
        .single();

      if (error) throw error;

      return { data: data as Challenge, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to update challenge',
        success: false,
      };
    }
  },
};
