import { BeeSpecies } from '../types';

export const COMPREHENSIVE_BEE_SPECIES: BeeSpecies[] = [
  {
    "id": "jatai",
    "popularName": "Jataí",
    "scientificName": "Tetragonisca angustula (Latreille, 1811)",
    "group": "trigona",
    "recommendedBoxModel": "INPA (12x12 cm interno) ou AF",
    "honeyYieldPerYear": "0.8 a 1.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Abelha pequena (4 mm) de coloração amarelo-ouro e pernas escuras com corbícula bem desenvolvida. Constrói tubo de entrada característico de cerume claro rendilhado com pequenos orifícios, que é fechado à noite por uma tela protetora.",
    "honeyMoistureRange": "23% - 27%",
    "avatarBg": "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    "region": "Todo o Brasil",
    "biome": "Mata Atlântica, Cerrado, Caatinga, Amazônia e Pampa",
    "nestingType": "Ocos de árvores, muros de tijolo, mourões de cerca e paredes",
    "swarmingPeriod": "Setembro a Fevereiro (Primavera/Verão)",
    "flightRange": "500m a 800m",
    "imageUrl": "/species/jatai_worker.jpg",
    "entryImageUrl": "/species/jatai_entry.jpg",
    "nestImageUrl": "/species/jatai_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
    "entryPhotoCredit": "Foto: Cristiano Menezes (Tubo de cerume rendilhado - Guia SEAPI RS / Embrapa)",
    "morphologyNotes": "Corpo com 4 mm de comprimento. Cabeça preta com manchas amarelas no clípeo e áreas paroculares inferiores. Mesepisterno (lateral do tórax) preto. Corbícula e ápice das tíbias posteriores pretos. Abdômen amarelo com dorso castanho.",
    "nestEntranceNotes": "Tubo de cerume rendilhado com orifícios circulares pequenos. Coloração clara e translúcida. Sentinelas posicionadas em círculo na borda.",
    "similarSpeciesDiff": {
      "compareWith": "Jataí-do-Sul (Tetragonisca fiebrigi)",
      "description": "Diferencia-se pela coloração do mesepisterno (lateral do tórax) que é preto em T. angustula e amarelo-ferruginoso em T. fiebrigi.",
      "keyPoints": [
        "T. angustula: Mesepisterno preto; porte mais delgado (~4,0 mm).",
        "T. fiebrigi: Mesepisterno amarelo-ferruginoso; porte mais robusto (~4,7 mm) e abdômen alargado."
      ]
    },
    "nome_popular": "Jataí",
    "nome_cientifico": "Tetragonisca angustula (Latreille, 1811)",
    "url_foto_especie": "/species/jatai_worker.jpg",
    "url_foto_entrada": "/species/jatai_entry.jpg",
    "guideImageUrl": "/species/jatai_worker.jpg",
    "url_foto_guia": "/species/jatai_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Mesepisterno preto - Embrapa)",
    "images": {
      "worker": {
        "url": "/species/jatai_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/142232963/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
        "title": "Operária de Jataí",
        "alt": "Operária de Jataí (Tetragonisca angustula (Latreille, 1811))"
      },
      "entry": {
        "url": "/species/jatai_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/151637508/large.jpg",
        "credit": "Foto: Cristiano Menezes (Tubo de cerume rendilhado - Guia SEAPI RS / Embrapa)",
        "title": "Entrada de Jataí",
        "alt": "Pito de entrada do ninho de Jataí"
      },
      "guide": {
        "url": "/species/jatai_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/142232963/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Mesepisterno preto - Embrapa)",
        "title": "Diagnose de Jataí",
        "alt": "Guia morfológico e identificação de Jataí"
      },
      "nest": {
        "url": "/species/jatai_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/151637508/large.jpg",
        "credit": "Foto: Cristiano Menezes (Tubo de cerume rendilhado - Guia SEAPI RS / Embrapa)",
        "title": "Ninho e Entrada de Jataí",
        "alt": "Estrutura e entrada de Jataí"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023), Embrapa & A.B.E.L.H.A.",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 60-61, 102-103; ALVES et al. A.B.E.L.H.A., 2017; FRANCISCO et al., 2014."
  },
  {
    "id": "jatai_fiebrigi",
    "popularName": "Jataí-do-Sul / Yateí / Jataí-do-Chaco",
    "scientificName": "Tetragonisca fiebrigi (Schwarz, 1938)",
    "group": "trigona",
    "recommendedBoxModel": "INPA (12x12 cm interno)",
    "honeyYieldPerYear": "1.0 a 1.8 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Maior e mais robusta que a jataí comum (4,7 mm). Apresenta a porção lateral do tórax (mesepisterno) amarela-ferruginosa e abdômen amarelo-ouro alargado. Típica do Sul do Brasil e bacia do Rio da Prata.",
    "honeyMoistureRange": "22% - 26%",
    "avatarBg": "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
    "region": "Sul e Centro-Oeste (RS, SC, PR, MS)",
    "biome": "Mata Atlântica, Pampa, Chaco e Florestas de Araucária",
    "nestingType": "Ocos de árvores, mourões e fendas protegidas",
    "swarmingPeriod": "Outubro a Março",
    "flightRange": "600m a 900m",
    "imageUrl": "/species/jatai_fiebrigi_worker.jpg",
    "entryImageUrl": "/species/jatai_entry.jpg",
    "nestImageUrl": "/species/jatai_entry.jpg",
    "photoCredit": "Foto: Mariano Pairet (Guia SEAPI/DDPA RS)",
    "entryPhotoCredit": "Foto: Mariano Pairet (Entrada rendilhada de cerume claro - SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo com 4,7 mm. Cabeça preta com manchas amarelas. Mesoscuto preto com estria amarela e mesepisterno amarelo-ferruginoso. Abdômen amarelo-ouro intenso e largo.",
    "nestEntranceNotes": "Tubo de cerume rendilhado com pequenos orifícios, muitas vezes com vários tubos em colônias populosas.",
    "similarSpeciesDiff": {
      "compareWith": "Jataí Comum (Tetragonisca angustula)",
      "description": "T. fiebrigi possui o mesepisterno amarelo-ferruginoso e porte visivelmente mais encorpado que T. angustula.",
      "keyPoints": [
        "Mesepisterno amarelo-ferruginoso marcante.",
        "Abdômen mais largo e porte geral superior (4,7 mm vs 4,0 mm)."
      ]
    },
    "nome_popular": "Jataí-do-Sul / Yateí / Jataí-do-Chaco",
    "nome_cientifico": "Tetragonisca fiebrigi (Schwarz, 1938)",
    "url_foto_especie": "/species/jatai_fiebrigi_worker.jpg",
    "url_foto_entrada": "/species/jatai_entry.jpg",
    "guideImageUrl": "/species/jatai_fiebrigi_worker.jpg",
    "url_foto_guia": "/species/jatai_fiebrigi_worker.jpg",
    "guidePhotoCredit": "Foto: Karyne Mello Sarmento (Mesepisterno amarelo - SEAPI/DDPA RS)",
    "images": {
      "worker": {
        "url": "/species/jatai_fiebrigi_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/453365194/large.jpg",
        "credit": "Foto: Mariano Pairet (Guia SEAPI/DDPA RS)",
        "title": "Operária de Jataí-do-Sul / Yateí / Jataí-do-Chaco",
        "alt": "Operária de Jataí-do-Sul / Yateí / Jataí-do-Chaco (Tetragonisca fiebrigi (Schwarz, 1938))"
      },
      "entry": {
        "url": "/species/jatai_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/453365209/large.jpg",
        "credit": "Foto: Mariano Pairet (Entrada rendilhada de cerume claro - SEAPI/DDPA RS)",
        "title": "Entrada de Jataí-do-Sul / Yateí / Jataí-do-Chaco",
        "alt": "Pito de entrada do ninho de Jataí-do-Sul / Yateí / Jataí-do-Chaco"
      },
      "guide": {
        "url": "/species/jatai_fiebrigi_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/453365194/large.jpg",
        "credit": "Foto: Karyne Mello Sarmento (Mesepisterno amarelo - SEAPI/DDPA RS)",
        "title": "Diagnose de Jataí-do-Sul / Yateí / Jataí-do-Chaco",
        "alt": "Guia morfológico e identificação de Jataí-do-Sul / Yateí / Jataí-do-Chaco"
      },
      "nest": {
        "url": "/species/jatai_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/453365209/large.jpg",
        "credit": "Foto: Mariano Pairet (Entrada rendilhada de cerume claro - SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Jataí-do-Sul / Yateí / Jataí-do-Chaco",
        "alt": "Estrutura e entrada de Jataí-do-Sul / Yateí / Jataí-do-Chaco"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & A.B.E.L.H.A.",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 62-63, 102-103; SCHWARZ, 1938; ALVAREZ, 2015."
  },
  {
    "id": "mandacaia_mqq",
    "popularName": "Mandaçaia MQQ (Sul)",
    "scientificName": "Melipona quadrifasciata quadrifasciata Lepeletier, 1836",
    "group": "melipona",
    "recommendedBoxModel": "INPA (15x15 ou 18x18 cm interno)",
    "honeyYieldPerYear": "2.0 a 4.0 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Subespécie nativa e emblemática do Rio Grande do Sul e Sul do Brasil. Corpo robusto (9,1 a 11 mm) de coloração preta com 3 a 4 faixas amarelas contínuas e não interrompidas no dorso do abdômen.",
    "honeyMoistureRange": "25% - 29%",
    "avatarBg": "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700",
    "region": "Sul (RS, SC, PR) e serras do Sudeste",
    "biome": "Mata Atlântica e Floresta com Araucária",
    "nestingType": "Troncos e ocos de árvores vivas a alturas de 1 a 10 metros",
    "swarmingPeriod": "Outubro a Março",
    "flightRange": "1.500m a 2.000m",
    "imageUrl": "/species/mandacaia_mqq_worker.jpg",
    "entryImageUrl": "/species/mandacaia_mqq_entry.jpg",
    "nestImageUrl": "/species/mandacaia_mqq_entry.jpg",
    "photoCredit": "Foto: Dilton Castro & Fernando Kluwe Dias (Guia SEAPI/DDPA RS 2023) / Nicollas Michels",
    "entryPhotoCredit": "Foto: Fernando Kluwe Dias (Entrada com estrias convergentes de barro - SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo com 9,1 a 11 mm. Tórax com pilosidade abundante castanho-enegrecida. Abdômen preto com faixas transversais amarelas contínuas nos segmentos 2º ao 5º nas operárias.",
    "nestEntranceNotes": "Entrada no centro com estrias convergentes radiais de barro e geoprópolis, com abertura estreita por onde passa uma única abelha por vez.",
    "similarSpeciesDiff": {
      "compareWith": "Mandaçaia MQA (Melipona quadrifasciata anthidioides)",
      "description": "A MQQ possui faixas dorsais amarelas totalmente contínuas, enquanto na MQA as faixas são interrompidas no centro dorsal.",
      "keyPoints": [
        "MQQ: 3 a 4 faixas amarelas contínuas no dorso (nativa do Sul).",
        "MQA: Faixas amarelas interrompidas no meio do abdômen."
      ]
    },
    "nome_popular": "Mandaçaia MQQ (Sul)",
    "nome_cientifico": "Melipona quadrifasciata quadrifasciata Lepeletier, 1836",
    "url_foto_especie": "/species/mandacaia_mqq_worker.jpg",
    "url_foto_entrada": "/species/mandacaia_mqq_entry.jpg",
    "guideImageUrl": "/species/mandacaia_mqq_worker.jpg",
    "url_foto_guia": "/species/mandacaia_mqq_worker.jpg",
    "guidePhotoCredit": "Foto: Guia SEAPI/DDPA RS (2023) - Diagnose MQQ com faixas contínuas",
    "images": {
      "worker": {
        "url": "/species/mandacaia_mqq_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/698266958/large.jpg",
        "credit": "Foto: Dilton Castro & Fernando Kluwe Dias (Guia SEAPI/DDPA RS 2023) / Nicollas Michels",
        "title": "Operária de Mandaçaia MQQ (Sul)",
        "alt": "Operária de Mandaçaia MQQ (Sul) (Melipona quadrifasciata quadrifasciata Lepeletier, 1836)"
      },
      "entry": {
        "url": "/species/mandacaia_mqq_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/599878336/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Entrada em estrias convergentes de barro - SEAPI/DDPA RS)",
        "title": "Entrada de Mandaçaia MQQ (Sul)",
        "alt": "Pito de entrada do ninho de Mandaçaia MQQ (Sul)"
      },
      "guide": {
        "url": "/species/mandacaia_mqq_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/698266958/large.jpg",
        "credit": "Foto: Guia SEAPI/DDPA RS (2023) - Diagnose MQQ com faixas contínuas",
        "title": "Diagnose de Mandaçaia MQQ (Sul)",
        "alt": "Guia morfológico e identificação de Mandaçaia MQQ (Sul)"
      },
      "nest": {
        "url": "/species/mandacaia_mqq_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/599878336/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Entrada em estrias convergentes de barro - SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Mandaçaia MQQ (Sul)",
        "alt": "Estrutura e entrada de Mandaçaia MQQ (Sul)"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 32-33, 98-99; ALVAREZ, 2015; NOGUEIRA-NETO, 1970."
  },
  {
    "id": "mandaçaia",
    "popularName": "Mandaçaia MQA",
    "scientificName": "Melipona quadrifasciata anthidioides Lepeletier, 1836",
    "group": "melipona",
    "recommendedBoxModel": "INPA (15x15 ou 18x18 cm)",
    "honeyYieldPerYear": "1.5 a 3.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Porte grande e robusto (9 a 11 mm) com faixas amarelas transversais interrompidas no centro do dorso abdominal. Entrada estriada de barro típica do gênero Melipona.",
    "honeyMoistureRange": "25% - 29%",
    "avatarBg": "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
    "region": "Sudeste e Centro-Sul (SP, RJ, MG, ES, PR)",
    "biome": "Mata Atlântica e Cerrado",
    "nestingType": "Grandes ocos de árvores vivas",
    "swarmingPeriod": "Outubro a Março",
    "flightRange": "1.500m a 2.000m",
    "imageUrl": "/species/mandacaia_mqa_worker.jpg",
    "entryImageUrl": "/species/mandacaia_entry.jpg",
    "nestImageUrl": "/species/mandacaia_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente - Faixas interrompidas)",
    "entryPhotoCredit": "Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo com 9 a 11 mm. Pilosidade castanho-enegrecida no tórax. Abdômen preto com faixas amarelas transversais interrompidas no meio dos tergitos.",
    "nestEntranceNotes": "Estrias convergentes de barro/geoprópolis com orifício central permitindo a passagem de uma abelha por vez.",
    "similarSpeciesDiff": {
      "compareWith": "Mandaçaia MQQ (Melipona quadrifasciata quadrifasciata)",
      "description": "MQA possui faixas amarelas interrompidas; MQQ possui faixas amarelas contínuas.",
      "keyPoints": [
        "MQA: Faixas amarelas interrompidas no abdômen.",
        "MQQ: Faixas amarelas contínuas (típica do Sul)."
      ]
    },
    "nome_popular": "Mandaçaia MQA",
    "nome_cientifico": "Melipona quadrifasciata anthidioides Lepeletier, 1836",
    "url_foto_especie": "/species/mandacaia_mqa_worker.jpg",
    "url_foto_entrada": "/species/mandacaia_entry.jpg",
    "guideImageUrl": "/species/mandacaia_mqa_worker.jpg",
    "url_foto_guia": "/species/mandacaia_mqa_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
    "images": {
      "worker": {
        "url": "/species/mandacaia_mqa_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/117402025/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente - Faixas interrompidas)",
        "title": "Operária de Mandaçaia MQA",
        "alt": "Operária de Mandaçaia MQA (Melipona quadrifasciata anthidioides Lepeletier, 1836)"
      },
      "entry": {
        "url": "/species/mandacaia_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/526190481/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)",
        "title": "Entrada de Mandaçaia MQA",
        "alt": "Pito de entrada do ninho de Mandaçaia MQA"
      },
      "guide": {
        "url": "/species/mandacaia_mqa_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/117402025/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
        "title": "Diagnose de Mandaçaia MQA",
        "alt": "Guia morfológico e identificação de Mandaçaia MQA"
      },
      "nest": {
        "url": "/species/mandacaia_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/526190481/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Mandaçaia MQA",
        "alt": "Estrutura e entrada de Mandaçaia MQA"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 98-99; SCHWARZ, 1948; TEIXEIRA, 2018."
  },
  {
    "id": "guaraipo",
    "popularName": "Guaraipo / Guaraipo-Negra / Pé-de-Pau",
    "scientificName": "Melipona bicolor schencki Gribodo, 1893",
    "group": "melipona",
    "recommendedBoxModel": "INPA (18x18 ou 20x20 cm)",
    "honeyYieldPerYear": "1.5 a 3.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Média",
    "description": "Abelha emblemática do Sul (9 mm). Tórax com pilosidade preta densa e abdômen com abundante pilosidade plumosa dourada no dorso. Nidifica na base dos troncos das grandes árvores.",
    "honeyMoistureRange": "25% - 30%",
    "avatarBg": "bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-400 dark:border-stone-600",
    "region": "Sul (RS, SC, PR) e serras do Sudeste",
    "biome": "Mata de Araucária e Mata Atlântica de Altitude",
    "nestingType": "Base de troncos vivos de grandes árvores (pé-de-pau)",
    "swarmingPeriod": "Novembro a Fevereiro",
    "flightRange": "1.200m a 1.800m",
    "imageUrl": "/species/guaraipo_worker.jpg",
    "entryImageUrl": "/species/guaraipo_entry.jpg",
    "nestImageUrl": "/species/guaraipo_entry.jpg",
    "photoCredit": "Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)",
    "entryPhotoCredit": "Foto: Fernando Kluwe Dias (Entrada com estrias convergentes de barro - SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo preto de ~9 mm. Cabeça com manchas amarelas pálidas. Tórax com pelos pretos abundantes. Abdômen com pelos plumosos dourados no dorso. Asas curtas que não ultrapassam o ápice do abdômen.",
    "nestEntranceNotes": "Entrada no centro com estrias convergentes de barro, localizada próxima ao chão na base dos troncos.",
    "similarSpeciesDiff": {
      "compareWith": "Guarupú (Melipona bicolor bicolor)",
      "description": "A Guaraipo (M. b. schencki) possui pelos do tórax pretos ou castanhos-escuros (típica de altitudes no RS), enquanto a Guarupú (M. b. bicolor) tem pelos ruivos/avermelhados claros no tórax.",
      "keyPoints": [
        "Guaraipo (M. b. schencki): Pelos pretos no tórax (Sul/Altitudes).",
        "Guarupú (M. b. bicolor): Pelos avermelhados/ruivos no tórax (Baixadas)."
      ]
    },
    "nome_popular": "Guaraipo / Guaraipo-Negra / Pé-de-Pau",
    "nome_cientifico": "Melipona bicolor schencki Gribodo, 1893",
    "url_foto_especie": "/species/guaraipo_worker.jpg",
    "url_foto_entrada": "/species/guaraipo_entry.jpg",
    "guideImageUrl": "/species/guaraipo_worker.jpg",
    "url_foto_guia": "/species/guaraipo_worker.jpg",
    "guidePhotoCredit": "Foto: Favízia Freitas de Oliveira & Fernando Kluwe Dias (Corbícula e morfologia)",
    "images": {
      "worker": {
        "url": "/species/guaraipo_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/566914418/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)",
        "title": "Operária de Guaraipo / Guaraipo-Negra / Pé-de-Pau",
        "alt": "Operária de Guaraipo / Guaraipo-Negra / Pé-de-Pau (Melipona bicolor schencki Gribodo, 1893)"
      },
      "entry": {
        "url": "/species/guaraipo_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/308381266/large.jpeg",
        "credit": "Foto: Fernando Kluwe Dias (Entrada com estrias convergentes de barro - SEAPI/DDPA RS)",
        "title": "Entrada de Guaraipo / Guaraipo-Negra / Pé-de-Pau",
        "alt": "Pito de entrada do ninho de Guaraipo / Guaraipo-Negra / Pé-de-Pau"
      },
      "guide": {
        "url": "/species/guaraipo_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/566914418/large.jpg",
        "credit": "Foto: Favízia Freitas de Oliveira & Fernando Kluwe Dias (Corbícula e morfologia)",
        "title": "Diagnose de Guaraipo / Guaraipo-Negra / Pé-de-Pau",
        "alt": "Guia morfológico e identificação de Guaraipo / Guaraipo-Negra / Pé-de-Pau"
      },
      "nest": {
        "url": "/species/guaraipo_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/308381266/large.jpeg",
        "credit": "Foto: Fernando Kluwe Dias (Entrada com estrias convergentes de barro - SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Guaraipo / Guaraipo-Negra / Pé-de-Pau",
        "alt": "Estrutura e entrada de Guaraipo / Guaraipo-Negra / Pé-de-Pau"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. Guia de reconhecimento de abelhas sem ferrão do RS. SEAPI/DDPA, 2023. p. 28-29; NOGUEIRA-NETO, 1970."
  },
  {
    "id": "guarupu",
    "popularName": "Guarupú / Uruçu-Amarela",
    "scientificName": "Melipona bicolor bicolor Lepeletier, 1836",
    "group": "melipona",
    "recommendedBoxModel": "INPA (18x18 ou 20x20 cm)",
    "honeyYieldPerYear": "1.5 a 3.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Média",
    "description": "Subespécie de Melipona bicolor com pilosidade torácica avermelhada/ruiva. Apresenta comportamento poligínico (múltiplas rainhas funcionais na mesma colmeia).",
    "honeyMoistureRange": "25% - 29%",
    "avatarBg": "bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 border-amber-400 dark:border-amber-700",
    "region": "Sul e Sudeste (SP, RJ, PR, SC, RS em baixadas)",
    "biome": "Mata Atlântica de Encosta e Baixada",
    "nestingType": "Base de troncos ocos",
    "swarmingPeriod": "Novembro a Março",
    "flightRange": "1.200m a 1.800m",
    "imageUrl": "/species/guarupu_worker.jpg",
    "entryImageUrl": "/species/guarupu_entry.jpg",
    "nestImageUrl": "/species/guarupu_entry.jpg",
    "photoCredit": "Foto: Tom Wenseleers & Cristiano Menezes (Embrapa / SEAPI RS)",
    "entryPhotoCredit": "Foto: Guilherme A. Fischer (Entrada de barro estriada)",
    "morphologyNotes": "Corpo de 9 mm com pelos ruivos-alaranjados muito evidentes no tórax e abdômen escuro.",
    "nestEntranceNotes": "Entrada de barro estriado na base de troncos ocos.",
    "similarSpeciesDiff": {
      "compareWith": "Guaraipo (Melipona bicolor schencki)",
      "description": "Guarupú possui pelos ruivos/avermelhados no tórax, enquanto Guaraipo possui pelos pretos.",
      "keyPoints": [
        "Guarupú: Pelos ruivos/avermelhados no tórax.",
        "Guaraipo: Pelos pretos/castanhos escuros no tórax."
      ]
    },
    "nome_popular": "Guarupú / Uruçu-Amarela",
    "nome_cientifico": "Melipona bicolor bicolor Lepeletier, 1836",
    "url_foto_especie": "/species/guarupu_worker.jpg",
    "url_foto_entrada": "/species/guarupu_entry.jpg",
    "guideImageUrl": "/species/guarupu_worker.jpg",
    "url_foto_guia": "/species/guarupu_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
    "images": {
      "worker": {
        "url": "/species/guarupu_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/60841607/large.jpg",
        "credit": "Foto: Tom Wenseleers & Cristiano Menezes (Embrapa / SEAPI RS)",
        "title": "Operária de Guarupú / Uruçu-Amarela",
        "alt": "Operária de Guarupú / Uruçu-Amarela (Melipona bicolor bicolor Lepeletier, 1836)"
      },
      "entry": {
        "url": "/species/guarupu_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/128804280/large.jpeg",
        "credit": "Foto: Guilherme A. Fischer (Entrada de barro estriada)",
        "title": "Entrada de Guarupú / Uruçu-Amarela",
        "alt": "Pito de entrada do ninho de Guarupú / Uruçu-Amarela"
      },
      "guide": {
        "url": "/species/guarupu_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/60841607/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
        "title": "Diagnose de Guarupú / Uruçu-Amarela",
        "alt": "Guia morfológico e identificação de Guarupú / Uruçu-Amarela"
      },
      "nest": {
        "url": "/species/guarupu_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/128804280/large.jpeg",
        "credit": "Foto: Guilherme A. Fischer (Entrada de barro estriada)",
        "title": "Ninho e Entrada de Guarupú / Uruçu-Amarela",
        "alt": "Estrutura e entrada de Guarupú / Uruçu-Amarela"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 96-97; MOURE, 1975; CAMARGO & PEDRO, 2007."
  },
  {
    "id": "manduri",
    "popularName": "Manduri",
    "scientificName": "Melipona torrida Friese, 1916 (Sin: M. obscurior)",
    "group": "melipona",
    "recommendedBoxModel": "INPA (15x15 cm)",
    "honeyYieldPerYear": "1.0 a 2.5 Litros/ano",
    "aggressiveness": "Defensiva",
    "difficulty": "Média",
    "description": "Corpo de ~7 mm com desenhos amarelos na face, tórax com pelos acastanhados e faixas amarelas estreitas no abdômen. Comportamento defensivo beliscando a pele durante o manejo.",
    "honeyMoistureRange": "24% - 28%",
    "avatarBg": "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700",
    "region": "Sul e Sudeste",
    "biome": "Mata Atlântica e Florestas Estacionais",
    "nestingType": "Ocos de troncos de árvores",
    "swarmingPeriod": "Outubro a Fevereiro",
    "flightRange": "1.000m a 1.500m",
    "imageUrl": "/species/manduri_worker.jpg",
    "entryImageUrl": "/species/manduri_entry.jpg",
    "nestImageUrl": "/species/manduri_entry.jpg",
    "photoCredit": "Foto: Betina Blochtein (Guia SEAPI/DDPA RS)",
    "entryPhotoCredit": "Foto: Dilton Castro (Entrada no oco de tronco - SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo com 7 mm. Face com desenhos amarelos, tórax com pilosidade pálido-acastanhada. Abdômen com faixas amarelas estreitas transversais muitas vezes interrompidas.",
    "nestEntranceNotes": "Entrada central de barro com estrias convergentes por onde passa uma abelha por vez.",
    "similarSpeciesDiff": {
      "compareWith": "Mandaçaia (Melipona quadrifasciata)",
      "description": "Manduri é significativamente menor (7 mm vs 9-11 mm) com faixas amarelas bem mais finas e desenhos faciais nítidos.",
      "keyPoints": [
        "Tamanho reduzido (7 mm).",
        "Faixas amarelas estreitas e desenhos faciais marcantes."
      ]
    },
    "nome_popular": "Manduri",
    "nome_cientifico": "Melipona torrida Friese, 1916 (Sin: M. obscurior)",
    "url_foto_especie": "/species/manduri_worker.jpg",
    "url_foto_entrada": "/species/manduri_entry.jpg",
    "guideImageUrl": "/species/manduri_worker.jpg",
    "url_foto_guia": "/species/manduri_worker.jpg",
    "guidePhotoCredit": "Foto: Karyne Mello Sarmento (Guia SEAPI/DDPA RS)",
    "images": {
      "worker": {
        "url": "/species/manduri_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/168553108/large.jpg",
        "credit": "Foto: Betina Blochtein (Guia SEAPI/DDPA RS)",
        "title": "Operária de Manduri",
        "alt": "Operária de Manduri (Melipona torrida Friese, 1916 (Sin: M. obscurior))"
      },
      "entry": {
        "url": "/species/manduri_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/470584868/large.jpeg",
        "credit": "Foto: Dilton Castro (Entrada no oco de tronco - SEAPI/DDPA RS)",
        "title": "Entrada de Manduri",
        "alt": "Pito de entrada do ninho de Manduri"
      },
      "guide": {
        "url": "/species/manduri_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/168553108/large.jpg",
        "credit": "Foto: Karyne Mello Sarmento (Guia SEAPI/DDPA RS)",
        "title": "Diagnose de Manduri",
        "alt": "Guia morfológico e identificação de Manduri"
      },
      "nest": {
        "url": "/species/manduri_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/470584868/large.jpeg",
        "credit": "Foto: Dilton Castro (Entrada no oco de tronco - SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Manduri",
        "alt": "Estrutura e entrada de Manduri"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 30-31; MELO, 2013; MOURE, 1971."
  },
  {
    "id": "tubuna",
    "popularName": "Tubuna",
    "scientificName": "Scaptotrigona bipunctata (Lepeletier, 1836)",
    "group": "trigona",
    "recommendedBoxModel": "INPA ou AF (15x15 ou 18x18 cm)",
    "honeyYieldPerYear": "1.5 a 4.0 Litros/ano",
    "aggressiveness": "Defensiva",
    "difficulty": "Média",
    "description": "Corpo preto de 5,5 mm com asas esfumaçadas escuras. Apresenta muitas cerdas pretas rígidas e longas no dorso do abdômen. Exala aroma característico de coco ao defender o ninho.",
    "honeyMoistureRange": "23% - 27%",
    "avatarBg": "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700",
    "region": "Sul, Sudeste e Centro-Oeste",
    "biome": "Mata Atlântica, Floresta de Araucária e Cerrado",
    "nestingType": "Ocos de árvores vivas",
    "swarmingPeriod": "Setembro a Janeiro",
    "flightRange": "1.000m a 1.500m",
    "imageUrl": "/species/tubuna_worker.jpg",
    "entryImageUrl": "/species/tubuna_entry.jpg",
    "nestImageUrl": "/species/tubuna_entry.jpg",
    "photoCredit": "Foto: Luísa Cristmann (Tíbia e cerdas - Guia SEAPI/DDPA RS)",
    "entryPhotoCredit": "Foto: Cleyton Geuster (Entrada em formato de funil/corneta - SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo com 5,5 mm, preto brilhante, asas e nervuras escuras. Superfície dorsal do abdômen com muitas cerdas rígidas pretas longas e visíveis.",
    "nestEntranceNotes": "Tubo largo de cerume em formato de funil ou corneta, com dezenas de operárias guardiãs na borda.",
    "similarSpeciesDiff": {
      "compareWith": "Canudo (Scaptotrigona depilis) e Irapuá (Trigona spinipes)",
      "description": "Tubuna tem cerdas pretas longas no abdômen e odor de coco; Canudo tem abdômen liso/desnudo; Irapuá tem pernas posteriores alaranjadas e ninho aéreo externo.",
      "keyPoints": [
        "Tubuna: Cerdas pretas longas no abdômen + ninho em oco com corneta + cheiro de coco.",
        "Irapuá: Pernas alaranjadas + ninho aéreo externo exposto em galhos."
      ]
    },
    "nome_popular": "Tubuna",
    "nome_cientifico": "Scaptotrigona bipunctata (Lepeletier, 1836)",
    "url_foto_especie": "/species/tubuna_worker.jpg",
    "url_foto_entrada": "/species/tubuna_entry.jpg",
    "guideImageUrl": "/species/tubuna_worker.jpg",
    "url_foto_guia": "/species/tubuna_worker.jpg",
    "guidePhotoCredit": "Foto: Luísa Cristmann (Dorso abdominal com cerdas rígidas longas - SEAPI/DDPA RS)",
    "images": {
      "worker": {
        "url": "/species/tubuna_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/343694198/large.jpeg",
        "credit": "Foto: Luísa Cristmann (Tíbia e cerdas - Guia SEAPI/DDPA RS)",
        "title": "Operária de Tubuna",
        "alt": "Operária de Tubuna (Scaptotrigona bipunctata (Lepeletier, 1836))"
      },
      "entry": {
        "url": "/species/tubuna_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/343700143/large.jpeg",
        "credit": "Foto: Cleyton Geuster (Entrada em formato de funil/corneta - SEAPI/DDPA RS)",
        "title": "Entrada de Tubuna",
        "alt": "Pito de entrada do ninho de Tubuna"
      },
      "guide": {
        "url": "/species/tubuna_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/343694198/large.jpeg",
        "credit": "Foto: Luísa Cristmann (Dorso abdominal com cerdas rígidas longas - SEAPI/DDPA RS)",
        "title": "Diagnose de Tubuna",
        "alt": "Guia morfológico e identificação de Tubuna"
      },
      "nest": {
        "url": "/species/tubuna_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/343700143/large.jpeg",
        "credit": "Foto: Cleyton Geuster (Entrada em formato de funil/corneta - SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Tubuna",
        "alt": "Estrutura e entrada de Tubuna"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 70-71, 104-105; ENGEL, 2022c; NOGUEIRA-NETO, 1970."
  },
  {
    "id": "canudo",
    "popularName": "Canudo",
    "scientificName": "Scaptotrigona depilis (Moure, 1942)",
    "group": "trigona",
    "recommendedBoxModel": "INPA ou AF (15x15 cm)",
    "honeyYieldPerYear": "2.0 a 5.0 Litros/ano",
    "aggressiveness": "Defensiva",
    "difficulty": "Média",
    "description": "Corpo preto de 6,3 mm com asas claras. O principal caráter diagnóstico é o dorso do abdômen desnudo (sem cerdas rígidas pretas) com plumagem dourada no ápice. Tubo de entrada reto em forma de canudo.",
    "honeyMoistureRange": "23% - 26%",
    "avatarBg": "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700",
    "region": "Sul, Sudeste e Centro-Oeste",
    "biome": "Mata Atlântica e Cerrado",
    "nestingType": "Ocos de árvores",
    "swarmingPeriod": "Setembro a Fevereiro",
    "flightRange": "1.200m a 1.600m",
    "imageUrl": "/species/canudo_worker.jpg",
    "entryImageUrl": "/species/canudo_entry.jpg",
    "nestImageUrl": "/species/canudo_entry.jpg",
    "photoCredit": "Foto: Luísa Cristmann (Guia SEAPI/DDPA RS)",
    "entryPhotoCredit": "Foto: Luísa Cristmann & Elise Toti (Tubo em formato de canudo de cerume - SEAPI RS)",
    "morphologyNotes": "Corpo com 6,3 mm. Falta de cerdas rígidas pretas na superfície do abdômen (dorso liso e desnudo), com tomento dourado no final do abdômen.",
    "nestEntranceNotes": "Tubo reto e cilíndrico em formato de canudo construído de cerume escuro.",
    "similarSpeciesDiff": {
      "compareWith": "Mandaguari-preta (Scaptotrigona postica)",
      "description": "Na Canudo o dorso abdominal é desnudo; na Mandaguari-preta o abdômen é totalmente coberto de cerdas pretas longas e espessas.",
      "keyPoints": [
        "Canudo (S. depilis): Dorso do abdômen liso, sem cerdas pretas + tubo em forma de canudo reto.",
        "Mandaguari (S. postica): Dorso coberto de cerdas pretas longas e espessas."
      ]
    },
    "nome_popular": "Canudo",
    "nome_cientifico": "Scaptotrigona depilis (Moure, 1942)",
    "url_foto_especie": "/species/canudo_worker.jpg",
    "url_foto_entrada": "/species/canudo_entry.jpg",
    "guideImageUrl": "/species/canudo_worker.jpg",
    "url_foto_guia": "/species/canudo_worker.jpg",
    "guidePhotoCredit": "Foto: Luísa Cristmann (Dorso abdominal desnudo sem cerdas - SEAPI/DDPA RS)",
    "images": {
      "worker": {
        "url": "/species/canudo_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/58169475/large.jpg",
        "credit": "Foto: Luísa Cristmann (Guia SEAPI/DDPA RS)",
        "title": "Operária de Canudo",
        "alt": "Operária de Canudo (Scaptotrigona depilis (Moure, 1942))"
      },
      "entry": {
        "url": "/species/canudo_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/357493331/large.jpeg",
        "credit": "Foto: Luísa Cristmann & Elise Toti (Tubo em formato de canudo de cerume - SEAPI RS)",
        "title": "Entrada de Canudo",
        "alt": "Pito de entrada do ninho de Canudo"
      },
      "guide": {
        "url": "/species/canudo_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/58169475/large.jpg",
        "credit": "Foto: Luísa Cristmann (Dorso abdominal desnudo sem cerdas - SEAPI/DDPA RS)",
        "title": "Diagnose de Canudo",
        "alt": "Guia morfológico e identificação de Canudo"
      },
      "nest": {
        "url": "/species/canudo_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/357493331/large.jpeg",
        "credit": "Foto: Luísa Cristmann & Elise Toti (Tubo em formato de canudo de cerume - SEAPI RS)",
        "title": "Ninho e Entrada de Canudo",
        "alt": "Estrutura e entrada de Canudo"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 68-69, 106-107; MOURE, 1942; ENGEL, 2022c."
  },
  {
    "id": "irai",
    "popularName": "Iraí / Jataí-Preta",
    "scientificName": "Nannotrigona testaceicornis (Lepeletier, 1836)",
    "group": "plebeia",
    "recommendedBoxModel": "INPA (12x12 cm interno)",
    "honeyYieldPerYear": "0.4 a 0.9 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Corpo preto de 4 mm com aspecto rugoso/alveolado fosco. Flagelos das antenas claros e escutelo chanfrado em \"W\". Constrói tubo de cerume circular que fecha à noite.",
    "honeyMoistureRange": "22% - 26%",
    "avatarBg": "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    "region": "Sul, Sudeste, Centro-Oeste e Nordeste",
    "biome": "Mata Atlântica, Cerrado e Caatinga",
    "nestingType": "Ocos de árvores, mourões de cerca e paredões de pedra",
    "swarmingPeriod": "Outubro a Fevereiro",
    "flightRange": "400m a 600m",
    "imageUrl": "/species/irai_worker.jpg",
    "entryImageUrl": "/species/irai_entry.jpg",
    "nestImageUrl": "/species/irai_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
    "entryPhotoCredit": "Foto: Cristiano Menezes (Operárias em anel de sentinelas no tubo - SEAPI RS / Embrapa)",
    "morphologyNotes": "Corpo com 4 mm, pontuação densa e profunda no tegumento (aspecto fosco e áspero). Sem manchas na face; linhas amarelas finas no tórax. Escutelo com chanfradura mediana em \"W\". Antenas com flagelos amarelo-claros.",
    "nestEntranceNotes": "Tubo de cerume circular escuro onde as abelhas fazem guarda em círculo perfeito na borda interna durante o dia, fechando à noite com tela rendilhada.",
    "similarSpeciesDiff": {
      "compareWith": "Mirins (Plebeia spp.)",
      "description": "Diferencia-se pelo tegumento fosco alveolado (pontuado) e pelo escutelo com corte em \"W\", ausentes em Plebeia.",
      "keyPoints": [
        "Tegumento áspero/alveolado característico.",
        "Escutelo chanfrado em \"W\" na margem posterior."
      ]
    },
    "nome_popular": "Iraí / Jataí-Preta",
    "nome_cientifico": "Nannotrigona testaceicornis (Lepeletier, 1836)",
    "url_foto_especie": "/species/irai_worker.jpg",
    "url_foto_entrada": "/species/irai_entry.jpg",
    "guideImageUrl": "/species/irai_worker.jpg",
    "url_foto_guia": "/species/irai_worker.jpg",
    "guidePhotoCredit": "Foto: Karyne Mello Sarmento (Tegumento áspero e escutelo chanfrado em W)",
    "images": {
      "worker": {
        "url": "/species/irai_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/88643909/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
        "title": "Operária de Iraí / Jataí-Preta",
        "alt": "Operária de Iraí / Jataí-Preta (Nannotrigona testaceicornis (Lepeletier, 1836))"
      },
      "entry": {
        "url": "/species/irai_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/30062028/large.jpg",
        "credit": "Foto: Cristiano Menezes (Operárias em anel de sentinelas no tubo - SEAPI RS / Embrapa)",
        "title": "Entrada de Iraí / Jataí-Preta",
        "alt": "Pito de entrada do ninho de Iraí / Jataí-Preta"
      },
      "guide": {
        "url": "/species/irai_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/88643909/large.jpg",
        "credit": "Foto: Karyne Mello Sarmento (Tegumento áspero e escutelo chanfrado em W)",
        "title": "Diagnose de Iraí / Jataí-Preta",
        "alt": "Guia morfológico e identificação de Iraí / Jataí-Preta"
      },
      "nest": {
        "url": "/species/irai_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/30062028/large.jpg",
        "credit": "Foto: Cristiano Menezes (Operárias em anel de sentinelas no tubo - SEAPI RS / Embrapa)",
        "title": "Ninho e Entrada de Iraí / Jataí-Preta",
        "alt": "Estrutura e entrada de Iraí / Jataí-Preta"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023), Embrapa & A.B.E.L.H.A.",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 52-53; ALVES et al., 2015; MICHENER, 2007."
  },
  {
    "id": "bora",
    "popularName": "Borá / Vorá / Jataízão",
    "scientificName": "Tetragona clavipes (Fabricius, 1804)",
    "group": "trigona",
    "recommendedBoxModel": "INPA ou AF (18x18 cm)",
    "honeyYieldPerYear": "2.0 a 4.5 Litros/ano",
    "aggressiveness": "Ativa",
    "difficulty": "Média",
    "description": "Abelha veloz de 6,3 mm com amplas manchas amarelas na face e tíbia posterior dilatada em formato de remo/clave. Entrada em forma de fenda de própolis endurecido.",
    "honeyMoistureRange": "23% - 27%",
    "avatarBg": "bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-700",
    "region": "Sul, Sudeste, Centro-Oeste, Norte e Nordeste",
    "biome": "Mata Atlântica, Cerrado e Amazônia",
    "nestingType": "Troncos ocos vivos de grande porte",
    "swarmingPeriod": "Outubro a Fevereiro",
    "flightRange": "1.200m a 1.800m",
    "imageUrl": "/species/bora_worker.jpg",
    "entryImageUrl": "/species/bora_entry.jpg",
    "nestImageUrl": "/species/bora_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente / SEAPI RS)",
    "entryPhotoCredit": "Foto: Joney Braun & Cristiano Menezes (Entrada em fenda de própolis endurecida - SEAPI RS)",
    "morphologyNotes": "Corpo com 6,3 mm de coloração castanho-amarelada. Manchas amarelas faciais cobrem todo o clípeo e áreas paroculares. Tíbias posteriores em formato de clave/raquete. Ágil e defensiva com própolis viscoso.",
    "nestEntranceNotes": "Entrada ovoide ou elíptica endurecida de própolis escuro em forma de fenda vertical, sem tubo projetado.",
    "similarSpeciesDiff": {
      "compareWith": "Jataí (Tetragonisca angustula)",
      "description": "Muito maior (6,3 mm vs 4 mm), tíbias em formato de clave larga e entrada em fenda de própolis em vez de tubo de cera.",
      "keyPoints": [
        "Tamanho superior (6,3 mm) e tíbia em formato de remo.",
        "Entrada em fenda de própolis endurecido."
      ]
    },
    "nome_popular": "Borá / Vorá / Jataízão",
    "nome_cientifico": "Tetragona clavipes (Fabricius, 1804)",
    "url_foto_especie": "/species/bora_worker.jpg",
    "url_foto_entrada": "/species/bora_entry.jpg",
    "guideImageUrl": "/species/bora_worker.jpg",
    "url_foto_guia": "/species/bora_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Macho e operária - Tíbia em clave)",
    "images": {
      "worker": {
        "url": "/species/bora_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/347983533/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente / SEAPI RS)",
        "title": "Operária de Borá / Vorá / Jataízão",
        "alt": "Operária de Borá / Vorá / Jataízão (Tetragona clavipes (Fabricius, 1804))"
      },
      "entry": {
        "url": "/species/bora_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/347983562/large.jpeg",
        "credit": "Foto: Joney Braun & Cristiano Menezes (Entrada em fenda de própolis endurecida - SEAPI RS)",
        "title": "Entrada de Borá / Vorá / Jataízão",
        "alt": "Pito de entrada do ninho de Borá / Vorá / Jataízão"
      },
      "guide": {
        "url": "/species/bora_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/347983533/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Macho e operária - Tíbia em clave)",
        "title": "Diagnose de Borá / Vorá / Jataízão",
        "alt": "Guia morfológico e identificação de Borá / Vorá / Jataízão"
      },
      "nest": {
        "url": "/species/bora_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/347983562/large.jpeg",
        "credit": "Foto: Joney Braun & Cristiano Menezes (Entrada em fenda de própolis endurecida - SEAPI RS)",
        "title": "Ninho e Entrada de Borá / Vorá / Jataízão",
        "alt": "Estrutura e entrada de Borá / Vorá / Jataízão"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 54-57; NOGUEIRA et al., 2022; DUARTE & SOARES, 2016."
  },
  {
    "id": "mirim_droriana",
    "popularName": "Mirim-Droriana",
    "scientificName": "Plebeia droryana (Friese, 1900)",
    "group": "plebeia",
    "recommendedBoxModel": "INPA (10x10 ou 12x12 cm)",
    "honeyYieldPerYear": "0.2 a 0.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Abelha dócil de 4 mm com faixa amarela estreita nos olhos e faixa amarela horizontal larga no escutelo. Entrada dupla característica com patamar/plataforma inferior revestida de resina pegajosa.",
    "honeyMoistureRange": "22% - 25%",
    "avatarBg": "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700",
    "region": "Sul, Sudeste e Nordeste",
    "biome": "Mata Atlântica, Pampa e Cerrado",
    "nestingType": "Ocos de árvores e cavidades artificiais",
    "swarmingPeriod": "Outubro a Março",
    "flightRange": "300m a 500m",
    "imageUrl": "/species/mirim_droryana_worker.jpg",
    "entryImageUrl": "/species/mirim_droryana_entry.jpg",
    "nestImageUrl": "/species/mirim_droryana_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
    "entryPhotoCredit": "Foto: Mariano Pairet (Entrada oval com patamar - Guia SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo de 4 mm, cabeça e tórax pretos. Faixa amarela facial estreita e uniforme ao longo da borda dos olhos. Escutelo com faixa amarela horizontal mais larga.",
    "nestEntranceNotes": "Entrada frequentemente dupla: um orifício circular superior menor e uma entrada oval inferior com patamar expandido revestido de resina pegajosa.",
    "similarSpeciesDiff": {
      "compareWith": "Mirim-Emerina (Plebeia emerina)",
      "description": "Droryana tem faixa facial estreita uniforme e entrada com patamar duplo; Emerina tem faixa facial alargada na parte inferior e tubo circular simples.",
      "keyPoints": [
        "Droryana: Faixa amarela facial estreita e reta + entrada com patamar/plataforma.",
        "Emerina: Faixa amarela facial larga na base + entrada em tubo circular simples."
      ]
    },
    "nome_popular": "Mirim-Droriana",
    "nome_cientifico": "Plebeia droryana (Friese, 1900)",
    "url_foto_especie": "/species/mirim_droryana_worker.jpg",
    "url_foto_entrada": "/species/mirim_droryana_entry.jpg",
    "guideImageUrl": "/species/mirim_droryana_worker.jpg",
    "url_foto_guia": "/species/mirim_droryana_worker.jpg",
    "guidePhotoCredit": "Foto: Mariano Pairet (Guia SEAPI/DDPA RS)",
    "images": {
      "worker": {
        "url": "/species/mirim_droryana_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/481331768/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
        "title": "Operária de Mirim-Droriana",
        "alt": "Operária de Mirim-Droriana (Plebeia droryana (Friese, 1900))"
      },
      "entry": {
        "url": "/species/mirim_droryana_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/481335265/large.jpeg",
        "credit": "Foto: Mariano Pairet (Entrada oval com patamar - Guia SEAPI/DDPA RS)",
        "title": "Entrada de Mirim-Droriana",
        "alt": "Pito de entrada do ninho de Mirim-Droriana"
      },
      "guide": {
        "url": "/species/mirim_droryana_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/481331768/large.jpeg",
        "credit": "Foto: Mariano Pairet (Guia SEAPI/DDPA RS)",
        "title": "Diagnose de Mirim-Droriana",
        "alt": "Guia morfológico e identificação de Mirim-Droriana"
      },
      "nest": {
        "url": "/species/mirim_droryana_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/481335265/large.jpeg",
        "credit": "Foto: Mariano Pairet (Entrada oval com patamar - Guia SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Mirim-Droriana",
        "alt": "Estrutura e entrada de Mirim-Droriana"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 44-45, 100-101."
  },
  {
    "id": "mirim_emerina",
    "popularName": "Mirim-Emerina",
    "scientificName": "Plebeia emerina (Friese, 1900)",
    "group": "plebeia",
    "recommendedBoxModel": "INPA (10x10 ou 12x12 cm)",
    "honeyYieldPerYear": "0.2 a 0.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Abelha mansa de 4 mm com faixa amarela larga na lateral dos olhos que se alarga na porção inferior. Entrada em tubo cilíndrico simples de cerume escuro.",
    "honeyMoistureRange": "22% - 25%",
    "avatarBg": "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    "region": "Sul e Sudeste (RS, SC, PR, SP)",
    "biome": "Mata Atlântica e Pampa",
    "nestingType": "Ocos de árvores e fendas de alvenaria",
    "swarmingPeriod": "Outubro a Fevereiro",
    "flightRange": "300m a 500m",
    "imageUrl": "/species/mirim_emerina_worker.jpg",
    "entryImageUrl": "/species/mirim_emerina_entry.jpg",
    "nestImageUrl": "/species/mirim_emerina_entry.jpg",
    "photoCredit": "Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)",
    "entryPhotoCredit": "Foto: Karyne Mello Sarmento (Tubo cilíndrico de cerume escuro - SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo com 4 mm. Faixa amarela na lateral dos olhos compostos bem alargada na porção inferior junto ao clípeo. Faixa amarela estreita no ápice do escutelo. Pernas anteriores caramelo.",
    "nestEntranceNotes": "Tubo cilíndrico simples de cerume escuro, de diâmetro reduzido.",
    "similarSpeciesDiff": {
      "compareWith": "Mirim-Droryana (Plebeia droryana)",
      "description": "Emerina possui a faixa facial nitidamente mais larga na base e entrada em tubo único circular; Droryana tem entrada dupla com patamar.",
      "keyPoints": [
        "Faixa amarela na base dos olhos mais larga.",
        "Entrada tubular circular simples."
      ]
    },
    "nome_popular": "Mirim-Emerina",
    "nome_cientifico": "Plebeia emerina (Friese, 1900)",
    "url_foto_especie": "/species/mirim_emerina_worker.jpg",
    "url_foto_entrada": "/species/mirim_emerina_entry.jpg",
    "guideImageUrl": "/species/mirim_emerina_worker.jpg",
    "url_foto_guia": "/species/mirim_emerina_worker.jpg",
    "guidePhotoCredit": "Foto: Fernando Kluwe Dias (Faixa amarela larga alargada na base dos olhos)",
    "images": {
      "worker": {
        "url": "/species/mirim_emerina_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/33865085/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Guia SEAPI/DDPA RS)",
        "title": "Operária de Mirim-Emerina",
        "alt": "Operária de Mirim-Emerina (Plebeia emerina (Friese, 1900))"
      },
      "entry": {
        "url": "/species/mirim_emerina_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/156567036/large.jpg",
        "credit": "Foto: Karyne Mello Sarmento (Tubo cilíndrico de cerume escuro - SEAPI/DDPA RS)",
        "title": "Entrada de Mirim-Emerina",
        "alt": "Pito de entrada do ninho de Mirim-Emerina"
      },
      "guide": {
        "url": "/species/mirim_emerina_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/33865085/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Faixa amarela larga alargada na base dos olhos)",
        "title": "Diagnose de Mirim-Emerina",
        "alt": "Guia morfológico e identificação de Mirim-Emerina"
      },
      "nest": {
        "url": "/species/mirim_emerina_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/156567036/large.jpg",
        "credit": "Foto: Karyne Mello Sarmento (Tubo cilíndrico de cerume escuro - SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Mirim-Emerina",
        "alt": "Estrutura e entrada de Mirim-Emerina"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 42-43, 100-101; FRIESE, 1900."
  },
  {
    "id": "mirim_guaçu",
    "popularName": "Mirim-Guaçu",
    "scientificName": "Plebeia remota (Holmberg, 1903)",
    "group": "plebeia",
    "recommendedBoxModel": "INPA (12x12 cm)",
    "honeyYieldPerYear": "0.4 a 1.0 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Corpo preto brilhante de 5 mm com manchas amarelas no clípeo. Ninho caracterizado por rede de cabos de cerume (trabéculas) que sustentam os favos como andaimes.",
    "honeyMoistureRange": "23% - 26%",
    "avatarBg": "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700",
    "region": "Sul e Sudeste",
    "biome": "Mata Atlântica e Floresta com Araucária",
    "nestingType": "Ocos de árvores vivas",
    "swarmingPeriod": "Outubro a Março",
    "flightRange": "400m a 700m",
    "imageUrl": "/species/mirim_guacu_worker.jpg",
    "entryImageUrl": "/species/mirim_guaçu_entry.jpg",
    "nestImageUrl": "/species/mirim_guaçu_entry.jpg",
    "photoCredit": "Foto: Victor Hugo Rebecchi (iNaturalist) & Guia DDPA/SEAPI RS",
    "entryPhotoCredit": "Foto: Cristiano Maddalena (Entrada de resina e cerume)",
    "morphologyNotes": "Corpo com 5 mm preto brilhante. Manchas amarelas na região central do clípeo e supraclipeal. Faixas laterais dos olhos mais estreitas que em P. emerina.",
    "nestEntranceNotes": "Entrada circular reduzida de própolis permitindo passagem de 1 abelha por vez. Internamente constrói trabéculas de cerume formando verdadeira rede de andaimes.",
    "similarSpeciesDiff": {
      "compareWith": "Mirim-Saiqui (Plebeia saiqui)",
      "description": "Mirim-guaçu tem abdômen preto brilhante; Mirim-saiqui tem abdômen avermelhado com 1º segmento ferrugíneo.",
      "keyPoints": [
        "Abdômen preto brilhante com trabéculas internas de cerume.",
        "Pernas escuras e asas levemente acastanhadas."
      ]
    },
    "nome_popular": "Mirim-Guaçu",
    "nome_cientifico": "Plebeia remota (Holmberg, 1903)",
    "url_foto_especie": "/species/mirim_guacu_worker.jpg",
    "url_foto_entrada": "/species/mirim_guaçu_entry.jpg",
    "guideImageUrl": "/species/mirim_guacu_worker.jpg",
    "url_foto_guia": "/species/mirim_guacu_worker.jpg",
    "guidePhotoCredit": "Foto: Detalhe Morfológico e Diagnóstico Taxonômico (SEAPI/DDPA RS & iNaturalist)",
    "images": {
      "worker": {
        "url": "/species/mirim_guacu_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/603952616/large.jpg",
        "credit": "Foto: Victor Hugo Rebecchi (iNaturalist) & Guia DDPA/SEAPI RS",
        "title": "Operária de Mirim-Guaçu",
        "alt": "Operária de Mirim-Guaçu (Plebeia remota (Holmberg, 1903))"
      },
      "entry": {
        "url": "/species/mirim_guaçu_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/415461429/large.jpeg",
        "credit": "Foto: Cristiano Maddalena (Entrada de resina e cerume)",
        "title": "Entrada de Mirim-Guaçu",
        "alt": "Pito de entrada do ninho de Mirim-Guaçu"
      },
      "guide": {
        "url": "/species/mirim_guacu_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/603952616/large.jpg",
        "credit": "Foto: Detalhe Morfológico e Diagnóstico Taxonômico (SEAPI/DDPA RS & iNaturalist)",
        "title": "Diagnose de Mirim-Guaçu",
        "alt": "Guia morfológico e identificação de Mirim-Guaçu"
      },
      "nest": {
        "url": "/species/mirim_guaçu_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/415461429/large.jpeg",
        "credit": "Foto: Cristiano Maddalena (Entrada de resina e cerume)",
        "title": "Ninho e Entrada de Mirim-Guaçu",
        "alt": "Estrutura e entrada de Mirim-Guaçu"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023), EMBRAPA & A.B.E.L.H.A.",
    "literatureReference": "WITTER et al. Guia de Reconhecimento de ASF do RS. SEAPI/DDPA, 2023; Embrapa & A.B.E.L.H.A."
  },
  {
    "id": "iratim",
    "popularName": "Iratim / Abelha-Limão",
    "scientificName": "Lestrimelitta sulina Marchi & Melo, 2006 / L. limao",
    "group": "trigona",
    "recommendedBoxModel": "Não criada comercialmente (espécie cleptobiótica)",
    "honeyYieldPerYear": "Não explorada (pilhadora)",
    "aggressiveness": "Defensiva",
    "difficulty": "Avançada",
    "description": "Espécie cleptobiótica (pilhadora obrigatória). Corpo preto brilhante (6 a 7 mm) sem corbícula nas pernas posteriores. Exala forte odor de citral/limão para desorientar colmeias atacadas. Entrada com projeções em estalactites.",
    "honeyMoistureRange": "Variável",
    "avatarBg": "bg-yellow-200 dark:bg-yellow-900/60 text-yellow-950 dark:text-yellow-100 border-yellow-400 dark:border-yellow-700",
    "region": "Sul, Sudeste, Centro-Oeste e Norte",
    "biome": "Mata Atlântica, Pampa, Cerrado e Amazônia",
    "nestingType": "Ocos de árvores vivas",
    "swarmingPeriod": "Verão",
    "flightRange": "1.000m a 2.000m",
    "imageUrl": "/species/iratim_worker.jpg",
    "entryImageUrl": "/species/iratim_entry.jpg",
    "nestImageUrl": "/species/iratim_entry.jpg",
    "photoCredit": "Foto: Karyne Mello Sarmento (Operárias saqueadoras - Guia SEAPI/DDPA RS)",
    "entryPhotoCredit": "Foto: Karyne Mello Sarmento (Entrada principal e falsas estalactites de cerume - SEAPI RS)",
    "morphologyNotes": "Corpo com 6 a 7 mm, preto lustroso, cabeça arredondada. As operárias NÃO possuem corbícula (área lisa para carregar pólen) nas tíbias posteriores. Exalam cheiro cítrico intenso.",
    "nestEntranceNotes": "Tubo de cerume escuro longo com múltiplas pontas falsas ramificadas projetando-se como estalactites.",
    "similarSpeciesDiff": {
      "compareWith": "Tubuna e Mandaguari (Scaptotrigona spp.)",
      "description": "Lestrimelitta não possui corbícula nas tíbias posteriores e exala cheiro de limão/citral (Scaptotrigona exala cheiro de coco e tem corbícula larga).",
      "keyPoints": [
        "Ausência total de corbícula (pernas traseiras sem cesto de pólen).",
        "Cheiro forte de limão + tubo com pontas estalactíticas."
      ]
    },
    "nome_popular": "Iratim / Abelha-Limão",
    "nome_cientifico": "Lestrimelitta sulina Marchi & Melo, 2006 / L. limao",
    "url_foto_especie": "/species/iratim_worker.jpg",
    "url_foto_entrada": "/species/iratim_entry.jpg",
    "guideImageUrl": "/species/iratim_worker.jpg",
    "url_foto_guia": "/species/iratim_worker.jpg",
    "guidePhotoCredit": "Foto: Karyne Mello Sarmento (Tegumento liso brilhante sem corbícula)",
    "images": {
      "worker": {
        "url": "/species/iratim_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/252655724/large.jpeg",
        "credit": "Foto: Karyne Mello Sarmento (Operárias saqueadoras - Guia SEAPI/DDPA RS)",
        "title": "Operária de Iratim / Abelha-Limão",
        "alt": "Operária de Iratim / Abelha-Limão (Lestrimelitta sulina Marchi & Melo, 2006 / L. limao)"
      },
      "entry": {
        "url": "/species/iratim_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/252655739/large.jpeg",
        "credit": "Foto: Karyne Mello Sarmento (Entrada principal e falsas estalactites de cerume - SEAPI RS)",
        "title": "Entrada de Iratim / Abelha-Limão",
        "alt": "Pito de entrada do ninho de Iratim / Abelha-Limão"
      },
      "guide": {
        "url": "/species/iratim_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/252655724/large.jpeg",
        "credit": "Foto: Karyne Mello Sarmento (Tegumento liso brilhante sem corbícula)",
        "title": "Diagnose de Iratim / Abelha-Limão",
        "alt": "Guia morfológico e identificação de Iratim / Abelha-Limão"
      },
      "nest": {
        "url": "/species/iratim_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/252655739/large.jpeg",
        "credit": "Foto: Karyne Mello Sarmento (Entrada principal e falsas estalactites de cerume - SEAPI RS)",
        "title": "Ninho e Entrada de Iratim / Abelha-Limão",
        "alt": "Estrutura e entrada de Iratim / Abelha-Limão"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023)",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 90-93, 108-109; MARCHI & MELO, 2006; SCHWARZ, 1948."
  },
  {
    "id": "irapua",
    "popularName": "Irapuá / Arapuá / Abelha-Cachorro",
    "scientificName": "Trigona spinipes (Fabricius, 1793)",
    "group": "trigona",
    "recommendedBoxModel": "Ninho aéreo externo natural (não adaptada a caixas)",
    "honeyYieldPerYear": "Não explorada",
    "aggressiveness": "Defensiva",
    "difficulty": "Avançada",
    "description": "Abelha preta (6,5 a 7,5 mm) de pernas posteriores avermelhadas/alaranjadas. Constrói ninho aéreo oval de grande porte exposto nos galhos das árvores.",
    "honeyMoistureRange": "Variável",
    "avatarBg": "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-700",
    "region": "Todo o Brasil",
    "biome": "Todos os biomas brasileiros",
    "nestingType": "Aéreo externo suspenso em galhos e forquilhas de árvores",
    "swarmingPeriod": "Primavera/Verão",
    "flightRange": "1.500m a 2.500m",
    "imageUrl": "/species/irapua_worker.jpg",
    "entryImageUrl": "/species/irapua_entry.jpg",
    "nestImageUrl": "/species/irapua_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente - Pernas ferrugíneas)",
    "entryPhotoCredit": "Foto: Fernando Kluwe Dias (Ninho aéreo com septos verticais - SEAPI/DDPA RS)",
    "morphologyNotes": "Corpo preto de 6,5-7,5 mm, pernas traseiras com tíbias e tarsos alaranjados/ferrugíneos. Asas translúcidas esfumadas.",
    "nestEntranceNotes": "Ninho aéreo volumoso em formato oval construído de fibras vegetais trituradas, barro e resinas.",
    "similarSpeciesDiff": {
      "compareWith": "Tubuna (Scaptotrigona bipunctata)",
      "description": "Irapuá constrói ninho aéreo suspenso em galhos e tem pernas alaranjadas; Tubuna nidifica em ocos e tem pernas pretas.",
      "keyPoints": [
        "Ninho aéreo exposto em galhos.",
        "Pernas posteriores alaranjadas."
      ]
    },
    "nome_popular": "Irapuá / Arapuá / Abelha-Cachorro",
    "nome_cientifico": "Trigona spinipes (Fabricius, 1793)",
    "url_foto_especie": "/species/irapua_worker.jpg",
    "url_foto_entrada": "/species/irapua_entry.jpg",
    "guideImageUrl": "/species/irapua_worker.jpg",
    "url_foto_guia": "/species/irapua_worker.jpg",
    "guidePhotoCredit": "Foto: Fernando Kluwe Dias (Operária em flor - SEAPI/DDPA RS)",
    "images": {
      "worker": {
        "url": "/species/irapua_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/578253208/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente - Pernas ferrugíneas)",
        "title": "Operária de Irapuá / Arapuá / Abelha-Cachorro",
        "alt": "Operária de Irapuá / Arapuá / Abelha-Cachorro (Trigona spinipes (Fabricius, 1793))"
      },
      "entry": {
        "url": "/species/irapua_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/578257109/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Ninho aéreo com septos verticais - SEAPI/DDPA RS)",
        "title": "Entrada de Irapuá / Arapuá / Abelha-Cachorro",
        "alt": "Pito de entrada do ninho de Irapuá / Arapuá / Abelha-Cachorro"
      },
      "guide": {
        "url": "/species/irapua_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/578253208/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Operária em flor - SEAPI/DDPA RS)",
        "title": "Diagnose de Irapuá / Arapuá / Abelha-Cachorro",
        "alt": "Guia morfológico e identificação de Irapuá / Arapuá / Abelha-Cachorro"
      },
      "nest": {
        "url": "/species/irapua_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/578257109/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Ninho aéreo com septos verticais - SEAPI/DDPA RS)",
        "title": "Ninho e Entrada de Irapuá / Arapuá / Abelha-Cachorro",
        "alt": "Estrutura e entrada de Irapuá / Arapuá / Abelha-Cachorro"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 74-75, 104-105; ALMEIDA & LAROCA, 1988."
  },
  {
    "id": "bieira",
    "popularName": "Bieira / Mirim-de-Chão",
    "scientificName": "Mourella caerulea (Friese, 1900)",
    "group": "plebeia",
    "recommendedBoxModel": "Caixa de Solo Especial com Drenagem",
    "honeyYieldPerYear": "0.5 a 1.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Avançada",
    "description": "Abelha fascinante (6,2 mm) com espetacular brilho metálico verde-azulado na cabeça e tórax. Constrói ninho subterrâneo em solos graníticos bem drenados do Rio Grande do Sul.",
    "honeyMoistureRange": "23% - 27%",
    "avatarBg": "bg-emerald-200 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100 border-emerald-400 dark:border-emerald-700",
    "region": "Sul (RS, SC, PR) e países vizinhos",
    "biome": "Pampa e Mata Atlântica",
    "nestingType": "Subterrâneo em solos graníticos leves e bem drenados",
    "swarmingPeriod": "Novembro a Fevereiro",
    "flightRange": "600m a 1.000m",
    "imageUrl": "/species/bieira_worker.jpg",
    "entryImageUrl": "/species/bieira_entry.jpg",
    "nestImageUrl": "/species/bieira_entry.jpg",
    "photoCredit": "Foto: Juliana Stephanie Galaschi-Teixeira (Guia SEAPI RS) & Acervo Anexado",
    "entryPhotoCredit": "Foto: Sidia Witter (Pequeno orifício no solo granítico - SEAPI/DDPA RS) & Acervo Anexo",
    "morphologyNotes": "Corpo com 6,2 mm. Cabeça e tórax com deslumbrante brilho metálico verde-azulado iridescente. Faixa amarela no clípeo e áreas paroculares.",
    "nestEntranceNotes": "Orifício circular no solo (~0,45 cm de diâmetro) sem ornamentação, rodeado por pequena coroa de partículas escavadas.",
    "similarSpeciesDiff": {
      "compareWith": "Outros meliponíneos",
      "description": "Inconfundível pelo brilho metálico verde-azulado no corpo combinado com hábito de nidificação subterrâneo.",
      "keyPoints": [
        "Brilho metálico verde-azulado único.",
        "Nidificação subterrânea em solo granítico."
      ]
    },
    "nome_popular": "Bieira / Mirim-de-Chão",
    "nome_cientifico": "Mourella caerulea (Friese, 1900)",
    "url_foto_especie": "/species/bieira_worker.jpg",
    "url_foto_entrada": "/species/bieira_entry.jpg",
    "guideImageUrl": "/species/bieira_worker.jpg",
    "url_foto_guia": "/species/bieira_worker.jpg",
    "guidePhotoCredit": "Foto: Fernando Kluwe Dias (Ninho subterrâneo - SEAPI/DDPA RS)",
    "images": {
      "worker": {
        "url": "/species/bieira_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/108345910/large.jpg",
        "credit": "Foto: Juliana Stephanie Galaschi-Teixeira (Guia SEAPI RS) & Acervo Anexado",
        "title": "Operária de Bieira / Mirim-de-Chão",
        "alt": "Operária de Bieira / Mirim-de-Chão (Mourella caerulea (Friese, 1900))"
      },
      "entry": {
        "url": "/species/bieira_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/108345875/large.jpg",
        "credit": "Foto: Sidia Witter (Pequeno orifício no solo granítico - SEAPI/DDPA RS) & Acervo Anexo",
        "title": "Entrada de Bieira / Mirim-de-Chão",
        "alt": "Pito de entrada do ninho de Bieira / Mirim-de-Chão"
      },
      "guide": {
        "url": "/species/bieira_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/108345910/large.jpg",
        "credit": "Foto: Fernando Kluwe Dias (Ninho subterrâneo - SEAPI/DDPA RS)",
        "title": "Diagnose de Bieira / Mirim-de-Chão",
        "alt": "Guia morfológico e identificação de Bieira / Mirim-de-Chão"
      },
      "nest": {
        "url": "/species/bieira_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/108345875/large.jpg",
        "credit": "Foto: Sidia Witter (Pequeno orifício no solo granítico - SEAPI/DDPA RS) & Acervo Anexo",
        "title": "Ninho e Entrada de Bieira / Mirim-de-Chão",
        "alt": "Estrutura e entrada de Bieira / Mirim-de-Chão"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Fotos Anexadas pelo Meliponicultor",
    "literatureReference": "WITTER, S. et al. SEAPI/DDPA, 2023. p. 82-83; CAMARGO & WITTMANN, 1989."
  },
  {
    "id": "uruçu_nordestina",
    "popularName": "Uruçu-Nordestina / Uruçu-Verdadeira",
    "scientificName": "Melipona scutellaris Latreille, 1811",
    "group": "melipona",
    "recommendedBoxModel": "INPA ou AF (20x20 cm interno)",
    "honeyYieldPerYear": "4.0 a 10.0 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Abelha nobre e imponente de porte grande (10 a 12 mm). Tórax densamente revestido de abundante pilosidade aveludada amarelo-dourada brilhante. Alta produtividade de mel.",
    "honeyMoistureRange": "25% - 29%",
    "avatarBg": "bg-amber-200 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700",
    "region": "Nordeste (Zona da Mata de BA a RN)",
    "biome": "Mata Atlântica Nordestina e Brejos de Altitude",
    "nestingType": "Troncos e ocos de árvores de grande porte",
    "swarmingPeriod": "Outubro a Março",
    "flightRange": "2.000m a 3.000m",
    "imageUrl": "/species/urucu_nordestina_worker.jpg",
    "entryImageUrl": "/species/urucu_nordestina_entry.jpg",
    "nestImageUrl": "/species/urucu_nordestina_entry.jpg",
    "photoCredit": "Foto: Livro de Meliponicultura & Embrapa Recursos Genéticos",
    "entryPhotoCredit": "Foto: Embrapa (Entrada de geoprópolis)",
    "morphologyNotes": "Corpo com 10 a 12 mm. Tórax coberto por densa camada de pelos amarelo-dourados aveludados. Abdômen preto com finas linhas claras marginais.",
    "nestEntranceNotes": "Orifício circular no centro de estrias convergentes de barro/geoprópolis, permitindo uma abelha por vez.",
    "similarSpeciesDiff": {
      "compareWith": "Mandaçaia (Melipona quadrifasciata)",
      "description": "Uruçu possui o tórax totalmente amarelo-ouro com abdômen preto quase sem faixas, enquanto a Mandaçaia possui faixas amarelas nítidas no abdômen.",
      "keyPoints": [
        "Tórax densamente coberto de veludo dourado-amarelo.",
        "Porte majestoso (10-12 mm)."
      ]
    },
    "nome_popular": "Uruçu-Nordestina / Uruçu-Verdadeira",
    "nome_cientifico": "Melipona scutellaris Latreille, 1811",
    "url_foto_especie": "/species/urucu_nordestina_worker.jpg",
    "url_foto_entrada": "/species/urucu_nordestina_entry.jpg",
    "guideImageUrl": "/species/urucu_nordestina_worker.jpg",
    "url_foto_guia": "/species/urucu_nordestina_worker.jpg",
    "guidePhotoCredit": "Foto: Detalhe Morfológico e Diagnóstico Taxonômico (SEAPI/DDPA RS & iNaturalist)",
    "images": {
      "worker": {
        "url": "/species/urucu_nordestina_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/456005855/large.jpg",
        "credit": "Foto: Livro de Meliponicultura & Embrapa Recursos Genéticos",
        "title": "Operária de Uruçu-Nordestina / Uruçu-Verdadeira",
        "alt": "Operária de Uruçu-Nordestina / Uruçu-Verdadeira (Melipona scutellaris Latreille, 1811)"
      },
      "entry": {
        "url": "/species/urucu_nordestina_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/348489464/large.jpg",
        "credit": "Foto: Embrapa (Entrada de geoprópolis)",
        "title": "Entrada de Uruçu-Nordestina / Uruçu-Verdadeira",
        "alt": "Pito de entrada do ninho de Uruçu-Nordestina / Uruçu-Verdadeira"
      },
      "guide": {
        "url": "/species/urucu_nordestina_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/456005855/large.jpg",
        "credit": "Foto: Detalhe Morfológico e Diagnóstico Taxonômico (SEAPI/DDPA RS & iNaturalist)",
        "title": "Diagnose de Uruçu-Nordestina / Uruçu-Verdadeira",
        "alt": "Guia morfológico e identificação de Uruçu-Nordestina / Uruçu-Verdadeira"
      },
      "nest": {
        "url": "/species/urucu_nordestina_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/348489464/large.jpg",
        "credit": "Foto: Embrapa (Entrada de geoprópolis)",
        "title": "Ninho e Entrada de Uruçu-Nordestina / Uruçu-Verdadeira",
        "alt": "Estrutura e entrada de Uruçu-Nordestina / Uruçu-Verdadeira"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023), EMBRAPA & A.B.E.L.H.A.",
    "literatureReference": "WITTER et al. Guia de Reconhecimento de ASF do RS. SEAPI/DDPA, 2023; Embrapa & A.B.E.L.H.A."
  },
  {
    "id": "jandaira",
    "popularName": "Jandaíra da Caatinga",
    "scientificName": "Melipona subnitida Ducke, 1910",
    "group": "melipona",
    "recommendedBoxModel": "INPA ou Horizontal Nordestina (15x15 ou cortiço)",
    "honeyYieldPerYear": "1.5 a 3.5 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Símbolo do semiárido brasileiro. Corpo de 8 a 9 mm com abdômen preto ornamentado com faixas alaranjadas/amarelas e asas translúcidas. Resiste a longas secas.",
    "honeyMoistureRange": "23% - 27%",
    "avatarBg": "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    "region": "Nordeste (Sertão e Semiárido)",
    "biome": "Caatinga e Florestas Secas",
    "nestingType": "Ocos de árvores da Caatinga (como Catingueira e Baraúna)",
    "swarmingPeriod": "Estação chuvosa",
    "flightRange": "1.200m a 1.800m",
    "imageUrl": "/species/jandaira_worker.jpg",
    "entryImageUrl": "/species/jandaira_entry.jpg",
    "nestImageUrl": "/species/jandaira_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Amazônia Oriental / Meio Ambiente)",
    "entryPhotoCredit": "Foto: Cristiano Menezes (Embrapa - Pito com estrias de barro convergentes)",
    "morphologyNotes": "Corpo com 8 a 9 mm. Tórax castanho com pelos claros. Abdômen preto brilhante com faixas transversais amarelas/alaranjadas.",
    "nestEntranceNotes": "Orifício em centro de estrias de barro e resina da Caatinga.",
    "similarSpeciesDiff": {
      "compareWith": "Mandaçaia (Melipona quadrifasciata)",
      "description": "Jandaíra tem porte mais esguio (8-9 mm), pernas mais claras e é adaptada especificamente ao clima semiárido da Caatinga.",
      "keyPoints": [
        "Faixas amarelas-alaranjadas no abdômen.",
        "Endêmica da Caatinga."
      ]
    },
    "nome_popular": "Jandaíra da Caatinga",
    "nome_cientifico": "Melipona subnitida Ducke, 1910",
    "url_foto_especie": "/species/jandaira_worker.jpg",
    "url_foto_entrada": "/species/jandaira_entry.jpg",
    "guideImageUrl": "/species/jandaira_worker.jpg",
    "url_foto_guia": "/species/jandaira_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
    "images": {
      "worker": {
        "url": "/species/jandaira_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/642464587/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa Amazônia Oriental / Meio Ambiente)",
        "title": "Operária de Jandaíra da Caatinga",
        "alt": "Operária de Jandaíra da Caatinga (Melipona subnitida Ducke, 1910)"
      },
      "entry": {
        "url": "/species/jandaira_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/642470436/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa - Pito com estrias de barro convergentes)",
        "title": "Entrada de Jandaíra da Caatinga",
        "alt": "Pito de entrada do ninho de Jandaíra da Caatinga"
      },
      "guide": {
        "url": "/species/jandaira_worker.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/642464587/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
        "title": "Diagnose de Jandaíra da Caatinga",
        "alt": "Guia morfológico e identificação de Jandaíra da Caatinga"
      },
      "nest": {
        "url": "/species/jandaira_entry.jpg",
        "fallbackUrl": "https://static.inaturalist.org/photos/642470436/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa - Pito com estrias de barro convergentes)",
        "title": "Ninho e Entrada de Jandaíra da Caatinga",
        "alt": "Estrutura e entrada de Jandaíra da Caatinga"
      }
    },
    "sourceCredit": "EMBRAPA Meio Ambiente & Associação A.B.E.L.H.A.",
    "literatureReference": "KERR, W. E. et al. (1996); Embrapa Meio Ambiente / Associação A.B.E.L.H.A."
  },
  {
    "id": "tiuba",
    "popularName": "Tiúba / Uruçu-Cinzenta",
    "scientificName": "Melipona compressipes fasciculata Smith, 1854",
    "group": "melipona",
    "recommendedBoxModel": "INPA (18x18 ou 20x20 cm)",
    "honeyYieldPerYear": "3.0 a 8.0 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Abelha de grande porte do Maranhão e Pará (10 mm) de cor cinza-escura com pilosidade cinzenta e alta capacidade melífera.",
    "honeyMoistureRange": "25% - 29%",
    "avatarBg": "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600",
    "region": "Norte e Nordeste (MA, PI, PA, TO)",
    "biome": "Cerrado, Cocais e Amazônia",
    "nestingType": "Grandes ocos de troncos",
    "swarmingPeriod": "Fim do período chuvoso",
    "flightRange": "1.800m a 2.500m",
    "imageUrl": "/species/tiuba_worker.jpg",
    "entryImageUrl": "/species/tiuba_entry.jpg",
    "nestImageUrl": "/species/tiuba_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Amazônia / Meio Ambiente)",
    "entryPhotoCredit": "Foto: Giorgio Cristino Venturieri (Embrapa Amazônia Oriental)",
    "morphologyNotes": "Corpo com 10 mm, coloração predominantemente cinzenta e pilosidade esbranquiçada/acinzentada no tórax.",
    "nestEntranceNotes": "Entrada central de barro estriado.",
    "similarSpeciesDiff": {
      "compareWith": "Uruçu Nordestina",
      "description": "Tiúba é acinzentada, enquanto a Uruçu Nordestina é dourada-amarela.",
      "keyPoints": [
        "Pilosidade cinzenta característica.",
        "Produção abundante de mel no Maranhão."
      ]
    },
    "nome_popular": "Tiúba / Uruçu-Cinzenta",
    "nome_cientifico": "Melipona compressipes fasciculata Smith, 1854",
    "url_foto_especie": "/species/tiuba_worker.jpg",
    "url_foto_entrada": "/species/tiuba_entry.jpg",
    "guideImageUrl": "/species/tiuba_worker.jpg",
    "url_foto_guia": "/species/tiuba_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
    "images": {
      "worker": {
        "url": "/species/tiuba_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/482188721/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Embrapa Amazônia / Meio Ambiente)",
        "title": "Operária de Tiúba / Uruçu-Cinzenta",
        "alt": "Operária de Tiúba / Uruçu-Cinzenta (Melipona compressipes fasciculata Smith, 1854)"
      },
      "entry": {
        "url": "/species/tiuba_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/482188752/large.jpeg",
        "credit": "Foto: Giorgio Cristino Venturieri (Embrapa Amazônia Oriental)",
        "title": "Entrada de Tiúba / Uruçu-Cinzenta",
        "alt": "Pito de entrada do ninho de Tiúba / Uruçu-Cinzenta"
      },
      "guide": {
        "url": "/species/tiuba_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/482188721/large.jpeg",
        "credit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
        "title": "Diagnose de Tiúba / Uruçu-Cinzenta",
        "alt": "Guia morfológico e identificação de Tiúba / Uruçu-Cinzenta"
      },
      "nest": {
        "url": "/species/tiuba_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/482188752/large.jpeg",
        "credit": "Foto: Giorgio Cristino Venturieri (Embrapa Amazônia Oriental)",
        "title": "Ninho e Entrada de Tiúba / Uruçu-Cinzenta",
        "alt": "Estrutura e entrada de Tiúba / Uruçu-Cinzenta"
      }
    },
    "sourceCredit": "EMBRAPA Meio Ambiente & Associação A.B.E.L.H.A.",
    "literatureReference": "VENTURIERI, G. C. (2008). Criação de Abelhas Indígenas Sem Ferrão. Embrapa Amazônia Oriental."
  },
  {
    "id": "bugia",
    "popularName": "Bugia / Uruçu-Amarela do Sul",
    "scientificName": "Melipona mondury Smith, 1863",
    "group": "melipona",
    "recommendedBoxModel": "INPA (18x18 ou 20x20 cm)",
    "honeyYieldPerYear": "2.0 a 4.0 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Média",
    "description": "Abelha grande e bela da Mata Atlântica (10 mm) com anel de pelos amarelos brilhantes no colar torácico e abdômen com faixas amarelas.",
    "honeyMoistureRange": "25% - 29%",
    "avatarBg": "bg-yellow-200 dark:bg-yellow-900/60 text-yellow-950 dark:text-yellow-100 border-yellow-400 dark:border-yellow-700",
    "region": "Sul e Sudeste (RS, SC, PR, SP, RJ, MG, ES, BA)",
    "biome": "Mata Atlântica de Encosta",
    "nestingType": "Troncos de árvores vivas em florestas úmidas",
    "swarmingPeriod": "Primavera/Verão",
    "flightRange": "1.500m a 2.200m",
    "imageUrl": "/species/bugia_worker.jpg",
    "entryImageUrl": "/species/bugia_entry.jpg",
    "nestImageUrl": "/species/bugia_entry.jpg",
    "photoCredit": "Foto: Dr. Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
    "entryPhotoCredit": "Foto: Arquitetura de Entrada de Melipona mondury (Embrapa Meio Ambiente & A.B.E.L.H.A.)",
    "morphologyNotes": "Corpo de 10 mm com colar amarelo no tórax e faixas amarelas no abdômen.",
    "nestEntranceNotes": "Entrada de barro com ranhuras radiais convergentes.",
    "similarSpeciesDiff": {
      "compareWith": "Mandaçaia MQQ",
      "description": "Bugia possui anel amarelo brilhante no colar do tórax, ausente na Mandaçaia.",
      "keyPoints": [
        "Colar torácico com pelos amarelos brilhantes."
      ]
    },
    "nome_popular": "Bugia / Uruçu-Amarela do Sul",
    "nome_cientifico": "Melipona mondury Smith, 1863",
    "url_foto_especie": "/species/bugia_worker.jpg",
    "url_foto_entrada": "/species/bugia_entry.jpg",
    "guideImageUrl": "/species/bugia_worker.jpg",
    "url_foto_guia": "/species/bugia_worker.jpg",
    "guidePhotoCredit": "Foto: Dr. Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
    "images": {
      "worker": {
        "url": "/species/bugia_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/707259632/large.jpg",
        "credit": "Foto: Dr. Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
        "title": "Operária de Bugia / Uruçu-Amarela do Sul",
        "alt": "Operária de Bugia / Uruçu-Amarela do Sul (Melipona mondury Smith, 1863)"
      },
      "entry": {
        "url": "/species/bugia_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/707259836/large.jpg",
        "credit": "Foto: Arquitetura de Entrada de Melipona mondury (Embrapa Meio Ambiente & A.B.E.L.H.A.)",
        "title": "Entrada de Bugia / Uruçu-Amarela do Sul",
        "alt": "Pito de entrada do ninho de Bugia / Uruçu-Amarela do Sul"
      },
      "guide": {
        "url": "/species/bugia_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/707259632/large.jpg",
        "credit": "Foto: Dr. Cristiano Menezes (Embrapa Meio Ambiente / A.B.E.L.H.A.)",
        "title": "Diagnose de Bugia / Uruçu-Amarela do Sul",
        "alt": "Guia morfológico e identificação de Bugia / Uruçu-Amarela do Sul"
      },
      "nest": {
        "url": "/species/bugia_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/707259836/large.jpg",
        "credit": "Foto: Arquitetura de Entrada de Melipona mondury (Embrapa Meio Ambiente & A.B.E.L.H.A.)",
        "title": "Ninho e Entrada de Bugia / Uruçu-Amarela do Sul",
        "alt": "Estrutura e entrada de Bugia / Uruçu-Amarela do Sul"
      }
    },
    "sourceCredit": "EMBRAPA Meio Ambiente & Associação A.B.E.L.H.A.",
    "literatureReference": "MELO, G. A. R. (2013); Embrapa Meio Ambiente (Cristiano Menezes); Associação A.B.E.L.H.A. (2023)."
  },
  {
    "id": "marmelada",
    "popularName": "Marmelada Amarela",
    "scientificName": "Frieseomelitta varia (Lepeletier, 1836)",
    "group": "trigona",
    "recommendedBoxModel": "INPA (10x10 ou 12x12 cm)",
    "honeyYieldPerYear": "0.5 a 1.2 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Abelha mansa e amarelada (4,5 mm) que deposita pequenas bolinhas brancas ou amareladas de resina pura ao redor da entrada.",
    "honeyMoistureRange": "23% - 27%",
    "avatarBg": "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    "region": "Sul, Sudeste e Centro-Oeste",
    "biome": "Cerrado e Mata Atlântica",
    "nestingType": "Ocos de árvores e muros",
    "swarmingPeriod": "Primavera/Verão",
    "flightRange": "600m a 900m",
    "imageUrl": "/species/marmelada_worker.jpg",
    "entryImageUrl": "/species/marmelada_entry.jpg",
    "nestImageUrl": "/species/marmelada_entry.jpg",
    "photoCredit": "Foto: Weyder Santana & Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
    "entryPhotoCredit": "Foto: Weyder Santana (Entrada de cerume rendilhado mole - A.B.E.L.H.A.)",
    "morphologyNotes": "Corpo amarelado de 4,5 mm com manchas claras.",
    "nestEntranceNotes": "Orifício circular circundado por gotículas/bolinhas de resina e cera clara.",
    "similarSpeciesDiff": {
      "compareWith": "Jataí",
      "description": "Marmelada tem favos em cacho/células helicoidais e deposita resina branca na entrada.",
      "keyPoints": [
        "Gotículas de resina clara ao redor da entrada."
      ]
    },
    "nome_popular": "Marmelada Amarela",
    "nome_cientifico": "Frieseomelitta varia (Lepeletier, 1836)",
    "url_foto_especie": "/species/marmelada_worker.jpg",
    "url_foto_entrada": "/species/marmelada_entry.jpg",
    "guideImageUrl": "/species/marmelada_worker.jpg",
    "url_foto_guia": "/species/marmelada_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
    "images": {
      "worker": {
        "url": "/species/marmelada_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/679143441/large.jpg",
        "credit": "Foto: Weyder Santana & Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
        "title": "Operária de Marmelada Amarela",
        "alt": "Operária de Marmelada Amarela (Frieseomelitta varia (Lepeletier, 1836))"
      },
      "entry": {
        "url": "/species/marmelada_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/679474795/large.jpg",
        "credit": "Foto: Weyder Santana (Entrada de cerume rendilhado mole - A.B.E.L.H.A.)",
        "title": "Entrada de Marmelada Amarela",
        "alt": "Pito de entrada do ninho de Marmelada Amarela"
      },
      "guide": {
        "url": "/species/marmelada_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/679143441/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
        "title": "Diagnose de Marmelada Amarela",
        "alt": "Guia morfológico e identificação de Marmelada Amarela"
      },
      "nest": {
        "url": "/species/marmelada_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/679474795/large.jpg",
        "credit": "Foto: Weyder Santana (Entrada de cerume rendilhado mole - A.B.E.L.H.A.)",
        "title": "Ninho e Entrada de Marmelada Amarela",
        "alt": "Estrutura e entrada de Marmelada Amarela"
      }
    },
    "sourceCredit": "EMBRAPA & Associação A.B.E.L.H.A.",
    "literatureReference": "SILVEIRA, F. A., MELO, G. A. R. (2002); Associação A.B.E.L.H.A. (abelha.org.br)"
  },
  {
    "id": "lambe_olhos",
    "popularName": "Lambe-Olhos",
    "scientificName": "Leurotrigona muelleri (Friese, 1900)",
    "group": "plebeia",
    "recommendedBoxModel": "Mini Caixa Racional (8x8 cm)",
    "honeyYieldPerYear": "0.05 a 0.15 Litros/ano",
    "aggressiveness": "Muito Mansa",
    "difficulty": "Fácil",
    "description": "Uma das menores abelhas do mundo (1,5 a 2,0 mm). Muito dócil, atrai-se pela umidade ao redor dos olhos e boca de observadores.",
    "honeyMoistureRange": "22% - 25%",
    "avatarBg": "bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-400 dark:border-stone-600",
    "region": "Sul, Sudeste e Centro-Oeste",
    "biome": "Mata Atlântica e Cerrado",
    "nestingType": "Pequenas cavidades em árvores e mourões",
    "swarmingPeriod": "Verão",
    "flightRange": "200m a 400m",
    "imageUrl": "/species/lambe_olhos_worker.jpg",
    "entryImageUrl": "/species/lambe_olhos_entry.jpg",
    "nestImageUrl": "/species/lambe_olhos_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa) & Guia SEAPI/DDPA RS",
    "entryPhotoCredit": "Foto: Cristiano Menezes (Embrapa - Tubo capilar diminuto)",
    "morphologyNotes": "Diminuto porte (1,5-2,0 mm) com coloração castanho-escura e asas hialinas.",
    "nestEntranceNotes": "Orifício minúsculo de cera escura.",
    "similarSpeciesDiff": {
      "compareWith": "Mirim-Mosquito",
      "description": "Extremamente pequena (1,5 mm), sendo a menor abelha sem ferrão da região.",
      "keyPoints": [
        "Tamanho microscópico (1,5 mm)."
      ]
    },
    "nome_popular": "Lambe-Olhos",
    "nome_cientifico": "Leurotrigona muelleri (Friese, 1900)",
    "url_foto_especie": "/species/lambe_olhos_worker.jpg",
    "url_foto_entrada": "/species/lambe_olhos_entry.jpg",
    "guideImageUrl": "/species/lambe_olhos_worker.jpg",
    "url_foto_guia": "/species/lambe_olhos_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
    "images": {
      "worker": {
        "url": "/species/lambe_olhos_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/532504891/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa) & Guia SEAPI/DDPA RS",
        "title": "Operária de Lambe-Olhos",
        "alt": "Operária de Lambe-Olhos (Leurotrigona muelleri (Friese, 1900))"
      },
      "entry": {
        "url": "/species/lambe_olhos_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/506802174/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa - Tubo capilar diminuto)",
        "title": "Entrada de Lambe-Olhos",
        "alt": "Pito de entrada do ninho de Lambe-Olhos"
      },
      "guide": {
        "url": "/species/lambe_olhos_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/532504891/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
        "title": "Diagnose de Lambe-Olhos",
        "alt": "Guia morfológico e identificação de Lambe-Olhos"
      },
      "nest": {
        "url": "/species/lambe_olhos_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/506802174/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa - Tubo capilar diminuto)",
        "title": "Ninho e Entrada de Lambe-Olhos",
        "alt": "Estrutura e entrada de Lambe-Olhos"
      }
    },
    "sourceCredit": "Guia SEAPI/DDPA RS (2023) & Embrapa",
    "literatureReference": "PEDRO, S. R. M. & CAMARGO, J. M. F. (2009). Neotropical Meliponini: Leurotrigona. Zootaxa."
  },
  {
    "id": "mombuca",
    "popularName": "Mombuca / Abelha-Cabeçuda",
    "scientificName": "Cephalotrigona capitata (Smith, 1854)",
    "group": "trigona",
    "recommendedBoxModel": "INPA ou AF (18x18 cm)",
    "honeyYieldPerYear": "1.5 a 3.0 Litros/ano",
    "aggressiveness": "Mansa",
    "difficulty": "Média",
    "description": "Abelha robusta (7 mm) com cabeça proporcionalmente muito grande e asas de coloração âmbar. Constrói ninho em grandes cavidades de árvores.",
    "honeyMoistureRange": "23% - 27%",
    "avatarBg": "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700",
    "region": "Sul, Sudeste, Centro-Oeste e Norte",
    "biome": "Mata Atlântica e Amazônia",
    "nestingType": "Troncos de árvores vivas",
    "swarmingPeriod": "Primavera/Verão",
    "flightRange": "1.200m a 1.800m",
    "imageUrl": "/species/mombuca_worker.jpg",
    "entryImageUrl": "/species/mombuca_entry.jpg",
    "nestImageUrl": "/species/mombuca_entry.jpg",
    "photoCredit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
    "entryPhotoCredit": "Foto: Cristiano Menezes (Entrada tubular escura em tronco)",
    "morphologyNotes": "Corpo de 7 mm com cabeça desproporcionalmente volumosa e asas amareladas/âmbar.",
    "nestEntranceNotes": "Orifício em fenda protegido por resinas vegetais.",
    "similarSpeciesDiff": {
      "compareWith": "Borá",
      "description": "Mombuca tem cabeça muito grande e asas de cor âmbar vivo.",
      "keyPoints": [
        "Cabeça hipertrofiada característica."
      ]
    },
    "nome_popular": "Mombuca / Abelha-Cabeçuda",
    "nome_cientifico": "Cephalotrigona capitata (Smith, 1854)",
    "url_foto_especie": "/species/mombuca_worker.jpg",
    "url_foto_entrada": "/species/mombuca_entry.jpg",
    "guideImageUrl": "/species/mombuca_worker.jpg",
    "url_foto_guia": "/species/mombuca_worker.jpg",
    "guidePhotoCredit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
    "images": {
      "worker": {
        "url": "/species/mombuca_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/505929020/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa Meio Ambiente)",
        "title": "Operária de Mombuca / Abelha-Cabeçuda",
        "alt": "Operária de Mombuca / Abelha-Cabeçuda (Cephalotrigona capitata (Smith, 1854))"
      },
      "entry": {
        "url": "/species/mombuca_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/420490237/large.jpg",
        "credit": "Foto: Cristiano Menezes (Entrada tubular escura em tronco)",
        "title": "Entrada de Mombuca / Abelha-Cabeçuda",
        "alt": "Pito de entrada do ninho de Mombuca / Abelha-Cabeçuda"
      },
      "guide": {
        "url": "/species/mombuca_worker.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/505929020/large.jpg",
        "credit": "Foto: Cristiano Menezes (Embrapa / A.B.E.L.H.A.)",
        "title": "Diagnose de Mombuca / Abelha-Cabeçuda",
        "alt": "Guia morfológico e identificação de Mombuca / Abelha-Cabeçuda"
      },
      "nest": {
        "url": "/species/mombuca_entry.jpg",
        "fallbackUrl": "https://inaturalist-open-data.s3.amazonaws.com/photos/420490237/large.jpg",
        "credit": "Foto: Cristiano Menezes (Entrada tubular escura em tronco)",
        "title": "Ninho e Entrada de Mombuca / Abelha-Cabeçuda",
        "alt": "Estrutura e entrada de Mombuca / Abelha-Cabeçuda"
      }
    },
    "sourceCredit": "EMBRAPA & Associação A.B.E.L.H.A.",
    "literatureReference": "SILVEIRA, MELO & ALMEIDA (2002); Associação A.B.E.L.H.A. (abelha.org.br)"
  }
];
