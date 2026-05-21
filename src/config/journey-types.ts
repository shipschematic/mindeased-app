// Config Layer - Journey Types
// Defines different journey activity types

import { ImageSourcePropType } from 'react-native';

// Journey activity types
export type JourneyActivityType = 
  | 'thoughtSharing' 
  | 'guidedJournal' 
  | 'breathingExercise' 
  | 'rescueSession' 
  | 'singleTask'
  | 'multiStep'
  | 'audioJournal'
  | 'moodReflection';

// Breathing pattern interface
export interface BreathingPattern {
  inhale: number;  // seconds
  hold: number;    // seconds
  exhale: number;  // seconds
  holdAfterExhale?: number; // seconds, optional
}

// Rescue exercise interface
export interface RescueExercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  duration?: number; // seconds
}

// Journey activity configuration
export interface JourneyActivity {
  id: string;
  type: JourneyActivityType;
  title: string;
  subtitle?: string;
  illustration: string;
  illustrationPng?: ImageSourcePropType;
  icon: string;
  category: 'therapeutic' | 'calm' | 'crisis' | 'habit' | 'insight';
  estimatedMinutes: number;
  
  // Activity-specific config
  prompt?: string;
  placeholder?: string;
  prompts?: string[];
  allowsVoice?: boolean;
  allowsAttachment?: boolean;
  breathingPattern?: BreathingPattern;
  exercises?: RescueExercise[];
  duration?: number; // seconds for timed activities
  guided?: boolean;
  showHistory?: boolean;
  
  // Display settings
  showIllustration?: boolean;
  illustrationPosition?: 'top' | 'left' | 'right';
}

