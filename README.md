# Mindeased - Config-Driven Architecture

## 📐 Architecture Overview

This app follows a strict **Config → State → Intent → Execute** pipeline with layers as "dumb" shells.

```
┌─────────────────────────────────────────┐
│           CONFIG LAYER                   │
│  (Single Source of Truth)                │
│  • theme.ts      - Colors, typography    │
│  • screens.ts    - Screen definitions    │
│  • navigation.ts - Navigation flows      │
│  • assets.ts     - Asset registry        │
│  • features.ts   - Feature flags         │
│  • content.ts    - Text content          │
│  • components.ts - Component config      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│            STATE LAYER                   │
│  (Minimal References - Derived Values)   │
│  • store.ts      - Zustand store         │
│  • types.ts      - Type definitions      │
│  NO SHADOW STATES                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│           INTENT LAYER                   │
│  (UI Expresses Intent)                   │
│  • actions.ts    - Action creators       │
│  • handlers.ts   - Event handlers        │
│  NO DIRECT STATE MUTATION               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│          EXECUTE LAYER                   │
│  (All Logic & Traceability)              │
│  • supabase.ts   - Database & Auth       │
│  • logic.ts      - Business rules        │
│  • env.ts        - Configuration         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│           LAYERS (UI)                    │
│  (Dumb Components)                       │
│  • components/  - Reusable UI            │
│  • screens/     - Screen components      │
│  RENDER ONLY - NO LOGIC                 │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
mindeased-app/
├── src/
│   ├── config/                    # 🔑 SINGLE SOURCE OF TRUTH
│   │   ├── theme.ts              # Colors, typography, spacing
│   │   ├── screens.ts            # Screen definitions (array)
│   │   ├── navigation.ts         # Navigation flows
│   │   ├── assets.ts             # Asset registry
│   │   ├── features.ts           # Feature flags
│   │   ├── content.ts            # Text content
│   │   └── components.ts         # Component configuration
│   │
│   ├── state/                     # 📦 MINIMAL REFERENCES
│   │   ├── store.ts              # Zustand store
│   │   └── types.ts              # TypeScript types
│   │
│   ├── intents/                   # 🎯 ACTION DISPATCHERS
│   │   ├── actions.ts            # Action creators
│   │   └── handlers.ts           # Event handlers
│   │
│   ├── execute/                   # ⚙️ BUSINESS LOGIC
│   │   ├── supabase.ts           # Supabase client
│   │   ├── logic.ts              # Business rules
│   │   └── env.ts                # Environment config
│   │
│   ├── layers/                    # 🎨 DUMB UI COMPONENTS
│   │   ├── components/           # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   └── MoodSelector.tsx
│   │   └── screens/              # Screen components
│   │       ├── HomeScreen.tsx
│   │       ├── LoginScreen.tsx
│   │       └── MoodScreen.tsx
│   │
│   ├── app.tsx                    # App entry
│   ├── navigation.tsx             # Navigation setup
│   └── styles.ts                  # Global styles
│
├── assets/                        # Images, fonts, icons
│   ├── illustrations/
│   ├── icons/
│   └── images/
│
├── App.tsx                        # Expo entry point
├── app.json                       # Expo config
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
└── SUPABASE_SETUP.md             # Database setup
```

## 🎯 Key Principles

### 1. Configuration-Driven
- All logic defined in config arrays/objects
- Layers are "dumb" shells that render based on config
- New features added to config, not code duplication

### 2. Single Source of Truth
- Data lives in exactly one canonical location
- Store minimal IDs/references
- Derive all values during render/calculation
- No shadow states

### 3. Execution Pipeline
- **Config** → Defines what exists
- **State** → Holds minimal data
- **Intent** → UI expresses what it wants
- **Execute** → All logic happens here

### 4. Dumb Layers
- Components receive props, render UI
- No business logic in UI
- No direct state mutation
- All changes through intents

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Firebase project (`mindeased`)
- Supabase account

### Installation

```bash
git clone https://github.com/shipblueprint/mindeased-app.git
cd mindeased-app
npm install
```

### Setup Firebase

Firebase project: `mindeased`

| Platform | Firebase app | ID |
| --- | --- | --- |
| Web | `mindeased-web` | `1:521906147554:web:4a7c5e1cf2df088ff1cebb` |
| Android | `Mindeased` (`com.mindeased.app`) | `1:521906147554:android:54782bbfbb3557ddf1cebb` |
| iOS | `Mindeased` (`com.mindeased.app`) | `1:521906147554:ios:b4a1d056c52a99cbf1cebb` |

