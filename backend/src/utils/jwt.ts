import jwt from "jsonwebtoken";

const generateAccessToken =(userId:number , role :string)=>{
    return jwt.sign(
        {
            userId,
            role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn :"1d",
        }
    );
};

export { generateAccessToken };