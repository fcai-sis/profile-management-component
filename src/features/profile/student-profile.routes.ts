import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";

import updateStudentProfileHandler from "./logic/handlers/updateStudentProfile.handler";
import updateStudentProfileValidator from "./logic/middlewares/validateStudentUpdateFields.middleware";
import ensureUserIdInParamsMiddleware from "./logic/middlewares/ensureUserIdInParams.middleware";

const studentProfileRoutes = (router: Router) => {
  router.patch(
    "/update/:userId",

    // Validate student ID
    ensureUserIdInParamsMiddleware,

    // Validate example message
    updateStudentProfileValidator,

    // Handle example request
    asyncHandler(updateStudentProfileHandler)
  );
};
export default studentProfileRoutes;
