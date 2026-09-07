import { cloudinary } from "../../../config/cloudinary.js";
import { ApiError } from "../../../utils/ApiError.js";

import prisma from "../../../lib/prisma.js";

const uploadResume = async (
  userId:number,
  file: Express.Multer.File
) => {
  try {

    const currentUser =await prisma.jobSeekerProfile.findUnique({
    where:{
      userId 
    },
    include:{
      resume:true
    }
  })

  if(!currentUser){
    throw new ApiError(404,"Profile not found")
  }

  const existingResume = await prisma.resume.findUnique({
    where:{
      jobSeekerProfileId: currentUser.id
    }
  });

  if(existingResume){
      throw new ApiError(400, "You already have a resume , You cannot add another resume")
    }

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "hire-ai/resumes",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(file.buffer);
    });


  const resume = await prisma.resume.create({
    data: {
    jobSeekerProfileId: currentUser.id,
    fileName: file.originalname,
    fileUrl: result.secure_url,
    publicId: result.public_id,
  },
})

return resume;

    // return {
    //   fileName: file.originalname,
    //   fileUrl: result.secure_url,
    //   publicId: result.public_id,
    // };
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    throw new ApiError(
      500,
      "Failed to upload resume"
    );
  }

 
  
};

const getResume = async(
  userId:number
)=>{
const currentUser = await prisma.jobSeekerProfile.findUnique({
  where:{
    userId
  },
  include:{
    resume:true
  }
})

if(!currentUser){
  throw new ApiError(404,"Profile not found ")
}

// const getResume = await prisma.resume.findUnique({
//   where:{
//     jobSeekerProfileId:currentUser.id
//   }
// });

if(!currentUser.resume){
  throw new ApiError(404,"Resume not found")
}

return currentUser.resume;
}

const deleteResume = async(
  userId:number

)=>{
//userID
//find the jobseeker
//error 
//find resume
// error
//dekete from cloudinary
//delte from prisma 


const currentUser = await prisma.jobSeekerProfile.findUnique({
  where:{
    userId
  }
})
if(!currentUser){
  throw new ApiError(404,"Profile not found")
}

const resume = await prisma.resume.findUnique({
  where:{
    jobSeekerProfileId:currentUser.id
  } 
});

if(!resume){
  throw new ApiError(404,"Resume not found");
}

await cloudinary.uploader.destroy(resume.publicId! , {
  resource_type:"raw"
});

await prisma.resume.delete({
  where:{
    id:resume.id,
  }
});

return resume;
};

const replaceResume = async(
  userId:number,
  file:Express.Multer.File
)=>{
//get the userid 
//error
//get the resume 
//error
//take old publicId
//detroyed it  from cluodinary
//upload the new file 
// take thsoe details from cloudinary 
//update the prisma row

const currentUser = await prisma.jobSeekerProfile.findUnique({
  where:{
    userId
  }
});
if(!currentUser){
  throw new ApiError(400, "Profile not found")
}

const resume = await prisma.resume.findUnique({
  where:{
    jobSeekerProfileId:currentUser.id 
  }
})
if(!resume){
  throw new ApiError(400, "Resume not found")
}

await cloudinary.uploader.destroy(resume.publicId!,{
  resource_type:"raw"
})

const result = await new Promise<any>((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      resource_type: "raw",
      folder: "hire-ai/resumes",
    },
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }
  );

  uploadStream.end(file.buffer);
});

const updatedResume = await prisma.resume.update({
  where: {
    id: resume.id,
  },
  data: {
    fileName: file.originalname,
    fileUrl: result.secure_url,
    publicId: result.public_id,
  },
});

return updatedResume;
}

export { uploadResume ,getResume , deleteResume , replaceResume};