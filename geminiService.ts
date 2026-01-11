
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function suggestMenuDescription(itemName: string, restaurantType: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sugira uma descrição gourmet curta (máximo 15 palavras) para o prato "${itemName}" em um restaurante do tipo "${restaurantType}". Seja apetitoso e use palavras sofisticadas em português.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });

    return response.text?.trim() || "Descrição deliciosa em breve...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Um prato especial preparado com ingredientes frescos e selecionados.";
  }
}
