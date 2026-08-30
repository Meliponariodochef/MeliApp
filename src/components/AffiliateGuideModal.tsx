import React, { useState, useEffect } from 'react';
import { 
  X, 
  BadgePercent, 
  ExternalLink, 
  Check, 
  Copy, 
  Lightbulb, 
  Calculator, 
  Link2, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Plus,
  Trash2,
  Search,
  Tag,
  Share2,
  Info,
  Layers,
  Wrench,
  Sprout,
  BookOpen
} from 'lucide-react';
import { AffiliatePlatform, MarketplaceCategory, MarketplaceItem, SavedAffiliateLink } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface AffiliateGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplateToPublish: (templateData: {
    title: string;
    category: MarketplaceCategory;
    priceBrl: string;
    originalPriceBrl?: string;
    unit: string;
    description: string;
    imageUrl: string;
    affiliatePlatform: AffiliatePlatform;
    affiliateUrl: string;
    discountCoupon?: string;
    condition: MarketplaceItem['condition'];
    deliveryOptions: MarketplaceItem['deliveryOptions'];
  }) => void;
  onSelectSavedLinkToPublish?: (savedLink: SavedAffiliateLink) => void;
}

interface PlatformGuide {
  id: AffiliatePlatform;
  name: string;
  badgeColor: string;
  portalUrl: string;
  commissionRate: string;
  paymentMethod: string;
  requirements: string;
  trackingParam: string;
  shortDescription: string;
  stepByStep: string[];
  tipsForMeliponiculture: string[];
  popularCategories: string[];
}

