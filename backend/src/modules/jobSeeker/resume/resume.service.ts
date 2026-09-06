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
    jobSeekerProfileId: currentser.id,
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

export { uploadResume };