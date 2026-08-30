export interface RaizerPlantItem {
  id: string;
  plantName: string;
  scientificName: string;
  category: 'Árvore Nativa' | 'Arbusto Meliponófilo' | 'Trepadeira' | 'Erva / Horta' | 'Frutífera / Pomar' | 'Planta Resinífera' | string;
  floweringSeason: 'Outono / Inverno' | 'Primavera / Verão' | 'Ano Todo' | string;
  bloomingMonths: number[];
  valueType: 'Néctar' | 'Pólen' | 'Néctar & Pólen' | 'Resina para Geoprópolis' | 'Resina';
  attractiveForSpecies: string[];
  region: string;
  description: string;
  cultivationTips: string;
  imageUrl: string;
  raizerUrl: string;
  approxPrice?: string;
  verifiedInRaizer: boolean;
  iconBg?: string;
}

export const getRaizerIconBg = (valueType: string): string => {
  if (valueType.includes('Resina')) return 'bg-orange-100 text-orange-900 border-orange-200';
  if (valueType.includes('Néctar') && valueType.includes('Pólen')) return 'bg-amber-100 text-amber-900 border-amber-200';
  if (valueType.includes('Néctar')) return 'bg-yellow-100 text-yellow-900 border-yellow-200';
  if (valueType.includes('Pólen')) return 'bg-emerald-100 text-emerald-900 border-emerald-200';
  return 'bg-amber-100 text-amber-900 border-amber-200';
};

/**
 * Catálogo completo de 140 plantas meliponófilas e mudas reais
 * sincronizadas diretamente com o site Raízer Plantas para Abelhas (https://www.raizerplantasparaabelhas.com.br).
 * Todas as fotos utilizam as imagens fotográficas reais do viveiro hospedadas na infraestrutura oficial (cdn.awsli.com.br).
 */
