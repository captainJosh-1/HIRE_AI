import type { Response,Request } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";

import { extractPdfText } from "../../utils/pdfTextExtractor.js";
import { analyzeResume } from "./ai.services.js";

import { ApiResponse } from "../../utils/ApiResponse.js";
import prisma from "../../lib/prisma.js";

const analyzeResumeController = asyncHandler(async(req:Request , res:Response)=>{

    // const file = req.file;

    // if(!file){
    //     throw new ApiError(400,"Resume PDF is required");
    // }

    const userId = req.user!.userId;

    const profile = await prisma.jobSeekerProfile.findUnique({
      where: {
        userId,
      },
      include: {
        resume: true,
      },
    });

    if (!profile) {
      throw new ApiError(404, "Job seeker profile not found");
    }

    if (!profile.resume) {
      throw new ApiError(404, "Resume not found, Upload your Resume");
    }

    const response = await fetch(profile.resume.fileUrl);

    if (!response.ok) {
      throw new ApiError(500, "Failed to fetch resume");
    }

    const arrayBuffer = await response.arrayBuffer();

    //convert pdf to buffer 
    const buffer = Buffer.from(arrayBuffer);


    const resumeText = await extractPdfText(buffer);

    const result = await analyzeResume(resumeText);

    return res.status(200).json(new ApiResponse(200,result,"Resume analyzed successfully"))

})

export {analyzeResumeController }