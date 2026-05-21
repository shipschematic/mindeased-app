// Single Source of Truth - Asset Registry
// All images, icons, and illustrations
// Updated to use Airaa icon set and mental illustrations

// Import mental illustrations (SVG transformer enabled)
const achievementIllustration = require('@assets/mental/SVG/achievement.svg').default;
const careIllustration = require('@assets/mental/SVG/care.svg').default;
const goodMoodIllustration = require('@assets/mental/SVG/good mood.svg').default;
const badMoodIllustration = require('@assets/mental/SVG/bad mood.svg').default;
const feelingLowIllustration = require('@assets/mental/SVG/feeling low.svg').default;
const musicMeditationIllustration = require('@assets/mental/SVG/music-meditation.svg').default;
const supportIllustration = require('@assets/mental/SVG/support.svg').default;
const putTogetherIllustration = require('@assets/mental/SVG/put together.svg').default;

export const assets = {
  // Illustrations (SVG) - Mental health illustrations
  illustrations: {
    exercise: musicMeditationIllustration,
    habit: putTogetherIllustration,
    challenge: musicMeditationIllustration,
    journey: putTogetherIllustration,
    weekly: musicMeditationIllustration,
    achievement: achievementIllustration,
    pushup: musicMeditationIllustration,
    exerciseFull: musicMeditationIllustration,
  },
  
  // Icons (SVG) - Mood icons from mental illustrations
  icons: {
    mood: {
      love: careIllustration,
      good: goodMoodIllustration,
      depress: badMoodIllustration,
      sad: feelingLowIllustration,
      worried: badMoodIllustration,
    },
    avatar: null,
    channel: null,
    post: null,
  },
  
  // Images (PNG) - Temporarily using placeholders
  images: {
    meditation: null,
    vegetable: null,
    workoutMachine: null,
    lunchTime: null,
    bed: null,
    working: null,
  },
} as const;

// Asset metadata for lazy loading
export const assetRegistry = {
  illustrations: [
    { key: 'exercise', type: 'svg', category: 'icon' },
    { key: 'habit', type: 'svg', category: 'icon' },
    { key: 'challenge', type: 'svg', category: 'icon' },
    { key: 'journey', type: 'svg', category: 'icon' },
    { key: 'weekly', type: 'svg', category: 'icon' },
    { key: 'achievement', type: 'svg', category: 'icon' },
    { key: 'pushup', type: 'svg', category: 'illustration' },
    { key: 'exerciseFull', type: 'svg', category: 'illustration' },
  ],
  icons: [
    { key: 'mood.love', type: 'svg', category: 'mood' },
    { key: 'mood.good', type: 'svg', category: 'mood' },
    { key: 'mood.depress', type: 'svg', category: 'mood' },
    { key: 'mood.sad', type: 'svg', category: 'mood' },
    { key: 'mood.worried', type: 'svg', category: 'mood' },
    { key: 'avatar', type: 'svg', category: 'ui' },
    { key: 'channel', type: 'svg', category: 'community' },
    { key: 'post', type: 'svg', category: 'community' },
  ],
  images: [
    { key: 'meditation', type: 'png', size: '96x96', category: 'activity' },
    { key: 'vegetable', type: 'png', size: '96x96', category: 'activity' },
    { key: 'workoutMachine', type: 'png', size: '96x96', category: 'activity' },
    { key: 'lunchTime', type: 'png', size: '96x96', category: 'activity' },
    { key: 'bed', type: 'png', size: '96x96', category: 'activity' },
    { key: 'working', type: 'png', size: '96x96', category: 'activity' },
  ],
} as const;

// Asset loading helper
export type AssetCategory = 'icon' | 'illustration' | 'mood' | 'ui' | 'community' | 'activity';
export type AssetType = 'svg' | 'png';

export interface AssetInfo {
  key: string;
  type: AssetType;
  category: AssetCategory;
  size?: string;
}
