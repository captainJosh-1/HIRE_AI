import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addEducationController, getEducationController } from "./education.controller.js";

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
export { router };