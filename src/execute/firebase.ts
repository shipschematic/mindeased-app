// Execute Layer - Firebase Authentication
// Google sign-in for web (popup), Android and iOS (native Google Sign-In).
// The Firebase config is public by design.
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type Auth,
  type User as FirebaseUser,
} from 'firebase/auth';
import { googleSignOutNative, signInWithGoogleNative } from './google-signin';
import type { User } from '@/state/types';

type FirebaseErrorLike = { code?: string; message?: string };

const firebaseConfig = {
  apiKey:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyC2q9A_Vf93Sw5YXaG-THVdN2KPa3tci2M',
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'mindeased.firebaseapp.com',
  projectId:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'mindeased',
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'mindeased.firebasestorage.app',
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '521906147554',
  appId:
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID ||
    '1:521906147554:web:4a7c5e1cf2df088ff1cebb',
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
  'SIGN_IN_CANCELLED': 'Sign-in cancelled.',
  'IN_PROGRESS': 'Sign-in is already in progress.',
  'PLAY_SERVICES_NOT_AVAILABLE':
    'Google Play Services is missing or outdated on this device.',
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

// Firebase ships a React Native build of its Auth SDK, but its web typings do
// not expose the persistence helper. Resolve it through the RN module entry.
function getNativePersistence() {
  const factory = (
    firebaseAuth as unknown as {
      getReactNativePersistence?: (storage: unknown) => never;
    }
  ).getReactNativePersistence;
  if (!factory) {
    throw new Error('Firebase React Native persistence is unavailable.');
  }
  return factory(AsyncStorage);
}

function getFirebaseAuth(): Auth {
  if (!cachedAuth) {
    const app = getFirebaseApp();
    if (isWebAuthAvailable) {
      cachedAuth = getAuth(app);
      setPersistence(cachedAuth, browserLocalPersistence).catch(() => {
        // Persistence is best-effort; session still works for the current tab.
      });
    } else {
      cachedAuth = initializeAuth(app, {
        persistence: getNativePersistence(),
      });
    }
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

  if (!isWebAuthAvailable) {
    try {
      const { idToken } = await signInWithGoogleNative();
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      return mapFirebaseUser(result.user);
    } catch (error) {
      throw new Error(describeFirebaseError(error));
    }
  }

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
  if (!cachedAuth) return;
  if (!isWebAuthAvailable) await googleSignOutNative();
  await signOut(cachedAuth);
}

export function subscribeToFirebaseAuth(
  callback: (user: User | null) => void
): () => void {
  try {
    return onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
      callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
    });
  } catch (error) {
    console.warn('[Firebase] Auth listener unavailable:', describeFirebaseError(error));
    return () => {};
  }
}
