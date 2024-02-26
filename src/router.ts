import { Router } from "express";

import studentProfileRoutes from "./features/example/student-profile.routes";

const router: Router = Router();

export const studentsProfileRouter = (): Router => {
  const router = Router();
  studentProfileRoutes(router);
  return router;
};
