// Layers - Screens - Home Screen (Config-Driven)
// Differentiates Journey (therapeutic) vs Challenge (gamified)

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore, selectCurrentMood, selectUser } from '@/state/store';
import { useIntents } from '@/intents/actions';
import { CONTENT } from '@/config/content';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import type { MoodType } from '@/state/types';

// Import SVG illustrations
import GoodMoodSvg from '@assets/mental/SVG/good mood.svg';
import BadMoodSvg from '@assets/mental/SVG/bad mood.svg';
import OverloadedSvg from '@assets/mental/SVG/overloaded.svg';
import MoodRangeSvg from '@assets/mental/SVG/mood range.svg';

// Mood config with mental health SVG assets
const MOOD_CONFIG: Array<{ type: MoodType; emoji: string; color: string; label: string; SvgComponent: React.ComponentType<any> }> = [
  { type: 'love', emoji: '❤️', color: colors.mood.love, label: 'Love', SvgComponent: GoodMoodSvg },
  { type: 'good', emoji: '😊', color: colors.mood.good, label: 'Good', SvgComponent: GoodMoodSvg },
  { type: 'depress', emoji: '😞', color: colors.mood.depress, label: 'Depressed', SvgComponent: BadMoodSvg },
  { type: 'sad', emoji: '😢', color: colors.mood.sad, label: 'Sad', SvgComponent: BadMoodSvg },
  { type: 'worried', emoji: '😟', color: colors.mood.worried, label: 'Worried', SvgComponent: OverloadedSvg },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const intents = useIntents();
  const currentMood = useStore(selectCurrentMood);
  const user = useStore(selectUser);
  const [searchQuery, setSearchQuery] = React.useState('');

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return CONTENT.HOME.greeting.morning;
    if (hour < 18) return CONTENT.HOME.greeting.afternoon;
    return CONTENT.HOME.greeting.evening;
  };

  const handleMoodSelect = (mood: MoodType) => {
    intents.mood.logMood(mood);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to search results or filter content
      // For now, navigate to Journey with search context
      (navigation.navigate as any)('Journey', { searchQuery: searchQuery.trim() });
      setSearchQuery('');
    }
  };

  const displayName = user?.name?.split(' ')[0] || 'there';
  const currentMoodConfig = currentMood ? MOOD_CONFIG.find(m => m.type === currentMood) : null;
  const MoodIllustration = currentMoodConfig?.SvgComponent || MoodRangeSvg;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.username}>{displayName}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
            <Image
              source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?u=kate' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={handleSearch}
          activeOpacity={0.8}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={CONTENT.HOME.searchPlaceholder}
            placeholderTextColor={colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </TouchableOpacity>

        {/* Daily Mood Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{CONTENT.HOME.dailyMoodLog}</Text>
          <TouchableOpacity 
            style={styles.moodCard}
            onPress={() => navigation.navigate('Mood' as never)}
          >
            {/* Mood Illustration */}
            <View style={styles.moodCardLeft}>
              <View style={styles.moodIllustration}>
                <MoodIllustration width={100} height={100} />
              </View>
            </View>
            <View style={styles.moodCardContent}>
              <Text style={styles.moodCardTitle}>
                {currentMood ? `You're feeling ${currentMoodConfig?.label}` : 'How are you feeling?'}
              </Text>
              <Text style={styles.moodCardSubtitle}>
                {currentMood ? 'Tap to change your mood' : 'Tap to log your mood'}
              </Text>
              <View style={styles.moodQuickSelect}>
                {MOOD_CONFIG.map((mood) => (
                  <TouchableOpacity
                    key={mood.type}
                    style={[
                      styles.moodQuickButton,
                      currentMood === mood.type && { backgroundColor: mood.color }
                    ]}
                    onPress={() => handleMoodSelect(mood.type)}
                  >
                    <Text style={styles.moodQuickEmoji}>{mood.emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Journey vs Challenge - Key Differentiation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Path</Text>
          <View style={styles.pathContainer}>
            {/* Journey Card - Therapeutic */}
            <TouchableOpacity
              style={[styles.pathCard, styles.journeyCard]}
              onPress={() => navigation.navigate('Journey' as never)}
              activeOpacity={0.8}
            >
              <View style={styles.pathIconContainer}>
                <Text style={styles.pathIcon}>🧠</Text>
              </View>
              <Text style={styles.pathTitle}>Your Journey</Text>
              <Text style={styles.pathDescription}>
                Daily tasks & guided activities for mental wellness
              </Text>
              <View style={styles.pathCta}>
                <Text style={styles.pathCtaText}>Start Journey →</Text>
              </View>
            </TouchableOpacity>

            {/* Challenge Card - Gamified */}
            <TouchableOpacity
              style={[styles.pathCard, styles.challengeCard]}
              onPress={() => navigation.navigate('Challenge' as never)}
              activeOpacity={0.8}
            >
              <View style={styles.pathIconContainer}>
                <Text style={styles.pathIcon}>🏆</Text>
              </View>
              <Text style={styles.pathTitle}>Challenges</Text>
              <Text style={styles.pathDescription}>
                Time-bound goals to build healthy habits
              </Text>
              <View style={styles.pathCta}>
                <Text style={styles.pathCtaText}>View Challenges →</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rescue Session */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.rescueCard}
            onPress={() => navigation.navigate('RescueSession' as never)}
            activeOpacity={0.8}
          >
            <View style={styles.rescueIconContainer}>
              <Text style={styles.rescueIcon}>🆘</Text>
            </View>
            <View style={styles.rescueContent}>
              <Text style={styles.rescueTitle}>Need Support?</Text>
              <Text style={styles.rescueSubtitle}>
                Rescue sessions, breathing exercises & crisis support
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate('GuidedJournal' as never)}
            >
              <Text style={styles.quickActionIcon}>📓</Text>
              <Text style={styles.quickActionLabel}>Journal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate('BreathingExercise' as never)}
            >
              <Text style={styles.quickActionIcon}>🌬️</Text>
              <Text style={styles.quickActionLabel}>Breathe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate('Therapists' as never)}
            >
              <Text style={styles.quickActionIcon}>👩‍⚕️</Text>
              <Text style={styles.quickActionLabel}>Therapists</Text>
            </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  username: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[200],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.text.muted,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  moodCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius['2xl'],
    padding: spacing.lg,
    gap: spacing.lg,
  },
  moodCardLeft: {
    width: 100,
  },
  moodIllustration: {
    width: 100,
    height: 100,
  },
  moodCardContent: {
    flex: 1,
  },
  moodCardTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  moodCardSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  moodQuickSelect: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  moodQuickButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodQuickEmoji: {
    fontSize: 18,
  },
  pathContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  pathCard: {
    flex: 1,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
  },
  journeyCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[600],
  },
  challengeCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary[500],
  },
  pathIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  pathIcon: {
    fontSize: 24,
  },
  pathTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  pathDescription: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  pathCta: {
    marginTop: 'auto',
  },
  pathCtaText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[600],
  },
  rescueCard: {
    flexDirection: 'row',
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  rescueIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.warning + '25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescueIcon: {
    fontSize: 24,
  },
  rescueContent: {
    flex: 1,
  },
  rescueTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  rescueSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  quickActionLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
});
