import { RequestHandler } from "express";
import AppError from "../utils/appError";
import Video from "../models/videoModel";
import catchAsync from "../utils/catchAsync";

export const getSingleVideo: RequestHandler = catchAsync(
  async (req, res, next) => {
    const videoId = req.params.id;

    const video = await Video.findOne({ _id: videoId });

    if (!video) {
      return next(new AppError("Video not found", 404));
    }

    res.status(200).json({
      status: "success",
      video,
    });
  }
);

export const createVideo: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { title, description } = req.body;

    const video = await Video.create({
      title,
      description,
      video: req.file?.buffer.toString("base64"),
    });

    if (!video) {
      return next(new AppError("Video creation not successful", 400));
    }

    res.status(201).json({
      status: "success",
      video,
    });
  }
);

export const getAllVideos: RequestHandler = catchAsync(
  async (req, res, next) => {
    const videos = await Video.find({});

    if (!videos) {
      return next(new AppError("Video not found", 404));
    }

    res.status(200).json({
      status: "success",
      videos,
    });
  }
);
