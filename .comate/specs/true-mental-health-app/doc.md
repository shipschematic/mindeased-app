# Mental Health App - True Therapeutic Architecture

## 1. Requirement Analysis & Vision

**Core Purpose:** Transform from "habit tracker with mental health skins" into a TRUE mental health companion that guides users through emotional understanding, processing, and growth - following therapist-designed workflows.

**Figma-Driven Feature Set (from screenshots):**
- Personal Quiz (5 screens) - Initial assessment for personalized experience
- Mood Tracking with "Reason of Mood" flow (3 screens) - Understand WHY feelings happen
- Guided Journals (4 screens) - CBT-based prompts for emotional processing
- Journey Map with multiple task types (Audio, Thought sharing, Multi-step, Single task)
- Rescue Sessions - Crisis intervention with breathing/grounding exercises
- Community with context-aware sharing

**Key Differentiators from Habit Trackers:**
1. Every mood selection triggers understanding, not just logging
2. Illustrations appear contextually based on mood/action
3. Journey ≠ Challenge (completly different experiences)
4. Rescue Session is life-saving feature, not a "nice to have"
5. Guided Journals provide therapeutic value, not just prompts

---

## 2. Architecture: Config-Driven Mental Health Engine

### 2.1 Mood Workflow Config

```typescript
// src/config/mood-workflows.ts

export const MOOD_WORKFLOWS = {
  love: {
    illustration: 'good mood',
    illustrationPng: '@/assets/mental/PNG/good mood.png',
    primaryEmotion: 'love',
    nextActions: [
      { type: 'journal', label: 'What made you feel loved today?' },
      { type: 'share', label: 'Share with community' },
      { type: 'gratitude', label: 'List 3 things you love about yourself' }
    ],
    affirmations: [
      'You deserve love, especially your own',
      'Today you chose to prioritize yourself'
    ],
    rescueLevel: 0
  },
  good: {
    illustration: 'good mood',
    illustrationPng: '@/assets/mental/PNG/good mood.png',
    primaryEmotion: 'good',
    nextActions: [
      { type: 'journal', label: 'What contributed to your good mood?' },
      { type: 'celebrate', label: 'Share your win' },
      { type: 'momentum', label: 'Build on this - what\'s one small step forward?' }
    ],
    affirmations: [
      'Good feelings are meant to be enjoyed',
      'You\'re building momentum toward lasting wellbeing'
    ],
    rescueLevel: 0
  },
  depress: {
    illustration: 'bad mood',
    illustrationPng: '@/assets/mental/PNG/bad mood.png',
    primaryEmotion: 'depressed',
    nextActions: [
      { type: 'reason-of-mood', label: 'What might be causing this?' },
      { type: 'mini-task', label: 'One tiny step - just one' },
      { type: 'rescue', label: 'Need support right now?' }
    ],
    affirmations: [
      'This feeling won\'t last forever',
      'It\'s okay to not be okay right now'
    ],
    rescueLevel: 2,
    requiresReason: true
  },
  sad: {
    illustration: 'bad mood',
    illustrationPng: '@/assets/mental/PNG/bad mood.png',
    primaryEmotion: 'sad',
    nextActions: [
      { type: 'reason-of-mood', label: 'What happened?' },
      { type: 'grieve', label: 'Allow yourself to feel' },
      { type: 'rescue', label: 'Need someone to talk to?' }
    ],
    affirmations: [
      'Sadness is human - you don\'t have to hide it',
      'Feeling sad doesn\'t mean something is wrong with you'
    ],
    rescueLevel: 2,
    requiresReason: true
  },
  worried: {
    illustration: 'bad mood',
    illustrationPng: '@/assets/mental/PNG/bad mood.png',
    primaryEmotion: 'worried',
    nextActions: [
      { type: 'reason-of-mood', label: 'What are you worried about?' },
      { type: 'challenge', label: 'Break down the worry' },
      { type: 'breathing', label: 'Take a calming breath' }
    ],
    affirmations: [
      'Worries are often bigger in our minds than reality',
      'You\'ve handled hard things before'
    ],
    rescueLevel: 1,
    requiresReason: true
  }
} as const;
```