const PLATFORM_GUIDES: PlatformGuide[] = [
  {
    id: 'Shopee',
    name: 'Shopee Afiliados',
    badgeColor: 'bg-orange-500 text-white',
    portalUrl: 'https://afiliados.shopee.com.br',
    commissionRate: '3% a 14% por venda concluída',
    paymentMethod: 'PIX ou transferência bancária quinzenal/mensal',
    requirements: 'Qualquer pessoa com CPF e conta bancária (sem limite mínimo de seguidores)',
    trackingParam: 'sub_id (ex: ?sub_id=meliapp)',
    shortDescription: 'O programa mais popular no Brasil com altíssima taxa de conversão em insumos apícolas, mudas e sementes.',
    stepByStep: [
      '1. Acesse o portal oficial afiliados.shopee.com.br e faça login com sua conta Shopee.',
      '2. Preencha seus dados de recebimento (chave PIX ou conta bancária) e aguarde a aprovação (geralmente em 24 a 48h).',
      '3. No aplicativo da Shopee ou no computador, navegue até qualquer produto (ex: Kit de Mudas de Ora-pro-nóbis ou Cera Alveolada).',
      '4. Clique no ícone de "Compartilhar" (🔗) e selecione "Copiar Link de Afiliado" ou gere um link curto com seu identificador (ex: s.shopee.com.br/...).',
      '5. Cole esse link no MeliApp ao criar um anúncio no Marketplace ou salve em "Meus Links Salvos"!'
    ],
    tipsForMeliponiculture: [
      'Sementes meliponófilas e mudas têm altíssima busca e frete grátis na Shopee.',
      'Alimentadores internos tipo Doolittle e garrafas pet para iscas vendem em kits de 20 a 50 unidades.',
      'Aproveite os dias de cupom da Shopee (ex: 7.7, 8.8, 9.9, Black Friday) para destacar ofertas com preços arrasadores.'
    ],
    popularCategories: ['Mudas & Sementes', 'Alimentadores de Abelhas', 'Cera de Abelha', 'Telas Mosquiteiro', 'Iscas PET']
  },
  {
    id: 'AliExpress',
    name: 'AliExpress Portals / Afiliados',
    badgeColor: 'bg-red-600 text-white',
    portalUrl: 'https://portals.aliexpress.com',
    commissionRate: '5% a 20% em eletrônicos e ferramentas',
    paymentMethod: 'Transferência bancária internacional ou intermediadores',
    requirements: 'Cadastro gratuito no portal AliExpress Portals',
    trackingParam: 'aff_sub (ex: ?aff_sub=meliapp)',
    shortDescription: 'Melhor opção para equipamentos tecnológicos de baixo custo (sugadores de mel elétricos, microscópios de bolso e termômetros com sonda).',
    stepByStep: [
      '1. Cadastre-se no AliExpress Portals (portals.aliexpress.com).',
      '2. Instale a extensão oficial do AliExpress Portals no navegador Chrome/Edge para gerar links com 1 clique.',
      '3. Ao visualizar qualquer produto no AliExpress (ex: Mini Bomba de Vácuo 12V para Mel ou Termo-higrômetro LCD), abra a barra SiteStripe no topo e clique em "Get Link".',
      '4. Copie o link curto gerado (ex: https://s.click.aliexpress.com/e/...).',
      '5. Cadastre no MeliApp com as fotos e descrição em português.'
    ],
    tipsForMeliponiculture: [
      'Sugadores elétricos automáticos de mel de Jataí e Mandaçaia são campeões de vendas.',
      'Microscópios digitais USB de 1600x ajudam os meliponicultores a identificar postura da rainha e larvas de forídeos.',
      'Termômetros com sonda externa de 1 metro são perfeitos para encaixar na tampa das caixas INPA sem abrir o ninho.'
    ],
    popularCategories: ['Sugadores Elétricos de Mel', 'Microscópios Digitais', 'Termômetros LCD de Ninho', 'Balanças de Precisão']
  },
  {
    id: 'Temu',
    name: 'Temu Affiliate & Influencer',
    badgeColor: 'bg-amber-600 text-white',
    portalUrl: 'https://www.temu.com/affiliate',
    commissionRate: '10% a 30% + Bônus por novos clientes',
    paymentMethod: 'Transferência bancária ou PayPal / PIX',
    requirements: 'Cadastro no programa de afiliados Temu ou código de influenciador',
    trackingParam: '_x_src / link curto (ex: ?_x_src=meliapp)',
    shortDescription: 'Crescimento acelerado no Brasil com preços ultra-competitivos e frete grátis em ferramentas e gadgets para meliponários.',
    stepByStep: [
      '1. Acesse temu.com/affiliate e cadastre sua conta.',
      '2. Pegue seu código de cupom exclusivo e seu link de afiliado raiz.',
      '3. Use a ferramenta de links profundos (Deep Link) para direcionar direto para o item desejado.',
      '4. Compartilhe o cupom de boas-vindas com desconto (ex: TEMU50OFF) junto com o link.',
      '5. Cole no cadastro de produto do MeliApp preenchendo os campos de cupom e link.'
    ],
    tipsForMeliponiculture: [
      'Ferramentas manuais de precisão (formões, pinças e mini maçaricos para cera) custam muito barato na Temu.',
      'Acessórios de proteção (chapéus com tela mosquiteira, luvas finas e jalecos) têm ótima saída.',
      'Use o campo de "Cupom de Desconto" no MeliApp para aumentar os cliques de compra dos usuários.'
    ],
    popularCategories: ['Mini Ferramentas de Marcenaria', 'Chapéu e Telas de Proteção', 'Iluminação LED para Ninho', 'Mini Frascos de Mel']
  },
  {
    id: 'TikTok Shop',
    name: 'TikTok Shop para Criadores',
    badgeColor: 'bg-stone-900 text-cyan-300',
    portalUrl: 'https://shop.tiktok.com',
    commissionRate: '8% a 25% por produto promovido',
    paymentMethod: 'Conta corrente vinculada à carteira do TikTok',
    requirements: 'Conta no TikTok habilitada para ferramentas de criador / marketplace',
    trackingParam: 'Link de produto da vitrine de criador',
    shortDescription: 'Ideal para quem grava vídeos rápidos de manejo, alimentação ou divisão e deseja monetizar os equipamentos mostrados.',
    stepByStep: [
      '1. No app do TikTok, vá em "Perfil" > "Menu" > "Ferramentas do Criador" > "TikTok Shop".',
      '2. Adicione os produtos ao seu mostruário / vitrine de criador.',
      '3. Copie o link do produto na sua vitrine ou gere o link de compartilhamento.',
      '4. Adicione o link e seu cupom exclusivo aqui no MeliApp para que a comunidade compre direto da sua vitrine!'
    ],
    tipsForMeliponiculture: [
      'Grave vídeos curtos mostrando a colheita de mel ou a floração das mudas para engajar os compradores.',
      'Mencione nos seus posts que os produtos recomendados estão listados no Marketplace do MeliApp com cupons.'
    ],
    popularCategories: ['Acessórios em Vídeo', 'Gadgets de Manejo', 'Kits Iniciais de Meliponicultura']
  },
  {
    id: 'Amazon',
    name: 'Amazon Associados Brasil',
    badgeColor: 'bg-slate-800 text-amber-400',
    portalUrl: 'https://associados.amazon.com.br',
    commissionRate: '7% a 15% em livros, ferramentas e jardinagem',
    paymentMethod: 'Depósito em conta corrente brasileira',
    requirements: 'Cadastro no programa de associados da Amazon Brasil',
    trackingParam: 'tag (ex: ?tag=meliapp-20 ou amzn.to/...)',
    shortDescription: 'Excelente reputação para livros técnicos de meliponicultura, ferramentas elétricas e sementes certificadas.',
    stepByStep: [
      '1. Cadastre-se em associados.amazon.com.br.',
      '2. Ao navegar na Amazon.com.br, use a barra "SiteStripe" no topo da página.',
      '3. Clique em "Obter Link: Texto" e selecione "Link Curto (amzn.to/...)".',
      '4. Cole no formulário do MeliApp selecionando a categoria apropriada (ex: Livros & Cursos ou Equipamentos).'
    ],
    tipsForMeliponiculture: [
      'Livros clássicos sobre abelhas indígenas sem ferrão (Paulo Nogueira-Neto, Warwick Kerr, Cristiano Menezes) vendem muito para novos criadores.',
      'Tupias, serras de esquadria e brocas para confecção de caixas racionais têm tickets altos com boas comissões.'
    ],
    popularCategories: ['Livros & Manuais Técnicos', 'Tupias e Ferramentas de Marcenaria', 'Vasos Auto-irrigáveis']
  },
  {
    id: 'Mercado Livre',
    name: 'Mercado Livre Afiliados',
    badgeColor: 'bg-yellow-400 text-stone-900',
    portalUrl: 'https://www.mercadolivre.com.br/afiliados',
    commissionRate: '3% a 12% com entrega rápida Full',
    paymentMethod: 'Conta Mercado Pago ou transferência',
    requirements: 'Cadastro no programa de afiliados Mercado Livre',
    trackingParam: 'Tracking link oficial do painel de afiliados',
    shortDescription: 'A maior velocidade de entrega no Brasil (envio Full no mesmo dia) para caixas, insumos e equipamentos.',
    stepByStep: [
      '1. Acesse mercadolivre.com.br/afiliados e faça a inscrição gratuita.',
      '2. Utilize o gerador de links do painel para obter seu link com tracking tag.',
      '3. Priorize produtos com selo "FULL" (chegam no dia seguinte para o meliponicultor).',
      '4. Publique a oferta no MeliApp com informações completas de entrega.'
    ],
    tipsForMeliponiculture: [
      'Itens com envio FULL têm a maior taxa de conversão do e-commerce brasileiro.',
      'Caixas INPA montadas e prontas, lâminas de cera e embalagens de vidro para mel.'
    ],
    popularCategories: ['Caixas Racionais Full', 'Potes de Vidro para Mel', 'Parafusadeiras e Serras']
  },
  {
    id: 'Raizer',
    name: 'Raizer - Plantas para Abelhas',
    badgeColor: 'bg-emerald-700 text-amber-300',
    portalUrl: 'https://www.raizer.com.br',
    commissionRate: '8% a 15% em mudas climatizadas e sementes',
    paymentMethod: 'PIX ou depósito bancário mensal',
    requirements: 'Cadastro no programa de parceiros / criadores Raizer ou cupom exclusivo',
    trackingParam: 'ref / cupom (ex: ?ref=meliapp)',
    shortDescription: 'O maior e-commerce e viveiro especializado em pasto apícola e meliponófilo do Brasil, com mudas raras selecionadas para abelhas sem ferrão.',
    stepByStep: [
      '1. Acesse o portal da Raizer (raizer.com.br) ou entre em contato com a equipe comercial para registrar seu código de parceiro/afiliado.',
      '2. Selecione as melhores espécies de pasto meliponófilo (Dombéias, Ora-pro-nóbis, Amor-agarradinho, Manacás, Eucaliptos floríferos).',
      '3. Gere o seu link parametrizado ou use o seu cupom oficial de desconto (ex: RAIZERMELI10).',
      '4. Cadastre o anúncio aqui no MeliApp com as fotos e especificações das mudas enraizadas para sua comunidade!'
    ],
    tipsForMeliponiculture: [
      'As mudas da Raizer são climatizadas com embalagem especial anti-desidratação garantindo 100% de pegamento no frete.',
      'Kits de 6 ou 10 mudas de floração contínua (4 estações) têm altíssima procura por meliponicultores urbanos e rurais.',
      'Divulgue o cupom de desconto exclusivo para incentivar a compra imediata.'
    ],
    popularCategories: ['Kits Pasto Meliponófilo 4 Estações', 'Mudas de Dombéia', 'Ora-pro-nóbis sem Espinhos', 'Árvores Melíferas Nativas']
  }
];

