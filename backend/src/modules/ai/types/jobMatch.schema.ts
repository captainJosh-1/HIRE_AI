import { z } from "zod";
import { Type } from "@google/genai";

 const jobMatchSchema = z.object({
  score: z.number().min(0).max(100),

  matchedSkills: z.array(z.string()),

  missingSkills: z.array(z.string()),

  experienceMatch: z.string(),

  explanation: z.string(),

  suggestions: z.array(z.string()),
});


 const jobMatchGeminiSchema = {
  type: Type.OBJECT,

  properties: {
    score: {
      type: Type.NUMBER,
    },

    matchedSkills: {
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

    experienceMatch: {
      type: Type.STRING,
    },

    explanation: {
      type: Type.STRING,
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
    "matchedSkills",
    "missingSkills",
    "experienceMatch",
    "explanation",
    "suggestions",
  ],
};

export type JobMatchResponse = z.infer<typeof jobMatchSchema>;

export {jobMatchSchema , jobMatchGeminiSchema}