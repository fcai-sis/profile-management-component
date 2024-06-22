import { Request, Response } from "express";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { StudentModel } from "@fcai-sis/shared-models";
import { STUDENT_PROFILE_FIELDS } from "../../../../features/profile/data/UPDATE_PROFILE_FIELDS";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

/*
 * Get Student profile
 * */
const getStudentProfileHandler = async (req: HandlerRequest, res: Response) => {
  const { user } = req.body;

  const student = await StudentModel.findOne({
    user: user.userId,
  });

  if (!student) {
    return res.status(404).send({
      error: {
        message: "Student not found",
      },
    });
  }

  const profileFields = STUDENT_PROFILE_FIELDS.map((field) => {
    return {
      [field]: student[field],
    };
  });

  const response = {
    profile: profileFields,
  };

  return res.status(200).json(response);
};
export default getStudentProfileHandler;
