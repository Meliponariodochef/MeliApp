import React, { useState, useEffect } from 'react';
import { 
  Flower2, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Search, 
  Plus, 
  Filter, 
  Trash2, 
  Edit3, 
  Check, 
  AlertCircle, 
  MapPin, 
  Tag, 
  Globe, 
  ExternalLink, 
  Camera,
  Droplets,
  Store,
  ShoppingBag,
  Maximize2,
  CheckCircle2,
  RotateCcw,
  X
} from 'lucide-react';
import { FloraItem, BeeSpecies, RaizerImageResult } from '../types';
import { FloraSearchGroundingModal } from './FloraSearchGroundingModal';
import { RAIZER_PLANTS_CATALOG, RaizerPlantItem, findMatchingRaizerPlants, resolvePlantExactImage, getRaizerIconBg } from '../data/raizerFloraData';
import { useRaizerFloraSearch } from '../hooks/useRaizerFloraSearch';
import { handleImageError } from '../utils/imageFallback';
import { FloraImage } from './FloraImage';

interface FloraCatalogViewProps {
  floraList: FloraItem[];
  speciesList: BeeSpecies[];
  onAddFlora?: (plant: Omit<FloraItem, 'id'>) => void;
  onUpdateFlora?: (plant: FloraItem) => void;
  onDeleteFlora?: (id: string) => void;
  onNavigateToMarketplace?: (plant?: { plantName: string; id?: string }) => void;
  onSyncRaizer?: () => void;
}

