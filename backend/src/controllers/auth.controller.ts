import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { registerUser } from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const register = asyncHandler(async (req:Request , res:Response)=>{

   const {name , email , password , role }= req.body;


   const user = await registerUser(
      name,
      email,
      password,
      role,
   );

   return res.status(201).json(new ApiResponse(201 , user , "User registered successfully"))

});

export { register };