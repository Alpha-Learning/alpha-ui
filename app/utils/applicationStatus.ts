// Temporary type until Prisma client is regenerated
export type ApplicationWithCompletion = {
  isFirstFormCompleted?: boolean;
  isSecondFormCompleted?: boolean;
  isThirdFormCompleted?: boolean;
  isFourthFormCompleted?: boolean;
  isFifthFormCompleted?: boolean;
  isSixthFormCompleted?: boolean;
  isSeventhFormCompleted?: boolean;
  isEighthFormCompleted?: boolean;
  isNinthFormCompleted?: boolean;
  isTenthFormCompleted?: boolean;
  isParentGuardianFormCompleted?: boolean;
  isCaregiverFormCompleted?: boolean;
  isOutsiderFormCompleted?: boolean;
};

/**
 * Determines the application status based on form completion
 */
export function determineApplicationStatus(application: ApplicationWithCompletion): {
  status: 'submitted' | 'processing' | 'completed' | 'rejected';
  progress: number;
  completedForms: string[];
  remainingForms: string[];
} {
  const formStatuses = [
    { name: 'Screening Call', completed: application.isFirstFormCompleted },
    { name: 'Parent/Guardian Questionnaire', completed: application.isParentGuardianFormCompleted },
    { name: 'Caregiver Questionnaire', completed: application.isCaregiverFormCompleted },
    { name: 'Outsider Questionnaire', completed: application.isOutsiderFormCompleted },
    { name: 'Stage 3 Complete', completed: application.isThirdFormCompleted },
    { name: 'Facility Walkthrough Checklist', completed: application.isFifthFormCompleted },
    { name: 'Initial Observation Form', completed: application.isSixthFormCompleted },
    { name: 'Guided Observations Procedure', completed: application.isSeventhFormCompleted },
    { name: 'Initial Form', completed: application.isEighthFormCompleted },
    { name: 'Parent-Child Dynamic Observation', completed: application.isNinthFormCompleted },
    { name: 'Form 10', completed: application.isTenthFormCompleted },
  ];

  const completedForms = formStatuses.filter(f => f.completed).map(f => f.name);
  const remainingForms = formStatuses.filter(f => !f.completed).map(f => f.name);
  const progress = Math.round((completedForms.length / formStatuses.length) * 100);

  // Determine status based on completion
  let status: 'submitted' | 'processing' | 'completed' | 'rejected' = 'submitted';
  
  if (completedForms.length === 0) {
    status = 'submitted';
  } else if (completedForms.length < formStatuses.length) {
    status = 'processing';
  } else if (completedForms.length === formStatuses.length) {
    status = 'completed';
  }

  return {
    status,
    progress,
    completedForms,
    remainingForms,
  };
}

/**
 * Updates application status based on form completion
 */
export async function updateApplicationStatus(applicationId: string, prisma: any) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: {
      isFirstFormCompleted: true,
      isSecondFormCompleted: true,
      isThirdFormCompleted: true,
      isFourthFormCompleted: true,
      isFifthFormCompleted: true,
      isSixthFormCompleted: true,
      isSeventhFormCompleted: true,
      isEighthFormCompleted: true,
      isNinthFormCompleted: true,
      isTenthFormCompleted: true,
      isParentGuardianFormCompleted: true,
      isCaregiverFormCompleted: true,
      isOutsiderFormCompleted: true,
    },
  });

  if (!application) {
    throw new Error('Application not found');
  }

  const { status } = determineApplicationStatus(application);

  return await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });
}
