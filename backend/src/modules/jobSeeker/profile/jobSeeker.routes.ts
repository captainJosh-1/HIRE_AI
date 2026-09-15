import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { getMyProfileController , updateProfileController } from "./jobSeeker.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/job-seekers/me:
 *   get:
 *     summary: Get the logged-in job seeker's profile
 *     tags: [JobSeeker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job seeker profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 resumeUrl:
 *                   type: string
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a JOB_SEEKER
 */

router.get(
    "/me",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    getMyProfileController
);

/**
 * @swagger
 * /api/v1/job-seekers/updateprofile:
 *   put:
 *     summary: Update the logged-in job seeker's profile
 *     tags: [JobSeeker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               resumeUrl:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a JOB_SEEKER
 */

router.put(
    "/updateprofile",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    updateProfileController
)


export { router };