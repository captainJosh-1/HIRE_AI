import { Router } from "express";
import { upload } from "../../../middleware/multer.middleware.js";
import { uploadResumeController } from "./resume.controller.js";
import { authMiddleware } from "../../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/resume",
  upload.single("resume"),
  authMiddleware,
  uploadResumeController
);

export { router };