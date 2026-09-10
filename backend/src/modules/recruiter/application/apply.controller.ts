import type { Request,Response } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { applyingToJob } from "./apply.services.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

const applyJobController = asyncHandler(async(req:Request, res:Response)=>{


const { userId } = req.user!
const jobId = Number(req.params.jobId)
const { coverLetter } = req.body;

const jobApplication = await applyingToJob(
    userId,
    jobId,
    coverLetter
);

res.status(200).json(new ApiResponse(200 ,jobApplication, "Job application is submitted"))

});

export {applyJobController};