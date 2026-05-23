// Layers - Screens - Challenge Detail Screen
// Shows challenge details and progress

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useStore } from '@/state/store';
import { CHALLENGE_CONFIGS, getChallengeProgress } from '@/config/challenge-types';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

export const ChallengeDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { challengeId: string } }, 'params'>>();
  const { challengeId } = route.params;
  
  const challenges = useStore((state) => state.challenges);
  const challenge = CHALLENGE_CONFIGS[challengeId];
  
  if (!challenge) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Challenge Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const userProgress = challenges.find(c => c.id === challengeId);
  const progress = userProgress 
    ? getChallengeProgress(challenge, userProgress.progress || 0)
    : 0;

  const handleStartChallenge = () => {
    // TODO: Start the challenge and navigate to first task
    console.log('Starting challenge:', challengeId);
    // For now, just go back
    navigation.goBack();
  };

  const ChallengeSvg = challenge.illustrationSvg;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{challenge.title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Challenge Illustration */}
        <View style={[styles.illustrationContainer, { backgroundColor: challenge.color + '20' }]}>
          <View style={styles.illustration}>
            <ChallengeSvg width={150} height={150} />
          </View>
        </View>

        {/* Challenge Info */}
        <View style={styles.content}>
          <Text style={styles.description}>{challenge.description}</Text>
          
          {/* Duration & Difficulty */}
          <View style={styles.metaContainer}>
            <View style={[styles.metaBadge, { backgroundColor: challenge.color + '20' }]}>
              <Text style={[styles.metaText, { color: challenge.color }]}>
                {challenge.duration} days
              </Text>
            </View>
            <View style={[styles.metaBadge, { backgroundColor: colors.background.cardAlt }]}>
              <Text style={styles.metaText}>
                {challenge.difficulty}
              </Text>
            </View>
          </View>

          {/* Goal */}
          <View style={styles.goalContainer}>
            <Text style={styles.goalLabel}>Goal:</Text>
            <Text style={styles.goalText}>{challenge.goal}</Text>
          </View>

          {/* Progress */}
          {progress > 0 && (
            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>Your Progress</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${progress}%`, backgroundColor: challenge.color }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{progress}% complete</Text>
            </View>
          )}

          {/* Milestones */}
          <View style={styles.milestonesSection}>
            <Text style={styles.milestonesTitle}>Milestones</Text>
            {challenge.milestones.map((milestone, index) => (
              <View key={index} style={styles.milestoneItem}>
                <View style={[styles.milestoneDot, { borderColor: challenge.color }]}>
                  <Text style={styles.milestoneDay}>{milestone.day}</Text>
                </View>
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                  <Text style={styles.milestoneReward}>🏆 {milestone.reward}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Start Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: challenge.color }]}
            onPress={handleStartChallenge}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>
              {progress > 0 ? 'Continue Challenge' : 'Start Challenge'}
            </Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  illustrationContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  illustration: {
    width: 150,
    height: 150,
  },
  content: {
    padding: spacing.lg,
  },
  description: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metaBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  metaText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    textTransform: 'capitalize',
  },
  goalContainer: {
    backgroundColor: colors.background.white,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  goalLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  goalText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  progressSection: {
    marginBottom: spacing.lg,
  },
  progressLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  milestonesSection: {
    backgroundColor: colors.background.white,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  milestonesTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  milestoneDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.white,
    marginRight: spacing.md,
  },
  milestoneDay: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  milestoneReward: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  footer: {
    padding: spacing.lg,
  },
  startButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.background.white,
  },
});
