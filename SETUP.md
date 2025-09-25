# VGA Broker Assessment System - Setup Guide

## Prerequisites

- Node.js 18+ 
- npm or pnpm

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and set your API base URL:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Project Structure

```
app/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── dashboard/          # Dashboard pages (parent, admin)
├── form/              # Form pages
├── services/api/      # API service layer
├── utils/             # Utility functions and services
└── globals.css        # Global styles
```

## Key Features

### API Services
- **Utils API Service** (`app/utils/apiService.ts`): Main HTTP client with authentication and error handling
- **Services API** (`app/services/api/`): Specialized API services for different domains

### Authentication
- Role-based access control (Parent/Admin)
- Protected routes
- Token management

### Forms
- Pre-assessment form with validation
- React Hook Form integration
- Zod schema validation

### Dashboards
- Parent Dashboard: Family-friendly interface
- Admin Dashboard: Professional admin interface

## Usage Examples

### Using the Utils API Service

```typescript
import { apiService } from '@/utils/apiService';

// GET request
const users = await apiService.get('/users');

// POST request
const result = await apiService.post('/pre-assessment', formData);

// File upload
const uploadResult = await apiService.upload('/upload', formData);
```

### Using Specialized API Services

```typescript
import { authService, userService } from '@/services/api';

// Authentication
const loginResult = await authService.login(credentials);

// User management
const users = await userService.getUsers();
```

## Development

- **Framework**: Next.js 15.5.3 with Turbopack
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **TypeScript**: Full type safety

## API Endpoints

The application includes mock API endpoints:

- `POST /api/pre-assessment` - Submit pre-assessment form
- `POST /api/auth/login` - User authentication
- `GET /api/dashboard/parent` - Parent dashboard data
- `GET /api/dashboard/admin` - Admin dashboard data

## Troubleshooting

1. **TypeScript errors**: Make sure all dependencies are installed
2. **API errors**: Check your environment variables
3. **Toast notifications**: Ensure Toaster component is included in layout
4. **Authentication**: Verify token storage in localStorage

## Next Steps

1. Replace mock API endpoints with real backend
2. Add database integration
3. Implement real authentication
4. Add more form validation
5. Enhance dashboard features