### 2.2 Journey Task Types Config

```typescript
// src/config/journey-types.ts

export const JOURNEY_TYPES = {
  morningRoutine: {
    id: 'morningRoutine',
    title: 'Morning Routine',
    illustration: 'sunrise',
    color: '#FFB347',
    timeRange: { start: 6, end: 12 },
    tasks: [
      { type: 'hydration', label: 'Drink a glass of water', icon: 'water' },
      { type: 'movement', label: '5-minute stretch or walk', icon: 'movement' },
      { type: 'intention', label: 'Set one intention for today', icon: 'target' }
    ]
  },
  thoughtSharing: {
    id: 'thoughtSharing',
    title: 'Thought Sharing',
    illustration: 'thoughts',
    illustrationPng: '@/assets/mental/PNG/thoughts.png',
    type: 'therapeutic',
    prompt: 'What\'s on your mind right now?',
    placeholder: 'Write freely - this is just for you...',
    allowsVoice: true,
    allowsAttachment: false
  },
  guidedJournal: {
    id: 'guidedJournal',
    title: 'Guided Journal',
    illustration: 'journaling',
    illustrationPng: '@/assets/mental/PNG/journaling.png',
    type: 'cbt',
    prompts: [
      'What happened that made you feel this way?',
      'How did that make your body feel?',
      'What thoughts came with these feelings?',
      'If a friend felt this way, what would you tell them?',
      'What\'s one small thing that might help?'
    ]
  },
  breathingExercise: {
    id: 'breathingExercise',
    title: 'Breathing Exercise',
    illustration: 'warm drink',
    illustrationPng: '@/assets/mental/PNG/warm drink.png',
    type: 'calm',
    duration: 120, // seconds
    pattern: {
      inhale: 4,
      hold: 4,
      exhale: 6,
      holdAfterExhale: 2
    },
    guided: true
  },
  rescueSession: {
    id: 'rescueSession',
    title: 'Rescue Session',
    illustration: 'online support',
    illustrationPng: '@/assets/mental/PNG/online support.png',
    type: 'crisis',
    isEmergency: true,
    exercises: [
      { id: 'grounding', title: '5-4-3-2-1 Grounding', description: 'Notice 5 things you see, 4 you hear...' },
      { id: 'breathing', title: 'Calming Breath', description: '4-7-8 breathing technique' },
      { id: 'selfCompassion', title: 'Self-Compassion Break', description: 'Acknowledge pain, remember you\'re not alone...' },
      { id: 'reachingOut', title: 'Reach Out', description: 'Contact a support person or crisis line' }
    ]
  },
  moodReflection: {
    id: 'moodReflection',
    title: 'Mood Reflection',
    illustration: 'feelings',
    illustrationPng: '@/assets/mental/PNG/feeling low.png',
    type: 'insight',
    prompt: 'Looking at your mood history, what patterns do you notice?',
    showHistory: true
  }
} as const;
```

### 2.3 Challenge Config (Different from Journey!)

```typescript
// src/config/challenge-types.ts

export const CHALLENGE_TYPES = {
  sevenDayHabit: {
    id: 'sevenDayHabit',
    title: '7-Day Habit Builder',
    duration: 7,
    category: 'habit',
    milestones: [
      { day: 1, reward: 'Habit Starter', illustration: 'achievement' },
      { day: 4, reward: 'Halfway Hero', illustration: 'achievement' },
      { day: 7, reward: 'Habit Master', illustration: 'trophy' }
    ],
    completionsRequired: 7
  },
  moodMastery: {
    id: 'moodMastery',
    title: 'Mood Mastery',
    duration: 14,
    category: 'awareness',
    goal: 'Log mood and reason daily',
    illustration: 'mood range'
  },
  communitySupport: {
    id: 'communitySupport',
    title: 'Community Champion',
    duration: 7,
    category: 'social',
    goal: 'Share and support 3 community posts',
    illustration: 'support'
  },
  weeklyReflection: {
    id: 'weeklyReflection',
    title: 'Weekly Reflection',
    duration: 7,
    category: 'insight',
    goal: 'Complete guided journal 3 times',
    illustration: 'put together'
  }
} as const;
```

