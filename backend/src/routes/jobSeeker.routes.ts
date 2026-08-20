import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { getMyProfileController, updateProfileController ,addSkillController} from "../controllers/jobSeeker.controller.js";

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

router.post(
    "/skills",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    addSkillController
)

router.get(
    "/skills",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    
)

router.delete(
    "/skills",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    
)

export { router };