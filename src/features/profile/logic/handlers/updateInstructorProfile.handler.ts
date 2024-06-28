import { Request, Response } from "express";
import { INSTRUCTOR_PROFILE_FIELDS } from "../../data/UPDATE_PROFILE_FIELDS";
import { InstructorModel, InstructorType } from "@fcai-sis/shared-models";
import { TokenPayload } from "@fcai-sis/shared-middlewares";

/**
 * Update the instructor's profile info
 */

type HandlerRequest = Request<
  {},
  {},
  {
    instructor: Partial<InstructorType>;
    user: TokenPayload;
  }
>;

const updateInstructorProfileHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { user, instructor } = req.body;

  const instructorToBeUpdated = await InstructorModel.findOne({
    user: user.userId,
  });

  if (!instructorToBeUpdated) {
    return res.status(404).json({
      error: {
        message: "Instructor not found",
      },
    });
  }

  // Check if the fields to be updated are valid
  const validFields = Object.keys(instructor).every((field) =>
    INSTRUCTOR_PROFILE_FIELDS.includes(field as any)
  );

  if (!validFields) {
    return res.status(400).json({
      error: {
        message: "Invalid fields to update",
      },
    });
  }

  // Update the instructor's profile info with the new data
  Object.entries(instructor).forEach(([field, value]) => {
    instructorToBeUpdated[field] = value;
  });

  await instructorToBeUpdated.save();

  const response = {
    message: "Instructor profile updated successfully",
  };

  return res.status(200).json(response);
};

export default updateInstructorProfileHandler;
