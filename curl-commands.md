# ALS API - Individual cURL Commands

## Setup Variables
```bash
# Set these in your terminal first:
export ALS_API_BASE_URL="https://7bd4d14a1701.ngrok-free.app/api/v1"
export API_KEY="your-api-key-here"
export ALS_STUDENT_ID="ALS-STU-TEST-001"
```

## 1. Create Student
```bash
curl -X POST "$ALS_API_BASE_URL/students" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d '{
    "name": "Test Student",
    "alsStudentId": "ALS-STU-TEST-001",
    "age": 10,
    "parentName": "Test Parent"
  }'
```

## 2. Get Student by ID
```bash
curl -X GET "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true"
```

## 3. List All Students
```bash
curl -X GET "$ALS_API_BASE_URL/students" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true"
```

## 4. Submit UTL Report
```bash
curl -X POST "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d '{
    "content": "UNDERSTANDING THE LEARNER (UTL) ASSESSMENT\n\nStudent: Test Student\nAge: 10 years old\nGrade: 5th\n\nLEARNING STYLE ASSESSMENT:\nTest Student demonstrates a strong preference for visual learning.\n\nCOGNITIVE STRENGTHS:\n- Excellent spatial reasoning abilities\n- Strong pattern recognition skills\n\nCHALLENGES:\n- Difficulty with lengthy verbal instructions\n\nRECOMMENDATIONS:\n1. Use visual aids and diagrams\n2. Provide hands-on activities",
    "fileName": "test_student_utl.txt"
  }'
```

## 5. Get UTL Reports
```bash
curl -X GET "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true"
```

## 6. Create Teacher
```bash
curl -X POST "$ALS_API_BASE_URL/teachers" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d '{
    "name": "Test Teacher",
    "alsTeacherId": "ALS-TCH-TEST-001",
    "email": "teacher@test.com"
  }'
```

## 7. Update Student
```bash
curl -X PATCH "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d '{
    "age": 11,
    "parentName": "Updated Parent Name"
  }'
```

## PowerShell Version

### Setup Variables
```powershell
$env:ALS_API_BASE_URL = "https://7bd4d14a1701.ngrok-free.app/api/v1"
$env:ALS_API_KEY = "your-api-key-here"
$env:ALS_STUDENT_ID = "ALS-STU-TEST-001"

$headers = @{
    "Content-Type" = "application/json"
    "x-api-key" = $env:ALS_API_KEY
    "ngrok-skip-browser-warning" = "true"
}
```

### 1. Create Student
```powershell
$body = @{
    name = "Test Student"
    alsStudentId = $env:ALS_STUDENT_ID
    age = 10
    parentName = "Test Parent"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$env:ALS_API_BASE_URL/students" -Method Post -Headers $headers -Body $body
```

### 2. Get Student
```powershell
Invoke-RestMethod -Uri "$env:ALS_API_BASE_URL/students/$env:ALS_STUDENT_ID" -Method Get -Headers $headers
```

### 3. Submit UTL Report
```powershell
$utlBody = @{
    content = "UNDERSTANDING THE LEARNER (UTL) ASSESSMENT`n`nStudent: Test Student`nAge: 10 years old`nGrade: 5th`n`nLEARNING STYLE ASSESSMENT:`nTest Student demonstrates a strong preference for visual learning."
    fileName = "test_student_utl.txt"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$env:ALS_API_BASE_URL/students/$env:ALS_STUDENT_ID/reports/utl" -Method Post -Headers $headers -Body $utlBody
```

### 4. Get UTL Reports
```powershell
Invoke-RestMethod -Uri "$env:ALS_API_BASE_URL/students/$env:ALS_STUDENT_ID/reports/utl" -Method Get -Headers $headers
```

