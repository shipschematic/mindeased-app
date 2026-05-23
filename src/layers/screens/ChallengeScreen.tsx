// Layers - Screens - Challenge Screen (Different from Journey!)
// Gamified time-bound challenges

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
import { CHALLENGE_CONFIGS, getChallengeProgress } from '@/config/challenge-types';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

export const ChallengeScreen: React.FC = () => {
  const navigation = useNavigation();
  const challenges = useStore((state) => state.challenges);
  
  const challengesList = Object.values(CHALLENGE_CONFIGS);
  
  const handleStartChallenge = (challengeId: string) => {
    (navigation.navigate as any)('ChallengeDetail', { challengeId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Challenges</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.introTitle}>What are Challenges?</Text>
          <Text style={styles.introText}>
            Time-bound goals to help you build healthy habits and track your progress. 
            Complete them to earn achievements and badges!
          </Text>
        </View>
        
        {/* Challenge Cards */}
        <View style={styles.challengesContainer}>
          <Text style={styles.sectionTitle}>Available Challenges</Text>
          
          {challengesList.map((challenge) => {
            const userProgress = challenges.find(c => c.id === challenge.id);
            const progress = userProgress 
              ? getChallengeProgress(challenge, userProgress.progress || 0)
              : 0;
            const ChallengeSvg = challenge.illustrationSvg;
            
            return (
              <TouchableOpacity
                key={challenge.id}
                style={styles.challengeCard}
                onPress={() => handleStartChallenge(challenge.id)}
                activeOpacity={0.8}
              >
                {/* Illustration */}
                <View style={[styles.illustrationContainer, { backgroundColor: challenge.color + '20' }]}>
                  <View style={styles.illustration}>
                    <ChallengeSvg width={60} height={60} />
                  </View>
                </View>
                
                {/* Content */}
                <View style={styles.challengeContent}>
                  <View style={styles.challengeHeader}>
                    <Text style={[styles.challengeTitle, { color: challenge.color }]}>
                      {challenge.title}
                    </Text>
                    <View style={[styles.durationBadge, { backgroundColor: challenge.color + '20' }]}>
                      <Text style={[styles.durationText, { color: challenge.color }]}>
                        {challenge.duration} days
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  
                  {/* Goal */}
                  <View style={styles.goalContainer}>
                    <Text style={styles.goalLabel}>Goal:</Text>
                    <Text style={styles.goalText}>{challenge.goal}</Text>
                  </View>
                  
                  {/* Progress */}
                  {progress > 0 && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${progress}%`, backgroundColor: challenge.color }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>{progress}%</Text>
                    </View>
                  )}
                  
                  {/* Milestones */}
                  <View style={styles.milestonesContainer}>
                    {challenge.milestones.map((milestone, index) => (
                      <View key={index} style={styles.milestone}>
                        <View style={[
                          styles.milestoneDot,
                          { borderColor: challenge.color }
                        ]}>
                          <Text style={styles.milestoneDay}>{milestone.day}</Text>
                        </View>
                        {index < challenge.milestones.length - 1 && (
                          <View style={[styles.milestoneLine, { backgroundColor: challenge.color + '40' }]} />
                        )}
                      </View>
                    ))}
                  </View>
                  
                  {/* CTA */}
                  <View style={styles.ctaContainer}>
                    <TouchableOpacity
                      style={[styles.startButton, { backgroundColor: challenge.color }]}
                      onPress={() => handleStartChallenge(challenge.id)}
                    >
                      <Text style={styles.startButtonText}>
                        {progress > 0 ? 'Continue' : 'Start Challenge'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* How it works */}
        <View style={styles.howItWorks}>
          <Text style={styles.howItWorksTitle}>How Challenges Work</Text>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Choose a Challenge</Text>
              <Text style={styles.stepText}>Pick one that matches your goals</Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Complete Daily Tasks</Text>
              <Text style={styles.stepText}>Log your progress every day</Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Earn Rewards</Text>
              <Text style={styles.stepText}>Unlock milestones and achievements</Text>
            </View>
          </View>
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  intro: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  introTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  introText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  challengesContainer: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  challengeCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  illustrationContainer: {
    width: '100%',
    height: 120,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  illustration: {
    width: 60,
    height: 60,
  },
  challengeContent: {
    flex: 1,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  challengeTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    flex: 1,
  },
  durationBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  durationText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
  },
  challengeDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  goalContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  goalLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginRight: spacing.xs,
  },
  goalText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.background.cardAlt,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  milestonesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  milestone: {
    alignItems: 'center',
  },
  milestoneDot: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.white,
  },
  milestoneDay: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  milestoneLine: {
    position: 'absolute',
    top: 15,
    left: 36,
    width: 40,
    height: 2,
  },
  ctaContainer: {
    marginTop: spacing.sm,
  },
  startButton: {
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
  howItWorks: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing['3xl'],
  },
  howItWorksTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary[700],
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  stepText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});
