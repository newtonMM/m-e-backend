import express from "express";
import { body } from "express-validator/check/index.js";

import User from "../models/user.js";
import { login, signup } from "../controllers/auth.js";

const router = express.Router();

router.put(
  "/signup",
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

  signup
);

router.post("/login", login);

export default router;
