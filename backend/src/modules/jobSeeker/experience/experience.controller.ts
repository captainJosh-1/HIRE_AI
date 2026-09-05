import type { Response,Request } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { addExpirence, getExpirence } from "./experience.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";


const addExperienceController = asyncHandler(async(req:Request , res:Response)=>{

    const { userId } = req.user!
    const {
        comapny,
        position,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description
    } = req.body;

    const currenetExpi = addExpirence(
        userId,
        comapny,
        position,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description
    )
    return res.status(200).json(new ApiResponse(200,currenetExpi,"Expirence is added successfully"))
})


const getExpirenceControllwer = asyncHandler(async(req:Request , res:Response)=>{
    const { userId } = req.user!

    const usersExpirence = await getExpirence(userId)

    return res.status(200).json(new ApiResponse(200,usersExpirence, "Expirence is fetched sccessfully"))
})


const updateExpirenceController = asyncHandler(async(req:Request , res:Response)=>{
    const { userId } = req.user!
    const { expirenceId } = req.params

    
})
export { addExperienceController , getExpirenceControllwer}