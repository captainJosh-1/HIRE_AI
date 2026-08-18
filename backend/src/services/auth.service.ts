// import { ApiError } from "../utils/ApiError.js";

import prisma from "../lib/prisma.js"
import { ApiError } from "../utils/ApiError.js";
import bcrypt  from "bcrypt";
import { generateAccessToken } from "../utils/jwt.js"

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


//now lets login the user 

const loginUser = async (
    email:string,
    password:string
)=>{

const currentUser = await prisma.user.findUnique({
    where :{
        email:email,
    }
})

if(!currentUser) {
    throw new ApiError(401 , "Invalid email or password")
}

const isPasswordCorrect = await bcrypt.compare(password ,currentUser.password);

if(!isPasswordCorrect){
    throw new ApiError(401 , "Invalid email or password");
}

const accessToken = generateAccessToken(
    currentUser.id,
    currentUser.role
);

const { password: _, ...safeUser}= currentUser;

return {
    user: safeUser,
    accessToken
 };
};

export { registerUser,loginUser };
