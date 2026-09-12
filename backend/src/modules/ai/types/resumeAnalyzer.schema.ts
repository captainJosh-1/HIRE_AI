//  `score`          `number`    Score between **0–100**                            
//  `strengths`      `string[]`  List of the candidate's strengths                  
//  `weaknesses`     `string[]`  List of weaknesses or areas to improve             
//  `missingSkills`  `string[]`  Skills relevant to the resume/job that are missing 
//  `suggestions`    `string[]`  Actionable suggestions for improving the resume    


import { z } from "zod";
import { Type } from "@google/genai";
export const resumeAnalyzerSchema = z.object({
  score: z.number().min(0).max(100),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  missingSkills: z.array(z.string()),

  suggestions: z.array(z.string()),
});



 export const resumeAnalyzerGeminiSchema = {
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
      }

export type ResumeAnalyzerResponse = z.infer<
  typeof resumeAnalyzerSchema
>;