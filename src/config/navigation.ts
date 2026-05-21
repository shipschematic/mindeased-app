// Single Source of Truth - Navigation Configuration
// Navigation flows and transitions

export interface NavigationFlow {
  id: string;
  name: string;
  screens: string[];
  initialScreen: string;
  type: 'stack' | 'tabs' | 'drawer';
}

export const NAVIGATION_CONFIG = {
  // Auth Flow Stack
  authFlow: {
    id: 'auth',
    name: 'Authentication',
    screens: ['onboarding', 'login', 'signup'],
    initialScreen: 'onboarding',
    type: 'stack',
  } as NavigationFlow,
  
  // Main App Tabs
  mainTabs: {
    id: 'main',
    name: 'Main App',
    screens: ['home', 'mood', 'journey', 'community', 'profile'],
    initialScreen: 'home',
    type: 'tabs',
  } as NavigationFlow,
  
  // Challenge Flow Stack
  challengeFlow: {
    id: 'challenge',
    name: 'Challenge',
    screens: ['challenges', 'challenge-detail'],
    initialScreen: 'challenges',
    type: 'stack',
  } as NavigationFlow,
  
  // Journal Flow Stack
  journalFlow: {
    id: 'journal',
    name: 'Journal',
    screens: ['journals', 'journal-detail'],
    initialScreen: 'journals',
    type: 'stack',
  } as NavigationFlow,
  
  // Therapist Flow Stack
  therapistFlow: {
    id: 'therapist',
    name: 'Therapist',
    screens: ['therapists', 'appointment'],
    initialScreen: 'therapists',
    type: 'stack',
  } as NavigationFlow,
  
  // Community Detail Flow
  communityFlow: {
    id: 'community-detail',
    name: 'Community Details',
    screens: ['community-post', 'community-channel'],
    initialScreen: 'community-post',
    type: 'stack',
  } as NavigationFlow,
  
  // Settings Flow Stack
  settingsFlow: {
    id: 'settings',
    name: 'Settings',
    screens: ['settings', 'account-settings'],
    initialScreen: 'settings',
    type: 'stack',
  } as NavigationFlow,
} as const;

// Tab bar configuration
export const TAB_BAR_CONFIG = {
  home: {
    title: 'Home',
    icon: 'home',
    label: 'Home',
  },
  mood: {
    title: 'Mood',
    icon: 'mood',
    label: 'Mood',
  },
  journey: {
    title: 'Journey',
    icon: 'journey',
    label: 'Journey',
  },
  community: {
    title: 'Community',
    icon: 'community',
    label: 'Community',
  },
  profile: {
    title: 'Profile',
    icon: 'profile',
    label: 'Profile',
  },
} as const;

// Navigation transitions
export const TRANSITIONS = {
  default: {
    animation: 'slide_from_right',
    duration: 300,
  },
  modal: {
    animation: 'slide_from_bottom',
    duration: 250,
  },
  fade: {
    animation: 'fade',
    duration: 200,
  },
} as const;

// Deep linking configuration
export const DEEP_LINKING_CONFIG = {
  prefixes: ['mentalhealth://', 'https://mentalhealth.app'],
  config: {
    screens: {
      home: 'home',
      mood: 'mood',
      journey: 'journey',
      community: 'community',
      profile: 'profile',
      'challenge-detail': 'challenge/:id',
      'journal-detail': 'journal/:id',
      appointment: 'appointment/:id',
      'community-post': 'community/post/:id',
      'community-channel': 'community/channel/:id',
    },
  },
} as const;

// Navigation state machine
export type NavigationState = {
  currentFlow: string;
  currentScreen: string;
  history: string[];
  params?: Record<string, unknown>;
};

export const INITIAL_NAVIGATION_STATE: NavigationState = {
  currentFlow: 'auth',
  currentScreen: 'onboarding',
  history: [],
  params: {},
};
