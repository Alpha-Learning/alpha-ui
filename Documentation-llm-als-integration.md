Let me gather all the endpoint details to provide you with comprehensive request/response documentation.

[2 tools called]

Here is the **complete API Request/Response Documentation** for ALS Platform integration:

---

# Frank Jr. API - Complete Request/Response Reference

## Base URL
```
http://<frank-jr-host>:8000/api/v1
```

---

# 1. SESSION MANAGEMENT

## 1.1 Create Session

Creates a session and initializes the student's knowledge base.

| | |
|---|---|
| **Endpoint** | `POST /api/v1/sessions` |
| **Content-Type** | `application/json` |

### Request
```json
{
  "user_id": "student_12345",
  "metadata": {
    "source": "als_platform",
    "enrollment_date": "2024-01-15"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | string | **Yes** | Student identifier (used for all subsequent requests) |
| `metadata` | object | No | Additional key-value metadata |

### Response (201 Created)
```json
{
  "session": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": "student_12345",
    "created_at": "2024-12-20T10:30:00Z",
    "expires_at": "2024-12-21T10:30:00Z",
    "status": "active",
    "is_active": true,
    "remaining_ttl_seconds": 86400,
    "metadata": {
      "source": "als_platform",
      "enrollment_date": "2024-01-15"
    }
  },
  "message": "Session created successfully"
}
```

---

## 1.2 Get Session

| | |
|---|---|
| **Endpoint** | `GET /api/v1/sessions/{session_id}` |

### Response (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "student_12345",
  "created_at": "2024-12-20T10:30:00Z",
  "expires_at": "2024-12-21T10:30:00Z",
  "status": "active",
  "is_active": true,
  "remaining_ttl_seconds": 82800,
  "metadata": {}
}
```

---

## 1.3 Get User Sessions

| | |
|---|---|
| **Endpoint** | `GET /api/v1/sessions/user/{user_id}?active_only=true` |

### Response (200 OK)
```json
{
  "sessions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "user_id": "student_12345",
      "created_at": "2024-12-20T10:30:00Z",
      "expires_at": "2024-12-21T10:30:00Z",
      "status": "active",
      "is_active": true,
      "remaining_ttl_seconds": 82800,
      "metadata": {}
    }
  ],
  "total": 1
}
```

---

## 1.4 Extend Session

| | |
|---|---|
| **Endpoint** | `POST /api/v1/sessions/{session_id}/extend` |

### Request
```json
{
  "hours": 24
}
```

### Response (200 OK)
Same as Get Session response with updated `expires_at`.

---

## 1.5 Terminate Session

| | |
|---|---|
| **Endpoint** | `DELETE /api/v1/sessions/{session_id}` |

### Response (200 OK)
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Session terminated successfully"
}
```

---

# 2. DATA INGESTION

## 2.1 Submit Student Data (Unified Endpoint)

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/data` |
| **Content-Type** | `application/json` |

### Request Schema
```json
{
  "data_type": "utl | class_feedback | home_environment | parent_expectations | general",
  "content": "<raw text content - required, min 10 characters>",
  "source_id": "<optional identifier>",
  "timestamp": "<optional ISO 8601 timestamp>",
  "metadata": { "<optional key-value pairs>" }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data_type` | enum | **Yes** | One of: `utl`, `class_feedback`, `home_environment`, `parent_expectations`, `general` |
| `content` | string | **Yes** | Raw text content (min 10 chars) |
| `source_id` | string | No | Identifier from source system (e.g., form ID) |
| `timestamp` | datetime | No | When data was collected (ISO 8601) |
| `metadata` | object | No | Additional key-value metadata |

### Response (201 Created)
```json
{
  "student_id": "student_12345",
  "data_type": "utl",
  "data_id": "utl-a1b2c3d4e5f6",
  "status": "indexed",
  "message": "UTL Assessment data successfully indexed",
  "timestamp": "2024-12-20T10:35:00Z"
}
```

---

## 2.2 Example Requests by Data Type

### UTL Assessment Data
```json
{
  "data_type": "utl",
  "content": "=== UTL ASSESSMENT ===\nDate: 2024-12-15\nAssessor: Dr. Smith\n\n--- LEARNING STYLE OBSERVATION ---\nQuestion: What is the child's preferred learning style?\nAnswer: Kinesthetic and Visual. The child responds best to hands-on activities and visual diagrams. During the puzzle activity, showed strong focus and spatial reasoning.\n\nQuestion: How does the child approach new tasks?\nAnswer: Enthusiastic, jumps in immediately. Sometimes rushes without reading instructions fully.\n\n--- PERSONALITY TRAITS ---\nOpenness: High (4/5) - Very curious, asks many questions\nConscientiousness: Moderate (3/5) - Sometimes rushes through tasks\nExtraversion: High (4/5) - Social, enjoys group activities\nAgreeableness: Very High (5/5) - Helpful to peers, takes Supporter role\nEmotional Stability: Good (4/5) - Generally calm, handles frustration well\n\n--- SUBJECT LEVELS ---\nMathematics: Year 4 equivalent (strong in operations, developing in fractions)\nEnglish: Year 3 equivalent (good reading, developing writing)\nScience: Year 4 equivalent (curious, asks good questions)\n\n--- META-LEARNING PILLARS ---\nSelf-Regulation: 4/5 - Good focus on engaging tasks\nMetacognition: 3/5 - Developing awareness of strategies\nMotivation: 5/5 - Very enthusiastic\nGoal-Setting: 2/5 - Needs support with planning\nTime Management: 2/5 - Tends to rush\n\n--- SKILLMATRIX ---\nCritical Thinking: 4/5\nProblem Solving: 4/5\nCreativity: 5/5\nCollaboration: 4/5\nCommunication: 4/5\n\n--- ASSESSOR NOTES ---\nAhmed is a kinesthetic learner who thrives in Zone A (Building) and Zone B (Creative) activities. Strong Supporter peer role observed during group puzzle activity. Primary development focus should be Goal-Setting and Time Management pillars. Recommend Meta Labs: Goal Setting Workshop, Bridge Building Challenge.",
  "source_id": "utl_2024_form_001",
  "timestamp": "2024-12-15T09:00:00Z",
  "metadata": {
    "assessor_id": "examiner_001",
    "key_stage": "KS1"
  }
}
```