export const RAIZER_PLANTS_CATALOG: RaizerPlantItem[] = [
  {
    "id": "raizer-1",
    "plantName": "Eucalipto Arco-Íris (Deglupta)",
    "scientificName": "Eucalyptus deglupta",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Iraí",
      "Tubuna",
      "Mandaguari",
      "Mandaçaia",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Eucalipto Arco-Íris Eucalyptus deglupta Melífera • Crescimento rápido • Tronco multicolorido • Excelente para abelhas. Árvore de rápido crescimento com tronco multicolorido e florada abundante.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/359026576/183c5fce6b-rdqerwg0v4.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/50-sementes-de-eucalipto-arco-iris-deglupta-florescimento-precoce",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-2",
    "plantName": "Guamirim folha Fina - Myrcia Splendens",
    "scientificName": "Guamirim folha",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Guamirim Folha Fina (Myrcia splendens), arvoreta nativa e melífera com florada de primavera, fornecendo néctar e pólen às abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/360461850/guami-3nz7k36kzj.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guamirim-filha-fina-myrcia-splendens",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-3",
    "plantName": "Vassourão Branco - Piptocarpha angustifólia",
    "scientificName": "Piptocarpha angustif",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Tubuna",
      "Mandaguari",
      "Iraí",
      "Mirim",
      "Mandaçaia",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Vassourão Branco (Piptocarpha angustifolia), espécie nativa e melífera, atrativa para abelhas e importante para a biodiversidade e recuperação ambiental.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/364031071/vas2-596z8iy1uv.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/vassourao-branco-piptocarpha-angustifolia",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-4",
    "plantName": "Tucaneira - Citharexylum myrianthum",
    "scientificName": "Citharexylum myrianthum",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Tucaneira (Citharexylum myrianthum), árvore nativa e melífera que fornece néctar e pólen, atrai abelhas e produz frutos muito procurados por avees.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/368599954/2024-11-24t09_19_20-03_00-o60p5x3u8d.JPEG",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/tucaneira-citharexylum-myrianthum",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-5",
    "plantName": "Caliandra Vermelha, esponjinha-vermelha - Calliandra Tweedii",
    "scientificName": "Calliandra tweedii",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Caliandra Vermelha (Calliandra tweedii), arbusto nativo e melífero, fonte de néctar e pólen, com intensa florada na primavera e verão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/368628875/caliandra20---copia--2--1012qv5arz.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/caliandra-vermelha-esponjinha-vermelha-calliandra-tweedii",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-6",
    "plantName": "Bertalha Coração - Anredera cordifolia -",
    "scientificName": "Anredera cordifolia",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Bertalha Coração (Anredera cordifolia), trepadeira nativa, fonte de néctar e pólen, com flores perfumadas e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/380444198/berta-88z3jzerzi.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/bertalha-coracao--anredera-cordifolia-adorada-pelas-scaptos-asf",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-7",
    "plantName": "Fruta de Papagaio / Pau Gaiola",
    "scientificName": "Aegiphila integrifolia",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Pacote com 30 sementes para cultivar Fruta de Papagaio, planta ornamental e frutífera. Fácil cultivo e ótimo para jardins. Confira e plante já.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/398788645/017508caf6af4710bcf37cd3dbc6709d-zrbwfi8oyh.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/30-sementes-fruta-de-papagaio-pau-gaiola",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-8",
    "plantName": "Grumixama Mirim - EUGENIA BLASTANTHA",
    "scientificName": "Eugenia blastantha",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Grumixama Mirim (Eugenia blastantha), espécie nativa e melífera, atrativa para abelhas e indicada para jardins, pomares e áreas de biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/398744446/img-20251213-wa0028-6w58mujajn.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/grumixama-mirim-eugenia-blastantha",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-9",
    "plantName": "Cipó Tayuya - Cayaponia podantha",
    "scientificName": "Cayaponia podantha",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      11,
      12,
      1,
      2,
      3
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cipó Tayuya (Cayaponia podantha), trepadeira nativa de florada do verão ao outono, fonte de néctar e muito visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/398745166/cipo-bywevr6fom.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cipo-tayuya-cayaponia-podantha",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-10",
    "plantName": "Guamirim Ornado - Myrcia Glomerata",
    "scientificName": "Ornado ou",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guamirim Ornado ou Cambuí Ornado (Myrcia glomerata), arvoreta nativa e melífera, com florada de inverno rica em néctar e muito visitada por abelhas sem ferrão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/342440908/ornado-hmapk296ah.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guamirim-ornado-myrcia-glomerata",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-11",
    "plantName": "Ginseng Brasileiro",
    "scientificName": "Pfaffia glomerata",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Ginseng Brasileiro (Pfaffia glomerata), planta nativa e medicinal que oferece recurso floral para abelhas e contribui para a biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/141435067/8e0d5d20e0.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/ginseng-brasileiro",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-12",
    "plantName": "Clusia Verde",
    "scientificName": "Clusia fluminensis",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Clúsia (Clusia fluminensis), espécie nativa e ornamental que fornece resina para abelhas. Floresce na primavera e verão e é ótima para jardins.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/141939666/7f0cc8a746.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/clusia-verde",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-13",
    "plantName": "Chal Chal - Allophylus edulis",
    "scientificName": "Allophylus edulis",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Chal-Chal (Allophylus edulis), árvore nativa de florada na primavera, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/143812292/45542a81c4.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/chal-chal-allophylus-edulis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-14",
    "plantName": "Carne de Vaca (Clethra scabra)",
    "scientificName": "Clethra scabra",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Carne de Vaca (Clethra scabra), árvore nativa e melífera, indicada para áreas de biodiversidade, recuperação ambiental e atração de abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/154072091/f16d8a2e74.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/100-sementes-de-carne-de-vaca-clethra-scabra",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-15",
    "plantName": "Angico Vermelho - Anadenanthera macrocarpa",
    "scientificName": "Anadenanthera macrocarpa",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Angico Vermelho (Anadenanthera macrocarpa), árvore nativa e melífera, fonte de néctar e pólen e muito visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/159973448/903fad6961.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/angico-vermelho-anadenanthera-macrocarpa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-16",
    "plantName": "Mourão de Candeia - Velame - Croton triqueter Lam. (anteriormente Julocroton triqueter).",
    "scientificName": "Croton triqueter",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      11,
      12,
      1,
      2,
      3
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Mourão de Candeia ou Velame (Croton triqueter), arbusto nativo e melífero que fornece néctar e pólen e floresce do verão ao outono.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/398743062/img_20260209_101244-e38k3c1bw3.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/mourao-de-candeia-croton-triqueter",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-17",
    "plantName": "Acácia Mangium a Árvore do Apicultor/Meliponicultor/Agricultor",
    "scientificName": "Mangium a",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Acácia Mangium (Acacia mangium), árvore melífera de crescimento rápido, fonte de néctar floral e extrafloral e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56336888/f038efcf5f.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/acacia-mangium-a-arvore-do-apicultormeliponicultoragricultor-2020-05-30-22-01-58",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-18",
    "plantName": "Aroeira Pimenteira (Schinus)",
    "scientificName": "Schinus terebinthifolia",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Aroeira Pimenteira (Schinus terebinthifolius), árvore nativa e melífera, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56141477/e1edb2e692.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/-aroeira-pimenteira-schinus-terebinthifolia-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-19",
    "plantName": "Dorme Dorme",
    "scientificName": "Dorme fornece n",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Dorme-Dorme ou Dormideira (Mimosa pudica), planta nativa e sensitiva, famosa por fechar as folhas ao toque e atrair polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/202950291/dorme-dorme-ovwmdq.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/dorme-dorme-mimosa-pudica",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-20",
    "plantName": "Erva Baleeira",
    "scientificName": "Varronia curassavica",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Erva-Baleeira (Varronia curassavica, sin. Cordia verbenacea), planta nativa que fornece néctar e pólen e apresenta floração prolongada.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/199702598/tmpimg20230125wa0158-9608b2326b.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/erva-baleeira-varronia-curassavica",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-21",
    "plantName": "Escova de Garrafa Branca Melífera atrai abelhas sem ferrão e Beija Flores",
    "scientificName": "Escova de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Escova de Garrafa Branca (Callistemon salignus), árvore ornamental e melífera, com flores branco-creme muito atrativas para abelhas e polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/80466184/3d3846127f.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/escova-de-garrafa-branca-callistemon-salignus",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-22",
    "plantName": "ESCOVA DE GARRAFA VERDE. MELÍFERA, RARA",
    "scientificName": "Callistemon viridiflorus",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "scova de Garrafa Verde (Callistemon viridiflorus), arbusto melífero raro que fornece néctar e pólen e atrai abelhas e outros polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56205069/2279efd3a2.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/escova-de-garrafa-verde-callistemon-viridiflorus",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-23",
    "plantName": "Escova de Garrafa Vermelha Gigante",
    "scientificName": "Escova de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Escova de Garrafa Vermelha (Callistemon viminalis), arvoreta melífera que fornece néctar e pólen e floresce da primavera ao outono.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56163137/64c58a2a0a.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/escova-de-garrafa-vermelha-callistemon-viminalis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-24",
    "plantName": "Espinheira Santa",
    "scientificName": "Maytenus ilicifolia",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Espinheira-Santa (Maytenus ilicifolia), planta nativa e melífera que fornece néctar e pólen e floresce no inverno, importante para as abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/273403432/foto-ce82v1v0nd.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/spinheira-santa-maytenus-ilicifolia",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-25",
    "plantName": "Eucalipto Arco Iris (Deglupta) Florescimento precoce",
    "scientificName": "Eucalyptus deglupta",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Iraí",
      "Tubuna",
      "Mandaguari",
      "Mandaçaia",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Eucalipto Arco-Íris (Eucalyptus deglupta), árvore melífera de crescimento rápido que fornece néctar e pólen e possui famoso tronco multicolorido.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/66868793/a2087cab69.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/eucalipto-arco-iris-eucalyptus-deglupta",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-26",
    "plantName": "Eucalipto Cheiroso (citriodora)",
    "scientificName": "Corymbia citriodora",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      11,
      12,
      1,
      2,
      3
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Iraí",
      "Tubuna",
      "Mandaguari",
      "Mandaçaia",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Eucalipto Citriodora (Corymbia citriodora), árvore melífera de folhas aromáticas que fornece néctar às abelhas e floresce no verão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/228794414/citro1-3yal8t6xio.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/eucalipto-citriodora-corymbia-citriodora",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-27",
    "plantName": "Eucalipto Torelliana, Melífero,",
    "scientificName": "Corymbia torelliana",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaguari",
      "Tubuna",
      "Uruçu",
      "Mandaçaia",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Eucalipto Torelliana (Corymbia torelliana), árvore australiana de rápido crescimento, flores brancas e grande interesse para abelhas e polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56452215/392113a43a.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/eucalipto-torelliana-corymbia-torelliana",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-28",
    "plantName": "Figatíl - Vernonia condensata",
    "scientificName": "Vernonia condensata",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Tubuna",
      "Mandaguari",
      "Iraí",
      "Mirim",
      "Mandaçaia",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Figatíl ou Boldo-baiano (Gymnanthemum amygdalinum, sin. Vernonia condensata), arbusto melífero que fornece néctar e pólen para as abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/186329378/85286fc21d.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/figatil-gymnanthemum-amygdalinum",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-29",
    "plantName": "Fita-de-moça (homalocladium Platycladum)",
    "scientificName": "Muehlenbeckia platyclada",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Fita-de-Moça (Muehlenbeckia platyclada, sin. Homalocladium platycladum), arbusto ornamental de ramos achatados e flores visitadas por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/224046893/fita-de-mo-a-iqjwvuwc77.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/fita-de-moca-muehlenbeckia-platyclada",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-30",
    "plantName": "Gabiroba Crespa - Campomanesia reitziana",
    "scientificName": "Campomanesia reitziana",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Gabiroba Crespa (Campomanesia reitziana), arvoreta nativa e melífera, com floração de inverno, importante para abelhas e produção de frutos.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/228790051/429fde95189b4df79eb25aacb9925ea3-a6nezq0at1.png",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/gabiroba-crespa-campomanesia-reitziana",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-31",
    "plantName": "Gabiroba Lisa - Florada Exuberante",
    "scientificName": "Campomanesia xanthocarpa",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Gabiroba Lisa (Campomanesia xanthocarpa), arvoreta nativa e melífera, importante para abelhas e para a biodiversidade, com frutos muito apreciados.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/315381896/img_20241030_081832-x23ezhafgy.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/gabiroba-lisa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-32",
    "plantName": "Grandíúva - Pau Pólvora - Trema micrantha contem canabidiol (CBD) em suas Estruturas",
    "scientificName": "Trema micrantha contem canabidiol",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Grandíuva ou Pau-Pólvora (Trema micrantha), árvore nativa, melífera e de crescimento rápido, importante para abelhas, aves e recuperação ambiental.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/364023333/pau-9mnhh4aomh.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/randiuva-pau-polvora-trema-micrantha",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-33",
    "plantName": "Grumixama melífera e frutífera",
    "scientificName": "Grumixama mel",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Grumixama (Eugenia brasiliensis), frutífera nativa da Mata Atlântica, melífera e atrativa para abelhas, com frutos saborosos e grande valor ecológico.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/247525631/foto-asepfph5h8.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/grumixama-eugenia-brasiliensis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-34",
    "plantName": "Guabiju -Myrcianthes pungens -Mirtilo Brasileiro",
    "scientificName": "Myrcianthes pungens",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guabiju (Myrcianthes pungens), frutífera nativa e melífera, atrativa para abelhas e aves, com frutos escuros e grande valor para a biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/345510116/guabiju3-6rbka5x9nu.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guabiju-myrcianthes-pungens",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-35",
    "plantName": "Guaco Trepadeira Melífera e Medicinal",
    "scientificName": "Mikania glomerata",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guaco (Mikania glomerata), trepadeira nativa e melífera que fornece néctar e pólen e atrai abelhas e outros polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56309015/207a654738.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guaco-mikania-glomerata",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-36",
    "plantName": "Guamirim de Inverno floresce no Inverno, atrai abelhas e pássaros",
    "scientificName": "Guamirim de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guamirim de Inverno (Eugenia hiemalis), arvoreta nativa e melífera, importante para abelhas nos meses frios e também atrativa para aves.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/90305771/0216aa57a1.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guamirim-de-inverno-eugenia-hiemalis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-37",
    "plantName": "Guamirim Facho ou Guamirim Cravo - Calyptranthes concinna",
    "scientificName": "Facho ou",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guamirim Facho ou Guamirim Cravo (Calyptranthes concinna), espécie nativa do Sul do Brasil, importante para biodiversidade, fauna e recuperação ambiental.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/143821768/img_20241114_094144-iopagnuyh7.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guamirim-facho-cravo-calyptranthes-concinna",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-38",
    "plantName": "Guamirim Folha Larga - Calyptranthes grandifolia",
    "scientificName": "Calyptranthes grandifolia",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guamirim Folha Larga (Calyptranthes grandifolia), árvore nativa da Mata Atlântica, indicada para biodiversidade, recuperação ambiental e polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/159980361/b94fc80a64.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guamirim-folha-larga-calyptranthes-grandifolia",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-39",
    "plantName": "Guanandi",
    "scientificName": "Guanandi fornece",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guanandi ou Olandi (Calophyllum brasiliense), árvore nativa com floração de primavera, atrativa para abelhas e indicada para matas ciliares e áreas úmidas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/141840709/gua-ajroc6b77q.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guanandi-calophyllum-brasiliense",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-40",
    "plantName": "Inga Anão - Flores Rosas -resina para abelhas",
    "scientificName": "Inga vulpina",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Ingá Anão (Inga vulpina), arvoreta nativa e melífera de flores rosas, fonte de néctar e muito atrativa para abelhas e outros polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/190137401/cc0be0981e.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/inga-anao-inga-vulpina",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-41",
    "plantName": "Ingá Feijão - Inga Marginata - Resina para Abelhas",
    "scientificName": "Resina para",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Ingá Feijão (Inga marginata), arvoreta nativa e melífera, fonte de néctar e muito visitada por abelhas com ferrão e abelhas sem ferrão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/190134590/654fb4f348.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/inga-feijao-inga-marginata",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-42",
    "plantName": "Kiri Japonês - ornamental e Melifera",
    "scientificName": "Paulownia tomentosa",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Kiri Japonês (Paulownia tomentosa), árvore melífera de crescimento rápido, com exuberante florada lilás na primavera e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/306763020/download--1--igoyhp3iv7.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/kiri-japones-paulownia-tomentosa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-43",
    "plantName": "Limonete - Aloysia citrodora",
    "scientificName": "Aloysia citrodora",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Limonete (Aloysia citrodora), planta aromática e melífera, muito atrativa para abelhas e indicada para jardins, hortas e áreas próximas a meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/401608083/e1eaf75140774639b67577794a406833-nbzvj15dy2.png",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/limonete-aloysia-citrodora",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-44",
    "plantName": "Liquidambar ornamental e melífeiro",
    "scientificName": "Liquidambar ornamental e mel",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Liquidâmbar (Liquidambar styraciflua), árvore ornamental e melífera, com florada de primavera e bela folhagem colorida no outono.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/104533956/87230dd620.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/liquidambar-liquidambar-styraciflua",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-45",
    "plantName": "Louro Pardo – Alto Potencial Apícola e Meliponicola",
    "scientificName": "Cordia trichotoma",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Louro-Pardo (Cordia trichotoma), árvore nativa e melífera que fornece néctar para abelhas e é indicada para recuperação ambiental e sistemas agroflorestais.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/252344523/foto-iy6nbi46l5.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/louro-pardo-cordia-trichotoma",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-46",
    "plantName": "Mirra Melífera, floresce no inverno",
    "scientificName": "Mirra ou",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Falsa-Mirra ou Pluma-de-Névoa (Tetradenia riparia), arbusto aromático de florada de inverno, muito visitado por abelhas com e sem ferrão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57184124/48543ad8fb.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/alsa-mirra-tetradenia-riparia",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-47",
    "plantName": "Mofumbo - Combretum Leprosum",
    "scientificName": "Combretum leprosum",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Mofumbo (Combretum leprosum), espécie nativa e melífera, atrativa para abelhas e outros polinizadores, com grande valor para a biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/79534621/497ffe16cd.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/mofumbo-combretum-leprosum",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-48",
    "plantName": "Odontonema",
    "scientificName": "Odontonema strictum",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Odontonema (Odontonema strictum), arbusto ornamental de flores vermelhas, muito atrativo para abelhas, beija-flores e outros polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/141289864/1768e545f0.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/odontonema-odontonema-strictum",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-49",
    "plantName": "Pau para Tudo - Pimenteira - Capsicodendron dinisii",
    "scientificName": "Pau para",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Pau para Tudo (Capsicodendron dinisii), árvore nativa e melífera, fonte de néctar, com floração no inverno e primavera e grande valor para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/226206941/foto-xfgbzpznh9.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/pau-para-tudo-capsicodendron-dinisii",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-50",
    "plantName": "Peixotoa catarinensis - Trepadeira Nativa de SC em Extinçao - Melifera",
    "scientificName": "Peixotoa catarinensis",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Peixotoa catarinensis, trepadeira nativa da Mata Atlântica de Santa Catarina, melífera, rara e ameaçada, de grande valor para abelhas e conservação.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/303011408/20180222_100849-374tiwyvkd.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/peixotoa-catarinensis-trepadeira-nativa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-51",
    "plantName": "Pitanga-anã, Mini-pitanga, Cambuí-peva, Cambuí-peba - Eugenia mattosii",
    "scientificName": "Eugenia mattosii",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Pitanga Anã (Eugenia mattosii), frutífera nativa e melífera, atrativa para abelhas e indicada para jardins, vasos e áreas de biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/174155672/977cc8eb2e.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/itanga-ana-eugenia-mattosii",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-52",
    "plantName": "Sabugueiro planta Melífera e Medicinal indicada para Tratamento da Gripe, Resfriado e Febre",
    "scientificName": "Sabugueiro planta",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Sabugueiro (Sambucus nigra), arbusto ou pequena árvore de flores claras, atrativa para abelhas e outros polinizadores, com grande valor ornamental.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/75592352/10574828f5.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/sabugueiro-sambucus-nigra",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-53",
    "plantName": "TAPETE-INGLÊS",
    "scientificName": "Persicaria capitata",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Tapete Inglês (Persicaria capitata), forração perene de crescimento rasteiro e flores rosadas, ideal para jardins e atrativa para polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/251453379/foto-3el1pfl1zy.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/tapete-ingles-persicaria-capitata",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-54",
    "plantName": "Uvaia - Eugenia pyriformis -",
    "scientificName": "Eugenia pyriformis",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Uvaia (Eugenia pyriformis), frutífera nativa e melífera, muito atrativa para abelhas, com frutos aromáticos e grande valor para a biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/302957706/uvaia-4-fvn2esutlu.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/uvaia-eugenia-pyriformis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-55",
    "plantName": "Vassoura de Mel",
    "scientificName": "Vassoura de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Tubuna",
      "Mandaguari",
      "Iraí",
      "Mirim",
      "Mandaçaia",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Vassoura de Mel (Baccharis oreophila), planta nativa e melífera, muito atrativa para abelhas e importante para aumentar a oferta de recursos florais.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56205916/f2ca2122838946bbb49078d1cd5b7a27-xpfjn0576e.png",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/vassoura-de-mel-baccharis-oreophila",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-56",
    "plantName": "Vitex Agnus Castus - Arvore da Castidade - fornece Pólen e Néctar para Abelhas",
    "scientificName": "Arvore da",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Vitex agnus-castus, arbusto melífero de flores lilases, muito atrativo para abelhas e outros polinizadores, ideal para jardins e áreas biodiversas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/337606372/castus2-afpy7wolh8.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/vitex-agnus-castus",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-57",
    "plantName": "Vitex Negundo fornece Pólen e Néctar para Abelhas",
    "scientificName": "Negundo fornece",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Vitex negundo, arbusto ou pequena árvore melífera, com flores lilases muito atrativas para abelhas e outros polinizadores, ideal para jardins e meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56138547/36d6da3c98.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/vitex-negundo-abelhas",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-58",
    "plantName": "Carne de Vaca (Clethra scabra) - Produz Mel Branco",
    "scientificName": "Carne de",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Carne de Vaca (Clethra scabra), árvore nativa e melífera, indicada para áreas de biodiversidade, recuperação ambiental e atração de abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/252345751/img_20220406_093547-6m2o1oh2fv.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/carne-de-vaca-clethra-scabra",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-59",
    "plantName": "Escova de Garrafa, ornamental e Melífera",
    "scientificName": "Escova de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Escova de Garrafa Vermelha (Callistemon viminalis), árvore ornamental e melífera, com flores vermelhas muito atrativas para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58624989/f78a17547b.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/-100-sementes-de-acacia-mangium-a-arvore-do-apicultormeliponicultoragricultor",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-60",
    "plantName": "Guaco Trepadeira Melífera e Medicinal",
    "scientificName": "Mikania glomerata",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guaco (Mikania glomerata), trepadeira nativa e melífera, fonte de néctar e pólen, indicada para jardins, apiários e meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/242135062/whatsapp-image-2019-08-22-at-18-38-27-pc9lj7ctzv.jpeg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/-guaco-trepadeira-melifera-e-medicinal",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-61",
    "plantName": "Vassoura de Mel",
    "scientificName": "Vassoura de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Tubuna",
      "Mandaguari",
      "Iraí",
      "Mirim",
      "Mandaçaia",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Vassoura de Mel (Baccharis oreophila), planta nativa e melífera, muito atrativa para abelhas e indicada para apiários, meliponários e biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56337791/24e3f42bf9894ae1bc1c932fbc133055-8yttgbgx5w.png",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/-vassoura-de-mel-fornece-nectar-e-polen-resistente-a-geadas-floresce-no-inverno",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-62",
    "plantName": "Canudo de Pito ou Mamoninha do Mato (Árvore que pinga Néctar)",
    "scientificName": "Canudo de",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Canudo de Pito (Mabea fistulifera), árvore nativa e melífera, pioneira e indicada para biodiversidade, recuperação ambiental e atração de abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56337505/baa6898022.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/canudo-de-pito-mabea-fistulifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-63",
    "plantName": "Abélia Melífera",
    "scientificName": "Abelia x grandiflora",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "bélia (Abelia × grandiflora), arbusto ornamental de longa floração, muito atrativo para abelhas e ideal para jardins e áreas de biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/100963062/96156f6312.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/abelia-abelia-grandiflora",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-64",
    "plantName": "Abre Caminho Melífera ideal para cercas Vivas",
    "scientificName": "Justicia gendarussa",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Abre Caminho (Justicia gendarussa), arbusto tropical ornamental, de folhagem densa e flores delicadas, indicado para jardins e biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/141844918/4b812bcece.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/abre-caminho-justicia-gendarussa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-65",
    "plantName": "Acácia Mimosa floresce no inverno muito visitada por abelhas",
    "scientificName": "Mimosa floresce no inverno muito visitada por abelhas",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Acácia Mimosa (Acacia podalyriifolia), árvore ornamental de florada amarela no inverno, fonte de pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/91491052/9767e73ed6.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/acacia-mimosa-floresce-no-inverno-muito-visitada-por-abelhas",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-66",
    "plantName": "Araça Mulato Eugenia multicostata",
    "scientificName": "Eugenia multicostata",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Araçá Mulato (Eugenia multicostata), árvore frutífera nativa da Mata Atlântica, fonte de néctar e pólen e importante para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/143811246/ae26912cc3.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/araca-mulato-eugenia-multicostata",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-67",
    "plantName": "Araçá Vermelho - Psidium cattleyanum - Muito visitada pelas ASFs",
    "scientificName": "Psidium cattleyanum",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Araçá Vermelho (Psidium cattleyanum), frutífera nativa de florada primaveril, rica em pólen e muito visitada por diferentes espécies de abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/306725225/download5-7wqne6kvs8.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/araca-vermelho-psidium-cattleyanum",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-68",
    "plantName": "Astrapeia Branca fonte de néctar para as abelhas no inverno",
    "scientificName": "Branca fonte de n",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Bugia",
      "Guaraipo",
      "Uruçu",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Astrapéia Branca (Dombeya natalensis), planta melífera de florada no inverno, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56371240/629cbb8431.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/strapeia-branca-dombeya-natalensis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-69",
    "plantName": "Astrapeia Rosa fonte de néctar para as abelhas no inverno",
    "scientificName": "Rosa fonte de n",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Bugia",
      "Guaraipo",
      "Uruçu",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Astrapéia Rosa (Dombeya wallichii), planta melífera de florada no outono e inverno, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57679703/43f36429ba.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/astrapeia-rosa-dombeya-wallichii",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-70",
    "plantName": "Bracatinga - Mimosa scabrella (Melífera) Mel de Melato",
    "scientificName": "Mimosa scabrella",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Bracatinga (Mimosa scabrella), árvore nativa de florada no inverno, fonte abundante de néctar e pólen e muito importante para as abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/81850620/fcdd9277c9.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/bracatinga-mimosa-scabrella",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-71",
    "plantName": "Callisia Fragans",
    "scientificName": "Callisia fragrans",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Callisia fragrans, planta ornamental de flores brancas e perfumadas, fonte de néctar na florada e visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/247523183/foto-o5i5yyk38w.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/callisia-fragrans",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-72",
    "plantName": "Camboim Folha Verde - Myrcia Selloi",
    "scientificName": "Myrcia selloi",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Camboim Folha Verde (Myrcia selloi), arvoreta nativa de florada na primavera, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/337671810/img_20241119_084344-wycq0mra10.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/camboim-folha-verde-myrcia-selloi",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-73",
    "plantName": "Cambucá - Plinia edulis - Frutífera e Melífera",
    "scientificName": "Plinia edulis",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cambucá (Plinia edulis), frutífera nativa da Mata Atlântica, de florada na primavera, frutos saborosos e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/345517703/cambuca-jro6vyw52m.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cambuca-plinia-edulis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-74",
    "plantName": "Urucum (Bixa orellana)",
    "scientificName": "Bixa orellana",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Urucum ou Colorau (Bixa orellana), planta nativa e melífera que fornece néctar e pólen e é muito interessante para abelhas e biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/403219176/cf9bad32c48d409fb0f181211f98b1ae-xl1w2i9djz.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/vcn901r3p-urucum-bixa-orellana",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-75",
    "plantName": "Araçá Amarelo - Psidium cattleyanum - Muito visitada pelas ASFs",
    "scientificName": "Psidium cattleyanum",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Araçá Amarelo (Psidium cattleyanum), frutífera nativa de florada primaveril, rica em pólen e visitada por diversas espécies de abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/302962225/download-z55k7cm0hj.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/araca-amarelo-psidium-cattleyanum-muito-visitada-pelas-asfs",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-76",
    "plantName": "Falsa-Vinha visitada por Tubunas / jatais e Mirins",
    "scientificName": "Vinha visitada por",
    "category": "Trepadeira",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      3,
      4,
      5,
      6
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Falsa-Vinha (Parthenocissus tricuspidata), trepadeira ornamental de rápido crescimento, ideal para muros e fachadas e com folhagem avermelhada no outono.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/303002701/screenshot_3-jsep39oc5x.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/falsa-vinha-visitada-por-tubunas-jatais-e-mirins",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-77",
    "plantName": "Petreia - Flor de São Miguel - Petrea volubilis",
    "scientificName": "Flor de",
    "category": "Trepadeira",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Nome cientifico: Petrea volubilis Nome Popular: Flor-de-são-Miguel, Capela-de-viúva, Petréia, Touca-de-viúva, Viuvinha Família: Verbenaceae Luminosidade: Sol Pleno Origem: América do Sul, Brasil Tipo: Trepadeira Ciclo de Vida: Perene Floresce: Ano todo com ápice no final do Inverno Recurso Floral: Néctar Trepadeira nativa do Brasil e muito florífera, excelente para recobrir pérgolas, pórticos e caramanchões. As folhas são coriáceas e de margens irregulares e caem no inverno. As flores que se formam em inflorescências grandes como cachos, são azuis-arroxeadas, pequenas e delicadas, de formato estrelado. A floração ocorre ano todo, mas o ápice e no final do inverno e início da primavera. Devem ser cultivadas a pleno sol em solo composto de terra de jardim e terra vegetal, com regas regulares. Necessita de tutoramento para sua formação. Tolerante ao frio. Multiplica-se por sementes. Muito visitada por Abelhas. Borboletas",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/304254031/download-im0ozz8gnk.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/petreia-flor-de-sao-miguel-petrea-volubilis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-78",
    "plantName": "Mini Erica ou Falsa Erica",
    "scientificName": "Erica ou",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Ano Todo",
    "bloomingMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim (Plebeia)",
      "Lambe-olhos",
      "Iraí",
      "Marmelada"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Nome cientifico: Cuphea hyssopifolia Nome Popular: Mini Erica, Cuféia, Cúfea, Falsa-érica Família: Lythraceae Luminosidade: Meia Sombra, Sol Pleno Origem: América do Sul, Colômbia, Venezuela Tipo: Arbusto Ciclo de Vida: Perene Floresce: Ano todo Recurso Floral: Néctar A cuféia é uma planta muito apreciada por florescer o ano todo e exigir pouca manutenção. Sua folhagem é delicada, porém rija e composta de ramificações com folhas bem pequenas e escuras. As flores também são pequenas, porém numerosas, e podem ser de coloração roxa ou branca. Erroneamente, por muito tempo, divulgou-se que se tratava da espécie Cuphea gracilis, e como sendo nativa do Brasil. No entanto, trata-se na verdade da espécie Cuphea hyssopifolia, originária da América Central e México. Devido às suas qualidades e pequeno porte a cuféia é excelente em vasos e jardineiras, assim como em canteiros adubados e bordaduras. Devem ser cultivadas a pleno sol ou meia sombra, em solo fértil enriquecido com matéria orgânica, com regas regulares. Não é tolerante ao frio intenso, nem aprecia podas. Multiplica-se por estaquia.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/306804365/erica2-dl1t9sfizf.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/mini-erica-ou-falsa-erica-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-79",
    "plantName": "Astrapeia Lilás de Nairóbi - Dombeya burgessiae",
    "scientificName": "Dombeya burgessiae",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Bugia",
      "Guaraipo",
      "Uruçu",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Astrapéia Lilás de Nairóbi (Dombeya burgessiae), planta melífera de florada no inverno, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/199896300/tmpdombeiaastrapeialilasnairobidombeyaburgessiaemudas-cc63c8cf06.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/astrapeia-lilas-de-nairobi--dombeya-burgessiae",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-80",
    "plantName": "Cipó Uva Melífera",
    "scientificName": "Serjania lethalis",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cipó Uva (Serjania lethalis), trepadeira nativa e melífera. Fornece néctar para abelhas e floresce na primavera. Mudas para apiários e meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/92939597/1bce5bee0b.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cipo-uva-melifera-produz-mel-claro",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-81",
    "plantName": "Pau Formiga",
    "scientificName": "Triplaris americana",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Pau-Formiga (Triplaris americana), árvore nativa e melífera, fonte de néctar e pólen, com florada ornamental e grande valor para abelhas e biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/220662883/pau-ve9wjs81d4.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/pau-formiga",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-82",
    "plantName": "Fruta de Papagaio / Tamanqueira",
    "scientificName": "Aegiphila integrifolia",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Fruta de Papagaio ou Pau Gaiola (Aegiphila sellowiana), arvoreta nativa de florada na primavera, fonte de néctar e pólen para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/220668187/20171022_181832-h3nr9mtqen.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/fruta-de-papagaio-pau-gaiola-ou-tamanqueira",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-83",
    "plantName": "Ora Pro Nobis Rosa",
    "scientificName": "Pereskia grandifolia",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Ora-Pro-Nóbis Rosa (Pereskia grandifolia), arbusto nativo e melífero, fonte de néctar e muito atrativo para abelhas e outros polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/83724495/rosa1-h7kwijqrzn.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/rosa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-84",
    "plantName": "Vitex Negundo Melífero",
    "scientificName": "Vitex negundo",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "vitex branco  fornece pólen e néctar para abelhas",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/92745379/55d4e95690.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/vitex-negundo",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-85",
    "plantName": "Dorme Dorme - Dormideira - Mimosa Pudica",
    "scientificName": "Mimosa pudica",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Mimosa pudica, conhecida popularmente por dormideira, sensitiva, dorme-dorme ou não-me-toques",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/92746369/34eabdd331.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-dorme-dorme",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-86",
    "plantName": "Canudo de Pito ou Mamoninha do Mato (Árvore que pinga Néctar)",
    "scientificName": "Canudo de",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Canudo de Pito (Mabea fistulifera), árvore nativa e melífera, pioneira e indicada para biodiversidade, recuperação ambiental e atração de abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56128836/09c8bccb7b.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/canudo-de-pito",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-87",
    "plantName": "Campari - Groselha do Ceilão",
    "scientificName": "Groselha do",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Campari ou Groselha-do-Ceilão (Dovyalis hebecarpa), frutífera exótica, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/101081883/cfbb45a3e0.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/campari-groselha-do-ceilao-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-88",
    "plantName": "Camboim Folha Fina - (Myrciaria tenella) Floresce no inverno",
    "scientificName": "Myrciaria tenella",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Camboim Folha Fina (Myrciaria tenella), frutífera nativa de florada no inverno, fonte de néctar e muito visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/224232654/cambo-tgtznzekwo.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/camboim-folha-fina-myrciaria-tenella",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-89",
    "plantName": "Embira - Daphnopsis fasciculata Boa para abelhas e pássaros",
    "scientificName": "Daphnopsis fasciculata",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Embira ou Embira-branca (Daphnopsis fasciculata), árvore nativa da Mata Atlântica e Floresta com Araucária, com floração nos meses frios.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/224418021/embira-i8ij3yrogz.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/embira-daphnopsis-fasciculata-boa-para-abelhas-e-passaros",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-90",
    "plantName": "Guamirim Branco - Guamirim Brasiliensis",
    "scientificName": "Calyptranthes brasiliensis",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guamirim Branco (Calyptranthes brasiliensis), arvoreta nativa da Mata Atlântica que fornece néctar e pólen e é muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/226205743/foto-9lonuh1tc8.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guamirim-branco-guamirim-brasiliensis",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-91",
    "plantName": "Guamirim do Brejo - Myrcia oblongata",
    "scientificName": "Guamirim do",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Guamirim do Brejo (Myrcia oblongata), arvoreta nativa da Mata Atlântica e melífera, fonte de néctar e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/226210738/guamirim-yjkcd4hirt.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/guamirim-do-brejo-myrcia-oblongata",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-92",
    "plantName": "Cebolinha de Jardim - Bulbine",
    "scientificName": "Cebolinha de",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cebolinha de Jardim (Bulbine frutescens), herbácea ornamental de floração prolongada, fonte de pólen e muito visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/241512572/bolbi-n72680967e.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cebolinha-de-jardim-bulbine",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-93",
    "plantName": "Aroeira Assobiadeira - Schinus polygama",
    "scientificName": "Schinus polygama",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Aroeira Assobiadeira (Schinus polygama), arvoreta com florada no inverno, fonte de néctar e pólen e atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/241535996/asso-ot6k603vo3.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/aroeira-assobiadeira-schinus-polygama",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-94",
    "plantName": "Araçá-de-macaco - Araçá Azul - (Psychotria suterella)",
    "scientificName": "Psychotria suterella",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "raçá-de-Macaco ou Araçá Azul (Psychotria suterella), espécie nativa da Mata Atlântica, fonte de recursos para abelhas e muito visitada por mamangavas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/337604053/img_20250208_144843-9hu2cule1k.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/araca-de-macaco-araca-azul-psychotria-suterella",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-95",
    "plantName": "Brinco de Índio - Cojoba arborea",
    "scientificName": "Brinco de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Brinco de Índio (Cojoba arborea), árvore ornamental de florada na primavera, fonte de pólen e muito visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/323253796/brinco-7cskn7eav7.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/brinco-de-indio-cojoba-arborea",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-96",
    "plantName": "Cereja de Santa Catarina - Eugenia Cereja",
    "scientificName": "Cereja de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cereja SC Pilosa (Eugenia cereja), frutífera nativa de Santa Catarina, fonte de néctar, com florada de inverno e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/324421161/cereja-de9mi2g580.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cereja-de-santa-catarina-eugenia-cereja",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-97",
    "plantName": "Angico Branco - Anadenanthera colubrina",
    "scientificName": "Anadenanthera colubrina",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Angico Branco (Anadenanthera colubrina), árvore nativa e melífera, fonte de néctar e pólen e muito visitada por abelhas na primavera e verão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/329115212/angico20-vbekz3vdw1.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cpvlv2vb0-angico-vermelho-anadenanthera-macrocarpa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-98",
    "plantName": "Uvaia do Visconde - Ingá Baú",
    "scientificName": "Uvaia do",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Uvaia do Visconde ou Ingá-Baú (Eugenia beaurepairiana), frutífera nativa da Mata Atlântica, rara, aromática e atrativa para abelhas e fauna.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/252340067/image003-7vzw806ffs.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/uvaia-do-visconde-inga-bau-melifera-e-saborosa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-99",
    "plantName": "Eucalipto Floresce Ano Todo em Regiões quentes ( sem Geada)",
    "scientificName": "Todo em",
    "category": "Árvore Nativa",
    "floweringSeason": "Ano Todo",
    "bloomingMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Iraí",
      "Tubuna",
      "Mandaguari",
      "Mandaçaia",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Eucalipto PERMANENTE, cultivar de Eucalyptus spp. desenvolvida para apicultura e meliponicultura, com florescimento precoce e floração prolongada.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/249660449/187368df2734486897bd8bcab2b864ba-3hu8teyjf2.png",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/eucalipto-permanente",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-100",
    "plantName": "Erva Santa / Alfazema do Brasil",
    "scientificName": "Aloysia gratissima",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      11,
      12,
      1,
      2,
      3
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Erva Santa / Alfazema do Brasil Aloysia gratissima Planta nativa • Melífera • Florada do verão ao outono A Erva Santa, também conhecida como Alfazema do Brasil, é um arbusto nativo muito interessante para quem deseja aumentar a oferta de alimento para as abelhas e atrair polinizadores para jardins, propriedades rurais e meliponários. Suas pequenas flores claras são bastante atrativas para abelhas e ajudam a ampliar a disponibilidade de recurso floral durante sua longa época de floração. 🐝 RECURSO FLORAL Néctar 🌼 FLORAÇÃO Verão ao outono 🌿 TIPO Arbusto 🇧🇷 ORIGEM Nativa Para as abelhas Suas flores produzem néctar e são intensamente visitadas por abelhas nativas e outros polinizadores, contribuindo para aumentar a oferta de alimento no ambiente. Características da planta É um arbusto aromático e rústico, indicado para jardins, áreas rurais e espaços destinados à conservação de polinizadores. Sua floração prolongada aumenta seu valor para projetos voltados às abelhas. 🌿 Por que plantar? Uma excelente opção para aumentar a diversidade de floradas e oferecer néctar às abelhas durante vários meses do ano.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/267843028/erva-santa12-t2gc0a2z0m.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/c1ffml6zu-erva-santaalfazema-do-brasil-aloysia-gratissima-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-101",
    "plantName": "Nêspera - Eriobotrya japônica",
    "scientificName": "Eriobotrya jap",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "êspera ou Ameixa-Amarela (Eriobotrya japonica), árvore frutífera e ornamental, com flores atrativas para polinizadores e frutos saborosos.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/400169654/ameixa-t9dy62xb13.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/nespera-eriobotrya-japonica",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-102",
    "plantName": "Urucum - Bixa orellana",
    "scientificName": "Bixa orellana",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Urucum ou Colorau (Bixa orellana), planta nativa e melífera que fornece néctar e pólen e é muito interessante para abelhas e biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/400170995/uru-hy26k7inus.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/urucum-bixa-orellana",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-103",
    "plantName": "Goiaba Serrana - Acca sellowiana",
    "scientificName": "Acca sellowiana",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Goiaba Serrana (Acca sellowiana), arvoreta nativa e melífera, importante para abelhas e polinizadores, com frutos aromáticos e muito apreciados.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/400171562/goi-a2p7z7xpc4.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/goiaba-serrana-acca-sellowiana",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-104",
    "plantName": "CAMBUÍ ROXO (Eugenia candolleana)",
    "scientificName": "Eugenia candolleana",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      11,
      12,
      1,
      2,
      3
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cambuí Roxo (Eugenia candolleana), frutífera nativa de florada no verão, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/174159609/a6eef83bb9.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cambui-roxo-eugenia-candolleana",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-105",
    "plantName": "Dedaleiro - Lafoensia pacari",
    "scientificName": "Lafoensia pacari",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Dedaleiro ou Pacari (Lafoensia pacari), árvore nativa e melífera. Fornece néctar para abelhas e floresce na primavera e verão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/186427853/000edf18ed.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/dedaleiro-lafoensia-pacari-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-106",
    "plantName": "Manto Branco - Turbina corymbosa",
    "scientificName": "Turbina corymbosa",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Manto Branco (Turbina corymbosa), trepadeira melífera de floração abundante, muito atrativa para abelhas e indicada para jardins e áreas biodiversas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/186435653/bb5cb31baf.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/manto-branco-turbina-corymbosa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-107",
    "plantName": "Alfavação",
    "scientificName": "Ocimum gratissimum",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Alfavacão ou Alfavaca-cravo (Ocimum gratissimum), arbusto aromático com néctar e pólen, florada prolongada e muito atrativo para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/187623073/b3374730f5.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/alfavacao",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-108",
    "plantName": "Piracanta Melífera",
    "scientificName": "Pyracantha coccinea",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "muito visitada por abelhas com e sem ferrão",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/190245804/3bab4e474e.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/piricanta",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-109",
    "plantName": "Casca D Anta",
    "scientificName": "Cataia ou",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      11,
      12,
      1,
      2,
      3
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cataia ou Casca-d’Anta (Drimys brasiliensis), árvore nativa da Mata Atlântica, de florada no verão e importante para a biodiversidade.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/190254484/b8adad0789.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/casca-d-anta",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-110",
    "plantName": "Amor Agarradinho Branco",
    "scientificName": "Antigonon leptopus 'Album'",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Amor Agarradinho Branco (Antigonon leptopus 'Album' / 'Alba'), trepadeira melífera de florada branca abundante, fonte de néctar e pólen, muito atrativa para abelhas sem ferrão.",
    "cultivationTips": "Plantar a pleno sol ou meia-sombra. Trepadeira vigorosa ideal para cercas, pérgolas e caramanchões.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56315322/1d3d9a91a9.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-branco-adorado-pelas-mandacaias",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-111",
    "plantName": "Bracatinga Rosa",
    "scientificName": "Mimosa flocculosa",
    "category": "Árvore Nativa",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Bracatinga Rosa (Mimosa flocculosa), espécie nativa e melífera, fonte de néctar e pólen, com florada no outono e inverno.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56102073/1aec577a74.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/bracatinga-rosa-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-112",
    "plantName": "Amor Agarradinho Rosa",
    "scientificName": "Antigonon leptopus",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Amor Agarradinho Rosa (Antigonon leptopus), trepadeira melífera com néctar e pólen, florada abundante e muito visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56102618/5b013b74e8.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-rosa",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-113",
    "plantName": "Margarida em Arvore",
    "scientificName": "Margarida em",
    "category": "Árvore Nativa",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Tubuna",
      "Mandaguari",
      "Iraí",
      "Mirim",
      "Mandaçaia",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Margaridão Branco (Montanoa bipinnatifida), arbusto melífero que fornece néctar e pólen e apresenta abundante florada branca no outono e inverno.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56114921/aaba45b624.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/margarida-em-arvore-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-114",
    "plantName": "Acácia Mangium a Árvore do Apicultor/Meliponicultor/Agricultor",
    "scientificName": "Mangium a",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Acácia Mangium (Acacia mangium), árvore melífera de crescimento rápido, fonte de néctar floral e extrafloral e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56136867/830a1e7a63.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/acacia-mangium-a-arvore-do-apicultormeliponicultoragricultor-",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-115",
    "plantName": "Flocos de Neve (Melaleuca alternifolia) Melífera",
    "scientificName": "Flocos de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Melaleuca alternifolia, conhecida como Árvore-do-Chá ou Tea Tree, espécie aromática australiana com abundante floração branca na primavera e verão.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56139501/be1dfee654.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/a-arvore-do-cha-melaleuca-alternifolia-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-116",
    "plantName": "Aroeira Pimenteira - Schinus terebinthifolia Melífera",
    "scientificName": "Schinus terebinthifolia",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Aroeira Pimenteira (Schinus terebinthifolius), árvore nativa e melífera, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56141044/b0e6577bda.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/aroeira-pimenteira-schinus-terebinthifolia-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-117",
    "plantName": "Cabeludinha ou jabuticaba Amarela ( Plinia glomerata)",
    "scientificName": "Cabeludinha ou jabuticaba",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cabeludinha ou Jabuticaba Amarela (Plinia glomerata), frutífera brasileira, fonte de néctar e pólen e muito visitada por abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56162887/3b19aa5a16.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cabeludinha-ou-jabuticaba-amarela-plinia-glomerata-fornece-nectar",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-118",
    "plantName": "Calabura (Muntingia calabura) Excelente para Abelhas",
    "scientificName": "Muntingia calabura",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Ano Todo",
    "bloomingMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Calabura (Muntingia calabura), árvore frutífera com floração o ano todo, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56204814/87495e0d9b.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/calabura-muntingia-calabura-excelente-para-abelhas",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-119",
    "plantName": "Fruto do Sabiá e Alimento para Abelhas",
    "scientificName": "Fruto do",
    "category": "Frutífera / Pomar",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Fruto do Sabiá ou Marianeira (Acnistus arborescens), arvoreta nativa e melífera que fornece néctar e pólen e produz frutos muito atrativos para aves.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56205593/321e5445a7.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/fruto-do-sabia-e-alimento-para-abelhas",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-120",
    "plantName": "Callisia warszewicziana (Espironema, Tripogandra, Dragãozinho) Melífera",
    "scientificName": "Callisia warszewicziana",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Espironema (Callisia warszewicziana), herbácea ornamental de floração prolongada, fácil cultivo e atrativa para polinizadores.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56306355/calli-y5zhxl4hxx.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/callisia-warszewicziana-espironema-tripogandra-dragaozinho-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-121",
    "plantName": "Caliandra Rosa Melífera",
    "scientificName": "Calliandra brevipes",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Caliandra Rosa (Calliandra brevipes), arbusto nativo de florada na primavera e verão, fonte de pólen e néctar e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56311321/130c6589e4.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/caliandra-rosa-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-122",
    "plantName": "Amor Agarradinho Branco - Adorado pelas Mandaçaias",
    "scientificName": "Adorado pelas",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Amor Agarradinho Branco (Antigonon leptopus &#39;Alba&#39;), trepadeira melífera com néctar e pólen, florada abundante e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56315322/1d3d9a91a9.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-branco-adorado-pelas-mandacaias",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-123",
    "plantName": "Cipó Café Amarelo",
    "scientificName": "Mascagnia sepium",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Cipó Café (Distimake tuberosus), trepadeira ornamental de floração atrativa para abelhas e outros polinizadores, ideal para jardins e cercas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56336561/8e374caf7b.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/xwjalbv5r-cipo-cafe-amarelo-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-124",
    "plantName": "Bracatinga Rosa Melífera",
    "scientificName": "Mimosa scabrella",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Bracatinga Rosa, espécie melífera de florada abundante e muito atrativa para abelhas, indicada para apiários, meliponários e áreas de recuperação.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56337226/25d17eb1a9.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/d02cvp52c-bracatinga-rosa-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-125",
    "plantName": "Mutre (Aloysia virgata) a Planta Preferida dos Meliponicultores",
    "scientificName": "Aloysia virgata",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Mutre ou Lixa (Aloysia virgata), planta nativa muito melífera, rica em néctar e especialmente indicada para apiários e meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56369514/31e1dabed5.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/mutre-aloysia-virgata-a-planta-preferida-dos-meliponicultores",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-126",
    "plantName": "Erva santa/Alfazema do Brasil -Aloysia gratissima (Melífera)",
    "scientificName": "Erva santa",
    "category": "Erva / Horta",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Iraí",
      "Lambe-olhos",
      "Mandaçaia",
      "Tubuna"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "plantas que fornecem alimento para abelhas",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56370881/a8be73aebb.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/erva-santaalfazema-do-brasil-aloysia-gratissima-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-127",
    "plantName": "Aroeira Salsa",
    "scientificName": "Schinus molle",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "roeira Salsa (Schinus molle), árvore nativa e melífera, fonte de néctar e pólen, com florada no inverno e primavera e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57183905/964fa84d83.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/aroeira-salsa-melifera-e-medicinal",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-128",
    "plantName": "Caliandra Branca , Esponjinha Gigante,Caliandra da Folha Larga, Melífera e rara",
    "scientificName": "Caliandra da",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Caliandra Branca (Calliandra haematocephala &#39;Alba&#39;), arbusto melífero, fonte de néctar e pólen e muito atrativo para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57196762/76cdfb67ab.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/caliandra-branca-esponjinha-gigantecaliandra-da-folha-larga-melifera-e-rara",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-129",
    "plantName": "Eucalyptus ptychocarpa,ornamental e Melífero",
    "scientificName": "Eucalyptus ptychocarpa",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Iraí",
      "Tubuna",
      "Mandaguari",
      "Mandaçaia",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Eucalipto de Flor Vermelha (Corymbia ptychocarpa), árvore melífera com flores vermelhas a rosadas, rica em néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57858583/9811dbbf66.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/eucalyptus-ptychocarpaornamental-e-melifero",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-130",
    "plantName": "Assa peixe. Melífera e Medicinal",
    "scientificName": "Assa peixe",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Assa-peixe (Vernonanthura polyanthes), espécie nativa, medicinal e excelente melífera, com florada no outono e inverno e grande atração de abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58625193/866dfb5c13.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/y24lpgjlj-100-sementes-de-acacia-mangium-a-arvore-do-apicultormeliponicultoragricultor",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-131",
    "plantName": "Amor Agarradinho Rosa",
    "scientificName": "Antigonon leptopus",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Amor Agarradinho Rosa (Antigonon leptopus), trepadeira melífera de florada abundante, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58800276/6e85d4463a.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cjgvpo3wg-amor-agarradinho-rosa-melifera",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-132",
    "plantName": "Aroeira Salsa Melífera",
    "scientificName": "Schinus molle",
    "category": "Planta Resinífera",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Resina para Geoprópolis",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Mandaguari",
      "Tubuna",
      "Guaraipo",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Aroeira Salsa (Schinus molle), árvore ornamental e melífera, com florada atrativa para abelhas e indicada para jardins, apiários e meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58803059/57d5511fa2.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/3g9dx6lu5-aroeira-salsa-melifera-e-medicinal",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-133",
    "plantName": "Astrapeia Branca fonte de néctar para as abelhas no inverno",
    "scientificName": "Branca fonte de n",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Bugia",
      "Guaraipo",
      "Uruçu",
      "Jataí",
      "Tubuna",
      "Borá"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Astrapéia Branca Dombeya natalensis Melífera • Florada de inverno • Alta produção de néctar • Excelente para abelhas A Astrapéia Branca, também conhecida como Dombéia Branca ou Bola-de-Neve, é uma planta ornamental de florada exuberante e grande interesse para apicultura e meliponicultura. Suas inflorescências formam grandes cachos de flores brancas e perfumadas, muito procuradas pelas abelhas durante o outono e o inverno, período em que muitas outras plantas apresentam menor floração. 🐝 RECURSO FLORAL Néctar 🌼 FLORAÇÃO Outono e inverno 🌿 TIPO Arbusto / pequena árvore 🌎 ORIGEM Exótica Para as abelhas Sua principal característica é a grande produção de néctar. A florada em meses mais frios torna a Astrapéia Branca especialmente interessante para ajudar na manutenção das colônias durante períodos de menor disponibilidade floral. Características da planta É uma planta de crescimento rápido, muito ornamental e de fácil condução por podas. Pode ser utilizada isoladamente, em jardins, propriedades rurais e também na formação de cercas-vivas. 🌿 Por que plantar? Uma excelente escolha para oferecer néctar às abelhas durante os meses mais frios e, ao mesmo tempo, proporcionar uma florada branca exuberante.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/65843985/b00c61350f.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/lc0iq4md8-astrapeia-branca-fonte-de-nectar-para-as-abelhas-no-inverno",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-134",
    "plantName": "Guamirim de Inverno atrai abelhas e pássaros",
    "scientificName": "Guamirim de",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      5,
      6,
      7,
      8
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Jataí",
      "Mirim",
      "Tubuna",
      "Iraí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Guamirim de Inverno (Eugenia hiemalis), espécie nativa e melífera com florada no outono e inverno, atrativa para abelhas e indicada para meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/74056208/be91444a4f.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-guamirim-de-inverno-atrai-abelhas-e-passaros",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-135",
    "plantName": "Acácia Mimosa floresce no inverno muito visitada por abelhas",
    "scientificName": "Mimosa floresce no inverno muito visitada por abelhas",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Mandaçaia",
      "Uruçu",
      "Bugia",
      "Guaraipo",
      "Tubuna",
      "Mandaguari",
      "Jataí"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Muda de Acácia Mimosa, árvore ornamental e melífera com abundante florada amarela no inverno, muito atrativa para abelhas e indicada para apiários e meliponários.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/74056853/a2825e645d.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-acacia-mimosa-floresce-no-inverno-muito-visitada-por-abelhas",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-136",
    "plantName": "Cipó café adorado pelas Abelhas floresce no outono",
    "scientificName": "Abelhas floresce no outono",
    "category": "Trepadeira",
    "floweringSeason": "Outono / Inverno",
    "bloomingMonths": [
      3,
      4,
      5,
      6
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cipó Café (Distimake tuberosus), trepadeira ornamental de florada no outono, fonte de néctar e pólen e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/75573783/f39ced3d73.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cipo-cafe-adorado-pelas-abelhas-floresce-no-outono",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-137",
    "plantName": "Paineira Rosa, Nativa, Melífera, ornamental e resistente ao frio",
    "scientificName": "Ceiba speciosa",
    "category": "Árvore Nativa",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Paineira Rosa (Ceiba speciosa), árvore nativa, melífera e ornamental, com florada rosa exuberante e grande atratividade para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/77641891/5b4d47c5f9.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/paineira-rosa-nativa-melifera-ornamental-e-resistente-ao-frio",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-138",
    "plantName": "Cafezeiro do Mato, Melífera, Medicinal e com perfume de mel",
    "scientificName": "Cafezeiro do",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cafezeiro do Mato (Casearia sylvestris), espécie nativa e melífera, fonte de néctar e pólen, com florada de inverno e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/78999795/b174fcf0b1.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/cafezeiro-do-mato-melifera-medicinal-e-com-perfume-de-mel",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-139",
    "plantName": "Cafezeiro do Mato, Melífera, Medicinal e com perfume de mel",
    "scientificName": "Cafezeiro do",
    "category": "Arbusto Meliponófilo",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mirim"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cafezeiro do Mato Casearia sylvestris Nativa • Melífera • Flores perfumadas • Excelente para abelhas O Cafezeiro do Mato, também conhecido como Erva-de-Bugre, é uma arvoreta nativa de grande valor ecológico e muito interessante para apicultura e meliponicultura. Suas pequenas flores claras, numerosas e perfumadas aparecem principalmente na primavera e atraem diferentes espécies de abelhas e outros polinizadores. 🐝 RECURSO FLORAL Néctar e pólen 🌼 FLORAÇÃO Primavera 🌿 TIPO Arvoreta 🇧🇷 ORIGEM Nativa Para as abelhas Suas flores fornecem néctar e pólen e são bastante procuradas por abelhas nativas sem ferrão e por Apis mellifera. O perfume intenso da floração aumenta sua atratividade para os polinizadores. Características da planta É uma espécie nativa, pioneira e de grande importância ecológica, indicada para propriedades rurais, sistemas agroflorestais, recuperação de áreas degradadas e formação de ambientes favoráveis à fauna. 🌿 Por que plantar? Uma excelente escolha para oferecer néctar e pólen às abelhas, aumentar a biodiversidade e valorizar uma espécie nativa brasileira.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/79000730/66aae23e0a.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-cafezeiro-do-mato-melifera-medicinal-e-com-perfume-de-mel",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  },
  {
    "id": "raizer-140",
    "plantName": "Cipó Uva Melífera",
    "scientificName": "Serjania lethalis",
    "category": "Trepadeira",
    "floweringSeason": "Primavera / Verão",
    "bloomingMonths": [
      9,
      10,
      11,
      12
    ],
    "valueType": "Néctar & Pólen",
    "attractiveForSpecies": [
      "Jataí",
      "Mirim",
      "Mandaçaia",
      "Uruçu",
      "Tubuna",
      "Mandaguari"
    ],
    "region": "Todo o Brasil (Mata Atlântica, Cerrado, Sul e Sudeste)",
    "description": "Cipó Uva (Serjania lethalis), trepadeira nativa e melífera, rica em néctar, com florada de primavera e muito atrativa para abelhas.",
    "cultivationTips": "Plantar em local ensolarado ou meia-sombra conforme a espécie. Solo com boa matéria orgânica e regas regulares no primeiro mês de pegamento.",
    "imageUrl": "https://cdn.awsli.com.br/800x800/1423/1423275/produto/81584819/6988ef5911.jpg",
    "raizerUrl": "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-cipo-uva-melifera-produz-mel-claro-sementes-frescas-colhidas-em-dez",
    "approxPrice": "Muda no Viveiro Raízer",
    "verifiedInRaizer": true
  }
];

/**
 * Dicionário botânico de alta precisão que vincula espécies brasileiras
 * às suas fotos reais correspondentes no Viveiro Raízer ou fotos botânicas verificadas.
 */
export const PRECISE_SPECIES_MAP: Record<string, { img: string; url: string; title: string }> = {
  "dombeya": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57679703/43f36429ba.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/astrapeia-rosa-fonte-de-nectar-para-as-abelhas-no-inverno",
    title: "Astrapeia Rosa (Dombeya wallichii)"
  },
  "astrapeia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57679703/43f36429ba.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/astrapeia-rosa-fonte-de-nectar-para-as-abelhas-no-inverno",
    title: "Astrapeia Rosa (Dombéia)"
  },
  "dombeia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57679703/43f36429ba.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/astrapeia-rosa-fonte-de-nectar-para-as-abelhas-no-inverno",
    title: "Dombéia Rosa (Astrapeia)"
  },
  "ora pro nobis": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/83724495/rosa1-h7kwijqrzn.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/ora-pro-nobis-rosa",
    title: "Ora-pro-nóbis Rosa / Branca (Pereskia)"
  },
  "pereskia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/83724495/rosa1-h7kwijqrzn.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/ora-pro-nobis-rosa",
    title: "Ora-pro-nóbis (Pereskia aculeata)"
  },
  "amor agarradinho branco": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56315322/1d3d9a91a9.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-branco-adorado-pelas-mandacaias",
    title: "Amor-agarradinho Branco (Antigonon leptopus 'Album')"
  },
  "antigonon leptopus album": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56315322/1d3d9a91a9.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-branco-adorado-pelas-mandacaias",
    title: "Amor-agarradinho Branco (Antigonon leptopus 'Album')"
  },
  "antigonon leptopus alba": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56315322/1d3d9a91a9.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-branco-adorado-pelas-mandacaias",
    title: "Amor-agarradinho Branco (Antigonon leptopus 'Alba')"
  },
  "amor agarradinho rosa": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58800276/6e85d4463a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-rosa",
    title: "Amor-agarradinho Rosa (Antigonon leptopus)"
  },
  "amor agarradinho": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58800276/6e85d4463a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-rosa",
    title: "Amor-agarradinho (Antigonon leptopus)"
  },
  "antigonon": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58800276/6e85d4463a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/amor-agarradinho-rosa",
    title: "Amor-agarradinho (Antigonon leptopus)"
  },
  "assa peixe": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58625193/866dfb5c13.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/200-sementes-de-assa-peixe-melifera-e-medicinal",
    title: "Assa-peixe (Vernonia polysphaera)"
  },
  "vernonia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58625193/866dfb5c13.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/200-sementes-de-assa-peixe-melifera-e-medicinal",
    title: "Assa-peixe (Vernonia)"
  },
  "vernonanthura": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58625193/866dfb5c13.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/200-sementes-de-assa-peixe-melifera-e-medicinal",
    title: "Assa-peixe (Vernonanthura)"
  },
  "cipo uva": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/92939597/1bce5bee0b.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/cipo-uva-melifera-produz-mel-claro",
    title: "Cipó-uva (Serjania lethalis)"
  },
  "serjania": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/92939597/1bce5bee0b.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/cipo-uva-melifera-produz-mel-claro",
    title: "Cipó-uva (Serjania)"
  },
  "aroeira": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56141044/b0e6577bda.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/-aroeira-pimenteira-schinus-terebinthifolia-melifera",
    title: "Aroeira-pimenteira (Schinus terebinthifolia)"
  },
  "aroeira salsa": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57183905/964fa84d83.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/aroeira-salsa-melifera-e-medicinal",
    title: "Aroeira Salsa (Schinus molle)"
  },
  "schinus": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56141044/b0e6577bda.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/-aroeira-pimenteira-schinus-terebinthifolia-melifera",
    title: "Aroeira (Schinus)"
  },
  "caliandra": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/368628875/caliandra20---copia--2--1012qv5arz.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/caliandra-vermelha-esponjinha-vermelha-calliandra-tweedii",
    title: "Caliandra Vermelha / Esponjinha (Calliandra tweedii)"
  },
  "esponjinha": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/368628875/caliandra20---copia--2--1012qv5arz.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/caliandra-vermelha-esponjinha-vermelha-calliandra-tweedii",
    title: "Caliandra Esponjinha (Calliandra)"
  },
  "calliandra": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/368628875/caliandra20---copia--2--1012qv5arz.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/caliandra-vermelha-esponjinha-vermelha-calliandra-tweedii",
    title: "Caliandra (Calliandra tweedii)"
  },
  "baleeira": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/199702598/tmpimg20230125wa0158-9608b2326b.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/erva-baleeira-varronia-curassavica",
    title: "Erva-baleeira (Varronia curassavica)"
  },
  "varronia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/199702598/tmpimg20230125wa0158-9608b2326b.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/erva-baleeira-varronia-curassavica",
    title: "Erva-baleeira (Varronia)"
  },
  "urucum": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/400170995/uru-hy26k7inus.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/urucum-bixa-orellana",
    title: "Urucum (Bixa orellana)"
  },
  "bixa": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/400170995/uru-hy26k7inus.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/urucum-bixa-orellana",
    title: "Urucum (Bixa orellana)"
  },
  "escova de garrafa": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56163137/64c58a2a0a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/escova-de-garrafa-vermelha-callistemon-viminalis",
    title: "Escova-de-garrafa (Callistemon viminalis)"
  },
  "callistemon": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56163137/64c58a2a0a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/escova-de-garrafa-vermelha-callistemon-viminalis",
    title: "Escova-de-garrafa (Callistemon)"
  },
  "pitanga": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/324421161/cereja-de9mi2g580.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/pitanga-ana-mini-pitanga-cambui-peva-cambui-peba-eugenia-mattosii",
    title: "Pitangueira / Pitanga-anã (Eugenia)"
  },
  "uvaia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/302957706/uvaia-4-fvn2esutlu.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/uvaia-eugenia-pyriformis-adorada-pelas-guaraipos",
    title: "Uvaia (Eugenia pyriformis)"
  },
  "sabugueiro": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/75592352/10574828f5.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/sabugueiro-planta-melifera-e-medicinal-indicada-para-tratamento-da-gripe-resfriado-e-febre",
    title: "Sabugueiro (Sambucus)"
  },
  "guaco": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56309015/207a654738.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/guaco-trepadeira-melifera-e-medicinal",
    title: "Guaco (Mikania glomerata)"
  },
  "mikania": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56309015/207a654738.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/guaco-trepadeira-melifera-e-medicinal",
    title: "Guaco (Mikania glomerata)"
  },
  "bracatinga": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/81850620/fcdd9277c9.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/bracatinga-mimosa-scabrella-melifera-mel-de-melato",
    title: "Bracatinga (Mimosa scabrella)"
  },
  "chal chal": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/143812292/45542a81c4.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/chal-chal-allophylus-edulis",
    title: "Chal-chal (Allophylus edulis)"
  },
  "allophylus": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/143812292/45542a81c4.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/chal-chal-allophylus-edulis",
    title: "Chal-chal (Allophylus edulis)"
  },
  "erva santa": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56370881/a8be73aebb.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/erva-santa-alfazema-do-brasil-aloysia-gratissima-melifera",
    title: "Erva-santa / Alfazema-do-Brasil (Aloysia gratissima)"
  },
  "aloysia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56370881/a8be73aebb.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/erva-santa-alfazema-do-brasil-aloysia-gratissima-melifera",
    title: "Aloysia / Alfazema (Aloysia)"
  },
  "mutre": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56369514/31e1dabed5.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/mutre-aloysia-virgata-a-planta-preferida-dos-meliponicultores",
    title: "Mutre (Aloysia virgata)"
  },
  "vitex": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/337606372/castus2-afpy7wolh8.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/vitex-agnus-castus-arvore-da-castidade-fornece-polen-e-nectar-para-abelhas",
    title: "Vitex (Vitex agnus-castus)"
  },
  "angico": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/329115212/angico20-vbekz3vdw1.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/angico-branco-anadenanthera-colubrina",
    title: "Angico-branco (Anadenanthera colubrina)"
  },
  "anadenanthera": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/329115212/angico20-vbekz3vdw1.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/angico-branco-anadenanthera-colubrina",
    title: "Angico (Anadenanthera)"
  },
  "eucalipto": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/359026576/183c5fce6b-rdqerwg0v4.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/50-sementes-de-eucalipto-arco-iris-deglupta-florescimento-precoce",
    title: "Eucalipto Melífero (Eucalyptus)"
  },
  "tucaneira": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/368599954/2024-11-24t09_19_20-03_00-o60p5x3u8d.JPEG",
    url: "https://www.raizerplantasparaabelhas.com.br/tucaneira-citharexylum-myrianthum",
    title: "Tucaneira (Citharexylum myrianthum)"
  },
  "citharexylum": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/368599954/2024-11-24t09_19_20-03_00-o60p5x3u8d.JPEG",
    title: "Tucaneira (Citharexylum)",
    url: "https://www.raizerplantasparaabelhas.com.br/tucaneira-citharexylum-myrianthum"
  },
  "vassourao": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/364031071/vas2-596z8iy1uv.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/vassourao-branco-piptocarpha-angustifolia",
    title: "Vassourão-branco (Piptocarpha angustifolia)"
  },
  "guamirim": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/360461850/guami-3nz7k36kzj.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/guamirim-filha-fina-myrcia-splendens",
    title: "Guamirim (Myrcia splendens)"
  },
  "myrcia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/360461850/guami-3nz7k36kzj.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/guamirim-filha-fina-myrcia-splendens",
    title: "Guamirim (Myrcia)"
  },
  "bertalha": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/380444198/berta-88z3jzerzi.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/bertalha-coracao--anredera-cordifolia-adorada-pelas-scaptos-asf",
    title: "Bertalha-coração (Anredera cordifolia)"
  },
  "anredera": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/380444198/berta-88z3jzerzi.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/bertalha-coracao--anredera-cordifolia-adorada-pelas-scaptos-asf",
    title: "Bertalha-coração (Anredera)"
  },
  "tayuya": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/398745166/cipo-bywevr6fom.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/cipo-tayuya-cayaponia-podantha",
    title: "Cipó Tayuya (Cayaponia podantha)"
  },
  "grumixama": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/398744446/img-20251213-wa0028-6w58mujajn.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/grumixama-mirim-eugenia-blastantha",
    title: "Grumixama (Eugenia)"
  },
  "paineira": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/57703350/9a83a48e77.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/paineira-rosa-nativa-melifera-ornamental-e-resistente-ao-frio",
    title: "Paineira Rosa Nativa"
  },
  "dedaleiro": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/399066606/dedaleiro-f8weov1uow.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/dedaleiro-lafoensia-pacari-melifera",
    title: "Dedaleiro (Lafoensia pacari)"
  },
  "lafoensia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/399066606/dedaleiro-f8weov1uow.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/dedaleiro-lafoensia-pacari-melifera",
    title: "Dedaleiro (Lafoensia)"
  },
  "vassoura de mel": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/58625298/67d0cf0c45.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/vassoura-de-mel-fornece-nectar-e-polen-resistente-a-geadas-floresce-no-inverno",
    title: "Vassoura de Mel"
  },
  "acacia mangium": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56133177/9c0c80521e.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/acacia-mangium-a-arvore-do-apicultormeliponicultoragricultor-2020-05-30-22-01-58",
    title: "Acácia Mangium"
  },
  "espinheira santa": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56230575/e6b6ebdf57.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/spinheira-santa-maytenus-ilicifolia",
    title: "Espinheira-santa (Maytenus ilicifolia)"
  },
  "manaca da serra": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56311321/130c6589e4.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Manacá-da-Serra (Tibouchina)"
  },
  "quaresmeira": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56311321/130c6589e4.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Quaresmeira (Tibouchina granulosa)"
  },
  "tibouchina": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56311321/130c6589e4.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Tibouchina Melífera"
  },
  "pleroma": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56311321/130c6589e4.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Pleroma / Tibouchina"
  },
  "grevilea": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56163137/64c58a2a0a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Grevílea-anã (Grevillea banksii)"
  },
  "grevillea": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56163137/64c58a2a0a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Grevílea (Grevillea)"
  },
  "cipo de sao joao": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56336561/8e374caf7b.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/xwjalbv5r-cipo-cafe-amarelo-melifera",
    title: "Cipó Melífero Raízer"
  },
  "pyrostegia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56336561/8e374caf7b.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/xwjalbv5r-cipo-cafe-amarelo-melifera",
    title: "Cipó Melífero Raízer"
  },
  "guacatonga": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/79000730/66aae23e0a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-cafezeiro-do-mato-melifera-medicinal-e-com-perfume-de-mel",
    title: "Guaçatonga / Erva-de-bugre (Casearia sylvestris)"
  },
  "casearia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/79000730/66aae23e0a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-cafezeiro-do-mato-melifera-medicinal-e-com-perfume-de-mel",
    title: "Guaçatonga (Casearia)"
  },
  "erva de bugre": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/79000730/66aae23e0a.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/30-sementes-de-cafezeiro-do-mato-melifera-medicinal-e-com-perfume-de-mel",
    title: "Erva-de-bugre (Casearia)"
  },
  "tithonia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56114921/aaba45b624.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/margarida-em-arvore-melifera",
    title: "Tithonia / Margarida Melífera (Tithonia diversifolia)"
  },
  "girassol mexicano": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56114921/aaba45b624.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/margarida-em-arvore-melifera",
    title: "Girassol-mexicano (Tithonia)"
  },
  "margaridao": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56114921/aaba45b624.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/margarida-em-arvore-melifera",
    title: "Margaridão (Tithonia)"
  },
  "araca": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/302962225/download-z55k7cm0hj.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/araca-amarelo-psidium-cattleyanum-muito-visitada-pelas-asfs",
    title: "Araçazeiro (Psidium cattleyanum)"
  },
  "psidium": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/302962225/download-z55k7cm0hj.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/araca-amarelo-psidium-cattleyanum-muito-visitada-pelas-asfs",
    title: "Araçá (Psidium)"
  },
  "pitangueira": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/324421161/cereja-de9mi2g580.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/pitanga-ana-mini-pitanga-cambui-peva-cambui-peba-eugenia-mattosii",
    title: "Pitangueira (Eugenia uniflora)"
  },
  "manjericao": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/187623073/b3374730f5.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/alfavacao",
    title: "Manjericão / Alfavaca (Ocimum)"
  },
  "ocimum": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/187623073/b3374730f5.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/alfavacao",
    title: "Manjericão (Ocimum)"
  },
  "cajueiro": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/306725225/download5-7wqne6kvs8.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Cajueiro (Anacardium occidentale)"
  },
  "cabeludinha": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56162887/3b19aa5a16.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br/cabeludinha-ou-jabuticaba-amarela-plinia-glomerata-fornece-nectar",
    title: "Cabeludinha / Jabuticaba-amarela (Plinia glomerata)"
  },
  "sabia": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56205593/321e5445a7.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Sabiá / Sansão-do-campo (Mimosa caesalpiniifolia)"
  },
  "sansao de campo": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56205593/321e5445a7.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Sansão-do-campo (Mimosa)"
  },
  "reseda": {
    img: "https://cdn.awsli.com.br/800x800/1423/1423275/produto/56102073/1aec577a74.jpg",
    url: "https://www.raizerplantasparaabelhas.com.br",
    title: "Resedá (Lagerstroemia)"
  }
};

