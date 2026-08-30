import { useState, useEffect, useCallback, useRef } from 'react';
import { RaizerImageResult, FloraItem } from '../types';
import { RAIZER_PLANTS_CATALOG, findMatchingRaizerPlants, resolvePlantExactImage } from '../data/raizerFloraData';

interface UseRaizerFloraSearchReturn {
  results: RaizerImageResult[];
  loading: boolean;
  error: string | null;
  isLiveScraped: boolean;
  searchRaizerImages: (term: string) => Promise<RaizerImageResult[]>;
  getBestImageForPlant: (plantName: string, scientificName?: string) => string | undefined;
  getRaizerProductForPlant: (plantName: string, scientificName?: string) => RaizerImageResult | undefined;
  cache: Record<string, RaizerImageResult[]>;
}

// In-memory global cache across component remounts
const globalRaizerImageCache: Record<string, RaizerImageResult[]> = {};

export function useRaizerFloraSearch(initialQuery: string = ''): UseRaizerFloraSearchReturn {
  const [results, setResults] = useState<RaizerImageResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiveScraped, setIsLiveScraped] = useState<boolean>(false);
  const [cache, setCache] = useState<Record<string, RaizerImageResult[]>>(globalRaizerImageCache);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Core search / scraping method
  const searchRaizerImages = useCallback(async (term: string): Promise<RaizerImageResult[]> => {
    const cleanTerm = term.trim();
    if (!cleanTerm) {
      // Default to curated top plants
      const defaultItems: RaizerImageResult[] = RAIZER_PLANTS_CATALOG.map((p) => ({
        id: p.id,
        title: p.plantName,
        scientificName: p.scientificName,
        imageUrl: p.imageUrl,
        productUrl: p.raizerUrl,
        price: p.approxPrice,
        category: p.category,
        description: p.description,
        source: 'raizer_catalog',
        bloomingMonths: p.bloomingMonths,
        attractiveForSpecies: p.attractiveForSpecies,
        valueType: p.valueType,
      }));
      setResults(defaultItems);
      setIsLiveScraped(false);
      return defaultItems;
    }

    const cacheKey = cleanTerm.toLowerCase();
    if (globalRaizerImageCache[cacheKey]) {
      setResults(globalRaizerImageCache[cacheKey]);
      return globalRaizerImageCache[cacheKey];
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/raizer/search-images?q=${encodeURIComponent(cleanTerm)}`);
      
      if (!response.ok) {
        throw new Error(`Erro na busca Raízer: status ${response.status}`);
      }

      const data = await response.json();
      const rawResults: RaizerImageResult[] = data.results || [];
      setIsLiveScraped(!!data.scrapingLive);

      // If backend returned results, save to state & cache
      if (rawResults.length > 0) {
        globalRaizerImageCache[cacheKey] = rawResults;
        setCache((prev) => ({ ...prev, [cacheKey]: rawResults }));
        setResults(rawResults);
        return rawResults;
      }

      // Offline / Fallback to client-side catalog matching
      const localMatched = findMatchingRaizerPlants(cleanTerm);
      const fallbackResults: RaizerImageResult[] = localMatched.map((p) => ({
        id: p.id,
        title: p.plantName,
        scientificName: p.scientificName,
        imageUrl: p.imageUrl,
        productUrl: p.raizerUrl,
        price: p.approxPrice,
        category: p.category,
        description: p.description,
        source: 'raizer_catalog',
        bloomingMonths: p.bloomingMonths,
        attractiveForSpecies: p.attractiveForSpecies,
        valueType: p.valueType,
      }));

      globalRaizerImageCache[cacheKey] = fallbackResults;
      setCache((prev) => ({ ...prev, [cacheKey]: fallbackResults }));
      setResults(fallbackResults);
      return fallbackResults;
    } catch (err: any) {
      console.warn('[useRaizerFloraSearch] Scraping remoto indisponível, usando catálogo local:', err?.message);
      setError(err?.message || 'Não foi possível completar o scraping ao vivo.');

      // Fallback to local catalog
      const localMatched = findMatchingRaizerPlants(cleanTerm);
      const fallbackResults: RaizerImageResult[] = localMatched.map((p) => ({
        id: p.id,
        title: p.plantName,
        scientificName: p.scientificName,
        imageUrl: p.imageUrl,
        productUrl: p.raizerUrl,
        price: p.approxPrice,
        category: p.category,
        description: p.description,
        source: 'raizer_catalog',
        bloomingMonths: p.bloomingMonths,
        attractiveForSpecies: p.attractiveForSpecies,
        valueType: p.valueType,
      }));

      setResults(fallbackResults);
      return fallbackResults;
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced auto-search when initialQuery changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      searchRaizerImages(initialQuery);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [initialQuery, searchRaizerImages]);

  // Helper function to resolve the best image for any plant
  const getBestImageForPlant = useCallback((plantName: string, scientificName?: string): string | undefined => {
    const combined = `${plantName} ${scientificName || ''}`.trim();
    
    // 1. Direct high-accuracy exact map
    const exact = resolvePlantExactImage(combined);
    if (exact?.imageUrl) return exact.imageUrl;

    // 2. Check cached results
    const combinedLower = combined.toLowerCase();
    for (const key of Object.keys(globalRaizerImageCache)) {
      if (combinedLower.includes(key)) {
        const found = globalRaizerImageCache[key][0];
        if (found?.imageUrl) return found.imageUrl;
      }
    }

    // 3. Check catalog directly
    const catalogMatch = findMatchingRaizerPlants(combined);
    if (catalogMatch.length > 0 && catalogMatch[0].imageUrl) {
      return catalogMatch[0].imageUrl;
    }

    return undefined;
  }, []);

  // Helper function to resolve the product item for any plant
  const getRaizerProductForPlant = useCallback((plantName: string, scientificName?: string): RaizerImageResult | undefined => {
    const combined = `${plantName} ${scientificName || ''}`.trim();

    // 1. Direct high-accuracy exact map
    const exact = resolvePlantExactImage(combined);
    if (exact) {
      const matchInCatalog = RAIZER_PLANTS_CATALOG.find(p => p.imageUrl === exact.imageUrl || (exact.raizerUrl && p.raizerUrl === exact.raizerUrl));
      if (matchInCatalog) {
        return {
          id: matchInCatalog.id,
          title: matchInCatalog.plantName,
          scientificName: matchInCatalog.scientificName,
          imageUrl: matchInCatalog.imageUrl,
          productUrl: matchInCatalog.raizerUrl,
          price: matchInCatalog.approxPrice,
          category: matchInCatalog.category,
          description: matchInCatalog.description,
          source: 'raizer_catalog',
          bloomingMonths: matchInCatalog.bloomingMonths,
          attractiveForSpecies: matchInCatalog.attractiveForSpecies,
          valueType: matchInCatalog.valueType,
        };
      }
      return {
        id: 'exact-match',
        title: exact.matchedTitle || plantName,
        scientificName: scientificName || plantName,
        imageUrl: exact.imageUrl,
        productUrl: exact.raizerUrl || 'https://www.raizerplantasparaabelhas.com.br',
        price: 'Muda no Viveiro Raízer',
        category: 'Planta Meliponófila',
        description: 'Muda verificada no catálogo Raízer com correspondência botânica direta.',
        source: 'raizer_catalog',
        bloomingMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        attractiveForSpecies: ['Jataí', 'Mandaçaia', 'Uruçu', 'Iraí'],
        valueType: 'Néctar & Pólen',
      };
    }

    const catalogMatch = findMatchingRaizerPlants(combined);
    if (catalogMatch.length > 0) {
      const p = catalogMatch[0];
      return {
        id: p.id,
        title: p.plantName,
        scientificName: p.scientificName,
        imageUrl: p.imageUrl,
        productUrl: p.raizerUrl,
        price: p.approxPrice,
        category: p.category,
        description: p.description,
        source: 'raizer_catalog',
        bloomingMonths: p.bloomingMonths,
        attractiveForSpecies: p.attractiveForSpecies,
        valueType: p.valueType,
      };
    }

    return undefined;
  }, []);

  return {
    results,
    loading,
    error,
    isLiveScraped,
    searchRaizerImages,
    getBestImageForPlant,
    getRaizerProductForPlant,
    cache,
  };
}