### Class Feedback
```json
{
  "data_type": "class_feedback",
  "content": "=== CLASS SESSION FEEDBACK ===\nClass ID: MATH-2024-12-20-001\nDate: 2024-12-20\nTime: 09:00 - 09:45\nSubject: Mathematics\nTopic: Fractions - Comparing and Ordering\nTeacher: Ms. Johnson\n\n--- ACTIVITY DETAILS ---\nType: Zone A hands-on activity\nMeta Lab: Fraction Pizza Project\nTools Used: Fraction manipulatives, pizza cutouts, worksheets\n\n--- LEARNING OUTCOMES ---\nExpected: Student should be able to compare and order simple fractions (1/2, 1/3, 1/4)\nActual: Successfully compared fractions using manipulatives. Struggled with equivalent fractions but showed interest in understanding.\n\n--- STUDENT STATE ---\nEmotional State: 4/5 (Positive - engaged and happy)\nEngagement Level: 5/5 (Highly engaged throughout)\nParticipation: 5/5 (Very active, asked questions)\n\n--- BEHAVIORAL OBSERVATIONS ---\nAhmed showed excellent focus during the hands-on portion (25 minutes sustained attention). When given the worksheet portion, engagement dropped slightly but recovered when allowed to use manipulatives. Demonstrated Supporter peer role - helped classmate understand halves. No behavioral concerns.\n\n--- COLLABORATION ---\nWorked with: student_456, student_789\nCollaboration Quality: 4/5 (Good teamwork, shared materials)\n\n--- TEACHER RECOMMENDATIONS ---\n1. Continue using Zone A manipulatives for abstract concepts\n2. Introduce equivalent fractions using folding paper activity\n3. Assign as peer buddy for collaborative activities\n4. Consider Bridge Building Meta Lab to develop Goal-Setting pillar",
  "source_id": "class_feedback_20241220_001"
}
```

### Home Environment
```json
{
  "data_type": "home_environment",
  "content": "=== HOME ENVIRONMENT ASSESSMENT ===\nDate: 2024-12-10\nCompleted by: Parent (Mother)\n\n--- FAMILY STRUCTURE ---\nFamily Type: Two-parent household\nNumber of Siblings: 2\nBirth Order: Middle child (older sister age 10, younger brother age 4)\n\n--- HOME LEARNING ENVIRONMENT ---\nDedicated Study Space: Yes - shared bedroom with desk\nTechnology Access: Full (own tablet, shared laptop)\nInternet Access: Stable broadband\nQuiet Study Time: Limited in evenings due to younger sibling\n\n--- SUPPORT AVAILABLE ---\nOverall Support Level: High\nHomework Help: Yes - both parents assist\nExternal Tutoring: No\nParent Education Level: Both university graduates\n\n--- CHALLENGES ---\n1. Busy household - difficult to find quiet time\n2. Younger sibling often interrupts study time\n3. Sometimes rushes through homework to go play\n4. Limited weekend study time due to extracurriculars\n\n--- EXTRACURRICULAR ACTIVITIES ---\n1. Football club (Tuesdays and Thursdays)\n2. Art classes (Saturday mornings)\n3. Family mosque attendance (Fridays)\n\n--- LANGUAGES ---\nHome Language: Arabic (primary)\nAdditional Languages: English (fluent, used at school)\n\n--- ADDITIONAL NOTES ---\nParents are very engaged and supportive. Father helps with mathematics, mother with reading. Family values education highly. Child has access to books and educational apps at home. Best study time is early morning before younger sibling wakes.",
  "source_id": "home_env_2024_001"
}
```

### Parent Expectations
```json
{
  "data_type": "parent_expectations",
  "content": "=== PARENT EXPECTATIONS QUESTIONNAIRE ===\nDate: 2024-12-10\nCompleted by: Both parents (joint response)\n\n--- ACADEMIC GOALS ---\n1. Achieve Grade A in Mathematics by end of year\n2. Improve reading comprehension to Year 4 level\n3. Develop confident public speaking skills\n4. Build strong foundation in Science for future engineering interest\n\nTarget Grades:\n- Mathematics: A\n- English: A\n- Science: B+\n\n--- BEHAVIORAL GOALS ---\n1. Better time management during homework\n2. More independent study habits\n3. Less rushing through tasks\n4. Improved focus during reading activities\n5. Develop goal-setting skills\n\n--- CAREER ASPIRATIONS ---\nParent hopes: Engineering or Technology field\nChild's current interest: Building things, robots, space\n\n--- CONCERNS ---\n1. Sometimes rushes through homework to play\n2. Needs to improve focus during reading-based activities\n3. Would like more challenge in mathematics\n4. Worry about younger sibling distracting from study\n\n--- EDUCATIONAL PRIORITIES (Ranked) ---\n1. Academic excellence and curiosity\n2. Social skills and collaboration\n3. Physical health and activity balance\n4. Creative expression\n5. Emotional wellbeing\n\n--- COMMUNICATION PREFERENCES ---\nPreferred Method: Email (primary), WhatsApp for urgent\nFrequency: Weekly updates preferred\nMeeting Availability: Weekday evenings or Saturday morning\n\n--- INVOLVEMENT LEVEL ---\nLevel: High\nWilling to:\n- Support home learning activities\n- Attend parent workshops\n- Implement recommended strategies at home\n- Communicate regularly with Academic Guides\n\n--- SPECIAL REQUESTS ---\n1. Extra mathematics enrichment materials\n2. Guidance on developing goal-setting at home\n3. Reading list recommendations\n4. Updates on peer social development",
  "source_id": "parent_exp_2024_001"
}
```

