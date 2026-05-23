// Execute Layer - Supabase Client
// Database and Authentication - Single Source of Truth for backend calls

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from './env';
import type {
  User,
  Challenge,
  MoodLog,
  JournalEntry,
  CommunityPost,
  Therapist,
  Appointment,
  Achievement,
} from '@/state/types';

// Generic API response type
interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Validate env before creating client
if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
  console.warn(
    '[Supabase] Missing credentials. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Create Supabase client with AsyncStorage for persistence
export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
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
      if (!data.user) throw new Error('No user returned');

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
      if (!data.user) throw new Error('No user returned');

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || name,
        createdAt: new Date(data.user.created_at).getTime(),
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

  async socialLogin(provider: 'google' | 'apple' | 'facebook'): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
      // OAuth redirects - user will be handled by auth state listener
      return { success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Social login failed',
        success: false,
      };
    }
  },
};

// ============= MOOD SERVICES =============
export const moodService = {
  async getMoodLogs(userId: string): Promise<ApiResponse<MoodLog[]>> {
    try {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as MoodLog[], success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get mood logs',
        success: false,
      };
    }
  },

  async logMood(mood: string, userId: string, reasons?: string[], notes?: string): Promise<ApiResponse<MoodLog>> {
    try {
      const { data, error } = await supabase
        .from('mood_logs')
        .insert([{ mood, user_id: userId, reasons: reasons || [], notes }])
        .select()
        .single();

      if (error) throw error;
      return { data: data as MoodLog, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to log mood',
        success: false,
      };
    }
  },
};

// ============= JOURNAL SERVICES =============
export const journalService = {
  async getJournals(userId: string): Promise<ApiResponse<JournalEntry[]>> {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as JournalEntry[], success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get journals',
        success: false,
      };
    }
  },

  async createJournal(journal: Omit<JournalEntry, 'id' | 'createdAt'>): Promise<ApiResponse<JournalEntry>> {
    try {
      const { data, error } = await supabase
        .from('journals')
        .insert([journal])
        .select()
        .single();

      if (error) throw error;
      return { data: data as JournalEntry, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to create journal',
        success: false,
      };
    }
  },
};

// ============= CHALLENGE SERVICES =============
export const challengeService = {
  async getChallenges(userId?: string): Promise<ApiResponse<Challenge[]>> {
    try {
      let query = supabase.from('challenges').select('*');
      if (userId) query = query.eq('user_id', userId);

      const { data, error } = await query;
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
    currentStep: number
  ): Promise<ApiResponse<Challenge>> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .update({ current_step: currentStep })
        .eq('id', challengeId)
        .select()
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

// ============= COMMUNITY SERVICES =============
export const postService = {
  async getPosts(): Promise<ApiResponse<CommunityPost[]>> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as CommunityPost[], success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get posts',
        success: false,
      };
    }
  },

  async createPost(post: Omit<CommunityPost, 'id' | 'createdAt'>): Promise<ApiResponse<CommunityPost>> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select()
        .single();

      if (error) throw error;
      return { data: data as CommunityPost, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to create post',
        success: false,
      };
    }
  },
};

// ============= THERAPIST SERVICES =============
export const therapistService = {
  async getTherapists(): Promise<ApiResponse<Therapist[]>> {
    try {
      const { data, error } = await supabase.from('therapists').select('*');
      if (error) throw error;
      return { data: data as Therapist[], success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get therapists',
        success: false,
      };
    }
  },
};

// ============= APPOINTMENT SERVICES =============
export const appointmentService = {
  async getAppointments(userId: string): Promise<ApiResponse<Appointment[]>> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: true });

      if (error) throw error;
      return { data: data as Appointment[], success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get appointments',
        success: false,
      };
    }
  },

  async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<ApiResponse<Appointment>> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointment])
        .select()
        .single();

      if (error) throw error;
      return { data: data as Appointment, success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to create appointment',
        success: false,
      };
    }
  },
};

// ============= ACHIEVEMENT SERVICES =============
export const achievementService = {
  async getAchievements(userId: string): Promise<ApiResponse<Achievement[]>> {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return { data: data as Achievement[], success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get achievements',
        success: false,
      };
    }
  },
};
