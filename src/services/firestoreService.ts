import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
  serverTimestamp,
  Unsubscribe
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import {
  UserProfile,
  Meliponary,
  Hive,
  HarvestRecord,
  InspectionRecord,
  FeedingRecord,
  DivisionRecord,
  BaitTrapRecord,
  ReminderRecord,
  FloraItem,
  MarketplaceItem
} from '../types';
import {
  INITIAL_MELIPONARIES,
  INITIAL_HIVES,
  INITIAL_HARVESTS,
  INITIAL_INSPECTIONS,
  INITIAL_FEEDINGS,
  INITIAL_DIVISIONS,
  INITIAL_BAIT_TRAPS,
  INITIAL_FLORA,
  INITIAL_REMINDERS,
  INITIAL_MARKETPLACE_ITEMS
} from '../data/mockData';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Constants
export const ADMIN_EMAILS = ['andreneutz@gmail.com'];

// Helper to determine if an email is admin
export function isUserAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

/**
 * ----------------------------------------------------
 * USER PROFILE SERVICES
 * ----------------------------------------------------
 */
export async function syncUserProfile(
  uid: string,
  email: string,
  displayName?: string | null,
  photoURL?: string | null
): Promise<UserProfile> {
  const userRef = doc(db, 'users', uid);
  const cleanEmail = email.trim().toLowerCase();
  const isAdmin = isUserAdminEmail(cleanEmail);

  try {
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const newProfile: UserProfile = {
        uid,
        email: cleanEmail,
        displayName: displayName || cleanEmail.split('@')[0] || 'Meliponicultor',
        role: isAdmin ? 'admin' : 'meliponicultor',
        meliponaryName: displayName ? `Meliponário de ${displayName.split(' ')[0]}` : 'Meu Meliponário',
        cityState: '',
        phoneWhatsapp: '',
        photoURL: photoURL || '',
        bio: 'Criador e protetor de Abelhas Nativas Sem Ferrão (ASF).',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        await setDoc(userRef, newProfile);
      } catch (writeErr) {
        console.warn('[Firestore] Profile initial write warning (cached locally):', writeErr);
      }
      
      return newProfile;
    } else {
      const existing = userSnap.data() as UserProfile;
      // Auto-update admin role if email matches admin list
      if (isAdmin && existing.role !== 'admin') {
        try {
          await updateDoc(userRef, { role: 'admin', updatedAt: new Date().toISOString() });
        } catch (updateErr) {
          console.warn('[Firestore] Admin role update warning:', updateErr);
        }
        existing.role = 'admin';
      }
      return existing;
    }
  } catch (err) {
    console.warn('[Firestore] Error getting user document, creating local in-memory fallback:', err);
    return {
      uid,
      email: cleanEmail,
      displayName: displayName || cleanEmail.split('@')[0] || 'Meliponicultor',
      role: isAdmin ? 'admin' : 'meliponicultor',
      meliponaryName: displayName ? `Meliponário de ${displayName.split(' ')[0]}` : 'Meu Meliponário',
      cityState: '',
      phoneWhatsapp: '',
      photoURL: photoURL || '',
      bio: 'Criador e protetor de Abelhas Nativas Sem Ferrão (ASF).',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Seeds starter data for a new user
 */
async function seedNewUserData(userId: string): Promise<void> {
  try {
    const batch = writeBatch(db);

    // Initial Meliponaries
    for (const mel of INITIAL_MELIPONARIES) {
      const ref = doc(db, `users/${userId}/meliponaries`, mel.id);
      batch.set(ref, mel);
    }

    // Initial Hives
    for (const hive of INITIAL_HIVES) {
      const ref = doc(db, `users/${userId}/hives`, hive.id);
      batch.set(ref, hive);
    }

    // Initial Harvests
    for (const harv of INITIAL_HARVESTS) {
      const ref = doc(db, `users/${userId}/harvests`, harv.id);
      batch.set(ref, harv);
    }

    // Initial Inspections
    for (const insp of INITIAL_INSPECTIONS) {
      const ref = doc(db, `users/${userId}/inspections`, insp.id);
      batch.set(ref, insp);
    }

    // Initial Feedings
    for (const feed of INITIAL_FEEDINGS) {
      const ref = doc(db, `users/${userId}/feedings`, feed.id);
      batch.set(ref, feed);
    }

    // Initial Divisions
    for (const div of INITIAL_DIVISIONS) {
      const ref = doc(db, `users/${userId}/divisions`, div.id);
      batch.set(ref, div);
    }

    // Initial Traps
    for (const trap of INITIAL_BAIT_TRAPS) {
      const ref = doc(db, `users/${userId}/traps`, trap.id);
      batch.set(ref, trap);
    }

    // Initial Reminders
    for (const rem of INITIAL_REMINDERS) {
      const ref = doc(db, `users/${userId}/reminders`, rem.id);
      batch.set(ref, rem);
    }

    // Initial Flora
    for (const flor of INITIAL_FLORA) {
      const ref = doc(db, `users/${userId}/flora`, flor.id);
      batch.set(ref, flor);
    }

    await batch.commit();
  } catch (err) {
    console.warn('[seedNewUserData] Could not seed starter data:', err);
  }
}

/**
 * ----------------------------------------------------
 * GENERIC USER SUBCOLLECTION HELPERS
 * ----------------------------------------------------
 */
export function subscribeUserCollection<T extends { id: string }>(
  userId: string,
  collectionName: string,
  onUpdate: (items: T[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  // Only connect to Firestore listener if the user is authenticated in Firebase Auth
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return () => {};
  }

  const path = `users/${userId}/${collectionName}`;
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: T[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ ...(docSnap.data() as T), id: docSnap.id });
      });
      onUpdate(items);
    },
    (err) => {
      console.warn(`[subscribeUserCollection] Notice for ${collectionName}:`, err);
      if (onError) onError(err);
    }
  );
}

