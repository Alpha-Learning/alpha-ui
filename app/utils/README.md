# Utils Directory

This directory contains utility functions and services for the application.

## API Service

The main API service is located in `apiService.ts` and provides a comprehensive HTTP client with:

- Automatic authentication token management
- Error handling with automatic toast notifications
- File upload/download capabilities
- Environment-based configuration

### Usage

```typescript
import { apiService } from '@/utils/apiService';

// Basic HTTP methods
const users = await apiService.get('/users');
const newUser = await apiService.post('/users', userData);
const updatedUser = await apiService.put('/users/123', userData);
const patchedUser = await apiService.patch('/users/123', userData);
await apiService.delete('/users/123');

// File operations
await apiService.upload('/upload', formData);
await apiService.download('/download/file.pdf', 'filename.pdf');
```

### Configuration

Set the API base URL using environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### Features

- **Automatic Authentication**: Tokens are stored in localStorage and added to requests
- **Error Handling**: Automatic error handling with user-friendly messages
- **Toast Notifications**: Success messages appear automatically
- **File Operations**: Built-in upload and download functionality
- **TypeScript Support**: Full type safety

## Examples

See `apiService-examples.ts` for comprehensive usage examples.
