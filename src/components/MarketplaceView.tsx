import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Plus, 
  Search, 
  Filter, 
  ShoppingBag, 
  ShieldCheck, 
  Star, 
  PhoneCall, 
  MapPin, 
  Truck, 
  Tag, 
  BookOpen, 
  Box, 
  Droplets, 
  GitFork, 
  Sparkles, 
  X, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ExternalLink,
  Info,
  Heart,
  MessageCircle,
  Sprout,
  Copy,
  Check,
  Percent,
  BadgePercent,
  Layers,
  Globe,
  HelpCircle,
  TrendingDown,
  Sparkle,
  Link2,
  Calculator,
  Key,
  Trash2,
  Wrench,
  LayoutGrid,
  Pencil,
  RotateCcw
} from 'lucide-react';
import { MarketplaceItem, MarketplaceCategory, AffiliatePlatform, SavedAffiliateLink } from '../types';
import { AffiliateGuideModal } from './AffiliateGuideModal';
import { handleImageError } from '../utils/imageFallback';
import { useAuth } from '../contexts/AuthContext';

interface MarketplaceViewProps {
  items: MarketplaceItem[];
  onAddItem: (newItem: Omit<MarketplaceItem, 'id' | 'createdAt'>) => void;
  onUpdateItem?: (item: MarketplaceItem) => void;
  onDeleteItem?: (id: string) => void;
  onClearItems?: () => void;
  onRestoreDefaultCatalog?: () => void;
  initialSearchQuery?: string;
  initialCategory?: string;
  targetItemId?: string | null;
}

