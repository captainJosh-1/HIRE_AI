import { ApiError } from "../../../utils/ApiError.js";
import prisma from "../../../lib/prisma.js";


const addEducation = async (
    userId: number,
    degree: string,
    institution: string,
    branch: string,
    type: string,
    startYear: number,
    endYear: number,
    grade: string,
    currentlyStudying: boolean
) => {

    //get all the body data and userId 
    //check this profile is exist
    //find education
    //create record in education
    //return 

    const jobSeeker = await prisma.jobSeekerProfile.findUnique({
        where: {
            userId
        },
        include: {
            educations: true
        }
    })
    if (!jobSeeker) {
        throw new ApiError(400, "Profile not found")
    }

    const education = await prisma.education.create({
        data: {
            degree,
            institution,
            branch,
            type,
            startYear,
            endYear,
            grade,
            currentlyStudying,
            jobSeekerProfileId: jobSeeker.id
        }
    })

    return education;
}

const getEducation = async (
    userId: number
) => {
    const currentUser = await prisma.jobSeekerProfile.findUnique({
        where: {
            userId
        },
        include: {
            educations: true
        }
    })

    if (!currentUser) {
        throw new ApiError(400, "User doesn't exist")
    }

    const usersEdu = currentUser.educations;

    return usersEdu;
}

const updateEdu = async (
    userId: number,
    educationId: number,
    degree: string,
    institution: string,
    branch: string,
    type: string,
    startYear: number,
    endYear: number,
    grade: string,
    currentlyStudying: boolean
) => {
    const currentUser = await prisma.jobSeekerProfile.findUnique({
        where: {
            userId
        },
    })

    if (!currentUser) {
        throw new ApiError(404, "profile not found")
    }

    const education = await prisma.education.findUnique({
        where: {
            id: educationId,
        }
    });

    if (!education) {
        throw new ApiError(404, "education record not found")
    }

    if (education.jobSeekerProfileId !== currentUser.id) {
        throw new ApiError(403, "You are not allowed to update this education");
    }


    const updateData: any = {}

    if (degree !== undefined) updateData.degree = degree;
    if (institution !== undefined) updateData.institution = institution;
    if (branch !== undefined) updateData.branch = branch;
    if (type !== undefined) updateData.type = type;
    if (startYear !== undefined) updateData.startYear = startYear;
    if (endYear !== undefined) updateData.endYear = endYear;
    if (grade !== undefined) updateData.grade = grade;
    if (currentlyStudying !== undefined) updateData.currentlyStudying = currentlyStudying

    const updateEducation = await prisma.education.update({
        where:{
            id: educationId
        },
        data: updateData
    });

    return updateEducation;

}


const deleteEdu = async(
    userId:number,
    educationId:number
)=>{
    const currentUser = await prisma.jobSeekerProfile.findUnique({
        where:{
            userId
        }
    })

    if(!currentUser){
        throw new ApiError(404,"profile not found")
    }

    const currentEdu = await prisma.education.findUnique({
        where:{
            id:educationId
        }
    })
    if(!currentEdu){
        throw new ApiError(400,"Education doesn't exist")
    }

    if(currentEdu.jobSeekerProfileId !== currentUser.id){
        throw new ApiError(403 , "You are not allowed to delete education");
    }

    await prisma.education.delete({
        where:{
            id:educationId
        }
    });

    const remainingEdu = await prisma.education.findMany({
        where:{
            jobSeekerProfileId:currentUser.id
        }
    });

    return remainingEdu;


};
export { addEducation, getEducation , updateEdu,deleteEdu}