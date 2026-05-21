# Mental Health App - Icon & Illustration Enhancement Tasks

## Task 1: Create SVG Icon Infrastructure
- [x] 1.1: Create `src/config/icons.ts` with icon mapping registry
- [x] 1.2: Create `src/components/common/SvgIcon.tsx` reusable component (inline SVG paths for reliability)
- [x] 1.3: Update `src/config/assets.ts` to enable mental illustrations

## Task 2: Update Navigation Icons
- [x] 2.1: Update `App.tsx` tab bar icons (Home, Mood, Community, Profile)
- [x] 2.2: Fixed tab bar with proper platform-specific padding (iOS/Android)
- [x] 2.3: Fixed SafeAreaView wrapper to prevent footer overlap

## Task 3: Update HomeScreen
- [x] 3.1: Replace emoji constants with SvgIcon components
- [x] 3.2: Add mental illustration placeholders
- [x] 3.3: Update feature card icons

## Task 4: Update MoodScreen
- [x] 4.1: Replace back arrow with SvgIcon
- [x] 4.2: Replace mood selector with mental illustrations

## Task 5: Update JourneyScreen
- [x] 5.1: Replace back arrow with SvgIcon
- [x] 5.2: Replace checkmark with SvgIcon

## Task 6: Update CommunityScreen
- [x] 6.1: Replace search icon with SvgIcon
- [x] 6.2: Replace stat icons (heart, comment, eye)
- [x] 6.3: Update add channel and menu icons

## Task 7: Update OnboardingScreen
- [x] 7.1: Replace brain emoji with SvgIcon (thoughts)
- [x] 7.2: Replace arrow with SvgIcon (forwardArrow)
- [x] 7.3: Fixed SafeAreaView padding for Android

## Task 8: Update ProfileScreen
- [x] 8.1: Replace edit, settings, globe, question icons with SvgIcon
- [x] 8.2: Replace arrow with forwardArrow icon

## Task 9: Update TherapistsScreen
- [x] 9.1: Replace back arrow and star rating icons

## Task 10: Update ReportsScreen
- [x] 10.1: Replace achievement emoji with SvgIcon

## Task 11: Update MoodSelector Component
- [x] 11.1: Replace mood emojis with mental illustration SvgIcons

## Key Fixes Applied
- OnboardingScreen: Fixed SafeAreaView with platform-specific padding (Android top padding, bottom margin for button)
- App.tsx: Fixed tabBar padding for iOS (28px bottom) vs Android (12px bottom)
- SvgIcon: Implemented inline SVG paths to avoid file import issues