// Navigation Layer
// Config-driven navigation

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RouteProp } from '@react-navigation/native';
import { TAB_BAR_CONFIG } from '@/config/navigation';
import { HomeScreen } from '@/layers/screens/HomeScreen';
import { LoginScreen } from '@/layers/screens/LoginScreen';
import { MoodScreen } from '@/layers/screens/MoodScreen';
import { OnboardingScreen } from '@/layers/screens/OnboardingScreen';
import { colors } from '@/config/theme';
import { SvgIcon } from '@/components/common/SvgIcon';

type TabParamList = {
  home: undefined;
  mood: undefined;
  journey: undefined;
  community: undefined;
  profile: undefined;
};

type AuthParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

const createPlaceholderScreen = (name: string) => {
  const Screen: React.FC = () => (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{name} Screen</Text>
    </View>
  );
  Screen.displayName = `${name}Screen`;
  return Screen;
};

const JourneyScreen = createPlaceholderScreen('Journey');
const CommunityScreen = createPlaceholderScreen('Community');
const ProfileScreen = createPlaceholderScreen('Profile');
const SignupScreen = createPlaceholderScreen('Signup');

const Stack = createStackNavigator<AuthParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab bar icons using SVG components
const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  home: { active: 'home', inactive: 'home' },
  mood: { active: 'mood', inactive: 'mood' },
  journey: { active: 'star', inactive: 'star' },
  community: { active: 'community', inactive: 'community' },
  profile: { active: 'profile', inactive: 'profile' },
};

const TabBarIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  const iconName = TAB_ICONS[name]?.active || 'home';
  return (
    <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
      <SvgIcon 
        name={iconName as any} 
        size={24} 
        color={focused ? colors.primary[600] : colors.text.muted} 
      />
    </View>
  );
};

const MainTabs: React.FC = () => {
  return (
    <SafeAreaView style={styles.mainTabsContainer} edges={['top']}>
      <Tab.Navigator
        screenOptions={({ route }: { route: RouteProp<TabParamList> }) => ({
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon name={route.name} focused={focused} />
          ),
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: colors.primary[600],
          tabBarInactiveTintColor: colors.text.muted,
          tabBarBackground: () => <SafeAreaView edges={['bottom']} style={styles.tabBarSafeArea} />,
        })}
      >
        <Tab.Screen name="home" component={HomeScreen} options={{ title: TAB_BAR_CONFIG.home.title }} />
        <Tab.Screen name="mood" component={MoodScreen} options={{ title: TAB_BAR_CONFIG.mood.title }} />
        <Tab.Screen name="journey" component={JourneyScreen} options={{ title: TAB_BAR_CONFIG.journey.title }} />
        <Tab.Screen name="community" component={CommunityScreen} options={{ title: TAB_BAR_CONFIG.community.title }} />
        <Tab.Screen name="profile" component={ProfileScreen} options={{ title: TAB_BAR_CONFIG.profile.title }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator: React.FC<{ initialScreen: string }> = ({ initialScreen }) => {
  return (
    <NavigationContainer>
      {initialScreen === 'main' ? (
        <MainTabs />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainTabsContainer: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.cream,
  },
  placeholderText: {
    fontSize: 18,
    color: colors.text.primary,
  },
  tabBar: {
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: Platform.OS === 'ios' ? 88 : 72,
    paddingBottom: Platform.OS === 'ios' ? 28 : 24,
    paddingTop: 8,
    marginBottom: Platform.OS === 'android' ? 4 : 0,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabBarSafeArea: {
    backgroundColor: colors.background.white,
  },
});

export { AppNavigator };