---

## 2.3 Batch Data Submission

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/data/batch` |

### Request
```json
{
  "items": [
    {
      "data_type": "utl",
      "content": "Question: Learning style?\nAnswer: Visual and kinesthetic..."
    },
    {
      "data_type": "home_environment",
      "content": "Family Structure: Two-parent household..."
    },
    {
      "data_type": "parent_expectations",
      "content": "Academic Goals: Improve mathematics..."
    }
  ]
}
```

### Response (201 Created)
```json
{
  "student_id": "student_12345",
  "processed": [
    {
      "student_id": "student_12345",
      "data_type": "utl",
      "data_id": "utl-a1b2c3d4e5f6",
      "status": "indexed",
      "message": "UTL Assessment data successfully indexed",
      "timestamp": "2024-12-20T10:35:00Z"
    },
    {
      "student_id": "student_12345",
      "data_type": "home_environment",
      "data_id": "home_environment-g7h8i9j0k1l2",
      "status": "indexed",
      "message": "Home Environment data successfully indexed",
      "timestamp": "2024-12-20T10:35:01Z"
    },
    {
      "student_id": "student_12345",
      "data_type": "parent_expectations",
      "data_id": "parent_expectations-m3n4o5p6q7r8",
      "status": "indexed",
      "message": "Parent Expectations data successfully indexed",
      "timestamp": "2024-12-20T10:35:02Z"
    }
  ],
  "errors": null
}
```

---

# 3. REPORT GENERATION

## 3.1 UTL Analysis Report

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/reports/utl-analysis` |

