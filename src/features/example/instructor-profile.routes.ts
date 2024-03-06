import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";

import ensureUserIdInParamsMiddleware from "./logic/middlewares/ensureUserIdInParams.middleware";
import updateInstructorProfileValidator from "./logic/middlewares/validateInstructorUpdateFields.middleware";
import updateInstructorProfileHandler from "./logic/handlers/updateInstructorProfile.handler";

const instructorProfileRoutes = (router: Router) => {
  router.patch(
    "/update/:userId",
    // Validate Instructor ID
    ensureUserIdInParamsMiddleware,

    // Validate profile fields
    updateInstructorProfileValidator,

    asyncHandler(updateInstructorProfileHandler)
  );
};
export default instructorProfileRoutes;
