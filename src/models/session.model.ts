import mongoose from "mongoose";
import config from "config";
import bcrypt from "bcrypt";
import { UserDocument } from "./user.model";

export interface sessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves since it has been removed.
export interface HookNextFunction {
  (error?: Error): any;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Session", sessionSchema);
export default UserModel;
