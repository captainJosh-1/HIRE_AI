import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { createCompanyController, getCompanyController } from "./company.controller.js";


const router = Router();

router.post(
    "/createJob",
    authMiddleware,
    requireRole("RECRUITER"),
    createCompanyController
);

router.get(
    "/getJob",
    authMiddleware,
    requireRole("RECRUITER"),
    getCompanyController
);

export {router};