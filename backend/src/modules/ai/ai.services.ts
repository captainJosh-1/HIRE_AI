import { generateAIResponse } from "./ai.provider.js"

export const analyzeResume =async(resumeText :string)=>{

    const prompt = `
    Analyze this resume and tell me:

    1. Strengths
    2. Weaknesses
    3. Missing skills
    4. Suggestions for improvement
    
    Resume:
    ${resumeText}
    `;

    const aiResponse = await generateAIResponse(prompt);

    return aiResponse;
}