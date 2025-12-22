#!/bin/bash

# ALS API Endpoint Testing Script
# Update these variables with your actual values
ALS_API_BASE_URL="${ALS_API_BASE_URL:-https://7bd4d14a1701.ngrok-free.app/api/v1}"
API_KEY="${ALS_API_KEY:-your-api-key-here}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}ALS API Endpoint Testing${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Base URL: $ALS_API_BASE_URL"
echo "API Key: ${API_KEY:0:10}..."
echo ""

# Test Student ID
STUDENT_ID="student_test_12345"
ALS_STUDENT_ID="ALS-STU-TEST-001"

# ============================================
# 1. CREATE STUDENT
# ============================================
echo -e "${YELLOW}1. Creating Student...${NC}"
echo "POST $ALS_API_BASE_URL/students"
curl -X POST "$ALS_API_BASE_URL/students" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d "{
    \"name\": \"Test Student\",
    \"alsStudentId\": \"$ALS_STUDENT_ID\",
    \"age\": 10,
    \"parentName\": \"Test Parent\"
  }" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "Response received"
echo ""
echo ""

# ============================================
# 2. GET STUDENT BY ID
# ============================================
echo -e "${YELLOW}2. Getting Student by ID...${NC}"
echo "GET $ALS_API_BASE_URL/students/$ALS_STUDENT_ID"
curl -X GET "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "Response received"
echo ""
echo ""

# ============================================
# 3. LIST ALL STUDENTS
# ============================================
echo -e "${YELLOW}3. Listing All Students...${NC}"
echo "GET $ALS_API_BASE_URL/students"
curl -X GET "$ALS_API_BASE_URL/students" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "Response received"
echo ""
echo ""

# ============================================
# 4. SUBMIT UTL REPORT
# ============================================
echo -e "${YELLOW}4. Submitting UTL Report...${NC}"
echo "POST $ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl"
UTL_CONTENT="UNDERSTANDING THE LEARNER (UTL) ASSESSMENT

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
3. Break complex tasks into smaller steps"

curl -X POST "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d "{
    \"content\": $(echo "$UTL_CONTENT" | jq -Rs .),
    \"fileName\": \"test_student_utl_$(date +%Y%m%d).txt\"
  }" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "Response received"
echo ""
echo ""

# ============================================
# 5. GET UTL REPORTS
# ============================================
echo -e "${YELLOW}5. Getting UTL Reports...${NC}"
echo "GET $ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl"
curl -X GET "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID/reports/utl" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "Response received"
echo ""
echo ""

# ============================================
# 6. CREATE TEACHER (Optional)
# ============================================
echo -e "${YELLOW}6. Creating Teacher (Optional)...${NC}"
echo "POST $ALS_API_BASE_URL/teachers"
curl -X POST "$ALS_API_BASE_URL/teachers" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d "{
    \"name\": \"Test Teacher\",
    \"alsTeacherId\": \"ALS-TCH-TEST-001\",
    \"email\": \"teacher@test.com\"
  }" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "Response received"
echo ""
echo ""

# ============================================
# 7. UPDATE STUDENT (Optional)
# ============================================
echo -e "${YELLOW}7. Updating Student (Optional)...${NC}"
echo "PATCH $ALS_API_BASE_URL/students/$ALS_STUDENT_ID"
curl -X PATCH "$ALS_API_BASE_URL/students/$ALS_STUDENT_ID" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "ngrok-skip-browser-warning: true" \
  -d "{
    \"age\": 11,
    \"parentName\": \"Updated Parent Name\"
  }" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "Response received"
echo ""
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}All endpoints tested!${NC}"
echo -e "${GREEN}========================================${NC}"

