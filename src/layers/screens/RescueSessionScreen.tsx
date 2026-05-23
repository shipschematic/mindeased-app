// Layers - Screens - Rescue Session Screen
// Crisis support with grounding and calming exercises

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import { OnlineSupportSvg } from '@/config/svg-icons';

type RescueExercise = {
  id: string;
  title: string;
  description: string;
  instructions: string[];
};

const RESCUE_EXERCISES: RescueExercise[] = [
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
    ]
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
      'Send a message: "Hey, I\'m having a hard time. Can we talk?"'
    ]
  }
];

export const RescueSessionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const toggleExercise = (id: string) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const markExerciseComplete = (id: string) => {
    setCompletedExercises(prev => [...prev, id]);
  };

  const handleIFeelBetter = () => {
    if (completedExercises.length > 0) {
      setShowCompletion(true);
    } else {
      navigation.goBack();
    }
  };

  const handleFinish = () => {
    navigation.navigate('Home' as never);
  };

  if (showCompletion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completionContainer}>
          <Text style={styles.completionEmoji}>💚</Text>
          <Text style={styles.completionTitle}>You're Doing Great</Text>
          <Text style={styles.completionSubtitle}>
            Completing rescue exercises takes strength.{'\n'}
            You reached out to yourself when you needed it.
          </Text>
          <View style={styles.exercisesCompleted}>
            <Text style={styles.exercisesCompletedText}>
              You completed {completedExercises.length} exercise{completedExercises.length > 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Illustration */}
        <View style={styles.headerContainer}>
          <View style={styles.headerIllustration}>
            <OnlineSupportSvg width={100} height={100} opacity={0.6} />
          </View>
        </View>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🆘</Text>
          <Text style={styles.title}>Rescue Session</Text>
          <Text style={styles.subtitle}>
            You're not alone. These exercises can help you feel grounded and calm.
          </Text>
        </View>
        
        {/* Exercises List */}
        <View style={styles.exercisesContainer}>
          {RESCUE_EXERCISES.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <TouchableOpacity
                style={styles.exerciseHeader}
                onPress={() => toggleExercise(exercise.id)}
                activeOpacity={0.7}
              >
                <View style={styles.exerciseInfo}>
                  <View style={styles.exerciseTitleRow}>
                    <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                    {completedExercises.includes(exercise.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                </View>
                <Text style={styles.expandIcon}>
                  {expandedExercise === exercise.id ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedExercise === exercise.id && (
                <View style={styles.exerciseContent}>
                  <View style={styles.instructionsList}>
                    {exercise.instructions.map((instruction, index) => (
                      <View key={index} style={styles.instructionItem}>
                        <Text style={styles.instructionNumber}>{index + 1}</Text>
                        <Text style={styles.instructionText}>{instruction}</Text>
                      </View>
                    ))}
                  </View>
                  {!completedExercises.includes(exercise.id) && (
                    <TouchableOpacity
                      style={styles.markCompleteButton}
                      onPress={() => markExerciseComplete(exercise.id)}
                    >
                      <Text style={styles.markCompleteText}>Mark as Done</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Crisis Resources */}
        <View style={styles.crisisContainer}>
          <Text style={styles.crisisTitle}>Need Immediate Help?</Text>
          <Text style={styles.crisisSubtitle}>
            If you're in crisis, please reach out to professional help:
          </Text>
          <View style={styles.crisisNumbers}>
            <View style={styles.crisisItem}>
              <Text style={styles.crisisLabel}>National Suicide Prevention Lifeline</Text>
              <Text style={styles.crisisNumber}>988</Text>
            </View>
            <View style={styles.crisisItem}>
              <Text style={styles.crisisLabel}>Crisis Text Line</Text>
              <Text style={styles.crisisNumber}>Text HOME to 741741</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iFeelBetterButton} onPress={handleIFeelBetter}>
          <Text style={styles.iFeelBetterText}>I Feel Better</Text>
        </TouchableOpacity>
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
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: spacing['3xl'],
  },
  headerIllustration: {
    width: 100,
    height: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
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
    textAlign: 'center',
    lineHeight: 22,
  },
  exercisesContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  exerciseCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  checkmark: {
    fontSize: 16,
    color: colors.primary[600],
    marginLeft: spacing.sm,
  },
  exerciseDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  expandIcon: {
    fontSize: 24,
    color: colors.text.muted,
    paddingHorizontal: spacing.sm,
  },
  exerciseContent: {
    padding: spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  instructionsList: {
    marginTop: spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary[100],
    color: colors.primary[600],
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semibold,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: spacing.sm,
  },
  instructionText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 22,
  },
  markCompleteButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  markCompleteText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.background.white,
  },
  crisisContainer: {
    backgroundColor: colors.warning + '10',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  crisisTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.warning,
    marginBottom: spacing.xs,
  },
  crisisSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  crisisNumbers: {
    gap: spacing.sm,
  },
  crisisItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  crisisLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  crisisNumber: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.bold,
    color: colors.warning,
  },
  footer: {
    padding: spacing.lg,
  },
  iFeelBetterButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  iFeelBetterText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.background.white,
  },
  completionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  completionEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  completionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  completionSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  exercisesCompleted: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
  },
  exercisesCompletedText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[700],
  },
  finishButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
    borderRadius: borderRadius.xl,
  },
  finishButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.background.white,
  },
});
