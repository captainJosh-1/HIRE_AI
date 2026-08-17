// import { ApiError } from "../utils/ApiError.js";

import prisma from "../lib/prisma.js"
import { ApiError } from "../utils/ApiError.js";
import bcrypt  from "bcrypt";

const registerUser = async (
    name:string,
    email:string,
    password:string,
    role:"JOB_SEEKER" | "RECRUITER"
) => {

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if(existingUser){
        throw new ApiError(409 , "User already exists");
    }

    if( role !== "JOB_SEEKER" && role !== "RECRUITER"){
        throw new ApiError(409 , "User already exists");
    }



    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await prisma.user.create({
        data: {
            name , 
            email,
            password: hashedPassword,
            role,
        }

    })

    if(role === "JOB_SEEKER") {
        await prisma.jobSeekerProfile.create({
            data: {
                userId :userCreated.id,
            },
        });
    }

    if( role ==="RECRUITER"){
        await prisma.recruiterProfile.create({
            data: {
                userId: userCreated.id,
            },
        });
    }

    const { password: _, ...safeUser } = userCreated;

    return safeUser;
};


export { registerUser };
