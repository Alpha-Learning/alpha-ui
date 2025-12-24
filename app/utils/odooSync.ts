import axios from "axios";

/**
 * Maps relation to child string to Odoo relation_to_child_id
 */
function mapRelationToChildId(relation: string | null): number {
  if (!relation) return 1;
  
  const relationLower = relation.toLowerCase().trim();
  const mapping: Record<string, number> = {
    "father": 1,
    "dad": 1,
    "mother": 2,
    "mom": 2,
    "parent": 1,
    "guardian": 3,
    "other": 4,
  };

  for (const [key, id] of Object.entries(mapping)) {
    if (relationLower.includes(key)) {
      return id;
    }
  }

  const numValue = parseInt(relation);
  if (!isNaN(numValue)) {
    return numValue;
  }

  return 1; // Default
}

/**
 * Normalizes gender to Odoo format (f/m)
 */
function normalizeGender(gender: string | null | undefined): string | null {
  if (!gender) return null;
  
  const genderLower = gender.toLowerCase();
  if (genderLower === "f" || genderLower === "m") return genderLower;
  
  if (genderLower.startsWith("f") || genderLower === "female") return "f";
  if (genderLower.startsWith("m") || genderLower === "male") return "m";
  
  return null;
}

/**
 * Formats application data for Odoo admission API
 */
export function formatApplicationForOdoo(application: any) {
  return {
    parent: {
      full_name: application.parentFullName || "",
      email: application.parentEmail || "",
      phone: application.parentPhone || "",
      relation_to_child_id: mapRelationToChildId(application.relationToChild),
    },
    student: {
      full_name: application.childFullName || "",
      date_of_birth: application.childDateOfBirth
        ? new Date(application.childDateOfBirth).toISOString().split("T")[0]
        : null,
      age: application.childAge || null,
      gender: normalizeGender(application.childGender),
      school_year: application.childSchoolYear || null,
      current_school: application.childCurrentSchool || null,
      school_type: application.childSchoolType || null,
    },
  };
}

/**
 * Syncs application data to Odoo admission system
 */
export async function syncApplicationToOdoo(application: any) {
  const sessionSid = localStorage.getItem("odooToken");
  
  if (!sessionSid) {
    throw new Error("Please login to Odoo first");
  }

  const formattedData = formatApplicationForOdoo(application);

  const response = await axios.post("/api/odoo/admission/create", {
    sessionSid,
    ...formattedData,
    // Pass Alpha application ID so backend can forward it as temp_student to Odoo
    applicationId: application.id,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to sync to Odoo");
  }

  return response.data;
}

