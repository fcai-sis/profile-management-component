import { Request, Response } from "express";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { InstructorModel } from "@fcai-sis/shared-models";
import { INSTRUCTOR_PROFILE_FIELDS } from "../../../../features/profile/data/UPDATE_PROFILE_FIELDS";

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
  });

  if (!instructor) {
    return res.status(404).send({
      error: {
        message: "Instructor not found",
      },
    });
  }

  const profileFields = INSTRUCTOR_PROFILE_FIELDS.map((field) => {
    return {
      [field]: instructor[field],
    };
  });

  const response = {
    profile: profileFields,
  };

  return res.status(200).json(response);
};
export default getInstructorProfileHandler;
