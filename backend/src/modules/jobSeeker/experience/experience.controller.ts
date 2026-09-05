import type { Response,Request } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { addExperience, deleteExpe, getExperience, updateExpe } from "./experience.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";


const addExperienceController = asyncHandler(async(req:Request , res:Response)=>{

    const { userId } = req.user!
    const {
        company,
        position,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description
    } = req.body;

    const currenetExpe = await addExperience(
        userId,
        company,
        position,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description
    )
    return res.status(200).json(new ApiResponse(200,currenetExpe,"Experience is added successfully"))
})


const getExperienceController = asyncHandler(async(req:Request , res:Response)=>{
    const { userId } = req.user!

    const usersExperience = await getExperience(userId)

    return res.status(200).json(new ApiResponse(200,usersExperience, "Expirence is fetched sccessfully"))
})


const updateExperienceController = asyncHandler(async(req:Request , res:Response)=>{
    const { userId } = req.user!
    const experienceId = Number(req.params.experienceId);
    const {
        company,
        position,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description
    } = req.body

    const updateExpirence =await updateExpe(
        userId,
        experienceId,
        company,
        position,
        location,
        employmentType,
        startDate,
        endDate,
        currentlyWorking,
        description,
    )
    return res.status(200).json(new ApiResponse(200,updateExpirence,"experience is updated successfully"))
})

const deleteExperienceController = asyncHandler(async(req:Request , res:Response)=>{
    const { userId } = req.user!
    const experienceId = Number(req.params.experienceId)

    const deleteExperience =await deleteExpe(
        userId,
        experienceId
    )

    return res.status(200).json(new ApiResponse(200, deleteExperience,"experience is deleted successfully"))
})
export { addExperienceController , getExperienceController, updateExperienceController,deleteExperienceController}