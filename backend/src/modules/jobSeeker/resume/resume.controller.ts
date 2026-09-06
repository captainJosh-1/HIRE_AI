import type { Request, Response } from "express";

export const uploadResumeController = (
  req: Request,
  res: Response
) => {
  console.log(req.file);

return res.status(200).json({
  success: true,
  message: "Resume received successfully",
  file: {
    originalname: req.file?.originalname,
    mimetype: req.file?.mimetype,
    size: req.file?.size,
  },
});
};