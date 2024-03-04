import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";

import updateStudentProfileHandler from "./logic/handlers/updateStudentProfile.handler";
import updateStudentProfileValidator from "./logic/middlewares/validateStudentUpdateFields.middleware";
import ensureUserIdInParamsMiddleware from "./logic/middlewares/ensureUserIdInParams.middleware";
import updateInstructorProfileValidator from "./logic/middlewares/validateInstructorUpdateFields.middleware";
import updateInstructorProfileHandler from "./logic/handlers/updateInstructorProfile.handler";

export default (router: Router) => {
  router.patch(
    "/update-student-profile/:userId",

    // Validate student ID
    ensureUserIdInParamsMiddleware,

    // Validate example message
    updateStudentProfileValidator,

    // Handle example request
    asyncHandler(updateStudentProfileHandler)
  );

  router.patch(
    "/update-instructor-profile/:userId",
    // Validate Instructor ID
    ensureUserIdInParamsMiddleware,

    // Validate profile fields
    updateInstructorProfileValidator,

    asyncHandler(updateInstructorProfileHandler)
  );
};
