import autofillDataJson from '../../form-autofill-data.json';

export type AutofillDataKey = 
  | 'ks1Interview' 
  | 'ks2Interview' 
  | 'parentGuardian' 
  | 'caregiver' 
  | 'outsider' 
  | 'guidedObservation'
  | 'peerDynamicObservation'
  | 'understandingParent'
  | 'comprehensiveProfileSheet'
  | 'initialObservationForm'
  | 'parentChildDynamicObservation'
  | 'screeningCall';

const autofillData = autofillDataJson as Record<AutofillDataKey, Record<string, any>>;

export function getAutofillData(key: AutofillDataKey): Record<string, any> {
  return autofillData[key] || {};
}

