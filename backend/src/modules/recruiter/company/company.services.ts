import prisma from "../../../lib/prisma.js";
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
const existingCompany  = await prisma.company.findUnique({
    where:{
        recruiterProfileId:recruiterProfile.id
    }
})
if(existingCompany ){
    throw new ApiError(400,"You already have an company")
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

if(!company){
    throw new ApiError(400 , "Company doesn't exist")
}

return company;
}
//future enhancements 
//when recruiter is trying to creat more than one company we  should handle that with proper manner 
//when he is try to get a compy evern not regster we should manage that too 


const updateCompany = async(
    userId:number,
    name:string,
    description:string,
    website:string,
    location:string,
    industry:string
)=>{
    //get all the details 
    //req.user
    //find recruiterProfile 
    //error not found 
    //find company where recruiterprofile id is equal to recruiterprofile.id 
    //error
    //now update those field which re changed only
    //and return update variable 

    const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where:{
            userId
        }
    });

    if(!recruiterProfile){
        throw new ApiError(400,"Recruiter profile not found")
    }

    const company = await prisma.company.findUnique({
        where:{
            recruiterProfileId:recruiterProfile.id
        }
    });

    if(!company){
        throw new ApiError(404,"Company not found")
    };

    if(company.recruiterProfileId !== recruiterProfile.id){
        throw new ApiError(403, "You are not allowed to update this company details");
    };

    const updateCompanyData:any = {}


    if(name !== undefined) updateCompanyData.name = name;
    if(description !== undefined) updateCompanyData.description = description;
    if(website !== undefined) updateCompanyData.website = website;
    if(location !== undefined) updateCompanyData.location = location;
    if(industry !== undefined) updateCompanyData.industry = industry;


    const updateCompany = await prisma.company.update({
        where:{
            id:company.id
        },
        data: updateCompanyData
    });
    return updateCompany;

}
export {createCompany,getCompany,updateCompany};