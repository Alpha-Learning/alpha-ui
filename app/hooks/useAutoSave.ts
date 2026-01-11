import { useEffect, useCallback, useRef } from 'react';
import { UseFormWatch, FieldValues } from 'react-hook-form';
import { apiService } from '@/app/utils';

interface UseAutoSaveOptions {
  saveEndpoint: string;
  applicationId: string;
  debounceMs?: number;
  intervalMs?: number;
  enabled?: boolean;
  transformData?: (data: any) => any;
}

export function useAutoSave<T extends FieldValues>(
  watch: UseFormWatch<T>,
  options: UseAutoSaveOptions
) {
  const {
    saveEndpoint,
    applicationId,
    debounceMs = 2000,
    intervalMs = 30000,
    enabled = true,
    transformData,
  } = options;

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);
  const lastSavedDataRef = useRef<string>('');

  const formValues = watch();

  const saveToDatabase = useCallback(
    async (data: T, isDraft: boolean = true) => {
      if (!enabled || isSavingRef.current) {
        return;
      }

      const dataString = JSON.stringify(data);
      
      if (dataString === lastSavedDataRef.current) {
        return;
      }

      try {
        isSavingRef.current = true;

        const payload = transformData ? transformData(data) : data;

        const response = await apiService.post(saveEndpoint, {
          ...payload,
          applicationId,
          isDraft,
        });

        if (response.success) {
          lastSavedDataRef.current = dataString;
        } else {
          console.error('Auto-save failed:', response.message);
        }
      } catch (error: any) {
        console.error('Auto-save error:', error);
      } finally {
        isSavingRef.current = false;
      }
    },
    [saveEndpoint, applicationId, enabled, transformData]
  );

  useEffect(() => {
    if (!enabled) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveToDatabase(formValues, true);
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formValues, debounceMs, enabled, saveToDatabase]);

  useEffect(() => {
    if (!enabled) return;

    intervalTimerRef.current = setInterval(() => {
      saveToDatabase(formValues, true);
    }, intervalMs);

    return () => {
      if (intervalTimerRef.current) {
        clearInterval(intervalTimerRef.current);
      }
    };
  }, [intervalMs, enabled, saveToDatabase, formValues]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (intervalTimerRef.current) {
        clearInterval(intervalTimerRef.current);
      }
    };
  }, []);
}