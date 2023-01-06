import User from "../models/user";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;
  const phoneNo = req.body.phoneNo;
  const idNo = req.body.idNo;
  const role = req.body.role;

  try {
    const hashedpw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      fullName: fullName,
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
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find();

    res
      .status(200)
      .json({ message: "got all users successfully", users: allUsers });
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("user not found");
    }

    res.status(200).json({ message: "got user successfully", user: user });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const email = req.body.email;
  const fullName = req.body.fullName;
  let password = req.body.password;
  const phoneNo = req.body.phoneNo;
  const idNo = req.body.idNo;
  const role = req.body.role;
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("user not found");
    }
    const isPwChanged = await bcrypt.compare(password, user!.password);
    if (isPwChanged) {
      const newPw = await bcrypt.hash(password, 12);
      password = newPw;
    }
    user!.email = email;
    user!.fullName = fullName;
    user!.password = password;
    user!.phoneNo = phoneNo;
    user!.idNo = idNo;
    user!.role = role;

    const updatedUser = await user!.save();
    res.status(201).json({ message: "user updated", user: updatedUser });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndRemove(userId);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
