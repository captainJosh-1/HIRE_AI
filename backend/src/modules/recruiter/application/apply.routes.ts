import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
// import { requireRole } from "../../../middleware/role.middleware.js";
import { applyJobController ,deleteApplicationController,getAllApplicationController,getApplicantsController,getOneApplicantController,getOneApplicationController, updateStatusController} from "./apply.controller.js";


const router = Router();

/**
 * @swagger
 * /api/v1/recruiters/jobs/{jobId}/apply:
 *   post:
 *     summary: Apply to a job
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to apply to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coverLetter:
 *                 type: string
 *                 default: I am excited to apply for this role and believe my skills are a strong fit.
 *     responses:
 *       200:
 *         description: Job application submitted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post(
    "/jobs/:jobId/apply",
    authMiddleware,
    applyJobController  
);

/**
 * @swagger
 * /api/v1/recruiters/getAllApplications:
 *   get:
 *     summary: Get all applications submitted by the logged-in user
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Applications fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(
    "/getAllApplications",
    authMiddleware,
    getAllApplicationController
);
//need a postman check 

/**
 * @swagger
 * /api/v1/recruiters/getAllOneApplications/{jobId}:
 *   get:
 *     summary: Get the logged-in user's application for a specific job
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to check application status for
 *     responses:
 *       200:
 *         description: Application fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(
    "/getAllOneApplications/:jobId",
    authMiddleware,
    getOneApplicationController
);
//need a postman check 

/**
 * @swagger
 * /api/v1/recruiters/deleteApplication/{applicationId}:
 *   delete:
 *     summary: Delete/withdraw an application
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the application to delete
 *     responses:
 *       200:
 *         description: Application deleted successfully
 *       400:
 *         description: Application doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.delete(
    "/deleteApplication/:applicationId",
    authMiddleware,
    deleteApplicationController
);

// GET /api/v1/recruiters/jobs/:jobId/applications

 /**
 * @swagger
 * /api/v1/recruiters/jobs/{jobId}/applications:
 *   get:
 *     summary: Get all applicants for a specific job (recruiter view)
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to get applicants for
 *     responses:
 *       200:
 *         description: Applicants fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(
    "/jobs/:jobId/applications",
    authMiddleware,
    getApplicantsController
);

 

/**
 * @swagger
 * /api/v1/recruiters/getaAplication/{applicationId}:
 *   get:
 *     summary: Get a single applicant's application details (recruiter view)
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the application to fetch
 *     responses:
 *       200:
 *         description: Applicant fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(
    "/getaAplication/:applicationId",
    authMiddleware,
    getOneApplicantController
);

/**
 * @swagger
 * /api/v1/recruiters/getaAplication/{applicationId}/status:
 *   patch:
 *     summary: Update the status of an application (recruiter action)
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the application to update
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
 *                 enum: [PENDING, REVIEWED, SHORTLISTED, REJECTED, ACCEPTED]
 *                 default: PENDING
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       400:
 *         description: Application doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.patch(
    "/getaAplication/:applicationId/status",
    authMiddleware,
    updateStatusController
);
export {router};