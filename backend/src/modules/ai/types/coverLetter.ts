import { z } from "zod";
import { Type } from "@google/genai";

const coverLetterSchema = z.object({
  coverLetter: z.string(),
});

const coverLetterGeminiSchema = {
  type: Type.OBJECT,
  properties: {
    coverLetter: {
      type: Type.STRING,
    },
  },
  required: ["coverLetter"],
};

export {coverLetterSchema,coverLetterGeminiSchema}