// Execute Layer - Web stub for native Google Sign-In.
// Metrobundles this file on web; the native module must never reach the browser.
export async function signInWithGoogleNative(): Promise<{ idToken: string }> {
  throw new Error('Native Google sign-in is not available on web.');
}

export async function googleSignOutNative(): Promise<void> {
  // No native Google session to clear on web.
}
