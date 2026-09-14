import { generateAIResponse } from "./ai.provider.js";
import { coverLetterGeminiSchema, coverLetterSchema } from "./types/coverLetter.js";

const generateCoverLetter = async(
    resumeText:string,
    jobTitle :string,
    jobDescription: string,
    requirements: string | null,
    responsibilities: string | null
)=>{
    const prompt = `
You are an AI career assistant.

Generate a professional and personalized cover letter
for the candidate applying to the given job.

Use only the information provided in the candidate's resume
and the job details.

Do not invent any:
- skills
- experience
- achievements
- certifications
- education
- companies
- job titles
- metrics

Highlight the genuine connection between the candidate's
background and the job.

Keep the cover letter concise, professional, and specific.
Avoid generic filler.

Candidate Resume:
${resumeText}

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Job Requirements:
${requirements ?? "Not provided"}

Job Responsibilities:
${responsibilities ?? "Not provided"}

Return only the requested structured response.
`;

const aiResponse = await generateAIResponse(
  prompt,
  coverLetterGeminiSchema
);

if (!aiResponse) {
throw new Error("AI returned empty response");
}


let parsedResponse;

try {
    parsedResponse = JSON.parse(aiResponse);
} catch {
    throw new Error("AI returned invalid JSON");
}


const validatedResponse =
  coverLetterSchema.safeParse(parsedResponse);

if (validatedResponse.success) {
  return validatedResponse.data;
} else {
  console.error(validatedResponse.error);
  throw new Error("AI response failed validation");
}
}

export{generateCoverLetter};