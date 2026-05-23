import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SvgIcon } from './src/components/common/SvgIcon';

// Screens
import { HomeScreen } from './src/layers/screens/HomeScreen';
import { CommunityScreen } from './src/layers/screens/CommunityScreen';
import { ReportsScreen } from './src/layers/screens/ReportsScreen';
import { ProfileScreen } from './src/layers/screens/ProfileScreen';
import { LoginScreen } from './src/layers/screens/LoginScreen';
import { SignupScreen } from './src/layers/screens/SignupScreen';
import { JourneyScreen } from './src/layers/screens/JourneyScreen';
import { MoodScreen } from './src/layers/screens/MoodScreen';
import { TherapistsScreen } from './src/layers/screens/TherapistsScreen';
import { QuizScreen } from './src/layers/screens/QuizScreen';
import { ReasonOfMoodScreen } from './src/layers/screens/ReasonOfMoodScreen';
import { GuidedJournalScreen } from './src/layers/screens/GuidedJournalScreen';
import { BreathingExerciseScreen } from './src/layers/screens/BreathingExerciseScreen';
import { RescueSessionScreen } from './src/layers/screens/RescueSessionScreen';
import { ChallengeScreen } from './src/layers/screens/ChallengeScreen';

import { useStore, selectIsAuthenticated, selectOnboardingCompleted } from './src/state/store';
import { colors, typography } from './src/config/theme';
import { CONTENT } from './src/config/content';

// SVG icon-based tab bar
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const iconMap: Record<string, string> = {
    home: 'home',
    mood: 'mood',
    community: 'community',
    reports: 'star',
    profile: 'profile',
  };
  
  return (
    <SvgIcon 
      name={iconMap[name] || 'home'} 
      size={24}
      color={focused ? colors.primary[600] : colors.text.muted}
    />
  );
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Main Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused }) => {
          const name = route.name.toLowerCase();
          return <TabIcon name={name} focused={focused} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: CONTENT.TABS.home }}
      />
      <Tab.Screen
        name="Mood"
        component={MoodScreen}
        options={{ tabBarLabel: CONTENT.TABS.mood }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ tabBarLabel: CONTENT.TABS.community }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: CONTENT.TABS.profile }}
      />
    </Tab.Navigator>
  );
}

// App Stack (includes screens accessible from tabs)
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Journey" component={JourneyScreen} />
      <Stack.Screen name="Challenge" component={ChallengeScreen} />
      <Stack.Screen name="Therapists" component={TherapistsScreen} />
      <Stack.Screen name="ReasonOfMood" component={ReasonOfMoodScreen} />
      <Stack.Screen name="GuidedJournal" component={GuidedJournalScreen} />
      <Stack.Screen name="BreathingExercise" component={BreathingExerciseScreen} />
      <Stack.Screen name="RescueSession" component={RescueSessionScreen} />
    </Stack.Navigator>
  );
}

// Root Navigator
function RootNavigator() {
  const isAuthenticated = useStore(selectIsAuthenticated);
  const onboardingCompleted = useStore(selectOnboardingCompleted);
  const quizCompleted = useStore((state: any) => (state as any).quizCompleted);

  // Show quiz for new users who haven't completed it
  const showQuiz = !isAuthenticated && !onboardingCompleted && !quizCompleted;
  // Show onboarding for returning users who haven't completed
  const showAuth = !isAuthenticated && !onboardingCompleted;

  return (
    <NavigationContainer>
      {showQuiz ? <AuthStack /> : showAuth ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}

// Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{this.state.error?.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    // Dynamic bottom padding based on platform - iOS needs more for home indicator
    paddingBottom: Platform.OS === 'ios' ? 28 : 24,
    height: Platform.OS === 'ios' ? 88 : 72,
    // Extra bottom margin for Android navigation bar
    marginBottom: Platform.OS === 'android' ? 4 : 0,
  },
  tabBarLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.cream,
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.error,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: colors.text.primary,
    textAlign: 'center',
  },
});