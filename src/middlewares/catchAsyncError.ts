import { NextFunction } from "express";

import Rollbar from "rollbar";

var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV || "development",
});

export const catchAsyncError =
  (passedFunction: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.ROLLBAR_ACCESS_TOKEN) {
      Promise.resolve(passedFunction(req, res, next)).catch(next);
      return;
    }
    Promise.resolve(passedFunction(req, res, next)).catch(err => {
      rollbar.error(
        "An error occurred in function: " + passedFunction.name,
        err
      );
      next(err);
    });
  };
