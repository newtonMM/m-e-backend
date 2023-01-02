import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  phoneNo: string;
  idNo: string;
  role: string;
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
  fullName: {
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
  role: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

export default mongoose.model<IUser>("User", userSchema);
