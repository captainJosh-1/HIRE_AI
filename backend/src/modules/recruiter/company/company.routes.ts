import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { createCompanyController, getCompanyController, updateCompanyController } from "./company.controller.js";


const router = Router();

router.post(
    "/createCompany",
    authMiddleware,
    requireRole("RECRUITER"),
    createCompanyController
);

router.get(
    "/getCompany",
    authMiddleware,
    requireRole("RECRUITER"),
    getCompanyController
);

router.patch(
    "/updateComapny",
    authMiddleware,
    requireRole("RECRUITER"),
    updateCompanyController
);


export {router};