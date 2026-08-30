import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertTriangle, Database, Smartphone, ShieldCheck } from 'lucide-react';
import { getOfflineSyncQueue, processSyncQueue, getLastSyncTime, SyncItem } from '../utils/offlineSync';

export const OfflineSyncBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingItems, setPendingItems] = useState<SyncItem[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(getLastSyncTime());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Update online state & load pending sync queue
  const updateStatus = () => {
    setIsOnline(navigator.onLine);
    setPendingItems(getOfflineSyncQueue());
    setLastSync(getLastSyncTime());
  };

  useEffect(() => {
    updateStatus();

    const handleOnline = async () => {
      setIsOnline(true);
      setSyncMessage({ text: '⚡ Conexão reestabelecida! Iniciando sincronização automática...', type: 'info' });
      await handleSyncNow();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncMessage({
        text: '📶 Modo Offline Ativado. Todos os novos manejos serão armazenados com segurança no dispositivo.',
        type: 'info',
      });
    };

    const handleQueueUpdate = () => {
      setPendingItems(getOfflineSyncQueue());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('meliapp_sync_queue_updated', handleQueueUpdate);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('meliapp_sync_queue_updated', handleQueueUpdate);
    };
  }, []);

  const handleSyncNow = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncMessage(null);

    const result = await processSyncQueue();

    if (result.success) {
      setSyncMessage({
        text: result.message,
        type: 'success',
      });
    } else {
      setSyncMessage({
        text: result.message,
        type: 'error',
      });
    }

    setPendingItems(getOfflineSyncQueue());
    setLastSync(getLastSyncTime());
    setIsSyncing(false);

    // Auto-dismiss success message after 5s
    setTimeout(() => {
      setSyncMessage(null);
    }, 6000);
  };

  const formattedLastSync = lastSync
    ? new Date(lastSync).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : 'Nunca';

  return (
    <div className="bg-emerald-950 border-b border-emerald-800 text-white text-xs px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Status Indicator */}
        <div className="flex items-center space-x-3">
          <div
            className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${
              isOnline
                ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-600/50'
                : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                <span>Online (Conectado)</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-300" />
                <span>Modo Offline no Campo</span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-stone-300">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Fila local:{' '}
              <strong className={pendingItems.length > 0 ? 'text-amber-300 font-extrabold' : 'text-stone-200'}>
                {pendingItems.length} registro(s) pendentes
              </strong>
            </span>
          </div>
        </div>

        {/* Center / Right Action Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Last sync time */}
          <span className="hidden md:inline text-stone-400 text-[11px]">
            Última Sincronização: <strong className="text-stone-200 font-mono">{formattedLastSync}</strong>
          </span>

          {/* Sync Trigger Button */}
          {pendingItems.length > 0 && isOnline && (
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-3 py-1 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all text-[11px]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : `Sincronizar (${pendingItems.length})`}</span>
            </button>
          )}

          {/* Manual Toggle Details */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-300 hover:text-amber-300 text-[11px] underline flex items-center space-x-1"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>{isExpanded ? 'Ocultar PWA Info' : 'Info PWA & Sync'}</span>
          </button>
        </div>

      </div>

      {/* Toast Notification Banner */}
      {syncMessage && (
        <div
          className={`mt-2 p-2.5 rounded-xl border flex items-center justify-between text-xs animate-fadeIn ${
            syncMessage.type === 'success'
              ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100'
              : syncMessage.type === 'error'
              ? 'bg-rose-950/90 border-rose-500 text-rose-100'
              : 'bg-amber-950/90 border-amber-500 text-amber-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {syncMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            )}
            <span className="font-medium">{syncMessage.text}</span>
          </div>
          <button
            onClick={() => setSyncMessage(null)}
            className="text-stone-400 hover:text-white text-xs font-bold px-1.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Expanded PWA Details Dropdown */}
      {isExpanded && (
        <div className="mt-3 bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/60 text-stone-200 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
            <span className="font-bold text-amber-300 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Meliponicultura Sem Fronteiras • Suporte PWA Offline Ativado</span>
            </span>
            <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700">
              Service Worker Ativo
            </span>
          </div>

          <p className="text-[11px] text-stone-300 leading-relaxed">
            Este aplicativo utiliza a tecnologia <strong>PWA (Progressive Web App)</strong> com Service Worker e cache local. Você pode registrar colheitas de mel, inspeções técnicas, alimentação de enxames e divisões mesmo <strong>em áreas rurais sem sinal de internet</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
            <div className="bg-emerald-950/80 p-2 rounded-xl border border-emerald-800">
              <strong className="text-amber-300 block mb-0.5">1. Armazenamento Seguro</strong>
              <span className="text-stone-400">Todos os manejos são gravados no IndexedDB / LocalStorage do seu aparelho.</span>
            </div>
            <div className="bg-emerald-950/80 p-2 rounded-xl border border-emerald-800">
              <strong className="text-amber-300 block mb-0.5">2. Sincronização Automática</strong>
              <span className="text-stone-400">Assim que se conectar ao Wi-Fi ou rede celular, o app sincroniza a fila de campo.</span>
            </div>
            <div className="bg-emerald-950/80 p-2 rounded-xl border border-emerald-800">
              <strong className="text-amber-300 block mb-0.5">3. Instale na Tela Inicial</strong>
              <span className="text-stone-400">Clique no menu do navegador e selecione "Adicionar à Tela Inicial" para usar como app nativo.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
