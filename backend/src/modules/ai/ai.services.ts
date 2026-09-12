import { generateAIResponse } from "./ai.provider.js"
import { resumeAnalyzerSchema ,resumeAnalyzerGeminiSchema} from "./types/resumeAnalyzer.schema.js";

export const analyzeResume =async(resumeText :string)=>{

    const prompt = `
    Analyze this resume and provide a resume quality score from 0 to 100.

    Return the analysis with:
    
    1. Score
    2. Strengths
    3. Weaknesses
    4. Missing skills
    5. Suggestions for improvement
    
    Resume:
    ${resumeText}
    `;

    const aiResponse  = await generateAIResponse(prompt,resumeAnalyzerGeminiSchema);

    if (!aiResponse) {
    throw new Error("AI returned empty response");
    }

    let parsedResponse;

    try{
        parsedResponse = JSON.parse(aiResponse);
    } catch (error) {
        throw new Error("AI returned invalid JSON")
    }

    //validate by zod 
    const validatedResponse = resumeAnalyzerSchema.safeParse(parsedResponse);

    if (validatedResponse.success) {
        return validatedResponse.data;
    } else {
    console.error(validatedResponse.error);
    throw new Error("AI response failed validation");
    }
}