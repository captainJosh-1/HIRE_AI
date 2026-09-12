import "dotenv/config";
import { GoogleGenAI ,Type} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
   apiKey: GEMINI_API_KEY
});
export const generateAIResponse = async(prompt :string)=>{

       const response  = await ai.models.generateContent({
       model: 'gemini-3.6-flash',
       contents: prompt,
       

       config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: {
            type: Type.NUMBER,
          },
          strengths: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          weaknesses: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          missingSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        required: [
          "score",
          "strengths",
          "weaknesses",
          "missingSkills",
          "suggestions",
        ],
      },
    },
  });

   return response.text;
};