//  `score`          `number`    Score between **0–100**                            
//  `strengths`      `string[]`  List of the candidate's strengths                  
//  `weaknesses`     `string[]`  List of weaknesses or areas to improve             
//  `missingSkills`  `string[]`  Skills relevant to the resume/job that are missing 
//  `suggestions`    `string[]`  Actionable suggestions for improving the resume    


import { z } from "zod";

export const resumeAnalyzerSchema = z.object({
  score: z.number().min(0).max(100),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  missingSkills: z.array(z.string()),

  suggestions: z.array(z.string()),
});

export type ResumeAnalyzerResponse = z.infer<
  typeof resumeAnalyzerSchema
>;