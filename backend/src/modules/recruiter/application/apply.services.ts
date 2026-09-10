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


export {applyingToJob,getMyApplications,getMyOneApplication,deleteMyApplication};