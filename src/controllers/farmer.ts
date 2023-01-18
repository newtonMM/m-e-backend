import Farmer from "../models/farmer";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

export const createFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { 
     email,
     firstName,
     secondName,
     password,
     phoneNo,
     idNo,
     county,
     constituency,
     division,
     location
     } = req.body;


  try {
    const hashedpw = await bcrypt.hash(password, 12);
    const farmer = new Farmer({
      email,
      firstName,
      secondName,
      password: hashedpw,
      phoneNo,
      idNo,
      county,
      constituency,
      division,
      location,
    });
    const newFarmer = await farmer.save();
    res.status(201).json({
      message: "farmer created",
      newfarmer: newFarmer,
      farmerId: newFarmer._id,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getFarmers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allFarmers = await Farmer.find();

    res
      .status(200)
      .json({ message: "got all farmers successfully", farmers: allFarmers });
  } catch (error) {
    console.log(error);
  }
};
export const getFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { farmerId } = req.params;
  try {
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      console.log("farmer not found");
    }

    res.status(200).json({ message: "got user successfully", farmer: farmer });
  } catch (error) {
    console.log(error);
  }
};

export const updateFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { farmerId } = req.params;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  let password = req.body.password;
  const phoneNo = req.body.phoneNo;
  const idNo = req.body.idNo;
  const county = req.body.county;
  const constituency = req.body.constituency;
  const division = req.body.division;
  const location = req.body.location;
  try {
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      console.log("farmer not found");
    }
    const isPwChanged = await bcrypt.compare(password, farmer!.password);
    if (isPwChanged) {
      const newPw = await bcrypt.hash(password, 12);
      password = newPw;
    }
    farmer!.email = email;
    farmer!.firstName = firstName;
    farmer!.secondName = secondName;
    farmer!.password = password;
    farmer!.phoneNo = phoneNo;
    farmer!.idNo = idNo;
    farmer!.county = county;
    farmer!.constituency = constituency;
    farmer!.division = division;
    farmer!.location = location;

    const updatedFarmer = await farmer!.save();
    res.status(201).json({ message: "user updated", farmer: updatedFarmer });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { farmerId } = req.params;

  try {
    await Farmer.findByIdAndRemove(farmerId);
    res.status(200).json({ message: "farmer deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
