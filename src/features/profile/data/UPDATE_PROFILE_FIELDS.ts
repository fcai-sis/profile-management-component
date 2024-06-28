import {
  EmployeeType,
  InstructorType,
  StudentType,
  TeachingAssistantType,
} from "@fcai-sis/shared-models";

// TODO : Add the fields that you want to update in the profile page
export const EDITABLE_STUDENT_PROFILE_FIELDS: (keyof StudentType)[] = [
  "fullName",
  "phoneNumber",
  "address",
];
export const IMMUTABLE_STUDENT_PROFILE_FIELDS: (keyof StudentType)[] = [
  "studentId",
  "scientificDivision",
  "gender",
  "religion",
  "birthYear",
  "birthMonth",
  "birthDay",
  "birthPlace",
  "nationality",
];
export const INSTRUCTOR_PROFILE_FIELDS: (keyof InstructorType)[] = [
  "fullName",
  "officeHours",
];

export const TA_PROFILE_FIELDS: (keyof TeachingAssistantType)[] = [
  "fullName",
  "officeHours",
];

export const EMPLOYEE_PROFILE_FIELDS: (keyof EmployeeType)[] = [
  "fullName",
  "email",
];
