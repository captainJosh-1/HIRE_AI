import express from "express";
import cors from "cors";

import { router as authRouters } from "./modules/auth/auth.routes.js";

 
import {router as profileRoutes} from "./modules/jobSeeker/profile/jobSeeker.routes.js"
import { router as skillRoutes } from "./modules/jobSeeker/skill/skill.routes.js";
import {router as eduRoutes } from "./modules/jobSeeker/education/education.routes.js"
import {router as expiRoutes } from "./modules/jobSeeker/experience/experience.routes.js"
const app = express();


app.use(cors());
app.use(express.json());


//"/api/v1/auth"

app.use("/api/v1/auth" , authRouters);


app.use("/api/v1/job-seekers",profileRoutes)
app.use("/api/v1/job-seekers",skillRoutes)
app.use("/api/v1/job-seekers",eduRoutes)
app.use("/api/v1/job-seekers",expiRoutes)

export default app;