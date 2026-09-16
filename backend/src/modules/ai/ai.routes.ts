import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { analyzeResumeController, generateCoverLetterController, matchResumeWithJobController, rankCandidatesController } from "./ai.controller.js";
import { requireRole } from "../../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/ai/analyze-resume:
 *   post:
 *     summary: Analyze the logged-in job seeker's uploaded resume using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resume analyzed successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Job seeker profile or resume not found
 *       500:
 *         description: Failed to fetch resume
 */
router.post(
  "/analyze-resume",
  authMiddleware,
  analyzeResumeController
);

/**
 * @swagger
 * /api/v1/ai/match-job/{jobId}:
 *   post:
 *     summary: Match the logged-in job seeker's resume against a specific job using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to match the resume against
 *     responses:
 *       200:
 *         description: Profile matched with job successfully
 *       400:
 *         description: Invalid job ID or could not extract text from resume
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Job seeker profile, resume, or job not found
 *       500:
 *         description: Failed to fetch resume
 */
router.post(
  "/match-job/:jobId",
  authMiddleware,
  matchResumeWithJobController
);

/**
 * @swagger
 * /api/v1/ai/rank-candidates/{jobId}:
 *   post:
 *     summary: Rank all candidates who applied to a job using AI (recruiter only)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to rank candidates for
 *     responses:
 *       200:
 *         description: Candidates ranked successfully
 *       400:
 *         description: Invalid job ID
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.post(
  "/rank-candidates/:jobId",
  authMiddleware,
  requireRole("RECRUITER"),
  rankCandidatesController
);

/**
 * @swagger
 * /api/v1/ai/cover-letter/{jobId}:
 *   post:
 *     summary: Generate a tailored cover letter for a job using AI (job seeker only)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to generate a cover letter for
 *     responses:
 *       200:
 *         description: Cover letter generated successfully
 *       400:
 *         description: Invalid job ID or could not extract text from resume
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a JOB_SEEKER
 *       404:
 *         description: Job seeker profile, resume, or job not found
 *       500:
 *         description: Failed to fetch resume
 */
router.post(
  "/cover-letter/:jobId",
  authMiddleware,
  requireRole("JOB_SEEKER"),
  generateCoverLetterController
);

export { router };