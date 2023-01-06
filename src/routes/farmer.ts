import express from "express";
import { body } from "express-validator/check/index";
// import isAuth from "../middlewares/is-auth";

import {
  createFarmer,
  updateFarmer,
  getFarmers,
  getFarmer,
  deleteFarmer,
} from "../controllers/farmer";

const router = express.Router();

router.put("/create-farmer", createFarmer);
router.put("/update-farmer/:farmerId", updateFarmer);
router.get("/get-farmers", getFarmers);
router.get("/get-farmer/:farmerId", getFarmer);
router.delete("/delete-farmer/:farmerId", deleteFarmer);

export default router;
