import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, directly initialize GoogleGenAI and assume API_KEY is present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDescription = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a short, delicious, and appealing food description for a Padang dish called "${productName}". Keep it under 20 words.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description.";
  }
};

export const searchWithGoogle = async (query: string): Promise<{ text: string; sources: any[] }> => {
  try {
    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: query,
       config: {
         tools: [{googleSearch: {}}],
       },
    });
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, sources };
  } catch (error) {
    console.error("Error with Google Search grounding:", error);
    return { text: "An error occurred while searching.", sources: [] };
  }
};

export const searchWithMaps = async (query: string, location: { latitude: number; longitude: number }): Promise<{ text: string; sources: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{googleMaps: {}}],
        toolConfig: {
          retrievalConfig: {
            latLng: location
          }
        }
      },
    });
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, sources };
  } catch (error) {
    console.error("Error with Google Maps grounding:", error);
    return { text: "An error occurred while searching with Maps.", sources: [] };
  }
};
