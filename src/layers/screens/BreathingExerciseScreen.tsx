// Layers - Screens - Breathing Exercise Screen
// Calming 4-7-8 breathing technique

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

type BreathPhase = 'ready' | 'inhale' | 'hold' | 'exhale' | 'holdAfterExhale' | 'complete';

const BREATHING_PATTERN = {
  inhale: 4,
  hold: 7,
  exhale: 8,
};

export const BreathingExerciseScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const [phase, setPhase] = useState<BreathPhase>('ready');
  const [count, setCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalCycles, setTotalCycles] = useState(4);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  
  const phaseInstructions: Record<BreathPhase, string> = {
    ready: 'Find a comfortable position',
    inhale: 'Breathe in slowly through your nose',
    hold: 'Hold your breath gently',
    exhale: 'Exhale slowly through your mouth',
    holdAfterExhale: 'Hold briefly',
    complete: 'You did it!',
  };
  
  const phaseEmoji: Record<BreathPhase, string> = {
    ready: '🧘',
    inhale: '💨',
    hold: '⏸️',
    exhale: '😮‍💨',
    holdAfterExhale: '⏸️',
    complete: '✨',
  };

  useEffect(() => {
    if (phase === 'ready') return;
    
    let interval: NodeJS.Timeout;
    let countdown = phase === 'inhale' ? BREATHING_PATTERN.inhale :
                   phase === 'hold' ? BREATHING_PATTERN.hold :
                   phase === 'exhale' ? BREATHING_PATTERN.exhale : 1;
    
    setCount(countdown);
    
    interval = setInterval(() => {
      countdown--;
      setCount(countdown);
      
      if (countdown <= 0) {
        clearInterval(interval);
        
        if (phase === 'inhale') {
          setPhase('hold');
          animateBreath('hold');
        } else if (phase === 'hold') {
          setPhase('exhale');
          animateBreath('exhale');
        } else if (phase === 'exhale') {
          if (cycleCount + 1 >= totalCycles) {
            setPhase('complete');
          } else {
            setCycleCount(prev => prev + 1);
            setPhase('inhale');
            animateBreath('inhale');
          }
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [phase]);
  
  const animateBreath = (type: 'inhale' | 'hold' | 'exhale') => {
    const targetScale = type === 'inhale' ? 1.3 : type === 'exhale' ? 0.8 : 1.1;
    
    Animated.timing(scaleAnim, {
      toValue: targetScale,
      duration: type === 'inhale' ? 4000 : type === 'exhale' ? 8000 : 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };
  
  const handleStart = () => {
    setPhase('inhale');
    animateBreath('inhale');
  };
  
  const handleComplete = () => {
    navigation.goBack();
  };
  
  const handleRestart = () => {
    setPhase('ready');
    setCycleCount(0);
    setCount(0);
    scaleAnim.setValue(1);
  };

  if (phase === 'complete') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>✨</Text>
          <Text style={styles.completeTitle}>Well Done!</Text>
          <Text style={styles.completeSubtitle}>
            You completed {totalCycles} breathing cycles.{'\n'}
            Your nervous system thanks you.
          </Text>
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <Text style={styles.restartButtonText}>Practice Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('@assets/mental/PNG/warm drink.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      
      {/* Phase Indicator */}
      <View style={styles.phaseContainer}>
        <Text style={styles.phaseEmoji}>{phaseEmoji[phase]}</Text>
        <Text style={styles.phaseInstruction}>{phaseInstructions[phase]}</Text>
      </View>
      
      {/* Breath Circle */}
      <View style={styles.circleContainer}>
        <Animated.View 
          style={[
            styles.breathCircle,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          {phase !== 'ready' && (
            <Text style={styles.countText}>{count}</Text>
          )}
        </Animated.View>
      </View>
      
      {/* Cycle Counter */}
      <View style={styles.cycleContainer}>
        <Text style={styles.cycleText}>
          Cycle {cycleCount + 1} of {totalCycles}
        </Text>
        <View style={styles.cycleIndicators}>
          {Array.from({ length: totalCycles }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.cycleDot,
                i < cycleCount && styles.cycleDotComplete
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Progress indicator */}
      <Text style={styles.techniqueText}>
        4-7-8 Breathing Technique
      </Text>
      
      {/* Start Button */}
      {phase === 'ready' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Begin</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustrationContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  illustration: {
    width: 100,
    height: 100,
    opacity: 0.5,
  },
  phaseContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  phaseEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  phaseInstruction: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  breathCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary[100],
    borderWidth: 4,
    borderColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 64,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary[600],
  },
  cycleContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  cycleText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  cycleIndicators: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cycleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  cycleDotComplete: {
    backgroundColor: colors.primary[600],
  },
  techniqueText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.muted,
    marginBottom: spacing.xl,
  },
  footer: {
    position: 'absolute',
    bottom: spacing['3xl'],
    left: spacing.xl,
    right: spacing.xl,
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
    color: colors.text.inverse,
  },
  completeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  completeEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  completeTitle: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  completeSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    lineHeight: 24,
  },
  completeButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },
  completeButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
  restartButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['2xl'],
  },
  restartButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[600],
  },
});