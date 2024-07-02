import { Request, Response } from "express";
import { EDITABLE_STUDENT_PROFILE_FIELDS } from "../../data/UPDATE_PROFILE_FIELDS";
import { StudentModel, StudentType } from "@fcai-sis/shared-models";
import { TokenPayload } from "@fcai-sis/shared-middlewares";

/**
 * Update the student's profile info
 */

type HandlerRequest = Request<
  {},
  {},
  {
    student: Partial<StudentType>;
    user: TokenPayload;
  }
>;
const updateStudentProfileHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { user, student } = req.body;

  const studentToBeUpdated = await StudentModel.findOne({
    user: user.userId,
  });
  if (!studentToBeUpdated) {
    return res.status(404).json({
      errors: [
        {
          message: "Student not found",
        },
      ],
    });
  }

  // Check if the fields to be updated are valid
  const validFields = Object.keys(student).every((field) =>
    EDITABLE_STUDENT_PROFILE_FIELDS.includes(field as any)
  );

  if (!validFields) {
    return res.status(400).json({
      errors: [
        {
          message: "Invalid fields to update",
        },
      ],
    });
  }

  // Update the student's profile info with the new data
  Object.entries(student).forEach(([field, value]) => {
    studentToBeUpdated[field] = value;
  });

  await studentToBeUpdated.save();

  const response = {
    message: "Student profile updated successfully",
  };

  return res.status(200).json(response);
};

export default updateStudentProfileHandler;
