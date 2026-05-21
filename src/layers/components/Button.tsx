// Layers - Dumb UI Components
// Button Component (Config-Driven)

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { BUTTON_CONFIG } from '@/config/components';
import { typography } from '@/config/theme';

type ButtonVariant = keyof typeof BUTTON_CONFIG.variants;
type ButtonSize = keyof typeof BUTTON_CONFIG.sizes;

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  label,
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const variantConfig = BUTTON_CONFIG.variants[variant];
  const sizeConfig = BUTTON_CONFIG.sizes[size];
  const stateConfig = disabled ? BUTTON_CONFIG.states.disabled : {};

  const buttonStyle: ViewStyle = {
    backgroundColor: variantConfig.backgroundColor as string,
    borderColor: variantConfig.borderColor as string,
    borderWidth: 1,
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    borderRadius: sizeConfig.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...variantConfig.shadow,
    ...stateConfig,
    ...style,
  };

  const labelStyle: TextStyle = {
    color: variantConfig.textColor as string,
    fontSize: sizeConfig.fontSize,
    fontFamily: typography.fontFamily.semibold,
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={loading || disabled ? undefined : onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variantConfig.textColor as string} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={labelStyle}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

// Styles are defined inline via config
