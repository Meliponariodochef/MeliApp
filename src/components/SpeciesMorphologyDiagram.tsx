import React, { useState } from 'react';
import { BeeSpecies } from '../types';
import { Eye, Box, Sparkles, CheckCircle2, Shield, Info, Layers } from 'lucide-react';

interface SpeciesMorphologyDiagramProps {
  species: BeeSpecies;
  compact?: boolean;
  initialSubMode?: 'morphology' | 'entrance';
}

export const SpeciesMorphologyDiagram: React.FC<SpeciesMorphologyDiagramProps> = ({ 
  species, 
  compact = false,
  initialSubMode = 'morphology'
}) => {
  const [subMode, setSubMode] = useState<'morphology' | 'entrance'>(initialSubMode);
  
  const id = species.id;
  const isMandaçaiaMQQ = id === 'mandacaia_mqq';
  const isMandaçaiaMQA = id === 'mandaçaia' || id === 'mandacaia';
  const isGuaraipo = id === 'guaraipo';
  const isGuarupu = id === 'guarupu';
  const isJatai = id === 'jatai';
  const isJataiFiebrigi = id === 'jatai_fiebrigi';
  const isTubuna = id === 'tubuna';
  const isCanudo = id === 'canudo';
  const isIrai = id === 'irai';
  const isBieira = id === 'bieira';
  const isIratim = id === 'iratim';
  const isIrapua = id === 'irapua';
  const isUrucuNordestina = id === 'uruçu_nordestina';
  const isJandaira = id === 'jandaira';
  const isTiuba = id === 'tiuba';
  const isBugia = id === 'bugia';
  const isMarmelada = id === 'marmelada';
  const isLambeOlhos = id === 'lambe_olhos';
  const isMombuca = id === 'mombuca';
  const isMirimDroryana = id === 'mirim_droriana';
  const isMirimEmerina = id === 'mirim_emerina';
  const isMirimGuacu = id === 'mirim_guaçu';
  const isManduri = id === 'manduri';
  const isBora = id === 'bora';

  // Worker morphology palette
  let headColor = '#1f1e1d';
  let thoraxColor = '#2b2927';
  let thoraxHair = '#52525b';
  let abdomenColor = '#1c1b1a';
  let wingColor = 'rgba(215, 230, 245, 0.45)';
  let stripeColor = '#eab308'; // Amber yellow
  let highlightNote = species.morphologyNotes || 'Diagnóstico morfológico de operária';

  if (isJatai) {
    headColor = '#18181b';
    thoraxColor = '#27272a';
    thoraxHair = '#71717a';
    abdomenColor = '#d97706'; // Golden amber
    stripeColor = '#fbbf24';
  } else if (isJataiFiebrigi) {
    headColor = '#18181b';
    thoraxColor = '#b45309'; // Yellowish-ferruginous mesepisternum
    thoraxHair = '#d97706';
    abdomenColor = '#f59e0b';
    stripeColor = '#fde047';
  } else if (isUrucuNordestina) {
    headColor = '#18181b';
    thoraxColor = '#ca8a04'; // Bright golden velvet thorax
    thoraxHair = '#eab308';
    abdomenColor = '#27272a';
    stripeColor = '#71717a';
  } else if (isBieira) {
    headColor = '#065f46';
    thoraxColor = '#047857'; // Metallic emerald-blue iridescence
    thoraxHair = '#10b981';
    abdomenColor = '#064e3b';
  } else if (isGuaraipo) {
    headColor = '#09090b';
    thoraxColor = '#18181b'; // Black hair
    thoraxHair = '#27272a';
    abdomenColor = '#27272a';
    stripeColor = '#ca8a04'; // Golden plumose on metasoma
  } else if (isGuarupu) {
    headColor = '#09090b';
    thoraxColor = '#78350f'; // Reddish/rufous hair
    thoraxHair = '#9a3412';
    abdomenColor = '#27272a';
  } else if (isBugia) {
    headColor = '#18181b';
    thoraxColor = '#ca8a04'; // Yellow collar ring
    thoraxHair = '#eab308';
    abdomenColor = '#27272a';
    stripeColor = '#facc15';
  } else if (isTiuba) {
    headColor = '#27272a';
    thoraxColor = '#52525b'; // Greyish velvet
    thoraxHair = '#a1a1aa';
    abdomenColor = '#27272a';
    stripeColor = '#71717a';
  } else if (isMarmelada) {
    headColor = '#78350f';
    thoraxColor = '#b45309';
    thoraxHair = '#d97706';
    abdomenColor = '#d97706';
    stripeColor = '#fde047';
  } else if (isIrapua) {
    headColor = '#09090b';
    thoraxColor = '#18181b';
    abdomenColor = '#18181b';
    thoraxHair = '#27272a';
  }

  // Entrance Architecture Type
  const getEntranceTypeInfo = () => {
    if (isJatai || isJataiFiebrigi) {
      return {
        title: 'Tubo de Cerume Rendilhado',
        material: 'Cerume claro, translúcido e perfurado',
        structure: 'Tubo cilíndrico com pequenas perfurações circulares. À noite é fechado por uma rede rendilhada protetora.',
        sentinels: 'Sentinelas dispostas em círculo na borda do tubo e operárias em vôo no entorno.',
        bgColor: '#451a03',
        tubeColor: '#fef08a',
        tubeBorder: '#eab308',
        holes: true
      };
    }
    if (isMandaçaiaMQQ || isMandaçaiaMQA || isGuaraipo || isGuarupu || isManduri || isTiuba || isBugia || isUrucuNordestina || isJandaira) {
      return {
        title: 'Estrias Radiais de Barro e Geoprópolis',
        material: 'Barro, argila e resinas vegetais (Geoprópolis)',
        structure: 'Abertura central estreita circundada por estrias/canaletas radiais convergentes de barro endurecido.',
        sentinels: 'Geralmente 1 sentinela posicionada no orifício central, liberando passagem por vez.',
        bgColor: '#291e14',
        tubeColor: '#78350f',
        tubeBorder: '#9a3412',
        radial: true
      };
    }
    if (isTubuna || isCanudo || isMombuca) {
      return {
        title: isCanudo ? 'Tubo Reto Cilíndrico de Cerume' : 'Corneta / Funil de Cerume Escuro',
        material: 'Cerume escuro e resinas',
        structure: 'Grande tubo em formato de trombeta ou funil projetado para fora da colmeia.',
        sentinels: 'Dezenas de operárias alertas guarnecendo toda a borda e entrada.',
        bgColor: '#18181b',
        tubeColor: '#3f3f46',
        tubeBorder: '#71717a',
        trumpet: true
      };
    }
    if (isIrai) {
      return {
        title: 'Tubo Circular de Cerume Escuro',
        material: 'Cerume escuro e própolis',
        structure: 'Tubo curto com orifício perfeitamente circular. Fechado à noite com trama de cerume.',
        sentinels: 'Guardiãs posicionadas lado a lado em anel concêntrico perfeito na borda interna.',
        bgColor: '#1c1917',
        tubeColor: '#44403c',
        tubeBorder: '#78716c',
        circularRing: true
      };
    }
    if (isMirimDroryana || isMirimEmerina || isMirimGuacu || isLambeOlhos) {
      return {
        title: isMirimDroryana ? 'Entrada Dupla com Patamar de Resina' : 'Tubo Reduzido de Cerume',
        material: 'Cerume, resinas viscosas e própolis',
        structure: 'Orifício diminuto com patamar inferior expandido e gotículas de resina viscosa contra predadores.',
        sentinels: 'Poucas guardiãs diminutas na entrada.',
        bgColor: '#172554',
        tubeColor: '#38bdf8',
        tubeBorder: '#0284c7',
        platform: true
      };
    }
    if (isIratim) {
      return {
        title: 'Tubo com Projeções em Estalactites',
        material: 'Cerume escuro pilhado',
        structure: 'Tubo longo irregular com múltiplas pontas pendentes simulando estalactites para desorientar invasores.',
        sentinels: 'Sentinelas na extremidade exalando forte odor de citral/limão.',
        bgColor: '#422006',
        tubeColor: '#854d0e',
        tubeBorder: '#ca8a04',
        stalactites: true
      };
    }
    if (isIrapua) {
      return {
        title: 'Ninho Aéreo Externo Suspenso',
        material: 'Fibras vegetais trituradas, fezes animais, barro e resina',
        structure: 'Grande ninho oval volumoso construído ao ar livre em forquilhas de árvores com envelope resistente.',
        sentinels: 'Defesa vigorosa com operárias cobrindo a superfície externa.',
        bgColor: '#27272a',
        tubeColor: '#52525b',
        tubeBorder: '#a1a1aa',
        aerial: true
      };
    }
    if (isBieira) {
      return {
        title: 'Ninho Subterrâneo em Solo Granítico',
        material: 'Solo natural, argila e resinas subterrâneas',
        structure: 'Orifício circular no chão sem tubo projetado, cercado por grânulos de solo escavado.',
        sentinels: 'Guardiãs discretas rente ao nível do solo.',
        bgColor: '#064e3b',
        tubeColor: '#059669',
        tubeBorder: '#34d399',
        underground: true
      };
    }
    if (isMarmelada) {
      return {
        title: 'Entrada com Gotículas de Resina Clara',
        material: 'Resina pura clara e cerume',
        structure: 'Orifício circular circundado por dezenas de bolinhas de resina branca/amarelada pegajosa.',
        sentinels: 'Operárias dóceis ao redor das bolinhas de resina.',
        bgColor: '#451a03',
        tubeColor: '#fef08a',
        tubeBorder: '#ca8a04',
        resinDrops: true
      };
    }

    return {
      title: 'Entrada Específica da Espécie',
      material: 'Cerume, própolis e barro',
      structure: species.nestEntranceNotes || 'Entrada adaptada à espécie',
      sentinels: 'Operárias guardiãs na entrada.',
      bgColor: '#18181b',
      tubeColor: '#71717a',
      tubeBorder: '#a1a1aa'
    };
  };

  const entranceInfo = getEntranceTypeInfo();

  return (
    <div className={`w-full h-full flex flex-col justify-between bg-stone-950 text-stone-100 ${compact ? 'p-1.5' : 'p-3'} select-none`}>
      
      {/* Sub-mode Toggle (Morfologia vs Entrada) */}
      {!compact && (
        <div className="flex items-center justify-between gap-2 mb-2 bg-stone-900/90 p-1 rounded-xl border border-stone-800">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSubMode('morphology')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                subMode === 'morphology'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Anatomia da Operária</span>
            </button>

            <button
              type="button"
              onClick={() => setSubMode('entrance')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                subMode === 'entrance'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Arquitetura da Entrada</span>
            </button>
          </div>

          <span className="text-[10px] font-mono text-amber-400 font-bold px-2 hidden sm:inline-block">
            {species.scientificName.split(' ')[0]} {species.scientificName.split(' ')[1] || ''}
          </span>
        </div>
      )}

      {/* Main Diagram Area */}
      {subMode === 'morphology' ? (
        /* ================= 1. WORKER MORPHOLOGY SVG ================= */
        <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[140px]">
          <svg 
            viewBox="0 0 340 190" 
            className="w-full h-full max-h-48 drop-shadow-md"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`wingGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.25" />
              </linearGradient>
              <radialGradient id={`thoraxGrad-${id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={thoraxHair} />
                <stop offset="100%" stopColor={thoraxColor} />
              </radialGradient>
            </defs>

            {/* Diagnostic Canvas Frame */}
            <rect x="10" y="8" width="320" height="174" rx="10" fill="#121214" stroke="#27272a" strokeWidth="1" />
            
            {/* Axis Grid & Scale Rule */}
            <line x1="20" y1="95" x2="320" y2="95" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3 3" />
            
            {/* Antennas */}
            <path d="M 90 75 Q 75 55 60 56" stroke={isIrai ? '#fde047' : '#a1a1aa'} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 90 85 Q 75 105 60 104" stroke={isIrai ? '#fde047' : '#a1a1aa'} strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Head (Cabeça) */}
            <ellipse cx="102" cy="80" rx="18" ry="20" fill={headColor} stroke="#52525b" strokeWidth="1.5" />
            
            {/* Compound Eyes (Olhos Compostos) */}
            <ellipse cx="98" cy="70" rx="7" ry="11" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <ellipse cx="98" cy="90" rx="7" ry="11" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />

            {/* Facial Markings (Plebeia, Jataí, Manduri, Borá) */}
            {(isJatai || isJataiFiebrigi || isMirimDroryana || isMirimEmerina || isManduri || isBora) && (
              <g>
                <circle cx="110" cy="74" r="3" fill="#facc15" />
                <circle cx="110" cy="86" r="3" fill="#facc15" />
                {isMirimEmerina && (
                  <path d="M 94 65 L 94 95" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
                )}
                {isMirimDroryana && (
                  <line x1="93" y1="68" x2="93" y2="92" stroke="#facc15" strokeWidth="1.2" />
                )}
              </g>
            )}

            {/* Thorax (Mesossoma) */}
            <ellipse cx="145" cy="80" rx="26" ry="24" fill={`url(#thoraxGrad-${id})`} stroke="#52525b" strokeWidth="1.5" />
            
            {/* Thoracic Collar Ring (Bugia) */}
            {isBugia && (
              <ellipse cx="130" cy="80" rx="10" ry="22" fill="none" stroke="#facc15" strokeWidth="3" opacity="0.9" />
            )}

            {/* Rugose / W-shaped scutellum (Iraí) */}
            {isIrai && (
              <path d="M 160 70 Q 165 80 160 90" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Wings (Asas) */}
            <g opacity="0.95">
              <ellipse cx="180" cy="48" rx="46" ry="15" transform="rotate(-15 180 48)" fill={`url(#wingGrad-${id})`} stroke="#93c5fd" strokeWidth="1.2" />
              <path d="M 140 65 Q 180 45 220 38" stroke="#60a5fa" strokeWidth="1.2" />
              <path d="M 160 55 Q 185 50 205 42" stroke="#60a5fa" strokeWidth="0.8" />
            </g>

            {/* Hind Leg (Perna Posterior com Corbícula) */}
            <path d="M 158 95 Q 180 128 198 140" stroke="#52525b" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Clavate tibia for Borá */}
            {isBora ? (
              <ellipse cx="192" cy="132" rx="14" ry="8" transform="rotate(30 192 132)" fill="#3f3f46" stroke="#ca8a04" strokeWidth="1.5" />
            ) : (
              <ellipse cx="192" cy="132" rx="10" ry="6" transform="rotate(25 192 132)" fill={isIratim ? '#09090b' : '#3f3f46'} stroke="#71717a" strokeWidth="1" />
            )}
            
            {/* Corbicular pollen load */}
            {!isIratim && (
              <circle cx="192" cy="132" r="4" fill="#eab308" opacity="0.9" />
            )}

            {/* Middle and Front Legs */}
            <path d="M 136 98 Q 142 132 148 144" stroke="#52525b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 115 94 Q 110 122 100 134" stroke="#52525b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Abdomen (Metasoma) */}
            <ellipse cx="205" cy="80" rx="38" ry="22" fill={abdomenColor} stroke="#52525b" strokeWidth="1.5" />

            {/* Mandaçaia MQQ: 4 Continuous Yellow Stripes */}
            {isMandaçaiaMQQ && (
              <g>
                <path d="M 183 66 Q 189 80 183 94" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 197 63 Q 203 80 197 97" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 211 62 Q 217 80 211 98" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 225 66 Q 230 80 225 94" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Mandaçaia MQA: 4 Interrupted Yellow Stripes */}
            {isMandaçaiaMQA && (
              <g>
                <path d="M 183 66 L 186 74" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 186 86 L 183 94" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 197 63 L 200 73" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 200 87 L 197 97" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 211 62 L 214 73" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 214 87 L 211 98" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 225 66 L 227 74" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 227 86 L 225 94" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Jandaíra orange stripes */}
            {isJandaira && (
              <g>
                <path d="M 186 66 Q 190 80 186 94" stroke="#f59e0b" strokeWidth="2.5" />
                <path d="M 200 64 Q 204 80 200 96" stroke="#f59e0b" strokeWidth="2.5" />
                <path d="M 215 64 Q 219 80 215 96" stroke="#f59e0b" strokeWidth="2.5" />
              </g>
            )}

            {/* Tubuna: rigid black bristles */}
            {isTubuna && (
              <g stroke="#09090b" strokeWidth="1.8" strokeLinecap="round">
                <line x1="190" y1="60" x2="192" y2="50" />
                <line x1="203" y1="59" x2="206" y2="48" />
                <line x1="216" y1="60" x2="220" y2="50" />
                <line x1="190" y1="100" x2="192" y2="110" />
                <line x1="203" y1="101" x2="206" y2="112" />
                <line x1="216" y1="100" x2="220" y2="110" />
              </g>
            )}

            {/* Guaraipo golden plumose hair on metasoma */}
            {isGuaraipo && (
              <g stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" opacity="0.85">
                <line x1="188" y1="64" x2="190" y2="56" />
                <line x1="202" y1="62" x2="205" y2="54" />
                <line x1="216" y1="63" x2="219" y2="55" />
                <line x1="228" y1="68" x2="231" y2="60" />
              </g>
            )}

            {/* Diagnostic Callout Labels */}
            <text x="22" y="172" fill="#a1a1aa" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              Porte: {species.morphologyNotes?.match(/\d+[\.,]?\d*\s*mm/i)?.[0] || '4 - 11 mm'}
            </text>
            <text x="318" y="172" textAnchor="end" fill="#eab308" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              {isIratim ? 'Sem Corbícula (Pilhadora)' : 'Corbícula Funcional'}
            </text>
          </svg>
        </div>
      ) : (
        /* ================= 2. ENTRANCE ARCHITECTURE DIAGRAM ================= */
        <div className="relative w-full flex-1 flex flex-col justify-between bg-stone-900/60 rounded-xl p-3 border border-stone-800/80">
          
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {entranceInfo.title}
              </span>
              <h4 className="text-sm font-bold text-stone-100 font-serif mt-0.5">
                {species.popularName} ({species.scientificName.split(' ')[0]})
              </h4>
            </div>
            
            <div className="px-2 py-1 bg-stone-800 rounded-lg border border-stone-700 text-right shrink-0">
              <span className="text-[10px] text-stone-400 block">Material Base</span>
              <span className="text-xs font-bold text-amber-300">{entranceInfo.material.split(',')[0]}</span>
            </div>
          </div>

          {/* Descriptive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2">
            <div className="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800">
              <span className="text-[10px] font-bold text-stone-400 block mb-1">Estrutura & Padrão do Tubo</span>
              <p className="text-xs text-stone-200 leading-relaxed">
                {entranceInfo.structure}
              </p>
            </div>

            <div className="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800">
              <span className="text-[10px] font-bold text-stone-400 block mb-1">Guarda & Sentinelas</span>
              <p className="text-xs text-stone-200 leading-relaxed">
                {entranceInfo.sentinels}
              </p>
            </div>
          </div>

          {/* Field Note Footer */}
          <div className="bg-amber-950/40 border border-amber-800/50 p-2 rounded-lg text-[11px] text-amber-200/90 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">
              {species.nestEntranceNotes || 'Entrada característica com alta especificidade biológica.'}
            </span>
          </div>

        </div>
      )}

      {/* Bottom Summary Bar */}
      <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
        <span className="truncate max-w-[240px]">
          {species.popularName} • {species.group.toUpperCase()}
        </span>
        <span className="text-amber-400 font-medium">
          Guia Embrapa / SEAPI RS
        </span>
      </div>

    </div>
  );
};
