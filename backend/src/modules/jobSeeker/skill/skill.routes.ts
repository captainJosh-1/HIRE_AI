import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { addSkillController,getMySkillController,deleteMySkills } from "./skill.controller.js";



const router = Router()

/**
 * @swagger
 * /api/v1/job-seekers/skills:
 *   post:
 *     summary: Add a skill for the logged-in job seeker
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 default: JavaScript
 *     responses:
 *       200:
 *         description: Skill added successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a JOB_SEEKER
 */
router.post(
    "/skills",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    addSkillController
)


/**
 * @swagger
 * /api/v1/job-seekers/getmyskills:
 *   get:
 *     summary: Get all skills for the logged-in job seeker
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Skills fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a JOB_SEEKER
 */
router.get(
    "/getmyskills",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    getMySkillController
)

/**
 * @swagger
 * /api/v1/job-seekers/deleteskill/{skillId}:
 *   delete:
 *     summary: Delete a skill for the logged-in job seeker
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the skill to delete
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       400:
 *         description: Skill doesn't exist
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a JOB_SEEKER
 */
router.delete(
    "/deleteskill/:skillId",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    deleteMySkills
)

export { router };