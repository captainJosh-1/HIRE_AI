// import type { Request,Response } from "express";
import type { Request , Response } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { creatingJob } from "./job.services.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";



const createJobController = asyncHandler(async(req:Request,res:Response)=>{
    const { userId } = req.user!

    const {
  title,      
  description,      
  location,      
  employmentType,    
  salaryMin,         
  salaryMax,        
  requirements,    
  responsibilities,  
  deadline,          
  status
    } = req.body

    const jobCreate = await creatingJob(
    userId,
    title,      
    description,      
    location,      
    employmentType,    
    salaryMin,         
    salaryMax,        
    requirements,    
    responsibilities,  
    deadline,          
    status,
    )

    res.status(200).json(new ApiResponse(200,jobCreate,"job is created successfully"))
})
export {createJobController,};