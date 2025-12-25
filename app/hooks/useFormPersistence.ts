import { useEffect, useCallback, useRef } from 'react';
import { UseFormWatch, UseFormSetValue, FieldValues } from 'react-hook-form';

/**
 * Custom hook to persist form data to localStorage
 * Prevents data loss on page refresh or accidental navigation
 * 
 * @param watch - React Hook Form's watch function
 * @param setValue - React Hook Form's setValue function
 * @param formKey - Unique key for this form (e.g., 'screening-call', 'ks1-interview')
 * @param applicationId - Application ID to scope the storage
 * @param enabled - Whether persistence is enabled (default: true)
 */
export function useFormPersistence<T extends FieldValues>(
  watch: UseFormWatch<T>,
  setValue: UseFormSetValue<T>,
  formKey: string,
  applicationId: string,
  enabled: boolean = true
) {
  const storageKey = `form-draft-${formKey}-${applicationId}`;
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRestoringRef = useRef(false);

  // Watch all form values
  const formValues = watch();

  // Save to localStorage (debounced)
  useEffect(() => {
    if (!enabled || isRestoringRef.current) {
      return;
    }

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce save to avoid too frequent writes
    debounceTimerRef.current = setTimeout(() => {
      try {
        const dataToSave = JSON.stringify(formValues);
        localStorage.setItem(storageKey, dataToSave);
      } catch (error) {
        console.warn('Failed to save form data to localStorage:', error);
      }
    }, 500); // Save after 500ms of no changes

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formValues, storageKey, enabled]);

  // Restore from localStorage on mount (only if form is empty)
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Wait a bit to allow form to initialize and API data to load first
    const restoreTimer = setTimeout(() => {
      try {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const currentValues = watch();
          
          // Only restore if form appears to be empty (no significant data loaded from API)
          // Check if most fields are empty
          const hasExistingData = Object.values(currentValues).some((val) => {
            if (typeof val === 'string' && val.trim().length > 0) return true;
            if (typeof val === 'boolean') return true;
            if (Array.isArray(val) && val.length > 0) return true;
            if (val && typeof val === 'object' && Object.keys(val).length > 0) return true;
            return false;
          });

          // Only restore if form is mostly empty (likely no API data loaded)
          if (!hasExistingData) {
            isRestoringRef.current = true;
            
            // Restore each field
            Object.keys(parsedData).forEach((key) => {
              const value = parsedData[key];
              // Only restore if value is not empty/null/undefined
              if (value !== null && value !== undefined && value !== '') {
                setValue(key as any, value, { shouldDirty: false });
              }
            });

            // Reset flag after a short delay
            setTimeout(() => {
              isRestoringRef.current = false;
            }, 100);
          }
        }
      } catch (error) {
        console.warn('Failed to restore form data from localStorage:', error);
      }
    }, 500); // Wait 500ms for API data to load first

    return () => clearTimeout(restoreTimer);
  }, [storageKey, setValue, enabled, watch]);

  // Clear storage function (call after successful submission)
  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Failed to clear form data from localStorage:', error);
    }
  }, [storageKey]);

  return { clearStorage };
}

