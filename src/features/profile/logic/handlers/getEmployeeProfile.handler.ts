import { Request, Response, response } from "express";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { EmployeeModel } from "@fcai-sis/shared-models";

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
      error: {
        message: "Employee not found",
      },
    });
  }

  const response = {
    profile: {
      fullName: employee.fullName,
      email: employee.email,
    },
  };

  return res.status(200).json(response);
};
export default getEmployeeProfileHandler;
