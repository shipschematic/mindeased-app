// Execute Layer - Environment Configuration
// Supabase and API configuration

export const ENV = {
  SUPABASE_URL: 'YOUR_SUPABASE_URL',
  SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
  
  // Add other environment variables here
  API_BASE_URL: 'https://api.mentalhealth.app',
  
  // Feature flags from environment
  ENABLE_ANALYTICS: false,
  ENABLE_CRASHLYTICS: false,
} as const;

export type EnvKey = keyof typeof ENV;

export const getEnv = (key: EnvKey): string | boolean => {
  return ENV[key];
};

export const validateEnv = (): boolean => {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = required.filter(
    (key) => ENV[key as keyof typeof ENV] === 'YOUR_SUPABASE_URL' || 
             ENV[key as keyof typeof ENV] === 'YOUR_SUPABASE_ANON_KEY'
  );
  
  if (missing.length > 0) {
    console.warn('Missing environment configuration:', missing);
    return false;
  }
  
  return true;
};
