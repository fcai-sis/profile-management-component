import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express, { NextFunction, Request, Response } from "express";

import {
  employeeProfileRouter,
  instructorProfileRouter,
  studentsProfileRouter,
  taProfileRouter,
} from "./router";
import { isDev } from "./env";
import logger from "./core/logger";
import mongoose from "mongoose";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";

// Create Express server
const app = express();

// Initialize the context object
app.use((req: Request, _: Response, next: NextFunction) => {
  req.context = {};
  next();
});

// Configure HTTP request logger middleware
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.http(message) },
    skip: () => isDev,
  })
);

// Use helmet to secure HTTP headers
// https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(helmet());

// Disable the `X-Powered-By` HTTP header for security
// https://expressjs.com/en/advanced/best-practice-security.html#reduce-fingerprinting
app.disable("x-powered-by");

// Use compression middleware to compress HTTP responses
// https://stackoverflow.com/a/58813283/14174934
app.use(compression());

// Enable CORS
// https://stackoverflow.com/a/61988727/14174934
app.use(cors());

// Parse JSON and url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use("/student-profile", studentsProfileRouter());
app.use("/instructor-profile", instructorProfileRouter());
app.use("/employee-profile", employeeProfileRouter());
app.use("/ta-profile", taProfileRouter());

// TODO: Custom 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    errors: [
      {
        message: "Not found",
      },
    ],
  });
});
// TODO: Custom error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  // check the type of error and return the appropriate response
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      errors: [
        {
          message: err.message,
        },
      ],
    });
  } else if (err instanceof ForeignKeyNotFound) {
    return res.status(400).json({
      errors: [
        {
          message: err.message,
          code: err.code,
        },
      ],
    });
  }
  res.status(500).json({
    errors: [{ message: "Something broke on our end" }],
  });
});

export default app;
