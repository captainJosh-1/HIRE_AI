import "dotenv/config";
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
   apiKey: GEMINI_API_KEY
});

async function main() {
   const response  = await ai.models.generateContent({
       model: 'gemini-3.6-flash',
       contents: 'Why is the sky blue?'
   });
   console.log(response.text);
}
main();