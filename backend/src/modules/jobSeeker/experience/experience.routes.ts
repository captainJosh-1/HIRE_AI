import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addExperienceController, getExpirenceControllwer } from "./experience.controller.js";


const router = Router()
router.post(
    "/addExpirence",
    authMiddleware,
    addExperienceController
)

router.get(
    "/getExpirence",
    authMiddleware,
    getExpirenceControllwer
)

export { router };