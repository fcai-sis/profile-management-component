import { Request, Response } from "express";
import { INSTRUCTOR_PROFILE_FIELDS } from "../../data/UPDATE_PROFILE_FIELDS";
import { InstructorModel } from "@fcai-sis/shared-models";

/**
 * Update the instructor's profile info
 */

type HandlerRequest = Request<
  {
    instructorId: string;
  },
  {},
  {
    [key: string]: string;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { instructorId } = req.params;
  const profileUpdates = req.body;

  const instructor = await InstructorModel.findById(instructorId);
  if (!instructor) {
    return res.status(404).send("Instructor not found");
  }

  // Check if the fields to be updated are valid
  const validFields = Object.keys(profileUpdates).every((field) =>
    INSTRUCTOR_PROFILE_FIELDS.includes(field)
  );

  if (!validFields) {
    return res.status(400).send("Invalid fields to update");
  }

  // Update the instructor's profile info with the new data
  Object.entries(profileUpdates).forEach(([field, value]) => {
    instructor[field] = value;
  });

  await instructor.save();

  return res.status(200).send(instructor);
};

const updateInstructorProfileHandler = handler;
export default updateInstructorProfileHandler;
