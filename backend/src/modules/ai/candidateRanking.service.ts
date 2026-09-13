import prisma from "../../lib/prisma.js"
import { ApiError } from "../../utils/ApiError.js"
import { extractPdfText } from "../../utils/pdfTextExtractor.js"
import { matchResumeWithJob } from "./jobMatch.service.js"


const rankCandidates = async(
    recruiterUserId:number,
    jobId:number
)=>{
const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where:{
        userId:recruiterUserId
    },
    include:{
        company:true
    }
})

if(!recruiterProfile){
    throw new ApiError(404,"Recruiter profile not found ")
}

if(!recruiterProfile.company){
    throw new ApiError(404,"Recruiter profile not found ")
}

const job = await prisma.job.findUnique({
    where:{
        id:jobId
    },
})
if(!job){
    throw new ApiError(404,"job  not found ")
}
if(job.companyId !== recruiterProfile.company.id){
    throw new ApiError(403 , "You are not authorized to rank candidate for this job");
}





const applications = await prisma.application.findMany({
    where:{
        jobId:job.id
    },
    include:{
        jobSeekerProfile:{
            include: {
                user:true,
                resume:true,
            }
        }
    }
})

//to store results
const rankingResults = [];

//loop
for (const application  of applications){
const candidate = application.jobSeekerProfile;
const candidateId = candidate.id;
const candidateName = candidate.user.name;


const resume = candidate.resume;

if(!resume){
  continue;
}

//fetching pdf from postgresql cloudinaru url saved in DB 
const response = await fetch(resume.fileUrl);

if(!response.ok){
    continue;
}
//now lets convert resume into buffer 
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

const resumeText = await extractPdfText(buffer);

if(!resumeText.trim()) {
    continue;
}

const matchResult = await matchResumeWithJob(
    resumeText,
    job.title,
    job.jobDescription,
    job.requirements,
    job.responsibilities
);

rankingResults.push({
    candidateId,
    candidateName,
    ...matchResult,
});
}

rankingResults.sort((a,b)=> b.score  - a.score);

return rankingResults;
};

export{rankCandidates}