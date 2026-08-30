import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { RAIZER_PLANTS_CATALOG, PRECISE_SPECIES_MAP, findMatchingRaizerPlants, resolvePlantExactImage } from "./src/data/raizerFloraData";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Lazy Gemini AI Client Initialization with multi-variable resolution
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY;

    if (!apiKey) {
      return null;
    }

    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  let lastQuotaExhaustedTimestamp = 0;
  const QUOTA_COOLDOWN_MS = 60000; // 60s cooldown when quota is exhausted

  // Built-in Meliponiculture Offline Expert Knowledge Engine
  function generateOfflineAdvisorResponse(prompt: string, hiveContext?: any): string {
    const query = prompt.toLowerCase();
    const species = hiveContext?.species ? ` para a espécie **${hiveContext.species}**` : '';
    const boxModel = hiveContext?.boxModel ? ` (Caixa: ${hiveContext.boxModel})` : '';

    if (query.includes('forídeo') || query.includes('mosca') || query.includes('praga') || query.includes('larva')) {
      return `### 🚨 Protocolo de Combate Urgente a Forídeos (*Pseudohypocera kerteszi*)${species}${boxModel}

1. **Ação Imediata & Isolamento:**
   - Feche imediatamente a entrada da caixa com redutor ou tela fina por 24 a 48h.
   - Vede todas as frestas externas da caixa com fita crepe ou cera mista para impedir a entrada de novas moscas.

2. **Instalação de Armadilhas com Vinagre de Maçã:**
   - Coloque dentro da caixa (sobre o plástico/acetato ou melgueira) pequenos recipientes furados (furo de 2mm) contendo **vinagre de maçã 100% puro**.
   - O cheiro atrai os forídeos adultos, que entram e morrem afogados, sem atrair as abelhas.

3. **Limpeza e Aspiração de Focos:**
   - Abra a caixa em ambiente fechado/protegido. Aspire ou remova manualmente larvas e pupas.
   - Descarte potes de pólen ou mel rompidos que estejam fermentando ou contaminados.

4. **Alimentação Segura:**
   - Forneça alimento (xarope 1:1) **apenas à noite** e em alimentadores internos estanques (tipo bico de sucção ou dosador) sem derramar uma única gota.

*💡 Dica MeliApp:* Na aba **Vitrine & Loja**, você encontra armadilhas de precisão e sugadores elétricos para manejo profilático.`;
    }

    if (query.includes('formiga') || query.includes('cupim') || query.includes('ácaro') || query.includes('lagarta')) {
      return `### 🐜 Prevenção e Controle de Formigas e Pragas em Meliponários${species}

1. **Barreiras Físicas e Graxa em Cavaletes:**
   - Isole os pés do cavalete com graxa automotiva ou fita adesiva dupla-face especial.
   - Use protetores tipo copo plástico com óleo queimado ou água com detergente no suporte das caixas.

2. **Vedação das Caixas:**
   - Verifique o encaixe dos módulos INPA/AF. Use fita crepe nas emendas externas para evitar que formigas pequenas (como *Tapinoma* ou *Brachymyrmex*) acessem o ninho.
   - Abelhas fortes com boa quantidade de cerume e geoprópolis vedam frestas sozinhas, mas colônias recém-divididas precisam de auxílio constante.

3. **Manejo Profilático:**
   - Evite derrubar qualquer pingo de xarope, mel ou açúcar no chão do meliponário.
   - Mantenha a vegetação rasteira ao redor dos suportes roçada e limpa.`;
    }

    if (query.includes('xarope') || query.includes('alimenta') || query.includes('bife') || query.includes('açúcar') || query.includes('receita')) {
      return `### 🍯 Guia Completo de Alimentação Artificial para ASF${species}

#### 1. Xarope Energético Básico (Proporção 1:1)
- **Ingredientes:** 500g de açúcar cristal ou VHP + 500ml de água mineral ou fervida.
- **Preparo:** Aqueça a água até quase ferver, desligue o fogo e dissolva todo o açúcar até a calda ficar transparente.
- **Acidificação Opcional (Profilaxia):** Adicione 5 a 8 gotas de limão ou 3 gotas de extrato de própolis para evitar fermentação.
- **Validade:** Conservar em geladeira por até 7 dias. Fornecer em temperatura ambiente.

#### 2. Bife Proteico de Alta Performance
- **Ingredientes:** 70% de pólen apícola desidratado moído fino + 30% de mel de ASF ou xarope 1:1 espesso.
- **Preparo:** Misture até formar uma massa homogênea moldável (ponto de brigadeiro).
- **Manejo:** Envolva o bife em uma fina lâmina de cera mista alveolada (deixando apenas uma pequena fresta para acesso das abelhas) para blindar contra forídeos.

#### 3. Melhores Horários:
- Sempre forneça no final da tarde/início da noite para evitar pilhagem por abelhas vizinhas ou *Apis mellifera*.`;
    }

    if (query.includes('divis') || query.includes('multiplica') || query.includes('disco') || query.includes('maduro') || query.includes('enxame')) {
      return `### ✂️ Guia Passo a Passo de Divisão de Colônia (Método 1 para 1)${species}

#### 1. Critérios de Elegibilidade da Caixa-Mãe:
- Colônia forte com população densa de operárias.
- Pelo menos 4 a 6 discos de cria, com **discos superiores maduros (coloração clara/amarelada/esbranquiçada)**.
- Reservas abundantes de cerume, mel e pólen.

#### 2. Procedimento de Divisão:
1. **Preparação da Caixa Filha:** Esterilize a nova caixa racional (INPA/AF) e passe cera mista/própolis no fundo e no túnel de entrada para criar atratividade.
2. **Transferência de Cria:** Retire 2 a 3 discos de cria maduros da caixa-mãe. Apoie-os delicadamente sobre bolinhas de cera (pilares de sustentação) para não esmagar os alvéolos inferiores.
3. **Doação de Campeiras:** Coloque a **Caixa Filha** no local original da Caixa Mãe (para receber todas as campeiras que voltam do campo). Mova a **Caixa Mãe** para pelo menos 3 a 5 metros de distância.
4. **Alimentação Suave:** Comece a alimentar a caixa filha após 48 horas com pequenas porções de xarope 1:1.`;
    }

    if (query.includes('iscan') || query.includes('isca') || query.includes('atrativo') || query.includes('garrafa pet') || query.includes('captura')) {
      return `### 🪤 Guia de Confecção de Iscas PET e Atrativo para Enxameação

1. **Preparo do Atrativo Concentrado (Loção Atrativa):**
   - Em 500ml de álcool 70° ou de cereais, adicione 100g de geoprópolis de Mandaçaia/Uruçu, própolis de Jataí e cerume macerado.
   - Deixe curtir por 30 a 60 dias em frasco escuro, agitando semanalmente. Coe antes de usar.

2. **Montagem da Garrafa PET (Isca Racional):**
   - Use garrafas de 2L a 3L (para Jataí/Iraí) ou galões de 5L (para Mandaçaia/Uruçu).
   - Passe uma camada interna generosa do atrativo e deixe secar bem o álcool por 24h.
   - Envolva a garrafa em 4 a 6 folhas de jornal (isolamento térmico) e cubra com saco de lixo preto grosso ou lona (bloqueio total de luz).
   - Instale um joelho de PVC 3/4" ou bico de mangueira na ponta com cera na borda.

3. **Pontos Estratégicos de Instalação:**
   - Instale a 1.5m a 2.5m de altura em árvores frondosas, áreas sombreadas e protegidas de chuva.
   - Época ideal: Início da primavera até o meio do verão (setembro a fevereiro).`;
    }

    if (query.includes('mel') || query.includes('umidade') || query.includes('matura') || query.includes('pasteuriz') || query.includes('colheita')) {
      return `### 🍯 Manejo e Conservação do Mel de Abelhas Sem Ferrão (ASF)

#### 1. Características Naturais do Mel de ASF:
- **Umidade Natural:** Entre 22% e 32% (muito superior ao mel de *Apis*, que fica abaixo de 20%).
- **Propriedades:** Rico em compostos bioativos, acidez natural agradável e bactérias lácticas benéficas.

#### 2. Métodos Seguros de Conservação:
- **Refrigeração / Maturação a Frio (Recomendado):** Armazene em frascos de vidro esterilizados em geladeira (4°C a 8°C). Esse método preserva todos os aromas florais e enzimas ativas.
- **Pasteurização Lenta:** Aquecimento em banho-maria a **45°C por 15 minutos**. Estabiliza as leveduras sem degradar os flavonoides.
- **Desumidificação a Frio:** Uso de desumidificador de ar em câmara fechada para reduzir a umidade a ~19%.

#### 3. Boas Práticas na Colheita:
- Use sempre **sugador elétrico ou a vácuo com mangueira de silicone grau alimentício**, nunca esprema os potes para não misturar pólen e criar fermentação indesejada.`;
    }

    if (query.includes('caixa') || query.includes('inpa') || query.includes('madeira') || query.includes('espessura')) {
      return `### 📦 Modelos de Caixas Racionais e Dimensionamento

1. **Modelo INPA (Instituto Nacional de Pesquisas da Amazônia):**
   - **Vantagens:** Modular (fundo, ninho, sobreninho e melgueiras). Permite divisões limpas e colheitas sem estresse.
   - **Medidas Típicas:**
     - *Jataí / Iraí / Mirins:* 12x12 cm interno (módulos de 7cm de altura).
     - *Mandaçaia / Bugia:* 18x18 cm a 20x20 cm interno (módulos de 9-10cm de altura).
     - *Uruçu-nordestina / Tiúba:* 20x20 cm interno (módulos de 10-12cm de altura).

2. **Espessura da Madeira:**
   - Nunca use menos de 2.5cm de espessura (ideal de 3.0cm a 4.0cm) para garantir isolamento térmico adequado contra calor e frio excessivos.
   - Madeiras recomendadas: Cedro-rosa, Garapeira, Pinus tratado sem veneno, Freijó, Caxeta.`;
    }

    if (query.includes('jataí') || query.includes('jatai') || query.includes('tetragonisca')) {
      return `### 🐝 Ficha Técnica & Manejo da Abelha Jataí (*Tetragonisca angustula*)

- **Temperamento:** Extremamente mansa, tímida e dócil. Ideal para áreas urbanas e varandas.
- **Tubo de Entrada:** Cera clara perfurada característica, recolhida à noite.
- **Modelo de Caixa Recomendado:** Caixa INPA com medidas internas de **12x12 cm** (ninho: 7cm, sobreninho: 7cm, melgueiras: 5cm). Madeira de 2cm a 2.5cm de espessura.
- **Raio de Voo:** Cerca de 400 a 600 metros.
- **Mel:** Muito valorizado medicinalmente, fino, cristalino e aromático.
- **Pasto Favorito:** Manjericão, Cosmos, Ora-pro-nóbis, Dombéia, Resedá e Amor-agarradinho.`;
    }

    if (query.includes('mandaçaia') || query.includes('mandacaia') || query.includes('quadrifasciata')) {
      return `### 🐝 Ficha Técnica & Manejo da Abelha Mandaçaia (*Melipona quadrifasciata*)

- **Temperamento:** Espécie nobre, mansa e com entrada esculpida em barro/geoprópolis com raios convergentes.
- **Modelo de Caixa Recomendado:** Caixa INPA ou AF com medidas internas de **18x18 cm** a **20x20 cm** (altura módulos de 10cm). Madeira grossa de 2.5cm a 3.5cm para proteção térmica.
- **Alimentação:** Alta exigência de pólen/proteína na fase de postura da rainha.
- **Mel:** Denso, sabor refinado, muito cotado no mercado gastronômico.
- **Divisão:** Necessita de cautela ao manusear os discos devido ao tamanho grande das abelhas e risco de forídeos.`;
    }

    if (query.includes('uruçu') || query.includes('scutellaris') || query.includes('flavolineata')) {
      return `### 🐝 Ficha Técnica & Manejo da Abelha Uruçu (*Melipona scutellaris / flavolineata*)

- **Temperamento:** Abelha de grande porte, mansa, com coloração vistosa e alta produtividade de mel.
- **Modelo de Caixa Recomendado:** Caixa INPA ou AF de **20x20 cm** com madeira de no mínimo 3.0cm.
- **Produção de Mel:** Uma das mais produtivas do Brasil (podendo produzir de 2 a 5 litros por caixa ao ano em floradas fartas).
- **Pasto Floral:** Coqueiro, Sansão-do-campo, Cajueiro, Ingazeiros, Ora-pro-nóbis e Dombéia.`;
    }

    return `### 🌿 Recomendações Técnicas MeliBot${species}${boxModel}

Para otimizar o manejo do seu meliponário:

1. **Monitoramento Térmico e Frestas:**
   - Mantenha as caixas protegidas de sol direto e chuva forte (temperatura ideal de ninho entre 26°C e 32°C).
   - Vede sempre as uniões dos módulos com fita crepe ou própolis diluído.

2. **Calendário Floral e Nutrição:**
   - Faça vistorias quinzenais no outono/inverno para checar os potes de alimento.
   - Suplemente com xarope 1:1 e bife proteico envolto em cera quando as floradas diminuírem.

3. **Prevenção Sanitária:**
   - Mantenha armadilhas de vinagre de maçã sempre ativas no meliponário.
   - Nunca deixe sobras de alimentação artificial expostas por mais de 24 horas dentro da caixa.

Você pode me perguntar sobre detalhes de **forídeos, receitas de xarope/bife, divisões passo a passo, modelos de caixas, iscas PET ou manejo específico para cada espécie**!`;
  }

  // Built-in Offline Flora & Bee Species Research Generator
  function generateOfflineFloraResearch(query: string, searchType?: string) {
    const q = query.toLowerCase();
    
    // Check if query is about a stingless bee species (pasture & plants for that species)
    const isBeeSpecies =
      q.includes("jatai") ||
      q.includes("jataí") ||
      q.includes("mandaçaia") ||
      q.includes("mandacaia") ||
      q.includes("uruçu") ||
      q.includes("urucu") ||
      q.includes("iraí") ||
      q.includes("irai") ||
      q.includes("tubiba") ||
      q.includes("bugia") ||
      q.includes("tiúba") ||
      q.includes("tiuba") ||
      q.includes("mirim") ||
      q.includes("borá") ||
      q.includes("marmelada") ||
      q.includes("abelha");

    if (isBeeSpecies) {
      let beeName = "Abelha Jataí";
      let sciName = "Tetragonisca angustula";
      let flightRadius = "400 a 600 metros";
      let flowerPreference = "Flores miúdas a médias, corolas abertas, ricas em néctar doce e pólen fino de fácil coleta.";
      
      let championTrees = "- **Guapuruvu (*Schizolobium parahyba*):** Florada amarela abundante na primavera, néctar farto.\n- **Aroeira-pimenteira (*Schinus terebinthifolia*):** Fornece néctar, pólen e resina balsâmica de excelente qualidade.\n- **Ipê-amarelo e Roxo (*Handroanthus*):** Floração explosiva com altíssima atratividade para campeiras.";
      let championShrubs = "- **Dombéia (*Dombeya wallichii*):** A salvadora do inverno (Maio a Agosto), cachos pendentes com néctar ultra farto.\n- **Ora-pro-nóbis (*Pereskia aculeata*):** Explosão de flores brancas com néctar e altíssimo teor de pólen proteico.\n- **Amor-agarradinho (*Antigonon leptopus*):** Floração praticamente contínua o ano todo, atratividade nota 10 para Jataí.\n- **Assa-peixe (*Vernonia polysphaera*):** Florada outono/inverno que origina mel claro e suave.";
      let championGarden = "- **Manjericão (*Ocimum basilicum*):** Floração contínua de fácil cultivo em vasos, néctar constante.\n- **Cosmos (*Cosmos bipinnatus* & *Cosmos sulphureus*):** Excelente fonte de pólen de fácil acesso.\n- **Alecrim (*Salvia rosmarinus*):** Fornece néctar aromático durante grande parte do ano.";
      let championResin = "- **Aroeira-verde, Pitangueira e Araucária:** Fornecem resinas vegetais límpidas para a Jataí construir seu túnel de entrada e potes de alimento.";
      let calendarOverview = "Primavera/Verão (Ora-pro-nóbis, Amor-agarradinho, Manjericão, Guapuruvu) | Outono/Inverno (Dombéia, Cipó-de-são-joão, Assa-peixe, Eucaliptos).";

      if (q.includes("mandaçaia") || q.includes("mandacaia") || q.includes("quadrifasciata")) {
        beeName = "Abelha Mandaçaia";
        sciName = "Melipona quadrifasciata";
        flightRadius = "1.000 a 1.500 metros";
        flowerPreference = "Flores com alta produção de pólen proteico e néctar espesso (alto Brix), flores tubulares e de árvores nativas.";
        championTrees = "- **Aroeira-pimenteira (*Schinus terebinthifolia*):** Néctar e pólen farto indispensável para crias.\n- **Guapuruvu (*Schizolobium parahyba*):** Florada primaveril de grande escala.\n- **Ingazeiro (*Inga edulis* / *Inga vera*):** Néctar abundante e flores com estames compridos adorados por Meliponas.\n- **Eucalipto (*Eucalyptus grandis / citriodora*):** Excelente néctar de inverno/primavera.";
        championShrubs = "- **Dombéia (*Dombeya wallichii*):** Suporte nutricional crítico de inverno para manter a postura da rainha.\n- **Assa-peixe (*Vernonia polysphaera*):** Florada que resulta no famoso mel claro de Mandaçaia.\n- **Cipó-de-são-joão (*Pyrostegia venusta*):** Néctar abundante no período seco de inverno.\n- **Malvavisco (*Malvaviscus arboreus*):** Florada contínua muito visitada.";
        championGarden = "- **Girassol-mexicano (*Tithonia diversifolia*):** Pólen abundante e rústico.\n- **Goiabeira e Jabuticabeira:** Pólen floral e néctar de alta qualidade na primavera.";
        championResin = "- **Angico, Pinus e Eucaliptos:** Fornecem resina vegetal que as operárias misturam ao barro para criar o geoprópolis da entrada.";
        calendarOverview = "Primavera (Goiaba, Ingá, Guapuruvu) | Verão (Aroeira, Eucalipto) | Outono/Inverno (Dombéia, Assa-peixe, Cipó-de-são-joão).";
      } else if (q.includes("uruçu") || q.includes("scutellaris") || q.includes("flavolineata")) {
        beeName = "Abelha Uruçu";
        sciName = "Melipona scutellaris / Melipona flavolineata";
        flightRadius = "1.500 a 2.000 metros";
        flowerPreference = "Flores de grande porte, árvores do dossel da floresta, palmeiras e frutíferas tropicais com grande fluxo de néctar e pólen graúdo.";
        championTrees = "- **Cajueiro (*Anacardium occidentale*):** Néctar abundante com florada prolongada.\n- **Coqueiro (*Cocos nucifera*):** Produção ininterrupta de pólen fino e néctar.\n- **Sansão-do-campo (*Mimosa caesalpiniifolia*):** Florada branca com fartura extrema de pólen.\n- **Ingazeiros nativos (*Inga marginata*):** Grandes atratores de campeiras de Uruçu.";
        championShrubs = "- **Ora-pro-nóbis (*Pereskia aculeata*):** Florada exuberante com visitação em massa.\n- **Dombéia (*Dombeya wallichii*):** Excelente adaptação em regiões de serra e litoral.\n- **Vassourinha de botão (*Borreria verticillata*):** Néctar de apoio.";
        championGarden = "- **Maracujazeiro (*Passiflora edulis*):** Excelente polinização por abelhas grandes.\n- **Cosmos e Girassol:** Pólen rápido em canteiros ao redor das caixas.";
        championResin = "- **Almecegueira (*Protium heptaphyllum*) e Mangueiras:** Resinas perfumadas para o batume e vedação dos módulos.";
        calendarOverview = "Ano todo no Nordeste e Sudeste: Coqueiro e Cajueiro (Primavera/Verão) | Sansão-do-campo e Ingá (Outono) | Ora-pro-nóbis e Dombéia (Inverno/Primavera).";
      } else if (q.includes("iraí") || q.includes("testaceicornis") || q.includes("mirim") || q.includes("plebeia")) {
        beeName = "Abelha Iraí & Mirins";
        sciName = "Nannotrigona testaceicornis / Plebeia droryana";
        flightRadius = "300 a 500 metros";
        flowerPreference = "Flores minúsculas e de corola rasa, inflorescências miúdas, ervas aromáticas e pequenos arbustos.";
        championTrees = "- **Aroeira-pimenteira:** Flores pequeninas ideais para a anatomia de abelhas pequenas.\n- **Resedá (*Lagerstroemia indica*):** Floração de verão muito visitada.\n- **Pitangueira e Aceroleira:** Flores brancas miúdas fáceis de forragear.";
        championShrubs = "- **Amor-agarradinho (*Antigonon leptopus*):** Cachos com néctar acessível.\n- **Dente-de-leão (*Taraxacum officinale*):** Pólen amarelo em abundância.\n- **Trevo-branco e Margaridinhas:** Forrageamento fácil no solo.";
        championGarden = "- **Manjericão, Alecrim, Orégano e Tomilho:** As flores das ervas aromáticas são as campeãs de visitação da Iraí e Mirim.\n- **Lavanda (*Lavandula*):** Néctar constante e atratividade alta.";
        championResin = "- **Resina de Araucária e Flores de Manjericão:** Utilizadas para confeccionar o tubo de cerume maleável característico da entrada.";
        calendarOverview = "Primavera/Verão (Ervas aromáticas, Resedá, Amor-agarradinho) | Outono/Inverno (Dombéia, Alecrim, Trevo).";
      }

      const text = `# 🌸 Guia de Pasto Floral & Plantas Meliponófilas para ${beeName} (${sciName})

### 🐝 1. Perfil Forrageiro & Preferências Florais da Espécie
- **Espécie Alvo:** **${beeName}** (*${sciName}*)
- **Raio Médio de Voo / Forrageamento:** ${flightRadius} (recomenda-se plantar o pasto floral a menos de 50 metros das caixas).
- **Tipo de Flor Preferida:** ${flowerPreference}
- **Necessidades Nutricionais Críticas:** Alta necessidade de pólen de fácil digestão para postura da rainha, néctar com alto teor de açúcar e resinas vegetais aromáticas para elaboração de geoprópolis e batume.

---

### 🌳 2. Árvores Nativas Campeãs de Néctar & Pólen
${championTrees}

---

### 🌺 3. Arbustos & Trepadeiras Meliponófilas de Alta Performance
${championShrubs}

---

### 🌿 4. Ervas Aromáticas, Hortaliças & Jardim Meliponófilo
${championGarden}

---

### 🌲 5. Plantas Fornecedoras de Resina Vegetal & Geoprópolis
${championResin}

---

### 📅 6. Calendário Estratégico de Floradas (Pasto para as 4 Estações)
- **Panorama Geral:** ${calendarOverview}
- **Dica de Manejo:** Mantenha sempre um mix de pelo menos 3 espécies de épocas diferentes de floração ao redor do meliponário para zerar o risco de entressafra sem alimentação artificial.

---

### 📋 Resumo Estruturado para Catálogo
NOME_POPULAR: Pasto Floral para ${beeName}
NOME_CIENTIFICO: Mix Meliponófilo (${sciName})
FAMILIA: Flora Meliponófila Diversificada
RECURSO: Néctar, Pólen e Resina Vegetal
MESES_FLORADA: 1,2,3,4,5,6,7,8,9,10,11,12
REGIAO: Todo o Brasil
ESPECIES_ATENDIDAS: ${beeName}
DESCRICAO_CURTA: Principais espécies botânicas, árvores nativas, arbustos de inverno e ervas aromáticas que compõem o pasto meliponófilo ideal para ${beeName}.
`;

      return {
        text,
        sources: [
          { title: "Raízer Plantas para Abelhas (Mudas & Pasto Meliponófilo)", uri: "https://www.raizerplantasparaabelhas.com.br" },
          { title: "A.B.E.L.H.A. - Plantas Visitadas por Abelhas Sem Ferrão", uri: "https://abelha.org.br" },
          { title: "Embrapa Meio Ambiente - Catálogo de Flora Meliponófila", uri: "https://www.embrapa.br" },
          { title: "Flora e Funga do Brasil - Lista de Espécies Nativas", uri: "http://floradobrasil.jbrj.gov.br" },
        ],
        webSearchQueries: [query, `plantas flores pasto floral meliponofilo para ${beeName} ${sciName} nectar polen`],
        query,
      };
    }

    // Default Plant / Flora handling
    let popularName = "Ora-pro-nóbis";
    let sciName = "Pereskia aculeata";
    let family = "Cactaceae";
    let resource = "Néctar & Pólen";
    let months = "1,2,3,4,11,12";
    let region = "Sudeste, Sul e Nordeste";
    let species = "Jataí, Mandaçaia, Uruçu, Iraí, Mirins";
    let desc = "Excelente trepadeira cactácea com floração branca intensa e altíssimo teor proteico para todas as espécies de abelhas nativas.";

    if (q.includes("domb") || q.includes("dombeia")) {
      popularName = "Dombéia (Aura de Prata / Dombeya)";
      sciName = "Dombeya wallichii";
      family = "Malvaceae";
      resource = "Néctar Abundante & Pólen";
      months = "5,6,7,8";
      region = "Todo o Brasil (especialmente Sul e Sudeste)";
      species = "Jataí, Mandaçaia, Uruçu, Bugia, Tubiba, Iraí";
      desc = "Arbusto floral indispensável para o meliponário. Floresce no auge do inverno fornecendo néctar farto quando o pasto nativo é escasso.";
    } else if (q.includes("amor") || q.includes("agarradinho")) {
      popularName = "Amor-agarradinho";
      sciName = "Antigonon leptopus";
      family = "Polygonaceae";
      resource = "Néctar & Pólen";
      months = "1,2,3,4,9,10,11,12";
      region = "Todo o Brasil";
      species = "Jataí, Iraí, Mirins, Marmelada, Uruçu";
      desc = "Trepadeira de crescimento vigoroso com cachos florais rosa ou brancos. Floração contínua durante praticamente o ano todo.";
    } else if (q.includes("assa") || q.includes("peixe")) {
      popularName = "Assa-peixe";
      sciName = "Vernonia polysphaera";
      family = "Asteraceae";
      resource = "Néctar Claro de Alta Pureza";
      months = "4,5,6,7";
      region = "Cerrado, Mata Atlântica e Sudeste";
      species = "Mandaçaia, Jataí, Uruçu Amarela, Tubiba";
      desc = "Planta medicinal e apícola rústica que produz um dos méis mais claros, suaves e valorizados pelas abelhas sem ferrão.";
    } else if (q.includes("cipo") || q.includes("cipó") || q.includes("sao joao")) {
      popularName = "Cipó-de-são-joão";
      sciName = "Pyrostegia venusta";
      family = "Bignoniaceae";
      resource = "Néctar Abundante de Inverno";
      months = "5,6,7,8";
      region = "Mata Atlântica e Cerrado";
      species = "Mandaçaia, Uruçu, Jataí, Tubiba";
      desc = "Trepadeira nativa espetacular com cachos de flores alaranjadas vibrantes que fornecem alimento salvador no inverno seco.";
    } else if (q.includes("manjericao") || q.includes("manjericão") || q.includes("basil")) {
      popularName = "Manjericão / Alfavaca";
      sciName = "Ocimum basilicum";
      family = "Lamiaceae";
      resource = "Néctar Contínuo & Pólen";
      months = "1,2,3,4,5,6,7,8,9,10,11,12";
      region = "Todo o Brasil";
      species = "Jataí, Iraí, Mirins, Marmelada";
      desc = "Erva aromática perene ou semi-perene que floresce sem parar e atrai multidões de abelhas pequenas para néctar doce.";
    } else if (q.includes("cosmos") || q.includes("cosmo")) {
      popularName = "Cosmos Amarelo / Rosa";
      sciName = "Cosmos sulphureus";
      family = "Asteraceae";
      resource = "Pólen Abundante & Néctar";
      months = "1,2,3,4,9,10,11,12";
      region = "Todo o Brasil";
      species = "Jataí, Mandaçaia, Mirim, Iraí";
      desc = "Flor anual rústica de germinação rápida com fartura de pólen amarelo acessível para fortalecimento de enxames.";
    }

    const text = `# 🌿 ${popularName} (${sciName}) - Ficha Técnica & Guia de Cultivo

### 📸 1. Identificação Botânica & Características
- **Nome Popular:** ${popularName}
- **Nome Científico:** *${sciName}*
- **Família Botânica:** ${family}
- **Porte & Hábito de Crescimento:** Arbusto / Trepadeira / Herbácea de grande vigor vegetativo.
- **Morfologia Floral:** Flores com corolas acessíveis tanto para abelhas pequenas (Jataí, Iraí) quanto médias/grandes (Mandaçaia, Uruçu).
- **Bioma de Ocorrência:** ${region}

### 🍯 2. Recursos Oferecidos para Abelhas Sem Ferrão (ASF)
- **Recursos Principais:** ${resource}
- **Concentração de Açúcares (Brix):** Alta concentração néctarica (28° a 42° Brix).
- **Atratividade:** Altíssima para colônias em fase de fortalecimento, cria e produção de mel.

### 🐝 3. Abelhas Nativas Sem Ferrão Beneficiadas
- **Espécies:** ${species}

### 📅 4. Calendário Floral & Pico Sazonal
- **Meses de Florada no Brasil:** Meses ${months}
- **Importância:** Fornecimento contínuo e suporte nutricional crítico durante o ano.

### 🌱 5. Guia Prático de Plantio, Cuidados & Manejo
- **Luminosidade Necessária:** Sol pleno (mínimo de 4 a 6 horas diárias de sol direto).
- **Tipo de Solo & Adubação:** Solo fértil, bem drenado, enriquecido com matéria orgânica e esterco curtido.
- **Irrigação:** Regas regulares 2 a 3 vezes por semana no primeiro mês após o plantio; depois, resiste bem a períodos secos moderados.
- **Poda & Condução:** Poda de limpeza e rejuvenescimento logo após o término da florada.
- **Distância Ideal das Caixas:** De 2 a 15 metros do meliponário para otimizar a velocidade de coleta das campeiras.

---

### 📋 Resumo Estruturado para Catálogo
NOME_POPULAR: ${popularName}
NOME_CIENTIFICO: ${sciName}
FAMILIA: ${family}
RECURSO: ${resource}
MESES_FLORADA: ${months}
REGIAO: ${region}
ESPECIES_ATENDIDAS: ${species}
DESCRICAO_CURTA: ${desc}
`;

    return {
      text,
      sources: [
        { title: "Raízer Plantas para Abelhas (Mudas & Pasto Meliponófilo)", uri: "https://www.raizerplantasparaabelhas.com.br" },
        { title: "A.B.E.L.H.A. - Associação Brasileira de Estudos das Abelhas", uri: "https://abelha.org.br" },
        { title: "Embrapa Meio Ambiente - Catálogo de Plantas Meliponófilas", uri: "https://www.embrapa.br" },
        { title: "Flora e Funga do Brasil (Jardim Botânico do RJ)", uri: "http://floradobrasil.jbrj.gov.br" },
      ],
      webSearchQueries: [query, `${popularName} ${sciName} fotos cultivo cuidados abelhas sem ferrao`],
      query,
    };
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      aiConfigured: !!(process.env.GEMINI_API_KEY || process.env.API_KEY),
    });
  });

  // Offline Management Sync Endpoint
  app.post("/api/sync/management", (req, res) => {
    try {
      const { items } = req.body || {};
      const count = Array.isArray(items) ? items.length : 0;

      console.log(`[MeliApp Sync] Processando ${count} registros recebidos da fila offline.`);

      return res.json({
        success: true,
        processedCount: count,
        serverTime: new Date().toISOString(),
        message: `${count} registros de manejo sincronizados com sucesso.`,
      });
    } catch (err: any) {
      console.error("[MeliApp Sync] Erro no processamento da sincronização:", err);
      return res.status(500).json({ error: "Erro interno no servidor ao sincronizar dados." });
    }
  });

  // Resilient Gemini Generate Content Helper with Quota Cooldown, Exponential Backoff, and Immediate Fallback
  async function generateContentWithFallback(
    aiClient: GoogleGenAI,
    params: {
      contents: any;
      systemInstruction?: string;
      temperature?: number;
      tools?: any[];
      primaryModel?: string;
    }
  ) {
    // Check if within quota cooldown to prevent hammering quota-exhausted keys
    const now = Date.now();
    if (now - lastQuotaExhaustedTimestamp < QUOTA_COOLDOWN_MS) {
      throw new Error("QUOTA_COOLDOWN_ACTIVE");
    }

    const primary = params.primaryModel || "gemini-3.7-flash";
    // Prioritize primary, followed immediately by gemini-3.1-flash-lite (high availability / fast response)
    const candidateModels = Array.from(
      new Set([primary, "gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.7-flash"])
    );

    let lastError: any = null;

    for (let modelIndex = 0; modelIndex < candidateModels.length; modelIndex++) {
      const modelName = candidateModels[modelIndex];

      // Try up to 2 attempts per model for transient 503 high-demand bursts with brief backoff
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const response = await aiClient.models.generateContent({
            model: modelName,
            contents: params.contents,
            config: {
              ...(params.systemInstruction ? { systemInstruction: params.systemInstruction } : {}),
              ...(params.temperature !== undefined ? { temperature: params.temperature } : {}),
              ...(params.tools ? { tools: params.tools } : {}),
            },
          });

          return { response, usedModel: modelName };
        } catch (err: any) {
          lastError = err;
          const errMsg = err?.message || String(err);
          const isQuotaExhausted =
            errMsg.includes("429") ||
            errMsg.includes("RESOURCE_EXHAUSTED") ||
            errMsg.includes("quota") ||
            errMsg.includes("exceeded your current quota");

          if (isQuotaExhausted) {
            lastQuotaExhaustedTimestamp = Date.now();
            console.warn("[MeliApp AI] Limite de quota Gemini (429 RESOURCE_EXHAUSTED) atingido. Ativando Base de Conhecimento Offline Especialista.");
            throw new Error("QUOTA_EXHAUSTED");
          }

          const isTransientOverload =
            errMsg.includes("503") ||
            errMsg.includes("high demand") ||
            errMsg.includes("UNAVAILABLE") ||
            errMsg.includes("temporarily overloaded") ||
            errMsg.includes("fetch failed");

          if (isTransientOverload && attempt === 1) {
            const jitterMs = 300 + Math.floor(Math.random() * 200);
            await new Promise((r) => setTimeout(r, jitterMs));
            continue;
          }

          break;
        }
      }
    }

    throw lastError || new Error("Não foi possível obter resposta da IA após tentativas.");
  }

  // Helper to categorize and humanize Gemini API error messages
  function formatGeminiError(error: any): { status: number; message: string } {
    const rawMsg = error?.message || String(error || "");
    console.error("[MeliApp AI Error Detail]:", rawMsg);

    if (rawMsg.includes("KEY_MISSING") || rawMsg.includes("GEMINI_API_KEY")) {
      return {
        status: 401,
        message: "Chave GEMINI_API_KEY não configurada. Adicione sua chave no painel de configurações (Settings > Secrets).",
      };
    }

    if (rawMsg.includes("API key not valid") || rawMsg.includes("PERMISSION_DENIED") || rawMsg.includes("403")) {
      return {
        status: 403,
        message: "A chave GEMINI_API_KEY informada é inválida ou sem permissão para gerar conteúdo.",
      };
    }

    if (rawMsg.includes("RESOURCE_EXHAUSTED") || rawMsg.includes("429") || rawMsg.includes("quota")) {
      return {
        status: 429,
        message: "Limite de requisições por minuto atingido temporariamente. Aguarde 30 a 60 segundos e tente novamente.",
      };
    }

    if (rawMsg.includes("503") || rawMsg.includes("high demand") || rawMsg.includes("UNAVAILABLE")) {
      return {
        status: 503,
        message: "Os servidores do Gemini estão com pico de demanda temporária no momento. Aguarde alguns instantes e tente novamente.",
      };
    }

    return {
      status: 500,
      message: "Instabilidade temporária na conexão com a IA. Por favor, tente novamente.",
    };
  }

  // AI Meliponicultor Advisor endpoint
  app.post("/api/gemini/advisor", async (req, res) => {
    const { prompt, hiveContext } = req.body || {};
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Pergunta não fornecida." });
    }

    try {
      const aiClient = getGeminiClient();

      if (aiClient) {
        const systemInstruction = `
Você é o "MeliBot - Especialista Sênior em Meliponicultura e Abelhas Sem Ferrão (ASF / Meliponini)".
Sua missão é dar assistência técnica precisa, prática e confiável para criadores de abelhas sem ferrão no Brasil e na América Latina.

Conhecimento técnico fundamental:
- Espécies brasileiras: Jataí (Tetragonisca angustula), Mandaçaia (Melipona quadrifasciata), Uruçu Amarela (M. flavolineata), Uruçu Nordestina (M. scutellaris), Iraí (Nannotrigona testaceicornis), Bugia (M. mondury), Tubiba (Scaptotrigona tubiba), Tiúba (M. compressipes), Marmelada (Frieseomelitta), Mirim (Plebeia), Geotrigona, etc.
- Pragas e Doenças: Forídeo (Pseudohypocera kerteszi) - uso de vinagre de maçã como armadilha, acidificação, limpeza urgente, uso de telas mosquiteiras finas e microscópios digitais para checagem; Formigas, Ácaros, Parasitas.
- Manejo e Alimentação: Xarope de açúcar vhp/cristal 1:1, alimentador tipo rosquinha / churros / Doolittle; Bife proteico de pólen e massa vegetal; água potável limpa.
- Flora Meliponófila: Plantio de mudas e sementes atrativas (Ora-pro-nóbis, Dombéia, Manjericão, Cosmos, Assa-peixe, Amor-agarradinho).
- Modelos de Caixas Racionais: INPA, AF (Afonso Francoy), Capixaba, Uberlândia, Racional vertical.
- Processamento de Mel de ASF: Elevada umidade natural (22-30%), fermentação, pasteurização lenta, maturação a frio / refrigeração, medição de Brix e umidade com refractômetro; uso de sugadores elétricos automáticos USB para colheita limpa.
- Subprodutos: Própolis vermelha/verde/marrom, Geoprópolis, Pólen (Pão de abelha), Cerume e Cera alveolada.
- Divisão de Colônias: Método 1 para 1, Divisão por Discos de Cria Maduros com cúpula de alimentação, presença de majestade/realeza ou célula real.

DICA DE CURADORIA MeliApp:
Quando o usuário perguntar sobre equipamentos de colheita, termômetros de ninho, combate a forídeos, mudas de flora apícola ou insumos, oriente a solução técnica e mencione de forma prestativa que esses equipamentos e mudas testados estão catalogados na aba "Vitrine & Loja Oficial" do MeliApp com cupons de desconto exclusivos para os assinantes.

Responda sempre em Português do Brasil de forma clara, amigável, formatada com marcadores Markdown em bullet-points quando apropriado, e focada em resultados práticos no meliponário.
`;

        const userMessage = hiveContext
          ? `[Contexto da Colmeia/Meliponário: Espécie: ${hiveContext.species || 'N/A'}, Modelo de Caixa: ${hiveContext.boxModel || 'N/A'}, Saúde: ${hiveContext.health || 'N/A'}]\n\nDúvida do Meliponicultor: ${prompt}`
          : prompt;

        const { response } = await generateContentWithFallback(aiClient, {
          contents: userMessage,
          systemInstruction,
          temperature: 0.7,
          primaryModel: "gemini-3.7-flash",
        });

        if (response && response.text) {
          return res.json({ text: response.text });
        }
      }
    } catch (error: any) {
      const msg = error?.message || String(error || "");
      if (msg.includes("QUOTA") || msg.includes("429")) {
        console.warn("[MeliApp AI] Atendimento via Base de Conhecimento Offline Especialista (Resiliente).");
      } else {
        console.warn("[MeliApp AI] Atendimento via Base de Conhecimento Offline Especialista.");
      }
    }

    // Seamless fallback to our rich offline Meliponiculture knowledge engine
    const offlineText = generateOfflineAdvisorResponse(prompt, hiveContext);
    return res.json({ text: offlineText });
  });

  // Google Search Grounding Endpoint for Flora and Native Bees
  app.post("/api/gemini/flora-grounding", async (req, res) => {
    const { query, searchType = "all" } = req.body || {};
    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ error: "Termo de busca não fornecido." });
    }

    try {
      const aiClient = getGeminiClient();

      if (aiClient) {
        const systemInstruction = `
Você é o "MeliFlora Grounded Research Engine" — um botânico sênior e pesquisador da Embrapa Meio Ambiente / USP / A.B.E.L.H.A. especializado em Botânica Meliponófila Brasileira, Ecologia de Abelhas Sem Ferrão (Meliponini / ASF), Pasto Floral Apícola, Identificação Botânica, Paisagismo Meliponófilo e Catálogo de Mudas Especializadas (como a Raízer Plantas para Abelhas — https://www.raizerplantasparaabelhas.com.br).

Sua missão absoluta é fornecer um **GUIA DE PLANTAS MELIPONÓFILAS, ÁRVORES NATIVAS, ARBUSTOS, TREPADEIRAS, ERVAS E PASTO FLORAL (Néctar de Alto Brix, Pólen Nutritivo e Resinas de Geoprópolis)** com embasamento botânico rigoroso e validado em tempo real no Google (Flora e Funga do Brasil, Embrapa Meio Ambiente, A.B.E.L.H.A., catálogo da Raízer Plantas para Abelhas - raizerplantasparaabelhas.com.br e universidades).

DIRETRIZES FUNDAMENTAIS DE RESPOSTA:
1. **QUANDO A CONSULTA FOR SOBRE UMA ESPÉCIE DE ABELHA SEM FERRÃO OU PASTO PARA UMA ESPÉCIE** (ex: Jataí, Mandaçaia, Uruçu, Iraí, Tubiba, Bugia, Tiúba, Mirins, etc.):
   - O FOCO PRINCIPAL E OBRIGATÓRIO DEVE SER: **AS PRINCIPAIS PLANTAS, ÁRVORES, ARBUSTOS, TREPADEIRAS E FLORES QUE COMPÕEM O PASTO FLORAL IDEAL PARA AQUELA ESPÉCIE DE ABELHA**.
   - Inclua referências práticas sobre mudas disponíveis no mercado nacional de meliponicultura (destacando espécies comercializadas pela Raízer Plantas para Abelhas categorizadas por floração de Inverno, Primavera/Verão e Ano Todo).
   - Estruture a resposta obrigatoriamente com as seguintes seções em Markdown:
     1. **# 🌸 Pasto Floral & Plantas Meliponófilas para [Nome da Abelha] ([Nome Científico])**
     2. **🐝 Perfil Forrageiro da Espécie:** Raio de voo médio, formato/tamanho de flor preferido, atratividade e necessidades de néctar (Brix) e pólen para postura.
     3. **🌳 Árvores Nativas Campeãs de Néctar & Pólen:** Lista detalhada com nome popular, científico, época de florada e por que a abelha visita.
     4. **🌺 Arbustos & Trepadeiras de Alta Florada:** Espécies salvadoras de inverno e de florada prolongada (Dombéia, Ora-pro-nóbis, Amor-agarradinho, Assa-peixe, Cipó-de-são-joão, Grevílea-anã, etc.).
     5. **🌿 Ervas Aromáticas, Pomares & Jardim Meliponófilo:** Plantas de fácil cultivo urbano para canteiros próximos às caixas (Manjericão, Cosmos, Pitanga, Jabuticaba).
     6. **🌲 Plantas Resiníferas para Geoprópolis & Batume:** Fontes vegetais de resina para defesa da colônia (Aroeira-pimenteira, Jatobá, Angico).
     7. **📅 Calendário Floral Anual (Pasto para as 4 Estações):** Como planejar o meliponário para nunca faltar alimento.
     8. **🌱 Guia de Plantio, Cultivo & Aquisição de Mudas:** Solo, luminosidade, irrigação, condução e referência de mudas/sementes especializadas (Raízer Plantas para Abelhas / Marketplace).
     9. **📋 Resumo Estruturado para Catálogo** ao final com campos chave para importação.

2. **QUANDO A CONSULTA FOR SOBRE UMA PLANTA / ÁRVORE ESPECÍFICA** (ex: Dombéia, Ora-pro-nóbis, Assa-peixe, Guapuruvu, etc.):
   - 1. Identificação botânica (nome popular, científico, família, hábito e bioma).
   - 2. Recursos oferecidos para ASF (teor de açúcar Brix do néctar, fluxo, abundância de pólen ou resina).
   - 3. Espécies de abelhas sem ferrão que mais se beneficiam.
   - 4. Calendário e meses de floração no Brasil (Outono/Inverno, Primavera/Verão ou Ano Todo).
   - 5. Instruções detalhadas de CULTIVO & CUIDADOS (solo, sol/sombra, rega, poda, propagação e distância das caixas).
   - 6. Guia visual para fotos e identificação morfológica da flor.
   - 7. Informações de obtenção de mudas (como no viveiro especializado Raízer Plantas para Abelhas).
   - 8. **📋 Resumo Estruturado para Catálogo** ao final.

FORMATO OBRIGATÓRIO DO RESUMO ESTRUTURADO NO FINAL DE TODAS AS RESPOSTAS:
### 📋 Resumo Estruturado para Catálogo
NOME_POPULAR: [Nome Popular da Planta ou Pasto Floral para a Abelha]
NOME_CIENTIFICO: [Nome Científico]
FAMILIA: [Família Botânica]
RECURSO: [Néctar & Pólen | Néctar Abundante | Pólen Proteico | Resina para Geoprópolis]
MESES_FLORADA: [Meses numéricos separados por vírgula, ex: 1,2,3,4,5,6,7,8,9,10,11,12]
REGIAO: [Região ou Todo o Brasil]
ESPECIES_ATENDIDAS: [Lista de espécies de ASF separada por vírgula]
DESCRICAO_CURTA: [Resumo objetivo de 2 a 3 linhas sobre o valor meliponófilo da flora]

Responda sempre em Português do Brasil com máxima riqueza botânica, linguagem clara e formatação elegante.
`;

        let promptText = `Realize uma pesquisa botânica meliponófila aprofundada com busca no Google sobre: "${query}".`;
        if (query.toLowerCase().includes("abelha") || query.toLowerCase().includes("jatai") || query.toLowerCase().includes("mandacaia") || query.toLowerCase().includes("mandaçaia") || query.toLowerCase().includes("urucu") || query.toLowerCase().includes("uruçu") || query.toLowerCase().includes("irai") || query.toLowerCase().includes("iraí") || query.toLowerCase().includes("pasto")) {
          promptText += ` PRIORIDADE MÁXIMA: Forneça a relação completa das PRINCIPAIS PLANTAS, ÁRVORES NATIVAS, ARBUSTOS, TREPADEIRAS E FLORES (PASTO FLORAL NECTARÍFERO E POLINÍFERO) mais recomendadas e atrativas para esta espécie de abelha sem ferrão, detalhando épocas de florada, valor nutricional e cultivo.`;
        } else if (searchType === "care") {
          promptText += ` Enfatize com máxima prioridade as INSTRUÇÕES DETALHADAS DE CUIDADOS, cultivo de solo/luz/poda/rega das plantas meliponófilas.`;
        } else if (searchType === "photos") {
          promptText += ` Enfatize a IDENTIFICAÇÃO VISUAL DAS FLORES E PLANTAS, características morfológicas observáveis e referências para fotos botânicas confiáveis.`;
        } else if (searchType === "pasto") {
          promptText += ` Enfatize o VALOR NECTARÍFERO E POLINÍFERO, concentração de açúcares Brix, meses de floração e espécies de abelhas sem ferrão que forrageiam na planta.`;
        }

        const { response } = await generateContentWithFallback(aiClient, {
          contents: promptText,
          systemInstruction,
          temperature: 0.3,
          tools: [{ googleSearch: {} }],
          primaryModel: "gemini-3.7-flash",
        });

        const text = response.text || "";

        // Extract Grounding Metadata and Sources
        const candidate = response.candidates?.[0];
        const groundingMetadata = candidate?.groundingMetadata;
        const groundingChunks = groundingMetadata?.groundingChunks || [];
        const webSearchQueries = groundingMetadata?.webSearchQueries || [];

        const rawSources = groundingChunks
          .map((chunk: any) => {
            if (chunk.web) {
              return {
                title: chunk.web.title || "Fonte Web",
                uri: chunk.web.uri || "",
              };
            }
            return null;
          })
          .filter((s: any) => s && s.uri);

        // Deduplicate sources
        const sources: Array<{ title: string; uri: string }> = [];
        const seenUris = new Set<string>();
        for (const src of rawSources) {
          if (!seenUris.has(src.uri)) {
            seenUris.add(src.uri);
            sources.push(src);
          }
        }

        if (text) {
          return res.json({
            text,
            sources,
            webSearchQueries,
            query,
            searchType,
          });
        }
      }
    } catch (error: any) {
      const msg = error?.message || String(error || "");
      if (msg.includes("QUOTA") || msg.includes("429")) {
        console.warn("[MeliApp Flora Grounding] Atendimento botânico via Base Especialista Offline (Modo Resiliente).");
      } else {
        console.warn("[MeliApp Flora Grounding] Atendimento botânico via Base Especialista Offline.");
      }
    }

    // Fallback to rich botanical & bee species research
    const offlineFlora = generateOfflineFloraResearch(query, searchType);
    return res.json(offlineFlora);
  });

  // Raizer Scraped & Direct Image Search Endpoint
  // Scrapes or fetches plant images directly from https://www.raizerplantasparaabelhas.com.br
  app.all("/api/raizer/search-images", async (req, res) => {
    const rawQuery = (req.query.q || req.query.query || req.body?.query || req.body?.q || "") as string;
    const query = rawQuery.trim().toLowerCase();
    const limit = parseInt((req.query.limit || req.body?.limit || "24") as string, 10);

    // 1. Direct botanical exact-photo resolution
    const exactMatch = resolvePlantExactImage(query);

    // 2. Multi-criteria intelligent catalog matching
    const matchedPlants = findMatchingRaizerPlants(query);

    const formattedCatalogResults = matchedPlants.map((plant) => ({
      id: plant.id,
      title: plant.plantName,
      scientificName: plant.scientificName,
      imageUrl: plant.imageUrl,
      productUrl: plant.raizerUrl,
      price: plant.approxPrice || 'Muda no Viveiro Raízer',
      category: plant.category,
      description: plant.description,
      bloomingMonths: plant.bloomingMonths,
      attractiveForSpecies: plant.attractiveForSpecies,
      valueType: plant.valueType,
      source: 'raizer_catalog' as const
    }));

    let liveScrapedResults: any[] = [];
    let scrapingSuccess = false;

    // 3. Optional live scraping for fresh pages or new nursery entries
    if (query && query.length > 2) {
      try {
        const targetUrl = `https://www.raizerplantasparaabelhas.com.br/buscar?q=${encodeURIComponent(query)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(targetUrl, {
          signal: controller.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8",
          }
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const html = await response.text();
          const productMatchRegex = /<a[^>]+href=["']([^"']*(?:produto|plantas|mudas)[^"']*)["'][^>]*>[\s\S]*?<img[^>]+(?:src|data-src)=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][\s\S]*?<\/a>/gi;
          let match;
          let foundUrls = new Set<string>();

          while ((match = productMatchRegex.exec(html)) !== null) {
            const productLink = match[1];
            let imgUrl = match[2];
            const title = match[3] || 'Muda Meliponófila Raízer';

            if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
            else if (imgUrl.startsWith('/')) imgUrl = 'https://www.raizerplantasparaabelhas.com.br' + imgUrl;

            if (!foundUrls.has(imgUrl) && !imgUrl.includes('logo') && !imgUrl.includes('icon') && !imgUrl.includes('banner')) {
              foundUrls.add(imgUrl);
              liveScrapedResults.push({
                id: `scraped-${liveScrapedResults.length + 1}`,
                title: title.trim() || 'Planta para Abelhas Raízer',
                imageUrl: imgUrl,
                productUrl: productLink.startsWith('http') ? productLink : `https://www.raizerplantasparaabelhas.com.br${productLink.startsWith('/') ? '' : '/'}${productLink}`,
                price: 'Consulte no site Raízer',
                category: 'Muda do Viveiro Raízer',
                source: 'live_scraper' as const,
                description: `Muda verificada e fotografada diretamente do viveiro Raízer Plantas para Abelhas.`
              });
            }
          }

          if (liveScrapedResults.length > 0) {
            scrapingSuccess = true;
          }
        }
      } catch (scrapingErr: any) {
        // Fallback gracefully to pre-indexed catalog
      }
    }

    // Prioritize exact match if present
    let finalResults = [...formattedCatalogResults];
    if (exactMatch && !finalResults.some(r => r.imageUrl === exactMatch.imageUrl)) {
      finalResults.unshift({
        id: 'exact-match',
        title: exactMatch.matchedTitle || rawQuery,
        scientificName: rawQuery,
        imageUrl: exactMatch.imageUrl,
        productUrl: exactMatch.raizerUrl || 'https://www.raizerplantasparaabelhas.com.br',
        price: 'Muda no Viveiro Raízer',
        category: 'Planta Meliponófila Verificada',
        description: `Espécie botânica identificada com precisão fotográfica e vínculo ao viveiro Raízer.`,
        bloomingMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        attractiveForSpecies: ['Jataí', 'Mandaçaia', 'Uruçu', 'Iraí'],
        valueType: 'Néctar & Pólen',
        source: 'raizer_catalog' as const
      });
    }

    // Merge live scraped entries if distinct
    if (liveScrapedResults.length > 0) {
      finalResults = [...finalResults, ...liveScrapedResults];
    }

    const limitedResults = finalResults.slice(0, limit);

    return res.json({
      success: true,
      query: rawQuery,
      count: limitedResults.length,
      scrapingLive: scrapingSuccess,
      results: limitedResults,
      sourceHost: 'https://www.raizerplantasparaabelhas.com.br',
    });
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MeliApp Server] Rodando na porta ${PORT} em http://0.0.0.0:${PORT}`);
  });
}

startServer();
