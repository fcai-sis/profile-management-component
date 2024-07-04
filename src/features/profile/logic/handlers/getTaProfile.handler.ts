import { Request, Response } from "express";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";
import {
  EDITABLE_TA_PROFILE_FIELDS,
  IMMUTABLE_TA_PROFILE_FIELDS,
} from "../../../../features/profile/data/UPDATE_PROFILE_FIELDS";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

/*
 * Get TA profile
 * */
const getTaProfileHandler = async (req: HandlerRequest, res: Response) => {
  const { user } = req.body;

  const teachingAssistant = await TeachingAssistantModel.findOne({
    user: user.userId,
  }).populate("department");

  if (!teachingAssistant) {
    return res.status(404).send({
      errors: [
        {
          message: "TA not found",
        },
      ],
    });
  }

  const editableProfileFields = EDITABLE_TA_PROFILE_FIELDS.map((field) => {
    return {
      [field]: teachingAssistant[field],
    };
  });

  const immutableProfileFields = IMMUTABLE_TA_PROFILE_FIELDS.map((field) => {
    return {
      [field]: teachingAssistant[field],
    };
  });

  const response = {
    editableProfileFields,
    immutableProfileFields,
  };

  return res.status(200).json(response);
};
export default getTaProfileHandler;
