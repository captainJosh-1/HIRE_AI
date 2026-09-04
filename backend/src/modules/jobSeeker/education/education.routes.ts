import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addEducationController, deleteEducationController, getEducationController, updateEducationController } from "./education.controller.js";

const router = Router()
router.post(
    "/addeducation",
    authMiddleware,
    addEducationController
)

router.get(
    "/geteducation",
    authMiddleware,
    getEducationController
)
router.patch(
    "/updateEducation/:educationId",
    authMiddleware,
    updateEducationController
)

router.delete(
    "/deleteEducation/:educationId",
    authMiddleware,
    deleteEducationController
)

export { router };