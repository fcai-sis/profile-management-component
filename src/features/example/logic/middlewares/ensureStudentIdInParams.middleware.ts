import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("studentId")

    .exists()
    .withMessage("Student ID is required")

    .isMongoId()
    .withMessage("Student ID must be a valid Mongo ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    req.params.studentId = req.params.studentId.trim();

    next();
  },
];

const ensureStudentIdInParamsMiddleware = middlewares;
export default ensureStudentIdInParamsMiddleware;
