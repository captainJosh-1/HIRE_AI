import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { getMyProfileController, updateMyProfileController } from "./recruiterProfile.controller.js";
const router = Router();

/**
 * @swagger
 * /api/v1/recruiters/me:
 *   get:
 *     summary: Get the logged-in recruiter's profile
 *     tags: [Recruiter Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recruiter profile fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.get(
    "/me",
    authMiddleware,
    requireRole("RECRUITER"),
    getMyProfileController
);

/**
 * @swagger
 * /api/v1/recruiters/updateProfile:
 *   patch:
 *     summary: Update the logged-in recruiter's profile
 *     tags: [Recruiter Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               designation:
 *                 type: string
 *                 default: HR Manager
 *               phone:
 *                 type: string
 *                 default: "9876543210"
 *               bio:
 *                 type: string
 *                 default: Experienced recruiter specializing in tech hiring
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.patch(
    "/updateProfile",
    authMiddleware,
    requireRole("RECRUITER"),
    updateMyProfileController
)

export {router};