import express from "express";
import { body } from "express-validator/check/index";
import isAuth from "../middlewares/is-auth";

import {
  createCrop,
  updateCrop,
  getCrops,
  getCrop,
  deleteCrop,
} from "../controllers/crop";

const router = express.Router();

router.put("/create-crop", isAuth, createCrop);
router.put("/update-crop/:cropId", isAuth, updateCrop);
router.get("/get-crops", isAuth, getCrops);
router.get("/get-crop/:cropId", isAuth, getCrop);
router.delete("/delete-crop/:cropId", isAuth, deleteCrop);

export default router;
