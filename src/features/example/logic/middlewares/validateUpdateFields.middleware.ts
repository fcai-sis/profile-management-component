import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { STUDENT_PROFILE_FIELDS } from "../../data/STUDENT_PROFILE_FIELDS";

import logger from "../../../../core/logger";

const updateStudentProfileValidator = [
  // Validate the student's profile update request body
  body("phoneNumber")
    .optional()
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Invalid phone number"),

  body("address").optional().isString().withMessage("Invalid address"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating update student profile req body: ${JSON.stringify(req.body)}`
    );

    // if the request body contains any field other than those in UPDATE_FIELDS, return an error
    const allowedFields = STUDENT_PROFILE_FIELDS;
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      logger.debug(
        `Invalid req body provided ${JSON.stringify(invalidFields)}`
      );
      return res.status(400).json({
        error: {
          message: `Invalid fields provided: ${invalidFields}`,
        },
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.debug(
        `Invalid req body provided ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    if (req.body.address) req.body.address = req.body.address.trim();
    if (req.body.phoneNumber)
      req.body.phoneNumber = req.body.phoneNumber.trim();

    next();
  },
];

export default updateStudentProfileValidator;
