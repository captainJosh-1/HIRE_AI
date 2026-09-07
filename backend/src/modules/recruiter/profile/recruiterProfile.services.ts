import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";


const getMyProfile = async(userId:number)=>{
const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where:{
        userId
    }
});

if(!recruiterProfile){
    throw new ApiError(404,"Profile not found")
}

return recruiterProfile;
}

const updateMyProfile = async(
    userId:number,
    designation:string,
    phone:string,
    bio:string
)=>{
    const recruiterProfile = await prisma.recruiterProfile.update({
        where:{
            userId
        },
        data:{
            designation,
            phone,
            bio
        }
    })

    if(!recruiterProfile){
        throw new ApiError(400, "Proifle is not updated or found")
    }

    return recruiterProfile;
}

export {getMyProfile, updateMyProfile};