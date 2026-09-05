import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";

const addExpirence = async(
    userId:number,
    comapny:string,
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
            expirence:true
        }
    })

    if(!currentUser){
        throw new ApiError(404,"Profile not found")
    }

    const expirence = await prisma.expirence.create({
        data:{
        comapny,
        position,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description,
        jobSeekerProfileId:currentUser.id
        }
    })
    return expirence;
}

const getExpirence = async(
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
        expirence:true
    }
})

if(!currentUser){
    throw new ApiError(404,"profile not found")
}

const currentExpirence = currentUser.expirence

return currentExpirence;
}

const updateEXPI = async(
    userId:number,
    expirenceId:number
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
        }
        
    })
    if(!currentUser){
        throw new ApiError(404,"Profile not found")
    }

    const expirence = await prisma.expirence.findUnique({
        where:{
            expirenceId
        }
    })

    if(!expirence){
        throw new ApiError(404,"Expirence not found")
    }

    if(currentUser.id !== expirence.JobSeekerProfileId){
        throw new ApiError(403,"You are not allowed to update expirence")
    }

    const updateData: any = {}

    
}

export { addExpirence , getExpirence }