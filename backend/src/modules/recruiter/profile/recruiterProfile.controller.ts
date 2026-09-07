import type { Request, Response } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { getMyProfile, updateMyProfile } from "./recruiterProfile.services.js";
const getMyProfileController = asyncHandler(async( req: Request , res:Response)=>
    {
    const { userId } =req.user!;

    const recruiterProfile =await getMyProfile(userId);

    return  res.status(200).json(new ApiResponse(200, recruiterProfile , "Job seeker profile is fetched"))
});

const updateMyProfileController = asyncHandler(async(req:Request, res:Response)=>{
    const { userId } =req.user!;
    const {
        designation,
        phone,
        bio
    } = req.body;


    const updateProfile = await updateMyProfile(
        userId,
        designation,
        phone,
        bio
    )

    res.status(200).json(new ApiResponse(200,updateProfile,"profile get updated"))

})

export {getMyProfileController , updateMyProfileController}