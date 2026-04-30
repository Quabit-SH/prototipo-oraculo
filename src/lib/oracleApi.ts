import { GoogleGenerativeAI } from '@google/genai';

export interface OracleRequest {
  area: string;
  birthdate: string;
  question: string;
}

export interface OracleResponse {
  hexagram: number;
  hexagramName: string;
  philosophical: string;
  metaphysical: string;
  practical: string;
}

// Mapeamento dos 64 hexagramas do I Ching
const hexagrams = [
  { number: 1, name: 'O Criativo', symbol: '☰☰' },
  { number: 2, name: 'O Receptivo', symbol: '☷☷' },
  { number: 3, name: 'Dificuldade Inicial', symbol: '☵☳' },
  { number: 4, name: 'Loucura Juvenil', symbol: '☶☵' },
  { number: 5, name: 'A Espera', symbol: '☵☰' },
  { number: 6, name: 'O Conflito', symbol: '☰☵' },
  { number: 7, name: 'O Exército', symbol: '☷☵' },
  { number: 8, name: 'Manter-se Unido', symbol: '☵☷' },
  { number: 9, name: 'O Poder Domador do Pequeno', symbol: '☴☰' },
  { number: 10, name: 'A Trilha', symbol: '☰☱' },
  { number: 11, name: 'A Paz', symbol: '☷☰' },
  { number: 12, name: 'A Estagnação', symbol: '☰☷' },
  { number: 13, name: 'Comunidade com os Homens', symbol: '☰☲' },
  { number: 14, name: 'Grande Posse', symbol: '☲☰' },
  { number: 15, name: 'A Modéstia', symbol: '☷☶' },
  { number: 16, name: 'O Entusiasmo', symbol: '☳☷' },
  { number: 17, name: 'O Seguir', symbol: '☱☳' },
  { number: 18, name: 'O Trabalho sobre o Corrompido', symbol: '☶☴' },
  { number: 19, name: 'A Aproximação', symbol: '☷☱' },
  { number: 20, name: 'A Contemplação', symbol: '☴☷' },
  { number: 21, name: 'Morder', symbol: '☲☳' },
  { number: 22, name: 'A Graça', symbol: '☶☲' },
  { number: 23, name: 'A Desintegração', symbol: '☶☷' },
  { number: 24, name: 'O Retorno', symbol: '☷☳' },
  { number: 25, name: 'A Inocência', symbol: '☰☳' },
  { number: 26, name: 'O Poder Domador do Grande', symbol: '☶☰' },
  { number: 27, name: 'As Bordas da Boca', symbol: '☶☳' },
  { number: 28, name: 'A Preponderância do Grande', symbol: '☱☴' },
  { number: 29, name: 'O Abismal', symbol: '☵☵' },
  { number: 30, name: 'O Aderir', symbol: '☲☲' },
  { number: 31, name: 'A Influência', symbol: '☱☶' },
  { number: 32, name: 'A Duração', symbol: '☳☴' },
  { number: 33, name: 'A Retirada', symbol: '☰☶' },
  { number: 34, name: 'O Poder do Grande', symbol: '☳☰' },
  { number: 35, name: 'O Progresso', symbol: '☲☷' },
  { number: 36, name: 'O Obscurecimento da Luz', symbol: '☷☲' },
  { number: 37, name: 'O Clã', symbol: '☴☲' },
  { number: 38, name: 'A Oposição', symbol: '☲☱' },
  { number: 39, name: 'O Obstáculo', symbol: '☵☶' },
  { number: 40, name: 'A Liberação', symbol: '☳☵' },
  { number: 41, name: 'A Diminuição', symbol: '☶☱' },
  { number: 42, name: 'O Aumento', symbol: '☴☳' },
  { number: 43, name: 'A Determinação', symbol: '☱☰' },
  { number: 44, name: 'Vir ao Encontro', symbol: '☰☴' },
  { number: 45, name: 'A Reunião', symbol: '☱☷' },
  { number: 46, name: 'A Ascensão', symbol: '☷☴' },
  { number: 47, name: 'A Opressão', symbol: '☱☵' },
  { number: 48, name: 'O Poço', symbol: '☵☴' },
  { number: 49, name: 'A Revolução', symbol: '☱☲' },
  { number: 50, name: 'O Caldeirão', symbol: '☲☴' },
  { number: 51, name: 'O Trovão', symbol: '☳☳' },
  { number: 52, name: 'A Quietude', symbol: '☶☶' },
  { number: 53, name: 'O Desenvolvimento', symbol: '☴☶' },
  { number: 54, name: 'A Donzela que se Casa', symbol: '☳☱' },
  { number: 55, name: 'A Abundância', symbol: '☳☲' },
  { number: 56, name: 'O Viajante', symbol: '☲☶' },
  { number: 57, name: 'O Suave', symbol: '☴☴' },
  { number: 58, name: 'A Alegria', symbol: '☱☱' },
  { number: 59, name: 'A Dispersão', symbol: '☴☵' },
  { number: 60, name: 'A Limitação', symbol: '☵☱' },
  { number: 61, name: 'A Verdade Interior', symbol: '☴☱' },
  { number: 62, name: 'A Preponderância do Pequeno', symbol: '☳☶' },
  { number: 63, name: 'Após a Conclusão', symbol: '☵☲' },
  { number: 64, name: 'Antes da Conclusão', symbol: '☲☵' }
];

