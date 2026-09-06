import type { Request, Response } from "express";
import { uploadResume } from "./resume.service.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const uploadResumeController = async (
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