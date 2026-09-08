import { connect } from "node:http2";
import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";


const creatingJob = async(
  userId:number, 
  title:string,      
  description:string,      
  location:string,      
  employmentType:string,    
  salaryMin:number,         
  salaryMax:number,        
  requirements:string,    
  responsibilities:string,  
  deadline:string,          
  status:string
)=>{
//get userId  and data from body 
//find recruiterProfile by userId 
//error 
//find company by recruiterProfileId
//error
//create job with companyId :company.id
// return created job

const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where:{
        userId
    }
});
if(!recruiterProfile){
    throw new ApiError(400, "Proifle is not found")
}

const company = await prisma.company.findUnique({
    where:{
        recruiterProfileId:recruiterProfile.id
    }
});
if(!company){
    throw new ApiError(400, "company is not found")
}

const Job = await prisma.job.create({
    data:{
  title,      
  description,      
  location,      
  employmentType,    
  salaryMin,         
  salaryMax,        
  requirements,    
  responsibilities,  
  deadline:deadline ? new Date(deadline): null,          
  status,

  company :{
    connect :{
        id: company.id
    }
  }
}
});

return Job;
}

export {creatingJob};