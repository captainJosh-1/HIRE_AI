import { error } from "node:console";
import prisma from "../../../lib/prisma.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";

const createCompany = async(
    userId:number,
    name:string,
    description:string,
    website:string,
    location:string,
    industry:string
)=>{
//get the userId 
//find recruiter
//if not found then error 
//creat company 
//error
// return
const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where:{
        userId
    }
});
if(!recruiterProfile){
    throw new ApiError(400,"Recruiter's Profile not found")
}

const Company= await prisma.company.create({
    data:{
    name,
    description,
    website,
    location,
    industry,

    recruiterProfile:{
        connect:{
            id:recruiterProfile.id
        }
    }
 }
});

if(!Company){
    throw new ApiError(400,"Company is created")
}
return Company;
}

const getCompany = async(
    userId:number
)=>{
//req.user
//find recruiterProfil
// error 
// find company by the id comparision 
//retrun

const recruiterProfile = await prisma.recruiterProfile.findUnique({
where:{
    userId
}
});

if(!recruiterProfile){
    throw new ApiError(400 , "Recruiter's Profile not found ")
}

const company = await prisma.company.findUnique({
    where:{
        recruiterProfileId:recruiterProfile.id 
    }
})

return company;
}

export {createCompany,getCompany};