import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Layers, 
  Box, 
  Maximize2, 
  Eye, 
  Sparkles, 
  ChevronRight, 
  SlidersHorizontal,
  Compass,
  Droplets,
  ShieldAlert,
  ShieldCheck,
  Search,
  Wind,
  Plus,
  TreeDeciduous,
  Tag
} from 'lucide-react';
import { COMPREHENSIVE_BEE_SPECIES } from '../data/beeSpeciesCatalog';
import { BeeSpecies } from '../types';
import { BEE_SVG_PLACEHOLDER, BEE_ENTRY_SVG_PLACEHOLDER } from '../hooks/useImageFallback';

interface SimilarSpeciesComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialComparisonId?: string;
  initialSpeciesAId?: string;
  initialSpeciesBId?: string;
  initialTab?: 'curated' | 'custom';
  onSelectSpeciesForNewHive?: (speciesId: string) => void;
  onOpenSpeciesDetail?: (species: BeeSpecies) => void;
}

interface ComparisonTopic {
  id: string;
  title: string;
  speciesA: {
    id?: string;
    name: string;
    scientific: string;
    badge: string;
    imageUrl: string;
    entryImageUrl?: string;
    photoCredit: string;
    entryPhotoCredit?: string;
    traits: string[];
    boxModel?: string;
    honeyYield?: string;
  };
  speciesB: {
    id?: string;
    name: string;
    scientific: string;
    badge: string;
    imageUrl: string;
    entryImageUrl?: string;
    photoCredit: string;
    entryPhotoCredit?: string;
    traits: string[];
    boxModel?: string;
    honeyYield?: string;
  };
  keyDifference: string;
  nestComparison: string;
  morphologicalFocus: string;
}

