import React, { useState, useEffect } from 'react';
import { Camera, Box, Layers, Eye, Sparkles, Upload, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { BeeSpecies } from '../types';
import { SpeciesMorphologyDiagram } from './SpeciesMorphologyDiagram';
import { useImageFallback, BEE_SVG_PLACEHOLDER, BEE_ENTRY_SVG_PLACEHOLDER, BEE_GUIDE_SVG_PLACEHOLDER } from '../hooks/useImageFallback';
import speciesPhotosMeta from '../data/speciesPhotosMeta.json';

interface SpeciesImageProps {
  species: BeeSpecies;
  viewMode?: 'worker' | 'entry' | 'nest' | 'diagram';
  onViewModeChange?: (mode: 'worker' | 'entry' | 'nest' | 'diagram') => void;
  aspectRatioClass?: string;
  className?: string;
  showControls?: boolean;
  onOpenGroundingPhotos?: () => void;
  onUploadCustomPhoto?: (speciesId: string, photoUrl: string, type: 'worker' | 'entry') => void;
  onClick?: () => void;
  priority?: boolean;
}

export const SpeciesImage: React.FC<SpeciesImageProps> = ({
  species,
  viewMode = 'worker',
  onViewModeChange,
  aspectRatioClass = 'aspect-16/10',
  className = '',
  showControls = true,
  onOpenGroundingPhotos,
  onUploadCustomPhoto,
  onClick,
  priority = false,
}) => {
  const [internalMode, setInternalMode] = useState<'worker' | 'entry' | 'nest' | 'diagram'>(viewMode);

  // Sync external viewMode with internalMode
  useEffect(() => {
    setInternalMode(viewMode);
  }, [viewMode]);

  const activeMode = onViewModeChange ? viewMode : internalMode;

  const handleModeChange = (mode: 'worker' | 'entry' | 'nest' | 'diagram', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onViewModeChange) {
      onViewModeChange(mode);
    } else {
      setInternalMode(mode);
    }
  };

  const metaData = (speciesPhotosMeta as Record<string, { workerUrl?: string; entryUrl?: string }>)[species.id];

  // Resolve primary and secondary fallback URLs from robust structure
  const primarySrc = (() => {
    const customWorker = localStorage.getItem(`custom_photo_${species.id}_worker`);
    const customEntry = localStorage.getItem(`custom_photo_${species.id}_entry`);

    if (activeMode === 'worker') {
      return customWorker || species.images?.worker?.url || species.url_foto_especie || species.imageUrl || '';
    }
    if (activeMode === 'entry') {
      return customEntry || species.images?.entry?.url || species.url_foto_entrada || species.entryImageUrl || species.nestImageUrl || '';
    }
    if (activeMode === 'nest') {
      return species.images?.nest?.url || species.nestImageUrl || species.url_foto_entrada || species.entryImageUrl || species.imageUrl || '';
    }
    return species.images?.guide?.url || species.url_foto_guia || species.guideImageUrl || '';
  })();

  const secondaryFallbackUrl = (() => {
    if (activeMode === 'worker') {
      return species.images?.worker?.fallbackUrl || metaData?.workerUrl || '';
    }
    if (activeMode === 'entry' || activeMode === 'nest') {
      return species.images?.entry?.fallbackUrl || metaData?.entryUrl || '';
    }
    return species.images?.guide?.fallbackUrl || metaData?.workerUrl || '';
  })();

  const fallbackType = activeMode === 'entry' ? 'entry' : activeMode === 'diagram' ? 'guide' : 'worker';

  const {
    currentSrc,
    isLoading,
    hasError,
    isFallback,
    handleError,
    handleLoad,
    reset,
  } = useImageFallback(primarySrc, {
    fallbackUrl: secondaryFallbackUrl,
    type: fallbackType,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const type = activeMode === 'entry' ? 'entry' : 'worker';
        localStorage.setItem(`custom_photo_${species.id}_${type}`, dataUrl);
        if (onUploadCustomPhoto) {
          onUploadCustomPhoto(species.id, dataUrl, type);
        }
        reset();
      }
    };
    reader.readAsDataURL(file);
  };

  const currentCredit = (() => {
    if (activeMode === 'entry') {
      return species.images?.entry?.credit || species.entryPhotoCredit || 'Foto: Arquitetura de Entrada e Ninho';
    }
    if (activeMode === 'diagram') {
      return species.images?.guide?.credit || species.guidePhotoCredit || 'Foto: Guia Morfológico e Diagnóstico Taxonômico';
    }
    return species.images?.worker?.credit || species.photoCredit || 'Foto: Guia SEAPI/DDPA RS & Embrapa';
  })();

  return (
    <div 
      id={`species-img-${species.id}`}
      className={`relative ${aspectRatioClass} bg-stone-950 overflow-hidden group select-none ${className}`}
      onClick={onClick}
    >
      {activeMode === 'diagram' ? (
        <div className="w-full h-full bg-stone-950 flex items-center justify-center">
          <SpeciesMorphologyDiagram species={species} />
        </div>
      ) : (
        <div className="w-full h-full relative">
          <img
            src={currentSrc}
            alt={species.images?.[activeMode === 'entry' ? 'entry' : 'worker']?.alt || `${species.popularName} - ${activeMode === 'worker' ? 'Operária' : activeMode === 'entry' ? 'Entrada' : 'Ninho'}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
          />

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs flex items-center justify-center z-10 pointer-events-none">
              <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
            </div>
          )}

          {/* Fallback Notice Badge if rendering SVG placeholder */}
          {hasError && (
            <div className="absolute bottom-10 left-2.5 z-20 pointer-events-none">
              <span className="bg-amber-950/90 border border-amber-500/50 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm backdrop-blur-md">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>Ilustração Vetorial ASF</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Top Floating Badges & View Selector Tabs */}
      {showControls && (
        <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none z-10">
          
          {/* Active View Label */}
          <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs pointer-events-auto flex items-center gap-1.5">
            {activeMode === 'worker' && <Camera className="w-3 h-3 text-amber-400" />}
            {activeMode === 'entry' && <Box className="w-3 h-3 text-amber-400" />}
            {activeMode === 'nest' && <Layers className="w-3 h-3 text-amber-400" />}
            {activeMode === 'diagram' && <Eye className="w-3 h-3 text-amber-400" />}
            <span>
              {activeMode === 'worker' ? 'Operária' : activeMode === 'entry' ? 'Entrada' : activeMode === 'nest' ? 'Ninho' : 'Guia & Anatomia'}
            </span>
          </span>

          {/* Mini View Mode Switchers */}
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-0.5 rounded-xl border border-white/20 pointer-events-auto shadow-sm">
            <button
              id={`btn-photo-worker-${species.id}`}
              onClick={(e) => handleModeChange('worker', e)}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                activeMode === 'worker'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/15'
              }`}
              title="Foto da Operária (Abelha)"
            >
              Abelha
            </button>

            <button
              id={`btn-photo-entry-${species.id}`}
              onClick={(e) => handleModeChange('entry', e)}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                activeMode === 'entry'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/15'
              }`}
              title="Foto da Entrada do Ninho"
            >
              Entrada
            </button>

            <button
              id={`btn-photo-diag-${species.id}`}
              onClick={(e) => handleModeChange('diagram', e)}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                activeMode === 'diagram'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/15'
              }`}
              title="Guia Anatômico e Arquitetura da Entrada"
            >
              Guia
            </button>
          </div>
        </div>
      )}

      {/* Bottom Overlay with Institutional Reference & Quick Actions */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2.5 pt-7 flex items-center justify-between text-[10px] text-stone-300 z-10 pointer-events-auto">
        <span className="truncate max-w-[200px] sm:max-w-[240px] text-stone-300/90 font-medium text-[10px]" title={currentCredit}>
          {currentCredit}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Custom photo upload trigger */}
          <label 
            id={`upload-photo-${species.id}`}
            className="bg-black/70 hover:bg-amber-500 hover:text-stone-950 text-stone-300 text-[10px] font-bold p-1.5 rounded-lg border border-white/20 transition-all cursor-pointer hover:border-amber-400"
            title="Enviar minha própria foto desta espécie"
            onClick={(e) => e.stopPropagation()}
          >
            <Upload className="w-3 h-3" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>

          {onOpenGroundingPhotos && (
            <button
              id={`btn-grounding-photo-${species.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onOpenGroundingPhotos();
              }}
              className="bg-black/70 hover:bg-teal-500 hover:text-stone-950 text-stone-300 text-[10px] font-bold p-1.5 rounded-lg border border-white/20 transition-all cursor-pointer hover:border-teal-400"
              title="Buscar fotos complementares no Google"
            >
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
