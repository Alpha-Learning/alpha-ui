// Enums matching your backend DTO
export enum Gender {
  M = 'M',
  F = 'F',
}

export enum SchoolType {
  Public = 'Public',
  Private = 'Private',
  Homeschool = 'Homeschool',
  Other = 'Other',
}

export enum TechPreference {
  Yes = 'Yes',
  No = 'No',
  NotSure = 'NotSure',
}

export enum HandsOnPreference {
  Yes = 'Yes',
  No = 'No',
  NotSure = 'NotSure',
}

// Interface matching your CreateApplicationDto
export interface CreateApplicationDto {
  // Parent/Guardian Information
  parentFullName: string;
  parentEmail: string;
  parentPhone?: string;
  relationToChild?: string;
  parentCity?: string;
  parentEthnicity?: string;

  // Child Information
  childFullName: string;
  childDateOfBirth?: string;
  childAge?: number;
  childGender?: Gender;
  childEthnicity?: string;
  childSchoolYear?: string;
  childCurrentSchool?: string;
  childSchoolType?: SchoolType;
  childSchoolTypeOther?: string;
  childDiagnosedNeeds?: string;

  // Caregiver/Nanny Information (optional)
  caregiverFullName?: string;
  caregiverPhone?: string;

  // Parent Questions
  qExcitesMost: string;
  qNonTraditionalReason: string;
  qBiggestHope: string;
  enjoysTech: TechPreference;
  enjoysHandsOn: HandsOnPreference;

  // Consent
  consentContact: boolean;
  consentUpdates: boolean;
  consentBiometric?: boolean;
}

// User Application types
export interface UserApplication {
  id: string;
  parentFullName: string;
  parentEmail: string;
  childFullName?: string;
  childAge?: number;
  childGrade?: string;
  status: 'submitted' | 'processing' | 'completed' | 'rejected' | 'pending';
  submittedAt: string;
  lastUpdated: string;
  type: string;
  description: string;
}

export interface UserApplicationsResponse {
  success: boolean;
  data?: {
    applications: UserApplication[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message?: string;
}

// API Response types
export interface ApplicationResponse {
  success: boolean;
  data?: {
    id: string;
    status: string;
    message: string;
  };
  message?: string;
  errors?: Record<string, string[]>;
}
