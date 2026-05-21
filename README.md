# Mental Health App - Config-Driven Architecture

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
mental-health-app/
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
- Supabase account

### Installation

```bash
cd mental-health-app
npm install
```

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
- ✅ Authentication (Email/Password, Social)
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
