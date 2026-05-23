// Layers - Screens - Reports Screen (Config-Driven)
// Shows mood patterns, achievements with illustrations

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useStore, selectMoodHistory, selectAchievements } from '@/state/store';
import { MOOD_WORKFLOWS } from '@/config/mood-workflows';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import { MOOD_CONFIG, type MoodType } from '@/config/mood-config';
import { JourneySvg } from '@/config/svg-icons';

// Mood Bar Component
const MoodBar = ({ mood, count, max }: { mood: MoodType; count: number; max: number }) => {
  const width = max > 0 ? (count / max) * 100 : 0;
  const moodConfig = MOOD_CONFIG.find(m => m.type === mood);
  
  return (
    <View style={styles.moodBarRow}>
      <Text style={styles.moodBarEmoji}>{moodConfig?.emoji || '😐'}</Text>
      <View style={styles.moodBarContainer}>
        <View style={[styles.moodBar, { width: `${width}%`, backgroundColor: moodConfig?.color || colors.primary[500] }]} />
      </View>
      <Text style={styles.moodBarCount}>{count}</Text>
    </View>
  );
};

// Achievement Card Component
const AchievementCard = ({ 
  emoji, 
  title, 
  subtitle, 
  isUnlocked 
}: { 
  emoji: string; 
  title: string; 
  subtitle: string; 
  isUnlocked: boolean;
}) => (
  <View style={[styles.achievementCard, !isUnlocked && styles.achievementLocked]}>
    <View style={[styles.achievementIcon, !isUnlocked && styles.achievementIconLocked]}>
      <Text style={[styles.achievementEmoji, !isUnlocked && styles.achievementEmojiLocked]}>
        {emoji}
      </Text>
    </View>
    <View style={styles.achievementContent}>
      <Text style={[styles.achievementTitle, !isUnlocked && styles.achievementTitleLocked]}>
        {title}
      </Text>
      <Text style={styles.achievementSubtitle}>{subtitle}</Text>
    </View>
    {isUnlocked && (
      <View style={styles.achievementBadge}>
        <Text style={styles.achievementBadgeText}>✓</Text>
      </View>
    )}
  </View>
);

// Mood Distribution Card
const MoodDistributionCard = ({ history }: { history: Array<{ mood: string; count: number }> }) => {
  const moodCounts: Record<string, number> = {};
  history.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  const maxCount = Math.max(...Object.values(moodCounts), 1);
  
  return (
    <View style={styles.moodDistributionCard}>
      <Text style={styles.cardTitle}>Mood Distribution</Text>
      {Object.entries(moodCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([mood, count]) => {
          return (
            <MoodBar
              key={mood}
              mood={mood as MoodType}
              count={count}
              max={maxCount}
            />
          );
        })}
    </View>
  );
};

// Weekly Trend Card
const WeeklyTrendCard = ({ history }: { history: Array<{ mood: string; count: number }> }) => (
  <View style={styles.weeklyTrendCard}>
    <Text style={styles.cardTitle}>Weekly Progress</Text>
    <View style={styles.trendGrid}>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
        <View key={day} style={styles.trendDay}>
          <View style={[styles.trendDot, { backgroundColor: colors.primary[400] }]} />
          <Text style={styles.trendDayLabel}>{day}</Text>
        </View>
      ))}
    </View>
    <View style={styles.trendStats}>
      <View style={styles.trendStat}>
        <Text style={styles.trendStatValue}>{history.length}</Text>
        <Text style={styles.trendStatLabel}>Entries</Text>
      </View>
      <View style={styles.trendStat}>
        <Text style={styles.trendStatValue}>5</Text>
        <Text style={styles.trendStatLabel}>Streak</Text>
      </View>
      <View style={styles.trendStat}>
        <Text style={styles.trendStatValue}>85%</Text>
        <Text style={styles.trendStatLabel}>Check-in Rate</Text>
      </View>
    </View>
  </View>
);

// Journey Progress Card
const JourneyProgressCard = () => (
  <View style={styles.journeyProgressCard}>
    <View style={styles.journeyProgressLeft}>
      <View style={styles.journeyIllustration}>
        <JourneySvg width={80} height={80} />
      </View>
    </View>
    <View style={styles.journeyProgressContent}>
      <Text style={styles.cardTitle}>Journey Progress</Text>
      <View style={styles.journeyProgressBar}>
        <View style={[styles.journeyProgressFill, { width: '65%' }]} />
      </View>
      <Text style={styles.journeyProgressText}>13 of 20 activities completed</Text>
    </View>
  </View>
);

