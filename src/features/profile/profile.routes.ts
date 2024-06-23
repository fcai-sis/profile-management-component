import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";

import updateInstructorProfileHandler from "./logic/handlers/updateInstructorProfile.handler";
import updateStudentProfileHandler from "./logic/handlers/updateStudentProfile.handler";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";
import getEmployeeProfileHandler from "./logic/handlers/getEmployeeProfile.handler";
import updateEmployeeProfileHandler from "./logic/handlers/updateEmployeeProfile.handler";
import getInstructorProfileHandler from "./logic/handlers/getInstructorProfile.handler";
import getStudentProfileHandler from "./logic/handlers/getStudentProfile.handler";

export const instructorProfileRoutes = (router: Router) => {
  router.get(
    "/",
    checkRole([Role.INSTUCTOR]),
    asyncHandler(getInstructorProfileHandler)
  );
  router.patch(
    "/",
    checkRole([Role.INSTUCTOR]),
    asyncHandler(updateInstructorProfileHandler)
  );
};

export const studentProfileRoutes = (router: Router) => {
  router.patch(
    "/",
    checkRole([Role.STUDENT]),
    asyncHandler(updateStudentProfileHandler)
  );

  router.get(
    "/",
    checkRole([Role.STUDENT]),
    asyncHandler(getStudentProfileHandler)
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
