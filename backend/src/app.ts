import express from "express";
import cors from "cors";

import { router as authRouters } from "./routes/auth.routes.js";
import {router as jobSeekerRoutes } from "./routes/jobSeeker.routes.js"


const app = express();


app.use(cors());
app.use(express.json());


//"/api/v1/auth"

app.use("/api/v1/auth" , authRouters);
app.use("/api/v1/job-seekers",jobSeekerRoutes)

export default app;