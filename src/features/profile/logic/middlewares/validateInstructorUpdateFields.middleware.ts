// import { NextFunction, Request, Response } from "express";
// import { validationResult } from "express-validator";
// import { INSTRUCTOR_PROFILE_FIELDS } from "../../data/UPDATE_PROFILE_FIELDS";

// import logger from "../../../../core/logger";

// const updateInstructorProfileValidator = [
//   (req: Request, res: Response, next: NextFunction) => {
//     logger.debug(
//       `Validating update instructor profile req body: ${JSON.stringify(
//         req.body
//       )}`
//     );

//     // if the request body contains any field other than those in UPDATE_FIELDS, return an error
//     const allowedFields = INSTRUCTOR_PROFILE_FIELDS;
//     const receivedFields = Object.keys(req.body);
//     const invalidFields = receivedFields.filter(
//       (field) => !allowedFields.includes(field as any)
//     );
//     if (invalidFields.length > 0) {
//       logger.debug(
//         `Invalid req body provided ${JSON.stringify(invalidFields)}`
//       );
//       return res.status(400).json({
//         error: {
//           message: `Invalid fields provided: ${invalidFields}`,
//         },
//       });
//     }

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       logger.debug(
//         `Invalid req body provided ${JSON.stringify(errors.array())}`
//       );
//       return res.status(400).json({
//         error: {
//           message: errors.array()[0].msg,
//         },
//       });
//     }

//     next();
//   },
// ];

// export default updateInstructorProfileValidator;
