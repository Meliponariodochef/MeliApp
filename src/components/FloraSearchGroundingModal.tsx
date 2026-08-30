import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  ExternalLink, 
  Flower2, 
  BookOpen, 
  Check, 
  Copy, 
  PlusCircle, 
  Globe, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  RefreshCw, 
  History, 
  ArrowRight,
  Leaf,
  Store,
  Share2,
  HelpCircle,
  AlertTriangle,
  Camera,
  HeartHandshake,
  CheckCircle2,
  Droplets,
  Info,
  ShoppingBag,
  Maximize2
} from 'lucide-react';
import { FloraItem, RaizerImageResult } from '../types';
import { RAIZER_PLANTS_CATALOG, RaizerPlantItem, findMatchingRaizerPlants, getRaizerIconBg } from '../data/raizerFloraData';
import { useRaizerFloraSearch } from '../hooks/useRaizerFloraSearch';
import { handleImageError } from '../utils/imageFallback';

export type GroundingSearchMode = 'all' | 'care' | 'photos' | 'pasto';

interface FloraGroundingSource {
  title: string;
  uri: string;
}

interface GroundingResponseData {
  text: string;
  sources: FloraGroundingSource[];
  webSearchQueries?: string[];
  query?: string;
  searchType?: string;
}

interface FloraSearchGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialSearchType?: GroundingSearchMode;
  onAddFlora?: (plant: Omit<FloraItem, 'id'>) => void;
  onNavigateToMarketplace?: () => void;
}

const PRESET_CATEGORIES = [
  {
    category: '🌸 Pasto Floral & Plantas Meliponófilas por Espécie de Abelha (ASF)',
    icon: '🌸',
    items: [
      { label: 'Pasto Floral para Abelha Jataí', query: 'Principais plantas flores arvores e pasto floral meliponófilo para Abelha Jataí Tetragonisca angustula', type: 'pasto' as GroundingSearchMode },
      { label: 'Pasto Floral para Abelha Mandaçaia', query: 'Principais plantas arvores e pasto floral meliponófilo para Abelha Mandaçaia Melipona quadrifasciata', type: 'pasto' as GroundingSearchMode },
      { label: 'Pasto Floral para Abelha Uruçu', query: 'Principais arvores flores e pasto floral meliponófilo para Abelha Uruçu Melipona scutellaris', type: 'pasto' as GroundingSearchMode },
      { label: 'Pasto Floral para Abelhas Iraí & Mirins', query: 'Plantas de flores miúdas ervas e pasto floral para Abelha Iraí e Mirim Plebeia', type: 'pasto' as GroundingSearchMode },
      { label: 'Pasto Floral para Tubiba & Tiúba', query: 'Plantas flores e pasto meliponófilo para Abelha Tubiba e Tiúba Scaptotrigona', type: 'pasto' as GroundingSearchMode },
      { label: 'Plantas Resiníferas (Geoprópolis para ASF)', query: 'Arvores e plantas fornecedoras de resina vegetal propolis e geopropolis para abelhas sem ferrao', type: 'pasto' as GroundingSearchMode },
    ],
  },
  {
    category: '🌿 Plantas Nectaríferas Campeãs & Pasto de Inverno',
    icon: '🌿',
    items: [
      { label: 'Dombéia (Aura de Prata — Inverno)', query: 'Dombéia Dombeya wallichii pasto meliponofilo inverno fotos como plantar podar', type: 'pasto' as GroundingSearchMode },
      { label: 'Ora-pro-nóbis (Néctar & Pólen Farto)', query: 'Ora-pro-nóbis Pereskia aculeata pasto apicola florada podas cultivo abelhas nativas', type: 'pasto' as GroundingSearchMode },
      { label: 'Amor-agarradinho (Florada Contínua)', query: 'Amor-agarradinho Antigonon leptopus pasto floral abelhas sem ferrao fotos cultivo', type: 'pasto' as GroundingSearchMode },
      { label: 'Cipó-de-são-joão (Inverno Seco)', query: 'Cipó de São João Pyrostegia venusta florada néctar inverno abelhas sem ferrao', type: 'pasto' as GroundingSearchMode },
      { label: 'Assa-peixe (Mel Claro Medicinal)', query: 'Assa-peixe Vernonia polysphaera pasto meliponofilo mel claro fotos cultivo', type: 'pasto' as GroundingSearchMode },
      { label: 'Manjericão & Ervas de Jardim', query: 'Manjericão Ocimum pasto apicola urbano cultivo vasos abelhas nativas fotos', type: 'care' as GroundingSearchMode },
    ],
  },
  {
    category: '🌳 Árvores Nativas, Pomares & Reflorestamento Apícola',
    icon: '🌳',
    items: [
      { label: 'Guapuruvu (Florada Amarela Gigante)', query: 'Guapuruvu Schizolobium parahyba arvore meliponofila florada néctar fotos', type: 'pasto' as GroundingSearchMode },
      { label: 'Aroeira-pimenteira (Resinas & Néctar)', query: 'Aroeira pimenteira Schinus terebinthifolia resina geopropolis néctar ASF', type: 'pasto' as GroundingSearchMode },
      { label: 'Ipê-amarelo e Roxo (Handroanthus)', query: 'Ipê amarelo roxo Handroanthus florada abelhas nativas pasto floral fotos', type: 'photos' as GroundingSearchMode },
      { label: 'Pitangueira & Jabuticabeira (Pomar)', query: 'Pitanga Jabuticaba flores pomar atratividade abelhas nativas fotos cultivo', type: 'care' as GroundingSearchMode },
    ],
  },
];

