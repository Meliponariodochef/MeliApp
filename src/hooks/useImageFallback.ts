import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Professional, handcrafted SVG Placeholders for Stingless Bees (ASF)
 * Features:
 * - Geometric honeycomb background
 * - Warm amber/honey palette (#F59E0B, #D97706, #78350F, #FEF3C7)
 * - Anatomically refined stingless bee silhouette with delicate translucent wings
 * - Clean badges and typography
 */

export const BEE_SVG_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1C1917" />
      <stop offset="50%" stop-color="#292524" />
      <stop offset="100%" stop-color="#1C1917" />
    </linearGradient>
    <linearGradient id="honeyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#451A03" />
      <stop offset="50%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#291104" />
    </linearGradient>
    <linearGradient id="wingGradL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0.35" />
    </linearGradient>
    <linearGradient id="wingGradR" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0.35" />
    </linearGradient>
    <pattern id="hexGrid" width="40" height="69.282" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 20 11.547 L 0 0 L 0 23.094 L 20 34.641 L 40 23.094 Z M 0 34.641 L 20 46.188 L 0 57.735 L 0 80.829 L 20 92.376 L 40 80.829 L 40 57.735 L 20 46.188 Z" fill="none" stroke="#F59E0B" stroke-width="1" stroke-opacity="0.12"/>
    </pattern>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="400" fill="url(#bgGrad)" />
  <rect width="600" height="400" fill="url(#hexGrid)" />

  <!-- Ambient Glow -->
  <circle cx="300" cy="180" r="130" fill="#F59E0B" opacity="0.12" filter="url(#glow)" />

  <!-- Central Emblem Container -->
  <g transform="translate(300, 175)">
    <!-- Hexagon Frame -->
    <polygon points="0,-100 86.6,-50 86.6,50 0,100 -86.6,50 -86.6,-50" fill="#292524" stroke="url(#honeyGrad)" stroke-width="2.5" opacity="0.9" />

    <!-- Left Wing Set -->
    <g transform="rotate(-28, -12, -20)">
      <path d="M -15 -20 C -70 -100 -120 -50 -40 -10 C -25 0 -15 -10 -15 -20 Z" fill="url(#wingGradL)" stroke="#BAE6FD" stroke-width="1.5" stroke-opacity="0.6"/>
      <path d="M -20 -15 C -80 -45 -95 10 -40 10 Z" fill="url(#wingGradL)" stroke="#BAE6FD" stroke-width="1" stroke-opacity="0.4"/>
      <!-- Wing Veins -->
      <path d="M -20 -20 Q -60 -50 -85 -55 M -50 -35 Q -80 -25 -40 -12" stroke="#FFFFFF" stroke-width="0.8" stroke-opacity="0.5" fill="none"/>
    </g>

    <!-- Right Wing Set -->
    <g transform="rotate(28, 12, -20)">
      <path d="M 15 -20 C 70 -100 120 -50 40 -10 C 25 0 15 -10 15 -20 Z" fill="url(#wingGradR)" stroke="#BAE6FD" stroke-width="1.5" stroke-opacity="0.6"/>
      <path d="M 20 -15 C 80 -45 95 10 40 10 Z" fill="url(#wingGradR)" stroke="#BAE6FD" stroke-width="1" stroke-opacity="0.4"/>
      <!-- Wing Veins -->
      <path d="M 20 -20 Q 60 -50 85 -55 M 50 -35 Q 80 -25 40 -12" stroke="#FFFFFF" stroke-width="0.8" stroke-opacity="0.5" fill="none"/>
    </g>

    <!-- Bee Legs -->
    <path d="M -18 -5 Q -42 -2 -50 20 M -18 10 Q -48 20 -45 42 M 18 -5 Q 42 -2 50 20 M 18 10 Q 48 20 45 42" stroke="#78350F" stroke-width="3" stroke-linecap="round" fill="none"/>

    <!-- Bee Abdomen with Meliponini Stripes -->
    <ellipse cx="0" cy="35" rx="22" ry="32" fill="url(#bodyGrad)" stroke="#F59E0B" stroke-width="1.5" />
    <path d="M -18 18 Q 0 25 18 18" stroke="#FDE68A" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.95"/>
    <path d="M -20 30 Q 0 38 20 30" stroke="#FDE68A" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.95"/>
    <path d="M -18 42 Q 0 50 18 42" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.95"/>
    <path d="M -12 54 Q 0 60 12 54" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>

    <!-- Bee Thorax -->
    <ellipse cx="0" cy="-8" rx="20" ry="18" fill="url(#bodyGrad)" stroke="#F59E0B" stroke-width="1.5" />
    <!-- Thorax Fur/Pubescence -->
    <ellipse cx="0" cy="-8" rx="16" ry="14" fill="#D97706" opacity="0.4" />
    <circle cx="-6" cy="-12" r="3" fill="#FDE68A" opacity="0.6"/>
    <circle cx="6" cy="-12" r="3" fill="#FDE68A" opacity="0.6"/>

    <!-- Bee Head -->
    <ellipse cx="0" cy="-30" rx="16" ry="13" fill="#1C1917" stroke="#78350F" stroke-width="1.2" />
    <!-- Compound Eyes (Iris Greenish/Amber Iridescent) -->
    <ellipse cx="-11" cy="-30" rx="5" ry="8" transform="rotate(-15, -11, -30)" fill="#10B981" opacity="0.85" stroke="#047857" stroke-width="1"/>
    <ellipse cx="11" cy="-30" rx="5" ry="8" transform="rotate(15, 11, -30)" fill="#10B981" opacity="0.85" stroke="#047857" stroke-width="1"/>
    <ellipse cx="-11" cy="-32" rx="2" ry="4" fill="#A7F3D0" opacity="0.6"/>
    <ellipse cx="11" cy="-32" rx="2" ry="4" fill="#A7F3D0" opacity="0.6"/>

    <!-- Antennae -->
    <path d="M -5 -38 C -12 -58 -32 -55 -28 -68" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <path d="M 5 -38 C 12 -58 32 -55 28 -68" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <circle cx="-28" cy="-68" r="2.5" fill="#FDE68A"/>
    <circle cx="28" cy="-68" r="2.5" fill="#FDE68A"/>
  </g>

  <!-- Typography & Badge -->
  <g transform="translate(300, 335)">
    <rect x="-130" y="-18" width="260" height="36" rx="18" fill="#292524" stroke="#F59E0B" stroke-width="1.5" stroke-opacity="0.6"/>
    <circle cx="-105" cy="0" r="4" fill="#10B981"/>
    <text x="-90" y="5" fill="#FDE68A" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1">CATÁLOGO ASF</text>
    <text x="50" y="5" fill="#A8A29E" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500">Foto Ilustrativa</text>
  </g>
  <text x="300" y="375" text-anchor="middle" fill="#78716C" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500">Abelha Nativa Sem Ferrão • Meliponário Racional</text>
</svg>
`)}`;

export const BEE_ENTRY_SVG_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="entryBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1C1917" />
      <stop offset="50%" stop-color="#262320" />
      <stop offset="100%" stop-color="#141210" />
    </linearGradient>
    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#451A03" />
      <stop offset="50%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#451A03" />
    </linearGradient>
    <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="50%" stop-color="#92400E" />
      <stop offset="100%" stop-color="#451A03" />
    </linearGradient>
    <radialGradient id="holeDark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" />
      <stop offset="75%" stop-color="#1C1917" />
      <stop offset="100%" stop-color="#451A03" />
    </radialGradient>
  </defs>

  <rect width="600" height="400" fill="url(#entryBg)" />

  <!-- Trunk / Hive Wall Texture -->
  <rect x="60" y="40" width="480" height="320" rx="16" fill="url(#woodGrad)" stroke="#B45309" stroke-width="2" opacity="0.9" />
  
  <!-- Bark / Geopropolis Grooves -->
  <path d="M 120 40 Q 140 180 130 360 M 200 40 Q 180 200 210 360 M 400 40 Q 420 220 390 360 M 470 40 Q 450 170 480 360" stroke="#291104" stroke-width="4" fill="none" opacity="0.6"/>

  <!-- Entrance Tube / Pito de Entrada Structure -->
  <g transform="translate(300, 180)">
    <!-- Radiating Geopropolis Lines -->
    <path d="M 0 0 L -80 -60 M 0 0 L 80 -60 M 0 0 L -90 40 M 0 0 L 90 40 M 0 0 L 0 -90 M 0 0 L -60 70 M 0 0 L 60 70" stroke="#78350F" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
    <path d="M 0 0 L -50 -40 M 0 0 L 50 -40 M 0 0 L -60 20 M 0 0 L 60 20" stroke="#D97706" stroke-width="3" stroke-linecap="round" opacity="0.9"/>

    <!-- External Wax / Cerumen Ring -->
    <ellipse cx="0" cy="0" rx="55" ry="50" fill="url(#tubeGrad)" stroke="#F59E0B" stroke-width="3" />
    <!-- Tube Opening / Orifício -->
    <ellipse cx="0" cy="0" rx="34" ry="30" fill="url(#holeDark)" stroke="#291104" stroke-width="2" />

    <!-- Sentinel Guard Bees (Sentinelas no Pito) -->
    <!-- Bee 1 hovering at entrance -->
    <g transform="translate(-18, -12) scale(0.45)">
      <ellipse cx="0" cy="15" rx="10" ry="16" fill="#D97706"/>
      <ellipse cx="0" cy="-2" rx="8" ry="8" fill="#451A03"/>
      <ellipse cx="-15" cy="-8" rx="18" ry="8" fill="#BAE6FD" opacity="0.75" transform="rotate(-30)"/>
      <ellipse cx="15" cy="-8" rx="18" ry="8" fill="#BAE6FD" opacity="0.75" transform="rotate(30)"/>
    </g>

    <!-- Bee 2 perched at the rim -->
    <g transform="translate(22, 10) scale(0.45)">
      <ellipse cx="0" cy="15" rx="10" ry="16" fill="#F59E0B"/>
      <ellipse cx="0" cy="-2" rx="8" ry="8" fill="#451A03"/>
      <ellipse cx="-12" cy="-6" rx="16" ry="7" fill="#BAE6FD" opacity="0.75" transform="rotate(-20)"/>
      <ellipse cx="12" cy="-6" rx="16" ry="7" fill="#BAE6FD" opacity="0.75" transform="rotate(20)"/>
    </g>
  </g>

  <!-- Bottom Badge -->
  <g transform="translate(300, 335)">
    <rect x="-140" y="-18" width="280" height="36" rx="18" fill="#1C1917" stroke="#F59E0B" stroke-width="1.5"/>
    <circle cx="-115" cy="0" r="4" fill="#F59E0B"/>
    <text x="-100" y="5" fill="#FDE68A" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700">PITO &amp; ENTRADA DO NINHO</text>
  </g>
  <text x="300" y="375" text-anchor="middle" fill="#A8A29E" font-family="system-ui, -apple-system, sans-serif" font-size="11">Arquitetura de Cerume, Geoprópolis e Resina</text>
</svg>
`)}`;

export const BEE_GUIDE_SVG_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="guideBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="accentCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
  </defs>

  <rect width="600" height="400" fill="url(#guideBg)" />

  <!-- Blueprint Grid -->
  <g stroke="#38BDF8" stroke-width="0.5" stroke-opacity="0.15">
    <line x1="50" y1="0" x2="50" y2="400" />
    <line x1="150" y1="0" x2="150" y2="400" />
    <line x1="250" y1="0" x2="250" y2="400" />
    <line x1="350" y1="0" x2="350" y2="400" />
    <line x1="450" y1="0" x2="450" y2="400" />
    <line x1="550" y1="0" x2="550" y2="400" />
    <line x1="0" y1="80" x2="600" y2="80" />
    <line x1="0" y1="160" x2="600" y2="160" />
    <line x1="0" y1="240" x2="600" y2="240" />
    <line x1="0" y1="320" x2="600" y2="320" />
  </g>

  <!-- Taxonomic Identification Target Lines -->
  <g transform="translate(300, 170)">
    <!-- Focus Circles -->
    <circle cx="0" cy="0" r="100" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.4"/>
    <circle cx="0" cy="0" r="60" fill="none" stroke="#F59E0B" stroke-width="1.5" opacity="0.6"/>

    <!-- Bee Silhouette Scheme -->
    <ellipse cx="0" cy="20" rx="16" ry="24" fill="#334155" stroke="#F59E0B" stroke-width="1.5"/>
    <ellipse cx="0" cy="-10" rx="14" ry="12" fill="#475569" stroke="#38BDF8" stroke-width="1.5"/>
    <ellipse cx="0" cy="-26" rx="10" ry="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>

    <!-- Measurement Callouts -->
    <line x1="-70" y1="-26" x2="-20" y2="-26" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="-70" cy="-26" r="3" fill="#38BDF8"/>
    <text x="-78" y="-22" fill="#38BDF8" font-family="monospace" font-size="10" text-anchor="end">Clípeo / Olhos</text>

    <line x1="70" y1="-10" x2="20" y2="-10" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="70" cy="-10" r="3" fill="#F59E0B"/>
    <text x="78" y="-6" fill="#F59E0B" font-family="monospace" font-size="10" text-anchor="start">Tórax &amp; Escutelo</text>

    <line x1="70" y1="20" x2="20" y2="20" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="70" cy="20" r="3" fill="#10B981"/>
    <text x="78" y="24" fill="#10B981" font-family="monospace" font-size="10" text-anchor="start">Faixas Tergais</text>
  </g>

  <!-- Bottom Title Badge -->
  <g transform="translate(300, 335)">
    <rect x="-150" y="-18" width="300" height="36" rx="18" fill="#0F172A" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="0" y="5" text-anchor="middle" fill="#38BDF8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700">DIAGNOSE MORFOLÓGICA ASF</text>
  </g>
  <text x="300" y="375" text-anchor="middle" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="11">Guia Taxonômico de Identificação de Campo</text>
</svg>
`)}`;

export interface ImageFallbackOptions {
  fallbackUrl?: string;
  placeholderSvg?: string;
  type?: 'worker' | 'entry' | 'guide' | 'general';
}

export interface UseImageFallbackReturn {
  currentSrc: string;
  isLoading: boolean;
  hasError: boolean;
  isFallback: boolean;
  handleError: () => void;
  handleLoad: () => void;
  reset: () => void;
  retryCount: number;
}

/**
 * Custom Hook: useImageFallback
 * Handles image fallback cascades:
 * 1. Primary provided src
 * 2. Secondary fallbackUrl (e.g. scientific CDN or secondary mirror)
 * 3. Ultimate vector SVG placeholder tailored for ASF species, nest entrances, or diagnostic guides
 */
export function useImageFallback(
  src: string | undefined | null,
  options: ImageFallbackOptions = {}
): UseImageFallbackReturn {
  const {
    fallbackUrl,
    type = 'worker',
    placeholderSvg = type === 'entry'
      ? BEE_ENTRY_SVG_PLACEHOLDER
      : type === 'guide'
      ? BEE_GUIDE_SVG_PLACEHOLDER
      : BEE_SVG_PLACEHOLDER,
  } = options;

  // Build the cascade list of candidate URLs
  const candidateUrls = useMemo(() => {
    const list: string[] = [];
    if (src && typeof src === 'string' && src.trim() !== '') {
      list.push(src.trim());
    }
    if (fallbackUrl && typeof fallbackUrl === 'string' && fallbackUrl.trim() !== '' && !list.includes(fallbackUrl.trim())) {
      list.push(fallbackUrl.trim());
    }
    list.push(placeholderSvg);
    return list;
  }, [src, fallbackUrl, placeholderSvg]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset when input candidates change
  useEffect(() => {
    setCurrentIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, [src, fallbackUrl]);

  const currentSrc = candidateUrls[currentIndex] || placeholderSvg;
  const isFinalSvg = currentSrc === placeholderSvg;
  const isFallback = currentIndex > 0;

  const handleError = useCallback(() => {
    if (currentIndex < candidateUrls.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  }, [currentIndex, candidateUrls.length]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, []);

  return {
    currentSrc,
    isLoading,
    hasError: hasError || (isFinalSvg && candidateUrls.length > 1 && currentIndex === candidateUrls.length - 1),
    isFallback,
    handleError,
    handleLoad,
    reset,
    retryCount: currentIndex,
  };
}
