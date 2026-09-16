import { Router } from "express";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addProjectController, deleteProjectController, getProjectController, updateProjectController } from "./project.controller.js";

const router = Router()

/**
 * @swagger
 * /api/v1/job-seekers/addProject:
 *   post:
 *     summary: Add a project entry for the logged-in job seeker
 *     tags: [Projects]
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
 *                 default: Portfolio Website
 *               description:
 *                 type: string
 *                 default: A personal portfolio site built to showcase projects
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default: [React, Node.js, PostgreSQL]
 *               projectUrl:
 *                 type: string
 *                 default: "https://myproject.com"
 *               githubUrl:
 *                 type: string
 *                 default: "https://github.com/user/myproject"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2023-01-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2023-06-01T00:00:00.000Z"
 *               currentlyWorking:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Project added successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post(
    "/addProject",
    authMiddleware,
    addProjectController
)

/**
 * @swagger
 * /api/v1/job-seekers/getProject:
 *   get:
 *     summary: Get all project entries for the logged-in job seeker
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(
    "/getProject",
    authMiddleware,
    getProjectController
)
/**
 * @swagger
 * /api/v1/job-seekers/deleteProject/{projectId}:
 *   delete:
 *     summary: Delete a project entry
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the project entry to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Project doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.delete(
    "/deleteProject/:projectId",
    authMiddleware,
    deleteProjectController
)

/**
 * @swagger
 * /api/v1/job-seekers/updateProject/{projectId}:
 *   patch:
 *     summary: Update a project entry
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the project entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: Portfolio Website
 *               description:
 *                 type: string
 *                 default: A personal portfolio site built to showcase projects
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default: [React, Node.js, PostgreSQL]
 *               projectUrl:
 *                 type: string
 *                 default: "https://myproject.com"
 *               githubUrl:
 *                 type: string
 *                 default: "https://github.com/user/myproject"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2023-01-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2023-06-01T00:00:00.000Z"
 *               currentlyWorking:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Project doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.patch(
    "/updateProject/:projectId",
    authMiddleware,
    updateProjectController
)

export { router };