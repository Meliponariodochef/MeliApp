import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MeliponariesView } from './components/MeliponariesView';
import { HivesView } from './components/HivesView';
import { ProductionView } from './components/ProductionView';
import { InspectionsFeedingView } from './components/InspectionsFeedingView';
import { DivisionsTrapsView } from './components/DivisionsTrapsView';
import { FloraCatalogView } from './components/FloraCatalogView';
import { SpeciesGuideView } from './components/SpeciesGuideView';
import { RemindersView } from './components/RemindersView';
import { MarketplaceView } from './components/MarketplaceView';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { QrCodeModal } from './components/QrCodeModal';
import { ExportBackupModal } from './components/ExportBackupModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AccessGateView } from './components/AccessGateView';
import { OfflineSyncBanner } from './components/OfflineSyncBanner';
import { queueSyncItem } from './utils/offlineSync';

import { 
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
} from './types';

import { 
  INITIAL_MELIPONARIES, 
  INITIAL_HIVES, 
  INITIAL_HARVESTS, 
  INITIAL_INSPECTIONS, 
  INITIAL_FEEDINGS, 
  INITIAL_DIVISIONS, 
  INITIAL_BAIT_TRAPS, 
  INITIAL_FLORA, 
  INITIAL_SPECIES,
  INITIAL_REMINDERS,
  INITIAL_MARKETPLACE_ITEMS
} from './data/mockData';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import {
  subscribeUserCollection,
  saveUserItem,
  deleteUserItem,
  subscribeMarketplaceItems,
  saveMarketplaceItem,
  deleteMarketplaceItem,
  restoreMarketplaceDefaults
} from './services/firestoreService';

