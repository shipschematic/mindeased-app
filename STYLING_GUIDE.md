# 🎨 Styling & Asset Strategy

## Asset Extraction from Figma

### Downloaded Assets

All assets have been extracted from Figma using the MCP API and organized into:

```
assets/
├── illustrations/        # SVG icons and illustrations
│   ├── exercise-icon.svg
│   ├── habit-icon.svg
│   ├── challenge-icon.svg
│   ├── journey-icon.svg
│   ├── weekly-icon.svg
│   ├── achievement-icon.svg
│   ├── pushup-illustration.svg
│   └── exercise-illustration.svg
│
├── icons/               # UI icons
│   ├── mood-love.svg
│   ├── mood-good.svg
│   ├── mood-depress.svg
│   ├── mood-sad.svg
│   ├── mood-worried.svg
│   ├── avatar.svg
│   ├── channel-icon.svg
│   └── post-icon.svg
│
└── images/              # PNG images
    ├── meditation-1.png (96x96)
    ├── vegetable.png (96x96)
    ├── workout-machine.png (96x96)
    ├── lunch-time.png (96x96)
    ├── bed.png (96x96)
    └── working.png (96x96)
```

## Asset Registry System

Assets are registered in `src/config/assets.ts` as a single source of truth:

```typescript
export const assets = {
  illustrations: {
    exercise: require('@/assets/illustrations/exercise-icon.svg'),
    // ...
  },
  icons: {
    mood: {
      love: require('@/assets/icons/mood-love.svg'),
      // ...
    },
  },
  images: {
    meditation: require('@/assets/images/meditation-1.png'),
    // ...
  },
};
```

### Asset Metadata

Each asset has metadata for lazy loading and optimization:

```typescript
export const assetRegistry = {
  illustrations: [
    { key: 'exercise', type: 'svg', category: 'icon' },
    // ...
  ],
};
```

## Styling Approach

### 1. Theme Configuration (Single Source of Truth)

All design tokens defined in `src/config/theme.ts`:

```typescript
export const colors = {
  main: {
    primary: '#5B8DEF',
    secondary: '#F5A623',
    tertiary: '#7ED321',
    dark: '#1A1A1A',
    light: '#FFFFFF',
  },
  mood: {
    love: '#FF6B6B',
    good: '#5B8DEF',
    depress: '#9B9B9B',
    sad: '#4A90E2',
    worried: '#F5A623',
  },
};

export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    // ...
  },
};

export const spacing = {
  xs: 4,   // Base unit: 4px
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  // ...
};
```

### 2. Component Configuration

Components styled via config in `src/config/components.ts`:

```typescript
export const BUTTON_CONFIG = {
  variants: {
    primary: {
      backgroundColor: colors.main.primary,
      textColor: colors.main.light,
      borderColor: 'transparent',
      shadow: shadows.md,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: colors.main.primary,
      borderColor: colors.main.primary,
      shadow: shadows.none,
    },
  },
  sizes: {
    small: {
      height: 36,
      paddingHorizontal: spacing.md,
      fontSize: typography.fontSize.sm,
      borderRadius: borderRadius.md,
    },
    medium: {
      height: 48,
      paddingHorizontal: spacing.lg,
      fontSize: typography.fontSize.base,
      borderRadius: borderRadius.lg,
    },
  },
};
```

### 3. Dumb Components

Components reference config, no hardcoded values:

```typescript
// Button.tsx
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  label,
  onPress,
}) => {
  const variantConfig = BUTTON_CONFIG.variants[variant];
  const sizeConfig = BUTTON_CONFIG.sizes[size];

  const buttonStyle: ViewStyle = {
    backgroundColor: variantConfig.backgroundColor,
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    borderRadius: sizeConfig.borderRadius,
    ...variantConfig.shadow,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={{ color: variantConfig.textColor }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
```

### 4. Screen-Level Styling

Screens use theme tokens directly:

```typescript
// HomeScreen.tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary['20%'],
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing['3xl'],
    backgroundColor: colors.main.primary,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.main.light,
  },
});
```

## Design Token Mapping from Figma

### Colors

