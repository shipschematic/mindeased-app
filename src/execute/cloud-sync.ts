// Execute Layer - Firestore sync
// Mirrors the persisted store into users/{uid} so an account keeps its mood,
// journal, and progress across browsers. Local storage stays the source of
// truth for offline use; Firestore is the durable copy.
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, getFirestore, setDoc, type Firestore } from 'firebase/firestore';
import { getFirebaseApp } from './firebase';
import { persistedSnapshot, useStore, type MindeasedStore } from '@/state/store';

const COLLECTION = 'users';
const SCHEMA_VERSION = 1;
const PUSH_DEBOUNCE_MS = 1200;
const TIMESTAMP_BASE = 'mental-health-sync';
const timestampKey = (uid: string) => `${TIMESTAMP_BASE}:${uid}`;

type CloudDocument = {
  state?: Partial<MindeasedStore>;
  updatedAt?: number;
  schemaVersion?: number;
};

let cachedDb: Firestore | null = null;
let activeUid: string | null = null;
let unsubscribeStore: (() => void) | null = null;
let pendingTimer: ReturnType<typeof setTimeout> | null = null;
let queue: Promise<void> = Promise.resolve();

function getDb(): Firestore {
  if (!cachedDb) cachedDb = getFirestore(getFirebaseApp());
  return cachedDb;
}

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function readLocalTimestamp(uid: string): Promise<number> {
  try {
    const value =
      Platform.OS === 'web'
        ? window.localStorage.getItem(timestampKey(uid))
        : await AsyncStorage.getItem(timestampKey(uid));
    return Number(value) || 0;
  } catch {
    return 0;
  }
}

async function writeLocalTimestamp(uid: string, value: number): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      window.localStorage.setItem(timestampKey(uid), String(value));
    } else {
      await AsyncStorage.setItem(timestampKey(uid), String(value));
    }
  } catch {
    // Timestamps are advisory; a failed write only costs a redundant pull.
  }
}

async function pushNow(): Promise<void> {
  const uid = activeUid;
  if (!uid) return;

  const updatedAt = Date.now();
  // JSON round-trip drops undefined fields; Firestore rejects them outright.
  const state = JSON.parse(
    JSON.stringify(persistedSnapshot(useStore.getState()))
  );
  await setDoc(doc(getDb(), COLLECTION, uid), {
    state,
    updatedAt,
    schemaVersion: SCHEMA_VERSION,
  });

  // Ignore the result if the account changed while the write was in flight.
  if (activeUid !== uid) return;
  await writeLocalTimestamp(uid, updatedAt);
}

function enqueuePush(): Promise<void> {
  queue = queue.then(pushNow).catch((error) => {
    console.warn('[Sync] Push failed:', describeError(error));
  });
  return queue;
}

function schedulePush(): void {
  if (!activeUid) return;
  if (pendingTimer) clearTimeout(pendingTimer);
  pendingTimer = setTimeout(() => {
    pendingTimer = null;
    void enqueuePush();
  }, PUSH_DEBOUNCE_MS);
}

/**
 * Load the cloud copy for an account, reconcile it with local data, then keep
 * local changes flowing to Firestore. Safe to call twice for the same account.
 */
export async function startCloudSync(uid: string): Promise<void> {
  if (activeUid === uid) return;
  await stopCloudSync();
  activeUid = uid;

  try {
    const reference = doc(getDb(), COLLECTION, uid);
    const snapshot = await getDoc(reference);
    const remote = snapshot.exists()
      ? (snapshot.data() as CloudDocument)
      : null;
    const localUpdatedAt = await readLocalTimestamp(uid);

    if (remote?.state && (remote.updatedAt ?? 0) > localUpdatedAt) {
      useStore.setState(remote.state);
      await writeLocalTimestamp(uid, remote.updatedAt ?? 0);
    } else {
      await enqueuePush();
    }
  } catch (error) {
    console.warn(
      '[Sync] Initial sync failed, keeping local data:',
      describeError(error)
    );
  }

  if (activeUid !== uid) return;

  unsubscribeStore = useStore.subscribe(() => {
    schedulePush();
  });
}

/** Flush pending writes and detach. Call before signing out. */
export async function stopCloudSync(): Promise<void> {
  if (unsubscribeStore) {
    unsubscribeStore();
    unsubscribeStore = null;
  }
  if (pendingTimer) {
    clearTimeout(pendingTimer);
    pendingTimer = null;
  }
  if (activeUid) {
    await enqueuePush();
    activeUid = null;
  }
}
