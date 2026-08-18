import type {Request , Response , NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

const authMiddleware = (
    req : Request,
    res: Response,
    next: NextFunction 
) =>{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new ApiError(401,"Unauthorized");
    }

if(!authHeader.startsWith("Bearer ")) {
    throw new ApiError(401 , "Invalid authorization format");
}

const token = authHeader.split(" ")[1];

if(!token) {
    throw new ApiError(401 , "Token is missing");
}

const decoded = verifyAccessToken(token);

req.user = decoded;

next();
};


export { authMiddleware };