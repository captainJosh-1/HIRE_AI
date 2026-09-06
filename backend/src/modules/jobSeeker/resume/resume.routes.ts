import { Router } from "express";
// import upload from "../../../middlewares/multer.middleware.js";
import { upload } from "../../../middleware/multer.middleware.js";
import { uploadResumeController } from "./resume.controller.js";

const router = Router();

router.post(
  "/resume",
  upload.single("resume"),
  uploadResumeController
);

export { router };