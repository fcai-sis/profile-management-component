import { Router } from "express";
import {
  employeeProfileRoutes,
  instructorProfileRoutes,
  studentProfileRoutes,
  taProfileRoutes,
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

export const taProfileRouter = (): Router => {
  const router = Router();
  taProfileRoutes(router);
  return router;
};

export const employeeProfileRouter = (): Router => {
  const router = Router();
  employeeProfileRoutes(router);
  return router;
};
