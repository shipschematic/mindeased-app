// Single Source of Truth - Feature Flags
// Enable/disable features dynamically

export const FEATURES = {
  // Authentication
  AUTH: {
    EMAIL_PASSWORD: true,
    SOCIAL_AUTH: true,
    BIOMETRIC: false,
    MAGIC_LINK: false,
  },
  
  // Mood Tracking
  MOOD: {
    EMOJI_SELECTION: true,
    REASON_TRACKING: true,
    MOOD_HISTORY: true,
    MOOD_ANALYTICS: false,
  },
  
  // Challenges & Tasks
  CHALLENGES: {
    DAILY_CHALLENGES: true,
    WEEKLY_CHALLENGES: true,
    CUSTOM_CHALLENGES: false,
    SOCIAL_CHALLENGES: false,
  },
  
  // Journaling
  JOURNALS: {
    GUIDED_JOURNALS: true,
    FREE_WRITING: true,
    MOOD_JOURNAL: true,
    JOURNAL_REMINDERS: false,
  },
  
  // Community
  COMMUNITY: {
    FEED: true,
    CHANNELS: true,
    DIRECT_MESSAGES: false,
    POST_REACTIONS: true,
    COMMENTS: true,
  },
  
  // Therapist
  THERAPIST: {
    BOOKING: true,
    VIDEO_CONSULTATION: false,
    CHAT_SUPPORT: false,
  },
  
  // Rescue Sessions
  RESCUE: {
    IMMEDIATE_HELP: true,
    BREATHING_EXERCISES: true,
    GROUNDING_TASKS: true,
    EMERGENCY_CONTACTS: false,
  },
  
  // Journey & Progress
  JOURNEY: {
    TASK_TRACKING: true,
    PROGRESS_VISUALIZATION: true,
    ACHIEVEMENTS: true,
    STREAK_TRACKING: false,
  },
  
  // Settings
  SETTINGS: {
    NOTIFICATIONS: true,
    PRIVACY: true,
    LANGUAGE: false,
    DATA_EXPORT: false,
  },
  
  // Beta Features
  BETA: {
    AI_THERAPIST: false,
    GROUP_SESSIONS: false,
    GAMIFICATION: false,
  },
} as const;

// Feature gate helper
export const isFeatureEnabled = (featurePath: string): boolean => {
  const keys = featurePath.split('.');
  let current: unknown = FEATURES;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return false;
    }
  }
  
  return current === true;
};

// Dynamic feature flags (can be changed at runtime)
export interface DynamicFeatureFlags {
  maintenanceMode: boolean;
  forceUpdate: boolean;
  newOnboarding: boolean;
}

export const DYNAMIC_FEATURES: DynamicFeatureFlags = {
  maintenanceMode: false,
  forceUpdate: false,
  newOnboarding: false,
};

export const setDynamicFeature = <K extends keyof DynamicFeatureFlags>(
  key: K,
  value: DynamicFeatureFlags[K]
): void => {
  DYNAMIC_FEATURES[key] = value;
};