const CURATED_COMPARISONS: ComparisonTopic[] = [
  {
    id: 'guaraipo-guarupu',
    title: 'Guaraipo x Guarupú',
    morphologicalFocus: 'Coloração dos Pelos do Tórax e Região de Ocorrência',
    speciesA: {
      id: 'guaraipo',
      name: 'Guaraipo / Pé-de-Pau',
      scientific: 'Melipona bicolor schencki Gribodo, 1893',
      badge: 'Pelos Pretos no Tórax / Altitude RS',
      imageUrl: '/species/guaraipo_worker.jpg',
      entryImageUrl: '/species/guaraipo_entry.jpg',
      photoCredit: 'Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Fernando Kluwe Dias (Entrada na base de tronco)',
      boxModel: 'INPA (18x18 ou 20x20 cm)',
      honeyYield: '1.5 a 3.5 L/ano',
      traits: [
        'Pelos do tórax enegrecidos a castanhos-escuros.',
        'Pelos plumosos abundantes na parte dorsal do abdômen.',
        'Ocorre predominantemente em altitudes mais elevadas e serras.',
        'Ninhos na base de troncos (pé-de-pau) de árvores vivas.'
      ]
    },
    speciesB: {
      id: 'guarupu',
      name: 'Guarupú / Uruçu-Amarela',
      scientific: 'Melipona bicolor bicolor Lepeletier, 1836',
      badge: 'Pelos Ruivos no Tórax / Baixadas',
      imageUrl: '/species/guarupu_worker.jpg',
      entryImageUrl: '/species/guarupu_entry.jpg',
      photoCredit: 'Foto: Arthur Gomes (iNaturalist) & Meliponário Guia',
      entryPhotoCredit: 'Foto: Guilherme A. Fischer (Entrada estriada de barro)',
      boxModel: 'INPA (18x18 ou 20x20 cm)',
      honeyYield: '1.5 a 3.5 L/ano',
      traits: [
        'Pelos de coloração mais clara (avermelhados/ruivos) no tórax.',
        'Ocorre predominantemente em regiões de baixas altitudes e litorais.',
        'Poliginia marcante (múltiplas rainhas fecundadas e ativas no ninho).',
        'Abdômen com reflexos acastanhados e pilosidade clara.'
      ]
    },
    keyDifference: 'A principal diferença morfológica está na coloração dos pelos do tórax: pretos/castanho-escuros na Guaraipo sulina (schencki) versus ruivos/avermelhados no Guarupú (bicolor).',
    nestComparison: 'Ambas constroem entradas com estrias convergentes de barro na base dos troncos (pé-de-pau).'
  },
  {
    id: 'mandacaia-mqq-mqa',
    title: 'Mandaçaia MQQ x Mandaçaia MQA',
    morphologicalFocus: 'Continuidade das Faixas Amarelas Abdominais',
    speciesA: {
      id: 'mandacaia_mqq',
      name: 'Mandaçaia MQQ (Sul)',
      scientific: 'Melipona quadrifasciata quadrifasciata Lepeletier, 1836',
      badge: 'Faixas Amarelas CONTÍNUAS (Sul)',
      imageUrl: '/species/mandacaia_mqq_worker.jpg',
      entryImageUrl: '/species/mandacaia_entry.jpg',
      photoCredit: 'Foto: Dilton Castro / Fernando Kluwe Dias (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Fernando Kluwe Dias (Estrias radiais de barro)',
      boxModel: 'INPA (15x15 ou 18x18 cm)',
      honeyYield: '2.0 a 4.0 L/ano',
      traits: [
        '3 a 4 faixas transversais amarelas totalmente CONTÍNUAS nas operárias.',
        '3 a 5 faixas contínuas nos machos.',
        'Adaptada aos climas subtropicais e temperados do Sul (RS, SC, PR).',
        'Tórax com pilosidade abundante castanho-enegrecida.'
      ]
    },
    speciesB: {
      id: 'mandaçaia',
      name: 'Mandaçaia MQA (Sudeste)',
      scientific: 'Melipona quadrifasciata anthidioides Lepeletier, 1836',
      badge: 'Faixas Amarelas INTERROMPIDAS',
      imageUrl: '/species/mandacaia_mqa_worker.jpg',
      entryImageUrl: '/species/mandacaia_entry.jpg',
      photoCredit: 'Foto: Cristiano Menezes / Embrapa Meio Ambiente',
      entryPhotoCredit: 'Foto: Embrapa (Entrada com geoprópolis)',
      boxModel: 'INPA (15x15 ou 18x18 cm)',
      honeyYield: '1.5 a 3.5 L/ano',
      traits: [
        'Faixas transversais amarelas nitidamente INTERROMPIDAS no centro dorsal.',
        'Mesmo porte robusto (9 a 11 mm) porém com faixas bipartidas.',
        'Distribuição geográfica em latitudes mais quentes (Sudeste/Centro-Oeste).',
        'Alta produtividade de mel claro e aromático.'
      ]
    },
    keyDifference: 'MQQ possui faixas amarelas contínuas sem quebra ao longo dos tergitos; MQA possui faixas amarelas interrompidas no meio das costas.',
    nestComparison: 'Entrada idêntica no centro com estrias convergentes de barro/geoprópolis, permitindo passagem de 1 abelha por vez.'
  },
  {
    id: 'jatai-angustula-fiebrigi',
    title: 'Jataí Comum x Jataí-do-Sul',
    morphologicalFocus: 'Coloração Lateral do Tórax (Mesepisterno)',
    speciesA: {
      id: 'jatai',
      name: 'Jataí Comum',
      scientific: 'Tetragonisca angustula (Latreille, 1811)',
      badge: 'Mesepisterno PRETO / Porte Esguio',
      imageUrl: '/species/jatai_worker.jpg',
      entryImageUrl: '/species/jatai_entry.jpg',
      photoCredit: 'Foto: Cristiano Menezes (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Guia SEAPI/DDPA RS (Tubo de cera rendilhado)',
      boxModel: 'INPA (12x12 cm interno)',
      honeyYield: '0.8 a 1.5 L/ano',
      traits: [
        'Tórax com porção lateral (mesepisterno) PRETO.',
        'Porte menor (~4,0 mm) com corpo esguio e delgado.',
        'Ocorrência ampla em quase todos os biomas brasileiros.',
        'Tubo de cerume rendilhado translúcido característico.'
      ]
    },
    speciesB: {
      id: 'jatai_fiebrigi',
      name: 'Jataí-do-Sul / Yateí',
      scientific: 'Tetragonisca fiebrigi (Schwarz, 1938)',
      badge: 'Mesepisterno AMARELO / Porte Robusto',
      imageUrl: '/species/jatai_fiebrigi_worker.jpg',
      entryImageUrl: '/species/jatai_entry.jpg',
      photoCredit: 'Foto: Mariano Pairet (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Mariano Pairet (Entrada de cerume)',
      boxModel: 'INPA (12x12 cm interno)',
      honeyYield: '1.0 a 1.8 L/ano',
      traits: [
        'Porção lateral do tórax (mesepisterno) AMARELA-FERRUGINOSA.',
        'Porte maior e visivelmente mais robusto (~4,7 mm).',
        'Abdômen mais largo e de tom amarelo-ouro intenso.',
        'Distribuição típica no Sul (RS, SC, PR, MS e bacia do Prata).'
      ]
    },
    keyDifference: 'Coloração da lateral do tórax (mesepisterno): preto em T. angustula vs amarelo-ferruginoso em T. fiebrigi.',
    nestComparison: 'Ambas constroem tubos de cerume rendilhado claros com pequenos orifícios, que fecham à noite.'
  },
  {
    id: 'emerina-droryana',
    title: 'Mirim-Emerina x Mirim-Droriana',
    morphologicalFocus: 'Mancha Facial Parocular e Formato do Tubo de Entrada',
    speciesA: {
      id: 'mirim_emerina',
      name: 'Mirim-Emerina',
      scientific: 'Plebeia emerina (Friese, 1900)',
      badge: 'Mancha Alargada na Base / Tubo Circular',
      imageUrl: '/species/mirim_emerina_worker.jpg',
      entryImageUrl: '/species/mirim_emerina_entry.jpg',
      photoCredit: 'Foto: selwynq (iNaturalist) & Guia DDPA/SEAPI RS',
      entryPhotoCredit: 'Foto: Robin Gwen Agarwal (Tubo cilíndrico de cerume)',
      boxModel: 'INPA (10x10 ou 12x12 cm)',
      honeyYield: '0.2 a 0.5 L/ano',
      traits: [
        'Faixa amarela na lateral dos olhos ALARGADA na porção inferior.',
        'Faixa amarela estreita no ápice do escutelo.',
        'Tamanho ligeiramente maior que P. droryana.',
        'Entrada com tubo cilíndrico circular simples de cerume escuro.'
      ]
    },
    speciesB: {
      id: 'mirim_droriana',
      name: 'Mirim-Droriana',
      scientific: 'Plebeia droryana (Friese, 1900)',
      badge: 'Mancha Estreita / Entrada Dupla com Patamar',
      imageUrl: '/species/mirim_droryana_worker.jpg',
      entryImageUrl: '/species/mirim_droryana_entry.jpg',
      photoCredit: 'Foto: Mariano Pairet (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Mariano Pairet (Entrada com patamar)',
      boxModel: 'INPA (10x10 ou 12x12 cm)',
      honeyYield: '0.2 a 0.5 L/ano',
      traits: [
        'Faixa amarela na lateral dos olhos ESTREITA e uniforme.',
        'Faixa amarela horizontal mais LARGA no escutelo.',
        'Entrada dupla: orifício menor superior + entrada inferior em patamar.',
        'Superfície da entrada com cerume pegajoso protetor.'
      ]
    },
    keyDifference: 'Emerina tem a mancha amarela facial alargada na base e tubo circular simples. Droriana tem mancha facial estreita e entrada dupla com patamar/plataforma oval.',
    nestComparison: 'Ninho de Emerina tem tubo circular simples; Ninho de Droriana apresenta entrada dupla com patamar inferior expandido.'
  },
  {
    id: 'scaptotrigona-irapua',
    title: 'Scaptotrigona (Tubuna/Canudo) x Irapuá',
    morphologicalFocus: 'Cor das Pernas e Arquitetura do Ninho (Oco vs Aéreo)',
    speciesA: {
      id: 'tubuna',
      name: 'Scaptotrigonas (Tubuna / Canudo)',
      scientific: 'Scaptotrigona spp. (bipunctata, depilis, tubiba)',
      badge: 'Ninho em Ocos / Pernas Pretas',
      imageUrl: '/species/tubuna_worker.jpg',
      entryImageUrl: '/species/tubuna_entry.jpg',
      photoCredit: 'Foto: Luísa Cristmann / Fernando Kluwe Dias',
      entryPhotoCredit: 'Foto: Fernando Kluwe Dias (Corneta de cerume)',
      boxModel: 'INPA ou AF (15x15 ou 18x18 cm)',
      honeyYield: '1.5 a 4.0 L/ano',
      traits: [
        'Pernas posteriores de coloração PRETA.',
        'Tíbias subtriangulares com cerdas densas e corbícula funcional.',
        'Ninhos SEMPRE no interior de ocos de árvores ou caixas racionais.',
        'Entrada em formato de funil, corneta ou canudo.'
      ]
    },
    speciesB: {
      id: 'irapua',
      name: 'Irapuá / Arapuá',
      scientific: 'Trigona spinipes (Fabricius, 1793)',
      badge: 'Ninho Aéreo / Pernas Alaranjadas',
      imageUrl: '/species/irapua_worker.jpg',
      entryImageUrl: '/species/irapua_entry.jpg',
      photoCredit: 'Foto: Cristiano Menezes (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Cristiano Menezes (Ninho aéreo externo em galhos)',
      boxModel: 'Ninho aéreo natural em galhos',
      honeyYield: 'Não explorada comercialmente',
      traits: [
        'Pernas posteriores marcantemente ALARANJADAS ou ferrugíneas.',
        'Área sedosa distintiva na face interna dos basitarsos.',
        'Ninhos AÉREOS EXTERNOS volumosos fixados em galhos e forquilhas.',
        'Constrói ninhos de fibras vegetais trituradas com barro e resina.'
      ]
    },
    keyDifference: 'Irapuá tem pernas posteriores alaranjadas e constrói ninhos externos aéreos semelhantes a cupinzeiros em galhos; Scaptotrigonas têm pernas pretas e nidificam em cavidades ocas.',
    nestComparison: 'Scaptotrigona constrói cornetas/tubos em troncos ocos; Irapuá constrói ninho aéreo oval exposto ao ar livre.'
  },
  {
    id: 'canudo-mandaguari',
    title: 'Canudo x Tubuna / Mandaguari-Preta',
    morphologicalFocus: 'Presença de Cerdas Rígidas no Dorso Abdominal',
    speciesA: {
      id: 'canudo',
      name: 'Canudo',
      scientific: 'Scaptotrigona depilis (Moure, 1942)',
      badge: 'Abdômen Desnudo (Liso)',
      imageUrl: '/species/canudo_worker.jpg',
      entryImageUrl: '/species/canudo_entry.jpg',
      photoCredit: 'Foto: Ísis Meri Medri (iNaturalist) & Guia DDPA/SEAPI RS',
      entryPhotoCredit: 'Foto: Elise Toti (Tubo cilíndrico reto)',
      boxModel: 'INPA ou AF (15x15 cm)',
      honeyYield: '2.0 a 5.0 L/ano',
      traits: [
        'Dorso abdominal DESNUDO (sem cerdas pretas rígidas espessas).',
        'Leve plumagem dourada (tomento) restrita ao final do abdômen.',
        'Entrada em formato de tubo cilíndrico reto tipo canudo.',
        'Asas hialinas e corpo de 6,3 mm.'
      ]
    },
    speciesB: {
      id: 'tubuna',
      name: 'Tubuna / Mandaguari-Preta',
      scientific: 'Scaptotrigona bipunctata / S. postica',
      badge: 'Abdômen com Muitas Cerdas Pretas',
      imageUrl: '/species/tubuna_worker.jpg',
      entryImageUrl: '/species/tubuna_entry.jpg',
      photoCredit: 'Foto: Luísa Cristmann / Fernando Kluwe Dias',
      entryPhotoCredit: 'Foto: Fernando Kluwe Dias (Corneta de cerume)',
      boxModel: 'INPA ou AF (15x15 ou 18x18 cm)',
      honeyYield: '1.5 a 4.0 L/ano',
      traits: [
        'Dorso do abdômen com MUITAS CERDAS PRETAS, longas e espessas.',
        'Asas esfumaçadas escuras na metade apical.',
        'Entrada em formato de corneta com dezenas de sentinelas.',
        'Aroma forte e característico de coco durante o manejo.'
      ]
    },
    keyDifference: 'Canudo tem o abdômen sem cerdas pretas espessas no dorso (aspecto liso e desnudo); Tubuna/Mandaguari-preta tem o abdômen densamente coberto de cerdas pretas eriçadas.',
    nestComparison: 'Canudo faz tubo reto em forma de canudo; Tubuna faz corneta ou funil mais aberto.'
  },
  {
    id: 'scaptotrigona-iratim',
    title: 'Scaptotrigona (Tubuna) x Iratim (Abelha-Limão)',
    morphologicalFocus: 'Presença de Corbícula e Feromônio de Alarme (Coco vs Limão)',
    speciesA: {
      id: 'tubuna',
      name: 'Scaptotrigona (Tubuna)',
      scientific: 'Scaptotrigona bipunctata',
      badge: 'Com Corbícula / Cheiro de Coco',
      imageUrl: '/species/tubuna_worker.jpg',
      entryImageUrl: '/species/tubuna_entry.jpg',
      photoCredit: 'Foto: Luísa Cristmann / Fernando Kluwe Dias',
      entryPhotoCredit: 'Foto: Fernando Kluwe Dias (Corneta de cerume)',
      boxModel: 'INPA (15x15 ou 18x18 cm)',
      honeyYield: '1.5 a 4.0 L/ano',
      traits: [
        'Possuem CORBÍCULA nas tíbias posteriores (coletam pólen em flores).',
        'Corpo mais robusto com pelos plumosos abundantes.',
        'Entrada com tubo único em forma de corneta ou canudo.',
        'Feromônio exala odor agradável de fruto coco.'
      ]
    },
    speciesB: {
      id: 'iratim',
      name: 'Iratim / Abelha-Limão',
      scientific: 'Lestrimelitta sulina / L. limao',
      badge: 'SEM Corbícula / Cheiro de Limão',
      imageUrl: '/species/iratim_worker.jpg',
      entryImageUrl: '/species/iratim_entry.jpg',
      photoCredit: 'Foto: Karyne Mello Sarmento / Gabriel A. R. Melo',
      entryPhotoCredit: 'Foto: Gabriel A. R. Melo (Entrada com estalactites)',
      boxModel: 'Espécie cleptobiótica pilhadora',
      honeyYield: 'Não explorada',
      traits: [
        'SEM CORBÍCULA nas pernas (não visitam flores, são cleptobióticas ladras).',
        'Corpo fino, alongado, extremamente liso, polido e brilhante.',
        'Entrada com dezenas de protuberâncias tipo estalactites falsas.',
        'Libera forte feromônio com odor de citral/limão.'
      ]
    },
    keyDifference: 'Iratim é cleptobiótica sem corbícula, brilhante e cheira a limão; Scaptotrigona tem corbícula, pelos densos e cheiro de coco.',
    nestComparison: 'Iratim tem entrada com múltiplas falsas projeções estalactíticas; Scaptotrigona tem entrada tubular única funcional.'
  },
  {
    id: 'irai-mirim',
    title: 'Iraí x Mirim-Droriana',
    morphologicalFocus: 'Tegumento Áspero/Alveolado e Escutelo em "W"',
    speciesA: {
      id: 'irai',
      name: 'Iraí / Jataí-Preta',
      scientific: 'Nannotrigona testaceicornis (Lepeletier, 1836)',
      badge: 'Tegumento Fosco / Escutelo Chanfrado em W',
      imageUrl: '/species/irai_worker.jpg',
      entryImageUrl: '/species/irai_entry.jpg',
      photoCredit: 'Foto: Cristiano Menezes (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Cristiano Menezes (Tubo de cerume escuro)',
      boxModel: 'INPA (12x12 cm interno)',
      honeyYield: '0.4 a 0.9 L/ano',
      traits: [
        'Tegumento com pontuação alveolar profunda (aspecto fosco e áspero).',
        'Escutelo com corte/chanfradura pronunciada em forma de "W".',
        'Flagelos das antenas amarelados e linhas claras no tórax.',
        'Tubo de cerume escuro que fecha com rede rendilhada à noite.'
      ]
    },
    speciesB: {
      id: 'mirim_droriana',
      name: 'Mirim-Droriana',
      scientific: 'Plebeia droryana (Friese, 1900)',
      badge: 'Tegumento Liso / Escutelo Arredondado',
      imageUrl: '/species/mirim_droryana_worker.jpg',
      entryImageUrl: '/species/mirim_droryana_entry.jpg',
      photoCredit: 'Foto: Mariano Pairet (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Mariano Pairet (Entrada com patamar)',
      boxModel: 'INPA (10x10 ou 12x12 cm)',
      honeyYield: '0.2 a 0.5 L/ano',
      traits: [
        'Tegumento polido e liso com brilho uniforme.',
        'Escutelo arredondado sem chanfradura em "W".',
        'Faixa amarela na lateral dos olhos compostos.',
        'Entrada dupla com patamar inferior expandido.'
      ]
    },
    keyDifference: 'Iraí tem tegumento fosco e áspero com escutelo recortado em "W"; Mirins do gênero Plebeia têm tegumento liso, brilhante e escutelo contínuo.',
    nestComparison: 'Iraí faz tubo circular perfurado de cerume; Mirim-Droriana faz entrada dupla com patamar inferior.'
  },
  {
    id: 'urucu-mandacaia',
    title: 'Uruçu-Nordestina x Mandaçaia',
    morphologicalFocus: 'Pilosidade Dourada do Tórax e Faixas do Abdômen',
    speciesA: {
      id: 'urucu_nordestina',
      name: 'Uruçu-Nordestina',
      scientific: 'Melipona scutellaris Latreille, 1811',
      badge: 'Tórax de Veludo Amarelo / Abdômen Preto',
      imageUrl: '/species/urucu_nordestina_worker.jpg',
      entryImageUrl: '/species/urucu_nordestina_entry.jpg',
      photoCredit: 'Foto: Embrapa Recursos Genéticos',
      entryPhotoCredit: 'Foto: Embrapa (Entrada com estrias de barro)',
      boxModel: 'INPA (20x20 cm interno)',
      honeyYield: '4.0 a 10.0 L/ano',
      traits: [
        'Tórax densamente coberto por veludo amarelo-dourado brilhante.',
        'Abdômen totalmente preto com finas margens claras.',
        'Porte majestoso (10 a 12 mm de comprimento).',
        'Produção excepcional de mel (uma das mais produtivas do Brasil).'
      ]
    },
    speciesB: {
      id: 'mandacaia_mqq',
      name: 'Mandaçaia MQQ',
      scientific: 'Melipona quadrifasciata quadrifasciata',
      badge: 'Tórax Escuro / 4 Faixas Amarelas no Abdômen',
      imageUrl: '/species/mandacaia_mqq_worker.jpg',
      entryImageUrl: '/species/mandacaia_entry.jpg',
      photoCredit: 'Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)',
      entryPhotoCredit: 'Foto: Fernando Kluwe Dias (Entrada com barro)',
      boxModel: 'INPA (18x18 cm interno)',
      honeyYield: '2.0 a 4.0 L/ano',
      traits: [
        'Tórax com pilosidade castanho-enegrecida.',
        'Abdômen preto com 3 a 4 faixas amarelas contínuas marcantes.',
        'Porte de 9 a 11 mm.',
        'Excelente adaptabilidade ao clima subtropical do Sul.'
      ]
    },
    keyDifference: 'Uruçu-Nordestina tem o tórax coberto por densa pelugem dourada e abdômen escuro; Mandaçaia tem o tórax escuro e faixas amarelas nítidas no abdômen.',
    nestComparison: 'Ambas utilizam barro e geoprópolis para construir entradas com estrias convergentes radiais.'
  }
];

