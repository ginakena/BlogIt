import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response): Promise<void> =>  {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!firstName || !lastName || !userName || !email || !password) {
    res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }]
      }
    });

    if (existingUser) {
      res.status(409).json({ message: "Email or Username already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword        
      }
    });

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email, userName: user.userName },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    // Respond with user and token
     res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email        
      }
    });

  } catch (error) {
    console.error("Registration Error:", error);
     res.status(500).json({ message: "Internal Server Error" });
  }
};


export const loginUser = async (req: Request, res: Response ) => {
  try {
     res.send("Logging the user")
  } catch(e) {

  }
} 
