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


const verifyAccessToken = (token: string)=>{
   return jwt.verify(
        token,
        process.env.JWT_SECRET!
    );
};

export { generateAccessToken, verifyAccessToken};