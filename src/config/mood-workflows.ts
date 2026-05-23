// Config Layer - Mood Workflows
// Defines therapeutic flows for each mood type

import React from 'react';
import { SvgProps } from 'react-native-svg';

// Mood type definition
export type MoodType = 'love' | 'good' | 'depress' | 'sad' | 'worried';

// Next action types
export type NextActionType = 
  | 'journal' 
  | 'share' 
  | 'gratitude' 
  | 'momentum' 
  | 'reason-of-mood' 
  | 'mini-task' 
  | 'rescue' 
  | 'grieve' 
  | 'breathing' 
  | 'challenge';

// Next action interface
export interface NextAction {
  type: NextActionType;
  label: string;
  screen?: string;
}

// SVG illustration component type
export type IllustrationSvg = React.ComponentType<SvgProps>;

// Mood workflow configuration
export interface MoodWorkflow {
  id: MoodType;
  illustration: string;
  illustrationSvg: IllustrationSvg;
  primaryEmotion: string;
  requiresReason: boolean;
  rescueLevel: 0 | 1 | 2; // 0 = none, 1 = available, 2 = recommended
  nextActions: NextAction[];
  affirmations: string[];
  reasonOptions?: string[];
}

// Import SVG illustrations
import GoodMoodSvg from '@assets/mental/SVG/good mood.svg';
import BadMoodSvg from '@assets/mental/SVG/bad mood.svg';

// Reason options based on mood
const SAD_REASONS = [
  'Loss of someone or something',
  'Feeling lonely',
  'Disappointed by something',
  'Physical exhaustion',
  'Hormonal changes',
  'Other'
];

const WORRIED_REASONS = [
  'Work or career stress',
  'Relationship concerns',
  'Health worries',
  'Financial concerns',
  'Future uncertainty',
  'Other'
];

const DEPRESSED_REASONS = [
  'Feeling stuck in life',
  'Lack of purpose',
  'Isolation from others',
  'Overwhelm',
  'Low self-worth',
  'Other'
];

// Mood workflows configuration
export const MOOD_WORKFLOWS: Record<MoodType, MoodWorkflow> = {
  love: {
    id: 'love',
    illustration: 'good mood',
    illustrationSvg: GoodMoodSvg,
    primaryEmotion: 'love',
    requiresReason: false,
    rescueLevel: 0,
    nextActions: [
      { type: 'journal', label: 'What made you feel loved today?', screen: 'GuidedJournal' },
      { type: 'share', label: 'Share your gratitude with the community' },
      { type: 'gratitude', label: 'List 3 things you love about yourself' }
    ],
    affirmations: [
      'You deserve love, especially your own',
      "Today's love energy is beautiful",
      "You're building capacity to receive love"
    ]
  },

  good: {
    id: 'good',
    illustration: 'good mood',
    illustrationSvg: GoodMoodSvg,
    primaryEmotion: 'good',
    requiresReason: false,
    rescueLevel: 0,
    nextActions: [
      { type: 'journal', label: 'What contributed to your good mood?', screen: 'GuidedJournal' },
      { type: 'share', label: 'Share your win with the community' },
      { type: 'momentum', label: "Build on this - what's one small step forward?" }
    ],
    affirmations: [
      'Good feelings are meant to be enjoyed',
      "You're building momentum toward lasting wellbeing",
      "Enjoy this moment - you've earned it"
    ]
  },

  sad: {
    id: 'sad',
    illustration: 'bad mood',
    illustrationSvg: BadMoodSvg,
    primaryEmotion: 'sad',
    requiresReason: true,
    rescueLevel: 2,
    reasonOptions: SAD_REASONS,
    nextActions: [
      { type: 'reason-of-mood', label: 'What happened?', screen: 'ReasonOfMood' },
      { type: 'grieve', label: 'Allow yourself to feel - it\'s okay', screen: 'GuidedJournal' },
      { type: 'rescue', label: 'Need someone to talk to?', screen: 'RescueSession' }
    ],
    affirmations: [
      "Sadness is human - you don't have to hide it",
      "Feeling sad doesn't mean something is wrong with you",
      "This feeling will pass - you're not alone in it"
    ]
  },

  worried: {
    id: 'worried',
    illustration: 'bad mood',
    illustrationSvg: BadMoodSvg,
    primaryEmotion: 'worried',
    requiresReason: true,
    rescueLevel: 1,
    reasonOptions: WORRIED_REASONS,
    nextActions: [
      { type: 'reason-of-mood', label: 'What are you worried about?', screen: 'ReasonOfMood' },
      { type: 'breathing', label: 'Take a calming breath first', screen: 'BreathingExercise' },
      { type: 'challenge', label: 'Break down the worry into steps', screen: 'Journey' }
    ],
    affirmations: [
      "Worries are often bigger in our minds than reality",
      "You've handled hard things before",
      "One breath at a time - you've got this"
    ]
  },

  depress: {
    id: 'depress',
    illustration: 'bad mood',
    illustrationSvg: BadMoodSvg,
    primaryEmotion: 'depressed',
    requiresReason: true,
    rescueLevel: 2,
    reasonOptions: DEPRESSED_REASONS,
    nextActions: [
      { type: 'reason-of-mood', label: 'What might be causing this?', screen: 'ReasonOfMood' },
      { type: 'mini-task', label: 'One tiny step - just one', screen: 'Journey' },
      { type: 'rescue', label: 'Need support right now?', screen: 'RescueSession' }
    ],
    affirmations: [
      "This feeling won't last forever",
      "It's okay to not be okay right now",
      "Small steps still count as progress"
    ]
  }
} as const;

// Helper function to get workflow by mood
export const getMoodWorkflow = (mood: MoodType): MoodWorkflow => {
  return MOOD_WORKFLOWS[mood];
};

// Helper function to get random affirmation
export const getRandomAffirmation = (mood: MoodType): string => {
  const workflow = MOOD_WORKFLOWS[mood];
  const randomIndex = Math.floor(Math.random() * workflow.affirmations.length);
  return workflow.affirmations[randomIndex];
};

// Helper function to check if rescue is recommended
export const shouldShowRescue = (mood: MoodType): boolean => {
  return MOOD_WORKFLOWS[mood].rescueLevel >= 2;
};

export default MOOD_WORKFLOWS;
