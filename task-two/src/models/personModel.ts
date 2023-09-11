import mongoose, { Document } from "mongoose";

export interface IPerson extends Document {
  name: String;
  __v: any;
}

const PersonSchema = new mongoose.Schema<IPerson>(
  {
    name: { type: String, required: [true, "Person must have a name"] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Person = mongoose.model<IPerson>("Person", PersonSchema);

export default Person;
