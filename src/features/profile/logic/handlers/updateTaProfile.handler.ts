import { Request, Response } from "express";
import { EDITABLE_TA_PROFILE_FIELDS } from "../../data/UPDATE_PROFILE_FIELDS";
import {
  TeachingAssistantModel,
  TeachingAssistantType,
} from "@fcai-sis/shared-models";
import { TokenPayload } from "@fcai-sis/shared-middlewares";

/**
 * Update the TA's profile info
 */

type HandlerRequest = Request<
  {},
  {},
  {
    teachingAssistant: Partial<TeachingAssistantType>;
    user: TokenPayload;
  }
>;

const updateTaProfileHandler = async (req: HandlerRequest, res: Response) => {
  const { user, teachingAssistant } = req.body;

  const taToBeUpdated = await TeachingAssistantModel.findOne({
    user: user.userId,
  });

  if (!taToBeUpdated) {
    return res.status(404).json({
      errors: [
        {
          message: "TA not found",
        },
      ],
    });
  }

  // Check if the fields to be updated are valid
  const validFields = Object.keys(teachingAssistant).every((field) =>
    EDITABLE_TA_PROFILE_FIELDS.includes(field as any)
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

  // Update the instructor's profile info with the new data
  Object.entries(teachingAssistant).forEach(([field, value]) => {
    taToBeUpdated[field] = value;
  });

  await taToBeUpdated.save();

  const response = {
    message: "TA profile updated successfully",
  };

  return res.status(200).json(response);
};

export default updateTaProfileHandler;
