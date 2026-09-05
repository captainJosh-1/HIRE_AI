import type { Response, Request } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { addProject,deleteProject,getProjects,updateProject } from "./project.services.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

const addProjectController = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.user!
    const {
        title,
        description,
        technologies,
        projectUrl,
        githubUrl,
        startDate,
        endDate,
        currentlyWorking
    } = req.body;

    const addingProjects = await addProject(
        userId,
        title,
        description,
        technologies,
        projectUrl,
        githubUrl,
        startDate,
        endDate,
        currentlyWorking
    );

    res.status(200).json(new ApiResponse(200,addingProjects,"project is added successfully"))
})

const getProjectController = asyncHandler(async(req:Request, res:Response)=>{
const { userId }= req.user!

const allProjects = await getProjects(userId)

return res.status(200).json(new ApiResponse(200,allProjects,"all projects are fetched successfully"))
})

const deleteProjectController = asyncHandler(async(req:Request, res:Response)=>{
const { userId } = req.user!
const projectId =Number(req.params.projectId)

const deletedProject = await deleteProject(
    userId,
    projectId
)

res.status(200).json(new ApiResponse(200,deletedProject,"project is deleted successfully"))

})

const updateProjectController = asyncHandler(async(req:Request,res:Response)=>{
    const { userId }=req.user!
    const projectId =Number(req.params.projectId)

    const {
        title,
        description,
        technologies,
        projectUrl,
        githubUrl,
        startDate,
        endDate,
        currentlyWorking
    } = req.body;

    const updatingProject = await updateProject(
        userId,
        projectId,
        title,
        description,
        technologies,
        projectUrl,
        githubUrl,
        startDate,
        endDate,
        currentlyWorking
    )

    res.status(200).json(new ApiResponse(200,updatingProject,"Project is updating successfully"))
})

export { addProjectController ,getProjectController, deleteProjectController,updateProjectController}