const TEMPLATE_PRODUCTS = [
  {
    title: 'Kit Raizer Pasto Meliponófilo 4 Estações - 6 Mudas Climatizadas para Abelhas Sem Ferrão',
    category: 'plantas_sementes' as MarketplaceCategory,
    priceBrl: '89.90',
    originalPriceBrl: '125.00',
    unit: 'kit 6 mudas no vaso',
    description: 'Seleção especial da Raizer - Plantas para Abelhas com 6 espécies de alto valor melífero e polinífero (Dombéia Rosa, Amor-agarradinho, Ora-pro-nóbis, Manacá-da-serra, Vassourinha e Cosmos). Embalagem anti-estresse hídrico com garantia de pegamento.',
    imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
    affiliatePlatform: 'Raizer' as AffiliatePlatform,
    affiliateUrl: 'https://www.raizer.com.br/plantas-para-abelhas',
    discountCoupon: 'RAIZERMELI10',
    condition: 'Muda Enraizada' as MarketplaceItem['condition'],
    deliveryOptions: ['Transportadora', 'Frete Grátis', 'Correios'] as MarketplaceItem['deliveryOptions'],
  },
  {
    title: 'Sugador de Mel Elétrico USB com Frasco Antivácuo e Bico de Silicone',
    category: 'caixas_equipamentos' as MarketplaceCategory,
    priceBrl: '89.90',
    originalPriceBrl: '149.00',
    unit: 'kit com 2 frascos',
    description: 'Sugador automático elétrico recarregável para colheita rápida e limpa de mel de abelhas nativas (Jataí, Mandaçaia, Uruçu). Sucção contínua controlada que não rompe os potes de cera e não mata operárias.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80',
    affiliatePlatform: 'AliExpress' as AffiliatePlatform,
    affiliateUrl: 'https://pt.aliexpress.com/w/wholesale-honey-extractor-electric.html',
    discountCoupon: 'ALIMELIAPP10',
    condition: 'Novo' as MarketplaceItem['condition'],
    deliveryOptions: ['Envio Internacional', 'Frete Grátis'] as MarketplaceItem['deliveryOptions'],
  },
  {
    title: 'Kit com 10 Mudas de Ora-pro-nóbis sem Espinhos Enraizadas (Pasto Apícola)',
    category: 'plantas_sementes' as MarketplaceCategory,
    priceBrl: '45.00',
    originalPriceBrl: '65.00',
    unit: 'kit 10 mudas em tubetes',
    description: 'Mudas prontas para transplante no meliponário. Floresce com altíssima densidade de flores brancas ricas em pólen e néctar para todas as espécies de abelhas sem ferrão.',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    affiliatePlatform: 'Shopee' as AffiliatePlatform,
    affiliateUrl: 'https://shopee.com.br/search?keyword=mudas+ora+pro+nobis',
    discountCoupon: 'SHOPEEFLORA',
    condition: 'Muda Enraizada' as MarketplaceItem['condition'],
    deliveryOptions: ['Correios', 'Frete Grátis'] as MarketplaceItem['deliveryOptions'],
  },
  {
    title: 'Termo-Higrômetro Digital LCD com Sonda Externa 1m para Caixa Racional',
    category: 'caixas_equipamentos' as MarketplaceCategory,
    priceBrl: '19.90',
    originalPriceBrl: '35.00',
    unit: 'por unidade com bateria',
    description: 'Sensor ultrafino que monitora temperatura e umidade interna da colmeia 24 horas por dia sem precisar abrir a tampa ou estressar as abelhas.',
    imageUrl: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80',
    affiliatePlatform: 'Temu' as AffiliatePlatform,
    affiliateUrl: 'https://www.temu.com/search_result.html?search_key=digital+thermometer+hygrometer',
    discountCoupon: 'TEMU50OFF',
    condition: 'Novo' as MarketplaceItem['condition'],
    deliveryOptions: ['Envio Internacional', 'Frete Grátis'] as MarketplaceItem['deliveryOptions'],
  },
  {
    title: 'Kit 5 Envelopes de Sementes Meliponófilas (Assa-Peixe, Cosmos, Zínia, Manjericão)',
    category: 'plantas_sementes' as MarketplaceCategory,
    priceBrl: '32.50',
    originalPriceBrl: '48.00',
    unit: 'kit 5 envelopes',
    description: 'Mix botânico de alta taxa de germinação com floradas escalonadas durante as 4 estações do ano, garantindo néctar e pólen contínuos para o meliponário.',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    affiliatePlatform: 'Shopee' as AffiliatePlatform,
    affiliateUrl: 'https://shopee.com.br/search?keyword=sementes+meliponicultura',
    discountCoupon: 'SEMENTESMELI',
    condition: 'Sementes Selecionadas' as MarketplaceItem['condition'],
    deliveryOptions: ['Correios', 'Frete Grátis'] as MarketplaceItem['deliveryOptions'],
  },
  {
    title: 'Microscópio Digital 1600x USB/Type-C com LED Regulável e Suporte de Bancada',
    category: 'caixas_equipamentos' as MarketplaceCategory,
    priceBrl: '79.90',
    originalPriceBrl: '139.00',
    unit: 'kit completo',
    description: 'Conecte direto no smartphone ou notebook para inspecionar postura de ovos, discos de cria e identificar precocemente pragas como forídeos, ácaros e larvas invasoras.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    affiliatePlatform: 'AliExpress' as AffiliatePlatform,
    affiliateUrl: 'https://pt.aliexpress.com/w/wholesale-digital-microscope-usb.html',
    discountCoupon: 'MICROMELI10',
    condition: 'Novo' as MarketplaceItem['condition'],
    deliveryOptions: ['Envio Internacional', 'Frete Grátis'] as MarketplaceItem['deliveryOptions'],
  },
  {
    title: 'Guia Ilustrado de Abelhas Nativas & Plantas Melíferas - Manual Prático',
    category: 'livros_cursos' as MarketplaceCategory,
    priceBrl: '49.90',
    originalPriceBrl: '72.00',
    unit: 'livro de bolso impermeável',
    description: 'Guia de campo laminado resistente à água com identificação de 40+ espécies de ASF e catálogo com 80 árvores e arbustos atrativos.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    affiliatePlatform: 'Amazon' as AffiliatePlatform,
    affiliateUrl: 'https://www.amazon.com.br/s?k=abelhas+sem+ferrao+livro',
    discountCoupon: 'PRIMEASF',
    condition: 'Novo' as MarketplaceItem['condition'],
    deliveryOptions: ['Correios', 'Frete Grátis'] as MarketplaceItem['deliveryOptions'],
  }
];

