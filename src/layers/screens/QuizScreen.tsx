// Layers - Screens - Personal Quiz Screen
// Initial assessment for personalized experience

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '@/state/store';
import { QUIZ_CONFIG, getQuizResult } from '@/config/quiz-questions';
import { MoodType } from '@/config/mood-workflows';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

export const QuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const completeOnboarding = useStore((state) => state.completeOnboarding);
  const insets = useSafeAreaInsets();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  
  const questions = QUIZ_CONFIG.screens;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  
  const isLastQuestion = currentIndex === questions.length - 1;
  
  const handleMoodSelect = (mood: string) => {
    setResponses({ ...responses, [currentQuestion.id]: mood });
  };
  
  const handleSingleSelect = (value: string) => {
    setResponses({ ...responses, [currentQuestion.id]: value });
  };
  
  const handleMultiSelect = (value: string) => {
    const current = responses[currentQuestion.id] || [];
    if (current.includes(value)) {
      setResponses({
        ...responses,
        [currentQuestion.id]: current.filter((v: string) => v !== value)
      });
    } else {
      if (current.length < (currentQuestion.maxSelect || 99)) {
        setResponses({
          ...responses,
          [currentQuestion.id]: [...current, value]
        });
      }
    }
  };
  
  const handleTextChange = (text: string) => {
    setResponses({ ...responses, [currentQuestion.id]: text });
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      handleFinish();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  const handleFinish = () => {
    // Calculate result and save
    const result = getQuizResult(responses);
    
    // Save quiz completion
    const setQuizCompleted = (useStore.getState() as any).setQuizCompleted;
    if (setQuizCompleted) {
      setQuizCompleted(true, responses, result);
    }
    
    completeOnboarding();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };
  
  const handleSkip = () => {
    if (isLastQuestion) {
      handleFinish();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const isAnswered = (): boolean => {
    const answer = responses[currentQuestion.id];
    if (answer === undefined) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === 'string') return answer.length > 0;
    return true;
  };
  
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'mood':
        return (
          <View style={styles.moodGrid}>
            {(currentQuestion.options || []).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.moodOption,
                  responses[currentQuestion.id] === option.value && styles.moodOptionSelected
                ]}
                onPress={() => handleMoodSelect(option.value)}
              >
                <Text style={styles.moodEmoji}>{option.label.match(/\p{Emoji}/u)?.[0] || '😊'}</Text>
                <Text style={[
                  styles.moodLabel,
                  responses[currentQuestion.id] === option.value && styles.moodLabelSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
        
      case 'singleSelect':
        return (
          <View style={styles.optionsList}>
            {(currentQuestion.options || []).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  responses[currentQuestion.id] === option.value && styles.optionItemSelected
                ]}
                onPress={() => handleSingleSelect(option.value)}
              >
                <Text style={[
                  styles.optionLabel,
                  responses[currentQuestion.id] === option.value && styles.optionLabelSelected
                ]}>
                  {option.label}
                </Text>
                {responses[currentQuestion.id] === option.value && (
                  <Text style={styles.optionCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        );
        
      case 'multiSelect':
        const selected = responses[currentQuestion.id] || [];
        return (
          <View style={styles.optionsList}>
            {(currentQuestion.options || []).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  selected.includes(option.value) && styles.optionItemSelected
                ]}
                onPress={() => handleMultiSelect(option.value)}
              >
                <View style={[
                  styles.checkbox,
                  selected.includes(option.value) && styles.checkboxSelected
                ]}>
                  {selected.includes(option.value) && (
                    <Text style={styles.checkboxCheck}>✓</Text>
                  )}
                </View>
                <Text style={[
                  styles.optionLabel,
                  selected.includes(option.value) && styles.optionLabelSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.multiSelectHint}>
              Select up to {currentQuestion.maxSelect} options
            </Text>
          </View>
        );
        
      case 'text':
        return (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={responses[currentQuestion.id] || ''}
              onChangeText={handleTextChange}
              placeholder={currentQuestion.placeholder}
              placeholderTextColor={colors.text.muted}
              multiline
              numberOfLines={4}
            />
          </View>
        );
        
      default:
        return null;
    }
  };
  
  const QuestionSvg = currentQuestion.illustrationSvg || null;
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1} of {questions.length}
          </Text>
        </View>
        
        {/* Illustration */}
        {QuestionSvg && (
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <QuestionSvg width={120} height={120} />
            </View>
          </View>
        )}
        
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.subtitle && (
            <Text style={styles.subtitle}>{currentQuestion.subtitle}</Text>
          )}
        </View>
        
        {/* Answer */}
        {renderQuestion()}
      </ScrollView>
      
      {/* Navigation */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 16 }]}>
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
            <Text style={styles.prevButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isAnswered() && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={currentQuestion.isRequired && !isAnswered()}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Skip */}
      <TouchableOpacity style={[styles.skipButton, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]} onPress={handleSkip}>
        <Text style={styles.skipText}>
          {isLastQuestion ? 'Skip for now' : 'Skip this question'}
        </Text>
      </TouchableOpacity>
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
    padding: spacing.lg,
  },
  progressContainer: {
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.background.cardAlt,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  illustration: {
    width: 120,
    height: 120,
  },
  questionContainer: {
    marginBottom: spacing.lg,
  },
  question: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  moodOption: {
    width: '30%',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.cardAlt,
  },
  moodOptionSelected: {
    backgroundColor: colors.primary[100],
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  moodLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  moodLabelSelected: {
    color: colors.primary[700],
  },
  optionsList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.cardAlt,
  },
  optionItemSelected: {
    backgroundColor: colors.primary[100],
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  optionLabel: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  optionLabelSelected: {
    color: colors.primary[700],
  },
  optionCheck: {
    fontSize: 18,
    color: colors.primary[600],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  checkboxCheck: {
    fontSize: 14,
    color: colors.background.white,
  },
  multiSelectHint: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.muted,
    marginTop: spacing.sm,
  },
  textInputContainer: {
    marginBottom: spacing.lg,
  },
  textInput: {
    backgroundColor: colors.background.cardAlt,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  prevButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.cardAlt,
  },
  prevButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  nextButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: colors.primary[200],
  },
  nextButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.background.white,
  },
  skipButton: {
    alignItems: 'center',
  },
  skipText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.muted,
  },
});