export const FloraCatalogView: React.FC<FloraCatalogViewProps> = ({
  floraList,
  speciesList,
  onAddFlora,
  onUpdateFlora,
  onDeleteFlora,
  onNavigateToMarketplace,
  onSyncRaizer,
}) => {
  const [activeTab, setActiveTab] = useState<'flora' | 'matriz' | 'raizer'>('flora');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterRegion, setFilterRegion] = useState<string>('todas');
  const [raizerFilterCategory, setRaizerFilterCategory] = useState<string>('todos');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Image Lightbox Modal State
  const [selectedImageModal, setSelectedImageModal] = useState<{ url: string; title: string; desc: string; raizerUrl?: string } | null>(null);
  const [importedRaizerId, setImportedRaizerId] = useState<string | null>(null);

  // Raizer Live Scraping & Photo Search Hook
  const {
    results: raizerSearchResults,
    loading: isSearchingRaizer,
    isLiveScraped,
    error: raizerSearchError,
    searchRaizerImages,
    getBestImageForPlant,
    getRaizerProductForPlant,
  } = useRaizerFloraSearch(searchQuery);

  // Grounding Modal State
  const [isGroundingModalOpen, setIsGroundingModalOpen] = useState(false);
  const [groundingSearchQuery, setGroundingSearchQuery] = useState('');
  const [groundingSearchType, setGroundingSearchType] = useState<'all' | 'care' | 'photos' | 'pasto'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<FloraItem | null>(null);

  // Global keydown listener for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImageModal) setSelectedImageModal(null);
        if (isGroundingModalOpen) setIsGroundingModalOpen(false);
        if (isModalOpen) {
          setIsModalOpen(false);
          setEditingPlant(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageModal, isGroundingModalOpen, isModalOpen]);

  const handleOpenGroundingSearch = (initialTerm?: string, searchType: 'all' | 'care' | 'photos' | 'pasto' = 'all') => {
    setGroundingSearchQuery(initialTerm || '');
    setGroundingSearchType(searchType);
    setIsGroundingModalOpen(true);
  };

  const [formData, setFormData] = useState<Omit<FloraItem, 'id'>>({
    plantName: '',
    scientificName: '',
    bloomingMonths: [selectedMonth],
    valueType: 'Néctar & Pólen',
    attractiveForSpecies: ['Jataí', 'Mandaçaia'],
    region: 'Todo o Brasil',
    description: '',
    iconBg: 'bg-amber-100 text-amber-800',
    imageUrl: '',
    raizerUrl: '',
    approxPrice: '',
    plantCategory: 'arbusto',
    verifiedInRaizer: false,
  });

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const monthShorts = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // Monthly Beekeeping Guidance Diagnostic
  const monthDiagnostic: Record<number, { title: string; season: string; guidance: string; bg: string }> = {
    1: {
      title: 'Janeiro: Safra de Verão & Pico de Postura',
      season: 'Verão • Abundância de Néctar & Pólen',
      guidance: 'Período de enchimento acelerado de melgueiras e potes. Monitore a umidade do mel e adicione espaço com melgueiras adicionais.',
      bg: 'bg-amber-50 border-amber-200 text-amber-950',
    },
    2: {
      title: 'Fevereiro: Transição e Preparação',
      season: 'Fim do Verão • Consolidação das Reservas',
      guidance: 'Fim da principal safra de mel na maioria das regiões. Avalie o estoque de pão-de-abelha e alimentos para a entrada do outono.',
      bg: 'bg-orange-50 border-orange-200 text-orange-950',
    },
    3: {
      title: 'Março: Chegada do Outono & Resinas',
      season: 'Outono • Floradas de Cipó & Coleta de Resina',
      guidance: 'Entrada das floradas de Aroeira e cipós. As abelhas começam a intensificar a coleta de resina vegetal para vedar as caixas.',
      bg: 'bg-stone-50 border-stone-300 text-stone-900',
    },
    4: {
      title: 'Abril: Estocagem e Início do Período Seco',
      season: 'Outono • Pólen de Tithonia & Amor-agarradinho',
      guidance: 'Período indicado para reforço nutricional de colônias novas/divisões recentes com bife proteico antes da diminuição de flores.',
      bg: 'bg-amber-50/80 border-amber-300 text-amber-900',
    },
    5: {
      title: 'Maio: Floradas Salvadoras de Inverno',
      season: 'Inverno/Seca • Abertura da Dombéia & Cipó-de-são-joão',
      guidance: 'A Dombéia e o Cipó-de-são-joão abrem flor em maio. Verifique a vedação das caixas contra ventos frios e invasão de forídeos.',
      bg: 'bg-pink-50 border-pink-200 text-pink-950',
    },
    6: {
      title: 'Junho: Pico de Inverno & Conservação do Enxame',
      season: 'Inverno • Ápice Floral da Dombéia & Guaçatonga',
      guidance: 'Período crítico de frio. Reduza o volume das caixas se necessário e evite abrir ninhos em dias abaixo de 18°C.',
      bg: 'bg-blue-50 border-blue-200 text-blue-950',
    },
    7: {
      title: 'Julho: Meio de Inverno & Cajueiro no Nordeste',
      season: 'Inverno • Néctar Extrafloral & Seca Central',
      guidance: 'No Nordeste, inicia-se a florada do Cajueiro. No Sul/Sudeste, mantenha o alimentador interno preparado para xarope 1:1 se faltar néctar.',
      bg: 'bg-sky-50 border-sky-200 text-sky-950',
    },
    8: {
      title: 'Agosto: Pré-Primavera & Despertar da Rainha',
      season: 'Inverno-Primavera • Pitangueira & Jabuticabeira',
      guidance: 'Início do aquecimento. Com a florada da Pitangueira e Jabuticabeira, as rainhas retomam a postura intensa de discos de cria.',
      bg: 'bg-teal-50 border-teal-200 text-teal-950',
    },
    9: {
      title: 'Setembro: Explosão de Primavera & Época das Divisões',
      season: 'Primavera • Pico do Cipó-uva & Goiabeira',
      guidance: 'A Época de Ouro da Meliponicultura! Pasto abundante, ideal para realizar divisões de enxames e instalar iscas PET para capturas.',
      bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    },
    10: {
      title: 'Outubro: Pico da Florada & Capturas em Iscas',
      season: 'Primavera • Angico-branco & Flora Nativa em Massa',
      guidance: 'Enxameações naturais em alta. Monitore as iscas PET semanalmente e garanta alimento suporte nas divisões recém-feitas.',
      bg: 'bg-green-50 border-green-300 text-green-950',
    },
    11: {
      title: 'Novembro: Primavera Tardia & Enchimento de Potes',
      season: 'Primavera/Verão • Manacá-da-Serra & Resedá',
      guidance: 'Discos de cria maduros e volumosos. Adicione melgueiras vazias para evitar enxameação indesejada por falta de espaço.',
      bg: 'bg-purple-50 border-purple-200 text-purple-950',
    },
    12: {
      title: 'Dezembro: Verão Pleno & Primeira Colheita de Mel',
      season: 'Verão • Sansão-de-campo & Abundância Urbana',
      guidance: 'Início das colheitas de mel do final do ano. Lembre-se de colher apenas potes 100% lacrados por cera pelas abelhas.',
      bg: 'bg-yellow-50 border-yellow-300 text-yellow-950',
    },
  };

  // Filtered list for Tab 1 (Month Filter + Search + Type Filter)
  const filteredFloraForMonth = floraList.filter((f) => {
    const matchMonth = f.bloomingMonths.includes(selectedMonth);

    const matchQuery =
      searchQuery === '' ||
      f.plantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.attractiveForSpecies.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchType = filterType === 'todos' || f.valueType === filterType;
    const matchRegion = filterRegion === 'todas' || f.region === filterRegion;

    return matchMonth && matchQuery && matchType && matchRegion;
  });

  // Filtered list for Tab 2 (All plants regardless of month)
  const filteredFloraAll = floraList.filter((f) => {
    const matchQuery =
      searchQuery === '' ||
      f.plantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.attractiveForSpecies.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchType = filterType === 'todos' || f.valueType === filterType;
    const matchRegion = filterRegion === 'todas' || f.region === filterRegion;

    return matchQuery && matchType && matchRegion;
  });

  // Calculate monthly stats for current month
  const currentMonthDiagnostic = monthDiagnostic[selectedMonth];
  const nectarCount = filteredFloraForMonth.filter((f) => f.valueType.includes('Néctar')).length;
  const pollenCount = filteredFloraForMonth.filter((f) => f.valueType.includes('Pólen')).length;
  const resinCount = filteredFloraForMonth.filter((f) => f.valueType.includes('Resina')).length;

  const handleOpenAdd = () => {
    setEditingPlant(null);
    setFormData({
      plantName: '',
      scientificName: '',
      bloomingMonths: [selectedMonth],
      valueType: 'Néctar & Pólen',
      attractiveForSpecies: ['Jataí', 'Mandaçaia'],
      region: 'Todo o Brasil',
      description: '',
      iconBg: 'bg-amber-100 text-amber-800',
      imageUrl: '',
      raizerUrl: '',
      approxPrice: '',
      plantCategory: 'arbusto',
      verifiedInRaizer: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plant: FloraItem) => {
    setEditingPlant(plant);
    setFormData({
      plantName: plant.plantName,
      scientificName: plant.scientificName,
      bloomingMonths: plant.bloomingMonths,
      valueType: plant.valueType,
      attractiveForSpecies: plant.attractiveForSpecies,
      region: plant.region,
      description: plant.description,
      iconBg: plant.iconBg,
      imageUrl: plant.imageUrl || '',
      raizerUrl: plant.raizerUrl || '',
      approxPrice: plant.approxPrice || '',
      plantCategory: plant.plantCategory || 'arbusto',
      verifiedInRaizer: plant.verifiedInRaizer || false,
    });
    setIsModalOpen(true);
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.plantName) return;

    if (editingPlant && onUpdateFlora) {
      onUpdateFlora({
        ...editingPlant,
        ...formData,
      });
    } else if (onAddFlora) {
      onAddFlora(formData);
    }
    setIsModalOpen(false);
  };

  const toggleMonthInForm = (mNum: number) => {
    if (formData.bloomingMonths.includes(mNum)) {
      if (formData.bloomingMonths.length > 1) {
        setFormData({
          ...formData,
          bloomingMonths: formData.bloomingMonths.filter((m) => m !== mNum),
        });
      }
    } else {
      setFormData({
        ...formData,
        bloomingMonths: [...formData.bloomingMonths, mNum].sort((a, b) => a - b),
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-2">
              <Flower2 className="w-6 h-6 text-amber-600" />
              <span>Flora Meliponófila & Pasto Apícola Mês a Mês</span>
            </h1>
          </div>
          <p className="text-stone-500 text-sm mt-1">
            Catálogo detalhado de plantas melíferas, poleníferas e resiníferas para abelhas sem ferrão, com diagnóstico sazonal e matriz de florada de 12 meses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onSyncRaizer && (
            <button
              onClick={() => {
                onSyncRaizer();
                setSyncFeedback('✅ Todas as 140 plantas e fotos do catálogo oficial Raízer foram sincronizadas com sucesso!');
                setTimeout(() => setSyncFeedback(null), 5000);
              }}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-2xs transition-all whitespace-nowrap cursor-pointer"
              title="Restaurar e atualizar todas as fotos oficiais do Viveiro Raízer"
            >
              <RotateCcw className="w-4 h-4 text-emerald-700" />
              <span>Sincronizar Raízer ({RAIZER_PLANTS_CATALOG.length})</span>
            </button>
          )}

          <button
            onClick={() => handleOpenGroundingSearch()}
            className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-500/50 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <Globe className="w-4 h-4 text-emerald-300" />
            <span>Pesquisa Grounded Google</span>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded-full font-sans border border-emerald-400/30">
              IA + Web
            </span>
          </button>

          {onAddFlora && (
            <button
              onClick={handleOpenAdd}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Adicionar Planta / Flor</span>
            </button>
          )}
        </div>
      </div>

      {syncFeedback && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-md flex items-center justify-between text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{syncFeedback}</span>
          </div>
          <button onClick={() => setSyncFeedback(null)} className="text-white/80 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('flora')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'flora'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Calendário Floral do Mês ({filteredFloraForMonth.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matriz')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'matriz'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
          }`}
        >
          <Flower2 className="w-4 h-4" />
          <span>Matriz Anual 12 Meses ({floraList.length} Plantas)</span>
        </button>

        <button
          onClick={() => setActiveTab('raizer')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'raizer'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-400'
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-800'
          }`}
        >
          <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>🌱 Viveiro Raízer Mudas ({RAIZER_PLANTS_CATALOG.length})</span>
          <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            Fotos & Preços
          </span>
        </button>
      </div>

      {/* Global Search and Resource Filters */}
      <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* Search Query */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar planta, nome científico ou abelha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          {/* Value Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 font-bold"
            >
              <option value="todos">Todos os Recursos (Néctar, Pólen, Resina)</option>
              <option value="Néctar">Apenas Néctar</option>
              <option value="Pólen">Apenas Pólen</option>
              <option value="Néctar & Pólen">Néctar & Pólen</option>
              <option value="Resina">Apenas Resina</option>
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 font-medium"
            >
              <option value="todas">Todas as Regiões</option>
              <option value="Todo o Brasil">Todo o Brasil</option>
              <option value="Sudeste e Sul">Sudeste e Sul</option>
              <option value="Mata Atlântica">Mata Atlântica</option>
              <option value="Cerrado">Cerrado</option>
              <option value="Nordeste">Nordeste</option>
              <option value="Cerrado e Mata Atlântica">Cerrado e Mata Atlântica</option>
              <option value="Mata Atlântica, Cerrado e Caatinga">Caatinga & Outros</option>
            </select>
          </div>

        </div>

          {/* Live Raizer Scraping Status & Photos Strip */}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSearchingRaizer ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isSearchingRaizer ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                </span>
                <span className="font-semibold text-stone-700">
                  {isSearchingRaizer
                    ? 'Buscando fotos e mudas no Viveiro Raízer (raizerplantasparaabelhas.com.br)...'
                    : isLiveScraped
                    ? 'Fotos botânicas extraídas ao vivo do site Raízer Plantas para Abelhas'
                    : 'Busca direta de imagens & mudas sincronizada com Viveiro Raízer'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {searchQuery.trim() && (
                  <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full text-[11px] font-bold border border-emerald-300">
                    📸 {raizerSearchResults.length} {raizerSearchResults.length === 1 ? 'foto encontrada' : 'fotos encontradas'} no Raízer
                  </span>
                )}
                <a
                  href="https://www.raizerplantasparaabelhas.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-900 font-bold text-[11px] flex items-center space-x-1 underline"
                >
                  <span>raizerplantasparaabelhas.com.br</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* If user is searching and has Raizer matches, display the live photo strip */}
            {searchQuery.trim() && raizerSearchResults.length > 0 && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center space-x-1.5">
                    <Camera className="w-4 h-4 text-emerald-700" />
                    <span>Fotos & Mudas Encontradas no Viveiro Raízer para "{searchQuery}":</span>
                  </span>
                  <span className="text-[11px] text-emerald-800 font-mono">
                    Clique na foto para ampliar
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {raizerSearchResults.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-emerald-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between group"
                    >
                      <div
                        className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer"
                        onClick={() => setSelectedImageModal({
                          url: item.imageUrl,
                          title: item.title,
                          desc: item.description || `Muda disponível no site Raízer Plantas para Abelhas (${item.price || 'Consulte preço'}).`,
                          raizerUrl: item.productUrl || 'https://www.raizerplantasparaabelhas.com.br'
                        })}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                        {item.price && (
                          <span className="absolute bottom-1 right-1 bg-black/70 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded">
                            {item.price.replace('Muda de ', '').replace('a ', '- ')}
                          </span>
                        )}
                      </div>

                      <div className="p-2 space-y-1">
                        <p className="text-[11px] font-bold text-stone-900 leading-tight truncate group-hover:text-emerald-700" title={item.title}>
                          {item.title}
                        </p>
                        {item.scientificName && (
                          <p className="text-[9px] text-stone-400 italic truncate font-mono">
                            {item.scientificName}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-1">
                          <a
                            href={item.productUrl || 'https://www.raizerplantasparaabelhas.com.br'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-emerald-800 hover:text-emerald-950 font-bold flex items-center space-x-0.5"
                          >
                            <Store className="w-2.5 h-2.5" />
                            <span>Ver Muda</span>
                          </a>
                          {onAddFlora && (
                            <button
                              onClick={() => {
                                onAddFlora({
                                  plantName: item.title,
                                  scientificName: item.scientificName || 'Espécie botânica para abelhas',
                                  bloomingMonths: item.bloomingMonths || [selectedMonth],
                                  valueType: (item.valueType as any) || 'Néctar & Pólen',
                                  attractiveForSpecies: item.attractiveForSpecies || ['Jataí', 'Mandaçaia'],
                                  region: 'Todo o Brasil',
                                  description: item.description || 'Muda meliponófila selecionada do Viveiro Raízer.',
                                  iconBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
                                  imageUrl: item.imageUrl,
                                  raizerUrl: item.productUrl,
                                  approxPrice: item.price,
                                  plantCategory: item.category || 'arbusto',
                                  verifiedInRaizer: true,
                                });
                                setImportedRaizerId(item.id);
                                setTimeout(() => setImportedRaizerId(null), 3000);
                              }}
                              className="text-[10px] text-amber-700 hover:text-amber-900 font-bold"
                              title="Adicionar ao meu catálogo"
                            >
                              + Importar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      {/* TAB 1: CALENDÁRIO MENSAL */}
      {activeTab === 'flora' && (
        <div className="space-y-6">
          
          {/* Month Selector Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              Selecione o mês para visualizar o pasto em florada:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {months.map((m, idx) => {
                const monthNum = idx + 1;
                const isSelected = selectedMonth === monthNum;
                const countForM = floraList.filter((f) => f.bloomingMonths.includes(monthNum)).length;

                return (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(monthNum)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-0.5 ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400'
                        : 'bg-stone-50 text-stone-700 hover:bg-amber-50 hover:text-amber-900 border border-stone-200'
                    }`}
                  >
                    <span>{m}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-amber-950 text-amber-200' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {countForM}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Monthly Beekeeping Diagnostic Banner */}
          {currentMonthDiagnostic && (
            <div className={`p-5 rounded-2xl border shadow-xs space-y-2.5 transition-all ${currentMonthDiagnostic.bg}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <h2 className="font-serif font-bold text-base sm:text-lg">
                    {currentMonthDiagnostic.title}
                  </h2>
                </div>
                <span className="bg-white/80 font-bold px-3 py-1 rounded-full text-xs shadow-2xs border border-stone-200 text-stone-800">
                  {currentMonthDiagnostic.season}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                💡 <strong>Orientação de Manejo:</strong> {currentMonthDiagnostic.guidance}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
                <span className="flex items-center space-x-1 bg-white/70 px-2.5 py-1 rounded-lg border border-stone-200">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>{nectarCount} Ofertas de Néctar</span>
                </span>
                <span className="flex items-center space-x-1 bg-white/70 px-2.5 py-1 rounded-lg border border-stone-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{pollenCount} Ofertas de Pólen</span>
                </span>
                <span className="flex items-center space-x-1 bg-white/70 px-2.5 py-1 rounded-lg border border-stone-200">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>{resinCount} Ofertas de Resina</span>
                </span>
              </div>
            </div>
          )}

          {/* Flora Cards Grid */}
          {filteredFloraForMonth.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center space-y-3">
              <Flower2 className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold text-stone-700">Nenhuma planta encontrada para {months[selectedMonth - 1]}</h3>
              <p className="text-stone-400 text-xs max-w-md mx-auto">
                Tente ajustar os filtros de busca ou adicione uma nova espécie meliponófila para enriquecer o pasto do seu meliponário.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFloraForMonth.map((flora) => {
                const isOutdatedUnsplash = Boolean(flora.imageUrl && flora.imageUrl.includes('images.unsplash.com'));
                const exactMatch = (!flora.imageUrl || isOutdatedUnsplash)
                  ? resolvePlantExactImage(flora.plantName, flora.scientificName)
                  : null;
                const displayImage = (!isOutdatedUnsplash && flora.imageUrl)
                  ? flora.imageUrl
                  : (exactMatch?.imageUrl || flora.imageUrl);
                const fallbackImg = exactMatch?.imageUrl && exactMatch.imageUrl !== displayImage ? exactMatch.imageUrl : undefined;
                const raizerBuyUrl = flora.raizerUrl || exactMatch?.raizerUrl || 'https://www.raizerplantasparaabelhas.com.br';
                const priceTag = flora.approxPrice;

                return (
                  <div
                    key={flora.id}
                    className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    {/* Plant Image with Loading Skeleton and Resilient Fallback */}
                    <FloraImage
                      src={displayImage}
                      fallbackSrc={fallbackImg}
                      alt={flora.plantName}
                      plantName={flora.plantName}
                      scientificName={flora.scientificName}
                      category={flora.plantCategory}
                      valueType={flora.valueType}
                      iconBg={flora.iconBg}
                      aspectRatioClass="aspect-16/9"
                      onClick={() => {
                        if (displayImage) {
                          setSelectedImageModal({
                            url: displayImage,
                            title: flora.plantName,
                            desc: flora.description,
                            raizerUrl: raizerBuyUrl,
                          });
                        }
                      }}
                    />

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <h3 className="text-base font-bold text-stone-900 font-serif leading-tight">
                                {flora.plantName}
                              </h3>
                              {(flora.verifiedInRaizer || exactMatch) && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-300" title="Disponível no Viveiro Raízer">
                                  🌱 Raízer
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-400 italic font-mono mt-0.5">
                              {flora.scientificName}
                            </p>
                          </div>
                          {!displayImage && (
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex-shrink-0 ${flora.iconBg}`}>
                              {flora.valueType}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                          {flora.description}
                        </p>

                        {/* Price & Category info if available */}
                        {priceTag && (
                          <div className="flex items-center justify-between text-xs bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                            <span className="text-emerald-900 font-bold flex items-center space-x-1">
                              <Store className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Muda no Viveiro:</span>
                            </span>
                            <span className="font-extrabold text-emerald-800">{priceTag}</span>
                          </div>
                        )}

                        {/* Regional & Target Bee Badges */}
                        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs space-y-2">
                          <div className="flex items-center justify-between text-stone-600">
                            <span className="flex items-center space-x-1 font-semibold text-stone-500">
                              <MapPin className="w-3.5 h-3.5 text-stone-400" />
                              <span>Região:</span>
                            </span>
                            <strong className="text-stone-800">{flora.region}</strong>
                          </div>

                          <div className="space-y-1">
                            <span className="text-stone-500 text-[11px] font-semibold block">Atrativo para as Espécies:</span>
                            <div className="flex flex-wrap gap-1">
                              {flora.attractiveForSpecies.map((sp) => (
                                <span key={sp} className="bg-amber-100 text-amber-950 font-bold text-[10px] px-2 py-0.5 rounded-md border border-amber-200">
                                  🐝 {sp}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Blooming Months Pills */}
                        <div className="pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                            Meses de Florada:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {monthShorts.map((mShort, idx) => {
                              const mNum = idx + 1;
                              const isBlooming = flora.bloomingMonths.includes(mNum);
                              return (
                                <span
                                  key={mShort}
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                    isBlooming
                                      ? 'bg-amber-600 text-white font-extrabold'
                                      : 'bg-stone-100 text-stone-300'
                                  }`}
                                >
                                  {mShort}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                      {/* Actions footer */}
                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => {
                            if (onNavigateToMarketplace) {
                              onNavigateToMarketplace({ plantName: flora.plantName, id: flora.id });
                            } else if (raizerBuyUrl) {
                              window.open(raizerBuyUrl, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="text-xs font-black text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-2xs transition-all cursor-pointer hover:shadow-xs"
                          title={`Comprar muda de ${flora.plantName} no Marketplace`}
                        >
                          <Store className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Comprar Muda</span>
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                        </button>

                        {(onUpdateFlora || onDeleteFlora) && (
                          <div className="flex items-center space-x-1 ml-auto">
                            {onUpdateFlora && (
                              <button
                                onClick={() => handleOpenEdit(flora)}
                                className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                title="Editar Planta"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            )}
                            {onDeleteFlora && (
                              <button
                                onClick={() => onDeleteFlora(flora.id)}
                                className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Excluir Planta"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: MATRIZ ANUAL 12 MESES */}
      {activeTab === 'matriz' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-900">
                Matriz Sazonal de Florada (12 Meses)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Identifique rapidamente lacunas de florada (meses sem flores na sua região) para planejar o plantio de reforço no meliponário.
              </p>
            </div>
            <span className="bg-amber-100 text-amber-950 font-bold px-3 py-1 rounded-xl text-xs">
              {filteredFloraAll.length} Espécies Cadastradas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
                  <th className="py-3 px-4">Espécie / Nome Científico</th>
                  <th className="py-3 px-2">Recurso</th>
                  <th className="py-3 px-2">Região</th>
                  {monthShorts.map((mShort) => (
                    <th key={mShort} className="py-3 px-1.5 text-center w-8">
                      {mShort}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {filteredFloraAll.map((plant) => (
                  <tr key={plant.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{plant.plantName}</div>
                      <div className="text-[11px] text-stone-400 italic font-mono">{plant.scientificName}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap ${plant.iconBg}`}>
                        {plant.valueType}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-stone-600 whitespace-nowrap">
                      {plant.region}
                    </td>
                    {monthShorts.map((_, idx) => {
                      const mNum = idx + 1;
                      const isBlooming = plant.bloomingMonths.includes(mNum);
                      return (
                        <td key={mNum} className="py-3 px-1.5 text-center">
                          {isBlooming ? (
                            <span className="inline-block w-4 h-4 rounded-full bg-amber-500 ring-2 ring-amber-200 shadow-2xs" title={`Florada em ${months[idx]}`} />
                          ) : (
                            <span className="inline-block w-2 h-2 rounded-full bg-stone-200" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: VIVEIRO RAIZER PLANTAS PARA ABELHAS */}
      {activeTab === 'raizer' && (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 rounded-3xl p-6 text-white shadow-md border border-emerald-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="bg-amber-400 text-stone-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Parceiro Especializado
                </span>
                <span className="text-xs text-emerald-300 font-mono">
                  raizerplantasparaabelhas.com.br
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-200">
                🌱 Catálogo de Mudas: Raízer Plantas para Abelhas
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Seleção curada com as 20 melhores espécies para pasto floral de abelhas sem ferrão (Jataí, Mandaçaia, Uruçu, Iraí, Mirins e Tubiba). Consulte fotos reais das mudas e floração, preços médios e adquira diretamente pelo viveiro.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="https://www.raizerplantasparaabelhas.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-all whitespace-nowrap"
              >
                <Store className="w-4 h-4" />
                <span>Acessar Site Raízer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {onNavigateToMarketplace && (
                <button
                  onClick={onNavigateToMarketplace}
                  className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 border border-emerald-600 transition-all cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Marketplace MeliApp</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-xs font-bold text-stone-500 mr-1 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>Categorias:</span>
            </span>

            {[
              { id: 'todos', label: '🌿 Todas as Mudas (20)' },
              { id: 'arbusto', label: '🌸 Arbustos & Flores' },
              { id: 'trepadeira', label: '🌺 Trepadeiras & Cipós' },
              { id: 'arvore', label: '🌳 Árvores Nativas' },
              { id: 'erva', label: '🌱 Ervas & Rasteiras' },
              { id: 'inverno', label: '❄️ Pasto de Inverno (Crítico)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setRaizerFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  raizerFilterCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Raizer Plant Cards Grid */}
          {(() => {
            const filteredRaizer = RAIZER_PLANTS_CATALOG.filter((p) => {
              // Category filter
              if (raizerFilterCategory === 'inverno') {
                const winterMonths = [5, 6, 7, 8];
                const hasWinter = p.bloomingMonths.some((m) => winterMonths.includes(m));
                if (!hasWinter) return false;
              } else if (raizerFilterCategory !== 'todos') {
                if (p.category !== raizerFilterCategory) return false;
              }

              // Search query filter
              if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchName = p.plantName.toLowerCase().includes(q);
                const matchSci = p.scientificName.toLowerCase().includes(q);
                const matchDesc = p.description.toLowerCase().includes(q);
                const matchSp = p.attractiveForSpecies.some((s) => s.toLowerCase().includes(q));
                if (!matchName && !matchSci && !matchDesc && !matchSp) return false;
              }

              return true;
            });

            if (filteredRaizer.length === 0) {
              return (
                <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-3">
                  <Flower2 className="w-10 h-10 text-stone-300 mx-auto" />
                  <h3 className="text-base font-bold text-stone-700">Nenhuma muda encontrada no filtro selecionado</h3>
                  <p className="text-stone-400 text-xs max-w-md mx-auto">
                    Tente selecionar "Todas as Mudas" ou limpe o termo de busca na barra superior.
                  </p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRaizer.map((plant) => {
                  const isImported = importedRaizerId === plant.id;

                  return (
                    <div
                      key={plant.id}
                      className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      {/* Photo with zoom trigger & resilient fallback */}
                      <FloraImage
                        src={plant.imageUrl}
                        alt={plant.plantName}
                        plantName={plant.plantName}
                        scientificName={plant.scientificName}
                        category={plant.category}
                        valueType={plant.valueType}
                        iconBg={plant.iconBg || getRaizerIconBg(plant.valueType)}
                        aspectRatioClass="aspect-16/10"
                        onClick={() => setSelectedImageModal({
                          url: plant.imageUrl,
                          title: plant.plantName,
                          desc: plant.description,
                          raizerUrl: plant.raizerUrl,
                        })}
                      />

                      {/* Details Content */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <h3 className="text-base font-bold text-stone-900 font-serif leading-tight group-hover:text-amber-700 transition-colors">
                                {plant.plantName}
                              </h3>
                              <p className="text-xs text-stone-400 italic font-mono mt-0.5">
                                {plant.scientificName}
                              </p>
                            </div>
                            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-300 whitespace-nowrap">
                              🌱 Viveiro Raízer
                            </span>
                          </div>

                          <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                            {plant.description}
                          </p>

                          {/* Price and Region */}
                          <div className="bg-gradient-to-r from-emerald-50/80 to-amber-50/50 p-2.5 rounded-xl border border-emerald-100 text-xs flex items-center justify-between">
                            <span className="text-emerald-900 font-bold flex items-center space-x-1">
                              <Store className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Valor da Muda:</span>
                            </span>
                            <strong className="text-emerald-900 font-extrabold text-sm">{plant.approxPrice}</strong>
                          </div>

                          {/* Target Bees */}
                          <div className="space-y-1">
                            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider block">
                              Abelhas sem ferrão que visitam:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {plant.attractiveForSpecies.map((sp) => (
                                <span key={sp} className="bg-amber-50 text-amber-950 font-bold text-[10px] px-2 py-0.5 rounded-md border border-amber-200">
                                  🐝 {sp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Blooming Months */}
                          <div className="pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                              Meses de Florada:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {monthShorts.map((mShort, idx) => {
                                const mNum = idx + 1;
                                const isBlooming = plant.bloomingMonths.includes(mNum);
                                return (
                                  <span
                                    key={mShort}
                                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                      isBlooming
                                        ? 'bg-amber-600 text-white font-extrabold'
                                        : 'bg-stone-100 text-stone-300'
                                    }`}
                                  >
                                    {mShort}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => {
                              if (onNavigateToMarketplace) {
                                onNavigateToMarketplace({ plantName: plant.plantName, id: plant.id });
                              } else if (plant.raizerUrl) {
                                window.open(plant.raizerUrl, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-2xs transition-all text-center cursor-pointer"
                            title={`Comprar muda de ${plant.plantName} no Marketplace`}
                          >
                            <Store className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Comprar Muda</span>
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                          </button>

                          {onAddFlora && (
                            <button
                              onClick={() => {
                                onAddFlora({
                                  plantName: plant.plantName,
                                  scientificName: plant.scientificName,
                                  bloomingMonths: plant.bloomingMonths,
                                  valueType: plant.valueType,
                                  attractiveForSpecies: plant.attractiveForSpecies,
                                  region: plant.region,
                                  description: plant.description,
                                  iconBg: plant.iconBg || getRaizerIconBg(plant.valueType),
                                  imageUrl: plant.imageUrl,
                                  raizerUrl: plant.raizerUrl,
                                  approxPrice: plant.approxPrice,
                                  plantCategory: plant.category,
                                  verifiedInRaizer: true,
                                });
                                setImportedRaizerId(plant.id);
                                setTimeout(() => setImportedRaizerId(null), 3000);
                              }}
                              disabled={isImported}
                              className={`font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer text-center ${
                                isImported
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                              }`}
                            >
                              {isImported ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Adicionado!</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>+ Ao Meu Catálogo</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

        </div>
      )}

      {/* MODAL: ADD / EDIT FLORA */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
          onClick={() => {
            setIsModalOpen(false);
            setEditingPlant(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-stone-100 p-4 sm:p-5 bg-stone-50/90 flex-shrink-0">
              <div className="flex items-center space-x-2 min-w-0 pr-2">
                <span className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex-shrink-0">
                  <Flower2 className="w-5 h-5 text-amber-600" />
                </span>
                <h2 className="text-base sm:text-lg font-bold font-serif text-stone-900 truncate">
                  {editingPlant ? 'Editar Espécie da Flora' : 'Cadastrar Nova Planta Meliponófila'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPlant(null);
                }}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/80 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitModal} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nome Popular da Planta *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Primavera, Vassourinha, Flor-de-São-Miguel..."
                  value={formData.plantName}
                  onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nome Científico</label>
                  <input
                    type="text"
                    placeholder="Ex: Bougainvillea spectabilis"
                    value={formData.scientificName}
                    onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 italic font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tipo de Recurso *</label>
                  <select
                    value={formData.valueType}
                    onChange={(e: any) => setFormData({ ...formData, valueType: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  >
                    <option value="Néctar & Pólen">Néctar & Pólen</option>
                    <option value="Néctar">Apenas Néctar</option>
                    <option value="Pólen">Apenas Pólen</option>
                    <option value="Resina">Apenas Resina</option>
                  </select>
                </div>
              </div>

              {/* Blooming Months Selection */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Meses de Florada (Selecione todos que aplicam) *</label>
                <div className="grid grid-cols-6 gap-1.5 bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                  {months.map((mName, idx) => {
                    const mNum = idx + 1;
                    const isChecked = formData.bloomingMonths.includes(mNum);
                    return (
                      <button
                        type="button"
                        key={mName}
                        onClick={() => toggleMonthInForm(mNum)}
                        className={`py-1.5 px-1 rounded-xl font-bold text-[10px] transition-all ${
                          isChecked
                            ? 'bg-amber-600 text-white shadow-2xs font-extrabold'
                            : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                        }`}
                      >
                        {monthShorts[idx]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Região de Ocorrência / Predominante</label>
                <input
                  type="text"
                  placeholder="Ex: Todo o Brasil, Mata Atlântica, Cerrado, Sul e Sudeste..."
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Espécies Atendidas (separadas por vírgula)</label>
                <input
                  type="text"
                  placeholder="Ex: Jataí, Mandaçaia, Uruçu, Iraí, Bugia"
                  value={formData.attractiveForSpecies.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attractiveForSpecies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Descrição & Dicas de Manejo do Pasto</label>
                <textarea
                  rows={2.5}
                  placeholder="Ex: Excelente arbusto ornamental para ter perto das caixas. Floresce bem no outono..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-stone-100">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">URL da Foto da Planta / Flor (Opcional)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Link de Compra no Viveiro (Opcional)</label>
                  <input
                    type="url"
                    placeholder="https://www.raizerplantasparaabelhas.com.br/..."
                    value={formData.raizerUrl || ''}
                    onChange={(e) => setFormData({ ...formData, raizerUrl: e.target.value, verifiedInRaizer: !!e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Actions Footer inside form */}
              <div className="pt-4 border-t border-stone-100 flex justify-end space-x-2 sticky bottom-0 bg-white/95 backdrop-blur-xs py-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingPlant(null);
                  }}
                  className="px-4 py-2 rounded-xl text-stone-600 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-sm cursor-pointer"
                >
                  Salvar Espécie
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: LIGHTBOX IMAGE VIEWER */}
      {selectedImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImageModal(null)}
        >
          <div 
            className="bg-stone-900 border border-stone-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-4/3 w-full bg-black flex items-center justify-center">
              <img
                src={selectedImageModal.url}
                alt={selectedImageModal.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
              <button
                onClick={() => setSelectedImageModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-serif text-amber-300">
                  {selectedImageModal.title}
                </h3>
                {selectedImageModal.raizerUrl && (
                  <a
                    href={selectedImageModal.raizerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Ver no Viveiro Raízer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedImageModal.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: GOOGLE SEARCH GROUNDING */}
      <FloraSearchGroundingModal
        isOpen={isGroundingModalOpen}
        onClose={() => setIsGroundingModalOpen(false)}
        initialQuery={groundingSearchQuery}
        initialSearchType={groundingSearchType}
        onAddFlora={onAddFlora}
        onNavigateToMarketplace={onNavigateToMarketplace}
      />

    </div>
  );
};
