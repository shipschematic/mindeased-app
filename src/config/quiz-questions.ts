// Config Layer - Quiz Questions
// Personalization assessment for new users

import React from 'react';
import { SvgProps } from 'react-native-svg';

// Question types
export type QuizQuestionType = 'mood' | 'singleSelect' | 'multiSelect' | 'text' | 'slider';

// SVG illustration component type
export type IllustrationSvg = React.ComponentType<SvgProps>;

// Quiz question interface
export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  type: QuizQuestionType;
  illustration?: string;
  illustrationSvg?: IllustrationSvg;
  options?: QuizOption[];
  placeholder?: string;
  minValue?: number;
  maxValue?: number;
  minLabel?: string;
  maxLabel?: string;
  maxSelect?: number;
  isRequired: boolean;
}

// Quiz option interface
export interface QuizOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

// Result mapping interface
export interface ResultMapping {
  primaryChallenge: 'anxiety' | 'depression' | 'stress' | 'general' | 'relationships';
  recommendedFeatures: string[];
  initialMoodSuggestion?: string;
}

// Import SVG illustrations
import MoodRangeSvg from '@assets/mental/SVG/mood range.svg';
import OverloadedSvg from '@assets/mental/SVG/overloaded.svg';
import MoodChangeSvg from '@assets/mental/SVG/mood change.svg';
import MedicationSvg from '@assets/mental/SVG/medication.svg';
import PutTogetherSvg from '@assets/mental/SVG/put together.svg';

// Quiz configuration
export const QUIZ_CONFIG = {
  screens: [
    {
      id: 'currentState',
      question: 'How are you feeling right now?',
      subtitle: 'Be honest - this helps us personalize your experience',
      type: 'mood' as QuizQuestionType,
      illustration: 'mood range',
      illustrationSvg: MoodRangeSvg,
      isRequired: true,
      options: [
        { id: 'love', label: 'Loved', value: 'love' },
        { id: 'good', label: 'Good', value: 'good' },
        { id: 'neutral', label: 'Neutral', value: 'neutral' },
        { id: 'worried', label: 'Worried', value: 'worried' },
        { id: 'sad', label: 'Sad', value: 'sad' },
        { id: 'depress', label: 'Struggling', value: 'depress' }
      ]
    },
    {
      id: 'mainConcern',
      question: "What brings you here today?",
      subtitle: 'Select up to 3 that apply',
      type: 'multiSelect' as QuizQuestionType,
      illustration: 'overloaded',
      illustrationSvg: OverloadedSvg,
      isRequired: true,
      maxSelect: 3,
      options: [
        { id: 'anxiety', label: 'Managing anxiety or worry', value: 'anxiety', icon: '😰' },
        { id: 'depression', label: 'Feeling sad or down', value: 'depression', icon: '😢' },
        { id: 'stress', label: 'Work or life stress', value: 'stress', icon: '😓' },
        { id: 'sleep', label: 'Sleep problems', value: 'sleep', icon: '😴' },
        { id: 'habits', label: 'Building healthier habits', value: 'habits', icon: '💪' },
        { id: 'relationships', label: 'Improving relationships', value: 'relationships', icon: '💝' },
        { id: 'exploring', label: 'Just exploring', value: 'exploring', icon: '🔍' }
      ]
    },
    {
      id: 'duration',
      question: "How long have you been feeling this way?",
      subtitle: 'This helps us understand your situation better',
      type: 'singleSelect' as QuizQuestionType,
      illustration: 'mood change',
      illustrationSvg: MoodChangeSvg,
      isRequired: true,
      options: [
        { id: 'today', label: 'Just today', value: 'today' },
        { id: 'fewDays', label: 'A few days', value: 'fewDays' },
        { id: 'week', label: 'About a week', value: 'week' },
        { id: 'fewWeeks', label: 'A few weeks', value: 'fewWeeks' },
        { id: 'month', label: 'A month or longer', value: 'month' },
        { id: 'ongoing', label: 'This is ongoing for me', value: 'ongoing' }
      ]
    },
    {
      id: 'previousHelp',
      question: "Have you tried any of these before?",
      subtitle: 'Select all that apply',
      type: 'multiSelect' as QuizQuestionType,
      illustration: 'medication',
      illustrationSvg: MedicationSvg,
      isRequired: false,
      maxSelect: 5,
      options: [
        { id: 'meditation', label: 'Meditation or mindfulness', value: 'meditation' },
        { id: 'social', label: 'Talking to friends/family', value: 'social' },
        { id: 'therapy', label: 'Therapy or counseling', value: 'therapy' },
        { id: 'medication', label: 'Medication', value: 'medication' },
        { id: 'journaling', label: 'Journaling', value: 'journaling' },
        { id: 'exercise', label: 'Exercise or physical activity', value: 'exercise' },
        { id: 'none', label: 'This is my first time seeking support', value: 'none' }
      ]
    },
    {
      id: 'goals',
      question: "What would feeling better look like for you?",
      subtitle: 'Describe your ideal state of wellbeing',
      type: 'text' as QuizQuestionType,
      illustration: 'put together',
      illustrationSvg: PutTogetherSvg,
      placeholder: 'I want to feel more... and less...',
      isRequired: false
    }
  ] as QuizQuestion[],

  // Map responses to personalized experience
  resultsMapping: {
    'anxiety-focused': {
      primaryChallenge: 'anxiety',
      recommendedFeatures: ['breathing', 'grounding', 'rescueSession', 'journaling'],
      initialMoodSuggestion: 'worried'
    },
    'depression-focused': {
      primaryChallenge: 'depression',
      recommendedFeatures: ['rescueSession', 'community', 'moodTracking', 'gentleHabits'],
      initialMoodSuggestion: 'sad'
    },
    'stress-focused': {
      primaryChallenge: 'stress',
      recommendedFeatures: ['breathing', 'habits', 'journaling', 'boundaries'],
      initialMoodSuggestion: 'worried'
    },
    'new-to-selfcare': {
      primaryChallenge: 'general',
      recommendedFeatures: ['journey', 'moodTracking', 'community', 'introduction'],
      initialMoodSuggestion: 'neutral'
    }
  } as Record<string, ResultMapping>
};

// Helper to get quiz questions
export const getQuizQuestions = (): QuizQuestion[] => {
  return QUIZ_CONFIG.screens;
};

// Helper to get quiz result
export const getQuizResult = (responses: Record<string, any>): ResultMapping => {
  const concerns = responses.mainConcern || [];
  
  if (concerns.includes('depression')) {
    return QUIZ_CONFIG.resultsMapping['depression-focused'];
  }
  if (concerns.includes('anxiety') && concerns.includes('stress')) {
    return QUIZ_CONFIG.resultsMapping['stress-focused'];
  }
  if (concerns.includes('anxiety')) {
    return QUIZ_CONFIG.resultsMapping['anxiety-focused'];
  }
  
  return QUIZ_CONFIG.resultsMapping['new-to-selfcare'];
};

export default QUIZ_CONFIG;
