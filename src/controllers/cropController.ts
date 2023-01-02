import Crop from "../models/crop";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";

interface RequestWithUserId extends Request {
  userId?: Record<string, any>;
}

export const createCrop = async (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  const name = req.body.name;
  const variety = req.body.variety;
  const category = req.body.category;

  try {
    const crop = new Crop({
      name: name,
      variety: variety,
      category: category,
      creator: req.userId,
    });
    await crop.save();
    const user = await User.findById(req.userId);
    res.status(201).json({
      message: "crop created",
      crop: crop,
      creator: { _id: user!._id, name: user!.fullName },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCrop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cropId = req.params.cropId;

  const name = req.body.name;
  const variety = req.body.variety;
  const category = req.body.category;

  try {
    const crop = await Crop.findById(cropId);

    if (!crop) {
      console.log("no crop has been found");
    }
    crop!.name = name;
    crop!.variety = variety;
    crop!.category = category;

    const updatedCrop = await crop!.save();
    res.status(200).json({ message: "crop udated", crop: updatedCrop });
  } catch (error) {
    console.log(error);
  }
};

export const getCrops = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalCrops = await Crop.find();

    res.status(200).json({ message: "all items ", crops: totalCrops });
  } catch (error) {
    console.log(error);
  }
};

export const getCrop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cropId } = req.params;
  try {
    const crop = await Crop.findById(cropId);
    if (!crop) {
      const error = new Error("no crop has been found");
      throw error;
    }
    res.status(200).json({ message: "crop found", crop: crop });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCrop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cropId = req.params.cropId;
  try {
    const crop = await Crop.findById(cropId);
    // const user = await User.findById(req.userId);

    if (!crop) {
      console.log("no crop with that id has been found");
    }
    //  if(user.role === 'Admin'|| 'Projectmanager' || 'CatchmentAreamanager'){
    //     console.log('you are not authorized to delete')

    //  }

    await Crop.findByIdAndRemove(cropId);

    res.status(200).json({ message: "item has been deleted" });
  } catch (error) {
    console.log(error);
  }
};
