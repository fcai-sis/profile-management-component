import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";

import ensureUserIdInParamsMiddleware from "./logic/middlewares/ensureUserIdInParams.middleware";
import updateInstructorProfileValidator from "./logic/middlewares/validateInstructorUpdateFields.middleware";
import updateInstructorProfileHandler from "./logic/handlers/updateInstructorProfile.handler";
import updateStudentProfileValidator from "./logic/middlewares/validateStudentUpdateFields.middleware";
import updateStudentProfileHandler from "./logic/handlers/updateStudentProfile.handler";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";
import getEmployeeProfileHandler from "./logic/handlers/getEmployeeProfile.handler";
import updateEmployeeProfileHandler from "./logic/handlers/updateEmployeeProfile.handler";

export const instructorProfileRoutes = (router: Router) => {
  router.patch(
    "/update/:userId",
    // Validate Instructor ID
    ensureUserIdInParamsMiddleware,

    // Validate profile fields
    updateInstructorProfileValidator,

    asyncHandler(updateInstructorProfileHandler)
  );
};

export const studentProfileRoutes = (router: Router) => {
  router.patch(
    "/update/:userId",

    // Validate student ID
    ensureUserIdInParamsMiddleware,

    updateStudentProfileValidator,

    asyncHandler(updateStudentProfileHandler)
  );
};

export const employeeProfileRoutes = (router: Router) => {
  router.get(
    "/",
    checkRole([Role.EMPLOYEE]),
    asyncHandler(getEmployeeProfileHandler)
  );

  router.patch(
    "/",
    checkRole([Role.EMPLOYEE]),
    asyncHandler(updateEmployeeProfileHandler)
  );
};
