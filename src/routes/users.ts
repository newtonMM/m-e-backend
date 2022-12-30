import express from "express";
import { body } from "express-validator/check/index";

import User from "../models/user";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users";

const router = express.Router();

router.put(
  "/user",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
    body("phoneNo").trim().not().isEmpty(),
    body("idNo").trim().not().isEmpty(),
    body("role").trim().not().isEmpty(),
  ],

  createUser
);

router.get("/users", getUsers);
router.get("/user/:userId", getUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);
export default router;
