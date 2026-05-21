// Single Source of Truth - Component Configuration
// UI Components defined as config

import { colors, typography, spacing, borderRadius, shadows } from './theme';

// Button variants
export const BUTTON_CONFIG = {
  variants: {
    primary: {
      backgroundColor: colors.primary[600],
      textColor: colors.text.inverse,
      borderColor: 'transparent',
      shadow: shadows.md,
    },
    secondary: {
      backgroundColor: colors.primary[500],
      textColor: colors.text.inverse,
      borderColor: 'transparent',
      shadow: shadows.md,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: colors.primary[600],
      borderColor: colors.primary[600],
      shadow: shadows.none,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: colors.primary[600],
      borderColor: 'transparent',
      shadow: shadows.none,
    },
  },
  sizes: {
    small: {
      height: 36,
      paddingHorizontal: spacing.md,
      fontSize: typography.fontSize.sm,
      borderRadius: borderRadius.md,
    },
    medium: {
      height: 48,
      paddingHorizontal: spacing.lg,
      fontSize: typography.fontSize.base,
      borderRadius: borderRadius.lg,
    },
    large: {
      height: 56,
      paddingHorizontal: spacing.xl,
      fontSize: typography.fontSize.lg,
      borderRadius: borderRadius.xl,
    },
  },
  states: {
    disabled: {
      opacity: 0.5,
    },
    loading: {
      opacity: 0.8,
    },
  },
} as const;

// Input variants
export const INPUT_CONFIG = {
  variants: {
    default: {
      backgroundColor: colors.background.white,
      borderColor: colors.border,
      textColor: colors.text.primary,
      placeholderColor: colors.text.muted,
    },
    focused: {
      borderColor: colors.primary[600],
    },
    error: {
      borderColor: colors.error,
      textColor: colors.error,
    },
  },
  states: {
    disabled: {
      backgroundColor: colors.background.cardAlt,
      opacity: 0.5,
    },
  },
} as const;

// Card variants
export const CARD_CONFIG = {
  variants: {
    default: {
      backgroundColor: colors.background.white,
      borderRadius: borderRadius['2xl'],
      shadow: shadows.md,
      padding: spacing.lg,
    },
    flat: {
      backgroundColor: colors.background.cardAlt,
      borderRadius: borderRadius.xl,
      shadow: shadows.none,
      padding: spacing.md,
    },
    elevated: {
      backgroundColor: colors.background.white,
      borderRadius: borderRadius['2xl'],
      shadow: shadows.lg,
      padding: spacing.lg,
    },
  },
} as const;

// Avatar sizes
export const AVATAR_CONFIG = {
  sizes: {
    small: { width: 32, height: 32, borderRadius: borderRadius.full },
    medium: { width: 40, height: 40, borderRadius: borderRadius.full },
    large: { width: 56, height: 56, borderRadius: borderRadius.full },
    xlarge: { width: 100, height: 100, borderRadius: borderRadius.full },
  },
} as const;
