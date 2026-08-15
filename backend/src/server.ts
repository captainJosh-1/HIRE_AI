import dotenv from "dotenv";
import app from "./app.js"

import prisma  from "./lib/prisma.js";
dotenv.config();




const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`sever running on port ${PORT}`);
});

async function startServer() {
  try {
    const users = await prisma.user.findMany();

    console.log("Users from database:", users);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

startServer();