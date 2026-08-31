import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { addSkillController,getMySkillController,deleteMySkills } from "./skill.controller.js";



const router = Router()
router.post(
    "/skills",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    addSkillController
)

router.get(
    "/getmyskills",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    getMySkillController
)

router.delete(
    "/deleteskill/:skillId",
    authMiddleware,
    requireRole("JOB_SEEKER"),
    deleteMySkills
)

export { router };