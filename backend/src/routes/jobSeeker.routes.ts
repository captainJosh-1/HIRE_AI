import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { getMyProfileController, updateProfileController } from "../controllers/jobSeeker.controller.js";

const router = Router();

router.get(
    "/me",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    getMyProfileController
);

router.put(
    "/updateprofile",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    updateProfileController
)

export { router };