// Calcula hexagrama baseado em data e momento
function calculateHexagram(birthdate: string, question: string): number {
  const birth = new Date(birthdate);
  const now = new Date();

  // Usa dia do ano + hora atual + hash da pergunta para gerar número pseudo-aleatório
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const birthDay = birth.getDate();
  const birthMonth = birth.getMonth() + 1;
  const currentHour = now.getHours();

  // Hash simples da pergunta
  let questionHash = 0;
  for (let i = 0; i < question.length; i++) {
    questionHash = ((questionHash << 5) - questionHash) + question.charCodeAt(i);
    questionHash = questionHash & questionHash;
  }

  const seed = (dayOfYear + birthDay + birthMonth + currentHour + Math.abs(questionHash)) % 64;
  return seed === 0 ? 1 : seed;
}

export async function consultOracle(request: OracleRequest): Promise<OracleResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('API Key do Gemini não configurada');
  }

  // Calcula hexagrama baseado nos dados temporais
  const hexagramNumber = calculateHexagram(request.birthdate, request.question);
  const hexagram = hexagrams[hexagramNumber - 1];

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Você é um Mestre do I Ching (Livro das Mutações) especializado em fornecer orientações profundas baseadas na sabedoria milenar chinesa.

CONTEXTO DA CONSULTA:
- Área da vida: ${request.area}
- Data de nascimento: ${request.birthdate}
- Pergunta/Situação: ${request.question}

HEXAGRAMA CALCULADO:
Hexagrama ${hexagram.number}: ${hexagram.name}

INSTRUÇÕES:
Forneça uma resposta estruturada em EXATAMENTE três níveis, cada um com 3-4 frases completas:

1. NÍVEL FILOSÓFICO: Explique a sabedoria profunda do hexagrama em relação à pergunta. Use metáforas universais, princípios do Tao, conceitos de Yin/Yang, e a filosofia chinesa clássica. Fale sobre o momento cósmico e o fluxo natural das coisas.

2. NÍVEL METAFÍSICO: Descreva as energias sutis, o significado espiritual, e como as forças invisíveis do universo se manifestam nesta situação. Aborde o plano energético, sincronicidades, e o propósito superior desta experiência.

3. NÍVEL PRÁTICO: Dê orientações concretas e acionáveis que a pessoa pode aplicar imediatamente na situação descrita. Seja específico, claro e direto sobre os passos práticos a tomar.

IMPORTANTE:
- Use linguagem elegante, poética e profunda, mas compreensível
- Seja respeitoso com a sabedoria ancestral do I Ching
- Conecte o hexagrama especificamente com a área da vida mencionada (${request.area})
- Cada nível deve ter entre 60-100 palavras
- Mantenha um tom sábio, compassivo e orientador
- RESPONDA SEMPRE EM PORTUGUÊS BRASILEIRO

Forneça sua resposta no seguinte formato JSON:
{
  "philosophical": "texto aqui",
  "metaphysical": "texto aqui",
  "practical": "texto aqui"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extrai JSON da resposta
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Resposta da IA não está no formato esperado');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    return {
      hexagram: hexagram.number,
      hexagramName: hexagram.name,
      philosophical: parsedResponse.philosophical,
      metaphysical: parsedResponse.metaphysical,
      practical: parsedResponse.practical
    };
  } catch (error) {
    console.error('Erro ao consultar oráculo:', error);
    throw new Error('Erro ao gerar resposta do oráculo');
  }
}
