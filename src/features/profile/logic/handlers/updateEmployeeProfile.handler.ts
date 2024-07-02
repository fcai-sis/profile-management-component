import { Request, Response } from "express";
import { EMPLOYEE_PROFILE_FIELDS } from "../../data/UPDATE_PROFILE_FIELDS";
import { EmployeeModel, EmployeeType } from "@fcai-sis/shared-models";
import { TokenPayload } from "@fcai-sis/shared-middlewares";

/**
 * Update the employee's profile info
 */

type HandlerRequest = Request<
  {},
  {},
  {
    employee: Partial<EmployeeType>;
    user: TokenPayload;
  }
>;

const updateEmployeeProfileHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { employee, user } = req.body;

  const employeeToBeUpdated = await EmployeeModel.findOne({
    user: user.userId,
  });

  if (!employeeToBeUpdated) {
    return res.status(404).json({
      errors: [
        {
          message: "Employee not found",
        },
      ],
    });
  }

  // Check if the fields to be updated are valid
  const validFields = Object.keys(employee).every((field) =>
    EMPLOYEE_PROFILE_FIELDS.includes(field as any)
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

  // Update the employee's profile info with the new data
  Object.entries(employee).forEach(([field, value]) => {
    employeeToBeUpdated[field] = value;
  });

  await employeeToBeUpdated.save();

  const response = {
    message: "Employee profile updated successfully",
  };

  return res.status(200).json(response);
};

export default updateEmployeeProfileHandler;
