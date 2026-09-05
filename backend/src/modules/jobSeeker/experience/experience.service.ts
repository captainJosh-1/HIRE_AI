import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";

const addExperience = async(
    userId:number,
    company:string,
    position:string,
    employmentType:string,
    location:string,
    startDate:number,
    endDate:number,
    currentlyWorking:boolean,
    description:string
)=>{

    //get all the data from body 
    //get userId
    //find the user incude expirence
    //if not found then error 
    //creaate entry in expirence model by using prisma 
    // retuen that 

    const currentUser = await prisma.jobSeekerProfile.findUnique({
        where:{
            userId
        },
        include:{
            experiences:true
        }
    })

    if(!currentUser){
        throw new ApiError(404,"Profile not found")
    }

    const experience = await prisma.experience.create({
        data:{
        company,
        position,
        employmentType,
        location,
        startDate:new Date(startDate),
        endDate:endDate ? new Date(endDate) : null,
        currentlyWorking,
        description,
        jobSeekerProfileId:currentUser.id
        }
    })
    return experience;
}

const getExperience = async(
    userId:number
)=>{
//get the suer id from req.user 
//find the currrent user then 
// take out the expirence array 
// and return it 

const currentUser = await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    },
    include:{
        experiences:true
    }
})

if(!currentUser){
    throw new ApiError(404,"profile not found")
}

const currentExperience = currentUser.experiences

return currentExperience;
}

const updateExpe = async(
    userId:number,
    experienceId:number,
    company:string,
    position:string,
    location:string,
    employmentType:string,
    startDate:number,
    endDate:number,
    currentlyWorking:string,
    description:string
)=>{
    //get the user and expirence id 
    //get all the data is gonna update
    //find the cureent user 
    //then error 
    //find expirence record 
    //error
    //then update them each 
    //return 
    

    const currentUser = await prisma.jobSeekerProfile.findUnique({
        where:{
            userId
        },
        include:{
            experiences:true
        }
        
    })
    if(!currentUser){
        throw new ApiError(404,"Profile not found")
    }

    const experience = await prisma.experience.findUnique({
        where:{
            id:experienceId
        }
    })

    if(!experience){
        throw new ApiError(404,"Expirence not found")
    }

    if(currentUser.id !== experience.jobSeekerProfileId){
        throw new ApiError(403,"You are not allowed to update expirence")
    }

    const updateData: any = {}

    
    if (company !== undefined) updateData.company = company;
    if (position !== undefined) updateData.position = position;
    if (employmentType !== undefined) updateData.employmentType = employmentType;
    if (location !== undefined) updateData.location = location;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (currentlyWorking !== undefined) updateData.currentlyWorking = currentlyWorking;
    if (description !== undefined) updateData.description = description;

    const updateExperience = await prisma.experienec.update({
        where:{
            id:experienceId
        },
        data:{
            updateData
        }
    })

    return updateExperience;
}

const deleteExpe= async(
    userId:number,
    experienceId:number
)=>{
//get expirence id and userId from re 
//find currentUser 
//then extract expirence and
//verify
//delete from expirence by expirence id 


const currentUser = await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    }
})

 if(!currentUser){
        throw new ApiError(404,"Profile not found")
    }

    const  currenetExperience = await prisma.experience.findUnique({
        where:{
            id:experienceId
        }
    })
    if(!currenetExperience){
        throw new ApiError(400,"expirence isnt found")
    }

    if(currentUser.id !== currenetExperience.jobSeekerProfileId){
        throw new ApiError(403, "You are not allowed to dlete expirence")
    }

    await prisma.experience.delete({
        where:{
            id:experienceId
        }
    })

    const remainingExpe = await prisma.experience.findMany({
        where:{
            jobSeekerProfileId:currentUser.id 
        }
    })

    return remainingExpe;
}
export { addExperience , getExperience ,updateExpe ,deleteExpe}