import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
// import { requireRole } from "../../../middleware/role.middleware.js";
import { applyJobController ,deleteApplicationController,getAllApplicationController,getApplicantsController,getOneApplicantController,getOneApplicationController, updateStatusController} from "./apply.controller.js";


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
//need a postman check 
router.get(
    "/getAllOneApplications/:jobId",
    authMiddleware,
    getOneApplicationController
);
//need a postman check 
router.delete(
    "/deleteApplication/:applicationId",
    authMiddleware,
    deleteApplicationController
);

// GET /api/v1/recruiters/jobs/:jobId/applications
router.get(
    "/jobs/:jobId/applications",
    authMiddleware,
    getApplicantsController
);

router.get(
    "/jobs/:jobId/applications",
    authMiddleware,
    getApplicantsController
);

router.get(
    "/getaAplication/:applicationId",
    authMiddleware,
    getOneApplicantController
);

router.patch(
    "/getaAplication/:applicationId/status",
    authMiddleware,
    updateStatusController
);
export {router};
