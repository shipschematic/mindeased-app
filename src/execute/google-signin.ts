// Execute Layer - Native Google Sign-In (Android/iOS)
// Obtains a Google ID token; Firebase exchanges it for a session in firebase.ts.
import { Platform } from 'react-native';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';

const WEB_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
  '521906147554-kpusmu6v2n11u9qv30qchg0sqj68mtul.apps.googleusercontent.com';
const IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ||
  '521906147554-msr1f4vl7cdjktv25c1akg2djddnva3s.apps.googleusercontent.com';

let configured = false;

function configure(): void {
  if (configured) return;
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    offlineAccess: false,
  });
  configured = true;
}

export async function signInWithGoogleNative(): Promise<{ idToken: string }> {
  configure();

  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
  }

  const response = await GoogleSignin.signIn();
  if (!isSuccessResponse(response)) {
    throw new Error('Sign-in cancelled.');
  }

  const idToken = response.data.idToken;
  if (!idToken) {
    throw new Error('Google sign-in did not return an ID token.');
  }

  return { idToken };
}

export async function googleSignOutNative(): Promise<void> {
  try {
    await GoogleSignin.signOut();
  } catch {
    // Signing out of Firebase still proceeds if Google has no cached session.
  }
}
