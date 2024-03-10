import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("userId")

    .exists()
    .withMessage("ID is required")

    .isMongoId()
    .withMessage("ID must be a valid Mongo ID"),

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

const ensureUserIdInParamsMiddleware = middlewares;
export default ensureUserIdInParamsMiddleware;
