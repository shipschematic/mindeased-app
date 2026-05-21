// Layers - Screens - Profile Screen (Config-Driven)
// Uses SVG icons for professional rendering

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
import { useStore, selectUser } from '@/state/store';
import { useIntents } from '@/intents/actions';
import { CONTENT } from '@/config/content';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import { SvgIcon } from '@/components/common/SvgIcon';

// Menu Item Component
const MenuItem = ({
  icon,
  label,
  value,
  onPress,
}: {
  icon: 'settings' | 'globe' | 'question';
  label: string;
  value?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuIconWrapper}>
      <SvgIcon name={icon} size={20} color={colors.text.primary} />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    {value && <Text style={styles.menuValue}>{value}</Text>}
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const intents = useIntents();
  const user = useStore(selectUser);

  const handleLogout = () => {
    intents.auth.logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{CONTENT.PROFILE.title}</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?u=kate' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <SvgIcon name="edit" size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name || 'Kate Tanner'}</Text>
        </View>

        {/* Invite Friends Button */}
        <TouchableOpacity style={styles.inviteButton} activeOpacity={0.8}>
          <Text style={styles.inviteButtonText}>{CONTENT.PROFILE.inviteFriends}</Text>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="settings"
            label={CONTENT.PROFILE.menu.accountSettings}
            onPress={() => navigation.navigate('Settings' as never)}
          />
          <MenuItem
            icon="globe"
            label={CONTENT.PROFILE.menu.language}
            value={CONTENT.PROFILE.menu.languageValue}
          />
          <MenuItem icon="question" label={CONTENT.PROFILE.menu.faq} />
          <MenuItem icon="question" label={CONTENT.PROFILE.menu.help} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[200],
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  name: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  inviteButton: {
    backgroundColor: colors.primary[600],
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  inviteButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
  menuContainer: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.cardAlt,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
  },
  menuIconWrapper: {
    width: 24,
    height: 24,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  menuValue: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginRight: spacing.sm,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.text.muted,
  },
  logoutButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing['2xl'],
    marginBottom: spacing['2xl'],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.error,
  },
});