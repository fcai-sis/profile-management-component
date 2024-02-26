import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";

import updateStudentProfileHandler from "./logic/handlers/updateProfile.handler";
import updateStudentProfileValidator from "./logic/middlewares/validateUpdateFields.middleware";
import ensureStudentIdInParamsMiddleware from "./logic/middlewares/ensureStudentIdInParams.middleware";

export default (router: Router) => {
  router.post(
    "/update-profile/:studentId",

    // Validate student ID
    ensureStudentIdInParamsMiddleware,

    // Validate example message
    updateStudentProfileValidator,

    // Handle example request
    asyncHandler(updateStudentProfileHandler)
  );
};
