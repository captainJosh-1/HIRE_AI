import type { Response,Request } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { addEducation , getEducation } from "./education.services.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

const addEducationController = asyncHandler(async(req:Request , res:Response)=>{

    const { 
        degree,
        institution,
        branch,
        type,
        startYear,
        endYear,
        grade,
        currentlyStudying
    } = req.body;

    const { userId } = req.user!

    const addingEdu = await addEducation(
        userId,
        degree,
        institution,
        branch,
        type,
        startYear,
        endYear,
        grade,
        currentlyStudying
    )

    return res.status(200).json(new ApiResponse(200,addingEdu,"education is successfully added"))
})

const getEducationController = asyncHandler(async(req:Request , res:Response)=>{
    const {userId} = req.user!

    const getJobSeekerEdu = await getEducation(userId)

    return res.status(200).json(new ApiResponse(200 , getJobSeekerEdu,"all education is fetched successully"))
})
export {addEducationController , getEducationController}