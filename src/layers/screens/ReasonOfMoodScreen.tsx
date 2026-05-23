// Layers - Screens - Reason of Mood Screen
// "Why do you feel this way?" - Core therapeutic flow

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useStore } from '@/state/store';
import { MOOD_WORKFLOWS, MoodType } from '@/config/mood-workflows';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

type RootStackParamList = {
  ReasonOfMood: { mood: MoodType };
};

type ReasonOfMoodRouteProp = RouteProp<RootStackParamList, 'ReasonOfMood'>;

export const ReasonOfMoodScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ReasonOfMoodRouteProp>();
  const { mood } = route.params;
  
  const setMoodReason = useStore((state: any) => (state as any).setMoodReason);
  const addMoodEntry = useStore((state: any) => (state as any).addMoodEntry);
  
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  const workflow = MOOD_WORKFLOWS[mood];
  const reasonOptions = workflow.reasonOptions || [];
  
  const handleSelectReason = (reason: string) => {
    if (reason === 'Other') {
      setShowCustomInput(true);
      setSelectedReason(reason);
    } else {
      setSelectedReason(reason);
      setShowCustomInput(false);
    }
  };
  
  const handleContinue = () => {
    const finalReason = showCustomInput ? customReason : selectedReason;
    
    if (finalReason) {
      // Update the current mood entry with reason
      if (setMoodReason) {
        setMoodReason(finalReason);
      }
    }
    
    // Navigate back to show next actions based on the workflow
    navigation.goBack();
  };
  
  const handleSkip = () => {
    // Just move back without reason
    navigation.goBack();
  };

  const WorkflowSvg = workflow.illustrationSvg;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <WorkflowSvg width={200} height={200} />
          </View>
        </View>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            What's making you feel {workflow.primaryEmotion}?
          </Text>
          <Text style={styles.subtitle}>
            Understanding why helps us help you better
          </Text>
        </View>
        
        {/* Reason Options */}
        <View style={styles.optionsContainer}>
          {reasonOptions.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.reasonOption,
                selectedReason === reason && styles.reasonOptionSelected
              ]}
              onPress={() => handleSelectReason(reason)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.reasonText,
                selectedReason === reason && styles.reasonTextSelected
              ]}>
                {reason}
              </Text>
              {selectedReason === reason && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Custom Input */}
        {showCustomInput && (
          <View style={styles.customInputContainer}>
            <Text style={styles.customLabel}>What's on your mind?</Text>
            <TextInput
              style={styles.customInput}
              value={customReason}
              onChangeText={setCustomReason}
              placeholder="Share what's affecting you..."
              placeholderTextColor={colors.text.muted}
              multiline
              numberOfLines={3}
            />
          </View>
        )}
        
        {/* Skip Option */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip this question</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedReason && !customReason && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedReason && !customReason && !showCustomInput}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  illustration: {
    width: 200,
    height: 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.white,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reasonOptionSelected: {
    borderColor: colors.primary[600],
    backgroundColor: colors.primary[50],
  },
  reasonText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  reasonTextSelected: {
    color: colors.primary[600],
  },
  checkmark: {
    fontSize: 20,
    color: colors.primary[600],
    marginLeft: spacing.sm,
  },
  customInputContainer: {
    marginBottom: spacing.xl,
  },
  customLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  customInput: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  skipButton: {
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing['3xl'],
  },
  skipText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.muted,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  continueButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.text.muted,
  },
  continueButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.inverse,
  },
});
