// State Layer - Main Store
// Single Source of Truth - Minimal references, derived values

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  MoodType,
  User,
  JourneyTask,
  Challenge,
  CommunityPost,
  CommunityChannel,
  Therapist,
  Achievement,
  ScreenId,
  TabId,
} from './types';

// ============= STATE INTERFACES =============
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
}

interface MoodState {
  currentMood: MoodType | null;
  moodHistory: Array<{
    mood: MoodType;
    timestamp: number;
    reasons?: string[];
  }>;
}

interface AppState {
  currentScreen: ScreenId;
  activeTab: TabId;
  loading: boolean;
  error: string | null;
}

interface DataState {
  journeyTasks: JourneyTask[];
  challenges: Challenge[];
  communityPosts: CommunityPost[];
  communityChannels: CommunityChannel[];
  therapists: Therapist[];
  achievements: Achievement[];
  overallProgress: number;
}

// ============= COMBINED STORE INTERFACE =============
export interface MentalHealthStore extends UserState, MoodState, AppState, DataState {
  // Quiz State
  quizCompleted: boolean;
  quizResponses: Record<string, any>;
  quizResult?: {
    primaryChallenge: string;
    recommendedFeatures: string[];
    initialMoodSuggestion?: string;
  };

  // Rescue Session State
  rescueSession: {
    startedAt: number;
    exercisesCompleted: string[];
    currentExercise: string | null;
  } | null;

  // Current Mood Reason
  currentMoodReason: string | null;

  // Journal Entries
  journalEntries: Array<{
    id: string;
    type: string;
    responses: Record<number, string>;
    completedAt: number;
  }>;

  // User Actions
  setUser: (user: User) => void;
  clearUser: () => void;
  completeOnboarding: () => void;

  // Mood Actions
  setMood: (mood: MoodType, reasons?: string[]) => void;
  setMoodReason: (reason: string | null) => void;

  // Quiz Actions
  setQuizCompleted: (
    completed: boolean,
    responses: Record<string, any>,
    result?: { primaryChallenge: string; recommendedFeatures: string[]; initialMoodSuggestion?: string }
  ) => void;

  // Rescue Session Actions
  startRescueSession: () => void;
  completeRescueExercise: (exerciseId: string) => void;
  endRescueSession: () => void;

  // Journal Actions
  addJournalEntry: (entry: { type: string; responses: Record<number, string>; completedAt: number }) => void;

  // Activity Actions
  completeActivity: (activityId: string) => void;

  // App Actions
  setScreen: (screen: ScreenId) => void;
  setActiveTab: (tab: TabId) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Data Actions
  toggleTaskComplete: (taskId: string) => void;
  setOverallProgress: (progress: number) => void;
}

// ============= INITIAL DATA =============
const initialJourneyTasks: JourneyTask[] = [
  // Morning tasks
  { id: 'm1', title: 'Drink 3 glass water', timeRange: '04:00 am - 06:00 am', completed: true, icon: 'water', section: 'morning' },
  { id: 'm2', title: 'Morning exercise', timeRange: '06:00 am - 06:30 am', completed: false, icon: 'exercise', section: 'morning' },
  { id: 'm3', title: 'Go for a short walk', timeRange: '07:00 am - 08:00 am', completed: false, icon: 'walk', section: 'morning' },
  // Afternoon tasks
  { id: 'a1', title: 'Writing in a journal', timeRange: '04:00 pm - 04:30 pm', completed: false, icon: 'journal', section: 'afternoon' },
  { id: 'a2', title: 'Hanging out with friends', timeRange: '05:00 pm - 06:00 pm', completed: false, icon: 'friends', section: 'afternoon' },
  { id: 'a3', title: 'Meditation', timeRange: '06:30 pm - 07:00 pm', completed: false, icon: 'meditation', section: 'afternoon' },
  // Night tasks
  { id: 'n1', title: 'Cooking a healthy meal', timeRange: '07:00 pm - 08:00 pm', completed: false, icon: 'cooking', section: 'night' },
  { id: 'n2', title: 'Organizing your space', timeRange: '08:00 pm - 09:00 pm', completed: false, icon: 'organize', section: 'night' },
  { id: 'n3', title: 'Writing in a journal', timeRange: '09:00 pm - 09:30 pm', completed: false, icon: 'journal', section: 'night' },
];

