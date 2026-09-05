import { Router } from "express";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { addProjectController, deleteProjectController, getProjectController, updateProjectController } from "./project.controller.js";

const router = Router()

router.post(
    "/addProject",
    authMiddleware,
    addProjectController
)

router.get(
    "/getProject",
    authMiddleware,
    getProjectController
)
router.delete(
    "/deleteProject/:projectId",
    authMiddleware,
    deleteProjectController
)

router.patch(
    "/updateProject/:projectId",
    authMiddleware,
    updateProjectController
)

export { router };