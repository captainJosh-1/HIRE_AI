import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addEducationController, deleteEducationController, getEducationController, updateEducationController } from "./education.controller.js";

const router = Router()


/**
 * @swagger
 * /api/v1/job-seekers/addeducation:
 *   post:
 *     summary: Add an education entry for the logged-in job seeker
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *               institution:
 *                 type: string
 *               branch:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, ONLINE]
 *                 default: FULL_TIME
 *                 description: Type of education
 *               startYear:
 *                 type: integer
 *               endYear:
 *                 type: integer
 *               grade:
 *                 type: string
 *               currentlyStudying:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Education successfully added
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post(
    "/addeducation",
    authMiddleware,
    addEducationController
)

/**
 * @swagger
 * /api/v1/job-seekers/updateEducation/{educationId}:
 *   patch:
 *     summary: Update an education entry
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *               institution:
 *                 type: string
 *               branch:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, ONLINE]
 *                 default: FULL_TIME
 *                 description: Type of education
 *               startYear:
 *                 type: integer
 *               endYear:
 *                 type: integer
 *               grade:
 *                 type: string
 *               currentlyStudying:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Education entry updated successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(
    "/geteducation",
    authMiddleware,
    getEducationController
)

/**
 * @swagger
 * /api/v1/job-seekers/geteducation:
 *   get:
 *     summary: Get all education entries for the logged-in job seeker
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All education entries fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.patch(
    "/updateEducation/:educationId",
    authMiddleware,
    updateEducationController
)

/**
 * @swagger
 * /api/v1/job-seekers/deleteEducation/{educationId}:
 *   delete:
 *     summary: Delete an education entry
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education entry deleted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.delete(
    "/deleteEducation/:educationId",
    authMiddleware,
    deleteEducationController
)

export { router };