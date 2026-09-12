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
You are an AI recruitment assistant.

Evaluate how well the candidate's resume matches the given job.

Use ONLY information provided in the candidate resume and job information.
Do not invent skills, experience, education, or achievements.

Evaluate the candidate based on:
- Technical and professional skills
- Relevant experience
- Job requirements
- Job responsibilities
- Overall relevance

Match skills semantically when appropriate, not only by exact keyword matches.

For the score:
- 90-100: Excellent match
- 75-89: Strong match
- 60-74: Moderate match
- 40-59: Weak match
- 0-39: Poor match

Do not automatically penalize a candidate simply because they are a student.
Consider the actual experience and skills demonstrated in the resume.

For missingSkills, include skills that are relevant or required for the job but are not demonstrated in the resume.

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