function MeliponaryApp() {
  const { currentUser, userProfile, isAdmin, loading, setCloudSyncStatus } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeliponaryId, setSelectedMeliponaryId] = useState<string | undefined>(undefined);
  const [selectedHiveIdForReminder, setSelectedHiveIdForReminder] = useState<string | undefined>(undefined);

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedHiveForQr, setSelectedHiveForQr] = useState<Hive | null>(null);
  const [aiContext, setAiContext] = useState<any>(null);

  // Helper to isolate localStorage per authenticated user UID or guest
  const getStorageKey = (key: string) => {
    return currentUser ? `meliapp_${currentUser.uid}_${key}` : `meliapp_guest_${key}`;
  };

  // State
  const [meliponaries, setMeliponaries] = useState<Meliponary[]>([]);
  const [hives, setHives] = useState<Hive[]>([]);
  const [harvests, setHarvests] = useState<HarvestRecord[]>([]);
  const [inspections, setInspections] = useState<InspectionRecord[]>([]);
  const [feedings, setFeedings] = useState<FeedingRecord[]>([]);
  const [divisions, setDivisions] = useState<DivisionRecord[]>([]);
  const [traps, setTraps] = useState<BaitTrapRecord[]>([]);
  const [reminders, setReminders] = useState<ReminderRecord[]>([]);
  const [marketplaceSearchQuery, setMarketplaceSearchQuery] = useState<string>('');
  const [marketplaceCategory, setMarketplaceCategory] = useState<string>('all');
  const [marketplaceTargetItemId, setMarketplaceTargetItemId] = useState<string | null>(null);

  const [floraList, setFloraList] = useState<FloraItem[]>(() => {
    const FLORA_VERSION_KEY = 'meliapp_flora_version_v8';
    const hasCurrentVersion = localStorage.getItem(FLORA_VERSION_KEY);
    if (!hasCurrentVersion) {
      localStorage.setItem(FLORA_VERSION_KEY, 'true');
      localStorage.setItem('meliapp_flora', JSON.stringify(INITIAL_FLORA));
      return INITIAL_FLORA;
    }
    const saved = localStorage.getItem('meliapp_flora');
    if (saved) {
      try {
        const parsed: FloraItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 50) {
          return parsed;
        }
      } catch (err) {
        console.warn('Error parsing stored flora list:', err);
      }
    }
    localStorage.setItem('meliapp_flora', JSON.stringify(INITIAL_FLORA));
    return INITIAL_FLORA;
  });

  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem('meliapp_marketplace');
    const initialMap = new Map(INITIAL_MARKETPLACE_ITEMS.map(i => [i.id, i]));
    let deletedIds = new Set<string>();
    try {
      const rawDeleted = localStorage.getItem('meliapp_marketplace_deleted');
      if (rawDeleted) {
        const parsedDel = JSON.parse(rawDeleted);
        if (Array.isArray(parsedDel)) deletedIds = new Set(parsedDel);
      }
    } catch {}

    const itemMap = new Map<string, MarketplaceItem>();
    INITIAL_MARKETPLACE_ITEMS.forEach(i => {
      if (!deletedIds.has(i.id)) itemMap.set(i.id, i);
    });

    if (saved) {
      try {
        const parsed: MarketplaceItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach(i => {
            if (!deletedIds.has(i.id)) {
              if (i.id.startsWith('mkt-raizer-') && initialMap.has(i.id)) {
                const base = initialMap.get(i.id)!;
                itemMap.set(i.id, {
                  ...i,
                  priceBrl: base.priceBrl,
                  originalPriceBrl: base.originalPriceBrl,
                  unit: base.unit,
                  condition: base.condition,
                  description: base.description,
                  discountCoupon: base.discountCoupon,
                  affiliateUrl: base.affiliateUrl,
                });
              } else {
                itemMap.set(i.id, i);
              }
            }
          });
        }
      } catch {
        // fallback
      }
    }
    return Array.from(itemMap.values());
  });

  // Hydrate local cache based on current authenticated user or guest
  useEffect(() => {
    const key = currentUser ? currentUser.uid : 'guest';
    const savedMel = localStorage.getItem(`meliapp_${key}_meliponaries`);
    const savedHiv = localStorage.getItem(`meliapp_${key}_hives`);
    const savedHar = localStorage.getItem(`meliapp_${key}_harvests`);
    const savedInsp = localStorage.getItem(`meliapp_${key}_inspections`);
    const savedFeed = localStorage.getItem(`meliapp_${key}_feedings`);
    const savedDiv = localStorage.getItem(`meliapp_${key}_divisions`);
    const savedTrap = localStorage.getItem(`meliapp_${key}_traps`);
    const savedRem = localStorage.getItem(`meliapp_${key}_reminders`);

    setMeliponaries(savedMel ? JSON.parse(savedMel) : []);
    setHives(savedHiv ? JSON.parse(savedHiv) : []);
    setHarvests(savedHar ? JSON.parse(savedHar) : []);
    setInspections(savedInsp ? JSON.parse(savedInsp) : []);
    setFeedings(savedFeed ? JSON.parse(savedFeed) : []);
    setDivisions(savedDiv ? JSON.parse(savedDiv) : []);
    setTraps(savedTrap ? JSON.parse(savedTrap) : []);
    setReminders(savedRem ? JSON.parse(savedRem) : []);
  }, [currentUser]);

  // Scoped local storage caching
  useEffect(() => {
    localStorage.setItem(getStorageKey('meliponaries'), JSON.stringify(meliponaries));
  }, [meliponaries, currentUser]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('hives'), JSON.stringify(hives));
  }, [hives, currentUser]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('harvests'), JSON.stringify(harvests));
  }, [harvests, currentUser]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('inspections'), JSON.stringify(inspections));
  }, [inspections, currentUser]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('feedings'), JSON.stringify(feedings));
  }, [feedings, currentUser]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('divisions'), JSON.stringify(divisions));
  }, [divisions, currentUser]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('traps'), JSON.stringify(traps));
  }, [traps, currentUser]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('reminders'), JSON.stringify(reminders));
  }, [reminders, currentUser]);

  useEffect(() => {
    localStorage.setItem('meliapp_flora', JSON.stringify(floraList));
  }, [floraList]);

  useEffect(() => {
    localStorage.setItem('meliapp_marketplace', JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  // Real-time Firestore Subscriptions for Authenticated User Collections
  useEffect(() => {
    if (!currentUser) return;

    setCloudSyncStatus('syncing');

    const unsubMeliponaries = subscribeUserCollection<Meliponary>(
      currentUser.uid,
      'meliponaries',
      (items) => {
        setMeliponaries(items);
        setCloudSyncStatus('synced');
      }
    );

    const unsubHives = subscribeUserCollection<Hive>(
      currentUser.uid,
      'hives',
      (items) => {
        setHives(items);
      }
    );

    const unsubHarvests = subscribeUserCollection<HarvestRecord>(
      currentUser.uid,
      'harvests',
      (items) => {
        setHarvests(items);
      }
    );

    const unsubInspections = subscribeUserCollection<InspectionRecord>(
      currentUser.uid,
      'inspections',
      (items) => {
        setInspections(items);
      }
    );

    const unsubFeedings = subscribeUserCollection<FeedingRecord>(
      currentUser.uid,
      'feedings',
      (items) => {
        setFeedings(items);
      }
    );

    const unsubDivisions = subscribeUserCollection<DivisionRecord>(
      currentUser.uid,
      'divisions',
      (items) => {
        setDivisions(items);
      }
    );

    const unsubTraps = subscribeUserCollection<BaitTrapRecord>(
      currentUser.uid,
      'traps',
      (items) => {
        setTraps(items);
      }
    );

    const unsubReminders = subscribeUserCollection<ReminderRecord>(
      currentUser.uid,
      'reminders',
      (items) => {
        setReminders(items);
      }
    );

    const unsubFlora = subscribeUserCollection<FloraItem>(
      currentUser.uid,
      'flora',
      (items) => {
        // If user has saved flora in cloud, use it; otherwise provide default rich catalog
        if (items && items.length > 0) {
          setFloraList(items);
        }
      }
    );

    return () => {
      unsubMeliponaries();
      unsubHives();
      unsubHarvests();
      unsubInspections();
      unsubFeedings();
      unsubDivisions();
      unsubTraps();
      unsubReminders();
      unsubFlora();
    };
  }, [currentUser]);

  // Real-time Firestore Subscription for Global Marketplace
  useEffect(() => {
    const unsubMarketplace = subscribeMarketplaceItems(
      (firestoreItems) => {
        let localSaved: MarketplaceItem[] = [];
        try {
          const raw = localStorage.getItem('meliapp_marketplace');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) localSaved = parsed;
          }
        } catch {}

        let deletedIds = new Set<string>();
        try {
          const rawDeleted = localStorage.getItem('meliapp_marketplace_deleted');
          if (rawDeleted) {
            const parsedDel = JSON.parse(rawDeleted);
            if (Array.isArray(parsedDel)) deletedIds = new Set(parsedDel);
          }
        } catch {}

        const initialMap = new Map(INITIAL_MARKETPLACE_ITEMS.map(i => [i.id, i]));

        // 1. Initialize Map with all base initial items (140+ Raízer plants/seeds + partner items)
        const itemMap = new Map<string, MarketplaceItem>();
        INITIAL_MARKETPLACE_ITEMS.forEach(item => {
          if (!deletedIds.has(item.id)) {
            itemMap.set(item.id, item);
          }
        });

        // 2. Overlay / add local items (custom items or modifications)
        localSaved.forEach(item => {
          if (!deletedIds.has(item.id)) {
            if (item.id.startsWith('mkt-raizer-') && initialMap.has(item.id)) {
              const base = initialMap.get(item.id)!;
              itemMap.set(item.id, {
                ...item,
                priceBrl: base.priceBrl,
                originalPriceBrl: base.originalPriceBrl,
                unit: base.unit,
                condition: base.condition,
                description: base.description,
                discountCoupon: base.discountCoupon,
                affiliateUrl: base.affiliateUrl,
              });
            } else {
              itemMap.set(item.id, item);
            }
          }
        });

        // 3. Overlay / add firestore items (cloud persisted items)
        if (firestoreItems && firestoreItems.length > 0) {
          firestoreItems.forEach(item => {
            if (!deletedIds.has(item.id)) {
              if (item.id.startsWith('mkt-raizer-') && initialMap.has(item.id)) {
                const base = initialMap.get(item.id)!;
                itemMap.set(item.id, {
                  ...item,
                  priceBrl: base.priceBrl,
                  originalPriceBrl: base.originalPriceBrl,
                  unit: base.unit,
                  condition: base.condition,
                  description: base.description,
                  discountCoupon: base.discountCoupon,
                  affiliateUrl: base.affiliateUrl,
                });
              } else {
                itemMap.set(item.id, item);
              }
            }
          });
        }

        const merged = Array.from(itemMap.values());
        setMarketplaceItems(merged);
      },
      (err) => {
        console.warn('Marketplace subscription notice:', err);
      }
    );

    return () => unsubMarketplace();
  }, []);

  // Handlers for Marketplace
  const handleAddMarketplaceItem = async (newItem: Omit<MarketplaceItem, 'id' | 'createdAt'>) => {
    const created: MarketplaceItem = {
      ...newItem,
      id: `mkt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    // 1. Immediately update state
    setMarketplaceItems((prev) => [created, ...prev.filter(i => i.id !== created.id)]);
    
    // 2. Immediately update localStorage
    try {
      const currentSaved = localStorage.getItem('meliapp_marketplace');
      const list: MarketplaceItem[] = currentSaved ? JSON.parse(currentSaved) : [];
      const updatedList = [created, ...list.filter(i => i.id !== created.id)];
      localStorage.setItem('meliapp_marketplace', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('Error saving marketplace item to localStorage:', e);
    }

    // 3. Save to Firestore
    try {
      await saveMarketplaceItem(created);
    } catch (err) {
      console.warn('Error saving marketplace item to Firestore:', err);
    }
  };

  const handleUpdateMarketplaceItem = async (updatedItem: MarketplaceItem) => {
    // 1. Immediately update state
    setMarketplaceItems((prev) => prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    
    // 2. Immediately update localStorage
    try {
      const currentSaved = localStorage.getItem('meliapp_marketplace');
      const list: MarketplaceItem[] = currentSaved ? JSON.parse(currentSaved) : [];
      const updatedList = list.map((i) => (i.id === updatedItem.id ? updatedItem : i));
      localStorage.setItem('meliapp_marketplace', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('Error updating marketplace item in localStorage:', e);
    }

    // 3. Save to Firestore
    try {
      await saveMarketplaceItem(updatedItem);
    } catch (err) {
      console.warn('Error updating marketplace item in Firestore:', err);
    }
  };

  const handleDeleteMarketplaceItem = async (id: string) => {
    // 1. Immediately update state
    setMarketplaceItems((prev) => prev.filter((i) => i.id !== id));
    
    // 2. Immediately update localStorage & deleted tracker
    try {
      const rawDeleted = localStorage.getItem('meliapp_marketplace_deleted');
      const delList: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];
      if (!delList.includes(id)) {
        delList.push(id);
        localStorage.setItem('meliapp_marketplace_deleted', JSON.stringify(delList));
      }

      const currentSaved = localStorage.getItem('meliapp_marketplace');
      const list: MarketplaceItem[] = currentSaved ? JSON.parse(currentSaved) : [];
      const updatedList = list.filter((i) => i.id !== id);
      localStorage.setItem('meliapp_marketplace', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('Error deleting marketplace item in localStorage:', e);
    }

    // 3. Delete from Firestore
    try {
      await deleteMarketplaceItem(id);
    } catch (err) {
      console.warn('Error deleting marketplace item in Firestore:', err);
    }
  };

  const handleClearMarketplaceItems = () => {
    setMarketplaceItems([]);
    localStorage.setItem('meliapp_marketplace', JSON.stringify([]));
  };

  const handleRestoreDefaultCatalog = async () => {
    // 1. Clear deleted list
    localStorage.removeItem('meliapp_marketplace_deleted');
    // 2. Restore local state with all 140+ Raizer and partner items
    setMarketplaceItems(INITIAL_MARKETPLACE_ITEMS);
    // 3. Update localStorage
    localStorage.setItem('meliapp_marketplace', JSON.stringify(INITIAL_MARKETPLACE_ITEMS));
    // 4. Persist to Firestore
    try {
      await restoreMarketplaceDefaults();
    } catch (err) {
      console.warn('Error restoring default catalog in Firestore:', err);
    }
  };

  // Handlers for Flora
  const handleAddFlora = async (newPlant: Omit<FloraItem, 'id'>) => {
    const created: FloraItem = {
      ...newPlant,
      id: `flor-${Date.now()}`,
    };
    setFloraList([created, ...floraList]);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'flora', created);
    }
  };

  const handleUpdateFlora = async (updated: FloraItem) => {
    setFloraList(floraList.map((f) => (f.id === updated.id ? updated : f)));
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'flora', updated);
    }
  };

  const handleDeleteFlora = async (id: string) => {
    setFloraList(floraList.filter((f) => f.id !== id));
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'flora', id);
    }
  };

  const handleSyncRaizerFlora = async () => {
    setFloraList(INITIAL_FLORA);
    localStorage.setItem('meliapp_flora', JSON.stringify(INITIAL_FLORA));
    if (currentUser) {
      for (const item of INITIAL_FLORA) {
        await saveUserItem(currentUser.uid, 'flora', item);
      }
    }
  };

  // Handlers for Reminders
  const handleAddReminder = async (newRem: Omit<ReminderRecord, 'id' | 'createdAt'>) => {
    const created: ReminderRecord = {
      ...newRem,
      id: `rem-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setReminders([created, ...reminders]);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'reminders', created);
    }
  };

  const handleUpdateReminder = async (updated: ReminderRecord) => {
    setReminders(reminders.map((r) => (r.id === updated.id ? updated : r)));
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'reminders', updated);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'reminders', id);
    }
  };

  const handleToggleCompleteReminder = async (id: string) => {
    const target = reminders.find((r) => r.id === id);
    if (!target) return;
    const isDone = target.status === 'Concluído';
    const updated: ReminderRecord = {
      ...target,
      status: isDone ? 'Pendente' : 'Concluído',
      completedAt: isDone ? undefined : new Date().toISOString().split('T')[0],
    };
    setReminders(reminders.map((r) => (r.id === id ? updated : r)));
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'reminders', updated);
    }
  };

  // Handlers for Meliponaries
  const handleAddMeliponary = async (newMel: Omit<Meliponary, 'id' | 'createdAt'>) => {
    const created: Meliponary = {
      ...newMel,
      id: `mel-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setMeliponaries([created, ...meliponaries]);
    queueSyncItem('meliponary', 'CREATE', created);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'meliponaries', created);
    }
  };

  const handleUpdateMeliponary = async (updated: Meliponary) => {
    setMeliponaries(meliponaries.map((m) => (m.id === updated.id ? updated : m)));
    queueSyncItem('meliponary', 'UPDATE', updated);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'meliponaries', updated);
    }
  };

  const handleDeleteMeliponary = async (id: string) => {
    setMeliponaries(meliponaries.filter((m) => m.id !== id));
    queueSyncItem('meliponary', 'DELETE', { id });
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'meliponaries', id);
    }
  };

  // Handlers for Hives
  const handleAddHive = async (newHive: Omit<Hive, 'id' | 'qrCodeId'>) => {
    const created: Hive = {
      ...newHive,
      id: `hive-${Date.now()}`,
      qrCodeId: `QR-${newHive.code}-${new Date().getFullYear()}`,
    };
    setHives([created, ...hives]);
    queueSyncItem('hive', 'CREATE', created);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'hives', created);
    }
  };

  const handleUpdateHive = async (updated: Hive) => {
    setHives(hives.map((h) => (h.id === updated.id ? updated : h)));
    queueSyncItem('hive', 'UPDATE', updated);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'hives', updated);
    }
  };

  const handleDeleteHive = async (id: string) => {
    setHives(hives.filter((h) => h.id !== id));
    queueSyncItem('hive', 'DELETE', { id });
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'hives', id);
    }
  };

  // Handlers for Harvests
  const handleAddHarvest = async (newHarvest: Omit<HarvestRecord, 'id'>) => {
    const created: HarvestRecord = {
      ...newHarvest,
      id: `harv-${Date.now()}`,
    };
    setHarvests([created, ...harvests]);
    queueSyncItem('harvest', 'CREATE', created);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'harvests', created);
    }
  };

  const handleDeleteHarvest = async (id: string) => {
    setHarvests(harvests.filter((h) => h.id !== id));
    queueSyncItem('harvest', 'DELETE', { id });
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'harvests', id);
    }
  };

  // Handlers for Inspections & Feedings
  const handleAddInspection = async (newInsp: Omit<InspectionRecord, 'id'>) => {
    const created: InspectionRecord = {
      ...newInsp,
      id: `insp-${Date.now()}`,
    };
    setInspections([created, ...inspections]);
    queueSyncItem('inspection', 'CREATE', created);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'inspections', created);
    }
  };

  const handleDeleteInspection = async (id: string) => {
    setInspections(inspections.filter((i) => i.id !== id));
    queueSyncItem('inspection', 'DELETE', { id });
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'inspections', id);
    }
  };

  const handleAddFeeding = async (newFeed: Omit<FeedingRecord, 'id'>) => {
    const created: FeedingRecord = {
      ...newFeed,
      id: `feed-${Date.now()}`,
    };
    setFeedings([created, ...feedings]);
    queueSyncItem('feeding', 'CREATE', created);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'feedings', created);
    }
  };

  const handleDeleteFeeding = async (id: string) => {
    setFeedings(feedings.filter((f) => f.id !== id));
    queueSyncItem('feeding', 'DELETE', { id });
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'feedings', id);
    }
  };

  // Handlers for Divisions & Traps
  const handleAddDivision = async (newDiv: Omit<DivisionRecord, 'id'>) => {
    const created: DivisionRecord = {
      ...newDiv,
      id: `div-${Date.now()}`,
    };
    setDivisions([created, ...divisions]);
    queueSyncItem('division', 'CREATE', created);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'divisions', created);
    }
  };

  const handleDeleteDivision = async (id: string) => {
    setDivisions(divisions.filter((d) => d.id !== id));
    queueSyncItem('division', 'DELETE', { id });
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'divisions', id);
    }
  };

  const handleAddTrap = async (newTrap: Omit<BaitTrapRecord, 'id'>) => {
    const created: BaitTrapRecord = {
      ...newTrap,
      id: `trap-${Date.now()}`,
    };
    setTraps([created, ...traps]);
    queueSyncItem('trap', 'CREATE', created);
    if (currentUser) {
      await saveUserItem(currentUser.uid, 'traps', created);
    }
  };

  const handleDeleteTrap = async (id: string) => {
    setTraps(traps.filter((t) => t.id !== id));
    queueSyncItem('trap', 'DELETE', { id });
    if (currentUser) {
      await deleteUserItem(currentUser.uid, 'traps', id);
    }
  };

  // Import Backup
  const handleImportData = (data: any) => {
    if (data.meliponaries) setMeliponaries(data.meliponaries);
    if (data.hives) setHives(data.hives);
    if (data.harvests) setHarvests(data.harvests);
    if (data.inspections) setInspections(data.inspections);
    if (data.feedings) setFeedings(data.feedings);
    if (data.divisions) setDivisions(data.divisions);
    if (data.traps) setTraps(data.traps);
  };

  const handleNavigateToMarketplaceForPlant = (plant?: { plantName: string; id?: string }) => {
    if (plant) {
      setMarketplaceCategory('plantas_sementes');
      setMarketplaceSearchQuery(plant.plantName);
      if (plant.id) {
        setMarketplaceTargetItemId(`mkt-raizer-${plant.id}`);
      } else {
        setMarketplaceTargetItemId(null);
      }
    } else {
      setMarketplaceCategory('all');
      setMarketplaceSearchQuery('');
      setMarketplaceTargetItemId(null);
    }
    setActiveTab('marketplace');
  };

  const urgentAlertsCount = hives.filter(h => h.strength <= 2 || h.queenStatus.includes('Sem Rainha')).length;
  const pendingRemindersCount = reminders.filter(r => r.status === 'Pendente' || r.status === 'Atrasado').length;

  // Access Gating: While verifying authentication state on boot
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 p-0.5 shadow-2xl animate-pulse">
          <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center overflow-hidden">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.5L20 7.1V16.9L12 21.5L4 16.9V7.1L12 2.5Z" stroke="#F59E0B" strokeWidth="1.8" strokeLinejoin="round" fill="#183d2e" fillOpacity="0.6" />
              <path d="M12 6.5C9.8 9 8.5 11.2 8.5 13.5C8.5 15.4 10.1 17 12 17C13.9 17 15.5 15.4 15.5 13.5C15.5 11.2 14.2 9 12 6.5Z" fill="#10B981" fillOpacity="0.85" />
              <path d="M7.5 11.5C9 10 11 9.5 12.5 9.5C14 9.5 16 10 17.5 11.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-emerald-300 font-sans tracking-wide">
          <span className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Iniciando ambiente seguro MeliApp...</span>
        </div>
      </div>
    );
  }

  // Access Gating: Block app usage until user signs in
  if (!currentUser) {
    return <AccessGateView />;
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] dark:bg-[#121417] text-stone-900 dark:text-stone-100 font-sans flex flex-col selection:bg-emerald-700 selection:text-white transition-colors duration-200">
      
      {/* Offline PWA Status Banner */}
      <OfflineSyncBanner />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQrScanner={() => {
          setSelectedHiveForQr(hives[0] || null);
          setIsQrModalOpen(true);
        }}
        onOpenAiAdvisor={() => {
          setAiContext(null);
          setIsAiModalOpen(true);
        }}
        onOpenExport={() => setIsExportModalOpen(true)}
        urgentAlertsCount={urgentAlertsCount}
        pendingRemindersCount={pendingRemindersCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {activeTab === 'dashboard' && (
          <DashboardView
            hives={hives}
            meliponaries={meliponaries}
            harvests={harvests}
            inspections={inspections}
            speciesList={INITIAL_SPECIES}
            reminders={reminders}
            setActiveTab={setActiveTab}
            onNewHarvest={() => setActiveTab('production')}
            onNewHive={() => setActiveTab('hives')}
            onNewInspection={() => setActiveTab('inspections')}
            onOpenAiAdvisor={() => {
              setAiContext(null);
              setIsAiModalOpen(true);
            }}
            onToggleReminderComplete={handleToggleCompleteReminder}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersView
            reminders={reminders}
            hives={hives}
            meliponaries={meliponaries}
            onAddReminder={handleAddReminder}
            onUpdateReminder={handleUpdateReminder}
            onDeleteReminder={handleDeleteReminder}
            onToggleComplete={handleToggleCompleteReminder}
            preselectedHiveId={selectedHiveIdForReminder}
          />
        )}

        {activeTab === 'meliponaries' && (
          <MeliponariesView
            meliponaries={meliponaries}
            hives={hives}
            onAddMeliponary={handleAddMeliponary}
            onUpdateMeliponary={handleUpdateMeliponary}
            onDeleteMeliponary={handleDeleteMeliponary}
            onSelectMeliponaryForHives={(melId) => {
              setSelectedMeliponaryId(melId);
              setActiveTab('hives');
            }}
          />
        )}

        {activeTab === 'hives' && (
          <HivesView
            hives={hives}
            meliponaries={meliponaries}
            speciesList={INITIAL_SPECIES}
            selectedMeliponaryId={selectedMeliponaryId}
            onAddHive={handleAddHive}
            onUpdateHive={handleUpdateHive}
            onDeleteHive={handleDeleteHive}
            onSelectHiveForQrTag={(hive) => {
              setSelectedHiveForQr(hive);
              setIsQrModalOpen(true);
            }}
            onScheduleReminderForHive={(hiveOrId) => {
              const id = typeof hiveOrId === 'string' ? hiveOrId : hiveOrId?.id;
              setSelectedHiveIdForReminder(id);
              setActiveTab('reminders');
            }}
          />
        )}

        {activeTab === 'species' && (
          <SpeciesGuideView
            speciesList={INITIAL_SPECIES}
            hives={hives}
            onSelectSpeciesForNewHive={(speciesId) => {
              setActiveTab('hives');
            }}
            onOpenAiAdvisor={(queryText) => {
              setAiContext({ speciesQuery: queryText });
              setIsAiModalOpen(true);
            }}
          />
        )}

        {activeTab === 'production' && (
          <ProductionView
            harvests={harvests}
            hives={hives}
            meliponaries={meliponaries}
            onAddHarvest={handleAddHarvest}
            onDeleteHarvest={handleDeleteHarvest}
          />
        )}

        {activeTab === 'inspections' && (
          <InspectionsFeedingView
            inspections={inspections}
            feedings={feedings}
            hives={hives}
            onAddInspection={handleAddInspection}
            onAddFeeding={handleAddFeeding}
            onDeleteInspection={handleDeleteInspection}
            onDeleteFeeding={handleDeleteFeeding}
            onOpenAiAdvisorWithContext={(context) => {
              setAiContext(context);
              setIsAiModalOpen(true);
            }}
          />
        )}

        {activeTab === 'divisions' && (
          <DivisionsTrapsView
            divisions={divisions}
            traps={traps}
            hives={hives}
            speciesList={INITIAL_SPECIES}
            onAddDivision={handleAddDivision}
            onAddTrap={handleAddTrap}
            onDeleteDivision={handleDeleteDivision}
            onDeleteTrap={handleDeleteTrap}
          />
        )}

        {activeTab === 'flora' && (
          <FloraCatalogView
            floraList={floraList}
            speciesList={INITIAL_SPECIES}
            onAddFlora={handleAddFlora}
            onUpdateFlora={handleUpdateFlora}
            onDeleteFlora={handleDeleteFlora}
            onSyncRaizer={handleSyncRaizerFlora}
            onNavigateToMarketplace={handleNavigateToMarketplaceForPlant}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            items={marketplaceItems}
            onAddItem={handleAddMarketplaceItem}
            onUpdateItem={handleUpdateMarketplaceItem}
            onDeleteItem={handleDeleteMarketplaceItem}
            onClearItems={handleClearMarketplaceItems}
            onRestoreDefaultCatalog={handleRestoreDefaultCatalog}
            initialSearchQuery={marketplaceSearchQuery}
            initialCategory={marketplaceCategory}
            targetItemId={marketplaceTargetItemId}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200 py-6 text-center text-xs border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-bold font-serif text-amber-300 flex items-center space-x-1.5">
            <span>MeliApp</span>
            <span className="text-emerald-400 font-sans font-normal">• Gestão Sustentável de Meliponários e Abelhas Sem Ferrão</span>
          </span>
          <p className="text-emerald-300/80">
            Focado em Meliponicultura Nativa, Preservação Florestal, Controle de Mel e Manejos de ASF.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AiAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialContext={aiContext}
      />

      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        hive={selectedHiveForQr}
        hives={hives}
        speciesList={INITIAL_SPECIES}
        onSelectHiveFromScan={(hiveId) => {
          setActiveTab('hives');
        }}
        onNavigateToInspection={(hiveId) => {
          setActiveTab('inspections');
        }}
        onNavigateToFeeding={(hiveId) => {
          setActiveTab('inspections');
        }}
        onNavigateToReminder={(hiveId) => {
          setSelectedHiveIdForReminder(hiveId);
          setActiveTab('reminders');
        }}
        onOpenAddHiveWithCode={(code) => {
          setActiveTab('hives');
        }}
      />

      <ExportBackupModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        hives={hives}
        meliponaries={meliponaries}
        harvests={harvests}
        inspections={inspections}
        feedings={feedings}
        onImportData={handleImportData}
      />

      {/* Auth & Profile Modals */}
      <AuthModal />
      <UserProfileModal
        hives={hives}
        meliponaries={meliponaries}
        harvests={harvests}
        inspections={inspections}
        feedings={feedings}
        divisions={divisions}
        traps={traps}
        reminders={reminders}
        floraList={floraList}
        marketplaceItems={marketplaceItems}
        onImportData={handleImportData}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MeliponaryApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
