// Config Layer - Mood Configuration
// Shared mood settings used across screens

import React from 'react';
import { SvgProps } from 'react-native-svg';

// Mood type
export type MoodType = 'love' | 'good' | 'depress' | 'sad' | 'worried';

// SVG illustration component type
export type IllustrationSvg = React.ComponentType<SvgProps>;

// Mood configuration interface
export interface MoodConfig {
  type: MoodType;
  emoji: string;
  color: string;
  label: string;
  illustrationSvg: IllustrationSvg;
}

// Import SVG illustrations
import GoodMoodSvg from '@assets/mental/SVG/good mood.svg';
import BadMoodSvg from '@assets/mental/SVG/bad mood.svg';
import OverloadedSvg from '@assets/mental/SVG/overloaded.svg';

// Mood configuration - matches mood-workflows.ts
export const MOOD_CONFIG: MoodConfig[] = [
  { 
    type: 'love', 
    emoji: '❤️', 
    color: '#E91E63', 
    label: 'Love',
    illustrationSvg: GoodMoodSvg
  },
  { 
    type: 'good', 
    emoji: '😊', 
    color: '#4CAF50', 
    label: 'Good',
    illustrationSvg: GoodMoodSvg
  },
  { 
    type: 'depress', 
    emoji: '😞', 
    color: '#607D8B', 
    label: 'Depressed',
    illustrationSvg: BadMoodSvg
  },
  { 
    type: 'sad', 
    emoji: '😢', 
    color: '#2196F3', 
    label: 'Sad',
    illustrationSvg: BadMoodSvg
  },
  { 
    type: 'worried', 
    emoji: '😟', 
    color: '#FF9800', 
    label: 'Worried',
    illustrationSvg: OverloadedSvg
  },
];

// Helper function to get config by type
export const getMoodConfig = (type: MoodType): MoodConfig | undefined => {
  return MOOD_CONFIG.find(m => m.type === type);
};
