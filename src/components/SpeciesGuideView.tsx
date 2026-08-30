import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Globe, 
  Camera, 
  HeartHandshake, 
  Droplets, 
  Box, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Calendar, 
  Info, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  Wind,
  Layers,
  Award,
  ArrowRightLeft,
  Eye,
  AlertTriangle,
  LayoutGrid,
  List,
  Image as ImageIcon,
  SlidersHorizontal,
  MapPin,
  Flame,
  Zap,
  Tag
} from 'lucide-react';
import { BeeSpecies, Hive } from '../types';
import { FloraSearchGroundingModal, GroundingSearchMode } from './FloraSearchGroundingModal';
import { SpeciesDetailModal } from './SpeciesDetailModal';
import { SimilarSpeciesComparisonModal } from './SimilarSpeciesComparisonModal';
import { SpeciesImage } from './SpeciesImage';

interface SpeciesGuideViewProps {
  speciesList: BeeSpecies[];
  hives?: Hive[];
  onSelectSpeciesForNewHive?: (speciesId: string) => void;
  onOpenAiAdvisor?: (queryText: string) => void;
}

type ViewLayout = 'grid' | 'gallery' | 'compact';
type SortOption = 'name-asc' | 'name-desc' | 'yield' | 'difficulty';

export const SpeciesGuideView: React.FC<SpeciesGuideViewProps> = ({
  speciesList,
  hives = [],
  onSelectSpeciesForNewHive,
  onOpenAiAdvisor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('todos');
  const [selectedAggressiveness, setSelectedAggressiveness] = useState<string>('todos');
  const [selectedBiome, setSelectedBiome] = useState<string>('todos');
  const [selectedQuickTag, setSelectedQuickTag] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid');

  // Grounding Search Modal
  const [isGroundingModalOpen, setIsGroundingModalOpen] = useState(false);
  const [groundingSearchQuery, setGroundingSearchQuery] = useState('');
  const [groundingSearchType, setGroundingSearchType] = useState<GroundingSearchMode>('all');

  // Detail & Comparison Modals
  const [selectedSpeciesForDetail, setSelectedSpeciesForDetail] = useState<BeeSpecies | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>('guaraipo-guarupu');
  const [comparisonModalTab, setComparisonModalTab] = useState<'curated' | 'custom'>('curated');
  const [customSpeciesAId, setCustomSpeciesAId] = useState<string>('guaraipo');
  const [customSpeciesBId, setCustomSpeciesBId] = useState<string>('guarupu');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const handleOpenComparison = (speciesId?: string) => {
    if (speciesId) {
      const mapping: Record<string, string> = {
        'guaraipo': 'guaraipo-guarupu',
        'guarupu': 'guaraipo-guarupu',
        'mandacaia_mqq': 'mandacaia-mqq-mqa',
        'mandaçaia': 'mandacaia-mqq-mqa',
        'mandacaia': 'mandacaia-mqq-mqa',
        'jatai': 'jatai-angustula-fiebrigi',
        'jatai_fiebrigi': 'jatai-angustula-fiebrigi',
        'mirim_emerina': 'emerina-droryana',
        'mirim_droriana': 'emerina-droryana',
        'tubuna': 'scaptotrigona-irapua',
        'canudo': 'canudo-mandaguari',
        'irapua': 'scaptotrigona-irapua',
        'iratim': 'scaptotrigona-iratim',
        'irai': 'irai-mirim',
        'urucu_nordestina': 'urucu-mandacaia'
      };
      if (mapping[speciesId]) {
        setSelectedComparisonId(mapping[speciesId]);
        setComparisonModalTab('curated');
      } else {
        setCustomSpeciesAId(speciesId);
        const otherSpecies = speciesList.find(s => s.id !== speciesId)?.id || 'jatai';
        setCustomSpeciesBId(otherSpecies);
        setComparisonModalTab('custom');
      }
    } else {
      setComparisonModalTab('curated');
    }
    setIsComparisonModalOpen(true);
  };

  const handleOpenCustomComparison = (speciesAId?: string, speciesBId?: string) => {
    if (speciesAId) setCustomSpeciesAId(speciesAId);
    if (speciesBId) setCustomSpeciesBId(speciesBId);
    setComparisonModalTab('custom');
    setIsComparisonModalOpen(true);
  };

  const handleToggleSelectForCompare = (speciesId: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(speciesId)) {
        return prev.filter(id => id !== speciesId);
      }
      if (prev.length >= 2) {
        return [prev[1], speciesId];
      }
      return [...prev, speciesId];
    });
  };

  const handleClearCompare = () => {
    setSelectedForCompare([]);
  };

  const handleLaunchCompareFromDock = () => {
    if (selectedForCompare.length === 2) {
      handleOpenCustomComparison(selectedForCompare[0], selectedForCompare[1]);
    } else if (selectedForCompare.length === 1) {
      const fallbackOther = speciesList.find(s => s.id !== selectedForCompare[0])?.id || 'jatai';
      handleOpenCustomComparison(selectedForCompare[0], fallbackOther);
    } else {
      handleOpenCustomComparison();
    }
  };

  const handleOpenGroundingSearch = (query: string, mode: GroundingSearchMode = 'all') => {
    setGroundingSearchQuery(query);
    setGroundingSearchType(mode);
    setIsGroundingModalOpen(true);
  };

  const handleOpenSpeciesDetail = (species: BeeSpecies) => {
    setSelectedSpeciesForDetail(species);
    setIsDetailModalOpen(true);
  };

  // Quick preset tags
  const quickTags = [
    { id: 'todos', label: 'Todas as Espécies' },
    { id: 'iniciante', label: '🌱 Ideal para Iniciantes' },
    { id: 'alta_producao', label: '🍯 Alta Produção de Mel' },
    { id: 'muito_mansa', label: '🕊️ Muito Mansa' },
    { id: 'subterranea', label: '🕳️ Ninho Subterrâneo' },
    { id: 'sul_serra', label: '🌲 Sul & Serra Gaúcha' },
  ];

  // Filter & sort species
  const filteredSpecies = useMemo(() => {
    return speciesList
      .filter((sp) => {
        const matchesSearch = 
          sp.popularName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sp.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sp.recommendedBoxModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (sp.region && sp.region.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (sp.biome && sp.biome.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (sp.morphologyNotes && sp.morphologyNotes.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesGroup = selectedGroup === 'todos' || sp.group === selectedGroup;
        const matchesDifficulty = selectedDifficulty === 'todos' || sp.difficulty === selectedDifficulty;
        const matchesAggressiveness = selectedAggressiveness === 'todos' || sp.aggressiveness === selectedAggressiveness;
        const matchesBiome = selectedBiome === 'todos' || (sp.biome && sp.biome.toLowerCase().includes(selectedBiome.toLowerCase()));

        // Quick Tag filtering
        let matchesTag = true;
        if (selectedQuickTag === 'iniciante') {
          matchesTag = sp.difficulty === 'Fácil' && (sp.aggressiveness === 'Muito Mansa' || sp.aggressiveness === 'Mansa');
        } else if (selectedQuickTag === 'alta_producao') {
          matchesTag = sp.honeyYieldPerYear.includes('3') || sp.honeyYieldPerYear.includes('4') || sp.honeyYieldPerYear.includes('5') || sp.honeyYieldPerYear.includes('6') || sp.honeyYieldPerYear.includes('8') || sp.honeyYieldPerYear.includes('10');
        } else if (selectedQuickTag === 'muito_mansa') {
          matchesTag = sp.aggressiveness === 'Muito Mansa';
        } else if (selectedQuickTag === 'subterranea') {
          matchesTag = sp.nestingType.toLowerCase().includes('subterrâneo') || sp.nestingType.toLowerCase().includes('solo') || sp.popularName.toLowerCase().includes('chão') || sp.popularName.toLowerCase().includes('terra');
        } else if (selectedQuickTag === 'sul_serra') {
          matchesTag = (sp.region && (sp.region.includes('RS') || sp.region.includes('Sul'))) || (sp.biome && sp.biome.includes('Mata Atlântica'));
        }

        return matchesSearch && matchesGroup && matchesDifficulty && matchesAggressiveness && matchesBiome && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.popularName.localeCompare(b.popularName);
        }
        if (sortBy === 'name-desc') {
          return b.popularName.localeCompare(a.popularName);
        }
        if (sortBy === 'difficulty') {
          const rank: Record<string, number> = { 'Fácil': 1, 'Média': 2, 'Avançada': 3 };
          return (rank[a.difficulty] || 2) - (rank[b.difficulty] || 2);
        }
        if (sortBy === 'yield') {
          return b.honeyYieldPerYear.localeCompare(a.honeyYieldPerYear);
        }
        return 0;
      });
  }, [speciesList, searchQuery, selectedGroup, selectedDifficulty, selectedAggressiveness, selectedBiome, selectedQuickTag, sortBy]);

  // Calculate stats
  const meliponaCount = speciesList.filter(s => s.group === 'melipona').length;
  const trigonaCount = speciesList.filter(s => s.group === 'trigona').length;
  const plebeiaCount = speciesList.filter(s => s.group === 'plebeia').length;

  return (
    <div className="space-y-6" id="species-guide-root">
      
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-xl border border-amber-300 dark:border-amber-800/60">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2 flex-wrap">
                <span>Guia Fotográfico & Catálogo de Espécies (ASF)</span>
                <span className="text-xs bg-amber-500 text-stone-950 font-bold px-2.5 py-0.5 rounded-full font-sans">
                  {speciesList.length} Espécies Catalogadas
                </span>
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm mt-0.5">
                Fotografias de operárias, tubos de entrada e ninhos, fichas morfológicas e comparativo de espécies semelhantes (Guia SEAPI/DDPA RS & Embrapa).
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Side-by-Side Comparison Button */}
          <button
            id="btn-quick-compare-custom"
            onClick={() => handleOpenCustomComparison()}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs transition-all whitespace-nowrap cursor-pointer"
            title="Selecione 2 espécies quaisquer para comparar fotos, caixas, mel e morfologia lado a lado"
          >
            <ArrowRightLeft className="w-4 h-4 text-stone-950" />
            <span>⚡ Comparação Rápida</span>
          </button>

          {/* Similar Species Guide Button */}
          <button
            id="btn-compare-similar-species"
            onClick={() => handleOpenComparison()}
            className="bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs transition-all whitespace-nowrap cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Pares Semelhantes</span>
          </button>

          <button
            id="btn-grounding-search-google"
            onClick={() => handleOpenGroundingSearch('Identificação e catálogo completo das espécies de abelhas sem ferrão do Brasil Meliponini', 'all')}
            className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-500/50 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs transition-all whitespace-nowrap cursor-pointer"
          >
            <Globe className="w-4 h-4 text-emerald-300" />
            <span>Pesquisa Grounded</span>
          </button>

          {onOpenAiAdvisor && (
            <button
              id="btn-open-melibot-advisor"
              onClick={() => onOpenAiAdvisor('Quais são as melhores espécies de abelhas sem ferrão para iniciar na minha região e quais cuidados são essenciais?')}
              className="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs transition-all whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>MeliBot IA</span>
            </button>
          )}
        </div>
      </div>

      {/* Institutional Sources & Photographic Curatorship Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-stone-900/60 to-amber-950/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/40 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-stone-100 text-xs sm:text-sm">Acervo Fotográfico e Diagnóstico Taxonômico Oficial</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                Fontes Oficiais Integradas
              </span>
            </div>
            <p className="text-stone-400 text-[11px] mt-0.5">
              Fotos prioritárias do <strong>Guia SEAPI/DDPA RS (2023)</strong>, <strong>EMBRAPA Meio Ambiente</strong> (Dr. Cristiano Menezes), <strong>Associação A.B.E.L.H.A.</strong> (Dra. Vera L. Imperatriz-Fonseca) e <strong>Acervo de Campo Anexado</strong> (Bugia, Bieira).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={() => handleOpenGroundingSearch('Guia de reconhecimento de abelhas sem ferrão do Rio Grande do Sul SEAPI DDPA 2023 Sidia Witter', 'all')}
            className="px-2.5 py-1 bg-stone-800/90 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            title="Ver referências do Guia SEAPI/DDPA RS"
          >
            <BookOpen className="w-3 h-3 text-amber-400" />
            <span>Guia SEAPI RS</span>
          </button>

          <button
            onClick={() => handleOpenGroundingSearch('Site ABELHA abelhas sem ferrão catálogo de espécies abelha.org.br', 'all')}
            className="px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/60 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            title="Consultar Associação A.B.E.L.H.A."
          >
            <Globe className="w-3 h-3 text-emerald-400" />
            <span>A.B.E.L.H.A.</span>
          </button>
        </div>
      </div>

      {/* Quick Group Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          id="tab-group-todos"
          onClick={() => {
            setSelectedGroup('todos');
            setSelectedQuickTag('todos');
          }}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            selectedGroup === 'todos' && selectedQuickTag === 'todos'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-xs' 
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">Total de Espécies</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{speciesList.length}</span>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">Catálogo Ilustrado</span>
          </div>
        </div>

        <div 
          id="tab-group-melipona"
          onClick={() => setSelectedGroup('melipona')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            selectedGroup === 'melipona' 
              ? 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-400 dark:border-yellow-600 shadow-xs' 
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-yellow-300'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-800 dark:text-yellow-400 block">Gênero Melipona</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{meliponaCount}</span>
            <span className="text-[11px] text-yellow-700 dark:text-yellow-400 font-medium">Uruçus & Mandaçaias</span>
          </div>
        </div>

        <div 
          id="tab-group-trigona"
          onClick={() => setSelectedGroup('trigona')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            selectedGroup === 'trigona' 
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-xs' 
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">Trigonas & Scaptotrigonas</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{trigonaCount}</span>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Jataí, Tubiba, Mandaguari</span>
          </div>
        </div>

        <div 
          id="tab-group-plebeia"
          onClick={() => setSelectedGroup('plebeia')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            selectedGroup === 'plebeia' 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-xs' 
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">Plebeias & Mirins</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{plebeiaCount}</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Iraí, Mirins, Lambe-Olhos</span>
          </div>
        </div>
      </div>

      {/* Quick Tag Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Tag className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
        {quickTags.map((tag) => (
          <button
            key={tag.id}
            id={`quick-tag-${tag.id}`}
            onClick={() => setSelectedQuickTag(tag.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedQuickTag === tag.id
                ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-amber-400'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              id="input-search-species"
              type="text"
              placeholder="Buscar por nome popular, científico, ninho, caixa recomendada..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 font-medium"
            />
            {searchQuery && (
              <button 
                id="btn-clear-species-search"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-bold"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Controls: Dropdowns and Layout Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Group Filter */}
            <select
              id="select-filter-group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="py-2 px-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold focus:ring-2 focus:ring-amber-500"
            >
              <option value="todos">Todos os Grupos</option>
              <option value="melipona">Gênero Melipona</option>
              <option value="trigona">Trigonas & Scaptotrigonas</option>
              <option value="plebeia">Plebeias & Mirins</option>
            </select>

            {/* Difficulty Filter */}
            <select
              id="select-filter-difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="py-2 px-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold focus:ring-2 focus:ring-amber-500"
            >
              <option value="todos">Dificuldade</option>
              <option value="Fácil">Fácil (Iniciantes)</option>
              <option value="Média">Média</option>
              <option value="Avançada">Avançada</option>
            </select>

            {/* Sort Dropdown */}
            <select
              id="select-sort-species"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="py-2 px-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold focus:ring-2 focus:ring-amber-500"
            >
              <option value="name-asc">Nome (A - Z)</option>
              <option value="name-desc">Nome (Z - A)</option>
              <option value="difficulty">Dificuldade de Manejo</option>
              <option value="yield">Produção de Mel</option>
            </select>

            {/* Layout Toggle Buttons */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700">
              <button
                id="btn-layout-grid"
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewLayout === 'grid'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title="Visualização em Cards Detalhados"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                id="btn-layout-gallery"
                onClick={() => setViewLayout('gallery')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewLayout === 'gallery'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title="Visualização em Galeria Fotográfica"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                id="btn-layout-compact"
                onClick={() => setViewLayout('compact')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewLayout === 'compact'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title="Visualização em Lista Compacta"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedGroup !== 'todos' || selectedDifficulty !== 'todos' || selectedAggressiveness !== 'todos' || selectedQuickTag !== 'todos' || searchQuery) && (
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-stone-400 font-medium">Filtros ativos:</span>
              {selectedGroup !== 'todos' && (
                <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                  Grupo: {selectedGroup}
                </span>
              )}
              {selectedDifficulty !== 'todos' && (
                <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                  Dificuldade: {selectedDifficulty}
                </span>
              )}
              {selectedQuickTag !== 'todos' && (
                <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                  {quickTags.find(t => t.id === selectedQuickTag)?.label}
                </span>
              )}
              {searchQuery && (
                <span className="bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                  Busca: "{searchQuery}"
                </span>
              )}
            </div>

            <button
              id="btn-reset-all-filters"
              onClick={() => {
                setSelectedGroup('todos');
                setSelectedDifficulty('todos');
                setSelectedAggressiveness('todos');
                setSelectedBiome('todos');
                setSelectedQuickTag('todos');
                setSearchQuery('');
              }}
              className="text-amber-700 dark:text-amber-400 hover:underline font-bold shrink-0 cursor-pointer"
            >
              Resetar ({filteredSpecies.length} resultados)
            </button>
          </div>
        )}
      </div>

      {/* No Results State */}
      {filteredSpecies.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-12 text-center border border-stone-200 dark:border-stone-800 space-y-3">
          <BookOpen className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto" />
          <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">Nenhuma espécie encontrada</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Tente alterar o termo de busca ou resetar os filtros selecionados para exibir todas as {speciesList.length} espécies nativas.
          </p>
        </div>
      ) : viewLayout === 'grid' ? (
        /* 1. DETAILED RESPONSIVE CARD GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="species-grid-view">
          {filteredSpecies.map((species, idx) => {
            const speciesHives = hives.filter(h => h.speciesId === species.id);
            const isSelectedForCompare = selectedForCompare.includes(species.id);

            return (
              <div 
                key={species.id} 
                id={`species-card-${species.id}`}
                className={`bg-white dark:bg-stone-900 rounded-2xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group ${
                  isSelectedForCompare 
                    ? 'border-amber-500 ring-2 ring-amber-500/30' 
                    : 'border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500'
                }`}
              >
                {/* Visual Header with Photography & Lazy Loading */}
                <div className="relative border-b border-stone-200 dark:border-stone-800">
                  <SpeciesImage
                    species={species}
                    aspectRatioClass="aspect-16/10"
                    priority={idx < 4} // Eager load the first 4 cards for instant visual rendering
                    onOpenGroundingPhotos={() => handleOpenGroundingSearch(`Fotos e identificação de abelha ${species.popularName} (${species.scientificName})`, 'photos')}
                    onClick={() => handleOpenSpeciesDetail(species)}
                  />

                  {/* Difficulty Tag Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border shadow-sm backdrop-blur-md ${
                      species.difficulty === 'Fácil'
                        ? 'bg-emerald-950/85 text-emerald-300 border-emerald-500/50'
                        : species.difficulty === 'Média'
                        ? 'bg-amber-950/85 text-amber-300 border-amber-500/50'
                        : 'bg-rose-950/85 text-rose-300 border-rose-500/50'
                    }`}>
                      Manejo {species.difficulty}
                    </span>
                  </div>

                  {/* Plantel Badge if User has Hives */}
                  {speciesHives.length > 0 && (
                    <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{speciesHives.length} no plantel</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    {/* Header: Name & Scientific */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="cursor-pointer flex-1" onClick={() => handleOpenSpeciesDetail(species)}>
                        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif leading-tight group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                          {species.popularName}
                        </h3>
                        <p className="text-xs text-amber-800 dark:text-amber-400 font-mono italic mt-0.5">
                          {species.scientificName}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Compare toggle button */}
                        <button
                          type="button"
                          id={`btn-toggle-compare-${species.id}`}
                          onClick={() => handleToggleSelectForCompare(species.id)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 transition-colors cursor-pointer ${
                            isSelectedForCompare
                              ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                              : 'bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                          }`}
                          title={isSelectedForCompare ? 'Remover da comparação' : 'Adicionar à comparação lado a lado'}
                        >
                          <ArrowRightLeft className="w-3 h-3" />
                          <span>{isSelectedForCompare ? 'Selecionada' : 'Comparar'}</span>
                        </button>

                        {species.similarSpeciesDiff && (
                          <button
                            id={`btn-diff-${species.id}`}
                            onClick={() => handleOpenComparison(species.id)}
                            className="bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 text-amber-900 dark:text-amber-200 text-[10px] font-bold px-2 py-1 rounded-lg border border-amber-300 dark:border-amber-700/80 flex items-center gap-1 transition-colors cursor-pointer"
                            title={`Diferenciar de ${species.similarSpeciesDiff.compareWith}`}
                          >
                            <SlidersHorizontal className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                            <span>Par</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-2.5 line-clamp-3">
                      {species.description}
                    </p>

                    {/* Technical Specifications Grid */}
                    <div className="bg-stone-50 dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200 dark:border-stone-700/80 text-xs space-y-2 mt-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1 text-[11px]">
                          <Box className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          Caixa Recomendada:
                        </span>
                        <strong className="text-stone-900 dark:text-stone-100 font-mono font-bold text-[11px] text-right">
                          {species.recommendedBoxModel}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1 text-[11px]">
                          <Droplets className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          Produção de Mel:
                        </span>
                        <strong className="text-amber-800 dark:text-amber-400 font-bold text-[11px]">
                          {species.honeyYieldPerYear}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1 text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          Temperamento:
                        </span>
                        <strong className="text-stone-900 dark:text-stone-100 font-bold text-[11px]">
                          {species.aggressiveness}
                        </strong>
                      </div>

                      {species.flightRange && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                            <Wind className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            Raio de Vôo:
                          </span>
                          <span className="text-stone-700 dark:text-stone-300 font-bold font-mono">
                            {species.flightRange}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                    
                    {/* Grounding and Detail Actions */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        id={`btn-pasto-${species.id}`}
                        onClick={() => handleOpenGroundingSearch(`Principais plantas flores arvores e pasto floral meliponófilo preferido para abelha ${species.popularName} (${species.scientificName})`, 'pasto')}
                        className="bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 font-bold text-[11px] py-1.5 px-1.5 rounded-xl flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                        title="Principais plantas e pasto floral preferido desta espécie"
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">Pasto Floral</span>
                      </button>

                      <button
                        id={`btn-care-${species.id}`}
                        onClick={() => handleOpenGroundingSearch(`Dicas de manejo multiplicação divisão de enxame e alimentação para abelha ${species.popularName} (${species.scientificName})`, 'care')}
                        className="bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-bold text-[11px] py-1.5 px-1.5 rounded-xl flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                        title="Manejo, multiplicação e cuidados de campo"
                      >
                        <HeartHandshake className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span className="truncate">Manejo</span>
                      </button>

                      <button
                        id={`btn-detail-${species.id}`}
                        onClick={() => handleOpenSpeciesDetail(species)}
                        className="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-bold text-[11px] py-1.5 px-1.5 rounded-xl flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                        title="Ver fotos detalhadas e ficha morfológica"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span className="truncate">Morfologia</span>
                      </button>
                    </div>

                    {/* Registered hives badge or register action */}
                    {onSelectSpeciesForNewHive && (
                      <button
                        id={`btn-add-hive-${species.id}`}
                        onClick={() => onSelectSpeciesForNewHive(species.id)}
                        className="w-full py-2 px-3 bg-stone-100 dark:bg-stone-800 hover:bg-amber-500 hover:text-stone-950 dark:hover:bg-amber-500 dark:hover:text-stone-950 text-stone-700 dark:text-stone-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 border border-stone-200 dark:border-stone-700 cursor-pointer group-hover:border-amber-400"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>
                          {speciesHives.length > 0
                            ? `Cadastrar +1 Colmeia (${speciesHives.length} no plantel)`
                            : `Cadastrar Colmeia de ${species.popularName}`}
                        </span>
                      </button>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      ) : viewLayout === 'gallery' ? (
        
        /* 2. VISUAL PHOTO GALLERY VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="species-gallery-view">
          {filteredSpecies.map((species, idx) => {
            const isSelectedForCompare = selectedForCompare.includes(species.id);

            return (
              <div 
                key={species.id}
                id={`gallery-card-${species.id}`}
                className={`bg-white dark:bg-stone-900 rounded-2xl border overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group ${
                  isSelectedForCompare
                    ? 'border-amber-500 ring-2 ring-amber-500/30'
                    : 'border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500'
                }`}
              >
                <div className="relative">
                  <SpeciesImage
                    species={species}
                    aspectRatioClass="aspect-4/3"
                    priority={idx < 8}
                    onOpenGroundingPhotos={() => handleOpenGroundingSearch(`Fotos de ${species.popularName}`, 'photos')}
                    onClick={() => handleOpenSpeciesDetail(species)}
                  />
                  
                  {/* Floating Top Tag */}
                  <div className="absolute top-2 left-2 z-20 pointer-events-none">
                    <span className="bg-black/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                      {species.difficulty}
                    </span>
                  </div>

                  {/* Top Right Quick Compare Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSelectForCompare(species.id);
                    }}
                    className={`absolute top-2 right-2 z-20 p-1.5 rounded-lg border text-[10px] font-bold shadow-sm backdrop-blur-md transition-colors cursor-pointer ${
                      isSelectedForCompare
                        ? 'bg-amber-500 text-stone-950 border-amber-600'
                        : 'bg-black/70 hover:bg-black/90 text-stone-200 border-white/20'
                    }`}
                    title={isSelectedForCompare ? 'Remover da comparação' : 'Comparar'}
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2 cursor-pointer" onClick={() => handleOpenSpeciesDetail(species)}>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 font-serif group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                      {species.popularName}
                    </h3>
                    <p className="text-[11px] text-amber-800 dark:text-amber-400 font-mono italic">
                      {species.scientificName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-800">
                    <span className="truncate">{species.recommendedBoxModel}</span>
                    <span className="font-bold text-amber-800 dark:text-amber-400">{species.honeyYieldPerYear}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      ) : (

        /* 3. COMPACT LIST VIEW */
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs divide-y divide-stone-100 dark:divide-stone-800" id="species-compact-view">
          {filteredSpecies.map((species, idx) => {
            const speciesHives = hives.filter(h => h.speciesId === species.id);
            const isSelectedForCompare = selectedForCompare.includes(species.id);

            return (
              <div 
                key={species.id}
                id={`compact-row-${species.id}`}
                className={`p-3.5 sm:p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelectedForCompare ? 'bg-amber-500/10' : 'hover:bg-amber-50/40 dark:hover:bg-amber-950/20'
                }`}
              >
                <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-stone-700">
                    <SpeciesImage
                      species={species}
                      aspectRatioClass="aspect-square"
                      priority={idx < 6}
                      showControls={false}
                      onClick={() => handleOpenSpeciesDetail(species)}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 
                        onClick={() => handleOpenSpeciesDetail(species)}
                        className="font-bold text-base text-stone-900 dark:text-stone-100 font-serif hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        {species.popularName}
                      </h3>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                        species.difficulty === 'Fácil'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : species.difficulty === 'Média'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                      }`}>
                        {species.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-amber-800 dark:text-amber-400 font-mono italic">
                      {species.scientificName}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-500 dark:text-stone-400 flex-wrap">
                      <span className="flex items-center gap-1 font-mono">
                        <Box className="w-3 h-3 text-amber-600" />
                        {species.recommendedBoxModel}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-amber-800 dark:text-amber-400">
                        <Droplets className="w-3 h-3" />
                        {species.honeyYieldPerYear}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-stone-400" />
                        {species.aggressiveness}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleSelectForCompare(species.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1 ${
                      isSelectedForCompare
                        ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>{isSelectedForCompare ? 'Selecionada' : 'Comparar'}</span>
                  </button>

                  <button
                    id={`btn-compact-view-${species.id}`}
                    onClick={() => handleOpenSpeciesDetail(species)}
                    className="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-stone-200 dark:border-stone-700"
                  >
                    Ver Ficha
                  </button>

                  {onSelectSpeciesForNewHive && (
                    <button
                      id={`btn-compact-add-${species.id}`}
                      onClick={() => onSelectSpeciesForNewHive(species.id)}
                      className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{speciesHives.length > 0 ? `+1 (${speciesHives.length})` : 'Cadastrar'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Comparison Dock (Appears when 1 or 2 species are selected for quick comparison) */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-6 inset-x-4 max-w-2xl mx-auto z-40 bg-stone-950/90 dark:bg-stone-900/95 text-stone-100 p-3 sm:p-4 rounded-2xl border border-amber-500/50 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto py-1 flex-1">
              {selectedForCompare.map((id, index) => {
                const sp = speciesList.find(s => s.id === id);
                return (
                  <div key={id} className="flex items-center gap-2">
                    {index > 0 && (
                      <span className="text-amber-400 font-bold text-xs uppercase">vs</span>
                    )}
                    <span className="bg-stone-800 text-stone-200 text-xs font-bold px-2.5 py-1 rounded-lg border border-stone-700 whitespace-nowrap">
                      {sp?.popularName || id}
                    </span>
                  </div>
                );
              })}
              {selectedForCompare.length === 1 && (
                <span className="text-[11px] text-stone-400 italic">
                  (Selecione +1 espécie para comparar)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleClearCompare}
              className="px-3 py-2 text-stone-400 hover:text-stone-200 text-xs font-semibold cursor-pointer"
            >
              Limpar
            </button>
            <button
              type="button"
              id="btn-launch-compare-dock"
              onClick={handleLaunchCompareFromDock}
              className="flex-1 sm:flex-none px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Comparar Lado a Lado Agora</span>
            </button>
          </div>
        </div>
      )}

      {/* Species Detail & Photo Gallery Modal */}
      <SpeciesDetailModal
        species={selectedSpeciesForDetail}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onOpenGroundingSearch={handleOpenGroundingSearch}
        onSelectForHive={onSelectSpeciesForNewHive}
      />

      {/* Similar Species Comparison Modal */}
      <SimilarSpeciesComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        initialComparisonId={selectedComparisonId}
        initialTab={comparisonModalTab}
        initialSpeciesAId={customSpeciesAId}
        initialSpeciesBId={customSpeciesBId}
        onSelectSpeciesForNewHive={onSelectSpeciesForNewHive}
        onOpenSpeciesDetail={handleOpenSpeciesDetail}
      />

      {/* Flora & Grounding Search Modal */}
      <FloraSearchGroundingModal
        isOpen={isGroundingModalOpen}
        onClose={() => setIsGroundingModalOpen(false)}
        initialQuery={groundingSearchQuery}
        initialSearchType={groundingSearchType}
      />
    </div>
  );
};
