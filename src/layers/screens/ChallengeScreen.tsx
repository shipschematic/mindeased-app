// Layers - Screens - Challenge Screen (Different from Journey!)
// Gamified time-bound challenges

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
    // TODO: Navigate to ChallengeDetail when implemented
    console.log('Starting challenge:', challengeId);
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
            
            return (
              <TouchableOpacity
                key={challenge.id}
                style={styles.challengeCard}
                onPress={() => handleStartChallenge(challenge.id)}
                activeOpacity={0.8}
              >
                {/* Illustration */}
                <View style={[styles.illustrationContainer, { backgroundColor: challenge.color + '20' }]}>
                  <Image
                    source={challenge.illustrationPng || require('@assets/mental/PNG/achievement.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                  />
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
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  intro: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  introTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  introText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  challengesContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  challengeCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  illustrationContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 80,
    height: 80,
  },
  challengeContent: {
    padding: spacing.lg,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderRadius: borderRadius.md,
  },
  durationText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.semibold,
  },
  challengeDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 20,
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
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginRight: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    width: 35,
    textAlign: 'right',
  },
  milestonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.white,
  },
  milestoneDay: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  milestoneLine: {
    width: 30,
    height: 2,
  },
  ctaContainer: {
    alignItems: 'center',
  },
  startButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
  },
  startButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
  howItWorks: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.background.cardAlt,
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius['2xl'],
    marginBottom: spacing.xl,
  },
  howItWorksTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.inverse,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  stepText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
});