| Figma Name | Value | Usage |
|------------|-------|-------|
| Main/Primary | #5B8DEF | Primary actions, links |
| Main/Secondary | #F5A623 | Secondary actions, highlights |
| Main/Tertiary | #7ED321 | Success, positive states |
| Main/Dark | #1A1A1A | Text, headings |
| Main/Light | #FFFFFF | Backgrounds, text on dark |
| Tertiary/20% | #F5F7FA | Light backgrounds |
| Tertiary/40% | #E8ECF1 | Borders, dividers |
| Tertiary/60% | #D0D7E0 | Placeholder text |

### Typography

| Figma Style | Font Size | Weight | Line Height |
|-------------|-----------|--------|-------------|
| H1 | 28px | Bold (700) | 1.2 |
| H2 | 24px | SemiBold (600) | 1.2 |
| H3 | 20px | Medium (500) | 1.3 |
| Body | 16px | Regular (400) | 1.4 |
| Caption | 12px | Regular (400) | 1.4 |
| Button | 16px | SemiBold (600) | 1.2 |

### Spacing Scale

Based on 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Small gaps, icon spacing |
| sm | 8px | Tight spacing |
| md | 12px | Component padding |
| lg | 16px | Section padding |
| xl | 20px | Large gaps |
| 2xl | 24px | Section margins |
| 3xl | 32px | Page margins |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Small buttons, inputs |
| md | 8px | Cards, chips |
| lg | 12px | Buttons, modals |
| xl | 16px | Large cards |
| 2xl | 20px | Screens |
| full | 9999px | Circular (avatars, pills) |

## Using Assets in Components

### SVG Icons

```typescript
import { assets } from '@/config/assets';

// In component
<Image source={assets.icons.mood.love} style={styles.icon} />
```

### PNG Images

```typescript
import { assets } from '@/config/assets';

// In component
<Image 
  source={assets.images.meditation} 
  style={styles.image}
  resizeMode="cover"
/>
```

### Dynamic Asset Loading

```typescript
import { assetRegistry } from '@/config/assets';

// Get asset info
const assetInfo = assetRegistry.illustrations.find(
  (a) => a.key === 'exercise'
);

// Load based on category
const moodIcons = assetRegistry.icons
  .filter((a) => a.category === 'mood')
  .map((a) => assets.icons.mood[a.key as keyof typeof assets.icons.mood]);
```

## Best Practices

### ✅ DO:
- Use theme tokens for all colors, spacing, typography
- Reference config for component styles
- Import assets from config/assets
- Use semantic names (primary, secondary) not values
- Keep components dumb (no logic, just render)

### ❌ DON'T:
- Hardcode color values (#5B8DEF)
- Use magic numbers (padding: 16)
- Import assets directly from file system
- Create shadow state in components
- Add business logic to UI components

## Example: Complete Component

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/config/theme';
import { CARD_CONFIG } from '@/config/components';
import { assets } from '@/config/assets';

export const MoodCard: React.FC<{ mood: string }> = ({ mood }) => {
  const config = CARD_CONFIG.variants.default;
  const moodColor = colors.mood[mood as keyof typeof colors.mood];
  const moodIcon = assets.icons.mood[mood as keyof typeof assets.icons.mood];

  return (
    <View style={[
      styles.card,
      { 
        backgroundColor: config.backgroundColor,
        borderRadius: config.borderRadius,
        padding: spacing.lg,
      }
    ]}>
      <Image source={moodIcon} style={styles.icon} />
      <Text style={styles.text}>{mood}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: spacing.md,
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.main.dark,
  },
});
```

## Future Enhancements

### Planned:
1. **Dark Mode**: Add dark theme to `theme.ts`
2. **Custom Fonts**: Add Inter font files to assets
3. **Lottie Animations**: Add JSON animations for success states
4. **Icon Font**: Create custom icon font from SVGs
5. **Asset Optimization**: Compress PNGs, optimize SVGs

### Optional:
- NativeWind (Tailwind for RN)
- Styled Components
- Restyle (Shopify's type-safe styling)

## Resources

- Figma Design: [Design Monks - Mental Health UI](https://www.figma.com/design/3vdBkHkWOeNChQiKYexI62)
- Theme Config: `src/config/theme.ts`
- Component Config: `src/config/components.ts`
- Asset Registry: `src/config/assets.ts`
