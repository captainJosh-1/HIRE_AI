import type { Response,Request } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { addEducation , getEducation ,updateEdu, deleteEdu} from "./education.services.js";
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

const updateEducationController = asyncHandler(async(req:Request , res:Response)=>{
    const educationId  = Number(req.params.educationId);
    const { userId } = req.user!
    const { 
    degree,
    institution,
    branch,
    type,
    startYear,
    endYear,
    grade,
    currentlyStudying
    }= req.body;

    const updateEducation = await updateEdu(
    userId,
    educationId,
    degree,
    institution,
    branch,
    type,
    startYear,
    endYear,
    grade,
    currentlyStudying,
    )

    return res.status(200).json(new ApiResponse(200,updateEducation,"Education is get updated"))
})

const deleteEducationController = asyncHandler(async(req:Request , res:Response)=>{
const { userId } = req.user!
const educationId  = Number(req.params.educationId)

const deleteEducation = await deleteEdu(
    userId,
    educationId
)

return res.status(200).json(new ApiResponse(200,deleteEducation,"Education is deleted successfully"));
})
export {addEducationController , getEducationController , updateEducationController,deleteEducationController}