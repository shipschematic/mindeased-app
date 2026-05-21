// Components - Common - SVG Icon Component
// Uses react-native-svg for rendering imported SVG files

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

// Tab bar icons from airaa-design-2000-icons-set
export const HomeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M9 22V12h6v10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const MoodIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="9" cy="9" r="1" fill={color}/>
    <Circle cx="15" cy="9" r="1" fill={color}/>
  </Svg>
);

export const StarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const CommunityIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
    <Path d="M23 21v-2a4 4 0 00-3-3.87" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const ProfileIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
  </Svg>
);

export const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const ForwardIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const SearchIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <Path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const HeartIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const PlusIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const MessageIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const EyeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="2"/>
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
  </Svg>
);

export const SettingsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="2"/>
  </Svg>
);

export const GlobeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth="2"/>
  </Svg>
);

export const HelpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const EditIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const TrophyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1C252E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8 21h8M12 17v4M7 4h10M17 4v6a5 5 0 01-10 0V4M17 4H7M4 4h2M18 4h2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Mood icons with colors
export const MoodLoveIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill={color}/>
  </Svg>
);

export const MoodGoodIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#4ECDC4' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const MoodSadIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#5B8DEF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M16 16s-1.5-2-4-2-4 2-4 2M9 10h.01M15 10h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const MoodWorriedIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#FFB347' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M16 16s-1.5-2-4-2-4 2-4 2M9 10h.01M15 10h.01M9 17h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const MoodDepressIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#9B59B6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M16 16s-1.5-2-4-2-4 2-4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="9" cy="9" r="1" fill={color}/>
    <Circle cx="15" cy="9" r="1" fill={color}/>
  </Svg>
);

// Main SvgIcon component for backward compatibility
interface SvgIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  home: HomeIcon,
  mood: MoodIcon,
  star: StarIcon,
  community: CommunityIcon,
  profile: ProfileIcon,
  backArrow: BackIcon,
  forwardArrow: ForwardIcon,
  search: SearchIcon,
  heart: HeartIcon,
  checkmark: CheckIcon,
  add: PlusIcon,
  comment: MessageIcon,
  eye: EyeIcon,
  settings: SettingsIcon,
  globe: GlobeIcon,
  question: HelpIcon,
  edit: EditIcon,
  achievement: TrophyIcon,
  moodLove: MoodLoveIcon,
  moodGood: MoodGoodIcon,
  moodSad: MoodSadIcon,
  moodWorried: MoodWorriedIcon,
  moodBad: MoodDepressIcon,
};

export const SvgIcon: React.FC<SvgIconProps> = ({ name, size = 24, color = '#1C252E', style }) => {
  const IconComponent = ICON_MAP[name];
  
  if (!IconComponent) {
    console.warn(`SvgIcon: "${name}" not found`);
    return null;
  }
  
  return (
    <View style={[styles.container, style]}>
      <IconComponent size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SvgIcon;