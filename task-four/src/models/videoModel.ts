import mongoose, { Document } from "mongoose";

export interface IVideo extends Document {
  title: String;
  description: String;
  url: String;
}

const VideoSchema = new mongoose.Schema<IVideo>(
  {
    title: String,
    description: String,
    url: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Video = mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
