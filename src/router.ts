import { Router } from "express";

import studentProfileRoutes from "./features/example/student-profile.routes";
import instructorProfileRoutes from "./features/example/instructor-profile.routes";

export const studentsProfileRouter = (): Router => {
  const router = Router();
  studentProfileRoutes(router);
  return router;
};

export const instructorProfileRouter = (): Router => {
  const router = Router();
  instructorProfileRoutes(router);
  return router;
};
