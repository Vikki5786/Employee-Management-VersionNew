import { Employee } from "./employee";

export interface EmployeeUploadPayload {
  employee: Employee;
  profileImageFile?: File;
  resumeFile?: File;
}