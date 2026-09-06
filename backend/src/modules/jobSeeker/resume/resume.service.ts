import { cloudinary } from "../../../config/cloudinary.js";
import { ApiError } from "../../../utils/ApiError.js";

const uploadResume = async (file: Express.Multer.File) => {
  try {
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

    return {
      fileName: file.originalname,
      fileUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    throw new ApiError(
      500,
      "Failed to upload resume"
    );
  }
};

export { uploadResume };