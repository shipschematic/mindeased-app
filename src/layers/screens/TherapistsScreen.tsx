// Layers - Screens - Therapists Screen (Config-Driven)
// Matches Figma Therapists design

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore, selectTherapists } from '@/state/store';
import { CONTENT } from '@/config/content';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import { SvgIcon } from '@/components/common/SvgIcon';

// Therapist Card Component
const TherapistCard = ({
  name,
  specialty,
  avatar,
  rating,
}: {
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
}) => {
  return (
    <View style={styles.therapistCard}>
      <Image source={{ uri: avatar }} style={styles.therapistAvatar} />
      <View style={styles.therapistInfo}>
        <Text style={styles.therapistName}>{name}</Text>
        <Text style={styles.therapistTitle}>{specialty}</Text>
        <View style={styles.ratingContainer}>
          <SvgIcon name="star" size={12} color={colors.text.secondary} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
        <Text style={styles.bookButtonText}>{CONTENT.THERAPISTS.book}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const TherapistsScreen: React.FC = () => {
  const navigation = useNavigation();
  const therapists = useStore(selectTherapists);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <SvgIcon name="backArrow" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>{CONTENT.THERAPISTS.title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{CONTENT.THERAPISTS.subtitle}</Text>

        {/* Therapists List */}
        {therapists.map((therapist) => (
          <TherapistCard key={therapist.id} {...therapist} />
        ))}
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
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  therapistCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius['2xl'],
    padding: spacing.md,
    alignItems: 'center',
  },
  therapistAvatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
    backgroundColor: colors.background.cardAlt,
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  therapistTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  ratingText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  specialty: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[600],
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  priceContainer: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  price: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  bookButton: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  bookButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
});
