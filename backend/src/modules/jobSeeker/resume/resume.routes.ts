import { Router } from "express";
import { upload } from "../../../middleware/multer.middleware.js";
import { deleteResumeController, getResumeController, replaceResumeController, uploadResumeController } from "./resume.controller.js";
import { authMiddleware } from "../../../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/job-seekers/uploadResume:
 *   post:
 *     summary: Upload a resume file for the logged-in job seeker
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - resume
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file (PDF/DOC/DOCX)
 *     responses:
 *       200:
 *         description: Resume uploaded successfully
 *       400:
 *         description: Resume file is required
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post(
  "/uploadResume",
  authMiddleware,
  upload.single("resume"),
  uploadResumeController
);

/**
 * @swagger
 * /api/v1/job-seekers/getResume:
 *   get:
 *     summary: Get the logged-in job seeker's resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resume fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(
  "/getResume",
  authMiddleware,
  getResumeController
);

/**
 * @swagger
 * /api/v1/job-seekers/deleteResume:
 *   delete:
 *     summary: Delete the logged-in job seeker's resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resume deleted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.delete(
  "/deleteResume",
  authMiddleware,
  deleteResumeController
);

/**
 * @swagger
 * /api/v1/job-seekers/replaceResume:
 *   put:
 *     summary: Replace the logged-in job seeker's existing resume with a new file
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - resume
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: New resume file (PDF/DOC/DOCX)
 *     responses:
 *       200:
 *         description: Resume replaced successfully
 *       400:
 *         description: Resume file is required
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.put(
  "/replaceResume",
  upload.single("resume"),
  authMiddleware,
  replaceResumeController
);

export { router };