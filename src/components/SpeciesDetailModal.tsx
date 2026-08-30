import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  Box, 
  Droplets, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Wind, 
  Calendar, 
  Globe, 
  HeartHandshake, 
  Sparkles,
  Info,
  ChevronRight,
  Plus,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Upload
} from 'lucide-react';
import { BeeSpecies } from '../types';
import { SpeciesImage } from './SpeciesImage';

interface SpeciesDetailModalProps {
  species: BeeSpecies | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenGroundingSearch: (query: string, mode: 'pasto' | 'care' | 'photos' | 'all') => void;
  onSelectForHive?: (speciesId: string) => void;
}

export const SpeciesDetailModal: React.FC<SpeciesDetailModalProps> = ({
  species,
  isOpen,
  onClose,
  onOpenGroundingSearch,
  onSelectForHive,
}) => {
  const [activePhotoTab, setActivePhotoTab] = useState<'worker' | 'entry' | 'nest' | 'diagram'>('worker');

  if (!isOpen || !species) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/50">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold border shadow-xs ${species.avatarBg}`}>
              🐝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {species.popularName}
                </h2>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  species.difficulty === 'Fácil'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                    : species.difficulty === 'Média'
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                }`}>
                  Manejo {species.difficulty}
                </span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-400 font-mono italic">
                {species.scientificName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Photo Viewer & Selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Main Photo Frame with SpeciesImage */}
            <div className="md:col-span-7 flex flex-col space-y-2">
              <div className="rounded-2xl overflow-hidden border border-stone-300 dark:border-stone-800 shadow-inner">
                <SpeciesImage
                  species={species}
                  viewMode={activePhotoTab}
                  onViewModeChange={setActivePhotoTab}
                  aspectRatioClass="aspect-4/3"
                  onOpenGroundingPhotos={() => onOpenGroundingSearch(`Fotos e identificação de ${species.popularName} (${species.scientificName})`, 'photos')}
                />
              </div>

              {/* Photo Selector Tabs */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <button
                  onClick={() => setActivePhotoTab('worker')}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                    activePhotoTab === 'worker'
                      ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Operária</span>
                </button>

                <button
                  onClick={() => setActivePhotoTab('entry')}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                    activePhotoTab === 'entry'
                      ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Entrada</span>
                </button>

                <button
                  onClick={() => setActivePhotoTab('nest')}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                    activePhotoTab === 'nest'
                      ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Ninho</span>
                </button>

                <button
                  onClick={() => setActivePhotoTab('diagram')}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                    activePhotoTab === 'diagram'
                      ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Anatomia</span>
                </button>
              </div>
            </div>

            {/* Quick Specs & Morphological Highlights */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Ficha Técnica & Manejo
                </h4>

                <div className="bg-stone-50 dark:bg-stone-800/80 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700/80 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Caixa Recomendada:
                    </span>
                    <strong className="text-stone-900 dark:text-stone-100 font-mono font-bold text-right">
                      {species.recommendedBoxModel}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Produção de Mel:
                    </span>
                    <strong className="text-amber-800 dark:text-amber-400 font-bold">
                      {species.honeyYieldPerYear}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Temperamento:
                    </span>
                    <strong className="text-stone-900 dark:text-stone-100 font-bold">
                      {species.aggressiveness}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Umidade do Mel:
                    </span>
                    <strong className="text-stone-900 dark:text-stone-100 font-mono">
                      {species.honeyMoistureRange}
                    </strong>
                  </div>

                  {species.flightRange && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        Raio de Vôo:
                      </span>
                      <strong className="text-stone-900 dark:text-stone-100 font-mono">
                        {species.flightRange}
                      </strong>
                    </div>
                  )}

                  {species.swarmingPeriod && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        Enxameação:
                      </span>
                      <span className="text-stone-700 dark:text-stone-300 font-medium text-right text-[11px]">
                        {species.swarmingPeriod}
                      </span>
                    </div>
                  )}

                  {species.region && (
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700/60 flex items-start justify-between gap-2">
                      <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5 shrink-0">
                        <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        Distribuição:
                      </span>
                      <span className="text-stone-800 dark:text-stone-200 text-right text-[11px] font-medium">
                        {species.region} ({species.biome})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {onSelectForHive && (
                  <button
                    onClick={() => {
                      onSelectForHive(species.id);
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Colmeia de {species.popularName}</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenGroundingSearch(`Pasto floral plantas meliponófilas flores para ${species.popularName} (${species.scientificName})`, 'pasto')}
                    className="py-2 px-3 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Pasto Floral</span>
                  </button>

                  <button
                    onClick={() => onOpenGroundingSearch(`Manejo divisão de enxame alimentação racional ${species.popularName} (${species.scientificName})`, 'care')}
                    className="py-2 px-3 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>Manejo & Divisão</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Morphological and Nest Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Morphological Features */}
            <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Características Morfológicas (Diagnóstico)</span>
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {species.morphologyNotes || species.description}
              </p>
            </div>

            {/* Nest Architecture & Entrance */}
            <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
                <Box className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Arquitetura do Ninho & Entrada</span>
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {species.nestEntranceNotes || `Nidificação característica em ${species.nestingType || 'ocos naturais de árvores'}.`}
              </p>
            </div>

          </div>

          {/* Similar Species Differentiation (From SEAPI/DDPA Guide Chapter) */}
          {species.similarSpeciesDiff && (
            <div className="bg-amber-50/70 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-300 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Diferenciando de: {species.similarSpeciesDiff.compareWith}</span>
                </h4>
                <span className="text-[10px] font-mono font-bold bg-amber-200/80 dark:bg-amber-900 text-amber-950 dark:text-amber-200 px-2 py-0.5 rounded-md">
                  Guia Oficial RS
                </span>
              </div>
              
              <p className="text-xs text-stone-700 dark:text-stone-300">
                {species.similarSpeciesDiff.description}
              </p>

              <ul className="space-y-1.5 pt-1">
                {species.similarSpeciesDiff.keyPoints.map((point, index) => (
                  <li key={index} className="text-xs text-stone-800 dark:text-stone-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Institutional Photographic Sources & Scientific Citations (EMBRAPA, A.B.E.L.H.A., SEAPI/DDPA RS) */}
          <div className="bg-stone-50 dark:bg-stone-900/90 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Fontes Científicas & Créditos do Acervo Fotográfico</span>
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-md">
                Embrapa • A.B.E.L.H.A. • SEAPI RS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1 bg-white dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700/60">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Foto da Operária</span>
                <p className="text-stone-800 dark:text-stone-200 text-xs font-medium">
                  {species.photoCredit || 'Foto: Guia SEAPI/DDPA RS & Embrapa'}
                </p>
              </div>

              <div className="space-y-1 bg-white dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700/60">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Foto do Pito / Entrada</span>
                <p className="text-stone-800 dark:text-stone-200 text-xs font-medium">
                  {species.entryPhotoCredit || 'Foto: Arquitetura de Entrada (SEAPI RS & Embrapa)'}
                </p>
              </div>
            </div>

            {species.literatureReference && (
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Referência Bibliográfica & Autores:</span>
                <p className="text-stone-600 dark:text-stone-400 text-[11px] font-mono mt-0.5">
                  {species.literatureReference}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
