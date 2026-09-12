import { generateAIResponse } from "./ai.provider.js";
import { jobMatchGeminiSchema, jobMatchSchema } from "./types/jobMatch.schema.js";

export const matchResumeWithJob = async (
  resumeText: string,
  jobTitle: string,
  jobDescription: string,
  requirements: string | null,
  responsibilities: string | null
) => {
  const prompt = `
    Compare the candidate's resume with the given job.

    Analyze how well the candidate matches the job.

    Return:
    1. Match score from 0 to 100
    2. Matched skills
    3. Missing skills
    4. Experience match
    5. Overall explanation
    6. Suggestions for improvement

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


    const aiResponse = await generateAIResponse(prompt,jobMatchGeminiSchema);
    if (!aiResponse) {
    throw new Error("AI returned empty response");
    }



    let parsedResponse;

  try {
    parsedResponse = JSON.parse(aiResponse);
  } catch (error) {
    throw new Error("AI returned invalid JSON");
  }

  const validatedResponse =
    jobMatchSchema.safeParse(parsedResponse);

  if (validatedResponse.success) {
    return validatedResponse.data;
  } else {
    console.error(validatedResponse.error);

    throw new Error("AI response failed validation");
  }

};