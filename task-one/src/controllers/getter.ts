import { RequestHandler } from "express";

export const getter: RequestHandler = (req, res, next) => {
  try {
    const { slack_name, track } = req.query;
    const current_day = new Date(Date.now()).getDay();
    const utc_time = new Date(Date.now()).toUTCString();
    //   const github

    res.status(200).json({
      slack_name,
      current_day,
      utc_time,
      track,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};