const initialChallenges: Challenge[] = [
  {
    id: 'c1',
    title: 'Want to build up your confidence?',
    description: 'Make better yourself',
    category: 'confidence',
    difficulty: 'medium',
    duration: 7,
    completed: false,
    progress: 0,
  },
];

const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'p1',
    author: { name: 'Thomas Magnum', avatar: 'https://i.pravatar.cc/150?u=1', handle: '@alionboard' },
    content: 'You deserve a love with no trauma attached to it, a love that is good for your mental health, a love that is kind to you. I\'m talking about people NOT suffering from mental health issues.',
    image: 'https://picsum.photos/400/300?random=1',
    likes: 100,
    comments: 253,
    views: '56.5K',
    timestamp: '26 Jun, 10:14 PM',
  },
  {
    id: 'p2',
    author: { name: 'Kati Morton', avatar: 'https://i.pravatar.cc/150?u=2', handle: '@alionboard' },
    content: 'If you struggle with depression please know that you are not alone...',
    image: 'https://picsum.photos/400/300?random=2',
    likes: 100,
    comments: 253,
    views: '56.5K',
    timestamp: '26 Jun, 10:14 PM',
  },
  {
    id: 'p3',
    author: { name: 'Angus MacGyver', avatar: 'https://i.pravatar.cc/150?u=3', handle: '@alionboard' },
    content: 'Mental health condition that affected millions of people worldwide. It can cause persistent feelings of sadness, hopelessness...',
    likes: 100,
    comments: 253,
    views: '56.5K',
    timestamp: '26 Jun, 10:14 PM',
  },
];

const initialCommunityChannels: CommunityChannel[] = [
  { id: 'ch1', name: 'Tracey Marks', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 'ch2', name: 'Therapy Nutshell', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 'ch3', name: 'Kati Morton', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 'ch4', name: 'Infinit Waters', avatar: 'https://i.pravatar.cc/150?u=7' },
];