// Journey activities configuration
export const JOURNEY_ACTIVITIES: Record<string, JourneyActivity> = {
  thoughtSharing: {
    id: 'thoughtSharing',
    type: 'thoughtSharing',
    title: 'Thought Sharing',
    subtitle: 'Express what\'s on your mind',
    illustration: 'thoughts',
    illustrationPng: require('@assets/mental/PNG/thoughts.png'),
    icon: '💭',
    category: 'therapeutic',
    estimatedMinutes: 5,
    prompt: "What's on your mind right now?",
    placeholder: 'Write freely - this is just for you...',
    allowsVoice: true,
    allowsAttachment: false,
    showIllustration: true
  },

  guidedJournal: {
    id: 'guidedJournal',
    type: 'guidedJournal',
    title: 'Guided Journal',
    subtitle: 'Process your feelings with CBT prompts',
    illustration: 'journaling',
    illustrationPng: require('@assets/mental/PNG/journaling.png'),
    icon: '📓',
    category: 'therapeutic',
    estimatedMinutes: 10,
    prompts: [
      "What happened that made you feel this way?",
      "How did that make your body feel?",
      "What thoughts came with these feelings?",
      "If a friend felt this way, what would you tell them?",
      "What's one small thing that might help?"
    ],
    placeholder: 'Write your thoughts here...',
    showIllustration: true
  },

  breathingExercise: {
    id: 'breathingExercise',
    type: 'breathingExercise',
    title: 'Breathing Exercise',
    subtitle: 'Calm your nervous system',
    illustration: 'warm drink',
    illustrationPng: require('@assets/mental/PNG/warm drink.png'),
    icon: '🌬️',
    category: 'calm',
    estimatedMinutes: 5,
    breathingPattern: {
      inhale: 4,
      hold: 4,
      exhale: 6,
      holdAfterExhale: 2
    },
    duration: 120,
    guided: true,
    showIllustration: true
  },

  rescueSession: {
    id: 'rescueSession',
    type: 'rescueSession',
    title: 'Rescue Session',
    subtitle: 'You\'re not alone',
    illustration: 'online support',
    illustrationPng: require('@assets/mental/PNG/online support.png'),
    icon: '🆘',
    category: 'crisis',
    estimatedMinutes: 15,
    exercises: [
      {
        id: 'grounding',
        title: '5-4-3-2-1 Grounding',
        description: 'Ground yourself in the present moment',
        instructions: [
          'Notice 5 things you can see around you',
          'Notice 4 things you can physically feel',
          'Notice 3 things you can hear',
          'Notice 2 things you can smell',
          'Notice 1 thing you can taste'
        ]
      },
      {
        id: 'breathing',
        title: 'Calming Breath (4-7-8)',
        description: 'Activate your relaxation response',
        instructions: [
          'Breathe in through your nose for 4 counts',
          'Hold your breath for 7 counts',
          'Exhale slowly through your mouth for 8 counts',
          'Repeat 3-4 times'
        ],
        duration: 60
      },
      {
        id: 'selfCompassion',
        title: 'Self-Compassion Break',
        description: 'Offer yourself kindness',
        instructions: [
          'Acknowledge: "This is a moment of suffering"',
          'Remember: "Suffering is part of life"',
          'Put hand on heart and say: "May I be kind to myself"',
          'Ask: "What do I need to hear right now?"',
          'Offer yourself that kindness'
        ]
      },
      {
        id: 'reachingOut',
        title: 'Reach Out',
        description: 'Connect with someone who cares',
        instructions: [
          'Think of 1-3 people who support you',
          'Choose one person to reach out to',
          'Send a message: "Hey, I\'m having a hard time. Can we talk?"',
          'Or call a support line if needed'
        ]
      }
    ],
    showIllustration: true
  },

  moodReflection: {
    id: 'moodReflection',
    type: 'moodReflection',
    title: 'Mood Reflection',
    subtitle: 'Notice the patterns',
    illustration: 'feeling low',
    illustrationPng: require('@assets/mental/PNG/feeling low.png'),
    icon: '🔍',
    category: 'insight',
    estimatedMinutes: 8,
    prompt: 'Looking at your mood history, what patterns do you notice?',
    showHistory: true,
    showIllustration: true
  },

  audioJournal: {
    id: 'audioJournal',
    type: 'audioJournal',
    title: 'Voice Journal',
    subtitle: 'Speak your truth',
    illustration: 'music-meditation',
    illustrationPng: require('@assets/mental/PNG/music-meditation.png'),
    icon: '🎤',
    category: 'therapeutic',
    estimatedMinutes: 5,
    prompt: 'Speak freely - say whatever comes to mind',
    allowsVoice: true,
    showIllustration: true
  },

  morningGratitude: {
    id: 'morningGratitude',
    type: 'singleTask',
    title: 'Morning Gratitude',
    subtitle: 'Start with appreciation',
    illustration: 'sunrise',
    icon: '☀️',
    category: 'habit',
    estimatedMinutes: 3,
    prompt: 'Name 3 things you\'re grateful for this morning',
    showIllustration: false
  },

  eveningReflection: {
    id: 'eveningReflection',
    type: 'singleTask',
    title: 'Evening Reflection',
    subtitle: 'Review your day',
    illustration: 'moon',
    icon: '🌙',
    category: 'habit',
    estimatedMinutes: 5,
    prompts: [
      'What went well today?',
      'What could have been better?',
      'What did you learn?'
    ],
    showIllustration: false
  }
} as const;

// Helper to get activity by type
export const getJourneyActivity = (id: string): JourneyActivity | undefined => {
  return JOURNEY_ACTIVITIES[id];
};

// Helper to get activities by category
export const getActivitiesByCategory = (category: JourneyActivity['category']): JourneyActivity[] => {
  return Object.values(JOURNEY_ACTIVITIES).filter(a => a.category === category);
};

// Journey milestones
export interface JourneyMilestone {
  emoji: string;
  title: string;
  description: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    emoji: '🎯',
    title: 'First Check-in',
    description: 'Complete your first mood check-in'
  },
  {
    emoji: '📓',
    title: 'Journal Starter',
    description: 'Write your first journal entry'
  },
  {
    emoji: '🌟',
    title: 'Consistency',
    description: 'Check in for 3 days in a row'
  },
  {
    emoji: '🏆',
    title: 'Achievement Unlocked',
    description: 'Complete 10 activities'
  }
];

export default JOURNEY_ACTIVITIES;