### Request
```json
{
  "include_recommendations": true,
  "detail_level": "full"
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `include_recommendations` | boolean | `true` | Include Meta Labs recommendations |
| `detail_level` | string | `"full"` | Options: `"summary"`, `"standard"`, `"full"` |

### Response (200 OK)
```json
{
  "student_id": "student_12345",
  "report_id": "utl-analysis-abc123def456",
  "generated_at": "2024-12-20T11:00:00Z",
  
  "primary_learner_type": "kinesthetic",
  "learner_type_breakdown": {
    "visual": 30.0,
    "auditory": 15.0,
    "kinesthetic": 40.0,
    "reading_writing": 15.0
  },
  "learner_type_insights": "Ahmed is primarily a kinesthetic learner who thrives in hands-on, experiential learning environments. He benefits most from Zone A (Building & Engineering) and Zone B (Creative) activities. When teaching new concepts, use manipulatives and physical activities before transitioning to written work. Visual supports are secondary but effective.",
  
  "personality_traits": [
    {
      "trait_name": "Openness",
      "score": 80.0,
      "interpretation": "High openness indicates strong curiosity and creativity. Ahmed embraces new learning experiences readily.",
      "implications": [
        "Will respond well to diverse learning activities",
        "May benefit from enrichment opportunities",
        "Enjoys creative problem-solving"
      ]
    },
    {
      "trait_name": "Agreeableness",
      "score": 95.0,
      "interpretation": "Very high agreeableness suggests excellent collaboration potential and natural empathy.",
      "implications": [
        "Natural Supporter peer role tendency",
        "Effective peer buddy for collaborative activities",
        "May need encouragement to assert own ideas in group settings"
      ]
    },
    {
      "trait_name": "Conscientiousness",
      "score": 60.0,
      "interpretation": "Moderate conscientiousness - sometimes rushes through tasks but can focus well on engaging activities.",
      "implications": [
        "Benefits from visual timers and task chunking",
        "Needs support with time management",
        "Quality improves with engaging, hands-on tasks"
      ]
    }
  ],
  "personality_summary": "Ahmed displays a curious, agreeable personality with strong collaborative tendencies. His peer dynamics tendency is Supporter. He is enthusiastic and socially adept but may benefit from scaffolding around time management and task completion.",
  
  "subject_levels": [
    {
      "subject": "Mathematics",
      "current_level": 4,
      "recommended_level": 4,
      "gap_analysis": "Minor - On track for Year 4 curriculum. Strong in operations.",
      "focus_areas": ["Equivalent fractions", "Word problems", "Time telling"]
    },
    {
      "subject": "English",
      "current_level": 3,
      "recommended_level": 4,
      "gap_analysis": "Minor - Reading age-appropriate, writing developing.",
      "focus_areas": ["Extended writing", "Inferential comprehension", "Vocabulary expansion"]
    },
    {
      "subject": "Science",
      "current_level": 4,
      "recommended_level": 4,
      "gap_analysis": "On target. Strong curiosity and questioning skills.",
      "focus_areas": ["Scientific method", "Recording observations", "Hypothesis formation"]
    }
  ],
  
  "meta_learning_review": {
    "self_regulation": {
      "score": 4.0,
      "analysis": "Good self-regulation. Maintains focus well during engaging activities. Can manage impulses appropriately for age."
    },
    "metacognition": {
      "score": 3.0,
      "analysis": "Developing metacognition. Beginning to reflect on learning strategies but needs explicit instruction."
    },
    "motivation": {
      "score": 5.0,
      "analysis": "Excellent intrinsic motivation. Shows genuine enthusiasm for learning, especially hands-on activities."
    },
    "goal_setting": {
      "score": 2.0,
      "analysis": "Emerging goal-setting skills. Can identify wishes but needs support structuring SMART goals. Priority development area."
    },
    "time_management": {
      "score": 2.0,
      "analysis": "Developing time management. Tends to rush through tasks. Would benefit from visual timers and task chunking."
    }
  },
  "meta_learning_summary": "Average Meta Pillar score: 3.2 (Competent). Pillar imbalance detected: Motivation (5.0) is significantly higher than Goal-Setting (2.0) and Time Management (2.0). Priority development areas: Goal-Setting and Time Management.",
  
  "skillmatrix_analysis": [
    {
      "skill_category": "Cognitive",
      "current_level": 4,
      "target_level": 5,
      "development_suggestions": [
        "Logic puzzles in Zone D",
        "Pattern recognition activities",
        "Bridge Building Meta Lab"
      ]
    },
    {
      "skill_category": "Creative",
      "current_level": 5,
      "target_level": 5,
      "development_suggestions": [
        "Maintain through Zone B activities",
        "Planet Design Meta Lab",
        "Open-ended art projects"
      ]
    },
    {
      "skill_category": "Social",
      "current_level": 4,
      "target_level": 5,
      "development_suggestions": [
        "Team Engineering Challenge",
        "Assign as peer buddy",
        "Group presentation opportunities"
      ]
    },
    {
      "skill_category": "Emotional",
      "current_level": 4,
      "target_level": 5,
      "development_suggestions": [
        "Zone C regulation activities",
        "Emotional vocabulary building",
        "Reflection journals"
      ]
    }
  ],
  
  "recommended_meta_labs": [
    {
      "challenge_name": "SMART Goal Setting Workshop",
      "difficulty_level": "beginner",
      "skills_addressed": ["goal_setting", "time_management", "metacognition"],
      "priority": 1,
      "rationale": "Addresses lowest Meta Pillar (Goal-Setting at 2.0). Uses hands-on activities aligned with kinesthetic learning style."
    },
    {
      "challenge_name": "Bridge Building Challenge",
      "difficulty_level": "intermediate",
      "skills_addressed": ["problem_solving", "metacognition", "goal_setting"],
      "priority": 2,
      "rationale": "Zone A activity perfect for kinesthetic learner. Develops metacognition through engineering reflection. Naturally incorporates goal-setting with project targets."
    },
    {
      "challenge_name": "Time Detective",
      "difficulty_level": "beginner",
      "skills_addressed": ["time_management", "self_regulation"],
      "priority": 3,
      "rationale": "Addresses Time Management pillar (2.0). Uses visual timers and gamification to engage kinesthetic learner."
    },
    {
      "challenge_name": "Fraction Pizza Business",
      "difficulty_level": "intermediate",
      "skills_addressed": ["mathematics", "goal_setting", "collaboration"],
      "priority": 4,
      "rationale": "Aligns with parent goal for mathematics excellence. Hands-on Zone A activity. Incorporates goal-setting through business targets."
    }
  ],
  
  "strengths": [
    "Strong kinesthetic learner - thrives in hands-on activities",
    "Excellent intrinsic motivation (5/5 Meta Pillar)",
    "Natural Supporter peer role - helps classmates",
    "High creativity (5/5 SkillMatrix)",
    "Strong problem-solving abilities"
  ],
  
  "areas_for_development": [
    "Goal-Setting skills (2/5) - priority development area",
    "Time Management (2/5) - tends to rush through tasks",
    "Metacognition (3/5) - developing awareness of strategies",
    "Equivalent fractions in mathematics",
    "Extended writing skills in English"
  ],
  
  "overall_summary": "Ahmed is a Strong Fit for the Alpha Academy model (UTL Score Interpretation: KS1 Range 41-55). He is a kinesthetic learner with exceptional motivation (5/5) and creativity. His Supporter peer role tendency makes him valuable in collaborative activities. Priority development focus should be Goal-Setting (2/5) and Time Management (2/5) Meta Pillars. Zone A and Zone B activities will maximize engagement. Recommend immediate enrollment in SMART Goal Setting Workshop Meta Lab. Parent goals for mathematics excellence can be addressed through hands-on projects like Fraction Pizza Business.",
  
  "immediate_actions": [
    "Enroll in SMART Goal Setting Workshop Meta Lab within first week",
    "Provide visual timer for all independent work sessions",
    "Assign as peer buddy for collaborative mathematics activities",
    "Schedule Zone A activities for abstract mathematics concepts"
  ]
}
```

---

## 3.2 Learning Pathway Report

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/reports/learning-pathway` |

### Request
```json
{
  "pathway_duration": "year_1",
  "include_projects": true,
  "align_with_parent_expectations": true
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pathway_duration` | string | `"year_1"` | Options: `"term"`, `"semester"`, `"year_1"` |
| `include_projects` | boolean | `true` | Include project recommendations |
| `align_with_parent_expectations` | boolean | `true` | Consider parent goals |

