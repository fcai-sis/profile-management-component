import { Request, Response } from "express";

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

  student.profile = {
    ...student.profile,
    ...profileUpdates,
  };

  await student.save();

  return res.status(200).send(student);
};

const updateStudentProfileHandler = handler;
export default updateStudentProfileHandler;
