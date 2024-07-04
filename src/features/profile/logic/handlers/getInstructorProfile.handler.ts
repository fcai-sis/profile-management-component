import { Request, Response } from "express";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { InstructorModel } from "@fcai-sis/shared-models";
import {
  EDITABLE_INSTRUCTOR_PROFILE_FIELDS,
  IMMUTABLE_INSTRUCTOR_PROFILE_FIELDS,
} from "../../../../features/profile/data/UPDATE_PROFILE_FIELDS";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

/*
 * Get Instructor profile
 * */
const getInstructorProfileHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { user } = req.body;

  const instructor = await InstructorModel.findOne({
    user: user.userId,
  }).populate("department");

  if (!instructor) {
    return res.status(404).send({
      errors: [
        {
          message: "Instructor not found",
        },
      ],
    });
  }

  const editableProfileFields = EDITABLE_INSTRUCTOR_PROFILE_FIELDS.map(
    (field) => {
      return {
        [field]: instructor[field],
      };
    }
  );

  const immutableProfileFields = IMMUTABLE_INSTRUCTOR_PROFILE_FIELDS.map(
    (field) => {
      return {
        [field]: instructor[field],
      };
    }
  );

  const response = {
    editableProfileFields,
    immutableProfileFields,
  };

  return res.status(200).json(response);
};
export default getInstructorProfileHandler;
