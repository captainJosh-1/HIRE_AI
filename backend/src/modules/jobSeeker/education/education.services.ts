import { ApiError } from "../../../utils/ApiError.js";
import prisma from "../../../lib/prisma.js";


const addEducation = async(
    userId:number,
    degree:string,
    institution:string,
    branch:string,
    type:string,
    startYear:number,
    endYear:number,
    grade:string,
    currentlyStudying:boolean
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
    include :{
        educations:true
    }
})
if(!jobSeeker){
        throw new ApiError(400 , "Profile not found")
    }

    const education = await prisma.education.create({
        data:{
            degree,
            institution,
            branch,
            type,
            startYear,
            endYear,
            grade,
            currentlyStudying,
            jobSeekerProfileId :jobSeeker.id   
        }
    })

    return education;

}

export {addEducation}
