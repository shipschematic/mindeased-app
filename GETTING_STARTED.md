# 🚀 Getting Started Checklist

## ✅ Completed (Project Setup)

- [x] Expo project initialized
- [x] TypeScript configured
- [x] Dependencies installed (React Navigation, Zustand, Supabase, etc.)
- [x] Config layer created (theme, screens, assets, navigation, etc.)
- [x] State layer created (Zustand store with persistence)
- [x] Intent layer created (actions and handlers)
- [x] Execute layer created (Supabase integration, business logic)
- [x] UI components library created (Button, Input, Card, Avatar, MoodSelector)
- [x] Main screens created (Home, Login, Mood)
- [x] Navigation setup complete
- [x] Assets downloaded from Figma (SVGs and PNGs)
- [x] Documentation created (README, SUPABASE_SETUP, STYLING_GUIDE, etc.)

## 📋 Next Steps (Your Turn)

### 1. Install Dependencies
```bash
cd mindeased-app
npm install
```

**Expected output:** All packages installed successfully

### 2. Setup Supabase
1. Go to https://supabase.com and create an account
2. Create a new project
3. Go to Project Settings → API
4. Copy these values:
   - Project URL
   - anon/public key

5. Update `src/execute/env.ts`:
```typescript
export const ENV = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
}
```

6. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

7. Run the SQL schema from `SUPABASE_SETUP.md` in Supabase SQL Editor

**Expected output:** Database tables created with RLS policies

### 3. Run the App
```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for Web

**Expected output:** Expo DevTools opens, app loads

### 4. Test Authentication
1. Try to login with test account
2. Create account via signup
3. Test social login (Google, Apple, Facebook)

**Expected output:** Auth works, redirects to home screen

### 5. Test Mood Tracking
1. Navigate to Mood tab
2. Select a mood emoji
3. Add reasons
4. Save mood

**Expected output:** Mood saved to Supabase, visible in UI

## 🎯 Development Workflow

### Adding a New Screen

1. **Add to config** (`src/config/screens.ts`):
```typescript
{
  id: 'my-new-screen',
  name: 'My Screen',
  path: '/my-screen',
  icon: 'icon-name',
  feature: 'myFeature',
}
```

2. **Create screen component** (`src/layers/screens/MyScreen.tsx`):
```typescript
export const MyScreen: React.FC = () => {
  const intents = useIntents();
  const data = useStore(selectMyData);
  
  return (
    <View>
      {/* Render from config */}
    </View>
  );
};
```

3. **Add navigation** (`src/config/navigation.ts`):
```typescript
export const SCREEN_FLOWS = {
  // ...
  'my-new-screen': { from: 'home', to: 'my-new-screen' },
};
```

4. **Add to navigation** (`src/navigation.tsx`):
```typescript
<Stack.Screen name="MyNewScreen" component={MyScreen} />
```

### Adding a New Feature

1. **Add feature flag** (`src/config/features.ts`):
```typescript
export const FEATURES = {
  // ...
  myNewFeature: {
    enabled: true,
    config: { /* feature config */ },
  },
};
```

2. **Add state** (`src/state/types.ts`):
```typescript
export interface AppState {
  // ...
  myFeatureData: MyType;
}
```

3. **Add intent** (`src/intents/actions.ts`):
```typescript
export const createIntents = () => ({
  // ...
  myFeature: {
    doSomething: (data: string) => ({ type: 'MY_FEATURE_ACTION', payload: data }),
  },
});
```

4. **Add execute logic** (`src/execute/supabase.ts`):
```typescript
export const myFeatureService = {
  async getData(): Promise<ApiResponse<MyType>> {
    // Supabase logic
  },
};
```

5. **Build UI** (`src/layers/`):
```typescript
// Dumb component that references config
```

## 📝 Common Tasks

### Update Colors
Edit `src/config/theme.ts` → All components update automatically

### Add New Icon
1. Download to `assets/icons/`
2. Add to `src/config/assets.ts`
3. Use in components

### Change Typography
Edit `src/config/theme.ts` → `typography` object

### Add New Button Variant
Edit `src/config/components.ts` → `BUTTON_CONFIG.variants`

### Modify Screen Layout
Edit screen component in `src/layers/screens/`

## 🐛 Troubleshooting

### "Cannot find module"
```bash
npm install
```

### "Supabase client not initialized"
Check `src/execute/env.ts` has valid credentials

### "Navigation not working"
Check screen is registered in both `screens.ts` and `navigation.tsx`

### "Styles not applying"
Ensure using theme tokens, not hardcoded values

### "Assets not loading"
Check asset paths in `src/config/assets.ts`

## 📚 Documentation Reference

- **Architecture**: `README.md`
- **Database Setup**: `SUPABASE_SETUP.md`
- **Styling Guide**: `STYLING_GUIDE.md`
- **Project Summary**: `PROJECT_SUMMARY.md`
- **Environment**: `.env.example`

## 🎨 Design Resources

- **Figma Design**: https://www.figma.com/design/3vdBkHkWOeNChQiKYexI62
- **Design Tokens**: `src/config/theme.ts`
- **Components**: `src/config/components.ts`
- **Assets**: `assets/` folder

## 🔧 Development Tools

### Recommended Extensions
- ESLint
- Prettier
- TypeScript
- React Native Tools
- Expo Tools

### Useful Commands
```bash
npm run lint          # Check code quality
npm run typecheck     # Type check
npm start --clear     # Clear cache and restart
npx expo doctor       # Check project health
```

## 🎯 Success Criteria

- ✅ App starts without errors
- ✅ Navigation works between screens
- ✅ Authentication with Supabase works
- ✅ Mood tracking saves to database
- ✅ UI matches Figma design
- ✅ All components are config-driven
- ✅ No hardcoded values in UI
- ✅ Type safety throughout

## 🚀 You're Ready!

The foundation is complete. Follow the checklist above to:
1. Install dependencies
2. Setup Supabase
3. Run the app
4. Start building features!

Remember: **Config → State → Intent → Execute → Layers**
