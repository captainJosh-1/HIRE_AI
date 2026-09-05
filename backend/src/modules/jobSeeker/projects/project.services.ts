import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";

const addProject = async(
    userId:number,
    title:string,
    description:string,
    technologies:string,
    projectUrl:string,
    githubUrl:string,
    startDate:string,
    endDate:string,
    currentlyWorking:string
)=>{
//fid the user byUseId 
//get the JObSeekerProfile
//if error
//create the record in project
//if error 
//return

const currentUser = await prisma.JobSeekerProfile.findUnique({
    where:{
        userId
    },
    include:{
        projects:true
    }
})

if(!currentUser){
    throw new ApiError(404,"Profile didnt found")
}

const addingProject = await prisma.project.create({
    data:{
       title,
       description,
       technologies,
       projectUrl,
       githubUrl,
       startDate: new Date(startDate),
       endDate: endDate ? new Date(endDate) : null,
       currentlyWorking,
       jobSeekerProfileId:currentUser.id
    }
})

return addingProject;
}

const getProjects = async(
    userId:number
)=>{
//get the userId and projectId
// then chekc find the jobSeekeProfile
//stroe it 
//then extract projects by .
//return 

//const currentUser = awiat prisma.jobSeekerProfile.findUnique({


const currentUser = await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    },
    include:{
        projects:true
    }
})

if(!currentUser){
    throw new ApiError(404, "Profile not found")
}

const allProjects = await prisma.project.findMany({
    where:{
        jobSeekerProfileId:currentUser.id
    }
})

return allProjects;
}


//get the useriD AND projectId
//GET TEH JOBSEEKER INCLUDE projects 
//get the project which we have to delte 
// check by if condition the user is same 
//delete the project 
//return the remaining rpject 
//and get them by ower id and jobSeekkerId in project 

const deleteProject = async (
  userId: number,
  projectId: number
) => {

  const currentUser = await prisma.jobSeekerProfile.findUnique({
    where: {
      userId
    }
  });

  if (!currentUser) {
    throw new ApiError(404, "Profile not found");
  }

  const project = await prisma.project.findUnique({
    where: {
      id:projectId
    }
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.jobSeekerProfileId !== currentUser.id) {
    throw new ApiError(403,"You are not allowed to delete this project")
  }

  await prisma.project.delete({
    where: {
      id:projectId
    }
  });

  const remainingProjects = await prisma.project.findMany({
    where: {
      jobSeekerProfileId: currentUser.id
    }
  })
  return remainingProjects;
}

const updateProject = async(
    userId:number,
    projectId:number,
    title?:string,
    description?:string,
    technologies?:string,
    projectUrl?:string,
    githubUrl?:string,
    startDate?:string,
    endDate?:string,
    currentlyWorking?:string
)=>{
//get userId and projectId 
//find user 
//errorif not found 
// then find project whch we wnat to update 
//then check by if condition 
//thens update data 
//return

const currentUser =await prisma.jobSeekerProfile.findUnique({
    where:{
        userId
    },
    include:{
        projects:true
    }
});

if(!currentUser){
    throw new ApiError(404,"Profile not found")
}

const Project = await prisma.project.findUnique({
    where:{
        id:projectId
    }
});

if(!Project){
    throw new ApiError(404, "project is not found")
}

if(currentUser.id !==Project.jobSeekerProfileId){
    throw new ApiError(403,"You are not allowed to update project details")
}

const updateData :any = {}

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (technologies !== undefined) updateData.technologies = technologies;
    if (projectUrl !== undefined) updateData.projectUrl = projectUrl;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (currentlyWorking !== undefined) updateData.currentlyWorking = currentlyWorking;

    const updateProject =await prisma.project.update({
        where:{
            id:projectId
        },
        data:updateData
    })

    return updateProject;
}


export { addProject ,getProjects,deleteProject,updateProject}