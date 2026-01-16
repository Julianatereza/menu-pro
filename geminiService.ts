
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  // O Vite exige o prefixo VITE_ para expor variáveis ao navegador
  // @ts-ignore
  const viteKey = import.meta.env?.VITE_API_KEY;
  // Fallback para process.env caso o shim do Vite esteja ativo
  const processKey = typeof process !== 'undefined' ? process.env?.API_KEY : "";
  
  return viteKey || processKey || "";
};

const apiKey = getApiKey();
// Só inicializa se houver uma chave para evitar erros no console
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function suggestMenuDescription(itemName: string, restaurantType: string) {
  if (!ai) {
    console.warn("Gemini API: Chave não encontrada. Verifique as variáveis VITE_API_KEY ou API_KEY na Vercel.");
    return "Um prato especial preparado com ingredientes frescos e selecionados.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sugira uma descrição gourmet curta (máximo 15 palavras) para o prato "${itemName}" em um restaurante do tipo "${restaurantType}". Seja apetitoso e use palavras sofisticadas em português.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });

    return response.text?.trim() || "Uma delícia preparada com carinho.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Um prato especial preparado com ingredientes frescos e selecionados.";
  }
}
