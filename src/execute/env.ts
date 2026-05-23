// Execute Layer - Environment Configuration
// Supabase and API configuration
// Reads from process.env.EXPO_PUBLIC_* variables

export const ENV = {
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',

  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.mentalhealth.app',

  ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_CRASHLYTICS: process.env.EXPO_PUBLIC_ENABLE_CRASHLYTICS === 'true',
} as const;

export type EnvKey = keyof typeof ENV;

export const getEnv = (key: EnvKey): string | boolean => {
  return ENV[key];
};

export const validateEnv = (): boolean => {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = required.filter(
    (key) => !ENV[key as keyof typeof ENV] || ENV[key as keyof typeof ENV] === ''
  );

  if (missing.length > 0) {
    console.warn('Missing environment configuration:', missing);
    return false;
  }

  return true;
};