const INITIAL_SAVED_LINKS: SavedAffiliateLink[] = [
  {
    id: 'link-save-1',
    title: 'Kit Raizer Pasto Meliponófilo - 6 Mudas Climatizadas',
    platform: 'Raizer',
    originalUrl: 'https://www.raizer.com.br/plantas-para-abelhas',
    trackingUrl: 'https://www.raizer.com.br/plantas-para-abelhas?ref=meliapp&utm_source=meliapp&utm_medium=affiliate',
    subIdOrTag: 'meliapp_mudas',
    coupon: 'RAIZERMELI10',
    category: 'plantas_sementes',
    notes: 'Comissão de 12% - Embalagem especial anti-estresse hídrico com pegamento 100%',
    createdAt: '2026-08-14'
  },
  {
    id: 'link-save-2',
    title: 'Sugador de Mel Elétrico USB Portátil com Frascos Antivácuo',
    platform: 'AliExpress',
    originalUrl: 'https://pt.aliexpress.com/item/1005006421882.html',
    trackingUrl: 'https://s.click.aliexpress.com/e/_DkMeliApp?aff_sub=meliapp_sugador',
    subIdOrTag: 'meliapp_sugador',
    coupon: 'ALIMELIAPP10',
    category: 'caixas_equipamentos',
    notes: 'Comissão de 15% - Produto mais procurado para colheita limpa de mel de Jataí',
    createdAt: '2026-08-14'
  },
  {
    id: 'link-save-3',
    title: 'Mudas de Ora-pro-nóbis sem Espinhos Enraizadas',
    platform: 'Shopee',
    originalUrl: 'https://shopee.com.br/product/12345/67890',
    trackingUrl: 'https://s.shopee.com.br/8zOraProNobis?sub_id=meliapp_shopee',
    subIdOrTag: 'meliapp_shopee',
    coupon: 'SHOPEEFLORA',
    category: 'plantas_sementes',
    notes: 'Frete grátis com cupom Shopee - Alta taxa de conversão',
    createdAt: '2026-08-15'
  },
  {
    id: 'link-save-4',
    title: 'Termo-Higrômetro Digital LCD com Sonda de 1m para Tampa INPA',
    platform: 'Temu',
    originalUrl: 'https://www.temu.com/goods.html?goods_id=987654',
    trackingUrl: 'https://temu.to/m/u987654?_x_src=meliapp_gadget',
    subIdOrTag: 'meliapp_gadget',
    coupon: 'TEMU50OFF',
    category: 'caixas_equipamentos',
    notes: 'Cupom de 50% de desconto para novos usuários da Temu',
    createdAt: '2026-08-15'
  },
  {
    id: 'link-save-5',
    title: 'Guia de Campo e Identificação de Abelhas Nativas & Flora',
    platform: 'Amazon',
    originalUrl: 'https://www.amazon.com.br/dp/8521312345',
    trackingUrl: 'https://amzn.to/3MeliAppBook?tag=meliapp-20',
    subIdOrTag: 'meliapp-20',
    coupon: 'PRIMEASF',
    category: 'livros_cursos',
    notes: 'Comissão direta Amazon Associados com entrega Prime rápida',
    createdAt: '2026-08-16'
  }
];

