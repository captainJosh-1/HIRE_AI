import type { Request, Response } from "express";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { createCompany, getCompany, updateCompany } from "./company.services.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";


const createCompanyController = asyncHandler(async(req:Request,res:Response)=>{
    const { userId } = req.user!;
    const {
    name,
    description,
    website,
    location,
    industry
    } = req.body


    const createdCompany = await createCompany(
    userId,
    name,
    description,
    website,
    location,
    industry
    );

    res.status(200).json(new ApiResponse(200,createdCompany,"company is created"))
})

const getCompanyController = asyncHandler(async(req:Request, res:Response)=>{
const { userId } = req.user!

const company = await getCompany(userId)

    res.status(200).json(new ApiResponse(200,company,"company is fetched successfully"))
})

const updateCompanyController = asyncHandler(async(req:Request,res:Response)=>{
    const { userId }= req.user!

    const {
        name,
        description,
        website,
        location,
        industry
    } = req.body;

    const updatingComapny = await updateCompany(
        userId,
        name,
        description,
        website,
        location,
        industry
    );

        res.status(200).json(new ApiResponse(200,updatingComapny,"company is updated successfully"))

})


export {createCompanyController,getCompanyController,updateCompanyController};
