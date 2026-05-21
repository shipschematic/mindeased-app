// Single Source of Truth - Content & Copy
// All text content, labels, and translations

export const CONTENT = {
  // App
  APP: {
    name: 'Mental Health',
  },

  // Onboarding
  ONBOARDING: {
    slides: [
      {
        id: 1,
        title: 'We are changing system around mental health',
        subtitle: 'Even the most serious mental health conditions can be treated, however, allowing people to better contribute',
      },
      {
        id: 2,
        title: 'Track Your Mood Daily',
        subtitle: 'Understand your emotions and identify patterns over time',
      },
      {
        id: 3,
        title: 'Join Our Community',
        subtitle: 'Connect with others on similar journeys and share experiences',
      },
    ],
    skip: 'Skip',
    next: 'Next',
    getStarted: 'Get Started',
  },

  // Authentication
  AUTH: {
    login: {
      title: 'Hey! Welcome back',
      subtitle: 'Congratulations on taking your first step towards better mental wellbeing',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      submit: 'Log in',
      or: 'OR',
      social: {
        google: 'Continue with Google',
        apple: 'Continue with Apple',
        facebook: 'Continue with Facebook',
      },
      noAccount: "I don't have an account. ",
      signup: 'Create Account',
    },
    signup: {
      title: 'Create an account',
      subtitle: 'Create your account. Enter your email and password',
      fullName: 'Full name',
      email: 'Email',
      password: 'Password',
      submit: 'Create account',
      terms: 'By clicking above, I agree to ',
      termsLink: 'Terms of Service',
      privacyLink: 'Privacy Policy',
      and: ' & ',
      or: 'OR',
      social: {
        google: 'Continue with Google',
        apple: 'Continue with Apple',
        facebook: 'Continue with Facebook',
      },
      hasAccount: 'Already have an account? ',
      login: 'Log In',
    },
  },

  // Home Screen
  HOME: {
    greeting: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
    },
    searchPlaceholder: 'Search for session, journals....',
    dailyMoodLog: 'Daily mood log',
    trackMode: 'Track mode',
    continueJourney: {
      title: 'Continue your journey',
      subtitle: "Let's see the progress of your journey",
      cta: 'Start journey',
    },
    weeklyChallenge: {
      title: 'Weekly challenge',
      cardTitle: 'Want to build up your confidence?',
      cardSubtitle: 'Make better yourself',
      cta: 'Start challenge',
    },
    rescueSession: {
      title: 'Rescue session',
      cta: 'Start session',
    },
  },

  // Mood Screen
  MOOD: {
    title: 'How are you feeling?',
    subtitle: 'Select your current mood',
    howAreYou: 'How are you feeling?',
    addNote: 'Add a note',
    notePlaceholder: 'Write about how you feel...',
    save: 'Save',
    emotions: {
      love: 'Love',
      good: 'Good',
      depress: 'Depressed',
      sad: 'Sad',
      worried: 'Worried',
    },
  },

  // Community Screen
  COMMUNITY: {
    title: 'Community',
    subtitle: 'How are you feeling today?',
    searchPlaceholder: 'Search for session, journals...',
    addChannel: 'Add Channel',
    writeSomething: 'Write something...',
    tabs: {
      posts: 'Posts',
      channels: 'Channels',
      people: 'People',
      photos: 'Photos',
      videos: 'Videos',
    },
  },

  // Reports Screen
  REPORTS: {
    title: 'Reports',
    overallProgress: 'Overall progress',
    progressSubtitle: 'Your progress is good',
    achievements: 'Achievements',
    achievementItems: [
      { id: 'daily', title: 'Daily challenges', subtitle: 'Achieve daily challenge 3 times a day' },
      { id: 'journey', title: 'Journey Progress', subtitle: 'Achieve daily challenge 3 times a day' },
      { id: 'weekly', title: 'Weekly live challenge', subtitle: 'Achieve daily challenge 3 times a day' },
      { id: 'health', title: 'Health and Fitness', subtitle: 'Achieve daily challenge 3 times a day' },
    ],
  },

  // Profile Screen
  PROFILE: {
    title: 'Profile',
    inviteFriends: 'Invite friends',
    menu: {
      accountSettings: 'Account settings',
      language: 'Language',
      languageValue: 'English',
      faq: 'FAQ',
      help: 'Help and feedback',
    },
  },

  // Journey Screen
  JOURNEY: {
    title: 'Create your own journey',
    subtitle: 'Informed by evidence and extensive field testing for you',
    searchPlaceholder: 'Search your task',
    totalProgress: 'Total Progress',
    progressSubtitle: 'Your progress is good',
    sections: {
      morning: 'Morning task',
      afternoon: 'Afternoon task',
      night: 'Night task',
    },
  },

  // Therapists Screen
  THERAPISTS: {
    title: 'Therapists',
    subtitle: 'Connect with professional therapists for personalized support',
    searchPlaceholder: 'Search for session, journals....',
    greatMatch: 'Great match',
    seeAll: 'See all',
    specializing: 'Specializing in sleep help',
    book: 'Book',
  },

  // Tab Bar
  TABS: {
    home: 'Home',
    community: 'Community',
    reports: 'Reports',
    profile: 'Profile',
  },

  // Common
  COMMON: {
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    done: 'Done',
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
  },
} as const;

export type ContentType = typeof CONTENT;
