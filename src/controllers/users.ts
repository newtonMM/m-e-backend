import User from "../models/user";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ReqResFunction } from "../types/common/ReqResFunction";
import { IUser } from "../types/IUser";

/**
 * Create new user
 * @param req Request Context
 * @param res Response Context
 */
export const createUser: ReqResFunction = async (
  req: Request,
  res: Response
) => {
  const { email, name, password, phoneNo, idNo, role }: IUser = req.body;

  try {
    const hashedpw = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      name,
      password: hashedpw,
      phoneNo,
      idNo,
      role,
    });

    const newUser = await user.save();
    res.status(201).json({ message: "User created!", newuser: newUser });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get all users
 * @param req Request Context
 * @param res Response Context
 */
export const getUsers: ReqResFunction = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();

    res
      .status(200)
      .json({ message: "Retrieved all users successfully", users: allUsers });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get user by id
 * @param req Request Context
 * @param res Response Context
 */
export const getUser: ReqResFunction = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found!");
    }

    res
      .status(200)
      .json({ message: "Retrieved user successfully.", user: user });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Update user
 * @param req Request Context
 * @param res Response Context
 */
export const updateUser: ReqResFunction = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;

  const { email, fullName, phoneNo, idNo, role }: IUser = req.body;
  let { password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("user not found!");
    }
    const isPwChanged = await bcrypt.compare(password, user!.password);
    if (isPwChanged) {
      const newPassword = await bcrypt.hash(password, 12);
      password = newPassword;
    }

    user!.email = email;
    user!.fullName = fullName ?? "";
    user!.password = password;
    user!.phoneNo = phoneNo;
    user!.idNo = idNo;
    user!.role = role;

    const updatedUser = await user!.save();
    res.status(201).json({ message: "User updated.", user: updatedUser });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete user
 * @param req Request Context
 * @param res Response Context
 */
export const deleteUser: ReqResFunction = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndRemove(userId);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};
