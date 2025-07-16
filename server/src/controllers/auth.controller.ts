import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!firstName || !lastName || !userName || !email || !password) {
    res.status(400).json({ message: "Please fill all required fields." });
    return;
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }],
      },
    });

    if (existingUser) {
      res.status(409).json({ message: "Email or Username already in use." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, userName: user.userName },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("error ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, userName, password } = req.body;

  if ((!email && !userName) || !password) {
    res.status(400).json({
      message: "Please provide either email or username, and password.",
    });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }],
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password." });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, userName: user.userName },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production (uses HTTPS)
      sameSite: "lax", // or "strict" for more protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "User Login successful.",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logoutUser = async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Kwaheri😊" });
};
