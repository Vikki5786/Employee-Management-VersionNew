
  // profileImage?: File | Blob | string; 
  // resume?: File | Blob | string;      
  // resume?: File;               
  // profileImage?: File;        



export interface Employee {
    employeeCode?: string;

  // employeeCode: string;
  firstName: string;
  lastName: string;
    phoneNumber?: string;

  // phoneNumber: string;
  emailId: string;
    gender?: 'Male' | 'Female' | 'Other';
  // gender: string;
  dateOfBirth?: string | Date;

  // dateOfBirth: Date;
    maritalStatus?: 'Single' | 'Married' | 'Unmarried'| 'Divorced' | 'Widowed';
  // maritalStatus: string;
    nationality?: string;
  // nationality: string;
  country: string;
    state?: string;

  // state: string;
    city?: string;

  // city: string;
    zipCode?: string;

  // zipCode: string;
    address?: string;

  // address: string;
    designation?: string;

  // designation: string;
  job: string;
  
  dateOfJoining: Date;
    experience?: string;

  // experience: string;
  salary: number;
    reportingManager?: string;

  // reportingManager: string;
  // status: string;
    status?: "Active" | "Inactive" | "Resigned" | "On Leave"; // add "On Leave" here

  // skills: string[];
    skills?: string[];

  profileImage: string;
  resume: string;
}
