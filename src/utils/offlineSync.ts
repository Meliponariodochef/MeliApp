export interface SyncItem {
  id: string;
  entityType: 'harvest' | 'inspection' | 'feeding' | 'division' | 'trap' | 'hive' | 'meliponary' | 'reminder';
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
  timestamp: string;
  synced?: boolean;
}

const QUEUE_STORAGE_KEY = 'meliapp_offline_sync_queue';
const LAST_SYNC_KEY = 'meliapp_last_successful_sync';

// Get current pending sync queue
export function getOfflineSyncQueue(): SyncItem[] {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Erro ao ler fila offline:', err);
    return [];
  }
}

// Save queue to localStorage
export function saveOfflineSyncQueue(queue: SyncItem[]): void {
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
    // Dispatch custom event to notify React UI listeners
    window.dispatchEvent(new Event('meliapp_sync_queue_updated'));
  } catch (err) {
    console.error('Erro ao salvar fila offline:', err);
  }
}

// Add an item to sync queue
export function queueSyncItem(
  entityType: SyncItem['entityType'],
  action: SyncItem['action'],
  data: any
): SyncItem {
  const item: SyncItem = {
    id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    entityType,
    action,
    data,
    timestamp: new Date().toISOString(),
    synced: false,
  };

  const currentQueue = getOfflineSyncQueue();
  const updatedQueue = [item, ...currentQueue];
  saveOfflineSyncQueue(updatedQueue);

  // Try background sync registration if SW is active
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((reg: any) => {
      reg.sync?.register('sync-management-data').catch(() => {});
    });
  }

  return item;
}

// Get last successful sync timestamp
export function getLastSyncTime(): string | null {
  return localStorage.getItem(LAST_SYNC_KEY);
}

// Perform sync process with server
export async function processSyncQueue(): Promise<{
  success: boolean;
  syncedCount: number;
  message: string;
}> {
  if (!navigator.onLine) {
    return {
      success: false,
      syncedCount: 0,
      message: 'Dispositivo desconectado da internet. Registro mantido seguro na fila local.',
    };
  }

  const queue = getOfflineSyncQueue();
  if (queue.length === 0) {
    return {
      success: true,
      syncedCount: 0,
      message: 'Todos os manejos já estão 100% sincronizados!',
    };
  }

  try {
    const response = await fetch('/api/sync/management', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: queue }),
    });

    if (response.ok) {
      const result = await response.json();
      // Clear processed queue
      saveOfflineSyncQueue([]);
      const nowIso = new Date().toISOString();
      localStorage.setItem(LAST_SYNC_KEY, nowIso);

      return {
        success: true,
        syncedCount: queue.length,
        message: `${queue.length} manejo(s) e registros de campo sincronizados com sucesso com o servidor!`,
      };
    } else {
      // Server returned error status
      return {
        success: false,
        syncedCount: 0,
        message: 'Servidor indisponível temporariamente. Os registros permanecem protegidos offline.',
      };
    }
  } catch (err: any) {
    console.warn('Falha na comunicação de sincronização:', err);
    return {
      success: false,
      syncedCount: 0,
      message: 'Falha de conexão durante o envio. Seus dados estão preservados no armazenamento do dispositivo.',
    };
  }
}