export const SimilarSpeciesComparisonModal: React.FC<SimilarSpeciesComparisonModalProps> = ({
  isOpen,
  onClose,
  initialComparisonId,
  initialSpeciesAId,
  initialSpeciesBId,
  initialTab,
  onSelectSpeciesForNewHive,
  onOpenSpeciesDetail
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialComparisonId || CURATED_COMPARISONS[0].id);
  const [viewTab, setViewTab] = useState<'curated' | 'custom'>(initialTab || (initialSpeciesAId && initialSpeciesBId ? 'custom' : 'curated'));
  const [activePhotoType, setActivePhotoType] = useState<'worker' | 'entry'>('worker');
  const [searchFilter, setSearchFilter] = useState('');
  
  // Custom Comparison Free Selection state
  const [customSpeciesAId, setCustomSpeciesAId] = useState<string>(initialSpeciesAId || 'jatai');
  const [customSpeciesBId, setCustomSpeciesBId] = useState<string>(initialSpeciesBId || 'jatai_fiebrigi');
  
  // Lightbox Zoom state
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; credit: string } | null>(null);

  // Sync with incoming props whenever opened or changed
  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setViewTab(initialTab);
      } else if (initialSpeciesAId || initialSpeciesBId) {
        setViewTab('custom');
      }
      if (initialComparisonId) {
        setSelectedId(initialComparisonId);
      }
      if (initialSpeciesAId) {
        setCustomSpeciesAId(initialSpeciesAId);
      }
      if (initialSpeciesBId) {
        setCustomSpeciesBId(initialSpeciesBId);
      }
    }
  }, [isOpen, initialComparisonId, initialSpeciesAId, initialSpeciesBId, initialTab]);

  if (!isOpen) return null;

  const currentCurated = CURATED_COMPARISONS.find(c => c.id === selectedId) || CURATED_COMPARISONS[0];

  // Derive custom comparison if in custom mode
  const speciesAObj = COMPREHENSIVE_BEE_SPECIES.find(s => s.id === customSpeciesAId) || COMPREHENSIVE_BEE_SPECIES[0];
  const speciesBObj = COMPREHENSIVE_BEE_SPECIES.find(s => s.id === customSpeciesBId) || COMPREHENSIVE_BEE_SPECIES[1];

  const handleSwapCustomSpecies = () => {
    const temp = customSpeciesAId;
    setCustomSpeciesAId(customSpeciesBId);
    setCustomSpeciesBId(temp);
  };

  const filteredCurated = CURATED_COMPARISONS.filter(c => 
    c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.keyDifference.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.speciesA.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.speciesB.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/95 dark:bg-stone-950/80 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500 text-stone-950 rounded-2xl shadow-xs shrink-0">
              <ArrowRightLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  Modo Comparativo de Espécies
                </h2>
                <span className="text-[10px] font-bold bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 px-2.5 py-0.5 rounded-full font-mono border border-amber-300 dark:border-amber-700">
                  Fotos Fidedignas SEAPI/DDPA & Embrapa
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Diagnóstico morfológico, fotos autênticas de operárias e arquitetura de ninhos para identificação precisa.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation & Controls Bar */}
        <div className="p-3 sm:px-6 bg-stone-100/80 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* View Tab Switcher: Curated Pairs vs Free Comparator */}
          <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setViewTab('curated')}
              className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewTab === 'curated'
                  ? 'bg-white dark:bg-stone-900 text-amber-900 dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pares Diagnósticos Oficiais ({CURATED_COMPARISONS.length})</span>
            </button>

            <button
              onClick={() => setViewTab('custom')}
              className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewTab === 'custom'
                  ? 'bg-white dark:bg-stone-900 text-amber-900 dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Comparador Livre (26+ Espécies)</span>
            </button>
          </div>

          {/* Photo Mode Switcher: Worker Bee vs Nest Entrance */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-950/40 p-1 rounded-xl border border-amber-300/60 dark:border-amber-800/40 w-full sm:w-auto justify-center">
            <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 px-2 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Exibir:
            </span>
            <button
              onClick={() => setActivePhotoType('worker')}
              className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePhotoType === 'worker'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-amber-500/20'
              }`}
            >
              🐝 Operária (Morfologia)
            </button>
            <button
              onClick={() => setActivePhotoType('entry')}
              className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePhotoType === 'entry'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-amber-500/20'
              }`}
            >
              🕳️ Entrada / Ninho
            </button>
          </div>

        </div>

        {/* Curated Diagnostic Selection Carousel */}
        {viewTab === 'curated' && (
          <div className="p-2 sm:px-6 overflow-x-auto border-b border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 scrollbar-none flex items-center gap-2">
            {filteredCurated.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                  selectedId === comp.id
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs scale-102'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400 hover:bg-stone-50'
                }`}
              >
                {comp.title}
              </button>
            ))}
          </div>
        )}

        {/* Free Selection Dropdowns when in Custom Mode */}
        {viewTab === 'custom' && (
          <div className="p-4 sm:px-6 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-800/40">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Species A Selector */}
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center justify-between">
                  <span>Espécie 1 (Esquerda):</span>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-normal">
                    {speciesAObj.scientificName}
                  </span>
                </label>
                <select
                  value={customSpeciesAId}
                  onChange={(e) => setCustomSpeciesAId(e.target.value)}
                  className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                >
                  {COMPREHENSIVE_BEE_SPECIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.popularName} — {s.scientificName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={handleSwapCustomSpecies}
                title="Inverter lados da comparação"
                className="p-2.5 bg-amber-200/80 hover:bg-amber-300 dark:bg-amber-900/80 dark:hover:bg-amber-800 text-amber-950 dark:text-amber-200 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all shrink-0 cursor-pointer text-xs"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Inverter</span>
              </button>

              {/* Species B Selector */}
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center justify-between">
                  <span>Espécie 2 (Direita):</span>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-normal">
                    {speciesBObj.scientificName}
                  </span>
                </label>
                <select
                  value={customSpeciesBId}
                  onChange={(e) => setCustomSpeciesBId(e.target.value)}
                  className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                >
                  {COMPREHENSIVE_BEE_SPECIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.popularName} — {s.scientificName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Key Difference Diagnostic Card */}
          {viewTab === 'curated' ? (
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-300 dark:border-amber-800/60 flex items-start gap-3.5 shadow-xs">
              <div className="p-2 bg-amber-500/20 dark:bg-amber-500/30 rounded-xl shrink-0 mt-0.5 text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                    Ponto Chave de Diagnóstico
                  </h3>
                  <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 px-2 py-0.5 rounded-full font-medium">
                    Foco: {currentCurated.morphologicalFocus}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                  {currentCurated.keyDifference}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-300 dark:border-amber-800/60 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <p className="text-xs font-medium text-stone-800 dark:text-stone-200">
                  Comparação livre entre <strong>{speciesAObj.popularName}</strong> e <strong>{speciesBObj.popularName}</strong>. Avalie as fotografias, modelos de caixas, biomas e produtividade de mel.
                </p>
              </div>
            </div>
          )}

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Column A */}
            {viewTab === 'curated' ? (
              <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700/80 p-4 sm:p-5 space-y-4 shadow-xs">
                
                {/* Photo Viewer Container with Lightbox Zoom Trigger */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-950 shadow-inner border border-stone-300 dark:border-stone-700 group">
                  <img
                    src={activePhotoType === 'entry' && currentCurated.speciesA.entryImageUrl ? currentCurated.speciesA.entryImageUrl : currentCurated.speciesA.imageUrl}
                    alt={currentCurated.speciesA.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = activePhotoType === 'entry' ? BEE_ENTRY_SVG_PLACEHOLDER : BEE_SVG_PLACEHOLDER;
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                    {currentCurated.speciesA.badge}
                  </div>

                  {/* Zoom Action Button */}
                  <button
                    onClick={() => setLightboxImage({
                      url: activePhotoType === 'entry' && currentCurated.speciesA.entryImageUrl ? currentCurated.speciesA.entryImageUrl : currentCurated.speciesA.imageUrl,
                      title: `${currentCurated.speciesA.name} - ${activePhotoType === 'entry' ? 'Entrada do Ninho' : 'Operária (Morfologia)'}`,
                      credit: activePhotoType === 'entry' && currentCurated.speciesA.entryPhotoCredit ? currentCurated.speciesA.entryPhotoCredit : currentCurated.speciesA.photoCredit
                    })}
                    className="absolute top-2.5 right-2.5 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-xs transition-colors cursor-pointer"
                    title="Ampliar Imagem"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Photo Credit Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2.5 text-[10px] text-stone-200">
                    <p className="truncate font-mono">
                      {activePhotoType === 'entry' && currentCurated.speciesA.entryPhotoCredit 
                        ? currentCurated.speciesA.entryPhotoCredit 
                        : currentCurated.speciesA.photoCredit}
                    </p>
                  </div>
                </div>

                {/* Species Info */}
                <div>
                  <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                    {currentCurated.speciesA.name}
                  </h4>
                  <p className="text-xs font-mono italic text-amber-800 dark:text-amber-400">
                    {currentCurated.speciesA.scientific}
                  </p>
                </div>

                {/* Quick Specs */}
                {(currentCurated.speciesA.boxModel || currentCurated.speciesA.honeyYield) && (
                  <div className="grid grid-cols-2 gap-2 bg-white dark:bg-stone-900 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Caixa:</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200 truncate block">
                        {currentCurated.speciesA.boxModel || 'INPA'}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Mel/ano:</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 truncate block">
                        {currentCurated.speciesA.honeyYield || 'Variável'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Diagnostic Traits List */}
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Caracteres Diagnósticos:
                  </h5>
                  <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                    {currentCurated.speciesA.traits.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              /* Custom Mode Left Card */
              <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700/80 p-4 sm:p-5 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-950 shadow-inner border border-stone-300 dark:border-stone-700 group">
                    <img
                      src={activePhotoType === 'entry' && speciesAObj.entryImageUrl ? speciesAObj.entryImageUrl : speciesAObj.imageUrl}
                      alt={speciesAObj.popularName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = activePhotoType === 'entry' ? BEE_ENTRY_SVG_PLACEHOLDER : BEE_SVG_PLACEHOLDER;
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      {speciesAObj.region}
                    </div>
                    <button
                      onClick={() => setLightboxImage({
                        url: activePhotoType === 'entry' && speciesAObj.entryImageUrl ? speciesAObj.entryImageUrl : speciesAObj.imageUrl,
                        title: `${speciesAObj.popularName} - ${activePhotoType === 'entry' ? 'Entrada do Ninho' : 'Operária (Morfologia)'}`,
                        credit: speciesAObj.photoCredit || 'Catálogo MeliApp'
                      })}
                      className="absolute top-2.5 right-2.5 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-xs cursor-pointer"
                      title="Ampliar Foto"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 text-[10px] text-stone-200 truncate font-mono">
                      {activePhotoType === 'entry' && speciesAObj.entryPhotoCredit ? speciesAObj.entryPhotoCredit : (speciesAObj.photoCredit || 'Foto: Guia de Meliponicultura')}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                        {speciesAObj.popularName}
                      </h4>
                      <p className="text-xs font-mono italic text-amber-800 dark:text-amber-400">
                        {speciesAObj.scientificName}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                      {speciesAObj.group}
                    </span>
                  </div>

                  {/* Technical Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800 text-[11px] space-y-0.5">
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Caixa:</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200 truncate block">
                        {speciesAObj.recommendedBoxModel}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Mel/ano:</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 truncate block">
                        {speciesAObj.honeyYieldPerYear}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Temperamento:</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 capitalize block">
                        {speciesAObj.aggressiveness}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Dificuldade:</span>
                      <span className="font-semibold text-stone-700 dark:text-stone-300 capitalize block">
                        Manejo {speciesAObj.difficulty}
                      </span>
                    </div>
                    {speciesAObj.flightRange && (
                      <div>
                        <span className="text-stone-400 block text-[10px] font-bold uppercase">Raio de Voo:</span>
                        <span className="font-semibold text-stone-700 dark:text-stone-300 block">
                          {speciesAObj.flightRange}
                        </span>
                      </div>
                    )}
                    {speciesAObj.honeyMoistureRange && (
                      <div>
                        <span className="text-stone-400 block text-[10px] font-bold uppercase">Umidade Mel:</span>
                        <span className="font-semibold text-stone-700 dark:text-stone-300 block">
                          {speciesAObj.honeyMoistureRange}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {speciesAObj.description}
                  </p>

                  {speciesAObj.morphologyNotes && (
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                      <span className="font-bold text-stone-500 dark:text-stone-400 uppercase text-[10px] block">Morfologia & Diagnóstico:</span>
                      <p className="text-stone-600 dark:text-stone-300">{speciesAObj.morphologyNotes}</p>
                    </div>
                  )}

                  {speciesAObj.nestEntranceNotes && (
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                      <span className="font-bold text-stone-500 dark:text-stone-400 uppercase text-[10px] block">Tubo / Entrada do Ninho:</span>
                      <p className="text-stone-600 dark:text-stone-300">{speciesAObj.nestEntranceNotes}</p>
                    </div>
                  )}

                  {speciesAObj.similarSpeciesDiff && (
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-950 dark:text-amber-200">
                      <span className="font-bold uppercase text-[10px] block text-amber-800 dark:text-amber-400">Diferenciação Notável ({speciesAObj.similarSpeciesDiff.compareWith}):</span>
                      <p className="mt-0.5">{speciesAObj.similarSpeciesDiff.description}</p>
                    </div>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-stone-200 dark:border-stone-700 flex items-center gap-2">
                  {onOpenSpeciesDetail && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenSpeciesDetail(speciesAObj);
                      }}
                      className="flex-1 py-2 px-3 bg-white dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-600 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      Ver Ficha Completa
                    </button>
                  )}
                  {onSelectSpeciesForNewHive && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectSpeciesForNewHive(speciesAObj.id);
                      }}
                      className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center shadow-xs"
                    >
                      + Cadastrar Colmeia
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Column B */}
            {viewTab === 'curated' ? (
              <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700/80 p-4 sm:p-5 space-y-4 shadow-xs">
                
                {/* Photo Viewer Container with Lightbox Zoom Trigger */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-950 shadow-inner border border-stone-300 dark:border-stone-700 group">
                  <img
                    src={activePhotoType === 'entry' && currentCurated.speciesB.entryImageUrl ? currentCurated.speciesB.entryImageUrl : currentCurated.speciesB.imageUrl}
                    alt={currentCurated.speciesB.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = activePhotoType === 'entry' ? BEE_ENTRY_SVG_PLACEHOLDER : BEE_SVG_PLACEHOLDER;
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                    {currentCurated.speciesB.badge}
                  </div>

                  {/* Zoom Action Button */}
                  <button
                    onClick={() => setLightboxImage({
                      url: activePhotoType === 'entry' && currentCurated.speciesB.entryImageUrl ? currentCurated.speciesB.entryImageUrl : currentCurated.speciesB.imageUrl,
                      title: `${currentCurated.speciesB.name} - ${activePhotoType === 'entry' ? 'Entrada do Ninho' : 'Operária (Morfologia)'}`,
                      credit: activePhotoType === 'entry' && currentCurated.speciesB.entryPhotoCredit ? currentCurated.speciesB.entryPhotoCredit : currentCurated.speciesB.photoCredit
                    })}
                    className="absolute top-2.5 right-2.5 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-xs transition-colors cursor-pointer"
                    title="Ampliar Imagem"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Photo Credit Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2.5 text-[10px] text-stone-200">
                    <p className="truncate font-mono">
                      {activePhotoType === 'entry' && currentCurated.speciesB.entryPhotoCredit 
                        ? currentCurated.speciesB.entryPhotoCredit 
                        : currentCurated.speciesB.photoCredit}
                    </p>
                  </div>
                </div>

                {/* Species Info */}
                <div>
                  <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                    {currentCurated.speciesB.name}
                  </h4>
                  <p className="text-xs font-mono italic text-amber-800 dark:text-amber-400">
                    {currentCurated.speciesB.scientific}
                  </p>
                </div>

                {/* Quick Specs */}
                {(currentCurated.speciesB.boxModel || currentCurated.speciesB.honeyYield) && (
                  <div className="grid grid-cols-2 gap-2 bg-white dark:bg-stone-900 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Caixa:</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200 truncate block">
                        {currentCurated.speciesB.boxModel || 'INPA'}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Mel/ano:</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 truncate block">
                        {currentCurated.speciesB.honeyYield || 'Variável'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Diagnostic Traits List */}
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Caracteres Diagnósticos:
                  </h5>
                  <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                    {currentCurated.speciesB.traits.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              /* Custom Mode Right Card */
              <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700/80 p-4 sm:p-5 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-950 shadow-inner border border-stone-300 dark:border-stone-700 group">
                    <img
                      src={activePhotoType === 'entry' && speciesBObj.entryImageUrl ? speciesBObj.entryImageUrl : speciesBObj.imageUrl}
                      alt={speciesBObj.popularName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = activePhotoType === 'entry' ? BEE_ENTRY_SVG_PLACEHOLDER : BEE_SVG_PLACEHOLDER;
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      {speciesBObj.region}
                    </div>
                    <button
                      onClick={() => setLightboxImage({
                        url: activePhotoType === 'entry' && speciesBObj.entryImageUrl ? speciesBObj.entryImageUrl : speciesBObj.imageUrl,
                        title: `${speciesBObj.popularName} - ${activePhotoType === 'entry' ? 'Entrada do Ninho' : 'Operária (Morfologia)'}`,
                        credit: speciesBObj.photoCredit || 'Catálogo MeliApp'
                      })}
                      className="absolute top-2.5 right-2.5 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-xs cursor-pointer"
                      title="Ampliar Foto"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 text-[10px] text-stone-200 truncate font-mono">
                      {activePhotoType === 'entry' && speciesBObj.entryPhotoCredit ? speciesBObj.entryPhotoCredit : (speciesBObj.photoCredit || 'Foto: Guia de Meliponicultura')}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                        {speciesBObj.popularName}
                      </h4>
                      <p className="text-xs font-mono italic text-amber-800 dark:text-amber-400">
                        {speciesBObj.scientificName}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                      {speciesBObj.group}
                    </span>
                  </div>

                  {/* Technical Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800 text-[11px] space-y-0.5">
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Caixa:</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200 truncate block">
                        {speciesBObj.recommendedBoxModel}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Mel/ano:</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 truncate block">
                        {speciesBObj.honeyYieldPerYear}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Temperamento:</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 capitalize block">
                        {speciesBObj.aggressiveness}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Dificuldade:</span>
                      <span className="font-semibold text-stone-700 dark:text-stone-300 capitalize block">
                        Manejo {speciesBObj.difficulty}
                      </span>
                    </div>
                    {speciesBObj.flightRange && (
                      <div>
                        <span className="text-stone-400 block text-[10px] font-bold uppercase">Raio de Voo:</span>
                        <span className="font-semibold text-stone-700 dark:text-stone-300 block">
                          {speciesBObj.flightRange}
                        </span>
                      </div>
                    )}
                    {speciesBObj.honeyMoistureRange && (
                      <div>
                        <span className="text-stone-400 block text-[10px] font-bold uppercase">Umidade Mel:</span>
                        <span className="font-semibold text-stone-700 dark:text-stone-300 block">
                          {speciesBObj.honeyMoistureRange}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {speciesBObj.description}
                  </p>

                  {speciesBObj.morphologyNotes && (
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                      <span className="font-bold text-stone-500 dark:text-stone-400 uppercase text-[10px] block">Morfologia & Diagnóstico:</span>
                      <p className="text-stone-600 dark:text-stone-300">{speciesBObj.morphologyNotes}</p>
                    </div>
                  )}

                  {speciesBObj.nestEntranceNotes && (
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                      <span className="font-bold text-stone-500 dark:text-stone-400 uppercase text-[10px] block">Tubo / Entrada do Ninho:</span>
                      <p className="text-stone-600 dark:text-stone-300">{speciesBObj.nestEntranceNotes}</p>
                    </div>
                  )}

                  {speciesBObj.similarSpeciesDiff && (
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-950 dark:text-amber-200">
                      <span className="font-bold uppercase text-[10px] block text-amber-800 dark:text-amber-400">Diferenciação Notável ({speciesBObj.similarSpeciesDiff.compareWith}):</span>
                      <p className="mt-0.5">{speciesBObj.similarSpeciesDiff.description}</p>
                    </div>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-stone-200 dark:border-stone-700 flex items-center gap-2">
                  {onOpenSpeciesDetail && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenSpeciesDetail(speciesBObj);
                      }}
                      className="flex-1 py-2 px-3 bg-white dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-600 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      Ver Ficha Completa
                    </button>
                  )}
                  {onSelectSpeciesForNewHive && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectSpeciesForNewHive(speciesBObj.id);
                      }}
                      className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center shadow-xs"
                    >
                      + Cadastrar Colmeia
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Nest and Entrance Comparative Summary */}
          {viewTab === 'curated' ? (
            <div className="bg-stone-100 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-start gap-3 shadow-xs">
              <div className="p-2 bg-amber-500/20 dark:bg-amber-500/30 rounded-xl shrink-0 mt-0.5 text-amber-800 dark:text-amber-300">
                <Box className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Comparativo de Ninho & Arquitetura de Entrada
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {currentCurated.nestComparison}
                </p>
              </div>
            </div>
          ) : (
            /* Custom Mode Matrix Comparison Table */
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
              <div className="p-3 bg-stone-100/70 dark:bg-stone-800/70 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                  <span>Matriz Comparativa Resumida Lado a Lado</span>
                </h4>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                  {speciesAObj.popularName} vs {speciesBObj.popularName}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 dark:bg-stone-950/40 text-stone-600 dark:text-stone-400 font-bold border-b border-stone-200 dark:border-stone-800">
                    <tr>
                      <th className="p-3 w-1/3">Critério Técnico</th>
                      <th className="p-3 w-1/3 text-amber-900 dark:text-amber-300">{speciesAObj.popularName}</th>
                      <th className="p-3 w-1/3 text-amber-900 dark:text-amber-300">{speciesBObj.popularName}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Nome Científico</td>
                      <td className="p-3 font-mono italic text-stone-900 dark:text-stone-100">{speciesAObj.scientificName}</td>
                      <td className="p-3 font-mono italic text-stone-900 dark:text-stone-100">{speciesBObj.scientificName}</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Modelo de Caixa</td>
                      <td className="p-3 font-medium text-stone-800 dark:text-stone-200">{speciesAObj.recommendedBoxModel}</td>
                      <td className="p-3 font-medium text-stone-800 dark:text-stone-200">{speciesBObj.recommendedBoxModel}</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Produção Anual de Mel</td>
                      <td className="p-3 font-bold text-amber-700 dark:text-amber-400">{speciesAObj.honeyYieldPerYear}</td>
                      <td className="p-3 font-bold text-amber-700 dark:text-amber-400">{speciesBObj.honeyYieldPerYear}</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Nível de Manejo</td>
                      <td className="p-3 capitalize">Manejo {speciesAObj.difficulty}</td>
                      <td className="p-3 capitalize">Manejo {speciesBObj.difficulty}</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Temperamento</td>
                      <td className="p-3 capitalize">{speciesAObj.aggressiveness}</td>
                      <td className="p-3 capitalize">{speciesBObj.aggressiveness}</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Raio de Vôo</td>
                      <td className="p-3">{speciesAObj.flightRange || '—'}</td>
                      <td className="p-3">{speciesBObj.flightRange || '—'}</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Região / Bioma</td>
                      <td className="p-3">{speciesAObj.region || speciesAObj.biome || '—'}</td>
                      <td className="p-3">{speciesBObj.region || speciesBObj.biome || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white p-3">
              <div>
                <h3 className="font-bold text-base font-serif">{lightboxImage.title}</h3>
                <p className="text-xs text-stone-400 font-mono">{lightboxImage.credit}</p>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/20 max-h-[70vh] bg-stone-950 flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
