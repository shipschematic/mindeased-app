// Layers - Screens - Onboarding Screen (Config-Driven)
// Matches Figma Onboarding design

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
import { useStore } from '@/state/store';
import { CONTENT } from '@/config/content';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

const SLIDES = CONTENT.ONBOARDING.slides;

// Mental health illustrations for each onboarding slide
const SLIDE_ILLUSTRATIONS = ['thoughts', 'journeyFeature', 'rescue'];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const completeOnboarding = useStore((state) => state.completeOnboarding);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
      navigation.navigate('Login' as never);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigation.navigate('Login' as never);
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Skip Button - Fixed Position */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>{CONTENT.ONBOARDING.skip}</Text>
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Illustration */}
          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustrationText}>
                {currentSlide === 0 ? '🧠' : currentSlide === 1 ? '✨' : '💚'}
              </Text>
            </View>
          </View>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentSlide && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          {/* Navigation Arrows */}
          <View style={styles.navArrows}>
            {currentSlide > 0 && (
              <TouchableOpacity 
                style={styles.prevButton}
                onPress={handlePrev}
              >
                <Text style={styles.arrowText}>←</Text>
              </TouchableOpacity>
            )}
            {currentSlide < SLIDES.length - 1 && (
              <TouchableOpacity 
                style={styles.prevButton}
                onPress={handleNext}
              >
                <Text style={styles.arrowText}>→</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext} 
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustrationWrapper: {
    marginBottom: spacing.xl,
  },
  illustrationCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationText: {
    fontSize: 80,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary[600],
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
    gap: spacing.md,
  },
  navArrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  prevButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  nextButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    height: 56,
  },
  nextButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
});