1. Web config lives in `.env` (see `.env.example`)
2. Native config lives in `google-services.json` and `GoogleService-Info.plist`
3. Google sign-in provider is enabled; add every hosting and OAuth domain under Authentication → Settings → Authorized domains
4. Native Google sign-in uses `@react-native-google-signin/google-signin`:
   - Android OAuth client: `521906147554-7otttf35bugdcgg1aad9d3q30nqtaotp.apps.googleusercontent.com`
   - iOS OAuth client: `521906147554-msr1f4vl7cdjktv25c1akg2djddnva3s.apps.googleusercontent.com`
   - Web OAuth client (`webClientId`): `521906147554-kpusmu6v2n11u9qv30qchg0sqj68mtul.apps.googleusercontent.com`
5. Register every signing certificate SHA-1/SHA-256 in Firebase (Android app → SHA certificate fingerprints), otherwise Android sign-in fails with `DEVELOPER_ERROR`. The debug keystore is already registered; add the EAS release keystore hash before shipping.
6. Auth sessions persist with AsyncStorage on native and localStorage on web. App data buckets persist the same way.

### Web Deploy

```bash
npm run build:web
firebase deploy --only hosting:app
```

Live site: https://mindeased-app.web.app

### Android APK (direct download)

```bash
eas build --profile preview --platform android
```

The build page provides an installable APK. Share that link directly; no Play Store account needed. Users must allow installs from unknown sources on first install.

Register the release keystore SHA-1/SHA-256 in Firebase (Android app → SHA certificate fingerprints) after the first build, or Google sign-in fails with `DEVELOPER_ERROR`. Find it with:

```bash
eas credentials --platform android
```

### GitHub Actions Release

`.github/workflows/release.yml` builds Android, iOS, and web.

Triggers:
- Manual: Actions → Release → Run workflow (choose `all`, `android`, `ios`, or `web`).
- Tag push: `git tag v1.0.0 && git push origin v1.0.0`.

Required repository secrets:
- `EXPO_TOKEN` — create at https://expo.dev/settings/access-tokens
- `FIREBASE_SERVICE_ACCOUNT_MINDEASED` — Firebase console → Project settings → Service accounts → Generate new private key. Grant Firebase Hosting Admin.

iOS is skipped until Apple credentials exist. To enable it:
1. Enroll in the Apple Developer Program.
2. Run `eas credentials --platform ios` once and let EAS create the certificate and provisioning profile.
3. Add repository variable `ENABLE_IOS_BUILD` with value `true` (Settings → Secrets and variables → Actions → Variables).

Without Apple credentials the iOS job fails by design; it is gated so Android and web keep releasing.

### Setup Supabase

1. Create Supabase project
2. Run SQL from `SUPABASE_SETUP.md`
3. Update `src/execute/env.ts` with your credentials

### Run the App

```bash
npm start
```

Press `i` for iOS simulator or `a` for Android emulator.

## 📱 Features

### Implemented
- ✅ Config-driven architecture
- ✅ Theme system from Figma
- ✅ Asset registry
- ✅ Screen configuration
- ✅ Zustand state management
- ✅ Intent dispatcher pattern
- ✅ Supabase integration
- ✅ Authentication (Email/Password, Google via Firebase on web, Android, and iOS)
- ✅ Mood tracking
- ✅ Home screen with quick actions
- ✅ Login/Signup screens

### To Implement
- [ ] Onboarding flow
- [ ] Challenges system
- [ ] Journal entries
- [ ] Community features
- [ ] Therapist booking
- [ ] Rescue sessions
- [ ] Profile & settings
- [ ] Journey tracking

## 🎨 Design System

Colors, typography, and components extracted from Figma design:

- **Primary Color**: #5B8DEF (Blue)
- **Secondary Color**: #F5A623 (Orange)
- **Tertiary Color**: #7ED321 (Green)
- **Mood Colors**: Love, Good, Depress, Sad, Worried
- **Typography**: Inter font family
- **Spacing**: 4px base unit
- **Border Radius**: 4px increments

## 📊 State Management

Using Zustand for state management with persistence:

```typescript
// Selectors (derived values)
const currentMood = useStore(selectCurrentMood);
const streak = useStore(selectStreak);
const tasksCompleted = useStore(selectTasksCompleted);

// Actions through intents
intents.mood.logMood({ mood: 'good', reasons: [] });
intents.navigation.navigateTo('challenges');
```

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Authentication via Supabase Auth
- Secure token storage with AsyncStorage
- Environment variables for sensitive data

## 📝 Code Style

- TypeScript for type safety
- ESLint for code quality
- No comments unless necessary
- Consistent naming conventions
- Functional components with hooks

## 🤝 Contributing

1. Add new features to config first
2. Create intents for user actions
3. Implement execute logic
4. Build dumb UI components
5. Test with selectors

## 📄 License

MIT
