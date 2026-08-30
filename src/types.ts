export type SubproductType = 'mel' | 'propolis' | 'polen' | 'cera' | 'geopropolis' | 'isca_pet';

export interface Meliponary {
  id: string;
  name: string;
  location: string;
  cityState: string;
  floraDescription: string;
  notes?: string;
  createdAt: string;
  imageUrl?: string;
}

export interface SpeciesImageItem {
  url: string;
  fallbackUrl?: string;
  credit?: string;
  title?: string;
  alt?: string;
}

export interface SpeciesImageSet {
  worker: SpeciesImageItem;
  entry: SpeciesImageItem;
  guide?: SpeciesImageItem;
  nest?: SpeciesImageItem;
}

export interface BeeSpecies {
  id: string;
  popularName: string;
  scientificName: string;
  // Campos padronizados solicitados
  nome_popular?: string;
  nome_cientifico?: string;
  url_foto_especie?: string;
  url_foto_entrada?: string;
  url_foto_guia?: string;
  guideImageUrl?: string;
  images?: SpeciesImageSet;
  group: 'melipona' | 'trigona' | 'plebeia' | 'outros';
  recommendedBoxModel: string;
  honeyYieldPerYear: string; // e.g. "1.5 a 3.0 Litros/ano"
  aggressiveness: 'Mansa' | 'Muito Mansa' | 'Defensiva' | 'Ativa';
  difficulty: 'Fácil' | 'Média' | 'Avançada';
  description: string;
  honeyMoistureRange: string; // e.g. "24% - 28%"
  avatarBg: string;
  region?: string;
  biome?: string;
  nestingType?: string;
  swarmingPeriod?: string;
  flightRange?: string;
  imageUrl?: string;
  entryImageUrl?: string;
  nestImageUrl?: string;
  photoCredit?: string;
  entryPhotoCredit?: string;
  guidePhotoCredit?: string;
  morphologyNotes?: string;
  sourceCredit?: string;
  literatureReference?: string;
  nestEntranceNotes?: string;
  similarSpeciesDiff?: {
    compareWith: string;
    description: string;
    keyPoints: string[];
  };
}

export interface Hive {
  id: string;
  code: string; // e.g. "JAT-01" (Hive ID)
  meliponaryId: string;
  speciesId: string; // Bee Breed / Species
  boxModel: 'INPA' | 'AF' | 'Capixaba' | 'Uberlândia' | 'Racional' | 'Outro';
  acquisitionType: 'Divisão' | 'Isca PET' | 'Resgate' | 'Compra' | 'Enxame Natural';
  installationDate: string; // Founding / Installation Date
  gpsCoordinates?: { lat: number; lng: number }; // GPS entry
  locationDetails?: string; // Manual location entry (e.g. "Prateleira 2 - Setor Norte")
  queenStatus: 'Fecundada' | 'Virgem' | 'Realeza Presente' | 'Sem Rainha (Órfã)' | 'Marcada com Cor do Ano';
  treatmentNotes?: string; // Notes on Treatments & Diseases
  strength: 1 | 2 | 3 | 4 | 5; // 1 = Fraca, 5 = Fortíssima
  status: 'Ativa' | 'Fortalecimento' | 'Órfã' | 'Dividida' | 'Inativa';
  lastInspectionDate?: string;
  nextFeedingDate?: string;
  notes?: string;
  qrCodeId: string;
  imageUrl?: string;
}

export type ReminderTaskType = 'inspection' | 'treatment' | 'feeding' | 'harvest' | 'queen' | 'other';
export type ReminderPriority = 'Baixa' | 'Média' | 'Alta' | 'Urgente';
export type ReminderStatus = 'Pendente' | 'Concluído' | 'Atrasado';
export type ReminderFrequency = 'Uma vez' | 'Diário' | 'Semanal' | 'Quinzenal' | 'Mensal';

export interface ReminderRecord {
  id: string;
  title: string;
  taskType: ReminderTaskType;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  hiveId?: string;
  hiveCode?: string;
  meliponaryId?: string;
  priority: ReminderPriority;
  status: ReminderStatus;
  frequency: ReminderFrequency;
  notifyInApp: boolean;
  notifyEmail: boolean;
  emailAddress?: string;
  notifyPush: boolean;
  notes?: string;
  completedAt?: string;
  createdAt: string;
}

export interface HarvestRecord {
  id: string;
  hiveId: string;
  hiveCode: string;
  meliponaryId: string;
  type: SubproductType;
  amount: number;
  unit: 'ml' | 'L' | 'g' | 'kg' | 'unidade';
  moisturePercent?: number; // p.ex. 25.2% para mel
  brixDegrees?: number;     // Brix do mel
  harvestMethod: 'Sugador Elétrico' | 'Seringa Manual' | 'Prensagem' | 'Raspagem' | 'Outro';
  harvestDate: string;
  lotNumber: string; // p.ex. "LOT-2026-08-JAT"
  notes?: string;
  estimatedValueBrl?: number;
}

export interface InspectionRecord {
  id: string;
  hiveId: string;
  hiveCode: string;
  date: string;
  broodDisks: 'Excelente' | 'Bom' | 'Regular' | 'Fraco';
  foodStores: 'Abundante' | 'Suficiente' | 'Baixo' | 'Crítico';
  queenStatus: 'Fecundada' | 'Virgem' | 'Realeza Presente' | 'Sem Rainha (Órfã)';
  pestsDetected: string[]; // e.g. ['forideos', 'formigas']
  boxHumidity: 'Normal' | 'Alta' | 'Baixa';
  actionTaken?: string;
  notes?: string;
}

