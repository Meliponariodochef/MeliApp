import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Box, 
  MapPin, 
  Droplets, 
  ClipboardCheck, 
  GitFork, 
  Flower2, 
  BookOpen,
  Sparkles, 
  QrCode, 
  Download,
  Bell,
  TreePine,
  ShoppingBag,
  User,
  LogIn,
  LogOut,
  Crown,
  Shield,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQrScanner: () => void;
  onOpenAiAdvisor: () => void;
  onOpenExport: () => void;
  urgentAlertsCount: number;
  pendingRemindersCount?: number;
}

const MeliAppLogo = () => (
  <div className="flex items-center space-x-2 sm:space-x-3 group min-w-0">
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0">
      <div className="w-full h-full bg-emerald-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-emerald-500/10 to-transparent" />
        
        {/* Logo SVG Icon: Honeycomb + Stingless Bee + Forest Leaf */}
        <svg className="w-4.5 h-4.5 sm:w-6 sm:h-6 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Honeycomb Hexagon Frame */}
          <path d="M12 2.5L20 7.1V16.9L12 21.5L4 16.9V7.1L12 2.5Z" stroke="#F59E0B" strokeWidth="1.8" strokeLinejoin="round" fill="#183d2e" fillOpacity="0.6" />
          
          {/* Central Leaf (Forest Iconography) */}
          <path d="M12 6.5C9.8 9 8.5 11.2 8.5 13.5C8.5 15.4 10.1 17 12 17C13.9 17 15.5 15.4 15.5 13.5C15.5 11.2 14.2 9 12 6.5Z" fill="#10B981" fillOpacity="0.85" />
          
          {/* Stingless Bee Wings & Gold Stripe */}
          <path d="M7.5 11.5C9 10 11 9.5 12.5 9.5C14 9.5 16 10 17.5 11.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9 13.8H15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="14" r="1.3" fill="#FEF08A" />
        </svg>
      </div>
    </div>

    <div className="min-w-0">
      <div className="flex items-center space-x-1 sm:space-x-2">
        <span className="font-extrabold text-base sm:text-2xl tracking-tight text-white font-serif drop-shadow-xs truncate">MeliApp</span>
        <span className="bg-emerald-800/80 text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full font-bold border border-amber-400/30 flex items-center shrink-0">
          <TreePine className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 inline mr-0.5" />
          <span>ASF</span>
        </span>
      </div>
      <p className="text-[10px] sm:text-[11px] text-emerald-200/90 font-medium hidden lg:block truncate">
        Gestão Sustentável de Meliponários & Conservação
      </p>
    </div>
  </div>
);

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  desc?: string;
  badge?: number;
  badgeText?: string;
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQrScanner,
  onOpenAiAdvisor,
  onOpenExport,
  urgentAlertsCount,
  pendingRemindersCount = 0,
}) => {
  const { currentUser, userProfile, isAdmin, openAuthModal, openProfileModal, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const navCategories: NavCategory[] = [
    {
      name: 'Gestão & Meliponário',
      items: [
        { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard, desc: 'Visão unificada das colmeias e métricas' },
        { id: 'reminders', label: 'Lembretes & Alertas', icon: Bell, badge: pendingRemindersCount, desc: 'Agendamentos e vistorias pendentes' },
        { id: 'meliponaries', label: 'Meliponários', icon: MapPin, desc: 'Gestão de locais, sítios e fazendas' },
        { id: 'hives', label: 'Colmeias / Caixas', icon: Box, desc: 'Cadastro de colônias, discos e caixas INPA' },
      ]
    },
    {
      name: 'Manejo Zootécnico & Mel',
      items: [
        { id: 'production', label: 'Produção & Mel', icon: Droplets, desc: 'Colheitas, pesagem e índice de umidade' },
        { id: 'inspections', label: 'Inspeções & Manejos', icon: ClipboardCheck, badge: urgentAlertsCount, desc: 'Alimentação, postura e sanidade' },
        { id: 'divisions', label: 'Divisões & Iscas PET', icon: GitFork, desc: 'Multiplicações e monitoramento de iscas' },
      ]
    },
    {
      name: 'Biodiversidade & Mercado',
      items: [
        { id: 'species', label: 'Guia de Espécies ASF', icon: BookOpen, desc: 'Catálogo de abelhas nativas sem ferrão' },
        { id: 'flora', label: 'Flora Meliponófila', icon: Flower2, desc: 'Árvores e arbustos nativos para pasto' },
        { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, badgeText: 'Oficial', desc: 'Comércio de colônias, matrizes e caixas' },
      ]
    }
  ];

  const allNavItems = navCategories.flatMap(cat => cat.items);

  // Check scroll position to display subtle scroll indicator arrows
  const checkScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, []);

  // Center active tab when it changes on mobile
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeButton = scrollContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -180 : 180;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <header className="bg-emerald-950 text-emerald-50 shadow-md sticky top-0 z-40 border-b border-emerald-800/80 select-none">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-16 py-1 gap-1.5 sm:gap-3">
          
          {/* Logo & Branding */}
          <div className="cursor-pointer shrink-0 min-w-0" onClick={() => handleSelectTab('dashboard')}>
            <MeliAppLogo />
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            
            {/* AI Advisor Button */}
            <button
              onClick={onOpenAiAdvisor}
              title="Assistente MeliBot IA"
              className="flex items-center space-x-1 sm:space-x-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-emerald-950 px-1.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all transform hover:scale-[1.02] border border-amber-300/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-950 fill-amber-200 shrink-0" />
              <span className="hidden sm:inline">MeliBot IA</span>
              <span className="sm:hidden text-[10px] font-black">IA</span>
            </button>

            {/* QR Code Scanner / Generator */}
            <button
              onClick={onOpenQrScanner}
              title="Escanear ou Imprimir Tag QR"
              className="p-1.5 sm:p-2 bg-emerald-900/90 hover:bg-emerald-800 text-amber-200 rounded-lg sm:rounded-xl transition-colors border border-emerald-700/60 flex items-center space-x-1 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="text-xs hidden md:inline font-semibold">Tag QR</span>
            </button>

            {/* Data Export / Backup */}
            <button
              onClick={onOpenExport}
              title="Relatórios e Backup"
              className="p-1.5 sm:p-2 bg-emerald-900/90 hover:bg-emerald-800 text-amber-200 rounded-lg sm:rounded-xl transition-colors border border-emerald-700/60 flex items-center cursor-pointer hidden sm:flex"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>

            {/* Dark Mode Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Mudar para Modo Claro (Diurno)" : "Mudar para Modo Escuro / Manejo Noturno"}
              aria-label={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
              className="p-1.5 sm:p-2 bg-emerald-900/90 hover:bg-emerald-800 text-amber-300 hover:text-amber-200 rounded-lg sm:rounded-xl transition-all border border-emerald-700/60 flex items-center cursor-pointer group"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 group-hover:-rotate-12 transition-transform duration-300 shrink-0" />
              )}
            </button>

            {/* Auth / User Profile Button */}
            {currentUser && userProfile ? (
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <button
                  onClick={openProfileModal}
                  className="flex items-center space-x-1 bg-emerald-900/90 hover:bg-emerald-800 text-white p-1 sm:pl-2 sm:pr-2.5 sm:py-1 rounded-lg sm:rounded-xl transition-all border border-emerald-700/70 shadow-xs cursor-pointer group"
                  title="Meu Perfil & Meliponário"
                >
                  <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md sm:rounded-lg bg-amber-500 text-stone-900 font-bold flex items-center justify-center text-[11px] sm:text-xs shadow-xs shrink-0">
                    {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold leading-tight flex items-center gap-1">
                      <span>{userProfile.displayName?.split(' ')[0] || 'Usuário'}</span>
                      {isAdmin ? (
                        <Crown className="w-3 h-3 text-amber-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center space-x-1 bg-amber-500 hover:bg-amber-400 text-stone-900 px-1.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer border border-amber-300 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="text-[10px] sm:text-xs font-black">Entrar</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all border flex items-center justify-center cursor-pointer relative md:hidden shrink-0 ${
                mobileMenuOpen 
                  ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold shadow-md' 
                  : 'bg-emerald-900/90 text-amber-300 hover:text-white border-emerald-700/60'
              }`}
              title={mobileMenuOpen ? "Fechar Menu" : "Abrir Menu Completo"}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu de Navegação"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              
              {/* Badge indicator on hamburger if there are pending alerts */}
              {!mobileMenuOpen && (pendingRemindersCount > 0 || urgentAlertsCount > 0) && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-emerald-950 animate-pulse" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Navigation Sub-bar with Smooth Horizontal Scroll on Mobile & Spacious Row on Desktop */}
      <div className="bg-[#0b241a]/95 border-t border-emerald-800/50 backdrop-blur-xs relative">
        
        {/* Scroll Left Helper Button (Visible when scrolled on mobile/tablet) */}
        {showLeftArrow && (
          <button
            onClick={() => scrollNav('left')}
            aria-label="Rolar abas para a esquerda"
            className="absolute left-0 top-0 bottom-0 z-10 px-1 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-transparent flex items-center text-amber-400 hover:text-white transition-opacity md:hidden cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 drop-shadow-sm" />
          </button>
        )}

        {/* Scroll Right Helper Button (Visible when more content is available on mobile/tablet) */}
        {showRightArrow && (
          <button
            onClick={() => scrollNav('right')}
            aria-label="Rolar abas para a direita"
            className="absolute right-0 top-0 bottom-0 z-10 px-1 bg-gradient-to-l from-emerald-950 via-emerald-950/90 to-transparent flex items-center text-amber-400 hover:text-white transition-opacity md:hidden cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 drop-shadow-sm" />
          </button>
        )}

        {/* Scrollable Tabs Bar */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScrollState}
          className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-1.5 py-1.5 sm:py-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasBadge = (item.id === 'reminders' && (item.badge ?? 0) > 0) || (item.id === 'inspections' && (item.badge ?? 0) > 0);
            const badgeCount = item.badge ?? 0;

            return (
              <button
                key={item.id}
                data-tab-id={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`snap-center flex items-center space-x-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-extrabold shadow-sm scale-[1.02]'
                    : 'text-emerald-100/85 hover:bg-emerald-900/60 hover:text-white active:bg-emerald-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-emerald-950' : 'text-amber-400'}`} />
                <span className="tracking-tight">{item.label}</span>
                
                {hasBadge && (
                  <span className={`ml-0.5 text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full font-black ${
                    isActive ? 'bg-emerald-950 text-amber-300' : 'bg-rose-500 text-white animate-pulse'
                  }`}>
                    {badgeCount}
                  </span>
                )}

                {item.badgeText && (
                  <span className={`ml-0.5 text-[9px] px-1.5 py-0.2 rounded font-bold ${
                    isActive ? 'bg-emerald-950 text-amber-300' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  }`}>
                    {item.badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer / Overlay Hamburger Menu (Full-featured Navigation Panel) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[52px] sm:top-[64px] z-50 bg-stone-950/80 backdrop-blur-md md:hidden animate-fadeIn overflow-y-auto">
          <div className="bg-stone-900 border-b border-stone-800 p-4 sm:p-5 shadow-2xl max-w-lg mx-auto rounded-b-3xl">
            
            {/* Header in drawer with quick search/state */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 font-mono">
                  Módulos do Sistema
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg bg-stone-800 border border-stone-700 cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Categorized Navigation Modules */}
            <div className="space-y-4">
              {navCategories.map((category, catIdx) => (
                <div key={catIdx} className="space-y-1.5">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 px-2">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-1">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      const hasBadge = (item.id === 'reminders' && (item.badge ?? 0) > 0) || (item.id === 'inspections' && (item.badge ?? 0) > 0);
                      const badgeCount = item.badge ?? 0;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-amber-400 text-emerald-950 font-bold shadow-md'
                              : 'bg-stone-800/60 hover:bg-stone-800 text-stone-200 border border-stone-750/60'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className={`p-2 rounded-lg shrink-0 ${
                              isActive ? 'bg-emerald-950 text-amber-400' : 'bg-emerald-950/80 text-amber-400 border border-emerald-800/60'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs font-bold truncate ${isActive ? 'text-emerald-950 font-black' : 'text-white'}`}>
                                  {item.label}
                                </span>
                                {item.badgeText && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                    {item.badgeText}
                                  </span>
                                )}
                              </div>
                              <p className={`text-[10px] truncate ${isActive ? 'text-emerald-900 font-medium' : 'text-stone-400'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                            {hasBadge && (
                              <span className="text-[10px] min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full font-black bg-rose-500 text-white animate-pulse">
                                {badgeCount}
                              </span>
                            )}
                            <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-950' : 'text-stone-500'}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Footer inside Mobile Drawer */}
            <div className="mt-4 pt-3 border-t border-stone-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAdvisor();
                }}
                className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold p-2.5 rounded-xl text-xs shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>MeliBot IA</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQrScanner();
                }}
                className="flex items-center justify-center space-x-1.5 bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-emerald-700/60 font-bold p-2.5 rounded-xl text-xs cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 shrink-0" />
                <span>Escanear Tag QR</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExport();
                }}
                className="flex items-center justify-center space-x-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold p-2.5 rounded-xl text-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Backup & Dados</span>
              </button>

              {currentUser ? (
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                  }}
                  className="flex items-center justify-center space-x-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold p-2.5 rounded-xl text-xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                  <span>Sair da Conta</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold p-2.5 rounded-xl text-xs cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span>Fazer Login</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

