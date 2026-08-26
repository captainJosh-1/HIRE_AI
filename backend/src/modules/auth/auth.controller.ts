import type { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { registerUser } from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { loginUser } from "./auth.service.js";


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



const login = asyncHandler(async(req , res)=>{

   const { email , password } =req.body

   const user = await loginUser(
      email,
      password,
   );

   return res.status(200).json(new ApiResponse(200,user,"User logged in successfully"))
})


export { register , login };