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

     let skill = await prisma.skill.findUnique({
        where:{
            name
        }
    })

    if(!skill){
        skill = await prisma.skill.create({
            data:{
                name
            }
        });
    }
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

const getMySkills = async(
    userId:number
)=>{
    //get the user with skill table 
    //check user by if condition then if it is there 
    //then store the skill this user contain and return 
    const currentUser = await prisma.JobSeekerProfile.findUnique(
        {
            where:{
                userId
            },
            include:{
                skills:true
            }
        },
    )

    if(!currentUser){
        throw new ApiError(400 , "User didnt exist ")
    }

    const userSkills =currentUser.skills;

    return userSkills;
} 

const deleteMyskills = async(
    userId:number,
    skillId:number
)=>{
    const currentUser = await prisma.JobSeekerProfile.findUnique(
        {
            where:{
                userId
            },
            include:{
                skills:true
            }
        }
    )
    if(!currentUser){
        throw new ApiError(400 , "User didnt exist ")
    }

    const skillExists = currentUser.skills.some(
        (skill)=> skill.id === skillId
    );

    if(!skillExists){
        throw new ApiError(404 , "Skill is not associated with your profile");
    }

    const deleteSkill = await prisma.JobSeekerProfile.update({
        where:{
            id:currentUser.id
        },
        data:{
            skills:{
                disconnect:{
                    id:skillId
                }
            }
        },
        include:{
            skills:true
        }
    });

    return deleteSkill;
    }

export { getMyPofile, updateProfile , addSkills , getMySkills , deleteMyskills};