import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";

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

const addSkills = async(
    userId:number,
    name:string
)=>{
    let skill = await prisma.skill.findUnique({
        where:{
            name
        }
    })
    
    const jobseeker = await prisma.jobSeekerProfile.findUnique({
        where:{
            userId 
        },
        include :{
            skills: true
        }
    });

    if(!jobseeker) {
        throw new ApiError(400 , "Profile not found")
    }

    if(!skill){
        skill = await prisma.skill.create({
            data:{
                name
            }
        });
    
    const alreadyHasSkill =jobseeker.skills.some(
        (existingSkill) => existingSkill.id === skill.id 
    );

    if(alreadyHasSkill){
        throw new ApiError(400 , "Skill already exists in your profile")
    };

    const updatedProfile = await prisma.jobSeekerProfile.update({
        where: {
            id :jobseeker.id
        },
        data: {
            skills:{
                connect:{
                    id:skill.id 
                }
            }
        },
        include:{
            skills: true
        }
    });

    return updatedProfile;
}
}
export { getMyPofile, updateProfile , addSkills};