const CATEGORY_LABELS: Record<MarketplaceCategory, { label: string; icon: React.ElementType; color: string }> = {
  plantas_sementes: { label: 'Plantas (Mudas & Sementes)', icon: Sprout, color: 'bg-lime-100 text-lime-900 border-lime-300' },
  caixas_equipamentos: { label: 'Caixas & Equipamentos', icon: Box, color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  insumos_atrativos: { label: 'Insumos & Atrativos', icon: Sparkles, color: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  mel_produtos: { label: 'Mel & Derivados', icon: Droplets, color: 'bg-amber-100 text-amber-900 border-amber-300' },
  enxames_matrizes: { label: 'Enxames & Matrizes', icon: GitFork, color: 'bg-orange-100 text-orange-900 border-orange-300' },
  livros_cursos: { label: 'Livros & Cursos', icon: BookOpen, color: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  servicos: { label: 'Serviços & Consultoria', icon: Store, color: 'bg-stone-100 text-stone-900 border-stone-300' },
};

const PLATFORM_COLORS: Record<AffiliatePlatform, { bg: string; text: string; border: string; label: string }> = {
  Shopee: { bg: 'bg-orange-500 hover:bg-orange-600', text: 'text-white', border: 'border-orange-600', label: 'Shopee' },
  AliExpress: { bg: 'bg-red-600 hover:bg-red-700', text: 'text-white', border: 'border-red-700', label: 'AliExpress' },
  Temu: { bg: 'bg-amber-600 hover:bg-amber-700', text: 'text-white', border: 'border-amber-700', label: 'Temu' },
  'TikTok Shop': { bg: 'bg-stone-900 hover:bg-stone-800', text: 'text-cyan-300', border: 'border-cyan-400', label: 'TikTok Shop' },
  Amazon: { bg: 'bg-slate-800 hover:bg-slate-700', text: 'text-amber-400', border: 'border-amber-500', label: 'Amazon' },
  'Mercado Livre': { bg: 'bg-yellow-400 hover:bg-yellow-500', text: 'text-stone-900', border: 'border-yellow-500', label: 'Mercado Livre' },
  Raizer: { bg: 'bg-emerald-700 hover:bg-emerald-800', text: 'text-amber-300', border: 'border-emerald-600', label: 'Raizer (Plantas p/ Abelhas)' },
  Outro: { bg: 'bg-emerald-800 hover:bg-emerald-900', text: 'text-white', border: 'border-emerald-900', label: 'Loja Parceira' },
};

const PRESET_MARKETPLACE_IMAGES = [
  { label: 'Mudas de Ora-pro-nóbis', url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sementes Meliponófilas', url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80' },
  { label: 'Dombéia em Flor', url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sugador Elétrico USB', url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80' },
  { label: 'Caixa INPA', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80' },
  { label: 'Atrativo PET', url: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mel de Jataí', url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Termômetro LCD Ninho', url: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80' },
];

/** Highlight matching search text in real-time */
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  const trimmed = highlight.trim();
  if (!trimmed) {
    return <>{text}</>;
  }

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="bg-amber-300 text-emerald-950 font-black px-1 py-0.5 rounded-md shadow-2xs"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onClearItems,
  onRestoreDefaultCatalog,
  initialSearchQuery,
  initialCategory,
  targetItemId,
}) => {
  const { isAdmin, currentUser } = useAuth();

  // Modal States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [plantSubFilter, setPlantSubFilter] = useState<'all' | 'sementes' | 'arvores' | 'arbustos' | 'trepadeiras' | 'frutiferas' | 'ervas'>('all');
  const [filterSource, setFilterSource] = useState<'all' | 'local' | 'affiliate'>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MarketplaceItem | null>(null);
  const [isAffiliateGuideOpen, setIsAffiliateGuideOpen] = useState<boolean>(false);
  const [viewingItem, setViewingItem] = useState<MarketplaceItem | null>(null);
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-hide toast notification
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Sync with prop changes when navigating from Flora Catalog
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (targetItemId) {
      const match = items.find(
        (i) => i.id === targetItemId || i.id === `mkt-raizer-${targetItemId}` || (i.id.startsWith('mkt-raizer-') && targetItemId.includes(i.id.replace('mkt-raizer-', '')))
      );
      if (match) {
        setViewingItem(match);
      }
    }
  }, [targetItemId, items]);

  // Global keydown handler for ESC key to close any modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewingItem) setViewingItem(null);
        if (isModalOpen) {
          setIsModalOpen(false);
          setEditingItem(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewingItem, isModalOpen]);

  // Blank Form State - Completely clean for simulation
  const BLANK_FORM = {
    title: '',
    category: 'plantas_sementes' as MarketplaceCategory,
    priceBrl: '',
    originalPriceBrl: '',
    unit: '',
    sellerName: '',
    sellerCityState: '',
    sellerPhoneWhatsapp: '',
    sellerEmail: '',
    description: '',
    imageUrl: '',
    condition: 'Novo' as MarketplaceItem['condition'],
    deliveryOptions: [] as MarketplaceItem['deliveryOptions'],
    affiliatePlatform: 'Shopee' as AffiliatePlatform,
    affiliateUrl: '',
    discountCoupon: '',
  };

  const [isAffiliatePost, setIsAffiliatePost] = useState<boolean>(true);
  const [formData, setFormData] = useState(BLANK_FORM);

  const handleOpenBlankAddModal = (affiliate = true) => {
    setEditingItem(null);
    setIsAffiliatePost(affiliate);
    setFormData({ ...BLANK_FORM });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MarketplaceItem) => {
    setEditingItem(item);
    setIsAffiliatePost(Boolean(item.isAffiliate));
    setFormData({
      title: item.title || '',
      category: item.category,
      priceBrl: item.priceBrl ? item.priceBrl.toString() : '',
      originalPriceBrl: item.originalPriceBrl ? item.originalPriceBrl.toString() : '',
      unit: item.unit || '',
      sellerName: item.sellerName || '',
      sellerCityState: item.sellerCityState || '',
      sellerPhoneWhatsapp: item.sellerPhoneWhatsapp || '',
      sellerEmail: item.sellerEmail || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      condition: item.condition || 'Novo',
      deliveryOptions: item.deliveryOptions || [],
      affiliatePlatform: item.affiliatePlatform || 'Shopee',
      affiliateUrl: item.affiliateUrl || '',
      discountCoupon: item.discountCoupon || '',
    });
    setIsModalOpen(true);
  };

  const handleClearForm = () => {
    setFormData({ ...BLANK_FORM });
  };

  const handleSelectTemplateToPublish = (templateData: {
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
  }) => {
    setIsAffiliatePost(true);
    setFormData({
      title: templateData.title,
      category: templateData.category,
      priceBrl: templateData.priceBrl,
      originalPriceBrl: templateData.originalPriceBrl || '',
      unit: templateData.unit,
      sellerName: `${templateData.affiliatePlatform} Oficial / MeliApp Curadoria`,
      sellerCityState: 'Envio Nacional / Internacional',
      sellerPhoneWhatsapp: '',
      sellerEmail: '',
      description: templateData.description,
      imageUrl: templateData.imageUrl,
      condition: templateData.condition,
      deliveryOptions: templateData.deliveryOptions,
      affiliatePlatform: templateData.affiliatePlatform,
      affiliateUrl: templateData.affiliateUrl,
      discountCoupon: templateData.discountCoupon || '',
    });
    setIsModalOpen(true);
  };

  const handleSelectSavedLinkToPublish = (savedLink: SavedAffiliateLink) => {
    setIsAffiliatePost(true);
    setFormData({
      title: savedLink.title,
      category: savedLink.category || 'caixas_equipamentos',
      priceBrl: '49.90',
      originalPriceBrl: '',
      unit: 'por unidade',
      sellerName: `${savedLink.platform} Oficial / MeliApp Curadoria`,
      sellerCityState: 'Envio Nacional / Internacional',
      sellerPhoneWhatsapp: '',
      sellerEmail: '',
      description: savedLink.notes || `Oferta com comissão e entrega rastreada pela ${savedLink.platform}.`,
      imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80',
      condition: 'Novo',
      deliveryOptions: ['Correios', 'Frete Grátis'],
      affiliatePlatform: savedLink.platform,
      affiliateUrl: savedLink.trackingUrl,
      discountCoupon: savedLink.coupon || '',
    });
    setIsModalOpen(true);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, itemId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCouponId(itemId);
    setTimeout(() => setCopiedCouponId(null), 2500);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeliveryOptionToggle = (option: MarketplaceItem['deliveryOptions'][number]) => {
    setFormData((prev) => {
      const exists = prev.deliveryOptions.includes(option);
      return {
        ...prev,
        deliveryOptions: exists
          ? prev.deliveryOptions.filter((o) => o !== option)
          : [...prev.deliveryOptions, option],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.priceBrl) {
      alert('Por favor, preencha os campos obrigatórios (Título e Preço).');
      return;
    }

    if (!isAffiliatePost && (!formData.sellerName || !formData.sellerPhoneWhatsapp)) {
      alert('Para vendas diretas locais, preencha o Nome do Vendedor e o WhatsApp para contato.');
      return;
    }

    if (isAffiliatePost && !formData.affiliateUrl) {
      alert('Para produtos afiliados, informe o link de afiliado da loja parceira (Shopee, AliExpress, Temu, etc.).');
      return;
    }

    const price = parseFloat(formData.priceBrl) || 0;
    const originalPrice = formData.originalPriceBrl ? parseFloat(formData.originalPriceBrl) : undefined;

    const payload: Omit<MarketplaceItem, 'id' | 'createdAt'> = {
      title: formData.title.trim(),
      category: formData.category,
      priceBrl: price,
      ...(originalPrice ? { originalPriceBrl: originalPrice } : {}),
      unit: formData.unit?.trim() || 'por unidade',
      sellerName: isAffiliatePost ? (formData.sellerName?.trim() || `${formData.affiliatePlatform} Oficial`) : (formData.sellerName?.trim() || 'Meliponicultor'),
      sellerCityState: isAffiliatePost ? (formData.sellerCityState?.trim() || 'Envio Nacional') : (formData.sellerCityState?.trim() || 'Brasil'),
      ...(!isAffiliatePost && formData.sellerPhoneWhatsapp ? { sellerPhoneWhatsapp: formData.sellerPhoneWhatsapp.trim() } : {}),
      ...(formData.sellerEmail ? { sellerEmail: formData.sellerEmail.trim() } : {}),
      verifiedSeller: true,
      rating: editingItem?.rating || 5.0,
      reviewCount: editingItem?.reviewCount || (isAffiliatePost ? Math.floor(Math.random() * 50 + 10) : 1),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl?.trim() || 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
      deliveryOptions: formData.deliveryOptions.length > 0 ? formData.deliveryOptions : ['Correios'],
      condition: formData.condition,
      featured: editingItem ? editingItem.featured : true,
      isAffiliate: isAffiliatePost,
      ...(isAffiliatePost && formData.affiliatePlatform ? { affiliatePlatform: formData.affiliatePlatform } : {}),
      ...(isAffiliatePost && formData.affiliateUrl ? { affiliateUrl: formData.affiliateUrl.trim() } : {}),
      ...(formData.discountCoupon ? { discountCoupon: formData.discountCoupon.trim().toUpperCase() } : {}),
    };

    if (editingItem && onUpdateItem) {
      onUpdateItem({
        ...editingItem,
        ...payload,
      });
      setToastMessage(`Produto "${payload.title}" atualizado com sucesso na Vitrine!`);
    } else {
      onAddItem(payload);
      setToastMessage(`Produto "${payload.title}" gravado e publicado na Vitrine!`);
      if (searchQuery) setSearchQuery('');
      if (payload.isAffiliate && filterSource === 'local') setFilterSource('all');
      if (!payload.isAffiliate && filterSource === 'affiliate') setFilterSource('all');
      setSelectedCategory('all');
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ ...BLANK_FORM });
  };

  // Category counts
  const countAll = items.length;
  const countUtensilios = items.filter(
    (i) => i.category === 'caixas_equipamentos' || i.category === 'insumos_atrativos'
  ).length;
  const countPlantas = items.filter((i) => i.category === 'plantas_sementes').length;
  const countLivros = items.filter((i) => i.category === 'livros_cursos').length;
  const countAfiliados = items.filter((i) => !!i.isAffiliate).length;
  const countMel = items.filter((i) => i.category === 'mel_produtos').length;
  const countEnxames = items.filter((i) => i.category === 'enxames_matrizes').length;
  const countServicos = items.filter((i) => i.category === 'servicos').length;

  const PRIMARY_FILTER_TABS: Array<{
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    count: number;
  }> = [
    {
      id: 'all',
      label: 'Todos',
      description: 'Catálogo completo',
      icon: LayoutGrid,
      count: countAll,
    },
    {
      id: 'plantas',
      label: 'Plantas & Sementes',
      description: 'Mudas e sementes Viveiro Raízer',
      icon: Sprout,
      count: countPlantas,
    },
    {
      id: 'utensilios',
      label: 'Caixas & Utensílios',
      description: 'Caixas INPA, extratores e insumos',
      icon: Wrench,
      count: countUtensilios,
    },
    {
      id: 'livros',
      label: 'Livros & Guias',
      description: 'Manuais práticos & guias ASF',
      icon: BookOpen,
      count: countLivros,
    },
    {
      id: 'afiliados',
      label: 'Ofertas & Afiliados',
      description: 'Parceiros com cupom de desconto',
      icon: ShoppingBag,
      count: countAfiliados,
    },
  ];

  const filteredItems = items.filter((item) => {
    let matchesCategory = true;
    if (selectedCategory === 'all') {
      matchesCategory = true;
    } else if (selectedCategory === 'utensilios') {
      matchesCategory = item.category === 'caixas_equipamentos' || item.category === 'insumos_atrativos';
    } else if (selectedCategory === 'plantas') {
      matchesCategory = item.category === 'plantas_sementes';
    } else if (selectedCategory === 'livros') {
      matchesCategory = item.category === 'livros_cursos';
    } else if (selectedCategory === 'afiliados') {
      matchesCategory = !!item.isAffiliate;
    } else {
      matchesCategory = item.category === selectedCategory;
    }
    
    let matchesSource = true;
    if (filterSource === 'local') matchesSource = !item.isAffiliate;
    if (filterSource === 'affiliate') matchesSource = !!item.isAffiliate;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.sellerName.toLowerCase().includes(q) ||
      item.sellerCityState.toLowerCase().includes(q) ||
      (item.discountCoupon && item.discountCoupon.toLowerCase().includes(q)) ||
      (item.affiliatePlatform && item.affiliatePlatform.toLowerCase().includes(q))
    );

    let matchesPlantSub = true;
    if (selectedCategory === 'plantas' && plantSubFilter !== 'all') {
      const lowerT = item.title.toLowerCase();
      const lowerD = item.description.toLowerCase();
      if (plantSubFilter === 'sementes') {
        matchesPlantSub = lowerT.includes('semente') || lowerD.includes('semente') || item.condition === 'Sementes Selecionadas';
      } else if (plantSubFilter === 'arvores') {
        matchesPlantSub = lowerD.includes('árvore') || lowerD.includes('arvoreta') || lowerT.includes('árvore') || lowerT.includes('eucalipto');
      } else if (plantSubFilter === 'arbustos') {
        matchesPlantSub = lowerD.includes('arbusto') || lowerT.includes('vassoura') || lowerT.includes('guamirim') || lowerD.includes('arbusto');
      } else if (plantSubFilter === 'trepadeiras') {
        matchesPlantSub = lowerD.includes('trepadeira') || lowerT.includes('trepadeira') || lowerT.includes('amor-agarradinho') || lowerT.includes('cipó') || lowerT.includes('guaco');
      } else if (plantSubFilter === 'frutiferas') {
        matchesPlantSub = lowerD.includes('frutífera') || lowerT.includes('cereja') || lowerT.includes('pitanga') || lowerT.includes('grumixama') || lowerT.includes('camboim') || lowerT.includes('calabura') || lowerT.includes('amora') || lowerT.includes('goiaba');
      } else if (plantSubFilter === 'ervas') {
        matchesPlantSub = lowerD.includes('erva') || lowerD.includes('horta') || lowerD.includes('medicinal') || lowerT.includes('cebolinha') || lowerT.includes('manjericão') || lowerT.includes('alecrim') || lowerT.includes('hortelã');
      }
    }

    return matchesCategory && matchesSource && matchesSearch && matchesPlantSub;
  });

  const getWhatsappUrl = (phone?: string, itemTitle?: string) => {
    if (!phone) return '#';
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Olá! Vi o seu produto "${itemTitle}" na Vitrine Oficial MeliApp e gostaria de obter mais informações!`
    );
    return `https://wa.me/55${cleanPhone}?text=${message}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-900 text-amber-200 px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center space-x-3 animate-in slide-in-from-top-4 duration-200">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center flex-shrink-0 font-black">
            <Check className="w-5 h-5 text-emerald-950 stroke-[3]" />
          </div>
          <div className="pr-2">
            <h4 className="font-extrabold text-sm text-white">Sucesso!</h4>
            <p className="text-xs text-amber-200 font-medium">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-emerald-800 text-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Admin Control Bar (When in Admin Mode) */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 text-amber-200 p-4 sm:p-5 rounded-3xl border-2 border-amber-500 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black flex-shrink-0 shadow-md">
              <Key className="w-6 h-6 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Painel do Administrador
                </span>
                <span className="text-xs text-amber-300 font-bold">Gestão Exclusiva do Catálogo & Afiliados</span>
              </div>
              <p className="text-xs text-stone-300 font-medium mt-0.5">
                Você está autenticado como administrador ({currentUser?.email}). Gerencie os produtos da vitrine oficial.
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
            <button
              onClick={() => handleOpenBlankAddModal(true)}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Adicionar Produto / Link</span>
            </button>

            {onRestoreDefaultCatalog && (
              <button
                onClick={() => {
                  onRestoreDefaultCatalog();
                  setToastMessage('Catálogo Oficial da Raízer e parceiros restaurado com sucesso!');
                }}
                className="bg-emerald-900 hover:bg-emerald-800 text-emerald-100 border border-emerald-500/70 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
                title="Recarregar e sincronizar catálogo completo da Raízer"
              >
                <RotateCcw className="w-4 h-4 text-amber-300" />
                <span>Restaurar Catálogo Raízer</span>
              </button>
            )}

            {onClearItems && items.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Deseja realmente limpar todos os itens do marketplace?')) {
                    onClearItems();
                  }
                }}
                className="bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-600/70 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                title="Limpar todos os produtos"
              >
                <Trash2 className="w-4 h-4 text-rose-300" />
                <span>Limpar Catálogo</span>
              </button>
            )}

            <button
              onClick={() => setIsAffiliateGuideOpen(true)}
              className="bg-amber-800/80 hover:bg-amber-800 text-amber-100 border border-amber-500/50 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <BadgePercent className="w-4 h-4 text-amber-300" />
              <span>Guia de Afiliados & Links</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Store Banner Hero (Curated Store View for Customers) */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Vitrine & Loja Oficial MeliApp</span>
            </div>

            <div className="inline-flex items-center space-x-1.5 bg-lime-400/20 text-lime-300 px-3 py-1 rounded-full text-xs font-bold border border-lime-400/30">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>Curadoria Técnica & Cupons Exclusivos</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-100 tracking-tight">
            Equipamentos, Mudas, Insumos & Ofertas Selecionadas
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Produtos, ferramentas, pasto meliponófilo e insumos rigorosamente testados e recomendados para o manejo ideal das suas Abelhas Sem Ferrão. Aproveite cupons de desconto exclusivos da <strong>Shopee, AliExpress, Temu, TikTok Shop, Mercado Livre e Amazon</strong>!
          </p>

          {/* Customer Trust Badges */}
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-amber-200">
            <span className="bg-white/10 px-3 py-1 rounded-xl border border-white/10 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Itens Testados em Campo</span>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-xl border border-white/10 flex items-center space-x-1.5">
              <BadgePercent className="w-3.5 h-3.5 text-amber-300" />
              <span>Cupons com até 50% de Desconto</span>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-xl border border-white/10 flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-lime-300" />
              <span>Envio com Rastreamento Seguro</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Source Tabs (All / Local / Affiliate Deals) & Action Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-bold">
          <button
            onClick={() => setFilterSource('all')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filterSource === 'all'
                ? 'bg-white text-emerald-950 shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todos os Produtos ({items.length})
          </button>
          <button
            onClick={() => setFilterSource('affiliate')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
              filterSource === 'affiliate'
                ? 'bg-white text-emerald-950 shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BadgePercent className="w-3.5 h-3.5 text-orange-600" />
            <span>Ofertas & E-commerce Parceiro ({items.filter((i) => i.isAffiliate).length})</span>
          </button>
          <button
            onClick={() => setFilterSource('local')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
              filterSource === 'local'
                ? 'bg-white text-emerald-950 shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-amber-600" />
            <span>Produtores & Caixas ({items.filter((i) => !i.isAffiliate).length})</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {onRestoreDefaultCatalog && (
            <button
              onClick={() => {
                onRestoreDefaultCatalog();
                setToastMessage('Catálogo Oficial da Raízer e parceiros sincronizado com sucesso!');
              }}
              className="bg-emerald-800 hover:bg-emerald-700 text-amber-200 border border-emerald-600/60 font-bold px-3.5 py-2.5 rounded-2xl text-xs flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
              title="Restaurar mudas e sementes do viveiro Raízer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Sincronizar Catálogo Raízer</span>
            </button>
          )}

          <button
            onClick={() => handleOpenBlankAddModal(isAdmin)}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Cadastrar Novo Produto</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        
        {/* Real-time Search Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="marketplace-search" className="text-xs font-bold text-stone-800 flex items-center space-x-1.5">
              <Search className="w-3.5 h-3.5 text-amber-600" />
              <span>Buscar Produtos & Ofertas em Tempo Real</span>
            </label>
            {searchQuery && (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 animate-fadeIn">
                {filteredItems.length} {filteredItems.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </span>
            )}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="marketplace-search"
              type="text"
              placeholder="Digite o nome do produto (ex: Sugador USB, Ora-pro-nóbis, Caixa INPA, Dombéia, Shopee, Mel...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-2xs placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            <span className="text-stone-400 font-medium whitespace-nowrap text-[10px]">Buscas rápidas:</span>
            {['Raizer', 'Ora-pro-nóbis', 'Sugador USB', 'Caixa INPA', 'Dombéia', 'Mel de Jataí', 'Atrativo', 'Shopee', 'AliExpress'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-amber-400 text-emerald-950 font-black shadow-2xs'
                    : 'bg-stone-100 hover:bg-amber-50 text-stone-600 hover:text-stone-900 border border-stone-200/80'
                }`}
              >
                {tag}
              </button>
            ))}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-rose-600 hover:text-rose-800 underline font-bold whitespace-nowrap ml-1 cursor-pointer"
              >
                Limpar busca
              </button>
            )}
          </div>
        </div>

        {/* Primary Category Filtering System (Utensílios, Plantas, Livros, Afiliados, Todos) */}
        <div className="space-y-3 pt-1 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-800">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <span>Filtrar por Categoria:</span>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-[11px] text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
              >
                Limpar categoria (Ver todos)
              </button>
            )}
          </div>

          {/* Primary Cards / Tabs for core requested categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PRIMARY_FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-950 to-stone-900 text-white border-amber-400 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-stone-50 hover:bg-stone-100/90 text-stone-800 border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-400 text-emerald-950 font-black'
                          : 'bg-stone-200/80 group-hover:bg-amber-100 text-stone-700 group-hover:text-amber-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </div>

                  <div>
                    <span className={`text-xs font-black block tracking-tight ${isSelected ? 'text-amber-300' : 'text-stone-900'}`}>
                      {tab.label}
                    </span>
                    <span className={`text-[10px] leading-tight line-clamp-1 mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {tab.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Secondary Subcategories Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none text-[11px]">
            <span className="text-stone-400 font-medium whitespace-nowrap text-[10px] mr-1">Outras categorias:</span>
            
            <button
              type="button"
              onClick={() => setSelectedCategory('mel_produtos')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all cursor-pointer ${
                selectedCategory === 'mel_produtos'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Mel & Derivados</span>
              <span className="bg-stone-200 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {countMel}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('enxames_matrizes')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all cursor-pointer ${
                selectedCategory === 'enxames_matrizes'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Enxames & Matrizes</span>
              <span className="bg-stone-200 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {countEnxames}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('servicos')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all cursor-pointer ${
                selectedCategory === 'servicos'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Serviços & Resgates</span>
              <span className="bg-stone-200 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {countServicos}
              </span>
            </button>
          </div>

          {/* Active Filter Indicator Badge */}
          {selectedCategory !== 'all' && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center space-x-2">
                <span className="font-bold">Categoria ativa:</span>
                <span className="bg-amber-200/80 text-emerald-950 font-black px-2 py-0.5 rounded-lg text-[11px] uppercase">
                  {selectedCategory === 'utensilios' && '🛠️ Utensílios & Equipamentos'}
                  {selectedCategory === 'plantas' && '🌱 Plantas & Sementes (Raizer)'}
                  {selectedCategory === 'livros' && '📚 Livros & Guias Práticos'}
                  {selectedCategory === 'afiliados' && '🏷️ Afiliados & E-commerce Parceiro'}
                  {selectedCategory === 'mel_produtos' && '🍯 Mel & Derivados'}
                  {selectedCategory === 'enxames_matrizes' && '🐝 Enxames & Matrizes'}
                  {selectedCategory === 'servicos' && '🤝 Serviços & Consultoria'}
                </span>
                <span className="text-stone-500 text-[11px]">({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'})</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-amber-800 hover:text-amber-950 font-bold hover:underline text-[11px] flex items-center space-x-1 cursor-pointer"
              >
                <span>Mostrar todos</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Raizer Flora Special Sub-filter for Plants & Seeds */}
          {selectedCategory === 'plantas' && (
            <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 rounded-2xl p-4 text-white border border-emerald-800/40 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black flex-shrink-0">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5 flex-wrap">
                      <span>Catálogo Oficial Raízer • Pasto Meliponófilo</span>
                      <span className="bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.2 rounded-full border border-amber-400/40 font-mono">
                        {countPlantas} Espécies
                      </span>
                    </h4>
                    <p className="text-[11px] text-stone-300">
                      Mudas com procedência botânica e sementes selecionadas pelo Viveiro Raízer para pasto de abelhas sem ferrão.
                    </p>
                  </div>
                </div>

                <a
                  href="https://raizer.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-black px-3.5 py-1.5 rounded-xl transition-all shadow-xs self-start sm:self-auto cursor-pointer"
                >
                  <span>Visitar Loja Raízer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Sub-filter chips for Raizer items */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none text-[11px]">
                <span className="text-amber-200/70 font-semibold text-[10px] whitespace-nowrap">Filtrar por:</span>
                {[
                  { id: 'all', label: 'Todas as Espécies' },
                  { id: 'sementes', label: '🌱 Sementes' },
                  { id: 'arvores', label: '🌳 Árvores Nativas' },
                  { id: 'arbustos', label: '🌿 Arbustos & Flores' },
                  { id: 'trepadeiras', label: '🌸 Trepadeiras' },
                  { id: 'frutiferas', label: '🍒 Frutíferas' },
                  { id: 'ervas', label: '🪴 Ervas & Medicinais' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setPlantSubFilter(chip.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      plantSubFilter === chip.id
                        ? 'bg-amber-400 text-emerald-950 font-black shadow-xs'
                        : 'bg-white/10 text-stone-200 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Marketplace Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200 shadow-xs space-y-5 max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center mx-auto shadow-xs">
            <Store className="w-8 h-8 text-amber-700" />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl font-serif">
              {items.length === 0 ? 'Vitrine Pronta para Produtos Reais' : 'Nenhum produto encontrado'}
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              {items.length === 0
                ? 'Os produtos de teste foram removidos. O marketplace está 100% pronto para você cadastrar seus produtos reais: links de afiliados com comissão (Shopee, AliExpress, Amazon, Mercado Livre, Raizer) e produtos ou serviços de produtores locais.'
                : 'Não encontramos resultados para a sua busca ou filtro selecionado. Tente alterar os termos pesquisados.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
            {isAdmin ? (
              <>
                <button
                  type="button"
                  onClick={() => handleOpenBlankAddModal(true)}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-5 py-3 rounded-xl cursor-pointer shadow-md inline-flex items-center justify-center space-x-1.5 transition-all"
                >
                  <BadgePercent className="w-4 h-4 text-emerald-950" />
                  <span>+ Produto de Afiliado (E-commerce)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenBlankAddModal(false)}
                  className="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer shadow-md inline-flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Store className="w-4 h-4 text-amber-300" />
                  <span>+ Produto de Produtor Local</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setFilterSource('all');
                }}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Ver Todos os Produtos
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => {
            const categoryInfo = CATEGORY_LABELS[item.category];
            const CatIcon = categoryInfo.icon;
            const isFav = favorites.includes(item.id);
            const isAffiliate = !!item.isAffiliate;
            const platformConfig = item.affiliatePlatform ? PLATFORM_COLORS[item.affiliatePlatform] : null;
            
            // Calculate Discount Percentage
            let discountPercent = 0;
            if (item.originalPriceBrl && item.originalPriceBrl > item.priceBrl) {
              discountPercent = Math.round(((item.originalPriceBrl - item.priceBrl) / item.originalPriceBrl) * 100);
            }

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                {/* Admin Action Buttons (Edit & Delete) */}
                {isAdmin && (
                  <div className="absolute top-3 right-12 z-20 flex items-center space-x-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(item);
                      }}
                      className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center hover:bg-amber-300 shadow-md transition-all cursor-pointer font-bold"
                      title="Editar produto / link de afiliado (Admin)"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {onDeleteItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Deseja remover "${item.title}" do catálogo?`)) {
                            onDeleteItem(item.id);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 shadow-md transition-all cursor-pointer"
                        title="Excluir produto da vitrine (Admin)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Product Image & Badges */}
                <div className="relative h-48 bg-stone-100 overflow-hidden border-b border-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  
                  {/* Category Badge (Top Left) */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow-xs flex items-center space-x-1 backdrop-blur-xs border ${categoryInfo.color}`}>
                      <CatIcon className="w-3 h-3" />
                      <span>{categoryInfo.label}</span>
                    </span>

                    {/* Affiliate Platform Badge */}
                    {isAffiliate && platformConfig && (
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg shadow-sm flex items-center space-x-1 border ${platformConfig.bg} ${platformConfig.text} ${platformConfig.border}`}>
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>{platformConfig.label}</span>
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button (Top Right) */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-600 hover:text-rose-600 shadow-xs transition-colors cursor-pointer"
                    title={isFav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Condition & Discount Badge (Bottom Left Overlay) */}
                  <div className="absolute bottom-2 left-3 flex items-center space-x-1.5 z-10">
                    <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs border border-amber-400/30">
                      {item.condition}
                    </span>

                    {discountPercent > 0 && (
                      <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center space-x-0.5 animate-pulse">
                        <TrendingDown className="w-2.5 h-2.5" />
                        <span>-{discountPercent}% OFF</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    
                    {/* Price Header */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        {item.originalPriceBrl && (
                          <span className="text-stone-400 text-[10px] line-through block">
                            De R$ {item.originalPriceBrl.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                        <div className="flex items-baseline space-x-1">
                          <span className="text-xl font-black text-amber-950 font-serif">
                            R$ {item.priceBrl.toFixed(2).replace('.', ',')}
                          </span>
                          {item.unit && (
                            <span className="text-[10px] text-stone-500 font-medium">/{item.unit}</span>
                          )}
                        </div>
                      </div>

                      {/* Verified Seller / Rating */}
                      {item.rating && (
                        <div className="flex items-center space-x-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/80 text-[11px] font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{item.rating.toFixed(1)}</span>
                          <span className="text-stone-400 text-[9px]">({item.reviewCount})</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-2 hover:text-emerald-800 transition-colors">
                      <HighlightText text={item.title} highlight={searchQuery} />
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-stone-500 line-clamp-2 leading-snug">
                      {item.description}
                    </p>

                    {/* Coupon Box if available */}
                    {item.discountCoupon && (
                      <div className="bg-amber-50/80 border border-dashed border-amber-300 p-2 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1 text-amber-900 font-bold text-[11px]">
                          <BadgePercent className="w-3.5 h-3.5 text-amber-600" />
                          <span>Cupom: <strong>{item.discountCoupon}</strong></span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.discountCoupon!, item.id)}
                          className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-2 py-0.5 rounded-md font-bold text-[10px] flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          {copiedCouponId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-900" />
                              <span>Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Seller & Location Info */}
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-[11px] space-y-1">
                      <div className="flex items-center justify-between font-medium text-stone-800">
                        <span className="flex items-center space-x-1 truncate">
                          {isAffiliate ? (
                            <Globe className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                          ) : (
                            <Store className="w-3 h-3 text-amber-600 flex-shrink-0" />
                          )}
                          <span className="truncate font-semibold">{item.sellerName}</span>
                        </span>
                        {item.verifiedSeller && (
                          <span title="Verificado MeliApp">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-stone-500 text-[10px]">
                        <MapPin className="w-3 h-3 text-stone-400 mr-1 flex-shrink-0" />
                        <span className="truncate">{item.sellerCityState}</span>
                      </div>
                    </div>

                    {/* Delivery Options Pills */}
                    <div className="flex flex-wrap gap-1">
                      {item.deliveryOptions.map((opt, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-100 text-stone-600 text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1"
                        >
                          <Truck className="w-2.5 h-2.5 text-emerald-700" />
                          <span>{opt}</span>
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-stone-100 flex items-center space-x-2">
                    <button
                      onClick={() => setViewingItem(item)}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors text-center cursor-pointer"
                    >
                      Detalhes
                    </button>

                    {isAffiliate && item.affiliateUrl ? (
                      <a
                        href={item.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 ${platformConfig ? platformConfig.bg : 'bg-emerald-700 hover:bg-emerald-800'} text-white font-extrabold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-xs text-center`}
                      >
                        <span>Comprar na {item.affiliatePlatform || 'Loja'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : item.sellerPhoneWhatsapp ? (
                      <a
                        href={getWhatsappUrl(item.sellerPhoneWhatsapp, item.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
                        <span>Falar no WhatsApp</span>
                      </a>
                    ) : null}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Customer Trust Footer Note */}
      <div className="bg-stone-100/80 rounded-3xl p-5 border border-stone-200 text-center space-y-2 max-w-2xl mx-auto mt-8">
        <div className="inline-flex items-center space-x-2 text-stone-700 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Transparência & Apoio à Comunidade MeliApp</span>
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed">
          Comprando através dos links e cupons desta vitrine oficial, você garante descontos exclusivos e apoia diretamente a manutenção dos servidores, inteligência artificial e novas ferramentas para os meliponicultores.
        </p>
        {isAdmin && (
          <div className="pt-1">
            <span className="text-[11px] text-amber-800 font-bold flex items-center justify-center space-x-1">
              <Key className="w-3 h-3 text-amber-600" />
              <span>Conectado como Administrador ({currentUser?.email})</span>
            </span>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {viewingItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
          onClick={() => setViewingItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Pinned Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 p-4 sm:p-5 bg-stone-50/90 flex-shrink-0">
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                <span className={`p-2 rounded-xl border flex-shrink-0 ${CATEGORY_LABELS[viewingItem.category]?.color || 'bg-emerald-100 text-emerald-900 border-emerald-300'}`}>
                  <ShoppingBag className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold text-stone-400">Curadoria MeliApp</span>
                    {viewingItem.isAffiliate && (
                      <span className="bg-orange-100 text-orange-900 border border-orange-300 text-[10px] font-bold px-2 py-0.2 rounded-md">
                        {viewingItem.affiliatePlatform} Oficial
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-base sm:text-lg font-serif leading-tight truncate">
                    {viewingItem.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/80 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">

              {/* Modal Image */}
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100">
                <img
                  src={viewingItem.imageUrl}
                  alt={viewingItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
                <div className="absolute bottom-3 left-3 bg-emerald-950/90 text-amber-300 font-extrabold text-xs px-3 py-1 rounded-xl backdrop-blur-xs border border-amber-400/30">
                  {viewingItem.condition}
                </div>
              </div>

              {/* Price & Seller Info */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 flex items-center justify-between">
                <div>
                  {viewingItem.originalPriceBrl && (
                    <span className="text-stone-400 text-xs line-through block">
                      De R$ {viewingItem.originalPriceBrl.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-2xl font-black text-amber-950 font-serif">
                    R$ {viewingItem.priceBrl.toFixed(2).replace('.', ',')}
                  </span>
                  {viewingItem.unit && <span className="text-xs text-stone-600 font-medium ml-1">/{viewingItem.unit}</span>}
                </div>

                <div className="text-right space-y-1">
                  <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2.5 py-1 rounded-lg inline-flex items-center space-x-1 border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{viewingItem.sellerName}</span>
                  </span>
                  <span className="text-[11px] text-stone-500 block">📍 {viewingItem.sellerCityState}</span>
                </div>
              </div>

              {/* Coupon Code in Modal if present */}
              {viewingItem.discountCoupon && (
                <div className="bg-amber-100/70 border-2 border-dashed border-amber-400 p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-900 uppercase">Cupom de Desconto Exclusivo</span>
                    <div className="text-base font-black text-emerald-950 font-mono">
                      {viewingItem.discountCoupon}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(viewingItem.discountCoupon!, viewingItem.id)}
                    className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    {copiedCouponId === viewingItem.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-900" />
                        <span>Cupom Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Cupom</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1">
                <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider">Descrição Detalhada:</h4>
                <p className="text-stone-700 text-xs leading-relaxed bg-stone-50 p-3.5 rounded-2xl border border-stone-200 whitespace-pre-line">
                  {viewingItem.description}
                </p>
              </div>

              {/* Delivery & Options */}
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider">Formas de Envio / Disponibilidade:</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingItem.deliveryOptions.map((opt, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold px-3 py-1 rounded-xl text-xs flex items-center space-x-1"
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{opt}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Pinned Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/90 flex items-center justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="bg-stone-200/80 hover:bg-stone-300 text-stone-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Voltar à Vitrine
              </button>

              {viewingItem.isAffiliate && viewingItem.affiliateUrl ? (
                <a
                  href={viewingItem.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-md text-center"
                >
                  <span>Comprar com Desconto na {viewingItem.affiliatePlatform || 'Loja Parceira'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : viewingItem.sellerPhoneWhatsapp ? (
                <a
                  href={getWhatsappUrl(viewingItem.sellerPhoneWhatsapp, viewingItem.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-md text-center"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  <span>Entrar em Contato via WhatsApp</span>
                </a>
              ) : null}
            </div>

          </div>
        </div>
      )}

      {/* Affiliate Guide Modal & Helper Tool */}
      <AffiliateGuideModal
        isOpen={isAffiliateGuideOpen}
        onClose={() => setIsAffiliateGuideOpen(false)}
        onSelectTemplateToPublish={handleSelectTemplateToPublish}
        onSelectSavedLinkToPublish={handleSelectSavedLinkToPublish}
      />

      {/* Modal New Announcement / Post Item (For Admin Only) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
          onClick={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-stone-100 p-4 sm:p-5 bg-stone-50/90 flex-shrink-0">
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                <span className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex-shrink-0">
                  {editingItem ? <Pencil className="w-5 h-5 text-amber-700" /> : <Plus className="w-5 h-5" />}
                </span>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-stone-900 text-base font-serif truncate">
                    {editingItem ? 'Editar Produto na Vitrine' : 'Cadastrar Produto na Vitrine Oficial'}
                  </h3>
                  <p className="text-xs text-stone-500 truncate">
                    {editingItem
                      ? 'Atualize informações, preços, cupons de desconto ou links'
                      : 'Adicione novos produtos ou links de afiliado com sua tag de comissão'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/80 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
              
              {/* Type Selector (Affiliate vs Direct) */}
              <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-2xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAffiliatePost(true)}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    isAffiliatePost
                      ? 'bg-amber-400 text-emerald-950 shadow-xs border border-amber-500'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <BadgePercent className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Link de Afiliado (E-commerce)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAffiliatePost(false)}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    !isAffiliatePost
                      ? 'bg-emerald-900 text-amber-300 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-amber-300" />
                  <span>Venda Direta / Própria</span>
                </button>
              </div>

              {/* If Affiliate Post */}
              {isAffiliatePost && (
                <div className="bg-orange-50/80 p-3.5 rounded-2xl border border-orange-200 space-y-2.5">
                  <label className="block font-bold text-orange-950">Selecione a Plataforma Parceira:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(['Shopee', 'AliExpress', 'Temu', 'TikTok Shop', 'Amazon', 'Mercado Livre', 'Raizer'] as AffiliatePlatform[]).map((plat) => (
                      <button
                        type="button"
                        key={plat}
                        onClick={() => setFormData({ ...formData, affiliatePlatform: plat })}
                        className={`p-2 rounded-xl font-bold text-[11px] border transition-all text-center cursor-pointer ${
                          formData.affiliatePlatform === plat
                            ? `${PLATFORM_COLORS[plat].bg} text-white border-black shadow-xs font-black`
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-orange-100'
                        }`}
                      >
                        {plat === 'Raizer' ? '🌱 Raizer (Plantas)' : plat}
                      </button>
                    ))}
                  </div>

                  {/* Help Assistant Banner Inside Form */}
                  <div className="bg-amber-100/90 p-2.5 rounded-xl border border-amber-300/80 flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-1.5 text-[11px] text-amber-950 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                      <span>Ajuda para pegar seu link na {formData.affiliatePlatform} ou ver modelos prontos?</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAffiliateGuideOpen(true)}
                      className="bg-amber-500 hover:bg-amber-400 text-emerald-950 px-2.5 py-1 rounded-lg font-black text-[10px] whitespace-nowrap shadow-xs transition-colors cursor-pointer"
                    >
                      Abrir Guia & Modelos
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Link de Afiliado do Produto (URL com sua tag) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://s.shopee.com.br/xyz ou https://pt.aliexpress.com/..."
                      value={formData.affiliateUrl}
                      onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                      className="w-full border border-orange-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-orange-500 bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Cupom Promocional (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: SHOPEE20OFF"
                      value={formData.discountCoupon}
                      onChange={(e) => setFormData({ ...formData, discountCoupon: e.target.value })}
                      className="w-full border border-orange-300 rounded-xl p-2 text-xs text-stone-800 focus:ring-2 focus:ring-orange-500 bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Title & Category */}
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Título do Produto / Anúncio *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Kit 10 Mudas de Ora-pro-nóbis Sem Espinhos Enraizadas"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Categoria *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as MarketplaceCategory })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {(Object.keys(CATEGORY_LABELS) as MarketplaceCategory[]).map((catKey) => (
                      <option key={catKey} value={catKey}>
                        {CATEGORY_LABELS[catKey].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Estado / Condição</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Muda Enraizada">Muda Enraizada</option>
                    <option value="Sementes Selecionadas">Sementes Selecionadas</option>
                    <option value="Novo">Novo</option>
                    <option value="Usado (Bom Estado)">Usado (Bom Estado)</option>
                    <option value="Colheita Fresca">Colheita Fresca</option>
                    <option value="Matriz Estabelecida">Matriz Estabelecida</option>
                    <option value="Digital / Online">Digital / Online</option>
                  </select>
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Preço Final (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="45.00"
                    value={formData.priceBrl}
                    onChange={(e) => setFormData({ ...formData, priceBrl: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Preço Antigo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="60.00"
                    value={formData.originalPriceBrl}
                    onChange={(e) => setFormData({ ...formData, originalPriceBrl: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Unidade / Embalagem</label>
                  <input
                    type="text"
                    placeholder="Ex: kit 10 mudas"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Non-Affiliate (Direct Seller info) */}
              {!isAffiliatePost && (
                <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Nome do Vendedor / Meliponário *</label>
                    <input
                      type="text"
                      placeholder="Ex: Meliponário Flor da Mata"
                      value={formData.sellerName}
                      onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl p-2 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">WhatsApp para Contato *</label>
                    <input
                      type="tel"
                      placeholder="11999998888"
                      value={formData.sellerPhoneWhatsapp}
                      onChange={(e) => setFormData({ ...formData, sellerPhoneWhatsapp: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl p-2 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block font-semibold text-stone-800 mb-1">Cidade e Estado</label>
                    <input
                      type="text"
                      placeholder="Ex: Campinas - SP"
                      value={formData.sellerCityState}
                      onChange={(e) => setFormData({ ...formData, sellerCityState: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl p-2 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Descrição e Especificações *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detalhes técnicos, época de plantio, materiais, compatibilidade..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Image Selection Presets / URL */}
              <div className="space-y-2">
                <label className="block font-semibold text-stone-800">Foto do Produto / Muda</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="url"
                    placeholder="URL da imagem (https://...)"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="flex-1 border border-stone-300 rounded-xl p-2 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                  <label className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-3 py-2 rounded-xl text-xs cursor-pointer flex items-center space-x-1 border border-stone-300">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                  </label>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_MARKETPLACE_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                      className={`text-[10px] px-2 py-1 rounded-lg border font-medium transition-colors cursor-pointer ${
                        formData.imageUrl === preset.url
                          ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Opções de Envio</label>
                <div className="flex flex-wrap gap-2">
                  {(['Correios', 'Transportadora', 'Frete Grátis', 'Envio Internacional', 'Retirada no Meliponário', 'Download Imediato'] as MarketplaceItem['deliveryOptions'][number][]).map((opt) => {
                    const isSelected = formData.deliveryOptions.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleDeliveryOptionToggle(opt)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-900 text-amber-300 border-emerald-950'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {opt} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions Footer inside form */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between sticky bottom-0 bg-white/95 backdrop-blur-xs py-2">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="text-stone-500 hover:text-stone-800 text-xs font-semibold underline underline-offset-2 cursor-pointer flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar Formulário</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingItem(null);
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-2.5 px-6 rounded-xl text-xs shadow-md cursor-pointer"
                  >
                    {editingItem ? 'Salvar Alterações' : 'Publicar na Vitrine Oficial'}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
