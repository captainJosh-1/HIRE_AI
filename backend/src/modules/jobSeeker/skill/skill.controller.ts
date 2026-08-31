import type { Request, Response } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { addSkills,getMySkills, deleteMyskills } from "./skill.services.js";



const addSkillController = asyncHandler(async( req:Request , res:Response)=>{
    const { name } = req.body;
    const { userId } = req.user!

    const skillsAdded = await addSkills(
        userId,
        name,
    );

    return res.status(200).json(new ApiResponse(200 , skillsAdded, "Skills are added successfully"))
})

const getMySkillController = asyncHandler(async(req:Request , res:Response)=>{
    const {userId} = req.user!

    const MySkills = await getMySkills(
        userId
    )

    return res.status(200).json(new ApiResponse(200 , MySkills,"User skills are fechted"))
})

const deleteMySkills = asyncHandler(async(req:Request , res:Response)=>{
    const {userId} =req.user!
    const {skillId} = req.params

    const deleteSkill = await deleteMyskills(
        userId,
        Number(skillId)
    )

    return res.status(200).json(new ApiResponse(200 , deleteSkill , "Skill is delted"))
})

export {addSkillController , getMySkillController, deleteMySkills}