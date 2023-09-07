import { RequestHandler } from "express";

export const getter: RequestHandler = (req, res, next) => {
  try {
    const { slack_name, track } = req.query;
    const current_day = new Date(Date.now()).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const utc_time = new Date(Date.now()).toUTCString();
    const github_file_url = process.env.GITHUB_FILE || "";
    const github_repo_url = process.env.GITHUB_URL || "";
    const status_code = 200;

    res.status(200).json({
      slack_name,
      current_day,
      utc_time,
      track,
      github_file_url,
      github_repo_url,
      status_code,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};
