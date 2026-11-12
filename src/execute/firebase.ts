// Execute Layer - Firebase Authentication
// Google sign-in for the hosted web build. Firebase Hosting itself needs no SDK;
// this module only provides identity. The web app config is public by design.
import { Platform } from 'react-native';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type Auth,
  type User as FirebaseUser,
} from 'firebase/auth';
import type { User } from '@/state/types';

type FirebaseErrorLike = { code?: string; message?: string };

const firebaseConfig = {
  apiKey:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyDrCw4nfOLS2Mbh50XwWwF8Qrhs6JHI2JM',
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'app-mentalhealth.firebaseapp.com',
  projectId:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'app-mentalhealth',
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'app-mentalhealth.firebasestorage.app',
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '350408475113',
  appId:
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID ||
    '1:350408475113:web:0b610582c7ac3bf4618b78',
};

export const isWebAuthAvailable = Platform.OS === 'web';

const ERROR_MESSAGES: Record<string, string> = {
  'auth/popup-closed-by-user': 'Sign-in cancelled.',
  'auth/cancelled-popup-request': 'Sign-in cancelled.',
  'auth/unauthorized-domain':
    'This domain is not authorized in Firebase Authentication. Add it under Authentication > Settings > Authorized domains.',
  'auth/operation-not-allowed':
    'Google sign-in is not enabled for this Firebase project.',
  'auth/invalid-api-key': 'Firebase web config is invalid.',
  'auth/network-request-failed':
    'Network error. Check your connection and try again.',
};

export function describeFirebaseError(error: unknown): string {
  const code = (error as FirebaseErrorLike | undefined)?.code;
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];
  if (error instanceof Error && error.message) return error.message;
  return 'Google sign-in failed.';
}

let cachedApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!cachedApp) {
    cachedApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return cachedApp;
}

let cachedAuth: Auth | null = null;

function getFirebaseAuth(): Auth {
  if (!isWebAuthAvailable) {
    throw new Error('Google sign-in is available on the web build only.');
  }
  if (!cachedAuth) {
    cachedAuth = getAuth(getFirebaseApp());
    setPersistence(cachedAuth, browserLocalPersistence).catch(() => {
      // Persistence is best-effort; session still works for the current tab.
    });
  }
  return cachedAuth;
}

export function mapFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name:
      firebaseUser.displayName ||
      firebaseUser.email?.split('@')[0] ||
      'Friend',
    avatar: firebaseUser.photoURL || undefined,
    createdAt: firebaseUser.metadata.creationTime
      ? new Date(firebaseUser.metadata.creationTime).getTime()
      : Date.now(),
  };
}

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const credential = await signInWithPopup(auth, provider);
    return mapFirebaseUser(credential.user);
  } catch (error) {
    const code = (error as FirebaseErrorLike | undefined)?.code;
    // Popups are commonly blocked in embedded browsers. Redirect is the fallback.
    if (code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, provider);
      throw new Error('Redirecting to Google sign-in...');
    }
    throw new Error(describeFirebaseError(error));
  }
}

export async function firebaseSignOut(): Promise<void> {
  if (!isWebAuthAvailable || !cachedAuth) return;
  await signOut(cachedAuth);
}

export function subscribeToFirebaseAuth(
  callback: (user: User | null) => void
): () => void {
  if (!isWebAuthAvailable) return () => {};
  try {
    return onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
      callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
    });
  } catch (error) {
    console.warn('[Firebase] Auth listener unavailable:', describeFirebaseError(error));
    return () => {};
  }
}
