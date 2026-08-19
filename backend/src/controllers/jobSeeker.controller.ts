import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getMyPofile } from "../services/jobSeeker.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { updateProfile } from "../services/jobSeeker.services.js";
const getMyProfileController = asyncHandler(async( req: Request , res:Response)=>
    {
    const { userId } =req.user!;

    const jobSeekerProfile =await getMyPofile(userId);

    return  res.status(200).json(new ApiResponse(200, jobSeekerProfile , "Job seeker profile is fetched"))
});

const updateProfileController = asyncHandler(async(req:Request , res:Response)=>{
    const {bio, phone , location} = req.body
    const {userId} = req.user!;
    
    const updatedjobSeekerProfile =await updateProfile(
        userId,
        bio,
        phone,
        location
    );

    return res.status(200).json(new ApiResponse(200 , updatedjobSeekerProfile ,"Profile is updated successfully"))
})

export { getMyProfileController , updateProfileController }