### Response (200 OK)
```json
{
  "student_id": "student_12345",
  "report_id": "pathway-xyz789abc123",
  "generated_at": "2024-12-20T11:15:00Z",
  
  "pathway_duration": "year_1",
  "pathway_summary": "This personalized learning pathway for Ahmed focuses on developing Goal-Setting and Time Management Meta Pillars while leveraging his kinesthetic learning style. The pathway prioritizes Zone A (Building) and Zone B (Creative) activities, aligns with parent expectations for mathematics excellence, and incorporates Meta Labs to address identified development areas.",
  
  "timetable_recommendations": [
    {
      "day": "Monday",
      "start_time": "08:30",
      "end_time": "09:15",
      "subject": "Mathematics",
      "activity_type": "AI-led Curriculum",
      "notes": "Fractions module - follow with Zone A manipulatives"
    },
    {
      "day": "Monday",
      "start_time": "09:20",
      "end_time": "10:05",
      "subject": "Mathematics",
      "activity_type": "Zone Activity",
      "notes": "Zone A: Fraction manipulatives hands-on practice"
    },
    {
      "day": "Monday",
      "start_time": "10:05",
      "end_time": "10:20",
      "subject": "Break",
      "activity_type": "Sensory Break",
      "notes": "Zone C regulation time - movement break"
    },
    {
      "day": "Monday",
      "start_time": "10:20",
      "end_time": "11:05",
      "subject": "English",
      "activity_type": "AI-led Curriculum",
      "notes": "Reading comprehension - pair with kinesthetic activity"
    }
  ],
  
  "project_sequence": [
    {
      "project_name": "SMART Goal Tracker",
      "subject_area": "Meta-Learning",
      "duration": "Ongoing (Term 1)",
      "skills_developed": ["goal_setting", "time_management", "self_regulation"],
      "prerequisites": ["SMART Goal Setting Workshop"],
      "sequence_order": 1,
      "description": "Physical goal tracking board with movable markers. Student sets weekly goals and tracks progress. Kinesthetic approach to developing Goal-Setting pillar."
    },
    {
      "project_name": "Fraction Pizza Business",
      "subject_area": "Mathematics",
      "duration": "3 weeks",
      "skills_developed": ["fractions", "problem_solving", "goal_setting", "entrepreneurship"],
      "prerequisites": ["Basic fraction understanding"],
      "sequence_order": 2,
      "description": "Zone A hands-on project running a pizza shop with fraction-based orders. Includes goal-setting component for daily sales targets. Addresses parent goal for mathematics excellence."
    },
    {
      "project_name": "Bridge Building Challenge",
      "subject_area": "STEM",
      "duration": "2 weeks",
      "skills_developed": ["engineering", "measurement", "metacognition", "problem_solving"],
      "prerequisites": ["Fraction Pizza completion"],
      "sequence_order": 3,
      "description": "Zone A engineering project with explicit reflection on problem-solving strategies. Develops metacognition through 'thinking about thinking' journals."
    }
  ],
  
  "milestone_targets": [
    {
      "milestone_name": "Goal-Setting Competency",
      "target_date": "2025-03-15",
      "subjects_covered": ["Meta Pillar: Goal-Setting"],
      "success_criteria": [
        "Can create SMART goals independently",
        "Meta Pillar score improves to 3.0+",
        "Consistently uses goal tracker without prompting"
      ],
      "current_progress": 40.0
    },
    {
      "milestone_name": "Year 4 Mathematics Mastery",
      "target_date": "2025-06-30",
      "subjects_covered": ["Mathematics"],
      "success_criteria": [
        "Masters equivalent fractions",
        "Demonstrates Year 4 problem-solving",
        "Achieves A grade on term assessment"
      ],
      "current_progress": 65.0
    }
  ],
  
  "term_breakdown": [
    {
      "term_name": "Term 1",
      "start_date": "2025-01-06",
      "end_date": "2025-03-28",
      "focus_subjects": ["Mathematics", "Meta-Learning"],
      "goals": [
        "Establish Goal-Setting habits (target: 3.0 pillar score)",
        "Master equivalent fractions",
        "Develop time management strategies",
        "Complete SMART Goal Tracker setup"
      ],
      "projects": ["SMART Goal Tracker", "Fraction Pizza Business"],
      "assessments": ["UTL Reassessment at Term End"]
    },
    {
      "term_name": "Term 2",
      "start_date": "2025-04-14",
      "end_date": "2025-07-18",
      "focus_subjects": ["STEM", "English"],
      "goals": [
        "Build metacognition through engineering projects",
        "Improve extended writing skills",
        "Consolidate time management (target: 3.0 pillar score)"
      ],
      "projects": ["Bridge Building Challenge", "Story Writing Portfolio"],
      "assessments": ["STEM Portfolio Review", "Writing Assessment"]
    }
  ],
  
  "parent_expectation_alignment": "This pathway directly addresses parent goals for mathematics excellence through focused fraction development and hands-on Zone A projects. The Time Management development aligns with parent concern about rushing homework. Weekly progress reports will be provided as requested. Pathway includes public speaking opportunities requested by parents.",
  
  "home_environment_considerations": "Given the busy household with younger sibling, independent homework is scheduled for early morning when home is quieter. Parent-supported activities limited to weekends when both parents available. Visual timer recommended for home study to develop Time Management pillar.",
  
  "learner_type_adaptations": "All core concepts introduced through kinesthetic Zone A/B activities before transitioning to written work. Reading activities paired with movement-based comprehension. Visual supports used as secondary learning tool. Zone D (Reading/Logic) time balanced with preferred zones.",
  
  "recommended_resources": [
    "Visual timer for home and school",
    "SMART goal template posters for bedroom",
    "Fraction manipulative set for home practice",
    "Goal tracking sticker chart"
  ],
  
  "support_strategies": [
    "Break independent work into 15-minute chunks with movement breaks",
    "Use visual goal trackers in Zone C",
    "Pair abstract concepts with physical models before written work",
    "Assign as peer buddy to leverage Supporter tendency",
    "Schedule Zone C regulation time before reading activities"
  ]
}
```

