import {
  EmployeeType,
  InstructorType,
  StudentType,
  TeachingAssistantType,
} from "@fcai-sis/shared-models";

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

export const IMMUTABLE_INSTRUCTOR_PROFILE_FIELDS: (keyof InstructorType)[] = [
  "department",
];

export const EDITABLE_INSTRUCTOR_PROFILE_FIELDS: (keyof InstructorType)[] = [
  "fullName",
  "email",
  "title",
  "office",
  "officeHours",
];

export const IMMUTABLE_TA_PROFILE_FIELDS: (keyof TeachingAssistantType)[] = [
  "department",
];

export const EDITABLE_TA_PROFILE_FIELDS: (keyof TeachingAssistantType)[] = [
  "fullName",
  "email",
  "title",
  "office",
  "officeHours",
];

export const EMPLOYEE_PROFILE_FIELDS: (keyof EmployeeType)[] = [
  "fullName",
  "email",
];
