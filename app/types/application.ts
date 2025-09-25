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