---

## 3.3 Daily Summary Report

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/reports/daily-summary` |

### Request
```json
{
  "summary_date": "2024-12-20"
}
```

### Response (200 OK)
```json
{
  "student_id": "student_12345",
  "report_id": "daily-summary-def456ghi789",
  "summary_date": "2024-12-20",
  "generated_at": "2024-12-20T15:30:00Z",
  
  "classes_attended": [
    {
      "class_id": "MATH-2024-12-20-001",
      "subject": "Mathematics",
      "timestamp": "2024-12-20T09:00:00Z",
      "engagement_level": 5,
      "emotional_state": 4,
      "outcome_achieved": true,
      "key_observations": [
        "High engagement with fraction manipulatives (Zone A)",
        "Demonstrated Supporter role - helped peer understand halves",
        "Struggled briefly with equivalent fractions",
        "Strong focus maintained for 25 minutes"
      ]
    },
    {
      "class_id": "ENG-2024-12-20-001",
      "subject": "English",
      "timestamp": "2024-12-20T10:30:00Z",
      "engagement_level": 3,
      "emotional_state": 3,
      "outcome_achieved": true,
      "key_observations": [
        "Lower engagement during reading portion (expected for kinesthetic learner)",
        "Improved when activity moved to creative writing with illustration",
        "Rushing observed during written portion"
      ]
    }
  ],
  
  "average_emotional_state": 3.5,
  "emotional_trend": "stable",
  "emotional_notes": "Consistent emotional state throughout the day. Higher emotional engagement during hands-on activities aligns with kinesthetic learning profile. No Zone C intervention needed today.",
  
  "average_engagement": 4.0,
  "engagement_highlights": [
    "Peak engagement during Zone A mathematics (5/5)",
    "Strong engagement during creative writing with illustration (4/5)",
    "Lower engagement during pure reading activities (3/5) - expected for kinesthetic learner"
  ],
  
  "achievements": [
    "Successfully compared fractions using manipulatives",
    "Demonstrated Supporter peer role - helped struggling classmate",
    "Completed creative writing with detailed illustration",
    "Maintained focus for 25 minutes during engaging activity"
  ],
  
  "concerns": [
    "Rushed through reading comprehension exercise (Time Management development area)",
    "Lower engagement during reading activities - VARK adaptation needed"
  ],
  
  "overall_day_summary": "Ahmed had a productive day with strong engagement in hands-on activities. His kinesthetic learning preference was evident with 5/5 engagement in Zone A mathematics versus 3/5 in reading activities. His Supporter peer role emerged naturally during mathematics. Time Management development area showed as rushing during written work. Overall a positive day with Meta Pillar development opportunities identified.",
  
  "recommendations_for_tomorrow": [
    "Pair morning reading with movement-based comprehension activity",
    "Provide visual timer for independent work periods",
    "Continue Zone A fraction work to reinforce equivalent fractions",
    "Schedule Zone C sensory break before afternoon reading session",
    "Prompt goal-setting at start of each activity"
  ]
}
```

---

## 3.4 Class Report

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/reports/class-report` |

### Request
```json
{
  "class_id": "MATH-2024-12-20-001"
}
```

### Response (200 OK)
```json
{
  "student_id": "student_12345",
  "report_id": "class-report-jkl012mno345",
  "class_id": "MATH-2024-12-20-001",
  "generated_at": "2024-12-20T12:00:00Z",
  
  "subject": "Mathematics",
  "topic": "Fractions - Comparing and Ordering",
  "class_timestamp": "2024-12-20T09:00:00Z",
  "activity_type": "Zone Activity",
  
  "project_details": {
    "name": "Fraction Pizza Project",
    "tools": ["Fraction manipulatives", "Pizza cutouts", "Worksheets"],
    "expected_outcome": "Compare and order simple fractions (1/2, 1/3, 1/4)",
    "actual_outcome": "Successfully compared fractions. Struggled with equivalent fractions but showed interest."
  },
  
  "expected_vs_actual": "Ahmed achieved the primary learning objective of comparing fractions using manipulatives. The equivalent fractions gap represents a development opportunity rather than failure. This is age-appropriate and aligns with his developing Metacognition pillar. Zone A approach was optimal for his kinesthetic learning style.",
  "outcome_achieved": true,
  "performance_rating": 4,
  
  "engagement_level": 5,
  "engagement_analysis": "Maximum engagement (5/5) observed throughout the hands-on portion. This aligns perfectly with Ahmed's kinesthetic learning profile (40% kinesthetic preference). Zone A manipulatives approach was optimal. Engagement dipped slightly during worksheet portion - recommend minimizing written work.",
  
  "emotional_state": 4,
  "emotional_analysis": "Positive emotional state (4/5) indicates comfort and enjoyment. Self-Regulation pillar (4/5) demonstrated through sustained focus and smooth transitions. No Zone C intervention needed.",
  
  "behavioral_observations": "Ahmed demonstrated his natural Supporter peer role by helping a classmate understand halves. Very focused throughout Zone A activities (25 minutes sustained attention - excellent for his age). No behavioral concerns. Positive collaboration observed during group portion (4/5 quality).",
  
  "skills_demonstrated": [
    "Fraction comparison (Cognitive SkillMatrix)",
    "Collaborative problem-solving (Social SkillMatrix)",
    "Helping peers - Supporter role (Emotional SkillMatrix)",
    "Sustained focus on engaging task (Self-Regulation Meta Pillar)"
  ],
  
  "areas_of_difficulty": [
    "Equivalent fractions concept - development opportunity for next session",
    "Slight rushing during worksheet portion - Time Management pillar focus"
  ],
  
  "follow_up_actions": [
    "Introduce equivalent fractions using paper folding activity (Zone A)",
    "Assign fraction comparison game on tablet for home reinforcement",
    "Note Supporter role tendency for future peer groupings",
    "Include visual timer for worksheet portions"
  ],
  
  "teacher_recommendations": [
    "Continue Zone A approach for all fraction concepts",
    "Pair Ahmed with peers needing support in collaborative activities",
    "Introduce equivalent fractions through hands-on folding before abstract",
    "Limit worksheet time - convert to kinesthetic activities where possible"
  ]
}
```

