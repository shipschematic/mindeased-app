// Single Source of Truth - Screen Configuration
// All screens defined as config array

export interface ScreenConfig {
  id: string;
  path: string;
  name: string;
  component: string;
  features: string[];
  requiresAuth?: boolean;
  tabBarIcon?: string;
}

export const SCREEN_CONFIG: readonly ScreenConfig[] = [
  // Auth Flow
  {
    id: 'onboarding',
    path: '/onboarding',
    name: 'Onboarding',
    component: 'OnboardingScreen',
    features: ['slides', 'skip', 'get_started'],
    requiresAuth: false,
  },
  {
    id: 'login',
    path: '/login',
    name: 'Login',
    component: 'LoginScreen',
    features: ['email', 'password', 'social_auth'],
    requiresAuth: false,
  },
  {
    id: 'signup',
    path: '/signup',
    name: 'Sign Up',
    component: 'SignupScreen',
    features: ['email', 'password', 'confirm_password', 'social_auth'],
    requiresAuth: false,
  },
  
  // Main App Flow
  {
    id: 'home',
    path: '/home',
    name: 'Home',
    component: 'HomeScreen',
    features: ['mood_tracker', 'recommendations', 'quick_actions', 'journey_progress'],
    requiresAuth: true,
    tabBarIcon: 'home',
  },
  {
    id: 'mood',
    path: '/mood',
    name: 'Mood',
    component: 'MoodScreen',
    features: ['emoji_selection', 'reason_tracking', 'mood_history'],
    requiresAuth: true,
    tabBarIcon: 'mood',
  },
  {
    id: 'journey',
    path: '/journey',
    name: 'Journey',
    component: 'JourneyScreen',
    features: ['task_list', 'progress_tracking', 'achievements'],
    requiresAuth: true,
    tabBarIcon: 'journey',
  },
  {
    id: 'community',
    path: '/community',
    name: 'Community',
    component: 'CommunityScreen',
    features: ['feed', 'channels', 'people', 'search'],
    requiresAuth: true,
    tabBarIcon: 'community',
  },
  {
    id: 'profile',
    path: '/profile',
    name: 'Profile',
    component: 'ProfileScreen',
    features: ['user_info', 'settings', 'logout'],
    requiresAuth: true,
    tabBarIcon: 'profile',
  },
  
  // Challenge & Task Screens
  {
    id: 'challenges',
    path: '/challenges',
    name: 'Challenges',
    component: 'ChallengesScreen',
    features: ['challenge_list', 'challenge_preview', 'success_screen'],
    requiresAuth: true,
  },
  {
    id: 'challenge-detail',
    path: '/challenge/:id',
    name: 'Challenge Detail',
    component: 'ChallengeDetailScreen',
    features: ['task_steps', 'progress', 'completion'],
    requiresAuth: true,
  },
  
  // Journal Screens
  {
    id: 'journals',
    path: '/journals',
    name: 'Journals',
    component: 'JournalsScreen',
    features: ['journal_list', 'create_post'],
    requiresAuth: true,
  },
  {
    id: 'journal-detail',
    path: '/journal/:id',
    name: 'Journal Entry',
    component: 'JournalDetailScreen',
    features: ['writing', 'prompts', 'save'],
    requiresAuth: true,
  },
  
  // Therapist & Consultation
  {
    id: 'therapists',
    path: '/therapists',
    name: 'Therapists',
    component: 'TherapistsScreen',
    features: ['therapist_list', 'booking', 'video_consultation'],
    requiresAuth: true,
  },
  {
    id: 'appointment',
    path: '/appointment/:id',
    name: 'Book Appointment',
    component: 'AppointmentScreen',
    features: ['date_picker', 'time_slots', 'confirmation'],
    requiresAuth: true,
  },
  
  // Rescue Session (Crisis Support)
  {
    id: 'rescue',
    path: '/rescue',
    name: 'Rescue Session',
    component: 'RescueScreen',
    features: ['immediate_help', 'breathing_exercise', 'grounding_tasks'],
    requiresAuth: true,
  },
  
  // Settings & Account
  {
    id: 'settings',
    path: '/settings',
    name: 'Settings',
    component: 'SettingsScreen',
    features: ['notifications', 'privacy', 'language', 'account'],
    requiresAuth: true,
  },
  {
    id: 'account-settings',
    path: '/account-settings',
    name: 'Account Settings',
    component: 'AccountSettingsScreen',
    features: ['edit_profile', 'change_password', 'delete_account'],
    requiresAuth: true,
  },
  
  // Community Detail Screens
  {
    id: 'community-post',
    path: '/community/post/:id',
    name: 'Post Details',
    component: 'CommunityPostScreen',
    features: ['post_content', 'comments', 'reactions'],
    requiresAuth: true,
  },
  {
    id: 'community-channel',
    path: '/community/channel/:id',
    name: 'Channel',
    component: 'CommunityChannelScreen',
    features: ['channel_info', 'posts', 'members'],
    requiresAuth: true,
  },
] as const;

// Screen dispatcher config - maps screen IDs to features
export const SCREEN_DISPATCHER = {
  onboarding: ['slides', 'skip', 'get_started'],
  login: ['email', 'password', 'social_auth'],
  signup: ['email', 'password', 'confirm_password', 'social_auth'],
  home: ['mood_tracker', 'recommendations', 'quick_actions', 'journey_progress'],
  mood: ['emoji_selection', 'reason_tracking', 'mood_history'],
  journey: ['task_list', 'progress_tracking', 'achievements'],
  community: ['feed', 'channels', 'people', 'search'],
  profile: ['user_info', 'settings', 'logout'],
  challenges: ['challenge_list', 'challenge_preview', 'success_screen'],
  'challenge-detail': ['task_steps', 'progress', 'completion'],
  journals: ['journal_list', 'create_post'],
  'journal-detail': ['writing', 'prompts', 'save'],
  therapists: ['therapist_list', 'booking', 'video_consultation'],
  appointment: ['date_picker', 'time_slots', 'confirmation'],
  rescue: ['immediate_help', 'breathing_exercise', 'grounding_tasks'],
  settings: ['notifications', 'privacy', 'language', 'account'],
  'account-settings': ['edit_profile', 'change_password', 'delete_account'],
  'community-post': ['post_content', 'comments', 'reactions'],
  'community-channel': ['channel_info', 'posts', 'members'],
} as const;

// Helper functions
export const getScreenById = (id: string): ScreenConfig | undefined => {
  return SCREEN_CONFIG.find(screen => screen.id === id);
};

export const getScreenByPath = (path: string): ScreenConfig | undefined => {
  return SCREEN_CONFIG.find(screen => screen.path === path);
};

export const getAuthScreens = (): readonly ScreenConfig[] => {
  return SCREEN_CONFIG.filter(screen => !screen.requiresAuth);
};

export const getTabScreens = (): readonly ScreenConfig[] => {
  return SCREEN_CONFIG.filter(screen => screen.tabBarIcon);
};
