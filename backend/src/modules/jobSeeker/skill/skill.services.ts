import { ApiError } from "../../../utils/ApiError.js";
import prisma from "../../../lib/prisma.js";


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

export { addSkills , getMySkills , deleteMyskills};