// Insights Card
const InsightsCard = ({ history }: { history: Array<{ mood: string; count: number }> }) => {
  const moodCounts: Record<string, number> = {};
  history.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  const topMoodConfig = topMood ? MOOD_CONFIG.find(m => m.type === topMood[0] as MoodType) : null;
  
  return (
    <View style={styles.insightsCard}>
      <View style={styles.insightsHeader}>
        <Text style={styles.cardTitle}>Your Insights</Text>
        <View style={styles.insightsBadge}>
          <Text style={styles.insightsBadgeText}>🧠</Text>
        </View>
      </View>
      <View style={styles.insightItem}>
        <Text style={styles.insightEmoji}>📊</Text>
        <Text style={styles.insightText}>
          Most common mood: {topMoodConfig?.label || 'N/A'} {topMoodConfig?.emoji}
        </Text>
      </View>
      <View style={styles.insightItem}>
        <Text style={styles.insightEmoji}>🌟</Text>
        <Text style={styles.insightText}>
          You've logged {history.length} entries this week
        </Text>
      </View>
      <View style={styles.insightItem}>
        <Text style={styles.insightEmoji}>💡</Text>
        <Text style={styles.insightText}>
          Great job maintaining a positive streak!
        </Text>
      </View>
    </View>
  );
};

export const ReportsScreen: React.FC = () => {
  const moodHistory = useStore(selectMoodHistory);
  const achievements = useStore(selectAchievements);

  // Generate mock history if empty
  const history = moodHistory.length > 0 
    ? moodHistory.map(h => ({ mood: h.mood, count: 1 }))
    : [
        { mood: 'good' as MoodType, count: 12 },
        { mood: 'love' as MoodType, count: 8 },
        { mood: 'sad' as MoodType, count: 3 },
        { mood: 'worried' as MoodType, count: 2 },
        { mood: 'depress' as MoodType, count: 1 },
      ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Reports</Text>
          <Text style={styles.subtitle}>Track your mental wellness journey</Text>
        </View>

        {/* Journey Progress Card */}
        <JourneyProgressCard />

        {/* Weekly Trend */}
        <View style={styles.section}>
          <WeeklyTrendCard history={history} />
        </View>

        {/* Mood Distribution */}
        <View style={styles.section}>
          <MoodDistributionCard history={history} />
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <InsightsCard history={history} />
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              emoji={index === 0 ? '🏆' : index === 1 ? '🔥' : index === 2 ? '💎' : '⭐'}
              title={achievement.title}
              subtitle={achievement.subtitle}
              isUnlocked={achievement.progress >= achievement.total}
            />
          ))}
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
  cardTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  moodDistributionCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  moodBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  moodBarEmoji: {
    fontSize: 24,
    marginRight: spacing.sm,
    width: 32,
  },
  moodBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: colors.background.cardAlt,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  moodBar: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  moodBarCount: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
    width: 24,
    textAlign: 'right',
  },
  weeklyTrendCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  trendGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  trendDay: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  trendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  trendDayLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  trendStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  trendStat: {
    alignItems: 'center',
  },
  trendStatValue: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  trendStatLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  journeyProgressCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  journeyProgressLeft: {
    marginRight: spacing.md,
  },
  journeyIllustration: {
    width: 80,
    height: 80,
  },
  journeyProgressContent: {
    flex: 1,
    justifyContent: 'center',
  },
  journeyProgressBar: {
    height: 8,
    backgroundColor: colors.background.cardAlt,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  journeyProgressFill: {
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: borderRadius.full,
  },
  journeyProgressText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  insightsCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  insightsBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightsBadgeText: {
    fontSize: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  insightEmoji: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  insightText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  achievementIconLocked: {
    backgroundColor: colors.background.cardAlt,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementEmojiLocked: {
    opacity: 0.5,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  achievementTitleLocked: {
    color: colors.text.muted,
  },
  achievementSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  achievementBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementBadgeText: {
    fontSize: 14,
    color: colors.background.white,
  },
});
