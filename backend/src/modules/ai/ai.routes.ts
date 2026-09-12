import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { analyzeResumeController, matchResumeWithJobController } from "./ai.controller.js";

const router = Router();

router.post(
  "/analyze-resume",
  authMiddleware,
  analyzeResumeController
);

router.post(
  "/match-job/:jobId",
  authMiddleware,
  matchResumeWithJobController
);

export { router };