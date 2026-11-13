// Single Source of Truth - Theme Configuration
// Extracted from Figma Design System - Mindeased

export const colors = {
  // Primary - Olive Green (from Figma)
  primary: {
    50: '#F5F7EF',
    100: '#E8EDDA',
    200: '#D1DBC1',
    300: '#B5C4A0',
    400: '#9AAF7E',
    500: '#7A8F5A', // Main olive green
    600: '#5A6B3A', // Dark olive (buttons)
    700: '#4A5B2A',
    800: '#3A4B1A',
    900: '#2A3B0A',
  },

  // Background - Cream (from Figma)
  background: {
    cream: '#FAF8F0',
    creamDark: '#F5F0E0',
    white: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F5F0E8',
  },

  // Text Colors
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    muted: '#999999',
    inverse: '#FFFFFF',
    olive: '#5A6B3A',
  },

  // Mood Colors (from Figma emojis)
  mood: {
    love: '#7A8F5A',    // Green
    good: '#D4A843',    // Yellow/Gold
    depress: '#B8B8B8', // Gray
    sad: '#7A9BB8',     // Blue gray
    worried: '#D4846A', // Peach/Salmon
  },

  // Secondary - Warm orange (for accents)
  secondary: {
    50: '#FFF5E6',
    100: '#FFE4CC',
    200: '#FFD4B3',
    300: '#FFC499',
    400: '#FFB480',
    500: '#FFA566',
    600: '#E88C4D',
    700: '#CC7333',
    800: '#995F26',
    900: '#664C1A',
  },

  // Semantic
  success: '#7A8F5A',
  error: '#D0021B',
  warning: '#F5A623',
  info: '#5B8DEF',

  // UI Elements
  border: '#E8E4DA',
  divider: '#F0EDE5',
  input: {
    background: '#FFFFFF',
    border: '#E8E4DA',
    focus: '#5A6B3A',
    placeholder: '#999999',
  },

  // Tab Bar
  tabBar: {
    background: '#FFFFFF',
    active: '#5A6B3A',
    inactive: '#999999',
  },
} as const;

export const typography = {
  // Font Families
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },

  // Font Sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;
