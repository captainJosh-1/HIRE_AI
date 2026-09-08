import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { createJobController } from "./job.controller.js";
// import { createCompanyController, getCompanyController, updateCompanyController } from "./company.controller.js";


const router = Router();

router.post(
    "/createJob",
    authMiddleware,
    requireRole("RECRUITER"),
    createJobController
)

export {router};