import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance using complete configuration
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Firestore with specific databaseId configured in firebase-applet-config.json
function initDb(): Firestore {
  try {
    const dbId = firebaseConfig.firestoreDatabaseId;
    return initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
      ignoreUndefinedProperties: true
    }, dbId || undefined);
  } catch (err) {
    console.warn('[Firebase] Fallback to getFirestore:', err);
    return getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
}

export const db = initDb();

// Test connection on boot per Firebase guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    // Gracefully handle initial offline / connecting status
    if (error instanceof Error && (error.message.includes('offline') || error.message.includes('unavailable'))) {
      console.log('[Firebase] Running in offline mode or waiting for backend handshake.');
    }
  }
}
testConnection();

