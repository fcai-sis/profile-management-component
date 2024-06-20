import { Router } from "express";
import {
  employeeProfileRoutes,
  instructorProfileRoutes,
  studentProfileRoutes,
} from "./features/profile/profile.routes";

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

export const employeeProfileRouter = (): Router => {
  const router = Router();
  employeeProfileRoutes(router);
  return router;
};
