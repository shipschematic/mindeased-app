// Config Layer - Mood Configuration
// Shared mood settings used across screens

import { ImageSourcePropType } from 'react-native';

// Mood type
export type MoodType = 'love' | 'good' | 'depress' | 'sad' | 'worried';

// Mood configuration interface
export interface MoodConfig {
  type: MoodType;
  emoji: string;
  color: string;
  label: string;
  illustrationPng: ImageSourcePropType;
}

// Mood configuration - matches mood-workflows.ts
export const MOOD_CONFIG: MoodConfig[] = [
  { 
    type: 'love', 
    emoji: '❤️', 
    color: '#E91E63', 
    label: 'Love',
    illustrationPng: require('@assets/mental/PNG/good mood.png')
  },
  { 
    type: 'good', 
    emoji: '😊', 
    color: '#4CAF50', 
    label: 'Good',
    illustrationPng: require('@assets/mental/PNG/good mood.png')
  },
  { 
    type: 'depress', 
    emoji: '😞', 
    color: '#607D8B', 
    label: 'Depressed',
    illustrationPng: require('@assets/mental/PNG/bad mood.png')
  },
  { 
    type: 'sad', 
    emoji: '😢', 
    color: '#2196F3', 
    label: 'Sad',
    illustrationPng: require('@assets/mental/PNG/bad mood.png')
  },
  { 
    type: 'worried', 
    emoji: '😟', 
    color: '#FF9800', 
    label: 'Worried',
    illustrationPng: require('@assets/mental/PNG/bad mood.png')
  },
];

// Helper function to get config by type
export const getMoodConfig = (type: MoodType): MoodConfig | undefined => {
  return MOOD_CONFIG.find(m => m.type === type);
};

// Helper function to get emoji by type
export const getMoodEmoji = (type: MoodType): string => {
  const config = getMoodConfig(type);
  return config?.emoji || '😐';
};

// Helper function to get color by type
export const getMoodColor = (type: MoodType): string => {
  const config = getMoodConfig(type);
  return config?.color || '#999';
};

export default MOOD_CONFIG;