import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Shield,
  Crown,
  MapPin,
  Phone,
  Home,
  Save,
  LogOut,
  Database,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Sun,
  Moon,
  Download,
  Upload,
  HardDrive,
  FileJson,
  FolderArchive,
  RefreshCw,
  Box,
  Layers,
  Calendar,
  Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
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
} from '../types';

interface UserProfileModalProps {
  hives?: Hive[];
  meliponaries?: Meliponary[];
  harvests?: HarvestRecord[];
  inspections?: InspectionRecord[];
  feedings?: FeedingRecord[];
  divisions?: DivisionRecord[];
  traps?: BaitTrapRecord[];
  reminders?: ReminderRecord[];
  floraList?: FloraItem[];
  marketplaceItems?: MarketplaceItem[];
  onImportData?: (data: any) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  hives: propHives,
  meliponaries: propMeliponaries,
  harvests: propHarvests,
  inspections: propInspections,
  feedings: propFeedings,
  divisions: propDivisions,
  traps: propTraps,
  reminders: propReminders,
  floraList: propFlora,
  marketplaceItems: propMarketplace,
  onImportData
}) => {
  const { 
    currentUser, 
    userProfile, 
    isAdmin, 
    isProfileModalOpen, 
    closeProfileModal, 
    updateProfileData, 
    logout,
    cloudSyncStatus 
  } = useAuth();
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [meliponaryName, setMeliponaryName] = useState(userProfile?.meliponaryName || '');
  const [cityState, setCityState] = useState(userProfile?.cityState || '');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState(userProfile?.phoneWhatsapp || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Backup & Export feedback states
  const [backupDownloaded, setBackupDownloaded] = useState(false);
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isProfileModalOpen || !userProfile) return null;

  // Retrieve full dataset either from props or localStorage
  const getFullBackupData = () => {
    const key = currentUser ? currentUser.uid : 'guest';

    const getLocal = (name: string, fallback: any) => {
      try {
        const item = localStorage.getItem(`meliapp_${key}_${name}`) || localStorage.getItem(`meliapp_${name}`);
        return item ? JSON.parse(item) : fallback;
      } catch {
        return fallback;
      }
    };

    const finalMeliponaries = propMeliponaries ?? getLocal('meliponaries', []);
    const finalHives = propHives ?? getLocal('hives', []);
    const finalHarvests = propHarvests ?? getLocal('harvests', []);
    const finalInspections = propInspections ?? getLocal('inspections', []);
    const finalFeedings = propFeedings ?? getLocal('feedings', []);
    const finalDivisions = propDivisions ?? getLocal('divisions', []);
    const finalTraps = propTraps ?? getLocal('traps', []);
    const finalReminders = propReminders ?? getLocal('reminders', []);
    const finalFlora = propFlora ?? getLocal('flora', []);
    const finalMarketplace = propMarketplace ?? getLocal('marketplace', []);

    return {
      appName: 'MeliApp • Meliponicultura Sustentável',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      user: {
        uid: userProfile.uid,
        email: userProfile.email,
        displayName: userProfile.displayName,
        meliponaryName: userProfile.meliponaryName,
        cityState: userProfile.cityState,
        phoneWhatsapp: userProfile.phoneWhatsapp,
        bio: userProfile.bio,
        role: userProfile.role,
      },
      stats: {
        meliponariesCount: finalMeliponaries.length,
        hivesCount: finalHives.length,
        harvestsCount: finalHarvests.length,
        inspectionsCount: finalInspections.length,
        feedingsCount: finalFeedings.length,
        divisionsCount: finalDivisions.length,
        trapsCount: finalTraps.length,
        remindersCount: finalReminders.length,
      },
      meliponaries: finalMeliponaries,
      hives: finalHives,
      harvests: finalHarvests,
      inspections: finalInspections,
      feedings: finalFeedings,
      divisions: finalDivisions,
      traps: finalTraps,
      reminders: finalReminders,
      flora: finalFlora,
      marketplace: finalMarketplace,
    };
  };

  const handleDownloadBackup = () => {
    try {
      const backupData = getFullBackupData();
      const dateSlug = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const fileName = `meliapp_backup_${userProfile.displayName ? userProfile.displayName.toLowerCase().replace(/\s+/g, '_') : 'meliponario'}_${dateSlug}.json`;

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);

      setBackupDownloaded(true);
      setImportMessage({
        type: 'success',
        text: `Backup baixado com sucesso! Arquivo: ${fileName}`
      });

      setTimeout(() => {
        setBackupDownloaded(false);
      }, 4000);
    } catch (err: any) {
      console.error('Error generating backup:', err);
      setImportMessage({
        type: 'error',
        text: 'Erro ao gerar arquivo de backup. Tente novamente.'
      });
    }
  };

  const handleRestoreJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.hives || parsed.meliponaries || Array.isArray(parsed)) {
          if (onImportData) {
            onImportData(parsed);
          }
          setImportMessage({
            type: 'success',
            text: 'Backup importado e restaurado com sucesso no meliponário!'
          });
        } else {
          setImportMessage({
            type: 'error',
            text: 'Estrutura de arquivo de backup JSON incompatível.'
          });
        }
      } catch {
        setImportMessage({
          type: 'error',
          text: 'Falha ao interpretar o arquivo JSON selecionado.'
        });
      }
    };
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      await updateProfileData({
        displayName: displayName.trim(),
        meliponaryName: meliponaryName.trim(),
        cityState: cityState.trim(),
        phoneWhatsapp: phoneWhatsapp.trim(),
        bio: bio.trim(),
      });
      setSavedSuccess(true);
      setTimeout(() => {
        closeProfileModal();
      }, 1200);
    } catch (err: any) {
      setError(err?.message || 'Erro ao salvar alterações do perfil.');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      closeProfileModal();
    } catch (err) {
      console.error('Erro ao sair:', err);
    } finally {
      setLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const backupDataPreview = getFullBackupData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-amber-200/60 dark:border-stone-800 flex flex-col relative max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={closeProfileModal}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 p-1.5 rounded-full transition-colors z-10 cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-yellow-700 dark:from-emerald-950 dark:via-stone-900 dark:to-amber-950 px-6 py-6 text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-amber-500/20 backdrop-blur-md flex items-center justify-center border border-white/30 dark:border-amber-400/30 text-white font-bold text-2xl shadow-md">
              {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : '🐝'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif leading-tight text-white">
                  {userProfile.displayName || 'Meliponicultor'}
                </h2>
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-stone-900 shadow-xs">
                    <Crown className="w-3.5 h-3.5 fill-current" />
                    Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/80 text-white shadow-xs">
                    <Shield className="w-3.5 h-3.5" />
                    Meliponicultor
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-100 dark:text-amber-200/90 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {userProfile.email}
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Status and Role Banner */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            isAdmin 
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200' 
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
              {isAdmin ? (
                <>
                  <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Conta de Administrador do App</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Conta de Meliponicultor Individual</span>
                </>
              )}
            </div>
            <p>
              {isAdmin
                ? 'Você tem acesso e permissão exclusiva para cadastrar, editar e gerenciar todos os produtos e anúncios de afiliados no Marketplace, além de administrar o meliponário.'
                : 'Seus dados de colmeias, colheitas, inspeções e divisões são mantidos de forma individualizada e privada no banco de dados na nuvem.'}
            </p>
          </div>

          {/* Theme Selector (Light / Dark Mode) */}
          <div className="p-4 bg-stone-50 dark:bg-stone-800/70 rounded-xl border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Aparência & Tema Visual
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Alterne entre modo diurno e noturno para melhor contraste em manejos de campo.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  !isDark
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Modo Claro (Diurno)</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Modo Escuro (Noturno)</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEDICATED BACKUP & DATA SAFETY SECTION IN SETTINGS */}
          {/* ========================================================================= */}
          <div className="p-4 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-stone-50 dark:from-stone-800/90 dark:via-stone-800/60 dark:to-stone-900 rounded-xl border-2 border-amber-300/80 dark:border-amber-700/60 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-emerald-950 flex items-center justify-center shadow-xs">
                  <FileJson className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span>Backup de Segurança dos Dados</span>
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-md">JSON</span>
                  </h3>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300">
                    Gere uma cópia completa de todos os seus registros para guardar offline com segurança.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick summary metrics */}
            <div className="grid grid-cols-3 gap-2 bg-white dark:bg-stone-900/80 p-2.5 rounded-lg border border-amber-200/80 dark:border-stone-700 text-center text-[10px]">
              <div>
                <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">
                  {backupDataPreview.stats.hivesCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400">Colmeias</span>
              </div>
              <div>
                <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">
                  {backupDataPreview.stats.harvestsCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400">Colheitas</span>
              </div>
              <div>
                <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">
                  {backupDataPreview.stats.inspectionsCount + backupDataPreview.stats.feedingsCount + backupDataPreview.stats.divisionsCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400">Manejos</span>
              </div>
            </div>

            {/* Notification / Toast inside section */}
            {importMessage && (
              <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                importMessage.type === 'success'
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
              }`}>
                {importMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <span className="flex-1">{importMessage.text}</span>
              </div>
            )}

            {/* Action Buttons for Backup & Restore */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                id="btn-settings-download-backup"
                onClick={handleDownloadBackup}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300 active:scale-[0.99]"
              >
                {backupDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                    <span>Backup Concluído!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
                    <span>Baixar Backup (JSON)</span>
                  </>
                )}
              </button>

              <label className="w-full py-2.5 px-3 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-600 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs">
                <Upload className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                <span>Restaurar JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreJsonFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-xl text-sm flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {savedSuccess && (
            <div className="p-4 bg-emerald-500 text-white rounded-xl text-sm font-semibold flex items-center gap-3 shadow-lg shadow-emerald-600/20 animate-fade-in border border-emerald-400">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Dados salvos com sucesso!</p>
                <p className="text-xs text-emerald-100 font-normal">Sincronizado na nuvem. Retornando ao aplicativo...</p>
              </div>
            </div>
          )}

          {/* Profile Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Nome de Exibição
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition-all"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Nome do Meliponário
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={meliponaryName}
                    onChange={(e) => setMeliponaryName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition-all"
                    placeholder="Ex: Meliponário Flor Nativa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Cidade / UF
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition-all"
                    placeholder="Ex: Curitiba / PR"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                WhatsApp de Contato
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={phoneWhatsapp}
                  onChange={(e) => setPhoneWhatsapp(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Biografia / Observações
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition-all"
                placeholder="Breve descrição do seu meliponário ou espécies criadas..."
              />
            </div>

            {/* Cloud Database Connection Info */}
            <div className="p-3 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Status da Nuvem:</span>
              </div>
              <span className="font-semibold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Firestore Conectado
              </span>
            </div>

            {/* Logout Confirmation Box */}
            {showLogoutConfirm && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl animate-fade-in space-y-3 text-stone-800 dark:text-stone-200">
                <div className="flex items-center gap-2.5 text-rose-800 dark:text-rose-300 font-bold text-sm">
                  <LogOut className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Deseja realmente sair da sua conta?</span>
                </div>
                <p className="text-xs text-rose-700 dark:text-rose-300/80 leading-relaxed">
                  Sua sessão será encerrada com segurança. Seus dados estão salvos no Firestore e estarão disponíveis quando você retornar.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    disabled={loggingOut}
                    onClick={handleConfirmLogout}
                    className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {loggingOut ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sim, Desconectar</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={loggingOut}
                    onClick={() => setShowLogoutConfirm(false)}
                    className="py-2 px-4 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={saving || savedSuccess}
                className={`flex-1 py-3 px-4 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 ${
                  savedSuccess 
                    ? 'bg-emerald-600 shadow-md shadow-emerald-600/30' 
                    : 'bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-md active:scale-[0.99]'
                }`}
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>Salvo com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Salvar Dados</span>
                  </>
                )}
              </button>

              {!showLogoutConfirm && (
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="py-2.5 px-4 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da Conta</span>
                </button>
              )}
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
