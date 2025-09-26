export interface ApiErrorHandler {
  error: string | null;
  data: any | null;
}

export async function withErrorHandling<T>(
  apiCall: () => Promise<T>,
  context: string = 'API call'
): Promise<ApiErrorHandler> {
  try {
    const data = await apiCall();
    return { error: null, data };
  } catch (error) {
    console.error(`${context} error:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage, data: null };
  }
}
