# Icon and Illustration Enhancement Spec

## Feature Name
`mental-health-icons-enhancement`

---

## 1. Requirement Summary

Transform the mental health app from using ugly emoji placeholders to professional icons from the 2000-icon Airaa Design set and meaningful mental illustrations that showcase the app's purpose.

---

## 2. Current State Analysis

### Icons
- **Status:** Using emoji placeholders (🔍🏃🏋️🧘❤️😊😞😢😟🏠⭐👥👤 etc.)
- **Library:** None installed - needs icon library integration
- **Locations:** All screens and navigation

### Mental Illustrations
- **Status:** Available in `assets/mental/` (PNG & SVG) but NOT used
- **Assets:** 27 illustrations (achievement, bad mood, care, journaling, sleep, meditation, etc.)
- **Config:** All set to `null` in `src/config/assets.ts`

---

## 3. Technical Approach

### Icon Solution
- Use `react-native-svg` (already installed) to render SVG icons
- Create custom SVG icon components that load from `assets/airaa-design-2000-icons-set/SVG/`
- Implement lazy loading and caching for performance

### Illustration Solution
- Use the mental illustrations as Hero/Feature images
- Map illustrations to appropriate screens based on meaning
- Replace emoji mood selectors with meaningful illustration icons

### Icon Mapping Strategy
| Category | Purpose | Icon Folder | Suggested Icons |
|----------|---------|-------------|-----------------|
| Navigation | Tab bar icons | Essentional, Grid | home, grid icons |
| Mood | Mood selection | Essentional | heart, smile variants |
| Actions | Buttons, navigation | Arrow | arrow-left, arrow-right |
| Features | Feature cards | Support, Like, Question | support, question, like |
| Social | Community features | Users, Content | user, message icons |
| Settings | Profile & settings | Settings | settings, edit icons |
| Search | Search functionality | Search | magnifying glass |

---

## 4. Implementation Plan

### Phase 1: Icon Infrastructure
1. Create `src/components/common/SvgIcon.tsx` - reusable SVG icon component
2. Create icon mapping registry in `src/config/icons.ts`
3. Update `assets.ts` to properly reference mental illustrations

### Phase 2: Screen-by-Screen Updates

#### HomeScreen.tsx
- Hero illustration: `put together.svg` or `daily balance.svg`
- Feature cards: Use relevant icons from Airaa set
- Mood preview: Use `good mood.svg` / `bad mood.svg`

#### MoodScreen.tsx
- Back button: `arrow-left.svg`
- Mood selector: Replace emoji with mental illustration icons
- Mood icons: `love.svg`, `good mood.svg`, `bad mood.svg`, `feeling low.svg`, `worried.svg`

#### JourneyScreen.tsx
- Hero: `achievement.svg`
- Progress: Checkmark icons from Arrow folder
- Milestones: `medal/achievement` style icons

#### CommunityScreen.tsx
- Search: `search.svg`
- Stats: Heart, message, eye icons
- Action icons: Like, comment, share icons

#### OnboardingScreen.tsx
- Hero: Use contextual mental illustrations
- Progress indicators: Arrow or check icons

#### ProfileScreen.tsx
- Edit: `edit.svg` from Content/Edit folder
- Settings: `settings.svg`
- Language: Globe icon from Essentional
- Help: Question mark from Support

#### TherapistsScreen.tsx
- Back: `arrow-left.svg`
- Rating: Star icon from Essentional

#### ReportsScreen.tsx
- Achievement badge: `achievement.svg`

### Phase 3: Navigation Update
- Tab bar icons: Home, Mood, Journey, Community, Profile
- Use Grid/Essentional folder icons

### Phase 4: MoodSelector Component
- Replace emoji with SVG mood icons from mental illustrations

---

## 5. Affected Files

| File | Type | Change |
|------|------|--------|
| `src/config/assets.ts` | Config | Enable mental illustration imports |
| `src/config/icons.ts` | New | Icon mapping registry |
| `src/components/common/SvgIcon.tsx` | New | Reusable SVG icon component |
| `src/layers/screens/HomeScreen.tsx` | Update | Replace emoji, add illustration |
| `src/layers/screens/MoodScreen.tsx` | Update | Replace back icon, mood selector |
| `src/layers/screens/JourneyScreen.tsx` | Update | Replace icons, add achievement |
| `src/layers/screens/CommunityScreen.tsx` | Update | Replace social icons |
| `src/layers/screens/OnboardingScreen.tsx` | Update | Replace emoji, use illustrations |
| `src/layers/screens/ProfileScreen.tsx` | Update | Replace settings icons |
| `src/layers/screens/TherapistsScreen.tsx` | Update | Replace navigation icons |
| `src/layers/screens/ReportsScreen.tsx` | Update | Replace achievement icon |
| `src/layers/components/MoodSelector.tsx` | Update | Replace emoji with SVG icons |
| `src/navigation.tsx` | Update | Replace tab bar emojis |

---

## 6. Component Design

### SvgIcon Component
```typescript
interface SvgIconProps {
  name: string;        // Icon name from mapping
  size?: number;       // Default: 24
  color?: string;      // Default: currentColor
  category?: string;   // Icon folder category
}
```

### Icon Mapping Registry
```typescript
export const ICON_MAP = {
  // Navigation
  'home': 'essentional/home.svg',
  'mood': 'essentional/smile.svg',
  'journey': 'essentional/star.svg',
  'community': 'essentional/users.svg',
  'profile': 'essentional/user.svg',
  // Actions
  'back': 'arrow/arrow-left.svg',
  'forward': 'arrow/arrow-right.svg',
  'search': 'search/search.svg',
  'menu': 'grid/menu.svg',
  // Mood (mental illustrations)
  'mood-love': 'mental/love.svg', // not in mental, use essential
  'mood-good': 'mental/good mood.svg',
  'mood-bad': 'mental/bad mood.svg',
  'mood-sad': 'mental/feeling low.svg',
  // Social
  'heart': 'essentional/heart.svg',
  'comment': 'essentional/comment.svg',
  'view': 'essentional/eye.svg',
  // Settings
  'edit': 'settings/edit.svg',
  'settings': 'settings/settings.svg',
  'help': 'support, like, question/question.svg',
} as const;
```

---

## 7. Key Design Decisions

1. **SVG over PNG**: Use SVG icons for scalability and smaller bundle size
2. **Mental illustrations for mood**: Use meaningful mental illustrations rather than generic icons
3. **Lazy loading**: Icons load on-demand to maintain performance
4. **Fallback**: Graceful fallback to text if SVG fails to load
5. **Consistent sizing**: 24px default, configurable via props

---

## 8. Expected Outcomes

- App displays professional, cohesive iconography throughout
- Mental illustrations create emotional connection and showcase app purpose
- Consistent visual language across all screens
- Improved user experience with intuitive iconography