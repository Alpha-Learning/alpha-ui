# ALS API Endpoint Testing Script (PowerShell)
# Update these variables with your actual values
$ALS_API_BASE_URL = if ($env:ALS_API_BASE_URL) { $env:ALS_API_BASE_URL } else { "https://7bd4d14a1701.ngrok-free.app/api/v1" }
$API_KEY = if ($env:ALS_API_KEY) { $env:ALS_API_KEY } else { "your-api-key-here" }

# Test Student ID
$STUDENT_ID = "student_test_12345"
$ALS_STUDENT_ID = "ALS-STU-TEST-001"

Write-Host "========================================" -ForegroundColor Blue
Write-Host "ALS API Endpoint Testing" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue
Write-Host ""
Write-Host "Base URL: $ALS_API_BASE_URL"
Write-Host "API Key: $($API_KEY.Substring(0, [Math]::Min(10, $API_KEY.Length)))..."
Write-Host ""

# Headers
$headers = @{
    "Content-Type" = "application/json"
    "x-api-key" = $API_KEY
    "ngrok-skip-browser-warning" = "true"
}

# ============================================
# 1. CREATE STUDENT
# ============================================
Write-Host "1. Creating Student..." -ForegroundColor Yellow
Write-Host "POST $ALS_API_BASE_URL/students"
$createStudentBody = @{
    name = "Test Student"
    alsStudentId = $ALS_STUDENT_ID
    age = 10
    parentName = "Test Parent"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$ALS_API_BASE_URL/students" -Method Post -Headers $headers -Body $createStudentBody
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# ============================================
# 2. GET STUDENT BY ID
# ============================================
Write-Host "2. Getting Student by ID..." -ForegroundColor Yellow
Write-Host "GET $ALS_API_BASE_URL/students/$ALS_STUDENT_ID"
try {
    $response = Invoke-RestMethod -Uri "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID" -Method Get -Headers $headers
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# ============================================
# 3. LIST ALL STUDENTS
# ============================================
Write-Host "3. Listing All Students..." -ForegroundColor Yellow
Write-Host "GET $ALS_API_BASE_URL/students"
try {
    $response = Invoke-RestMethod -Uri "$ALS_API_BASE_URL/students" -Method Get -Headers $headers
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# ============================================
# 4. SUBMIT UTL REPORT
# ============================================
Write-Host "4. Submitting UTL Report..." -ForegroundColor Yellow
Write-Host "POST $ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl"

$UTL_CONTENT = @"
UNDERSTANDING THE LEARNER (UTL) ASSESSMENT

Student: Test Student
Age: 10 years old
Grade: 5th

LEARNING STYLE ASSESSMENT:
Test Student demonstrates a strong preference for visual learning. Responds well to diagrams, charts, and color-coded materials.

COGNITIVE STRENGTHS:
- Excellent spatial reasoning abilities
- Strong pattern recognition skills
- Good memory for visual information

CHALLENGES:
- Difficulty with lengthy verbal instructions
- Struggles with abstract concepts when not visualized

ATTENTION PROFILE:
Can maintain focus for approximately 20-25 minutes on engaging tasks.

EMOTIONAL CONSIDERATIONS:
- Sensitive to criticism; responds better to positive reinforcement
- Becomes anxious with timed tests

RECOMMENDATIONS:
1. Use visual aids and diagrams when explaining concepts
2. Provide hands-on activities for learning
3. Break complex tasks into smaller steps
"@

$utlBody = @{
    content = $UTL_CONTENT
    fileName = "test_student_utl_$(Get-Date -Format 'yyyyMMdd').txt"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl" -Method Post -Headers $headers -Body $utlBody
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# ============================================
# 5. GET UTL REPORTS
# ============================================
Write-Host "5. Getting UTL Reports..." -ForegroundColor Yellow
Write-Host "GET $ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl"
try {
    $response = Invoke-RestMethod -Uri "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl" -Method Get -Headers $headers
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# ============================================
# 6. CREATE TEACHER (Optional)
# ============================================
Write-Host "6. Creating Teacher (Optional)..." -ForegroundColor Yellow
Write-Host "POST $ALS_API_BASE_URL/teachers"
$createTeacherBody = @{
    name = "Test Teacher"
    alsTeacherId = "ALS-TCH-TEST-001"
    email = "teacher@test.com"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$ALS_API_BASE_URL/teachers" -Method Post -Headers $headers -Body $createTeacherBody
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# ============================================
# 7. UPDATE STUDENT (Optional)
# ============================================
Write-Host "7. Updating Student (Optional)..." -ForegroundColor Yellow
Write-Host "PATCH $ALS_API_BASE_URL/students/$ALS_STUDENT_ID"
$updateStudentBody = @{
    age = 11
    parentName = "Updated Parent Name"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID" -Method Patch -Headers $headers -Body $updateStudentBody
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "All endpoints tested!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

