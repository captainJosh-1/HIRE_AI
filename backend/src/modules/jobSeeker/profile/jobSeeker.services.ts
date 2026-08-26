import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";

const getMyPofile = async( userId:number )=>{

    const jobSeekerProfile = await prisma.jobSeekerProfile.findUnique(
        {
            where: {
                userId :userId,
            },
        }
    )
    if(!jobSeekerProfile){
        throw new ApiError(404 , "Profile not found ")
    }

    return { jobSeekerProfile }
}

const updateProfile = async(
    userId:number,
    bio:string,
    phone:string,
    location:string
)=>{
    const jobSeekerUpdatedProfile = await prisma.jobSeekerProfile.update({
        where:{
            userId 
        },
        data:{
            bio,
            phone,
            location
        }
    })
    return {jobSeekerUpdatedProfile}
}


export { getMyPofile, updateProfile };