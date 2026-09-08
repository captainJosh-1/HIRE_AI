import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { createJobController, deleteJobController, getJobController, updateJobController } from "./job.controller.js";
// import { createCompanyController, getCompanyController, updateCompanyController } from "./company.controller.js";


const router = Router();

router.post(
    "/createJob",
    authMiddleware,
    requireRole("RECRUITER"),
    createJobController
)
router.get(
    "/getJob/:jobId",
    authMiddleware,
    requireRole("RECRUITER"),
    getJobController
)
router.delete(
    "/deleteJob/:jobId",
    authMiddleware,
    requireRole("RECRUITER"),
    deleteJobController
)
router.patch(
    "/updateJob/:jobId",
    authMiddleware,
    requireRole("RECRUITER"),
    updateJobController
)

export {router};