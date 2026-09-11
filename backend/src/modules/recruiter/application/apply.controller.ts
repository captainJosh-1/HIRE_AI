import type { Request,Response } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { applyingToJob ,deleteMyApplication,getMyApplications, getMyOneApplication,getApplicants, getOneApplication, updateStatus} from "./apply.services.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

const applyJobController = asyncHandler(async(req:Request, res:Response)=>{


const { userId } = req.user!
const jobId = Number(req.params.jobId)
const { coverLetter } = req.body;

const jobApplication = await applyingToJob(
    userId,
    jobId,
    coverLetter
);

res.status(200).json(new ApiResponse(200 ,jobApplication, "Job application is submitted"))
});

const getAllApplicationController = asyncHandler(async(req:Request, res:Response)=>{
const { userId } = req.user!;

const allApplications = await getMyApplications(userId);

res.status(200).json(new ApiResponse(200 ,allApplications, "Job applications are found"))

})
//need to chekc 
const getOneApplicationController = asyncHandler(async(req:Request, res:Response)=>{
const { userId } = req.user!;
const jobId = Number(req.params.jobId)

const allApplications = await getMyOneApplication(userId,jobId);

res.status(200).json(new ApiResponse(200 ,allApplications, "Job application is found"))

})
const deleteApplicationController = asyncHandler(async(req:Request, res:Response)=>{
    const {userId } = req.user!
    const applicationId = Number(req.params.applicationId)

    const deleteApplication = await deleteMyApplication(userId , applicationId);

    res.status(200).json(new ApiResponse(200 ,deleteApplication, "Job application is deleted"))

})

const getApplicantsController =asyncHandler(async(req:Request , res:Response)=>{
    
    const {userId } = req.user!
    const jobId = Number(req.params.jobId)

    const getApplicant = await getApplicants(
     userId,
     jobId
    )

    res.status(200).json(new ApiResponse(200 ,getApplicant, "Job applicants are fetched successfully"))
})

const getOneApplicantController = asyncHandler(async(req:Request , res:Response)=>{
    const { userId } = req.user!
    const applicationId = Number(req.params.applicationId)

    const getOneapplicant = await getOneApplication(userId,applicationId)

    res.status(200).json(new ApiResponse(200 ,getOneapplicant, "This Job applicant is fetched successfully"))


})

const updateStatusController =asyncHandler(async(req:Request,res:Response)=>{
    const { userId } = req.user!
    const applicationId = Number(req.params.applicationId)
    const { status } = req.body;

    const updateApplicationStatus = await  updateStatus(userId,applicationId,status)
    res.status(200).json(new ApiResponse(200 ,updateApplicationStatus, "This Job applicant is fetched successfully"))

})

export {applyJobController,getAllApplicationController,getOneApplicationController,deleteApplicationController,
    getApplicantsController,getOneApplicantController,updateStatusController};