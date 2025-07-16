import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized." });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid. " });
    return; 
  }
};
