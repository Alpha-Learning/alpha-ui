# AI Assessment Integration

## Overview

The AI Assessment feature generates comprehensive UTL (Understanding The Learner) analysis reports using the Frank API. It analyzes all submitted assessment forms and provides detailed insights about the student's learning style, cognitive profile, strengths, challenges, and recommendations.

## How It Works

1. **Data Collection**: When a user clicks "Generate AI Assessment", the system collects all submitted form data for that application
2. **API Submission**: The data is formatted and sent to the Frank API (`POST /students/:id/reports/utl`)
3. **Report Generation**: The API analyzes the data and generates a comprehensive UTL report
4. **Display**: The report is displayed in a user-friendly format on the AI Assessment page

## API Integration

### Endpoint
- **Base URL**: `https://bio.alphalearning.me/api/v1`
- **Generate Report**: `POST /students/:studentId/reports/utl`
- **Get Report**: `GET /students/:studentId/reports/utl`

### Authentication
- Uses `x-api-key` header with `FRANK_API_KEY` from environment variables
- Includes `ngrok-skip-browser-warning: true` header for ngrok bypass

### Student ID Format
- Format: `student_{applicationId}`
- Example: `student_Cmjjtyyqo00018z9anusqequm`

## Environment Variables

Add these to your `.env` file:

```env
FRANK_API_BASE_URL=https://bio.alphalearning.me/api/v1
FRANK_API_KEY=your_api_key_here
```

## Key Files

### API Routes
- `app/api/admin/applications/[id]/ai-assessment/generate/route.ts` - Generates the assessment
- `app/api/admin/applications/[id]/ai-assessment/route.ts` - Retrieves existing assessment

### UI Components
- `app/admin/applications/[id]/ai-assessment/page.tsx` - Displays the assessment report

## Data Sources

The AI analysis uses data from these forms:
- Screening Call
- Parent/Guardian Questionnaire
- Caregiver Questionnaire
- Outsider Questionnaire
- KS1 Interview Questions
- KS2 Interview Questions
- Guided Observations Procedure
- Initial Observation Form
- Peer Dynamic Observation
- Parent-Child Dynamic Observation
- Understanding Parent
- Comprehensive Profile Sheet

## Report Structure

The generated report includes:
- **Executive Summary** - Overall readiness and key insights
- **Learning Style** - Primary learning preferences
- **Dominant Intelligences** - Multiple intelligence profile
- **Cognitive Profile** - Processing speed, working memory, etc.
- **Meta-Learning Pillars** - Self-regulation, metacognition, motivation, etc.
- **Academic Readiness** - Subject-level assessments
- **Emotional & Social Profiles** - Emotional regulation and social skills
- **Strengths & Challenges** - Key areas of strength and development
- **Recommendations** - Actionable next steps

## Usage

1. Navigate to an application detail page
2. Click "Generate AI Assessment" button
3. Wait for the report to be generated (may take 30-60 seconds)
4. View the comprehensive analysis report

## Error Handling

The system handles:
- Missing API keys
- Network timeouts (30 second timeout)
- Invalid student IDs
- Missing form data
- API errors (401, 404, 500)

All errors are logged and displayed to the user with helpful messages.