---

## 3.5 Alerts Report

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/reports/alerts` |

### Request
```json
{
  "min_severity": "low",
  "categories": null
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min_severity` | enum | `"low"` | Options: `"low"`, `"medium"`, `"high"`, `"critical"` |
| `categories` | array | `null` | Filter by categories (null = all) |

### Response (200 OK)
```json
{
  "student_id": "student_12345",
  "report_id": "alerts-pqr678stu901",
  "generated_at": "2024-12-20T12:30:00Z",
  
  "alerts": [
    {
      "alert_id": "alert-001",
      "category": "progress",
      "severity": "medium",
      "title": "Goal-Setting Meta Pillar Below Target",
      "description": "Ahmed's Goal-Setting Meta Pillar score (2.0/5) is below the competent threshold of 3.0. This represents a development opportunity. Targeted intervention through Meta Labs is recommended.",
      "evidence": [
        "UTL Meta Pillar assessment: Goal-Setting = 2.0",
        "Parent feedback notes rushing through homework without planning",
        "Limited independent goal planning observed in class",
        "Assessor notes: 'Can identify wishes but struggles with SMART goals'"
      ],
      "recommended_actions": [
        "Enroll in SMART Goal Setting Workshop Meta Lab (Priority 1)",
        "Implement physical SMART Goal Tracker with movable markers",
        "Academic Guide to prompt goal-setting at start of each activity",
        "Parent communication: Share goal-setting strategies for home"
      ],
      "detected_at": "2024-12-20T12:30:00Z"
    },
    {
      "alert_id": "alert-002",
      "category": "progress",
      "severity": "medium",
      "title": "Time Management Meta Pillar Below Target",
      "description": "Ahmed's Time Management Meta Pillar score (2.0/5) indicates a development need. Evidence of rushing through tasks observed in class feedback.",
      "evidence": [
        "UTL Meta Pillar assessment: Time Management = 2.0",
        "Class feedback: 'Rushed through worksheet portion'",
        "Parent concern: 'Sometimes rushes through homework to play'",
        "Assessor notes: 'Tends to rush without reading instructions fully'"
      ],
      "recommended_actions": [
        "Provide visual timer for all independent work sessions",
        "Enroll in Time Detective Meta Lab",
        "Implement task chunking (15-minute focused periods)",
        "Zone C regulation breaks scheduled between activities"
      ],
      "detected_at": "2024-12-20T12:30:00Z"
    },
    {
      "alert_id": "alert-003",
      "category": "engagement",
      "severity": "low",
      "title": "Lower Engagement During Reading Activities",
      "description": "Consistent pattern of lower engagement (3/5) during pure reading activities. This aligns with kinesthetic learning preference and can be addressed through VARK-aligned adaptations.",
      "evidence": [
        "Class feedback: 3/5 engagement during reading vs 5/5 during hands-on",
        "UTL indicates kinesthetic primary learning style (40%)",
        "Improved engagement when reading paired with illustration"
      ],
      "recommended_actions": [
        "Pair reading activities with kinesthetic components",
        "Use audiobook options for longer reading passages",
        "Introduce movement-based comprehension activities",
        "Schedule Zone C sensory break before reading sessions"
      ],
      "detected_at": "2024-12-20T12:30:00Z"
    }
  ],
  
  "total_alerts": 3,
  "critical_count": 0,
  "high_count": 0,
  "medium_count": 2,
  "low_count": 1,
  
  "by_category": {
    "progress": 2,
    "engagement": 1,
    "academic": 0,
    "behavioral": 0,
    "emotional": 0,
    "social": 0
  },
  
  "overall_status": "monitoring",
  "priority_actions": [
    "Enroll in SMART Goal Setting Workshop Meta Lab within first week",
    "Provide visual timer for independent work immediately",
    "Implement VARK adaptations for reading activities"
  ],
  "summary": "Ahmed is on track with three development opportunities identified. Two medium-severity alerts relate to Goal-Setting and Time Management Meta Pillars (both at 2.0/5). One low-severity alert relates to reading engagement, which is expected for a kinesthetic learner. All alerts are framed as development opportunities with actionable interventions. No critical or high-severity concerns. Overall status: Monitoring with targeted support."
}
```

---

# 4. FREE-FORM QUERY

| | |
|---|---|
| **Endpoint** | `POST /api/v1/students/{student_id}/query` |

### Request
```json
{
  "question": "What are the best strategies to help this student improve goal-setting skills based on their learning style?",
  "context": "We want to implement changes at home as well as in school",
  "include_sources": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | **Yes** | Question about the student (5-2000 chars) |
| `context` | string | No | Additional context (max 5000 chars) |
| `include_sources` | boolean | `true` | Include data sources in response |

### Response (200 OK)
```json
{
  "student_id": "student_12345",
  "question": "What are the best strategies to help this student improve goal-setting skills based on their learning style?",
  "analysis": "Based on Ahmed's UTL profile, his Goal-Setting Meta Pillar score of 2.0/5 indicates emerging development in this area. As a kinesthetic learner (40% primary style), he will respond best to hands-on, physical approaches to goal-setting rather than abstract planning worksheets.\n\n**School Strategies (Zone-Based):**\n1. Use Zone A building projects with explicit goal-setting components - have Ahmed physically build a 'goal tower' where each block represents a step toward a larger goal\n2. Create a physical goal tracking board in Zone C that he can interact with daily - use movable markers and tactile elements\n3. Pair goal-setting lessons with movement - walk through the steps of a goal while physically moving through stations\n4. SMART Goal Setting Workshop Meta Lab - priority enrollment recommended\n\n**Home Strategies:**\n1. Provide a visual goal chart with movable markers that Ahmed can physically adjust each day\n2. Break homework into small, achievable chunks with physical check-off boxes he can touch\n3. Use timer-based goal sprints (10 minutes of focused work) with movement breaks as rewards\n4. Early morning goal-setting when household is quiet (as noted in home environment data)\n\n**Parent Communication:**\nGiven parent expectations for improved time management and independent study habits, these goal-setting strategies directly support those objectives. The kinesthetic approach leverages Ahmed's natural learning preference while developing the Goal-Setting pillar that is currently his lowest meta-learning skill. Weekly progress sharing recommended as per parent communication preference.",
  "recommendations": [
    "Enroll in SMART Goal Setting Workshop Meta Lab (addresses lowest pillar)",
    "Provide physical goal tracking materials for home use (tactile approach)",
    "Schedule weekly goal review conversations with movement component",
    "Connect goal achievement to hands-on reward activities (Zone A/B time)",
    "Use timer-based goal sprints - Pomodoro technique adapted for age"
  ],
  "confidence": 0.92,
  "sources_used": [
    "utl_assessment",
    "parent_expectations",
    "home_environment",
    "class_feedback"
  ],
  "generated_at": "2024-12-20T13:00:00Z"
}
```

---

# 5. ERROR RESPONSES

All errors follow this format:

```json
{
  "detail": {
    "error_code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Error Codes Reference

| HTTP Status | Error Code | Cause |
|-------------|------------|-------|
| 400 | `VALIDATION_ERROR` | Invalid request data (missing fields, wrong types) |
| 404 | `SESSION_NOT_FOUND` | Session ID does not exist |
| 404 | `DATA_NOT_FOUND` | No student data found for reports |
| 410 | `SESSION_EXPIRED` | Session has expired (needs renewal) |
| 500 | `INGESTION_ERROR` | Failed to store data in knowledge base |
| 500 | `REPORT_ERROR` | Failed to generate AI report |
| 500 | `QUERY_ERROR` | Failed to process AI query |

### Example Error Responses

**400 Validation Error:**
```json
{
  "detail": {
    "error_code": "VALIDATION_ERROR",
    "message": "content: String should have at least 10 characters"
  }
}
```

**404 Not Found:**
```json
{
  "detail": {
    "error_code": "DATA_NOT_FOUND",
    "message": "No student data found",
    "details": {
      "student_id": "student_99999"
    }
  }
}
```

**410 Session Expired:**
```json
{
  "detail": {
    "error_code": "SESSION_EXPIRED",
    "message": "Session has expired",
    "details": {
      "session_id": "550e8400-e29b-41d4-a716-446655440000",
      "expired_at": "2024-12-19T10:30:00Z"
    }
  }
}
```

---

# Quick Reference Table

| Action | Method | Endpoint | Request Body |
|--------|--------|----------|--------------|
| Create Session | POST | `/sessions` | `{user_id, metadata?}` |
| Get Session | GET | `/sessions/{session_id}` | - |
| Get User Sessions | GET | `/sessions/user/{user_id}` | - |
| Extend Session | POST | `/sessions/{id}/extend` | `{hours}` |
| Terminate Session | DELETE | `/sessions/{session_id}` | - |
| Submit Data | POST | `/students/{id}/data` | `{data_type, content, ...}` |
| Batch Submit | POST | `/students/{id}/data/batch` | `{items: [...]}` |
| UTL Report | POST | `/students/{id}/reports/utl-analysis` | `{include_recommendations?, detail_level?}` |
| Pathway Report | POST | `/students/{id}/reports/learning-pathway` | `{pathway_duration?, ...}` |
| Daily Summary | POST | `/students/{id}/reports/daily-summary` | `{summary_date}` |
| Class Report | POST | `/students/{id}/reports/class-report` | `{class_id}` |
| Alerts Report | POST | `/students/{id}/reports/alerts` | `{min_severity?, categories?}` |
| Query | POST | `/students/{id}/query` | `{question, context?, include_sources?}` |