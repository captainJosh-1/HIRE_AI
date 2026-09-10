import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
// import { requireRole } from "../../../middleware/role.middleware.js";
import { applyJobController } from "./apply.controller.js";


const router = Router();

router.post(
    "/jobs/:jobId/apply",
    authMiddleware,
    applyJobController
    
);

export {router};
