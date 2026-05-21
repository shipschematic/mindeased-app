// Layers - Screens - Guided Journal Screen
// CBT-based journaling with guided prompts

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useStore } from '@/state/store';
import { JOURNEY_ACTIVITIES } from '@/config/journey-types';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

type RootStackParamList = {
  GuidedJournal: { promptIndex?: number; journalType?: string };
};

type GuidedJournalRouteProp = RouteProp<RootStackParamList, 'GuidedJournal'>;

const AFFIRMATIONS = [
  "You've done the work - be proud",
  "Every reflection brings clarity",
  "Your feelings are valid",
  "You're building self-awareness",
  "Progress, not perfection",
];

export const GuidedJournalScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<GuidedJournalRouteProp>();
  
  const journalType = route.params?.journalType || 'guidedJournal';
  const activity = JOURNEY_ACTIVITIES[journalType] || JOURNEY_ACTIVITIES.guidedJournal;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const prompts = activity.prompts || [
    "What's on your mind right now?",
    "How are you feeling about this?",
    "What do you need right now?",
  ];
  
  const currentPrompt = prompts[currentIndex];
  const progress = ((currentIndex + 1) / prompts.length) * 100;
  const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  
  const handleResponseChange = (text: string) => {
    setResponses(prev => ({ ...prev, [currentIndex]: text }));
  };
  
  const handleNext = () => {
    if (currentIndex < prompts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all prompts
      setCompleted(true);
      setShowCelebration(true);
      
      // Save journal entry
      const addJourneyEntry = (useStore.getState() as any).addJourneyEntry;
      if (addJourneyEntry) {
        addJourneyEntry({
          type: journalType,
          responses,
          completedAt: Date.now(),
        });
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  const handleFinish = () => {
    navigation.goBack();
  };

  if (showCelebration) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.celebrationContainer}>
          <Image
            source={require('@assets/mental/PNG/achievement.png')}
            style={styles.celebrationImage}
            resizeMode="contain"
          />
          <Text style={styles.celebrationTitle}>Well Done!</Text>
          <Text style={styles.celebrationSubtitle}>{affirmation}</Text>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('@assets/mental/PNG/journaling.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1} of {prompts.length}
          </Text>
        </View>
        
        {/* Prompt */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>{currentPrompt}</Text>
        </View>
        
        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={responses[currentIndex] || ''}
            onChangeText={handleResponseChange}
            placeholder="Write your thoughts here..."
            placeholderTextColor={colors.text.muted}
            multiline
            textAlignVertical="top"
          />
        </View>
        
        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips</Text>
          <Text style={styles.tipsText}>
            • Write freely without editing{'\n'}
            • There are no wrong answers{'\n'}
            • Be as detailed as you like
          </Text>
        </View>
      </ScrollView>
      
      {/* Navigation */}
      <View style={styles.footer}>
        <View style={styles.navButtons}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
              <Text style={styles.prevButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={[styles.nextButton, !responses[currentIndex] && styles.nextButtonDisabled]} 
            onPress={handleNext}
            disabled={!responses[currentIndex]}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex < prompts.length - 1 ? 'Next →' : 'Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  illustration: {
    width: 120,
    height: 120,
  },
  progressContainer: {
    marginBottom: spacing.xl,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.muted,
    textAlign: 'center',
  },
  promptContainer: {
    marginBottom: spacing.lg,
  },
  promptText: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 28,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  textInput: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    minHeight: 150,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipsContainer: {
    backgroundColor: colors.primary[50],
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  tipsTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary[600],
    marginBottom: spacing.xs,
  },
  tipsText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.primary[600],
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  navButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  prevButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    backgroundColor: colors.background.cardAlt,
  },
  prevButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  nextButton: {
    flex: 2,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    backgroundColor: colors.primary[600],
  },
  nextButtonDisabled: {
    backgroundColor: colors.text.muted,
  },
  nextButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
  celebrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  celebrationImage: {
    width: 150,
    height: 150,
    marginBottom: spacing.xl,
  },
  celebrationTitle: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  celebrationSubtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  finishButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius.xl,
  },
  finishButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
});