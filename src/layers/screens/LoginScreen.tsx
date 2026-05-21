// Layers - Screens - Login Screen (Config-Driven)
// Matches Figma Log in design

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      await intents.auth.login({ email, password });
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    await intents.auth.socialLogin(provider);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{CONTENT.AUTH.login.title}</Text>
          <Text style={styles.subtitle}>{CONTENT.AUTH.login.subtitle}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={CONTENT.AUTH.login.email}
            placeholderTextColor={colors.text.muted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder={CONTENT.AUTH.login.password}
            placeholderTextColor={colors.text.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>{CONTENT.AUTH.login.forgotPassword}</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>{CONTENT.AUTH.login.submit}</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{CONTENT.AUTH.login.or}</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('google')}
            activeOpacity={0.8}
          >
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>{CONTENT.AUTH.login.social.google}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('apple')}
            activeOpacity={0.8}
          >
            <Text style={styles.socialIcon}>🍎</Text>
            <Text style={styles.socialText}>{CONTENT.AUTH.login.social.apple}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('facebook')}
            activeOpacity={0.8}
          >
            <Text style={styles.socialIcon}>f</Text>
            <Text style={styles.socialText}>{CONTENT.AUTH.login.social.facebook}</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{CONTENT.AUTH.login.noAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
            <Text style={styles.footerLink}>{CONTENT.AUTH.login.signup}</Text>
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
  form: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    height: 52,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  forgotText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary[600],
  },
  loginButton: {
    backgroundColor: colors.primary[600],
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    height: 52,
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.muted,
    marginHorizontal: spacing.md,
  },
  socialContainer: {
    paddingHorizontal: spacing.lg,
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
    color: colors.text.primary,
  },
  socialText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing['2xl'],
    marginBottom: spacing['3xl'],
  },
  footerText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  footerLink: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary[600],
  },
});
