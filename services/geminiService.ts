
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateQuestionsForCategory(categoryName: string): Promise<string[]> {
  try {
    const prompt = `Genera una lista de 100 preguntas de conversación únicas y creativas en español, del tipo "${categoryName}". Las preguntas deben ser interesantes, abiertas y fomentar la discusión. No incluyas preguntas repetitivas o muy básicas. Devuelve la respuesta como un array de strings en formato JSON. No incluyas nada más que el array JSON en tu respuesta.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: 'Una pregunta para iniciar una conversación.'
          },
        },
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);

    if (!Array.isArray(questions) || questions.some(q => typeof q !== 'string')) {
        throw new Error("La respuesta de la API no es un array de strings válido.");
    }

    return questions;

  } catch (error) {
    console.error("Error generating questions with Gemini:", error);
    throw new Error("No se pudieron generar las preguntas. Por favor, revisa la configuración de tu API Key y vuelve a intentarlo.");
  }
}
