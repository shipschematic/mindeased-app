// Layers - Dumb Avatar Component (Config-Driven)

import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { AVATAR_CONFIG } from '@/config/components';
import { colors, typography } from '@/config/theme';

type AvatarSize = keyof typeof AVATAR_CONFIG.sizes;

interface AvatarProps {
  size?: AvatarSize;
  imageUri?: string;
  name?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  imageUri,
  name,
  style,
}) => {
  const sizeConfig = AVATAR_CONFIG.sizes[size];

  const avatarStyle: ViewStyle = {
    width: sizeConfig.width,
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colors.primary[200],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...style,
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={avatarStyle}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
      ) : name ? (
        <Text style={styles.initials}>{getInitials(name)}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  initials: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary[700],
  },
});
