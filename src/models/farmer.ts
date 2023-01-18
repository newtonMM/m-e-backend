import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IFarmer extends Document {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  phoneNo: string;
  idNo: string;
  county: string;
  constituency: string;
  division: string;
  location: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  idNo: {
    type: Number,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  constituency: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  Farms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Farm",
    },
  ],
});

export default mongoose.model<IFarmer>("Farmer", userSchema);
