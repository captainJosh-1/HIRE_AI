import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
// import { requireRole } from "../../../middleware/role.middleware.js";
import { applyJobController ,deleteApplicationController,getAllApplicationController,getOneApplicationController} from "./apply.controller.js";


const router = Router();

router.post(
    "/jobs/:jobId/apply",
    authMiddleware,
    applyJobController  
);

router.get(
    "/getAllApplications",
    authMiddleware,
    getAllApplicationController
);

router.get(
    "/getAllOneApplications/:jobId",
    authMiddleware,
    getOneApplicationController
);

router.delete(
    "/deleteApplication/:applicationId",
    authMiddleware,
    deleteApplicationController
);

export {router};
