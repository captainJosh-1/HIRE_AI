import type {  JobStatus } from "../../../generated/prisma/enums.js";
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

const getMyApplications = async(
    userId:number
)=>{
//get userId 
//find current user
//error
//find that appilication by jobSeekerProfileId (findMany)
// return

const currentUser =await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    }
})

if(!currentUser){
    throw new ApiError(404,"Job seeker profile not found")
};

const allApplications = await prisma.application.findMany({
    where:{
        jobSeekerProfileId:currentUser.id
    }
})
if(!allApplications){
    throw new ApiError(200,"Job applications are not found")
}

return allApplications;

}

//need a postman check 
const getMyOneApplication = async(
    userId:number,
    jobId:number
)=>{
//get userId 
//find current user
//error
//find that appilication by jobSeekerProfileId and  jobId both should be there
// return

const currentUser =await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    }
})

if(!currentUser){
    throw new ApiError(404,"Job seeker profile not found")
};

const oneApplication = await prisma.application.findUnique({
    where:{
        jobSeekerProfileId_jobId:{
                jobSeekerProfileId: currentUser.id,
                jobId
        }
    }
})
if(!oneApplication){
    throw new ApiError(200,"Job application is not found")
}

return oneApplication;

}
//need a postman check 
const deleteMyApplication = async(
    userId:number,
    applicationId:number
)=>{
//get userId 
//find current user
//error
//find application using applicationId and jobSeekerProfileId
//error
//delete taht application
//return

const currentUser =await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    }
})

if(!currentUser){
    throw new ApiError(404,"Job seeker profile not found")
};

const application = await prisma.application.findUnique({
    where:{
        id:applicationId
        }
})
if(!application){
   throw new ApiError(404,"Application not found")
};

if(application.jobSeekerProfileId !== currentUser.id){
    throw new ApiError(403 , "You cannot withdraw this application");
}
const deletedApplication = await prisma.application.delete({
    where:{
        id :applicationId
    }
});

return deletedApplication;
}

//NOW IM CREATING APIS FOR RECRUITER SIDE 

const getApplicants = async(
    userId:number,
    jobId:number
)=>{
//get userId 
//find recruiter Id 
//error
//find company
//error 
//find job
//error 
//check this job belong to this recruiter
//error
//find all applications fro this job
//return application for this job
const currentRecruiter = await prisma.recruiterProfile.findUnique({
    where:{
        userId
    }
})
if(!currentRecruiter){
    throw new ApiError(404, "Recruiter is not found")
}

const company =await prisma.company.findUnique({
    where:{
        recruiterProfileId:currentRecruiter.id
    }
})
if(!company){
    throw new ApiError(404, "company is not found")
}
const currentJob = await prisma.job.findUnique({
    where:{
        id:jobId
    }
})

if(!currentJob){
    throw new ApiError(404, "job didn't exist")
}

if(currentJob.companyId !== company.id){
    throw new ApiError(403, "you are not allowed see applicants of this job")
}
const allApplicants = await prisma.application.findMany({
    where:{
        jobId:jobId
    }
})

if(!allApplicants){
    throw new ApiError(404, "there are no applicants for this job")
}

return allApplicants;
}

const getOneApplication = async(
    userId:number,
    applicationId:number
)=>{
//get userId 
//find recruiter Id 
//error
//find company
//error 
//find job
//error 

//find application by applicationId
//error
//check application belong to job 
//owned by thsi recruiter ?
//error
//return application 
const currentRecruiter = await prisma.recruiterProfile.findUnique({
    where:{
        userId
    }
})
if(!currentRecruiter){
    throw new ApiError(404, "Recruiter is not found")
}

const company =await prisma.company.findUnique({
    where:{
        recruiterProfileId:currentRecruiter.id
    }
})
if(!company){
    throw new ApiError(404, "company is not found")
}
// const currentJob = await prisma.job.findUnique({
//     where:{
//         companyId:company.id
//     }
// })

// if(!currentJob){
//     throw new ApiError(404, "job didn't exist")
// }
const application = await prisma.application.findUnique({
    where:{
        id:applicationId
    }
})
if(!application){
    throw new ApiError(404,"application not found")
}
  const currentJob = await prisma.job.findUnique({
    where: {
      id: application.jobId
    }
  });

  if (!currentJob) {
    throw new ApiError(404, "Job didn't exist");
  }

 if (currentJob.companyId !== company.id) {
    throw new ApiError(403,"You are not allowed to see this application" );
  }

return application;
}

const updateStatus = async(
    userId:number,
    applicationId:number,
    status: ApplicationStatus

)=>{
//get recruiter
//error
//get company 
//error
//get job
//error
//now update status
//return

const currentRecruiter = await prisma.recruiterProfile.findUnique({
    where:{
        userId
    }
})
if(!currentRecruiter){
    throw new ApiError(404, "Recruiter is not found")
}

const company =await prisma.company.findUnique({
    where:{
        recruiterProfileId:currentRecruiter.id
    }
})
if(!company){
    throw new ApiError(404, "company is not found")
}

const application = await prisma.application.findUnique({
    where: {
      id:applicationId
    }
})

if (!application) {
    throw new ApiError(404, "Application not found");
}

const currentJob = await prisma.job.findUnique({
where: {
    id: application.jobId
}
});

if (!currentJob) {
  throw new ApiError(404, "Job not found");
}

if (currentJob.companyId !== company.id) {
  throw new ApiError(403,"You are not allowed to update this application");
}

  const updatedApplication = await prisma.application.update({
    where: {
      id: applicationId
    },
    data: {
      status
    }
  });

  return updatedApplication;
}
export {applyingToJob,getMyApplications,getMyOneApplication,deleteMyApplication,
    getApplicants,getOneApplication,updateStatus};