### 2.4 Personal Quiz Config

```typescript
// src/config/quiz-questions.ts

export const QUIZ_CONFIG = {
  screens: [
    {
      id: 'currentState',
      question: 'How are you feeling right now?',
      type: 'mood',
      illustration: 'asking about feelings',
      isRequired: true
    },
    {
      id: 'mainConcern',
      question: 'What brings you here today?',
      type: 'multiSelect',
      options: [
        'Managing anxiety or worry',
        'Feeling sad or down',
        'Stress from work or life',
        'Sleep problems',
        'Building healthier habits',
        'Improving relationships',
        'Just exploring'
      ],
      maxSelect: 3
    },
    {
      id: 'duration',
      question: 'How long have you been feeling this way?',
      type: 'singleSelect',
      options: [
        'Just today',
        'A few days',
        'About a week',
        'A few weeks',
        'A month or longer',
        'This is a ongoing challenge'
      ]
    },
    {
      id: 'previousHelp',
      question: 'Have you tried any of these before?',
      type: 'multiSelect',
      options: [
        'Meditation or mindfulness',
        'Talking to friends or family',
        'Therapy or counseling',
        'Medication',
        'Journaling',
        'Exercise or physical activity',
        'This is my first time seeking support'
      ],
      maxSelect: 5
    },
    {
      id: 'goals',
      question: 'What would feeling better look like for you?',
      type: 'text',
      placeholder: 'Describe your ideal state of wellbeing...',
      illustration: 'put together'
    }
  ],
  resultsMapping: {
    mildAnxiety: { primaryChallenge: 'anxiety', recommendedFeatures: ['breathing', 'journaling'] },
    moderateDepression: { primaryChallenge: 'depression', recommendedFeatures: ['rescue', 'community'] },
    stressRelated: { primaryChallenge: 'stress', recommendedFeatures: ['breathing', 'habits'] },
    exploratory: { primaryChallenge: 'general', recommendedFeatures: ['journey', 'community'] }
  }
} as const;
```

---

## 3. Screen Specifications

### 3.1 New Screens to Create

| Screen | File | Purpose | Illustration |
|--------|------|---------|--------------|
| QuizScreen | `src/layers/screens/QuizScreen.tsx` | Initial assessment | asking about feelings |
| ReasonOfMoodScreen | `src/layers/screens/ReasonOfMoodScreen.tsx` | "Why do you feel this way?" | feelings |
| GuidedJournalScreen | `src/layers/screens/GuidedJournalScreen.tsx` | CBT journaling | journaling |
| BreathingExerciseScreen | `src/layers/screens/BreathingExerciseScreen.tsx` | Calming exercise | warm drink |
| RescueSessionScreen | `src/layers/screens/RescueSessionScreen.tsx` | Crisis support | online support |
| ChallengeDetailScreen | `src/layers/screens/ChallengeDetailScreen.tsx` | Challenge progress | challenge-specific |
| SetGoalScreen | `src/layers/screens/SetGoalScreen.tsx` | Personal goal setting | goal |
| ReminderScreen | `src/layers/screens/ReminderScreen.tsx` | Notification settings | reminder |

### 3.2 Screens to Differentiate

**Journey Screen** (`JourneyScreen.tsx`):
- Shows: Morning/Afternoon/Night task sections
- Has: Progress circle, completed tasks
- Illustration: Journey-specific (not challenge)

