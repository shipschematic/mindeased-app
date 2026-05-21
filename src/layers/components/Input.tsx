// Layers - Dumb Input Component (Config-Driven)

import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { INPUT_CONFIG } from '@/config/components';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  disabled = false,
  icon,
  style,
  inputStyle,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const config = INPUT_CONFIG.variants.default;
  const focusedConfig = INPUT_CONFIG.variants.focused;
  const errorConfig = INPUT_CONFIG.variants.error;
  const disabledConfig = INPUT_CONFIG.states.disabled;

  const containerStyle: ViewStyle = {
    ...containerStyles.container,
    backgroundColor: disabled
      ? (disabledConfig.backgroundColor as string)
      : (config.backgroundColor as string),
    borderColor: error
      ? (errorConfig.borderColor as string)
      : isFocused
        ? (focusedConfig.borderColor as string)
        : (config.borderColor as string),
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <View style={style}>
      {label && <Text style={containerStyles.label}>{label}</Text>}
      <View style={containerStyle}>
        {icon && <View style={containerStyles.iconContainer}>{icon}</View>}
        <TextInput
          style={[containerStyles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={config.placeholderColor as string}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={containerStyles.errorText}>{error}</Text>}
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 52,
    backgroundColor: colors.background.white,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    padding: 0,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
