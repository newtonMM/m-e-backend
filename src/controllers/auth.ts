import { validationResult } from "express-validator/check/index";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;

  const phoneNo = req.body.phoneNo;
  const idNo = req.body.idNo;
  const role = req.body.role;

  try {
    const hashedpw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedpw,
      fullName: fullName,
      phoneNo: phoneNo,
      idNo: idNo,
      role: role,
    });
    const result = await user.save();
    res.status(201).json({ message: "User created", userId: result._id });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const password = req.body.password;
  let foundUser;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("could not find user with that email address");
      throw error;
    }
    foundUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("password is wrong ");
      throw error;
    }
    const token = await jwt.sign(
      {
        email: foundUser.email,
        password: foundUser.password,
        userId: foundUser._id.toString(),
      },
      "somesecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, userId: foundUser._id.toString() });
  } catch (error) {
    console.log(error);
  }
};
