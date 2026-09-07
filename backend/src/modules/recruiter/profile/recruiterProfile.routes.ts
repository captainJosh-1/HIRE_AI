import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { requireRole } from "../../../middleware/role.middleware.js";
import { getMyProfileController, updateMyProfileController } from "./recruiterProfile.controller.js";
const router = Router();

router.get(
    "/me",
    authMiddleware,
    requireRole("RECRUITER"),
    getMyProfileController
);

router.patch(
    "/updateProfile",
    authMiddleware,
    requireRole("RECRUITER"),
    updateMyProfileController
)

export {router};