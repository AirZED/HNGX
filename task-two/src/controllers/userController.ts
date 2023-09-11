import { RequestHandler } from "express";
import AppError from "../utils/appError";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";

export const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const user = await User.create({ name });

  if (!user) {
    return next(new AppError("User creation not successful", 400));
  }

  res.status(201).json({
    message: "success",
    user: user,
  });
});

export const fetchUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });

  if (!user) {
    return next(new AppError("User not found, create user", 404));
  }

  res.status(201).json({
    message: "success",
    user: user,
  });
});

export const patchUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { name },
    { returnDocument: "after" }
  );

  res.status(201).json({
    message: "success",
    user: user,
  });
});

export const deleteUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError("User not found, create user", 404));
  }

  res.status(204).json({
    message: "success",
    user: user,
  });
});
