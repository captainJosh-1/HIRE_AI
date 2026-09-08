// import type { Request,Response } from "express";
import type { Request , Response } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { creatingJob,getjob,deleteJob, updateJob } from "./job.services.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { EmploymentType, JobStatus } from "../../../generated/prisma/client.js";


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

const getJobController = asyncHandler(async(req:Request,res:Response)=>{
const { userId } = req.user!
const jobId  = Number(req.params.jobId);

const gettingJob = await getjob(userId,jobId);

    res.status(200).json(new ApiResponse(200,gettingJob,"job is fetched successfully"))

})

const deleteJobController = asyncHandler(async(req:Request,res:Response)=>{
    const { userId } = req.user!
    const jobId  = Number(req.params.jobId);

    const deletingJob = await deleteJob(userId,jobId);

        res.status(200).json(new ApiResponse(200,deletingJob,"job is deleted successfully"))

})


const updateJobController = asyncHandler(async (req: Request, res: Response) => {
 const { userId } = req.user!;
 const { jobId } = req.params;
 const updateData = req.body;
 const updatedJob = await updateJob(
    userId,
    Number(jobId),
    updateData)
 
 res.status(200).json(new ApiResponse(200,updatedJob,"Job updated successfully"));
});

export {createJobController,getJobController,deleteJobController,updateJobController};