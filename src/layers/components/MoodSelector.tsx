// Layers - Mood Selector Component (Config-Driven)
// Uses SVG icons for mood selection

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/config/theme';
import { CONTENT } from '@/config/content';
import { SvgIcon } from '@/components/common/SvgIcon';

type MoodType = 'love' | 'good' | 'depress' | 'sad' | 'worried';

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
  showLabels?: boolean;
  style?: ViewStyle;
}

const MOODS: Array<{
  type: MoodType;
  color: string;
  svgName: string;
  label: string;
}> = [
  { type: 'love', color: colors.mood.love, svgName: 'moodLove', label: CONTENT.MOOD.emotions.love },
  { type: 'good', color: colors.mood.good, svgName: 'moodGood', label: CONTENT.MOOD.emotions.good },
  { type: 'depress', color: colors.mood.depress, svgName: 'moodBad', label: CONTENT.MOOD.emotions.depress },
  { type: 'sad', color: colors.mood.sad, svgName: 'moodSad', label: CONTENT.MOOD.emotions.sad },
  { type: 'worried', color: colors.mood.worried, svgName: 'moodWorried', label: CONTENT.MOOD.emotions.worried },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelectMood,
  showLabels = true,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {MOODS.map((mood) => (
        <TouchableOpacity
          key={mood.type}
          style={[
            styles.moodButton,
            selectedMood === mood.type && {
              backgroundColor: mood.color,
              borderColor: mood.color,
              borderWidth: 3,
            },
          ]}
          onPress={() => onSelectMood(mood.type)}
          activeOpacity={0.7}
        >
          <SvgIcon 
            name={mood.svgName} 
            size={28} 
            color={selectedMood === mood.type ? colors.text.inverse : colors.text.primary} 
          />
          {showLabels && (
            <Text
              style={[
                styles.moodLabel,
                selectedMood === mood.type && styles.moodLabelActive,
              ]}
            >
              {mood.label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 80,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.cardAlt,
    gap: spacing.xs,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  moodLabelActive: {
    color: colors.text.inverse,
  },
});