import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addEducationController } from "./education.controller.js";

const router = Router()
router.post(
    "/addeducation",
    authMiddleware,
    addEducationController
)

export { router };