const initialTherapists: Therapist[] = [
  { id: 't1', name: 'Andrew Deo', specialty: 'Sleep help, anxiety', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 't2', name: 'Dhayu erprida MD', specialty: 'Insomnia, sleep disorder', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 't3', name: 'Kevin Ko Psyd', specialty: 'Insomnia, sleep disorder', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=10' },
  { id: 't4', name: 'Michael Knight MD', specialty: 'Behavioral sleep medicine', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 't5', name: 'Ugonna Okafor, MNS', specialty: 'Stress Reduction', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=12' },
];

const initialAchievements: Achievement[] = [
  { id: 'a1', title: 'Daily challenges', subtitle: 'Achieve daily challenge 3 times a day', progress: 2, total: 10, icon: 'target' },
  { id: 'a2', title: 'Journey Progress', subtitle: 'Achieve daily challenge 3 times a day', progress: 2, total: 10, icon: 'chart' },
  { id: 'a3', title: 'Weekly live challenge', subtitle: 'Achieve daily challenge 3 times a day', progress: 2, total: 10, icon: 'trophy' },
  { id: 'a4', title: 'Health and Fitness', subtitle: 'Achieve daily challenge 3 times a day', progress: 2, total: 10, icon: 'heart' },
];

// ============= STORE CREATION =============
export const useStore = create<MentalHealthStore>()(
  persist(
    (set) => ({
      // User State
      user: null,
      isAuthenticated: false,
      onboardingCompleted: false,

      // Mood State
      currentMood: null,
      moodHistory: [],

      // App State
      currentScreen: 'home',
      activeTab: 'home',
      loading: false,
      error: null,

      // Data State
      journeyTasks: initialJourneyTasks,
      challenges: initialChallenges,
      communityPosts: initialCommunityPosts,
      communityChannels: initialCommunityChannels,
      therapists: initialTherapists,
      achievements: initialAchievements,
      overallProgress: 60,

      // Quiz State
      quizCompleted: false,
      quizResponses: {},
      quizResult: undefined,

      // Rescue Session State
      rescueSession: null,

      // Current Mood Reason
      currentMoodReason: null,

      // Journal Entries
      journalEntries: [],

      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      completeOnboarding: () => set({ onboardingCompleted: true }),

      setMood: (mood, reasons) =>
        set((state) => ({
          currentMood: mood,
          moodHistory: [
            ...state.moodHistory,
            { mood, timestamp: Date.now(), reasons },
          ],
        })),

      setScreen: (screen) => set({ currentScreen: screen }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      toggleTaskComplete: (taskId) =>
        set((state) => ({
          journeyTasks: state.journeyTasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        })),

      setOverallProgress: (progress) => set({ overallProgress: progress }),

      // Quiz Actions
      setQuizCompleted: (completed, responses, result) =>
        set({ quizCompleted: completed, quizResponses: responses, quizResult: result }),

      // Rescue Session Actions
      startRescueSession: () =>
        set({ rescueSession: { startedAt: Date.now(), exercisesCompleted: [], currentExercise: null } }),
      completeRescueExercise: (exerciseId) =>
        set((state) => ({
          rescueSession: state.rescueSession
            ? {
                ...state.rescueSession,
                exercisesCompleted: [...state.rescueSession.exercisesCompleted, exerciseId]
              }
            : null
        })),
      endRescueSession: () => set({ rescueSession: null }),

      // Journal Entry Actions
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [...(state.journalEntries || []), { ...entry, id: Date.now().toString() }]
        })),

      // Activity Actions
      completeActivity: (activityId) =>
        set((state) => {
          // Add to journal entries as completed activity
          const newEntry = {
            id: Date.now().toString(),
            type: activityId,
            responses: {},
            completedAt: Date.now(),
          };
          return {
            journalEntries: [...(state.journalEntries || []), newEntry],
          };
        }),

      // Mood with Reason
      setMoodReason: (reason) =>
        set((state) => ({
          currentMoodReason: reason
        })),
    }),
    {
      name: 'mental-health-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingCompleted: state.onboardingCompleted,
        currentMood: state.currentMood,
        currentMoodReason: state.currentMoodReason,
        moodHistory: state.moodHistory,
        overallProgress: state.overallProgress,
        quizCompleted: state.quizCompleted,
        quizResponses: state.quizResponses,
        quizResult: state.quizResult,
        journalEntries: state.journalEntries,
      }),
    }
  )
);

// ============= SELECTORS =============
export const selectUser = (state: MentalHealthStore) => state.user;
export const selectIsAuthenticated = (state: MentalHealthStore) => state.isAuthenticated;
export const selectOnboardingCompleted = (state: MentalHealthStore) => state.onboardingCompleted;

export const selectCurrentMood = (state: MentalHealthStore) => state.currentMood;
export const selectMoodHistory = (state: MentalHealthStore) => state.moodHistory;

export const selectCurrentScreen = (state: MentalHealthStore) => state.currentScreen;
export const selectActiveTab = (state: MentalHealthStore) => state.activeTab;
export const selectIsLoading = (state: MentalHealthStore) => state.loading;
export const selectError = (state: MentalHealthStore) => state.error;

export const selectJourneyTasks = (state: MentalHealthStore) => state.journeyTasks;
export const selectChallenges = (state: MentalHealthStore) => state.challenges;
export const selectCommunityPosts = (state: MentalHealthStore) => state.communityPosts;
export const selectCommunityChannels = (state: MentalHealthStore) => state.communityChannels;
export const selectTherapists = (state: MentalHealthStore) => state.therapists;
export const selectAchievements = (state: MentalHealthStore) => state.achievements;
export const selectOverallProgress = (state: MentalHealthStore) => state.overallProgress;

// Derived selectors
export const selectJourneySections = (state: MentalHealthStore) => {
  const sections = [
    { id: 'morning', title: 'Morning task', tasks: state.journeyTasks.filter((t) => t.section === 'morning') },
    { id: 'afternoon', title: 'Afternoon task', tasks: state.journeyTasks.filter((t) => t.section === 'afternoon') },
    { id: 'night', title: 'Night task', tasks: state.journeyTasks.filter((t) => t.section === 'night') },
  ];
  return sections;
};
