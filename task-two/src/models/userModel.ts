import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: String;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: [true, "User must have a name"] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
