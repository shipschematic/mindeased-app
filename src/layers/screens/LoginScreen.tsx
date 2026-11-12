// Layers - Screens - Login Screen (Google sign-in only)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIntents } from '@/intents/actions';
import { CONTENT } from '@/config/content';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const intents = useIntents();
  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      await intents.auth.socialLogin('google');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Sign-in failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {navigation.canGoBack() ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}

        <View style={styles.header}>
          <Text style={styles.title}>{CONTENT.AUTH.login.title}</Text>
          <Text style={styles.subtitle}>{CONTENT.AUTH.login.subtitle}</Text>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>{CONTENT.AUTH.login.social.google}</Text>
          </TouchableOpacity>

          {authError ? <Text style={styles.errorText}>{authError}</Text> : null}

          <Text style={styles.note}>
            We use your Google account only to sign you in. Your mood entries stay
            on this device for now.
          </Text>
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
  backButton: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['3xl'],
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  socialContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    height: 52,
    gap: spacing.sm,
  },
  socialIcon: {
    fontSize: 18,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  socialText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.error,
    textAlign: 'center',
  },
  note: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: spacing.lg,
  },
});