export const FloraSearchGroundingModal: React.FC<FloraSearchGroundingModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialSearchType = 'all',
  onAddFlora,
  onNavigateToMarketplace,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<GroundingSearchMode>((initialSearchType as GroundingSearchMode) || 'all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GroundingResponseData | null>(null);
  const [copied, setCopied] = useState(false);
  const [imported, setImported] = useState(false);
  const [importedRaizerId, setImportedRaizerId] = useState<string | null>(null);
  const [selectedImageModal, setSelectedImageModal] = useState<{ url: string; title: string; desc: string; raizerUrl?: string } | null>(null);

  // Raizer Live Scraping & Photo Search Hook
  const {
    results: raizerSearchResults,
    loading: isSearchingRaizer,
    isLiveScraped,
    searchRaizerImages,
  } = useRaizerFloraSearch(searchQuery);

  const [history, setHistory] = useState<Array<{ text: string; type: GroundingSearchMode }>>(() => {
    try {
      const saved = localStorage.getItem('meliapp_grounding_history_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        const mode: GroundingSearchMode = (initialSearchType as GroundingSearchMode) || 'all';
        setSearchQuery(initialQuery);
        setSearchType(mode);
        handleExecuteSearch(initialQuery, mode);
      }
    }
  }, [initialQuery, initialSearchType, isOpen]);

  if (!isOpen) return null;

  const saveToHistory = (queryText: string, currentType: GroundingSearchMode) => {
    const clean = queryText.trim();
    if (!clean) return;
    const filtered = history.filter((h) => h.text.toLowerCase() !== clean.toLowerCase());
    const updated: Array<{ text: string; type: GroundingSearchMode }> = [{ text: clean, type: currentType }, ...filtered].slice(0, 8);
    setHistory(updated);
    try {
      localStorage.setItem('meliapp_grounding_history_v2', JSON.stringify(updated));
    } catch (e) {
      console.warn('Falha ao salvar histórico', e);
    }
  };

  const handleExecuteSearch = async (queryToRun?: string, explicitType?: GroundingSearchMode) => {
    const textToSearch = (queryToRun || searchQuery).trim();
    const typeToUse = explicitType || searchType;
    if (!textToSearch || loading) return;

    setLoading(true);
    setError(null);
    setImported(false);

    try {
      // Trigger Raizer image search & scraping concurrently
      searchRaizerImages(textToSearch);

      const response = await fetch('/api/gemini/flora-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSearch, searchType: typeToUse }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Não foi possível consultar as informações com o Google Search Grounding.');
      }

      setResult(data);
      saveToHistory(textToSearch, typeToUse);
    } catch (err: any) {
      console.error('Erro na pesquisa Grounding:', err);
      setError(err.message || 'Erro ao realizar pesquisa via Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!result?.text) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Open external Google Images search safely
  const handleOpenGoogleImages = () => {
    const term = result?.query || searchQuery;
    if (!term) return;
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(term + ' abelhas sem ferrão')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Helper parser to extract structured information for auto-import into the Flora catalog
  const extractStructuredFlora = (text: string, currentQuery: string): Omit<FloraItem, 'id'> => {
    let plantName = '';
    let scientificName = '';
    let valueType: 'Néctar' | 'Pólen' | 'Néctar & Pólen' | 'Resina' = 'Néctar & Pólen';
    let bloomingMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let region = 'Todo o Brasil';
    let attractiveForSpecies = ['Jataí', 'Mandaçaia', 'Uruçu'];
    let description = '';

    const namePopMatch = text.match(/NOME_POPULAR:\s*([^\n\r]+)/i);
    if (namePopMatch) plantName = namePopMatch[1].trim();

    const nameSciMatch = text.match(/NOME_CIENTIFICO:\s*([^\n\r]+)/i);
    if (nameSciMatch) scientificName = nameSciMatch[1].trim();

    const recursoMatch = text.match(/RECURSO:\s*([^\n\r]+)/i);
    if (recursoMatch) {
      const r = recursoMatch[1].trim();
      if (r.includes('Resina')) valueType = 'Resina';
      else if (r.includes('Néctar') && r.includes('Pólen')) valueType = 'Néctar & Pólen';
      else if (r.includes('Néctar')) valueType = 'Néctar';
      else if (r.includes('Pólen')) valueType = 'Pólen';
    }

    const mesesMatch = text.match(/MESES_FLORADA:\s*([^\n\r]+)/i);
    if (mesesMatch) {
      const nums = mesesMatch[1]
        .split(/[,\s-]+/)
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => !isNaN(n) && n >= 1 && n <= 12);
      if (nums.length > 0) bloomingMonths = Array.from(new Set(nums)).sort((a, b) => a - b);
    }

    const regiaoMatch = text.match(/REGIAO:\s*([^\n\r]+)/i);
    if (regiaoMatch) region = regiaoMatch[1].trim();

    const especiesMatch = text.match(/ESPECIES_ATENDIDAS:\s*([^\n\r]+)/i);
    if (especiesMatch) {
      const spList = especiesMatch[1]
        .split(/[,;]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (spList.length > 0) attractiveForSpecies = spList;
    }

    const descMatch = text.match(/DESCRICAO_CURTA:\s*([^\n\r]+)/i);
    if (descMatch) {
      description = descMatch[1].trim();
    } else {
      const lines = text.split('\n').filter((l) => l.trim() && !l.startsWith('#') && !l.startsWith('---'));
      description = lines.slice(0, 2).join(' ').slice(0, 200);
    }

    if (!plantName) {
      const titleMatch = text.match(/^#\s*([^\n\r]+)/m);
      if (titleMatch) {
        plantName = titleMatch[1].replace(/\[|\]|🐝|🌿/g, '').trim();
      } else {
        plantName = currentQuery.split(/[\(\-\/]/)[0].trim();
      }
    }

    if (!scientificName) {
      const sciMatch = text.match(/\*Nome Científico[^*]*\:\*\s*([^\n\r,]+)/i);
      if (sciMatch) scientificName = sciMatch[1].trim();
    }

    const matchedRaizer = findMatchingRaizerPlants(`${plantName} ${scientificName} ${currentQuery}`);
    const firstMatch = matchedRaizer.length > 0 ? matchedRaizer[0] : null;

    let finalValueType: 'Néctar' | 'Pólen' | 'Néctar & Pólen' | 'Resina' | 'Resina para Geoprópolis' = 'Néctar & Pólen';
    if (valueType) {
      finalValueType = valueType as any;
    } else if (firstMatch) {
      finalValueType = firstMatch.valueType;
    }

    return {
      plantName: plantName || currentQuery,
      scientificName: scientificName || (firstMatch ? firstMatch.scientificName : 'Espécie botânica catalogada'),
      valueType: finalValueType,
      bloomingMonths: bloomingMonths.length ? bloomingMonths : (firstMatch ? firstMatch.bloomingMonths : [5, 6, 7, 8]),
      region: region || (firstMatch ? firstMatch.region : 'Todo o Brasil'),
      attractiveForSpecies: attractiveForSpecies.length ? attractiveForSpecies : (firstMatch ? firstMatch.attractiveForSpecies : ['Jataí', 'Mandaçaia']),
      description: description || (firstMatch ? firstMatch.description : `Pesquisa botânica e de manejo sobre ${plantName}.`),
      iconBg: finalValueType.includes('Néctar') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
      imageUrl: firstMatch ? firstMatch.imageUrl : undefined,
      raizerUrl: firstMatch ? firstMatch.raizerUrl : 'https://www.raizerplantasparaabelhas.com.br',
      approxPrice: firstMatch ? firstMatch.approxPrice : undefined,
      plantCategory: firstMatch ? firstMatch.category : undefined,
      verifiedInRaizer: !!firstMatch,
    };
  };

  const handleImportToCatalog = () => {
    if (!result?.text || !onAddFlora) return;
    const structured = extractStructuredFlora(result.text, result.query || searchQuery);
    onAddFlora(structured);
    setImported(true);
  };

  const handleImportRaizerPlant = (plant: RaizerPlantItem) => {
    if (!onAddFlora) return;
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
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-emerald-300/60 my-3 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-4 sm:p-5 text-white flex items-center justify-between border-b border-emerald-700/50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-400/40 text-emerald-300 shadow-inner">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-base sm:text-lg font-serif text-emerald-100">
                  Pesquisa Google Grounding: Flora & Abelhas Sem Ferrão
                </h2>
                <span className="hidden sm:inline-flex items-center space-x-1 bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" />
                  <span>Google Search Grounding</span>
                </span>
              </div>
              <p className="text-xs text-emerald-300/80">
                Instruções detalhadas de cuidados, cultivo, manejo de caixas e fotos validadas em tempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/70 rounded-xl transition-colors cursor-pointer"
            title="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Mode Selector Tabs */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-200/80 space-y-3 flex-shrink-0">
          
          {/* Intent / Search Type Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-emerald-900 mr-1 flex items-center space-x-1">
              <Info className="w-3.5 h-3.5 text-emerald-700" />
              <span>Foco da Pesquisa:</span>
            </span>
            
            <button
              type="button"
              onClick={() => setSearchType('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                searchType === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-emerald-900 hover:bg-emerald-100 border border-emerald-300/70'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Visão Geral</span>
            </button>

            <button
              type="button"
              onClick={() => setSearchType('care')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                searchType === 'care'
                  ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400'
                  : 'bg-white text-stone-800 hover:bg-amber-50 border border-amber-300/70'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
              <span>Instruções de Cuidados & Manejo</span>
            </button>

            <button
              type="button"
              onClick={() => setSearchType('photos')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                searchType === 'photos'
                  ? 'bg-teal-700 text-white shadow-xs ring-2 ring-teal-400'
                  : 'bg-white text-stone-800 hover:bg-teal-50 border border-teal-300/70'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-teal-600" />
              <span>Fotos & Identificação Visual</span>
            </button>

            <button
              type="button"
              onClick={() => setSearchType('pasto')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                searchType === 'pasto'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-white text-stone-800 hover:bg-amber-50 border border-amber-300/70'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-amber-600" />
              <span>Pasto Néctar & Pólen</span>
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleExecuteSearch();
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise planta nectarífera (Dombéia, Ora-pro-nóbis...) ou espécie de abelha (Jataí, Mandaçaia, Uruçu...)"
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-2xl border border-emerald-300/80 bg-white text-stone-900 font-medium text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs placeholder-stone-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Pesquisando no Google...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Buscar com Grounding</span>
                </>
              )}
            </button>
          </form>

          {/* Search History Chips (if any) */}
          {history.length > 0 && !result && (
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1 text-xs">
              <span className="text-[11px] font-bold text-emerald-900 flex items-center space-x-1 flex-shrink-0">
                <History className="w-3.5 h-3.5 text-emerald-700" />
                <span>Buscas Recentes:</span>
              </span>
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchQuery(h.text);
                    setSearchType((h.type as any) || 'all');
                    handleExecuteSearch(h.text, h.type as any);
                  }}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300/70 text-[11px] px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors shadow-2xs"
                >
                  {h.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Main Content (Scrollable) */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-stone-50/50 text-stone-800 text-xs sm:text-sm">
          
          {/* Error State */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <h4 className="font-bold text-sm text-rose-950">Falha ao consultar a API Google Search Grounding</h4>
                <p className="mt-1 leading-relaxed">{error}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleExecuteSearch()}
                    className="bg-rose-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-rose-800 cursor-pointer"
                  >
                    Tentar Novamente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-stone-900 tracking-tight">
                  Consultando o Google Search & Literatura Científica...
                </h3>
                <p className="text-stone-500 text-xs max-w-md mx-auto mt-1 font-normal leading-relaxed">
                  Obtendo instruções detalhadas de cultivo, cuidados de manejo, identificação visual e referências fotográficas com fontes web verificadas.
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 text-[11px] font-medium text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Google Search Grounding Ativo via Gemini 3.7 Flash</span>
              </div>
            </div>
          )}

          {/* Initial State / Suggested Exploration Chips */}
          {!result && !loading && !error && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-3xl border border-emerald-200/80 p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center space-x-2.5 text-emerald-900">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-base text-stone-900 tracking-tight">
                    Pesquise Cuidados, Cultivo, Manejo e Fotos de Plantas & Abelhas Sem Ferrão
                  </h3>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Utilize o poder do <strong>Google Search Grounding</strong> para consultar dados científicos e práticos em tempo real:
                  fichas de cultivo de plantas nectaríferas (solo, luz, poda, meses de florada) ou instruções de manejo de espécies nativas (caixas, alimentação artificial, divisão e fotos de identificação).
                </p>
              </div>

              {/* Preset Categories */}
              <div className="space-y-4">
                {PRESET_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2.5 shadow-2xs">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-stone-700 flex items-center space-x-1.5">
                      <span>{cat.category}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {cat.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={() => {
                            setSearchQuery(item.label);
                            setSearchType(item.type);
                            handleExecuteSearch(item.query, item.type);
                          }}
                          className="text-left bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 border border-stone-200/80 hover:border-emerald-300 p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                        >
                          <span className="line-clamp-1">{item.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 flex-shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Results View */}
          {result && !loading && (
            <div className="space-y-6">
              
              {/* Action & Status Header */}
              <div className="bg-emerald-900 text-emerald-100 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-emerald-700">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pesquisa Concluída com Google Search Grounding</span>
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mt-0.5">
                    {result.query || searchQuery}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* External Photos Link Button */}
                  <button
                    onClick={handleOpenGoogleImages}
                    className="bg-teal-700 hover:bg-teal-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer border border-teal-500"
                    title="Abrir Galeria de Fotos no Google Imagens"
                  >
                    <Camera className="w-4 h-4 text-teal-200" />
                    <span>Ver Fotos no Google</span>
                    <ExternalLink className="w-3 h-3 text-teal-300" />
                  </button>

                  {onAddFlora && (
                    <button
                      onClick={handleImportToCatalog}
                      disabled={imported}
                      className={`font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer ${
                        imported
                          ? 'bg-emerald-500 text-white font-black ring-2 ring-emerald-300'
                          : 'bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold hover:shadow-md'
                      }`}
                    >
                      {imported ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Adicionado ao Catálogo!</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4" />
                          <span>Importar para Catálogo</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={handleCopyText}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border border-emerald-600 cursor-pointer"
                    title="Copiar texto da pesquisa"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>

                  {onNavigateToMarketplace && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToMarketplace();
                      }}
                      className="bg-emerald-950/80 hover:bg-emerald-950 text-emerald-200 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border border-emerald-600/60 cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-amber-300" />
                      <span>Ver no Marketplace</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Web Sources Citations (Grounding Chunks) */}
              {result.sources && result.sources.length > 0 && (
                <div className="bg-white rounded-2xl border border-emerald-200 p-4 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>Fontes Oficiais & Artigos Web Consultados ({result.sources.length})</span>
                    </span>
                    <span className="text-[10px] text-stone-400">Verificação em tempo real via Google</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {result.sources.map((src, idx) => {
                      let domain = '';
                      try {
                        domain = new URL(src.uri).hostname.replace(/^www\./, '');
                      } catch {
                        domain = 'link web';
                      }

                      return (
                        <a
                          key={idx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-400 p-2.5 rounded-xl flex items-start justify-between group transition-all text-xs"
                        >
                          <div className="space-y-0.5 pr-2">
                            <p className="font-bold text-stone-900 group-hover:text-emerald-950 line-clamp-1">
                              {src.title || domain}
                            </p>
                            <span className="text-[10px] text-emerald-700 font-mono block">
                              {domain}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 flex-shrink-0 mt-0.5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Raízer Plantas Para Abelhas - Visual Photos & Mudas Gallery */}
              {(() => {
                const matched = findMatchingRaizerPlants(result.query || searchQuery || result.text);
                const combinedLiveAndCatalog = raizerSearchResults.length > 0 
                  ? raizerSearchResults.map(r => ({
                      id: r.id,
                      plantName: r.title,
                      scientificName: r.scientificName || 'Espécie botânica para abelhas',
                      category: r.category || 'Muda Meliponófila',
                      imageUrl: r.imageUrl,
                      raizerUrl: r.productUrl || 'https://www.raizerplantasparaabelhas.com.br',
                      approxPrice: r.price || 'Consulte no site Raízer',
                      description: r.description || 'Planta meliponófila selecionada para pasto apícola.',
                      attractiveForSpecies: r.attractiveForSpecies || ['Jataí', 'Mandaçaia', 'Uruçu'],
                      bloomingMonths: r.bloomingMonths || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                      valueType: r.valueType || 'Néctar & Pólen',
                      iconBg: 'bg-emerald-100 text-emerald-900 border-emerald-200'
                    }))
                  : matched.length > 0 ? matched : RAIZER_PLANTS_CATALOG.slice(0, 4);

                const plantsToShow = combinedLiveAndCatalog.slice(0, 6);

                return (
                  <div className="bg-gradient-to-br from-amber-50/80 via-emerald-50/50 to-white rounded-3xl border border-amber-200/90 p-5 sm:p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-base sm:text-lg font-bold font-serif text-amber-950 flex items-center space-x-2">
                            <Flower2 className="w-5 h-5 text-amber-600" />
                            <span>📸 Galeria de Fotos & Mudas: Raízer Plantas para Abelhas</span>
                          </span>
                          <span className="bg-amber-200/80 text-amber-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-amber-300">
                            {isLiveScraped ? 'Fotos ao Vivo' : 'Fotos Reais'}
                          </span>
                          {isSearchingRaizer && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-medium px-2 py-0.5 rounded-full animate-pulse">
                              🌱 Buscando imagens no Raízer...
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">
                          Plantas meliponófilas cultivadas especialmente para pasto de abelhas sem ferrão, com indicação de época de floração e mudas disponíveis no viveiro.
                        </p>
                      </div>

                      <a
                        href="https://www.raizerplantasparaabelhas.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
                      >
                        <Store className="w-4 h-4" />
                        <span>Visitar Raízer Mudas</span>
                        <ExternalLink className="w-3 h-3 text-amber-200" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                      {plantsToShow.map((plant) => {
                        const isImportedThis = importedRaizerId === plant.id;
                        return (
                          <div
                            key={plant.id}
                            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
                          >
                            {/* Plant Image with Zoom Click */}
                            <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer"
                              onClick={() => setSelectedImageModal({ url: plant.imageUrl, title: plant.plantName, desc: plant.description, raizerUrl: plant.raizerUrl })}
                            >
                              <img
                                src={plant.imageUrl}
                                alt={plant.plantName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onError={handleImageError}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                                <span className="text-white text-xs font-semibold flex items-center space-x-1">
                                  <Maximize2 className="w-3.5 h-3.5" />
                                  <span>Ampliar Foto</span>
                                </span>
                                <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                                  Raízer
                                </span>
                              </div>
                              <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs border ${plant.iconBg || getRaizerIconBg(plant.valueType)}`}>
                                {plant.valueType}
                              </span>
                            </div>

                            {/* Card Content */}
                            <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                              <div className="space-y-1">
                                <h4 className="font-bold text-stone-900 text-sm leading-tight group-hover:text-amber-700 transition-colors">
                                  {plant.plantName}
                                </h4>
                                <p className="text-[11px] text-stone-400 italic font-mono">
                                  {plant.scientificName}
                                </p>
                                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 pt-1">
                                  {plant.description}
                                </p>
                              </div>

                              {/* Badges */}
                              <div className="space-y-1.5 pt-1 border-t border-stone-100">
                                <div className="flex flex-wrap gap-1">
                                  {plant.attractiveForSpecies.slice(0, 3).map((sp) => (
                                    <span key={sp} className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] px-1.5 py-0.2 rounded font-medium">
                                      🐝 {sp}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5">
                                  <span className="font-semibold text-emerald-800">{plant.approxPrice}</span>
                                  <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-mono">
                                    {plant.bloomingMonths.length} meses flor
                                  </span>
                                </div>
                              </div>

                              {/* Direct Action Buttons */}
                              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-stone-100">
                                <a
                                  href={plant.raizerUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 px-2 rounded-xl text-[11px] flex items-center justify-center space-x-1 shadow-2xs transition-colors text-center"
                                >
                                  <Store className="w-3 h-3 text-emerald-300" />
                                  <span>Ver Muda</span>
                                </a>

                                {onAddFlora && (
                                  <button
                                    onClick={() => handleImportRaizerPlant(plant)}
                                    disabled={isImportedThis}
                                    className={`font-bold py-1.5 px-2 rounded-xl text-[11px] flex items-center justify-center space-x-1 transition-colors text-center cursor-pointer ${
                                      isImportedThis
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                                    }`}
                                  >
                                    {isImportedThis ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        <span>Adicionado!</span>
                                      </>
                                    ) : (
                                      <>
                                        <PlusCircle className="w-3 h-3" />
                                        <span>+ Catálogo</span>
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
                  </div>
                );
              })()}

              {/* Markdown Content Display with Delicate, Elegant Typography */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-7 shadow-sm space-y-4 font-sans antialiased">
                <div className="max-w-none text-[13.5px] sm:text-[14.5px] text-stone-700 leading-relaxed space-y-3 font-normal">
                  {result.text.split('\n\n').map((paragraph, pIdx) => {
                    const trimmed = paragraph.trim();

                    // Check if Structured Catalog Summary Block
                    if (
                      trimmed.includes('### 📋 Resumo Estruturado para Catálogo') ||
                      (trimmed.includes('NOME_POPULAR:') && trimmed.includes('NOME_CIENTIFICO:'))
                    ) {
                      const lines = trimmed.split('\n');
                      const fields: { [key: string]: string } = {};
                      lines.forEach((l) => {
                        const colonIdx = l.indexOf(':');
                        if (colonIdx > 0 && !l.startsWith('#')) {
                          const key = l.substring(0, colonIdx).trim().replace(/^[-*]\s*/, '');
                          const val = l.substring(colonIdx + 1).trim();
                          fields[key] = val;
                        }
                      });

                      return (
                        <div
                          key={pIdx}
                          className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-stone-50 border border-emerald-200/80 shadow-2xs space-y-3 text-xs sm:text-sm"
                        >
                          <div className="flex items-center justify-between border-b border-emerald-200/70 pb-2">
                            <span className="font-semibold text-xs tracking-wide uppercase text-emerald-900 flex items-center space-x-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Ficha Técnica Resumida (Pronta para Catálogo)</span>
                            </span>
                            <span className="text-[11px] text-emerald-700 font-medium bg-emerald-100/70 px-2 py-0.5 rounded-full">
                              Validado Embrapa / Flora
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {fields['NOME_POPULAR'] && (
                              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                                <span className="text-[11px] text-stone-500 font-medium block">Nome Popular / Pasto</span>
                                <span className="text-stone-900 font-semibold text-xs sm:text-sm">{fields['NOME_POPULAR']}</span>
                              </div>
                            )}
                            {fields['NOME_CIENTIFICO'] && (
                              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                                <span className="text-[11px] text-stone-500 font-medium block">Nome Científico</span>
                                <span className="text-emerald-950 font-semibold italic text-xs sm:text-sm">{fields['NOME_CIENTIFICO']}</span>
                              </div>
                            )}
                            {fields['FAMILIA'] && (
                              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                                <span className="text-[11px] text-stone-500 font-medium block">Família Botânica</span>
                                <span className="text-stone-800 font-medium text-xs sm:text-sm">{fields['FAMILIA']}</span>
                              </div>
                            )}
                            {fields['RECURSO'] && (
                              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                                <span className="text-[11px] text-stone-500 font-medium block">Recursos Principais</span>
                                <span className="text-amber-800 font-semibold text-xs sm:text-sm">{fields['RECURSO']}</span>
                              </div>
                            )}
                            {fields['MESES_FLORADA'] && (
                              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                                <span className="text-[11px] text-stone-500 font-medium block">Meses de Florada</span>
                                <span className="text-emerald-800 font-medium text-xs">
                                  {fields['MESES_FLORADA'].split(',').map((m) => {
                                    const monthNames = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                                    return monthNames[parseInt(m.trim())] || m;
                                  }).join(' • ')}
                                </span>
                              </div>
                            )}
                            {fields['REGIAO'] && (
                              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                                <span className="text-[11px] text-stone-500 font-medium block">Região / Bioma</span>
                                <span className="text-stone-800 font-medium text-xs">{fields['REGIAO']}</span>
                              </div>
                            )}
                          </div>

                          {fields['ESPECIES_ATENDIDAS'] && (
                            <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                              <span className="text-[11px] text-stone-500 font-medium block">Abelhas Nativas Beneficiadas</span>
                              <span className="text-emerald-950 font-medium text-xs leading-relaxed">{fields['ESPECIES_ATENDIDAS']}</span>
                            </div>
                          )}

                          {fields['DESCRICAO_CURTA'] && (
                            <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                              <span className="text-[11px] text-stone-500 font-medium block">Resumo Técnico</span>
                              <p className="text-stone-700 text-xs leading-relaxed mt-0.5">{fields['DESCRICAO_CURTA']}</p>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Main Title Header (#)
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h2
                          key={pIdx}
                          className="text-lg sm:text-xl font-semibold text-stone-900 border-b border-stone-100 pb-3 pt-1 flex items-center justify-between tracking-tight"
                        >
                          <span className="text-stone-950">{paragraph.replace(/^#\s*/, '')}</span>
                        </h2>
                      );
                    }

                    // Level 3 Section Header (###)
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3
                          key={pIdx}
                          className="text-sm sm:text-[15px] font-semibold text-emerald-950 bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-transparent px-3.5 py-2 rounded-xl border border-emerald-100/90 mt-5 mb-2 flex items-center space-x-2 tracking-tight"
                        >
                          <span>{paragraph.replace(/^###\s*/, '')}</span>
                        </h3>
                      );
                    }

                    // Level 2 Section Header (##)
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h3
                          key={pIdx}
                          className="text-[15px] sm:text-base font-semibold text-stone-900 mt-4 mb-2 tracking-tight flex items-center space-x-1.5"
                        >
                          <span>{paragraph.replace(/^##\s*/, '')}</span>
                        </h3>
                      );
                    }

                    // Render lines with delicate bullet points and refined emphasis
                    const lines = paragraph.split('\n');
                    return (
                      <div key={pIdx} className="space-y-2">
                        {lines.map((line, lIdx) => {
                          const trimmedLine = line.trim();

                          if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                            const content = trimmedLine.replace(/^[-*]\s*/, '');
                            return (
                              <div key={lIdx} className="flex items-start space-x-2.5 pl-1.5 py-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                                <div
                                  className="text-stone-700 leading-relaxed font-normal flex-1"
                                  dangerouslySetInnerHTML={{
                                    __html: content
                                      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-stone-900 font-semibold">$1</strong>')
                                      .replace(/\*([^*]+)\*/g, '<em class="italic text-stone-800 font-normal">$1</em>'),
                                  }}
                                />
                              </div>
                            );
                          }

                          if (trimmedLine.startsWith('---')) {
                            return <hr key={lIdx} className="my-4 border-stone-100" />;
                          }

                          if (!trimmedLine) return null;

                          return (
                            <p
                              key={lIdx}
                              className="text-stone-700 leading-relaxed font-normal"
                              dangerouslySetInnerHTML={{
                                __html: trimmedLine
                                  .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-stone-900 font-semibold">$1</strong>')
                                  .replace(/\*([^*]+)\*/g, '<em class="italic text-stone-800 font-normal">$1</em>'),
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Actions Footer */}
              <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-stone-500 font-medium">
                  💡 Deseja pesquisar outra planta nectarífera ou espécie de abelha?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setResult(null);
                      setSearchQuery('');
                    }}
                    className="bg-white hover:bg-stone-200 text-stone-800 font-bold px-4 py-2 rounded-xl border border-stone-300 transition-colors cursor-pointer"
                  >
                    Nova Pesquisa
                  </button>
                  {onAddFlora && (
                    <button
                      onClick={handleImportToCatalog}
                      disabled={imported}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      {imported ? 'Salvo no Catálogo' : 'Adicionar ao Catálogo'}
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="p-3.5 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">MeliApp Grounding Botânico & Meliponicultura</span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 font-bold px-3 py-1.5 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>

      {/* High-Res Photo Lightbox Modal */}
      {selectedImageModal && (
        <div 
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedImageModal(null)}
        >
          <div 
            className="bg-stone-900 rounded-3xl max-w-2xl w-full overflow-hidden border border-stone-700 shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 bg-black">
              <img
                src={selectedImageModal.url}
                alt={selectedImageModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
              <button
                onClick={() => setSelectedImageModal(null)}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer"
                title="Fechar Foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-5 text-white space-y-3 bg-stone-900">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold font-serif text-amber-300">
                  {selectedImageModal.title}
                </h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg font-mono border border-amber-500/30">
                  Viveiro Raízer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                {selectedImageModal.desc}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                <a
                  href={selectedImageModal.raizerUrl || 'https://www.raizerplantasparaabelhas.com.br'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Store className="w-4 h-4" />
                  <span>Ver Mudas no Site Raízer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSelectedImageModal(null)}
                  className="text-stone-400 hover:text-white text-xs font-semibold px-3 py-1.5"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
