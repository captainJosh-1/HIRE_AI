import { Router } from "express";
import { upload } from "../../../middleware/multer.middleware.js";
import { deleteResumeController, getResumeController, replaceResumeController, uploadResumeController } from "./resume.controller.js";
import { authMiddleware } from "../../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/uploadResume",
  upload.single("resume"),
  authMiddleware,
  uploadResumeController
);

router.get(
  "/getResume",
  authMiddleware,
  getResumeController
);

router.delete(
  "/deleteResume",
  authMiddleware,
  deleteResumeController
);

router.put(
  "/replaceResume",
  upload.single("resume"),
  authMiddleware,
  replaceResumeController
);

export { router };