export interface FeedingRecord {
  id: string;
  hiveId: string;
  hiveCode: string;
  date: string;
  feedType: 'Xarope de Açúcar 1:1' | 'Xarope 2:1' | 'Bife Proteico' | 'Pasta de Pólen' | 'Água Potável' | 'Suplemento Vitamínico';
  amount: number;
  unit: 'ml' | 'g';
  notes?: string;
}

export interface DivisionRecord {
  id: string;
  motherHiveId: string;
  motherHiveCode: string;
  daughterHiveCode: string;
  speciesId: string;
  divisionDate: string;
  method: '1 para 1' | 'Disco de Cria' | 'Mista (Várias Colônias)';
  status: 'Bem Sucedida' | 'Em Observação' | 'Necessita Suporte' | 'Falhou';
  queenFlightExpectedDate: string;
  notes?: string;
}

export interface BaitTrapRecord {
  id: string;
  meliponaryId: string;
  trapCode: string; // e.g. "ISCA-05"
  locationName: string;
  dateSet: string;
  dateCaptured?: string;
  speciesCapturedId?: string;
  status: 'Instalada' | 'Capturada' | 'Transferida para Caixa' | 'Descartada';
  notes?: string;
}

export interface FloraItem {
  id: string;
  plantName: string;
  scientificName: string;
  bloomingMonths: number[]; // 1 = Jan, 12 = Dez
  valueType: 'Néctar' | 'Pólen' | 'Néctar & Pólen' | 'Resina' | 'Resina para Geoprópolis';
  attractiveForSpecies: string[]; // list of popular names or species IDs
  region: string;
  description: string;
  iconBg: string;
  imageUrl?: string;
  raizerUrl?: string;
  approxPrice?: string;
  plantCategory?: string;
  verifiedInRaizer?: boolean;
}

export interface RaizerImageResult {
  id: string;
  title: string;
  scientificName?: string;
  imageUrl: string;
  productUrl: string;
  price?: string;
  category?: string;
  description?: string;
  source: 'live_scraper' | 'raizer_catalog';
  bloomingMonths?: number[];
  attractiveForSpecies?: string[];
  valueType?: string;
}

export interface InspectionChecklistItem {
  id: string;
  label: string;
  category: 'cria' | 'alimento' | 'saude' | 'estrutura';
  checked: boolean;
}

export type MarketplaceCategory = 
  | 'plantas_sementes'   // Mudas de Plantas Meliponófilas, Sementes, Pasto Apícola
  | 'mel_produtos'       // Mel, Própolis, Pólen, Geoprópolis
  | 'caixas_equipamentos' // Caixas Racionais, Ferramentas, Sugadores, Alimentadores
  | 'insumos_atrativos'   // Atrativo de Resina/Cera, Iscas PET, Cera Alveolada
  | 'enxames_matrizes'    // Matrizes de Abelhas sem Ferrão, Discos de Cria
  | 'livros_cursos'       // Livros, Manuais, Cursos, Guias de Flora
  | 'servicos';           // Resgate de Enxames, Consultoria, Instalação

export type AffiliatePlatform = 
  | 'Shopee' 
  | 'AliExpress' 
  | 'Temu' 
  | 'TikTok Shop' 
  | 'Amazon' 
  | 'Mercado Livre' 
  | 'Raizer'
  | 'Outro';

export interface MarketplaceItem {
  id: string;
  title: string;
  category: MarketplaceCategory;
  priceBrl: number;
  originalPriceBrl?: number; // Preço original para mostrar desconto ("De R$ X por R$ Y")
  unit?: string; // e.g. "por unidade", "por frasco de 250ml", "kit com 5 mudas", "envelope 50g"
  sellerName: string;
  sellerCityState: string;
  sellerPhoneWhatsapp?: string;
  sellerEmail?: string;
  verifiedSeller?: boolean;
  rating?: number; // e.g. 4.9
  reviewCount?: number;
  description: string;
  imageUrl: string;
  deliveryOptions: ('Correios' | 'Entrega em Mãos' | 'Retirada no Meliponário' | 'Transportadora' | 'Download Digital' | 'Envio Internacional' | 'Frete Grátis')[];
  condition: 'Novo' | 'Usado - Excelente Estado' | 'Artesanal' | 'Matriz Nativa Certificada' | 'Muda Enraizada' | 'Sementes Selecionadas';
  createdAt: string;
  featured?: boolean;
  // Campos para Afiliados e E-commerce Parceiro (Shopee, AliExpress, Temu, TikTok Shop, etc.)
  isAffiliate?: boolean;
  affiliatePlatform?: AffiliatePlatform;
  affiliateUrl?: string; // Link direto do afiliado com tag de rastreamento
  discountCoupon?: string; // Cupom de desconto opcional (ex: "MELIAPP10")
}

export interface SavedAffiliateLink {
  id: string;
  title: string;
  platform: AffiliatePlatform;
  originalUrl?: string;
  trackingUrl: string;
  subIdOrTag?: string;
  coupon?: string;
  category?: MarketplaceCategory;
  notes?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'meliponicultor';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  emailVerified?: boolean;
  isAnonymous?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  meliponaryName?: string;
  cityState?: string;
  phoneWhatsapp?: string;
  photoURL?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CloudSyncStatus = 'synced' | 'syncing' | 'offline' | 'error';


