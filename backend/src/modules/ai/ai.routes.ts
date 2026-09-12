import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { analyzeResumeController } from "./ai.controller.js";

const router = Router();

router.post(
  "/analyze-resume",
  authMiddleware,
  analyzeResumeController
);

export { router };