import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addExperienceController, deleteExperienceController, getExperienceController, updateExperienceController } from "./experience.controller.js";


const router = Router()

/**
 * @swagger
 * /api/v1/job-seekers/addExperience:
 *   post:
 *     summary: Add a work experience entry for the logged-in job seeker
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 default: Google
 *               position:
 *                 type: string
 *                 default: Software Engineer
 *               employmentType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, FREELANCE, VOLUNTEER]
 *                 default: FULL_TIME
 *               location:
 *                 type: string
 *                 default: Bangalore, India
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2022-01-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2024-01-01T00:00:00.000Z"
 *               currentlyWorking:
 *                 type: boolean
 *                 default: false
 *               description:
 *                 type: string
 *                 default: Worked on backend services and APIs
 *     responses:
 *       200:
 *         description: Experience added successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post(
    "/addExperience",
    authMiddleware,
    addExperienceController
)


/**
 * @swagger
 * /api/v1/job-seekers/getExperience:
 *   get:
 *     summary: Get all work experience entries for the logged-in job seeker
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Experience fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */


router.get(
    "/getExperience",
    authMiddleware,
    getExperienceController
)


/**
 * @swagger
 * /api/v1/job-seekers/updateExperience/{experienceId}:
 *   patch:
 *     summary: Update a work experience entry
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the experience entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 default: Google
 *               position:
 *                 type: string
 *                 default: Software Engineer
 *               employmentType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, FREELANCE, VOLUNTEER]
 *                 default: FULL_TIME
 *               location:
 *                 type: string
 *                 default: Bangalore, India
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2022-01-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2024-01-01T00:00:00.000Z"
 *               currentlyWorking:
 *                 type: boolean
 *                 default: false
 *               description:
 *                 type: string
 *                 default: Worked on backend services and APIs
 *     responses:
 *       200:
 *         description: Experience updated successfully
 *       400:
 *         description: Experience doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.patch(
    "/updateExperience/:experienceId",
    authMiddleware,
    updateExperienceController
)


/**
 * @swagger
 * /api/v1/job-seekers/deleteExperience/{experienceId}:
 *   delete:
 *     summary: Delete a work experience entry
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the experience entry to delete
 *     responses:
 *       200:
 *         description: Experience deleted successfully
 *       400:
 *         description: Experience doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.delete(
    "/deleteExperience/:experienceId",
    authMiddleware,
    deleteExperienceController
)

export { router };