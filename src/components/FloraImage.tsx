import React, { useState, useEffect } from 'react';
import { Flower2, Maximize2, ImageOff, Sparkles } from 'lucide-react';
import { DEFAULT_FLORA_FALLBACK_IMG } from '../utils/imageFallback';

interface FloraImageProps {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  plantName: string;
  scientificName?: string;
  category?: string;
  valueType?: string;
  iconBg?: string;
  onClick?: () => void;
  aspectRatioClass?: string;
  className?: string;
  showZoomBadge?: boolean;
}

export const FloraImage: React.FC<FloraImageProps> = ({
  src,
  fallbackSrc,
  alt,
  plantName,
  scientificName,
  category,
  valueType,
  iconBg = 'bg-amber-100 text-amber-800',
  onClick,
  aspectRatioClass = 'aspect-16/9',
  className = '',
  showZoomBadge = true,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state if src changes
  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setHasError(!src && !fallbackSrc);
    setTriedFallback(false);
    setIsLoading(Boolean(src || fallbackSrc));
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError || !currentSrc) {
    // Rich Botanical Placeholder Card when image is missing or failed
    return (
      <div
        className={`relative w-full ${aspectRatioClass} bg-gradient-to-br from-stone-100 via-amber-50/50 to-stone-200/80 border-b border-stone-200 flex flex-col items-center justify-between p-4 overflow-hidden select-none ${className}`}
        onClick={onClick}
      >
        {/* Subtle floral background geometry */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-amber-200/30 blur-xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-emerald-200/30 blur-lg pointer-events-none" />

        {/* Top Badges */}
        <div className="w-full flex items-center justify-between z-10">
          <span className="bg-white/90 backdrop-blur-xs text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-stone-200 shadow-2xs flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Pasto Meliponófilo</span>
          </span>
          {valueType && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${iconBg}`}>
              {valueType}
            </span>
          )}
        </div>

        {/* Center Botanical Illustration */}
        <div className="flex flex-col items-center justify-center my-auto z-10 text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-200 flex items-center justify-center text-amber-600">
            <Flower2 className="w-6 h-6 animate-pulse text-amber-600" />
          </div>
          <span className="text-xs font-bold text-stone-800 font-serif leading-tight line-clamp-1 max-w-[200px]">
            {plantName}
          </span>
          {scientificName && (
            <span className="text-[10px] text-stone-400 italic font-mono line-clamp-1 max-w-[200px]">
              {scientificName}
            </span>
          )}
        </div>

        {/* Bottom indicator */}
        <div className="w-full flex items-center justify-center z-10 pt-1">
          <span className="text-[10px] text-stone-400 font-medium flex items-center space-x-1">
            <ImageOff className="w-3 h-3 text-stone-400" />
            <span>Foto ilustrativa</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectRatioClass} bg-stone-100 overflow-hidden group cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center z-10">
          <Flower2 className="w-8 h-8 text-stone-400 animate-bounce" />
        </div>
      )}

      {/* Image with no-referrer policy */}
      <img
        src={currentSrc}
        alt={alt || plantName}
        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Hover Overlay */}
      {showZoomBadge && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 z-20">
          <span className="text-white text-xs font-semibold flex items-center space-x-1">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Ampliar Foto</span>
          </span>
          <span className="bg-amber-400 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Muda / Flor
          </span>
        </div>
      )}

      {/* Value Type Badge on top right */}
      {valueType && (
        <span
          className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs border z-20 backdrop-blur-xs ${iconBg}`}
        >
          {valueType}
        </span>
      )}
    </div>
  );
};