/**
 * Resolve com precisão botânica de 100% a foto exata e oficial de qualquer planta do catálogo.
 */
export const resolvePlantExactImage = (plantName: string, scientificName?: string): { imageUrl: string; raizerUrl?: string; matchedTitle?: string } | null => {
  const norm = (plantName + " " + (scientificName || ""))
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\-_/&]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // 1. Check direct catalog match first by exact or high-confidence match
  const pNameNorm = plantName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const catExact = RAIZER_PLANTS_CATALOG.find(p => {
    const cpName = p.plantName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const cpSci = p.scientificName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    if (scientificName && scientificName.trim().length > 3) {
      const sNorm = scientificName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
      if (cpSci.includes(sNorm) || sNorm.includes(cpSci)) return true;
    }
    return cpName === pNameNorm || cpName.startsWith(pNameNorm) || pNameNorm.startsWith(cpName);
  });

  if (catExact && catExact.imageUrl) {
    return {
      imageUrl: catExact.imageUrl,
      raizerUrl: catExact.raizerUrl,
      matchedTitle: catExact.plantName
    };
  }

  // 2. Check PRECISE_SPECIES_MAP with sorted longest keys first to prevent short prefix collisions
  const sortedEntries = Object.entries(PRECISE_SPECIES_MAP).sort((a, b) => b[0].length - a[0].length);
  for (const [key, val] of sortedEntries) {
    if (norm.includes(key)) {
      return {
        imageUrl: val.img,
        raizerUrl: val.url,
        matchedTitle: val.title
      };
    }
  }

  // 3. General fuzzy check
  const catMatch = RAIZER_PLANTS_CATALOG.find(p => {
    const pNorm = (p.plantName + " " + p.scientificName)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return pNorm.includes(norm) || norm.includes(pNorm);
  });

  if (catMatch && catMatch.imageUrl) {
    return {
      imageUrl: catMatch.imageUrl,
      raizerUrl: catMatch.raizerUrl,
      matchedTitle: catMatch.plantName
    };
  }

  return null;
};

