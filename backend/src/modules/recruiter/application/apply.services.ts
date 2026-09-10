import { application } from "express";
// import type { ApplicationStatus } from "../../../generated/prisma/enums.js";
import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";


const applyingToJob = async(
    userId:number,
    jobId:number,
    coverLetter:string
)=>{

//get userId
//get jobId
//find jobSeekerProfileId
//then check if error
//find jb 
//check the ststus 
//if openthen apply adn if not the we can't 
//error if not found
//check if already applied 
//then create application
//return it

const currentUser =await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    }
})


if(!currentUser){
    throw new ApiError(404,"Job seeker profile not found")
};

const job = await prisma.job.findUnique({
    where:{
        id:jobId
    }
})
if(!job){
    throw new ApiError(404, "Job is not found ")
};

if(job.status === "CLOSE" ){
    throw new ApiError(400 , "job applications are closed already")
}

const existingApplication = await prisma.application.findUnique({
    where: {
    jobSeekerProfileId_jobId: {
        jobSeekerProfileId: currentUser.id,
        jobId
        }
    }
});
if (existingApplication) {
    throw new ApiError(400, "You have already applied for this job");
}

const application = await prisma.application.create({
    data:{
        jobSeekerProfileId: currentUser.id,
        jobId: jobId,
        coverLetter
    }
});

return application;
}

export {applyingToJob};