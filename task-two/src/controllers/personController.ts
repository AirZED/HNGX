import { RequestHandler } from "express";
import AppError from "../utils/appError";
import Person from "../models/personModel";
import catchAsync from "../utils/catchAsync";

export const getAll: RequestHandler= catchAsync(async (req, res, next) => {
  
    const person = await Person.find()

    if (!person) {
      return next(new AppError("Person does not exist", 400));
    }

    res.status(201).json({
      message: "success",
      person,
    });
})
export const createPerson: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return next(new AppError("Please ensure name is provided and must be a string", 400));
    }

    const person = await Person.create({ name });

    if (!person) {
      return next(new AppError("Person creation not successful", 400));
    }

    res.status(201).json({
      message: "success",
      person,
    });
  }
);

export const fetchPerson: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide user id in param", 400));
    }
    const person = await Person.findOne({ _id: id });

    if (!person) {
      return next(new AppError("Person not found, create Person", 404));
    }

    res.status(201).json({
      message: "success",
      person,
    });
  }
);

export const patchPerson: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name || typeof name !== 'string') {
      return next(new AppError("Please provide user id and new name", 400));
    }
    const person = await Person.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!person) {
      return next(new AppError("Person not found, create person", 404));
    }

    res.status(201).json({
      message: "success",
      person,
    });
  }
);

export const deletePerson: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide user id in param", 400));
    }
    
    const person = await Person.findByIdAndDelete(id);

    if (!person) {
      return next(new AppError("Person not found, create person", 404));
    }

    res.status(204).json({
      message: "success",
      person,
    });
  }
);