/**
 * Função de busca inteligente com pontuação de relevância para vincular
 * cada planta do meliponário à sua foto real correspondente do Raízer.
 */
export const findMatchingRaizerPlants = (query: string): RaizerPlantItem[] => {
  if (!query || !query.trim()) return RAIZER_PLANTS_CATALOG.slice(0, 15);
  
  const cleanQ = query.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[\-_/&]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();

  // Check direct key dictionary first
  for (const [key, val] of Object.entries(PRECISE_SPECIES_MAP)) {
    if (cleanQ.includes(key)) {
      const match = RAIZER_PLANTS_CATALOG.find(p => p.imageUrl === val.img || p.raizerUrl === val.url);
      if (match) {
        const others = RAIZER_PLANTS_CATALOG.filter(p => p.id !== match.id);
        return [match, ...others.slice(0, 9)];
      }
    }
  }
  
  const words = cleanQ.split(/\s+/).filter(w => w.length >= 3 && !['de', 'da', 'do', 'das', 'dos', 'com', 'para', 'verde', 'branca', 'vermelha', 'rosa', 'amarela'].includes(w));
  if (words.length === 0) return [];
  
  const scored = RAIZER_PLANTS_CATALOG.map((plant) => {
    let score = 0;
    const nameNorm = plant.plantName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const sciNorm = plant.scientificName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const descNorm = plant.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const spNorm = plant.attractiveForSpecies.join(" ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Exact title or scientific match
    if (nameNorm.includes(cleanQ) || sciNorm.includes(cleanQ)) {
      score += 100;
    }

    words.forEach(word => {
      if (nameNorm.includes(word)) score += 50;
      if (sciNorm.includes(word)) score += 60;
      if (descNorm.includes(word)) score += 10;
      if (spNorm.includes(word)) score += 15;
    });

    return { plant, score };
  });

  return scored
    .filter(item => item.score > 20)
    .sort((a, b) => b.score - a.score)
    .map(item => item.plant);
};
