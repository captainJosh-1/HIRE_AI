import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { createJobController, deleteJobController, getJobController, updateJobController, updateJobStatusController } from "./job.controller.js";
// import { createCompanyController, getCompanyController, updateCompanyController } from "./company.controller.js";


const router = Router();

/**
 * @swagger
 * /api/v1/recruiters/createJob:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: Software Engineer
 *               description:
 *                 type: string
 *                 default: We are looking for a skilled software engineer to join our team
 *               location:
 *                 type: string
 *                 default: Bangalore, India
 *               employmentType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, FREELANCE, VOLUNTEER]
 *                 default: FULL_TIME
 *               salaryMin:
 *                 type: number
 *                 default: 500000
 *               salaryMax:
 *                 type: number
 *                 default: 1200000
 *               requirements:
 *                 type: string
 *                 default: "2+ years experience, Strong knowledge of JavaScript"
 *               responsibilities:
 *                 type: string
 *                 default: "Write clean code, Collaborate with the team"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 default: "2026-12-31T00:00:00.000Z"
 *               status:
 *                 type: string
 *                 enum: [OPEN, CLOSE]
 *                 default: OPEN
 *     responses:
 *       200:
 *         description: Job created successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.post(
    "/createJob",
    authMiddleware,
    requireRole("RECRUITER"),
    createJobController
)

/**
 * @swagger
 * /api/v1/recruiters/getJob/{jobId}:
 *   get:
 *     summary: Get a single job posting by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to fetch
 *     responses:
 *       200:
 *         description: Job fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.get(
    "/getJob/:jobId",
    authMiddleware,
    requireRole("RECRUITER"),
    getJobController
)

/**
 * @swagger
 * /api/v1/recruiters/deleteJob/{jobId}:
 *   delete:
 *     summary: Delete a job posting
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       400:
 *         description: Job doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.delete(
    "/deleteJob/:jobId",
    authMiddleware,
    requireRole("RECRUITER"),
    deleteJobController
)

/**
 * @swagger
 * /api/v1/recruiters/updateJob/{jobId}:
 *   patch:
 *     summary: Update a job posting
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: Software Engineer
 *               description:
 *                 type: string
 *                 default: We are looking for a skilled software engineer to join our team
 *               location:
 *                 type: string
 *                 default: Bangalore, India
 *               employmentType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, FREELANCE, VOLUNTEER]
 *                 default: FULL_TIME
 *               salaryMin:
 *                 type: number
 *                 default: 500000
 *               salaryMax:
 *                 type: number
 *                 default: 1200000
 *               requirements:
 *                 type: string
 *                 default: "2+ years experience, Strong knowledge of JavaScript"
 *               responsibilities:
 *                 type: string
 *                 default: "Write clean code, Collaborate with the team"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 default: "2026-12-31T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Job doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.patch(
    "/updateJob/:jobId",
    authMiddleware,
    requireRole("RECRUITER"),
    updateJobController
)

/**
 * @swagger
 * /api/v1/recruiters/jobStatus/{jobId}/status:
 *   patch:
 *     summary: Update the status of a job posting
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job whose status is being updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [OPEN, CLOSE]
 *                 default: OPEN
 *     responses:
 *       200:
 *         description: Job status updated successfully
 *       400:
 *         description: Job doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.patch(
  "/jobStatus/:jobId/status",
  authMiddleware,
  requireRole("RECRUITER"),
  updateJobStatusController
);

export {router};