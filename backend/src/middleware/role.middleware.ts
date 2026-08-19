import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

const requireRole = (
  ...allowedRoles: string[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    if(!req.user){
        throw new ApiError(401 , "Unauthorized");
    }

    if(!allowedRoles.includes(req.user.role)){
        throw new ApiError(403 , "Forbidden");
    }
    next();
  };
};

export { requireRole };