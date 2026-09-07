import type { Request, Response } from "express";
import { deleteResume, getResume, replaceResume, uploadResume , } from "./resume.service.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";

const uploadResumeController = async (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    throw new ApiError(400, "Resume file is required");
  }

  const { userId } = req.user!;
  const result = await uploadResume(userId,req.file);

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Resume uploaded successfully"
    )
  );
};


const getResumeController = asyncHandler(async(req:Request, res:Response)=>{

  const {userId} = req.user!;

  const userResume = await getResume(userId);

  res.status(200).json(new ApiResponse(200,userResume,"User's Resume is fetched successfully"))
})

const deleteResumeController = asyncHandler(async(req:Request, res:Response)=>{
const { userId } = req.user!;

const resume = await deleteResume(userId);

res.status(200).json(new ApiResponse(200,resume , "Resume deleted successfully"));
}
);


const replaceResumeController = asyncHandler(async(req:Request , res:Response)=>{

  if(!req.file){
    throw new ApiError(400, "Resume file is required");
  }

  const { userId } = req.user!;

  const result = await replaceResume(
    userId,
    req.file
  )

  res.status(200).json(new ApiResponse(200, result , "Resume replced successfully"))
});

export {uploadResumeController,getResumeController,deleteResumeController ,replaceResumeController}