export async function saveUserItem<T extends { id: string }>(
  userId: string,
  collectionName: string,
  item: T
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return;
  }
  const path = `users/${userId}/${collectionName}`;
  const docRef = doc(db, path, item.id);
  try {
    await setDoc(docRef, item, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${item.id}`);
  }
}

export async function deleteUserItem(
  userId: string,
  collectionName: string,
  itemId: string
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return;
  }
  const path = `users/${userId}/${collectionName}`;
  const docRef = doc(db, path, itemId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${path}/${itemId}`);
  }
}

/**
 * ----------------------------------------------------
 * MARKETPLACE SERVICES (Admin Managed, Public Read)
 * ----------------------------------------------------
 */
export function subscribeMarketplaceItems(
  onUpdate: (items: MarketplaceItem[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const path = 'marketplace_items';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate([]);
      } else {
        const items: MarketplaceItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ ...(docSnap.data() as MarketplaceItem), id: docSnap.id });
        });
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('[subscribeMarketplaceItems] Notice:', err);
      onUpdate([]);
      if (onError) onError(err);
    }
  );
}

export async function saveMarketplaceItem(item: MarketplaceItem): Promise<void> {
  const path = `marketplace_items/${item.id}`;
  const docRef = doc(db, 'marketplace_items', item.id);
  try {
    await setDoc(docRef, item, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteMarketplaceItem(itemId: string): Promise<void> {
  const path = `marketplace_items/${itemId}`;
  const docRef = doc(db, 'marketplace_items', itemId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function seedGlobalMarketplace(): Promise<void> {
  try {
    if (INITIAL_MARKETPLACE_ITEMS.length === 0) return;
    const colRef = collection(db, 'marketplace_items');
    const snap = await getDocs(colRef);
    if (snap.empty && auth.currentUser) {
      const batch = writeBatch(db);
      for (const item of INITIAL_MARKETPLACE_ITEMS) {
        const docRef = doc(db, 'marketplace_items', item.id);
        batch.set(docRef, item);
      }
      await batch.commit();
      console.log('[seedGlobalMarketplace] Seeded default marketplace catalog.');
    }
  } catch (err) {
    console.warn('[seedGlobalMarketplace] Notice:', err);
  }
}
