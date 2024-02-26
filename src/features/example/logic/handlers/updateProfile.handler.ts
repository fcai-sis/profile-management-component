import { Request, Response } from "express";
import { UPDATE_FIELDS } from "../../data/UPDATE_FIELDS";

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
  const { studentId } = req.context.params;
  const profileUpdates = req.body;

  // TODO : put studentModel in shared-models
  const student = await StudentModel.findById(studentId);
  if (!student) {
    return res.status(404).send("Student not found");
  }

  // Update only the allowed fields
  for (const field in profileUpdates) {
    if (UPDATE_FIELDS.includes(field)) {
      student[field] = profileUpdates[field];
    }
  }

  await student.save();

  return res.status(200).send(student);
};

const updateStudentProfileHandler = handler;
export default updateStudentProfileHandler;
