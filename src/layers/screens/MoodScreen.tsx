// Layers - Screens - Mood Screen (Config-Driven)
// Uses mood-workflows for therapeutic flow

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '@/state/store';
import { useIntents } from '@/intents/actions';
import type { MoodType } from '@/state/types';
import { CONTENT } from '@/config/content';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import { MOOD_WORKFLOWS, getRandomAffirmation } from '@/config/mood-workflows';

const MOOD_CONFIG: Array<{ type: MoodType; emoji: string; label: string; color: string }> = [
  { type: 'love', emoji: '❤️', label: 'Love', color: colors.mood.love },
  { type: 'good', emoji: '😊', label: 'Good', color: colors.mood.good },
  { type: 'depress', emoji: '😞', label: 'Depressed', color: colors.mood.depress },
  { type: 'sad', emoji: '😢', label: 'Sad', color: colors.mood.sad },
  { type: 'worried', emoji: '😟', label: 'Worried', color: colors.mood.worried },
];

export const MoodScreen: React.FC = () => {
  const navigation = useNavigation();
  const intents = useIntents();
  const currentMood = useStore((state) => state.currentMood);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setShowWorkflow(true);
    const workflow = MOOD_WORKFLOWS[mood];

    // If mood requires reason, navigate to ReasonOfMoodScreen
    if (workflow.requiresReason) {
      (navigation as any).navigate('ReasonOfMood', { mood });
    }
  };

  const handleBackToSelection = () => {
    setSelectedMood(null);
    setShowWorkflow(false);
  };

  const handleNextAction = (action: any) => {
    // Navigate to appropriate screen based on action type
    switch (action.type) {
      case 'journal':
      case 'guided':
        (navigation as any).navigate('GuidedJournal', { journalType: 'guidedJournal' });
        break;
      case 'rescue':
        (navigation as any).navigate('RescueSession');
        break;
      case 'breathing':
        (navigation as any).navigate('BreathingExercise');
        break;
      case 'reason-of-mood':
        if (selectedMood) {
          (navigation as any).navigate('ReasonOfMood', { mood: selectedMood });
        }
        break;
      default:
        // Just save mood and go back
        if (selectedMood) {
          intents.mood.setMood(selectedMood);
        }
        navigation.goBack();
    }
  };

  const getDisplayedMood = (): MoodType | null => {
    return selectedMood || currentMood;
  };

  const displayedMood = getDisplayedMood();
  const workflow = displayedMood ? MOOD_WORKFLOWS[displayedMood] : null;

  // If workflow is active, show workflow options
  if (showWorkflow && workflow) {
    const WorkflowSvg = workflow.illustrationSvg;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackToSelection} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{CONTENT.MOOD.title}</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Mood Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <WorkflowSvg width={160} height={160} />
            </View>
          </View>

          {/* Mood Display */}
          <View style={styles.selectedMoodContainer}>
            <Text style={styles.selectedMoodLabel}>You're feeling</Text>
            <Text style={[styles.selectedMoodText, { color: MOOD_CONFIG.find(m => m.type === displayedMood)?.color }]}>
              {workflow.primaryEmotion}
            </Text>
          </View>

          {/* Affirmation */}
          <View style={styles.affirmationContainer}>
            <Text style={styles.affirmationText}>
              "{getRandomAffirmation(displayedMood!)}"
            </Text>
          </View>

          {/* Next Actions */}
          <View style={styles.nextActionsContainer}>
            <Text style={styles.nextActionsTitle}>What would you like to do?</Text>
            {workflow.nextActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.nextActionButton}
                onPress={() => handleNextAction(action)}
                activeOpacity={0.7}
              >
                <Text style={styles.nextActionText}>{action.label}</Text>
                <Text style={styles.nextActionArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Rescue Option for high-distress moods */}
          {workflow.rescueLevel >= 2 && (
            <View style={styles.rescueContainer}>
              <TouchableOpacity
                style={styles.rescueButton}
                onPress={() => (navigation as any).navigate('RescueSession')}
              >
                <Text style={styles.rescueButtonText}>🆘 Need support right now?</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Default: Mood selection view
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{CONTENT.MOOD.title}</Text>
          <Text style={styles.subtitle}>{CONTENT.MOOD.subtitle}</Text>
        </View>

        {/* Mood Grid */}
        <View style={styles.moodContainer}>
          {MOOD_CONFIG.map((mood) => (
            <TouchableOpacity
              key={mood.type}
              style={[
                styles.moodButton,
                currentMood === mood.type && { backgroundColor: mood.color },
              ]}
              onPress={() => handleMoodSelect(mood.type)}
              activeOpacity={0.7}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.moodLabel,
                  currentMood === mood.type && styles.moodLabelActive,
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Mood Summary */}
        {currentMood && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Today's Mood</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryEmoji}>
                {MOOD_CONFIG.find(m => m.type === currentMood)?.emoji}
              </Text>
              <Text style={styles.summaryLabel}>
                {MOOD_CONFIG.find(m => m.type === currentMood)?.label}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  placeholder: {
    width: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  illustration: {
    width: 160,
    height: 160,
  },
  selectedMoodContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  selectedMoodLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  selectedMoodText: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    marginTop: spacing.xs,
  },
  affirmationContainer: {
    backgroundColor: colors.primary[50],
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
  },
  affirmationText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[700],
    textAlign: 'center',
    fontStyle: 'italic',
  },
  nextActionsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  nextActionsTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  nextActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.sm,
  },
  nextActionText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  nextActionArrow: {
    fontSize: 20,
    color: colors.primary[600],
  },
  rescueContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing['3xl'],
  },
  rescueButton: {
    backgroundColor: colors.warning + '20',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  rescueButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.warning,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  moodButton: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.cardAlt,
    gap: spacing.sm,
  },
  moodEmoji: {
    fontSize: 40,
  },
  moodLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  moodLabelActive: {
    color: colors.text.inverse,
  },
  summaryContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  summaryTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  summaryEmoji: {
    fontSize: 32,
  },
  summaryLabel: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
});
