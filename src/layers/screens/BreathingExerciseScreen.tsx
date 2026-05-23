// Layers - Screens - Breathing Exercise Screen
// Interactive breathing exercise with visual guide

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '@/state/store';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import { MusicMeditationSvg, AchievementSvg } from '@/config/svg-icons';

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

const PHASES: { phase: BreathingPhase; duration: number; label: string; instruction: string }[] = [
  { phase: 'inhale', duration: 4000, label: 'Inhale', instruction: 'Breathe in deeply through your nose' },
  { phase: 'hold', duration: 4000, label: 'Hold', instruction: 'Hold your breath gently' },
  { phase: 'exhale', duration: 4000, label: 'Exhale', instruction: 'Breathe out slowly through your mouth' },
  { phase: 'rest', duration: 2000, label: 'Rest', instruction: 'Relax and prepare for the next breath' },
];

const TOTAL_CYCLES = 5;

export const BreathingExerciseScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentPhase = PHASES[currentPhaseIndex];
  const progress = (cycleCount / TOTAL_CYCLES) * 100;
  
  useEffect(() => {
    if (isActive) {
      startPhaseAnimation();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, currentPhaseIndex]);
  
  const startPhaseAnimation = () => {
    const phase = PHASES[currentPhaseIndex];
    
    // Animate based on phase
    if (phase.phase === 'inhale') {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: phase.duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: phase.duration,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (phase.phase === 'exhale') {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: phase.duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: phase.duration,
          useNativeDriver: true,
        }),
      ]).start();
    }
    
    // Schedule next phase
    timerRef.current = setTimeout(() => {
      if (currentPhaseIndex < PHASES.length - 1) {
        setCurrentPhaseIndex(prev => prev + 1);
      } else {
        // Completed a cycle
        const newCycleCount = cycleCount + 1;
        setCycleCount(newCycleCount);
        
        if (newCycleCount >= TOTAL_CYCLES) {
          setCompleted(true);
          setShowCelebration(true);
          setIsActive(false);
          
          // Save completion
          const addJourneyEntry = (useStore.getState() as any).addJourneyEntry;
          if (addJourneyEntry) {
            addJourneyEntry({
              type: 'breathingExercise',
              completedAt: Date.now(),
              cyclesCompleted: TOTAL_CYCLES,
            });
          }
        } else {
          setCurrentPhaseIndex(0);
        }
      }
    }, phase.duration);
  };
  
  const handleStart = () => {
    setIsActive(true);
    setCurrentPhaseIndex(0);
    setCycleCount(0);
    setCompleted(false);
    setShowCelebration(false);
  };
  
  const handleStop = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  
  const handleFinish = () => {
    navigation.goBack();
  };

  if (showCelebration) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.celebrationContainer}>
          <View style={styles.celebrationImage}>
            <AchievementSvg width={120} height={120} />
          </View>
          <Text style={styles.celebrationTitle}>Breathe Easy</Text>
          <Text style={styles.celebrationSubtitle}>
            You completed {TOTAL_CYCLES} cycles of mindful breathing.{'\n'}
            Your body and mind thank you.
          </Text>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mindful Breathing</Text>
          <Text style={styles.subtitle}>
            Follow the circle to guide your breath
          </Text>
        </View>
        
        {/* Breathing Circle */}
        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          />
          <View style={styles.circleInner}>
            <Text style={styles.phaseLabel}>{currentPhase?.label || 'Ready'}</Text>
            <Text style={styles.phaseInstruction}>
              {currentPhase?.instruction || 'Press Start to begin'}
            </Text>
          </View>
        </View>
        
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Cycle {Math.min(cycleCount + 1, TOTAL_CYCLES)} of {TOTAL_CYCLES}
          </Text>
        </View>
        
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <MusicMeditationSvg width={80} height={80} opacity={0.4} />
          </View>
        </View>
      </View>
      
      {/* Controls */}
      <View style={styles.footer}>
        {!isActive ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>
              {completed ? 'Start Again' : 'Start Breathing'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  },
  circleContainer: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  breathingCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary[200],
  },
  circleInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  phaseLabel: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.primary[600],
    marginBottom: spacing.xs,
  },
  phaseInstruction: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  progressContainer: {
    width: '100%',
    marginBottom: spacing.lg,
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
  illustrationContainer: {
    alignItems: 'center',
  },
  illustration: {
    width: 80,
    height: 80,
  },
  footer: {
    padding: spacing.lg,
  },
  startButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.background.white,
  },
  stopButton: {
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  stopButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.background.white,
  },
  celebrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  celebrationImage: {
    width: 120,
    height: 120,
    marginBottom: spacing.lg,
  },
  celebrationTitle: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  celebrationSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
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
