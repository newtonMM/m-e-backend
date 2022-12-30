import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface jwtPayload {
  email: string;
  password: string;
  userId: string;
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authorized");
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "somesecret") as JwtPayload;
  } catch (error) {
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
