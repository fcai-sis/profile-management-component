import { Request, Response } from "express";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { EmployeeModel } from "@fcai-sis/shared-models";
import { EMPLOYEE_PROFILE_FIELDS } from "../../../../features/profile/data/UPDATE_PROFILE_FIELDS";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

/*
 * Get Employee profile
 * */
const getEmployeeProfileHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { user } = req.body;

  const employee = await EmployeeModel.findOne({
    user: user.userId,
  });

  if (!employee) {
    return res.status(404).send({
      errors: [
        {
          message: "Employee not found",
        },
      ],
    });
  }

  const profileFields = EMPLOYEE_PROFILE_FIELDS.map((field) => {
    return {
      [field]: employee[field],
    };
  });

  const response = {
    profile: profileFields,
  };

  return res.status(200).json(response);
};
export default getEmployeeProfileHandler;
