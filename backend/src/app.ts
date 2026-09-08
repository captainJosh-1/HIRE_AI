import express from "express";
import cors from "cors";

import { router as authRouters } from "./modules/auth/auth.routes.js";

 
import {router as profileRoutes} from "./modules/jobSeeker/profile/jobSeeker.routes.js"
import { router as skillRoutes } from "./modules/jobSeeker/skill/skill.routes.js";
import {router as eduRoutes } from "./modules/jobSeeker/education/education.routes.js"
import {router as expiRoutes } from "./modules/jobSeeker/experience/experience.routes.js"
import{ router as projectRoutes } from "./modules/jobSeeker/projects/project.routes.js"
import { router as resumeRoutes }from "./modules/jobSeeker/resume/resume.routes.js";


import {router as recruiterRoutes} from "./modules/recruiter/profile/recruiterProfile.routes.js";
import {router as companyRoutes} from "./modules/recruiter/company/company.routes.js";
import { router as jobRoutes } from "./modules/recruiter/job/job.routes.js";
const app = express();


app.use(cors());
app.use(express.json());


//"/api/v1/auth"

app.use("/api/v1/auth" , authRouters);

// /api/v1/job-seekers
app.use("/api/v1/job-seekers",profileRoutes)
app.use("/api/v1/job-seekers",skillRoutes)
app.use("/api/v1/job-seekers",eduRoutes)
app.use("/api/v1/job-seekers",expiRoutes)
app.use("/api/v1/job-seekers",projectRoutes)
app.use("/api/v1/job-seekers", resumeRoutes);



// /api/v1/recruiters/
app.use("/api/v1/recruiters", recruiterRoutes);
app.use("/api/v1/recruiters", companyRoutes);
app.use("/api/v1/recruiters", jobRoutes);

export default app;