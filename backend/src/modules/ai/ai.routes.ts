import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { analyzeResumeController, matchResumeWithJobController, rankCandidatesController } from "./ai.controller.js";
import { requireRole } from "../../middleware/role.middleware.js";

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

router.post(
  "/rank-candidates/:jobId",
  authMiddleware,
  requireRole("RECRUITER"),
  rankCandidatesController
);

export { router };