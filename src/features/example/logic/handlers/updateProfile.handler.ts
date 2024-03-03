import { Request, Response } from "express";
import { UPDATE_FIELDS } from "../../data/UPDATE_FIELDS";
import { StudentModel } from "@fcai-sis/shared-models";

/**
 * Update the student's profile info
 */

type HandlerRequest = Request<
  {
    studentId: string;
  },
  {},
  {
    [key: string]: string;
  }
>;
const handler = async (req: HandlerRequest, res: Response) => {
  const { studentId } = req.params;
  const profileUpdates = req.body;

  // TODO : put studentModel in shared-models
  const student = await StudentModel.findById(studentId);
  if (!student) {
    return res.status(404).send("Student not found");
  }

  // Check if the fields to be updated are valid
  const validFields = Object.keys(profileUpdates).every((field) =>
    UPDATE_FIELDS.includes(field)
  );

  if (!validFields) {
    return res.status(400).send("Invalid fields to update");
  }

  // Update the student's profile info with the new data
  Object.entries(profileUpdates).forEach(([field, value]) => {
    // TODO: what the hell is this type
    student[field] = value;
  });


  await student.save();

  return res.status(200).send(student);
};

const updateStudentProfileHandler = handler;
export default updateStudentProfileHandler;
