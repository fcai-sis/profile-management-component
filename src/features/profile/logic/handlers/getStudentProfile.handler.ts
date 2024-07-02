import { Request, Response } from "express";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { StudentModel } from "@fcai-sis/shared-models";
import {
  EDITABLE_STUDENT_PROFILE_FIELDS,
  IMMUTABLE_STUDENT_PROFILE_FIELDS,
} from "../../../../features/profile/data/UPDATE_PROFILE_FIELDS";

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
      errors: [
        {
          message: "Student not found",
        },
      ],
    });
  }

  const editableProfileFields = EDITABLE_STUDENT_PROFILE_FIELDS.map((field) => {
    return {
      [field]: student[field],
    };
  });

  const immutableProfileFields = IMMUTABLE_STUDENT_PROFILE_FIELDS.map(
    (field) => {
      return {
        [field]: student[field],
      };
    }
  );

  const response = {
    editableProfileFields,
    immutableProfileFields,
  };

  return res.status(200).json(response);
};
export default getStudentProfileHandler;