export const AffiliateGuideModal: React.FC<AffiliateGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplateToPublish,
  onSelectSavedLinkToPublish
}) => {
  const [activeTab, setActiveTab] = useState<'platforms' | 'saved_links' | 'formatter' | 'templates' | 'calculator'>('platforms');
  const [selectedPlatform, setSelectedPlatform] = useState<AffiliatePlatform>('Shopee');
  
  // Saved Links Manager State
  const [savedLinks, setSavedLinks] = useState<SavedAffiliateLink[]>(() => {
    try {
      const stored = localStorage.getItem('meliapp_saved_affiliate_links');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return INITIAL_SAVED_LINKS;
  });

  const [savedFilterPlatform, setSavedFilterPlatform] = useState<string>('all');
  const [savedSearchQuery, setSavedSearchQuery] = useState<string>('');
  const [isAddingNewLink, setIsAddingNewLink] = useState<boolean>(false);

  // New Saved Link Form State
  const [newLinkData, setNewLinkData] = useState<{
    title: string;
    platform: AffiliatePlatform;
    trackingUrl: string;
    subIdOrTag: string;
    coupon: string;
    category: MarketplaceCategory;
    notes: string;
  }>({
    title: '',
    platform: 'Shopee',
    trackingUrl: '',
    subIdOrTag: 'meliapp',
    coupon: '',
    category: 'caixas_equipamentos',
    notes: ''
  });

  // Link Formatter State
  const [inputUrl, setInputUrl] = useState<string>('');
  const [campaignTag, setCampaignTag] = useState<string>('meliapp');
  const [formattedUrl, setFormattedUrl] = useState<string>('');
  const [formatterFeedback, setFormatterFeedback] = useState<{ valid: boolean; message: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedSavedLinkId, setCopiedSavedLinkId] = useState<string | null>(null);

  // Calculator State
  const [calcMonthlyViews, setCalcMonthlyViews] = useState<number>(500);
  const [calcAvgPrice, setCalcAvgPrice] = useState<number>(60);
  const [calcCommissionRate, setCalcCommissionRate] = useState<number>(10);
  const [calcConversionRate, setCalcConversionRate] = useState<number>(3.5);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('meliapp_saved_affiliate_links', JSON.stringify(savedLinks));
    } catch {
      // Ignore
    }
  }, [savedLinks]);

  if (!isOpen) return null;

  const currentGuide = PLATFORM_GUIDES.find((p) => p.id === selectedPlatform) || PLATFORM_GUIDES[0];

  // Helper to format and validate affiliate link
  const handleFormatLink = () => {
    if (!inputUrl.trim()) {
      setFormatterFeedback({ valid: false, message: 'Insira a URL do produto para formatar.' });
      return;
    }

    try {
      let finalUrl = inputUrl.trim();
      
      // Auto prepend https if missing
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }

      const urlObj = new URL(finalUrl);

      // Add sub_id or tracking tag based on platform
      if (selectedPlatform === 'Shopee') {
        urlObj.searchParams.set('sub_id', campaignTag || 'meliapp');
      } else if (selectedPlatform === 'AliExpress') {
        urlObj.searchParams.set('aff_sub', campaignTag || 'meliapp');
      } else if (selectedPlatform === 'Amazon') {
        urlObj.searchParams.set('tag', campaignTag || 'meliapp-20');
      } else if (selectedPlatform === 'Temu') {
        urlObj.searchParams.set('_x_src', campaignTag || 'meliapp');
      } else if (selectedPlatform === 'Raizer') {
        urlObj.searchParams.set('ref', campaignTag || 'meliapp');
        urlObj.searchParams.set('utm_source', 'meliapp');
        urlObj.searchParams.set('utm_medium', 'affiliate');
      } else {
        urlObj.searchParams.set('utm_source', 'meliapp');
        urlObj.searchParams.set('utm_medium', 'affiliate');
      }

      const output = urlObj.toString();
      setFormattedUrl(output);
      setFormatterFeedback({
        valid: true,
        message: `Link validado e parametrizado com sucesso para ${selectedPlatform}! Você pode copiá-lo ou salvá-lo na sua lista organizada.`
      });
    } catch {
      setFormatterFeedback({
        valid: false,
        message: 'A URL informada parece inválida. Verifique se copiou o link completo da barra de endereços.'
      });
    }
  };

  const handleCopyLink = (url: string, id?: string) => {
    if (url) {
      navigator.clipboard.writeText(url);
      if (id) {
        setCopiedSavedLinkId(id);
        setTimeout(() => setCopiedSavedLinkId(null), 2500);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    }
  };

  const handleSaveFormattedToCollection = () => {
    if (!formattedUrl) return;

    const newLink: SavedAffiliateLink = {
      id: 'link-save-' + Date.now(),
      title: `Link ${selectedPlatform} - Campanha ${campaignTag || 'Geral'}`,
      platform: selectedPlatform,
      originalUrl: inputUrl,
      trackingUrl: formattedUrl,
      subIdOrTag: campaignTag || 'meliapp',
      category: 'caixas_equipamentos',
      notes: `Gerado automaticamente via formatador para ${selectedPlatform}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSavedLinks((prev) => [newLink, ...prev]);
    setActiveTab('saved_links');
    setIsAddingNewLink(false);
  };

  const handleCreateCustomSavedLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkData.title.trim() || !newLinkData.trackingUrl.trim()) {
      alert('Por favor, preencha o Título e o Link de Rastreamento.');
      return;
    }

    let cleanUrl = newLinkData.trackingUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const item: SavedAffiliateLink = {
      id: 'link-save-' + Date.now(),
      title: newLinkData.title.trim(),
      platform: newLinkData.platform,
      trackingUrl: cleanUrl,
      subIdOrTag: newLinkData.subIdOrTag.trim() || undefined,
      coupon: newLinkData.coupon.trim().toUpperCase() || undefined,
      category: newLinkData.category,
      notes: newLinkData.notes.trim() || undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSavedLinks((prev) => [item, ...prev]);
    setIsAddingNewLink(false);
    setNewLinkData({
      title: '',
      platform: 'Shopee',
      trackingUrl: '',
      subIdOrTag: 'meliapp',
      coupon: '',
      category: 'caixas_equipamentos',
      notes: ''
    });
  };

  const handleDeleteSavedLink = (id: string) => {
    setSavedLinks((prev) => prev.filter((l) => l.id !== id));
  };

  // Filter saved links
  const filteredSavedLinks = savedLinks.filter((link) => {
    const matchesPlatform = savedFilterPlatform === 'all' || link.platform === savedFilterPlatform;
    const q = savedSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      link.title.toLowerCase().includes(q) ||
      link.platform.toLowerCase().includes(q) ||
      link.trackingUrl.toLowerCase().includes(q) ||
      (link.coupon && link.coupon.toLowerCase().includes(q)) ||
      (link.notes && link.notes.toLowerCase().includes(q))
    );
    return matchesPlatform && matchesSearch;
  });

  // Calculator calculations
  const estimatedSales = Math.max(1, Math.round((calcMonthlyViews * (calcConversionRate / 100))));
  const totalVolumeBrl = estimatedSales * calcAvgPrice;
  const estimatedProfitBrl = totalVolumeBrl * (calcCommissionRate / 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 my-6 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-amber-500/30 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-lg font-black">
              <BadgePercent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Central do Administrador & Criador
                </span>
                <span className="text-stone-400 text-xs">• MeliApp</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-serif text-amber-100 leading-tight">
                Guia de Afiliados & Gestor de Links de Rastreamento
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-2xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-100 px-4 pt-3 border-b border-stone-200 flex flex-wrap gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('platforms')}
            className={`pb-3 px-3.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'platforms'
                ? 'border-emerald-800 text-emerald-950 font-extrabold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>1. Passo a Passo por Plataforma</span>
          </button>

          <button
            onClick={() => setActiveTab('saved_links')}
            className={`pb-3 px-3.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'saved_links'
                ? 'border-emerald-800 text-emerald-950 font-extrabold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-600" />
            <span>2. Meus Links Salvos & Organizados</span>
            <span className="bg-amber-200/80 text-amber-950 text-[10px] font-black px-1.5 py-0.2 rounded-full font-mono">
              {savedLinks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('formatter')}
            className={`pb-3 px-3.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'formatter'
                ? 'border-emerald-800 text-emerald-950 font-extrabold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Link2 className="w-4 h-4 text-indigo-600" />
            <span>3. Formatador & Testador</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-3 px-3.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'templates'
                ? 'border-emerald-800 text-emerald-950 font-extrabold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>4. Modelos Prontos</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`pb-3 px-3.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'calculator'
                ? 'border-emerald-800 text-emerald-950 font-extrabold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>5. Calculadora de Lucro</span>
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs text-stone-700">

          {/* TAB 1: Platform Step-by-Step */}
          {activeTab === 'platforms' && (
            <div className="space-y-6">
              
              {/* Platform Selector Buttons */}
              <div className="space-y-2">
                <label className="font-extrabold text-stone-900 text-xs block">
                  Selecione a Plataforma para ver o Tutorial Completo de Rastreamento:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {PLATFORM_GUIDES.map((guide) => (
                    <button
                      key={guide.id}
                      onClick={() => setSelectedPlatform(guide.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                        selectedPlatform === guide.id
                          ? 'border-emerald-800 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-800/20 font-black'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${guide.badgeColor}`}>
                        {guide.name.split(' ')[0]}
                      </span>
                      <span className="font-bold text-stone-900 text-[11px] truncate w-full">
                        {guide.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Platform Detailed Card */}
              <div className="bg-stone-50 rounded-3xl p-5 border border-stone-200 space-y-5">
                
                {/* Platform Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${currentGuide.badgeColor}`}>
                        {currentGuide.name}
                      </span>
                      <span className="text-emerald-900 font-extrabold text-xs">
                        💰 Comissão: {currentGuide.commissionRate}
                      </span>
                    </div>
                    <p className="text-stone-600 text-xs">
                      {currentGuide.shortDescription}
                    </p>
                  </div>

                  <a
                    href={currentGuide.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs flex-shrink-0 cursor-pointer"
                  >
                    <span>Abrir Portal de Cadastro</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Requirements, Payment & Tracking Param */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Requisitos de Inscrição</span>
                    <p className="text-stone-800 font-medium">{currentGuide.requirements}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Forma de Pagamento</span>
                    <p className="text-emerald-900 font-bold">{currentGuide.paymentMethod}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Parâmetro de Tag / SubID</span>
                    <p className="text-amber-800 font-mono font-bold">{currentGuide.trackingParam}</p>
                  </div>
                </div>

                {/* Step-by-Step List */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-stone-900 text-sm flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Passo a Passo para Obter & Configurar o Link de Afiliado na {currentGuide.name}:</span>
                  </h4>
                  <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
                    {currentGuide.stepByStep.map((step, idx) => (
                      <div key={idx} className="p-3 text-stone-700 flex items-start space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-950 font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed">{step.replace(/^\d+\.\s*/, '')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meliponiculture Tips */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <h4 className="font-extrabold text-amber-950 flex items-center space-x-1.5 text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Dicas de Ouro para Vender Mais em Meliponicultura:</span>
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-stone-700">
                    {currentGuide.tipsForMeliponiculture.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Action button to save link */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-stone-500">Itens recomendados:</span>
                    {currentGuide.popularCategories.map((cat, idx) => (
                      <span key={idx} className="bg-white border border-stone-200 text-stone-800 font-bold px-2.5 py-1 rounded-xl text-[10px]">
                        ✨ {cat}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNewLinkData((prev) => ({ ...prev, platform: currentGuide.id }));
                      setIsAddingNewLink(true);
                      setActiveTab('saved_links');
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Salvar Novo Link da {currentGuide.id}</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Saved Personalized Links Manager */}
          {activeTab === 'saved_links' && (
            <div className="space-y-5">
              
              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <Bookmark className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">
                      Meus Links de Rastreamento Salvos & Organizados
                    </h4>
                    <p className="text-stone-600 text-xs mt-0.5">
                      Guarde seus links de afiliados personalizados por plataforma, com cupons, tags de campanha e notas para reutilizar quando quiser criar anúncios ou divulgar para a comunidade.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingNewLink(!isAddingNewLink)}
                  className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs flex-shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingNewLink ? 'Fechar Formulário' : '+ Salvar Novo Link'}</span>
                </button>
              </div>

              {/* Form to Save New Link */}
              {isAddingNewLink && (
                <form onSubmit={handleCreateCustomSavedLink} className="bg-stone-50 p-5 rounded-3xl border border-amber-300 shadow-md space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <h5 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                      <Tag className="w-4 h-4 text-amber-600" />
                      <span>Cadastrar Link Personalizado na Sua Lista</span>
                    </h5>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewLink(false)}
                      className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="lg:col-span-2">
                      <label className="block font-bold text-stone-900 mb-1">
                        Título / Nome do Produto ou Campanha *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sugador Elétrico USB - Loja X ou Kit Mudas Raizer"
                        value={newLinkData.title}
                        onChange={(e) => setNewLinkData({ ...newLinkData, title: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl p-2.5 bg-white text-stone-800 focus:ring-2 focus:ring-amber-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-900 mb-1">Plataforma *</label>
                      <select
                        value={newLinkData.platform}
                        onChange={(e) => setNewLinkData({ ...newLinkData, platform: e.target.value as AffiliatePlatform })}
                        className="w-full border border-stone-300 rounded-xl p-2.5 bg-white font-bold text-stone-800 focus:ring-2 focus:ring-amber-500 text-xs"
                      >
                        {(['Shopee', 'AliExpress', 'Temu', 'TikTok Shop', 'Amazon', 'Mercado Livre', 'Raizer', 'Outro'] as AffiliatePlatform[]).map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-900 mb-1">
                      Link de Rastreamento Completo (URL com sua tag/sub_id) *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://s.shopee.com.br/xyz?sub_id=meliapp ou https://s.click.aliexpress.com/..."
                      value={newLinkData.trackingUrl}
                      onChange={(e) => setNewLinkData({ ...newLinkData, trackingUrl: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl p-2.5 bg-white text-stone-800 focus:ring-2 focus:ring-amber-500 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-stone-900 mb-1">
                        SubID / Tag Utilizada
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: meliapp_bio"
                        value={newLinkData.subIdOrTag}
                        onChange={(e) => setNewLinkData({ ...newLinkData, subIdOrTag: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl p-2 bg-white text-stone-800 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-900 mb-1">
                        Cupom de Desconto (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: PROMO10"
                        value={newLinkData.coupon}
                        onChange={(e) => setNewLinkData({ ...newLinkData, coupon: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl p-2 bg-white text-stone-800 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-900 mb-1">
                        Categoria Recomendada
                      </label>
                      <select
                        value={newLinkData.category}
                        onChange={(e) => setNewLinkData({ ...newLinkData, category: e.target.value as MarketplaceCategory })}
                        className="w-full border border-stone-300 rounded-xl p-2 bg-white text-stone-800 text-xs font-medium"
                      >
                        <option value="caixas_equipamentos">🛠️ Utensílios & Equipamentos</option>
                        <option value="plantas_sementes">🌱 Plantas & Sementes</option>
                        <option value="livros_cursos">📚 Livros & Cursos</option>
                        <option value="insumos_atrativos">🍯 Insumos & Atrativos</option>
                        <option value="mel_produtos">🍯 Mel & Derivados</option>
                        <option value="servicos">🤝 Serviços</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-900 mb-1">
                      Observações / Estratégia do Link (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Comissão de 15% - destacar no grupo de WhatsApp"
                      value={newLinkData.notes}
                      onChange={(e) => setNewLinkData({ ...newLinkData, notes: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl p-2 bg-white text-stone-800 text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewLink(false)}
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold rounded-xl text-xs shadow-xs cursor-pointer"
                    >
                      Salvar na Coleção
                    </button>
                  </div>
                </form>
              )}

              {/* Filters & Search for Saved Links */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Pesquisar nos links salvos por nome, plataforma ou cupom..."
                    value={savedSearchQuery}
                    onChange={(e) => setSavedSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  <span className="text-[10px] font-bold text-stone-400 whitespace-nowrap">Filtrar:</span>
                  {['all', 'Shopee', 'AliExpress', 'Temu', 'TikTok Shop', 'Amazon', 'Raizer'].map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setSavedFilterPlatform(plat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                        savedFilterPlatform === plat
                          ? 'bg-emerald-950 text-amber-300 font-black'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {plat === 'all' ? 'Todos' : plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Saved Links Cards Grid */}
              <div className="space-y-3">
                {filteredSavedLinks.length === 0 ? (
                  <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-300 space-y-2">
                    <Bookmark className="w-8 h-8 text-stone-300 mx-auto" />
                    <p className="text-stone-500 font-medium text-xs">Nenhum link salvo encontrado com esses filtros.</p>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewLink(true)}
                      className="text-emerald-800 font-bold underline text-xs cursor-pointer"
                    >
                      + Cadastrar o primeiro link personalizado agora
                    </button>
                  </div>
                ) : (
                  filteredSavedLinks.map((saved) => {
                    const isCopied = copiedSavedLinkId === saved.id;
                    const guideInfo = PLATFORM_GUIDES.find((p) => p.id === saved.platform);

                    return (
                      <div
                        key={saved.id}
                        className="bg-white rounded-2xl border border-stone-200 p-4 hover:border-amber-400 hover:shadow-md transition-all space-y-3 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black flex-shrink-0 ${
                              guideInfo ? guideInfo.badgeColor : 'bg-stone-800 text-white'
                            }`}>
                              {saved.platform}
                            </span>
                            <h5 className="font-extrabold text-stone-900 text-xs truncate">
                              {saved.title}
                            </h5>
                          </div>

                          <div className="flex items-center space-x-2 text-[10px] text-stone-400 flex-shrink-0">
                            <span>Cadastrado em {saved.createdAt}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteSavedLink(saved.id)}
                              className="text-stone-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                              title="Remover link salvo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* URL snippet and Details */}
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-800 break-all select-all flex items-center justify-between gap-2">
                          <span className="truncate">{saved.trackingUrl}</span>
                          <span className="text-[10px] text-stone-400 font-sans font-bold flex-shrink-0">
                            {saved.subIdOrTag ? `Tag: ${saved.subIdOrTag}` : ''}
                          </span>
                        </div>

                        {/* Meta Tags (Coupon, Notes, Category) */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          {saved.coupon && (
                            <span className="bg-orange-100 text-orange-950 font-bold px-2 py-0.5 rounded-md border border-orange-200 font-mono text-[10px]">
                              🎟️ Cupom: {saved.coupon}
                            </span>
                          )}

                          {saved.notes && (
                            <span className="text-stone-500 italic text-[10px] flex items-center space-x-1">
                              <Info className="w-3 h-3 text-stone-400" />
                              <span>{saved.notes}</span>
                            </span>
                          )}
                        </div>

                        {/* Actions Bar */}
                        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleCopyLink(saved.trackingUrl, saved.id)}
                              className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 transition-colors cursor-pointer"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700 font-black">Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                                  <span>Copiar Link</span>
                                </>
                              )}
                            </button>

                            <a
                              href={saved.trackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 font-semibold px-2.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                              <span>Testar</span>
                            </a>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectSavedLinkToPublish) {
                                onSelectSavedLinkToPublish(saved);
                              } else {
                                onSelectTemplateToPublish({
                                  title: saved.title,
                                  category: saved.category || 'caixas_equipamentos',
                                  priceBrl: '49.90',
                                  unit: 'por unidade',
                                  description: saved.notes || `Oferta selecionada com comissão e entrega rastreada pela ${saved.platform}.`,
                                  imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80',
                                  affiliatePlatform: saved.platform,
                                  affiliateUrl: saved.trackingUrl,
                                  discountCoupon: saved.coupon,
                                  condition: 'Novo',
                                  deliveryOptions: ['Correios', 'Frete Grátis']
                                });
                              }
                              onClose();
                            }}
                            className="bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs cursor-pointer"
                          >
                            <span>Usar no Formulário de Anúncio</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

          {/* TAB 3: Link Formatter and Validator */}
          {activeTab === 'formatter' && (
            <div className="space-y-5">
              
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 flex items-start space-x-3">
                <Zap className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-indigo-950 text-sm">
                    Formatador & Testador Automático de Parâmetros
                  </h4>
                  <p className="text-stone-600 text-xs mt-0.5">
                    Cole o link copiado do produto da loja. Nossa ferramenta analisa a URL, verifica a sintaxe e anexa o parâmetro de rastreamento (sub_id, aff_sub, tag, ref) correspondente para que suas comissões sejam contabilizadas com segurança.
                  </p>
                </div>
              </div>

              {/* Input Form */}
              <div className="bg-stone-50 p-5 rounded-3xl border border-stone-200 space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-stone-900 mb-1">1. Plataforma do Produto</label>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value as AffiliatePlatform)}
                      className="w-full border border-stone-300 rounded-xl p-2.5 bg-white font-bold text-stone-800 focus:ring-2 focus:ring-amber-500 text-xs"
                    >
                      {PLATFORM_GUIDES.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-stone-900 mb-1">
                      2. Tag de Rastreamento (Sub ID ou Campanha)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: meliapp_mudas ou instagram_stories"
                      value={campaignTag}
                      onChange={(e) => setCampaignTag(e.target.value)}
                      className="w-full border border-stone-300 rounded-xl p-2.5 bg-white text-stone-800 focus:ring-2 focus:ring-amber-500 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    3. Cole o Link Original do Produto ou Link de Afiliado *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      placeholder="https://s.shopee.com.br/xyz ou https://pt.aliexpress.com/item/..."
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="flex-1 border border-stone-300 rounded-xl p-2.5 bg-white text-stone-800 focus:ring-2 focus:ring-amber-500 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleFormatLink}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Processar Link</span>
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                {formatterFeedback && (
                  <div className={`p-3 rounded-xl border flex items-start space-x-2 ${
                    formatterFeedback.valid 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}>
                    {formatterFeedback.valid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium">{formatterFeedback.message}</span>
                  </div>
                )}

                {/* Output Formatted Link */}
                {formattedUrl && (
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-stone-900 text-xs">
                        🔗 Link Final Parametrizado:
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                        Pronto para Salvar & Publicar
                      </span>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-800 break-all select-all">
                      {formattedUrl}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => handleCopyLink(formattedUrl)}
                        className="bg-stone-900 hover:bg-black text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Link Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Link</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveFormattedToCollection}
                        className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Salvar na Minha Coleção</span>
                      </button>

                      <a
                        href={formattedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                        <span>Testar no Navegador</span>
                      </a>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* TAB 4: Ready High-Conversion Templates */}
          {activeTab === 'templates' && (
            <div className="space-y-5">
              
              <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-orange-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-orange-950 text-sm">
                    Modelos de Produtos Prontos para Cadastrar
                  </h4>
                  <p className="text-stone-600 text-xs mt-0.5">
                    Selecione um produto campeão de vendas abaixo com foto e descrição técnica prontas. Ao clicar em <strong>"Usar este Modelo"</strong>, o formulário de anúncio é preenchido na hora e você só precisa colocar o seu próprio link de afiliado!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEMPLATE_PRODUCTS.map((tpl, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="p-3.5 space-y-2.5">
                      
                      <div className="flex items-center space-x-3">
                        <img
                          src={tpl.imageUrl}
                          alt={tpl.title}
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <span className="bg-orange-100 text-orange-950 border border-orange-200 text-[10px] font-black px-2 py-0.5 rounded-md inline-block">
                            {tpl.affiliatePlatform}
                          </span>
                          <h5 className="font-bold text-stone-900 text-xs line-clamp-2 leading-tight">
                            {tpl.title}
                          </h5>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="font-extrabold text-amber-950 font-serif text-sm">
                              R$ {parseFloat(tpl.priceBrl).toFixed(2).replace('.', ',')}
                            </span>
                            {tpl.originalPriceBrl && (
                              <span className="text-stone-400 text-[10px] line-through">
                                R$ {parseFloat(tpl.originalPriceBrl).toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-stone-600 text-[11px] line-clamp-2 leading-relaxed">
                        {tpl.description}
                      </p>

                    </div>

                    <div className="bg-stone-100 p-2.5 border-t border-stone-200 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-stone-500">
                        Cupom: <strong className="text-stone-900">{tpl.discountCoupon}</strong>
                      </span>
                      <button
                        onClick={() => {
                          onSelectTemplateToPublish(tpl);
                          onClose();
                        }}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs cursor-pointer"
                      >
                        <span>Usar este Modelo</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: Profit & Commission Simulator */}
          {activeTab === 'calculator' && (
            <div className="space-y-5">
              
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 flex items-start space-x-3">
                <Calculator className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-indigo-950 text-sm">
                    Simulador de Lucro Mensal com Afiliados
                  </h4>
                  <p className="text-stone-600 text-xs mt-0.5">
                    Estime o potencial de renda passiva anunciando produtos meliponófilos da Shopee, AliExpress, Temu, Raizer e Amazon para outros criadores.
                  </p>
                </div>
              </div>

              {/* Calculator Inputs & Result */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Sliders and Controls */}
                <div className="bg-stone-50 p-4 sm:p-5 rounded-3xl border border-stone-200 space-y-4">
                  <h5 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider">
                    Ajuste os Parâmetros da Simulação:
                  </h5>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Visualizações / Cliques no Mês:</span>
                      <span className="text-emerald-900">{calcMonthlyViews.toLocaleString()} visitas</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="5000"
                      step="50"
                      value={calcMonthlyViews}
                      onChange={(e) => setCalcMonthlyViews(Number(e.target.value))}
                      className="w-full accent-emerald-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Ticket Médio dos Produtos:</span>
                      <span className="text-emerald-900">R$ {calcAvgPrice.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="300"
                      step="5"
                      value={calcAvgPrice}
                      onChange={(e) => setCalcAvgPrice(Number(e.target.value))}
                      className="w-full accent-emerald-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Taxa Média de Comissão:</span>
                      <span className="text-emerald-900">{calcCommissionRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="25"
                      step="1"
                      value={calcCommissionRate}
                      onChange={(e) => setCalcCommissionRate(Number(e.target.value))}
                      className="w-full accent-emerald-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Taxa de Conversão de Compras (%):</span>
                      <span className="text-emerald-900">{calcConversionRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={calcConversionRate}
                      onChange={(e) => setCalcConversionRate(Number(e.target.value))}
                      className="w-full accent-emerald-800"
                    />
                  </div>

                </div>

                {/* Results Card */}
                <div className="bg-gradient-to-br from-emerald-950 to-stone-900 text-white p-5 rounded-3xl border border-amber-400/30 flex flex-col justify-between space-y-4 shadow-lg">
                  
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                      Resultado Estimado Mensal
                    </span>
                    
                    <div>
                      <span className="text-stone-400 text-xs block">Lucro Líquido em Comissões:</span>
                      <div className="text-3xl sm:text-4xl font-black text-amber-300 font-serif">
                        R$ {estimatedProfitBrl.toFixed(2).replace('.', ',')}
                        <span className="text-xs text-stone-300 font-sans font-medium ml-1">/mês</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                      <div className="bg-white/5 p-2.5 rounded-xl">
                        <span className="text-stone-400 text-[10px] block">Vendas Concluídas</span>
                        <span className="font-bold text-white text-base">~{estimatedSales} compras</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-xl">
                        <span className="text-stone-400 text-[10px] block">Volume Movimentado</span>
                        <span className="font-bold text-white text-base">R$ {totalVolumeBrl.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-400/15 p-3 rounded-2xl border border-amber-400/30 text-[11px] text-amber-200 leading-relaxed">
                    💡 <strong>Dica Pro:</strong> Cadastre de 3 a 5 itens com links parametrizados no Marketplace e compartilhe os anúncios nos grupos de meliponicultura no WhatsApp e Telegram para alcançar seus primeiros R$ 500+ em comissões!
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="text-[11px] text-stone-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>MeliApp não cobra taxas sobre suas comissões de afiliado.</span>
          </div>

          <button
            onClick={onClose}
            className="bg-emerald-950 hover:bg-black text-amber-300 font-extrabold px-5 py-2 rounded-2xl text-xs transition-colors shadow-xs cursor-pointer"
          >
            Fechar Central do Afiliado
          </button>
        </div>

      </div>
    </div>
  );
};
