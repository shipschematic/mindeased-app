// Layers - Dumb Card Component (Config-Driven)

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { CARD_CONFIG } from '@/config/components';
import { colors, typography, spacing } from '@/config/theme';

type CardVariant = keyof typeof CARD_CONFIG.variants;

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  onPress,
  style,
  padding = 'lg',
}) => {
  const variantConfig = CARD_CONFIG.variants[variant];

  const cardStyle: ViewStyle = {
    backgroundColor: variantConfig.backgroundColor as string,
    borderRadius: variantConfig.borderRadius,
    padding: spacing[padding],
    ...variantConfig.shadow,
    ...style,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => (
  <View style={cardStyles.header}>
    <View style={cardStyles.headerText}>
      <Text style={cardStyles.title}>{title}</Text>
      {subtitle && <Text style={cardStyles.subtitle}>{subtitle}</Text>}
    </View>
    {action}
  </View>
);

const cardStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});
