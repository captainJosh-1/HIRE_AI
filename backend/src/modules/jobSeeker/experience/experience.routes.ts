import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addExperienceController, deleteExperienceController, getExperienceController, updateExperienceController } from "./experience.controller.js";


const router = Router()
router.post(
    "/addExperience",
    authMiddleware,
    addExperienceController
)

router.get(
    "/getExperience",
    authMiddleware,
    getExperienceController
)

router.patch(
    "/updateExperience/:experienceId",
    authMiddleware,
    updateExperienceController
)

router.delete(
    "/deleteExperience/:experienceId",
    authMiddleware,
    deleteExperienceController
)

export { router };