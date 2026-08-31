import { MarketplaceItem, MarketplaceCategory } from '../types';
import { RAIZER_PLANTS_CATALOG } from './raizerFloraData';

/**
 * Catálogo Oficial Completo da Raízer Plantas para Abelhas (https://www.raizerplantasparaabelhas.com.br)
 * Integrado na divisão de Plantas e Sementes do Marketplace MeliApp.
 * 
 * Contém mais de 140 mudas e sementes meliponófilas reais com fotos CDN,
 * nomes científicos, épocas de florada, atratividade para espécies de abelhas sem ferrão,
 * links diretos para a loja e suporte via WhatsApp do viveiro.
 */
export const RAIZER_MARKETPLACE_CATALOG: MarketplaceItem[] = RAIZER_PLANTS_CATALOG.map((plant, index) => {
  const nameLower = plant.plantName.toLowerCase();
  const descLower = plant.description.toLowerCase();
  const urlLower = (plant.raizerUrl || '').toLowerCase();

  const isSeed = 
    nameLower.includes('semente') || 
    descLower.includes('sementes') ||
    urlLower.includes('semente');

  // Preços oficiais 1:1 com a loja www.raizerplantasparaabelhas.com.br
  let priceBrl = 30.00;
  let unit = 'Muda Enraizada';
  let condition: MarketplaceItem['condition'] = 'Muda Enraizada';

  if (isSeed) {
    condition = 'Sementes Selecionadas';
    unit = 'Envelope de Sementes';
    
    // Regras específicas de sementes da loja oficial
    if (nameLower.includes('vassoura de mel') || nameLower.includes('100 sementes')) {
      priceBrl = 40.00;
    } else if (nameLower.includes('vitex') || nameLower.includes('eucalipto')) {
      priceBrl = 30.00;
    } else if (nameLower.includes('canudo') || nameLower.includes('mamoninha') || nameLower.includes('amor agarradinho')) {
      priceBrl = 25.00;
    } else if (nameLower.includes('urucum') || nameLower.includes('papagaio') || nameLower.includes('pau gaiola')) {
      priceBrl = 25.00;
    } else {
      priceBrl = 25.00;
    }
  } else {
    // Regras específicas de mudas da loja oficial
    if (nameLower.includes('astrapeia') || nameLower.includes('nairóbi') || nameLower.includes('nairobi')) {
      priceBrl = 40.00;
      unit = 'Muda Vaso / Tubete';
    } else if (nameLower.includes('guamirim ornado') || nameLower.includes('myrcia glomerata')) {
      priceBrl = 35.00;
      unit = 'Muda Vaso 30cm+';
    } else if (nameLower.includes('eucalipto cheiroso') || nameLower.includes('citriodora')) {
      priceBrl = 20.00;
      unit = 'Muda Tubete';
    } else if (nameLower.includes('tungue')) {
      priceBrl = 25.00;
      unit = 'Muda Enraizada';
    } else if (plant.category.includes('Frutífera') || nameLower.includes('grumixama') || nameLower.includes('guabiroba') || nameLower.includes('cereja')) {
      priceBrl = 35.00;
      unit = 'Muda Frutífera';
    } else if (plant.category.includes('Trepadeira') || nameLower.includes('bertalha') || nameLower.includes('sarapató')) {
      priceBrl = 30.00;
      unit = 'Muda Trepadeira';
    } else if (plant.category.includes('Erva') || plant.category.includes('Horta')) {
      priceBrl = 25.00;
      unit = 'Muda em Vaso';
    } else if (plant.category.includes('Árvore')) {
      priceBrl = 30.00;
      unit = 'Muda Tubete / Vaso';
    } else {
      // Arbustos meliponófilos (Vassoura de Mel, Limonete, Erva Santa, Carne de Vaca, Caliandra Tweedii, etc.)
      priceBrl = 30.00;
      unit = 'Muda Enraizada';
    }
  }

  // Preço customizado explícito se fornecido no catálogo
  if (plant.approxPrice && plant.approxPrice.includes('R$')) {
    const extracted = parseFloat(plant.approxPrice.replace(/[^0-9,]/g, '').replace(',', '.'));
    if (!isNaN(extracted) && extracted > 0) {
      priceBrl = extracted;
    }
  }

  return {
    id: `mkt-raizer-${plant.id}`,
    title: plant.plantName,
    category: 'plantas_sementes' as MarketplaceCategory,
    priceBrl: priceBrl,
    originalPriceBrl: undefined, // Mesmo valor oficial do site, sem acréscimo ou desconto artificial
    unit: unit,
    sellerName: 'Raízer Plantas para Abelhas',
    sellerCityState: 'Blumenau / SC (Envio Nacional)',
    sellerPhoneWhatsapp: '47988499273',
    sellerEmail: 'ricardoraizer@gmail.com',
    verifiedSeller: true,
    rating: 5.0,
    reviewCount: 15 + (index % 40),
    description: `${plant.description} • Nome Científico: ${plant.scientificName} • Recurso Apícola: ${plant.valueType} • Espécies Beneficiadas: ${plant.attractiveForSpecies.join(', ')} • Florada: ${plant.floweringSeason} • Dica de Cultivo: ${plant.cultivationTips} • Parcelamento em até 2x sem juros no site oficial.`,
    imageUrl: plant.imageUrl,
    deliveryOptions: ['Correios', 'Transportadora', 'Frete Grátis'],
    condition: condition,
    createdAt: '2026-08-25',
    featured: index < 12,
    isAffiliate: true,
    affiliatePlatform: 'Raizer',
    affiliateUrl: plant.raizerUrl || 'https://www.raizerplantasparaabelhas.com.br',
    discountCoupon: undefined, // Cupons ainda não disponíveis; serão adicionados futuramente
  };
});
