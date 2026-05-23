// Layers - Screens - Journey Screen (Config-Driven)
// Uses JOURNEY_ACTIVITIES config for daily therapeutic tasks

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
import { useStore, selectCurrentMood } from '@/state/store';
import { useIntents } from '@/intents/actions';
import { JOURNEY_ACTIVITIES, JOURNEY_MILESTONES } from '@/config/journey-types';
import { MOOD_CONFIG } from '@/config/mood-config';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

interface JourneyCardProps {
  activity: typeof JOURNEY_ACTIVITIES[keyof typeof JOURNEY_ACTIVITIES];
  onPress: () => void;
  isCompleted?: boolean;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ activity, onPress, isCompleted }) => {
  const IllustrationSvg = activity.illustrationSvg;
  return (
    <TouchableOpacity style={styles.journeyCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.journeyCardLeft}>
        <View style={styles.journeyIllustration}>
          <IllustrationSvg width={80} height={80} />
        </View>
      </View>
      <View style={styles.journeyCardContent}>
        <View style={styles.journeyCardHeader}>
          <View style={styles.activityTypeTag}>
            <Text style={styles.activityTypeTagText}>{activity.type}</Text>
          </View>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>✓</Text>
            </View>
          )}
        </View>
        <Text style={styles.journeyCardTitle}>{activity.title}</Text>
        <Text style={styles.journeyCardDescription}>{activity.subtitle}</Text>
        <View style={styles.journeyCardMeta}>
          <Text style={styles.journeyMetaItem}>⏱️ {activity.estimatedMinutes} min</Text>
          <View style={styles.journeyCta}>
            <Text style={styles.journeyCtaText}>Start →</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const JourneyScreen: React.FC = () => {
  const navigation = useNavigation();
  const intents = useIntents();
  const currentMood = useStore(selectCurrentMood);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  // Get mood-aware activities
  const getRecommendedActivities = (): string[] => {
    if (!currentMood) return ['thoughtSharing', 'guidedJournal', 'breathingExercise'];
    
    // Map mood to recommended activities
    const moodActivityMap: Record<string, string[]> = {
      love: ['thoughtSharing', 'guidedJournal'],
      good: ['thoughtSharing', 'morningGratitude'],
      sad: ['guidedJournal', 'breathingExercise', 'rescueSession'],
      worried: ['breathingExercise', 'moodReflection'],
      depress: ['guidedJournal', 'rescueSession', 'moodReflection'],
    };
    
    return moodActivityMap[currentMood] || ['thoughtSharing', 'guidedJournal'];
  };

  const handleActivityPress = (activityId: string) => {
    switch (activityId) {
      case 'guidedJournal':
        (navigation.navigate as any)('GuidedJournal');
        break;
      case 'breathingExercise':
        (navigation.navigate as any)('BreathingExercise');
        break;
      case 'rescueSession':
        (navigation.navigate as any)('RescueSession');
        break;
      case 'thoughtSharing':
      case 'morningGratitude':
      case 'eveningReflection':
        // Navigate to GuidedJournal with activity type for generic journaling
        (navigation.navigate as any)('GuidedJournal', { activityType: activityId });
        break;
      case 'moodReflection':
        (navigation.navigate as any)('Reports');
        break;
      case 'audioJournal':
        (navigation.navigate as any)('GuidedJournal', { activityType: 'audioJournal' });
        break;
      default:
        // For activities without specific screens, mark as complete or show toast
        handleActivityComplete(activityId);
        break;
    }
  };

  const handleActivityComplete = (activityId: string) => {
    setCompletedActivities(prev => new Set(prev).add(activityId));
    intents.mood.completeActivity(activityId);
  };

  const recommendedIds = getRecommendedActivities();
  const moodConfig = currentMood ? MOOD_CONFIG.find(m => m.type === currentMood) : null;
  const MoodIllustration = moodConfig?.illustrationSvg || null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Journey</Text>
          <Text style={styles.subtitle}>Daily activities for mental wellness</Text>
        </View>

        {/* Mood Context Banner */}
        {currentMood && moodConfig && MoodIllustration && (
          <View style={styles.moodContextBanner}>
            <View style={styles.moodBannerIllustration}>
              <MoodIllustration width={60} height={60} />
            </View>
            <View style={styles.moodBannerContent}>
              <Text style={styles.moodBannerTitle}>
                Feeling {moodConfig.label}?
              </Text>
              <Text style={styles.moodBannerSubtitle}>
                {currentMood === 'good' || currentMood === 'love' 
                  ? "Great to hear! Keep up the positive energy."
                  : "It's okay to feel this way. We're here to help."}
              </Text>
            </View>
          </View>
        )}

        {/* Recommended Activities */}
        {recommendedIds.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            {recommendedIds.map(id => {
              const activity = JOURNEY_ACTIVITIES[id];
              if (!activity) return null;
              return (
                <JourneyCard
                  key={id}
                  activity={activity}
                  onPress={() => handleActivityPress(id)}
                  isCompleted={completedActivities.has(id)}
                />
              );
            })}
          </View>
        )}

        {/* All Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Activities</Text>
          {Object.entries(JOURNEY_ACTIVITIES).map(([id, activity]) => {
            if (recommendedIds.includes(id)) return null;
            return (
              <JourneyCard
                key={id}
                activity={activity}
                onPress={() => handleActivityPress(id)}
                isCompleted={completedActivities.has(id)}
              />
            );
          })}
        </View>

        {/* Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Milestones</Text>
          <View style={styles.milestonesContainer}>
            {JOURNEY_MILESTONES.map((milestone, index) => (
              <TouchableOpacity
                key={index}
                style={styles.milestoneItem}
                onPress={() => {
                  // Navigate to relevant screen based on milestone
                  switch (milestone.title) {
                    case 'First Check-in':
                      navigation.navigate('Mood' as never);
                      break;
                    case 'Journal Starter':
                      navigation.navigate('GuidedJournal' as never);
                      break;
                    case 'Consistency':
                    case 'Achievement Unlocked':
                      navigation.navigate('Reports' as never);
                      break;
                    default:
                      break;
                  }
                }}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.milestoneIcon,
                  { backgroundColor: index === 0 ? colors.primary[500] : colors.background.cardAlt }
                ]}>
                  <Text style={styles.milestoneIconText}>{milestone.emoji}</Text>
                </View>
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                  <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                </View>
                <Text style={styles.milestoneArrow}>›</Text>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  moodContextBanner: {
    flexDirection: 'row',
    backgroundColor: colors.primary[50],
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
  },
  moodBannerIllustration: {
    width: 60,
    height: 60,
  },
  moodBannerContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  moodBannerTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary[700],
  },
  moodBannerSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.primary[600],
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  journeyCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[500],
  },
  journeyCardLeft: {
    width: 80,
  },
  journeyIllustration: {
    width: 80,
    height: 80,
  },
  journeyCardContent: {
    flex: 1,
  },
  journeyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  activityTypeTag: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  activityTypeTagText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[700],
    textTransform: 'capitalize',
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadgeText: {
    fontSize: 14,
    color: colors.background.white,
    fontWeight: 'bold',
  },
  journeyCardTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  journeyCardDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  journeyCardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  journeyMetaItem: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.muted,
  },
  journeyCta: {
    backgroundColor: colors.primary[100],
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  journeyCtaText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[600],
  },
  milestonesContainer: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  milestoneArrow: {
    fontSize: 24,
    color: colors.text.muted,
    marginLeft: spacing.sm,
  },
  milestoneIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  milestoneIconText: {
    fontSize: 20,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  milestoneDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});
