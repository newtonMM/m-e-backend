import { validationResult } from "express-validator/check/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
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
    const result = await user.save();
    res.status(201).json({ message: "User created", userId: result._id });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let foundUser;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("could not find user with that email address");
      error.code = 401;
      throw error;
    }
    foundUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("password is wrong ");
      error.code = 401;
      throw error;
    }
    const token = await jwt.sign({
      email: foundUser.email,
      password: foundUser.password,
    });

    res.status(200).json({ token: token, userId: foundUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};
