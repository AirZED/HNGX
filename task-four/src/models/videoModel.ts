import mongoose, { Document } from "mongoose";

export interface IVideo extends Document {
  title: String;
  description: String;
  video: Buffer;
}

const VideoSchema = new mongoose.Schema<IVideo>(
  {
    title: String,
    description: String,
    video: { type: Buffer, required: [true, "Video must not be empty"] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Video = mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
