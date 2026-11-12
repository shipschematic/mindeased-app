// Execute Layer - Environment Configuration
// Firebase web configuration and feature flags.
// Reads from process.env.EXPO_PUBLIC_* variables at build/export time.

export const ENV = {
  FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',

  ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_CRASHLYTICS: process.env.EXPO_PUBLIC_ENABLE_CRASHLYTICS === 'true',
} as const;

export type EnvKey = keyof typeof ENV;

export const getEnv = (key: EnvKey): string | boolean => {
  return ENV[key];
};

export const validateEnv = (): boolean => {
  const required = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_APP_ID',
  ];
  const missing = required.filter(
    (key) => !ENV[key as keyof typeof ENV] || ENV[key as keyof typeof ENV] === ''
  );

  if (missing.length > 0) {
    console.warn('Missing environment configuration:', missing);
    return false;
  }

  return true;
};
