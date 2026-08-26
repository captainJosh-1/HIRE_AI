import type { Request, Response } from "express";
import { getMyPofile } from "./jobSeeker.services.js";
import { updateProfile } from "./jobSeeker.services.js";

import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";

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


// const addSkillController = asyncHandler(async( req:Request , res:Response)=>{
//     const { name } = req.body;
//     const { userId } = req.user!

//     const skillsAdded = await addSkills(
//         userId,
//         name,
//     );

//     return res.status(200).json(new ApiResponse(200 , skillsAdded, "Skills are added successfully"))
// })

// const getMySkillController = asyncHandler(async(req:Request , res:Response)=>{
//     const {userId} = req.user!

//     const MySkills = await getMySkills(
//         userId
//     )

//     return res.status(200).json(new ApiResponse(200 , MySkills,"User skills are fechted"))
// })

// const deleteMySkills = asyncHandler(async(req:Request , res:Response)=>{
//     const {userId} =req.user!
//     const {skillId} = req.params

//     const deleteSkill = await deleteMyskills(
//         userId,
//         Number(skillId)
//     )

//     return res.status(200).json(new ApiResponse(200 , deleteSkill , "Skill is delted"))
// })

export { getMyProfileController , updateProfileController ,addSkillController , getMySkillController, deleteMySkills}