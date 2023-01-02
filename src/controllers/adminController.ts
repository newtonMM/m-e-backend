import User from "../models/user";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const phoneNo = req.body.phoneNo;
  const idNo = req.body.idNo;
  const role = req.body.role;

  try {
    const hashedpw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      name: name,
      password: hashedpw,
      phoneNo: phoneNo,
      idNo: idNo,
      role: role,
    });
    const newUser = await user.save();
    res.status(201).json({ message: "user created", newuser: newUser });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params;
  try {
    const user = await User.findByIdAndRemove(userId);
    res.status(200).json({ message: "" });
  } catch (error) {}
};
