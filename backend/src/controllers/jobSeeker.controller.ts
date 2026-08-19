import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getMyPofile } from "../services/jobSeeker.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getMyProfileController = asyncHandler(async( req: Request , res:Response)=>
    {
    const { userId } =req.user!;

    const jobSeekerProfile =await getMyPofile(userId);

    return  res.status(200).json(new ApiResponse(200, jobSeekerProfile , "Job seeker profile is fetched"))
});

export { getMyProfileController }