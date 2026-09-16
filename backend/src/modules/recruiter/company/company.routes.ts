import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { createCompanyController, getCompanyController, updateCompanyController } from "./company.controller.js";


const router = Router();

/**
 * @swagger
 * /api/v1/recruiters/createCompany:
 *   post:
 *     summary: Create a company profile for the logged-in recruiter
 *     tags: [Company]
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
 *                 default: Acme Corp
 *               description:
 *                 type: string
 *                 default: A leading technology company building innovative products
 *               website:
 *                 type: string
 *                 default: "https://acmecorp.com"
 *               location:
 *                 type: string
 *                 default: Bangalore, India
 *               industry:
 *                 type: string
 *                 default: Information Technology
 *     responses:
 *       200:
 *         description: Company created successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.post(
    "/createCompany",
    authMiddleware,
    requireRole("RECRUITER"),
    createCompanyController
);

/**
 * @swagger
 * /api/v1/recruiters/getCompany:
 *   get:
 *     summary: Get the logged-in recruiter's company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company fetched successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.get(
    "/getCompany",
    authMiddleware,
    requireRole("RECRUITER"),
    getCompanyController
);

/**
 * @swagger
 * /api/v1/recruiters/updateComapny:
 *   patch:
 *     summary: Update the logged-in recruiter's company
 *     tags: [Company]
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
 *                 default: Acme Corp
 *               description:
 *                 type: string
 *                 default: A leading technology company building innovative products
 *               website:
 *                 type: string
 *                 default: "https://acmecorp.com"
 *               location:
 *                 type: string
 *                 default: Bangalore, India
 *               industry:
 *                 type: string
 *                 default: Information Technology
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - user is not a RECRUITER
 */
router.patch(
    "/updateComapny",
    authMiddleware,
    requireRole("RECRUITER"),
    updateCompanyController
);


export {router};