**Challenge Screen** (`ChallengeScreen.tsx` - NEW):
- Shows: Challenge cards with duration, milestones
- Has: Progress bar, reward unlocks
- Illustration: Challenge-specific

---

## 4. Data Flow

### 4.1 Mood Selection Flow

```
User selects mood
    ↓
Get MOOD_WORKFLOWS[mood]
    ↓
Show illustration from assets
    ↓
If requiresReason:
    → Navigate to ReasonOfMoodScreen
    → User selects/inputs reason
    → Save reason with mood entry
Else:
    → Show nextActions list
    → User can skip to Home or start activity
    ↓
Save to moodHistory with:
  - mood type
  - timestamp
  - reason (if provided)
  - workflow used
```

### 4.2 Journey Flow

```
User clicks "Start Journey" (NOT Challenge!)
    ↓
Show JourneyScreen with:
  - Morning/Afternoon/Night sections
  - Each task has type from JOURNEY_TYPES
  - Illustrations contextual
    ↓
Task types:
  - Single task → Complete and check off
  - Guided Journal → Opens GuidedJournalScreen
  - Breathing → Opens BreathingExerciseScreen
  - Thought sharing → Opens text/voice input
    ↓
Progress updates in real-time
```

---

## 5. File Structure Changes

```
src/
├── config/
│   ├── mood-workflows.ts      (NEW)
│   ├── journey-types.ts       (NEW)
│   ├── challenge-types.ts      (NEW)
│   ├── quiz-questions.ts       (NEW)
│   ├── content.ts             (UPDATE)
│   └── assets.ts              (UPDATE - link illustrations)
├── state/
│   ├── store.ts               (UPDATE - add new state)
│   └── types.ts              (UPDATE - add new types)
├── layers/
│   └── screens/
│       ├── HomeScreen.tsx     (UPDATE - better journey/challenge nav)
│       ├── MoodScreen.tsx     (UPDATE - use workflows)
│       ├── JourneyScreen.tsx   (RENAME from current)
│       ├── ChallengeScreen.tsx (NEW - different from journey)
│       ├── QuizScreen.tsx      (NEW)
│       ├── ReasonOfMoodScreen.tsx (NEW)
│       ├── GuidedJournalScreen.tsx (NEW)
│       ├── BreathingExerciseScreen.tsx (NEW)
│       └── RescueSessionScreen.tsx (NEW)
```

---

## 6. Implementation Notes

### 6.1 Illustration Usage Pattern

```typescript
// Always load PNG for illustrations (they're designed for this)
import { Image } from 'react-native';

// Mood workflow illustration
<Image 
  source={require(MOOD_WORKFLOWS[mood].illustrationPng)}
  style={styles.illustration}
/>

// Journey task illustrations
<Image 
  source={require(JOURNEY_TYPES[task.type].illustrationPng)}
  style={styles.taskIcon}
/>
```

### 6.2 State Additions

```typescript
// New state interfaces needed
interface QuizState {
  quizCompleted: boolean;
  quizResponses: Record<string, any>;
  recommendedFeatures: string[];
}

interface JourneyEntry {
  id: string;
  type: string;
  mood: MoodType;
  content?: string;
  voiceUrl?: string;
  completedAt?: number;
}

interface RescueSession {
  startedAt: number;
  exercisesCompleted: string[];
  currentExercise: string | null;
}
```

### 6.3 Android Navigation Fix

Already addressed in App.tsx with:
- `paddingBottom: 24` for Android
- `marginBottom: 4` for system nav bar

---

## 7. Success Criteria

1. **Mood → Understanding**: Selecting any mood (except "good") prompts "Why do you feel this?"
2. **Journey ≠ Challenge**: Two distinct screens with different purposes and illustrations
3. **Rescue Available**: Crisis support accessible from any mood, especially negative ones
4. **Quiz on First Use**: New users assessed before generic experience
5. **Illustrations Contextual**: Same mental illustration folder used throughout with purpose
6. **Therapeutic Value**: App provides genuine guidance, not just tracking