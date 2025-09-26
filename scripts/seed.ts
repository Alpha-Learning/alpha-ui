import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
      phone: '+973 1234 5678',
      city: 'Manama'
    }
  })

  // Create test user
  const userPassword = await bcrypt.hash('password123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: userPassword,
      role: 'user',
      phone: '+973 9876 5432',
      city: 'Manama'
    }
  })

  // Create sample application
  const application = await prisma.application.create({
    data: {
      parentFullName: 'John Smith',
      parentEmail: 'john@example.com',
      parentPhone: '+973 1111 2222',
      relationToChild: 'Father',
      parentCity: 'Manama',
      parentEthnicity: 'Asian',
      childFullName: 'Sarah Smith',
      childDateOfBirth: new Date('2015-03-15'),
      childAge: 8,
      childGender: 'F',
      childEthnicity: 'Asian',
      childSchoolYear: '3rd Grade',
      childCurrentSchool: 'ABC Elementary',
      childSchoolType: 'Private',
      childDiagnosedNeeds: 'None',
      caregiverFullName: 'Mary Johnson',
      caregiverPhone: '+973 3333 4444',
      qExcitesMost: 'Learning new things and making friends',
      qNonTraditionalReason: 'Want to provide better opportunities',
      qBiggestHope: 'To see my child succeed and be happy',
      enjoysTech: 'Yes',
      enjoysHandsOn: 'Yes',
      consentContact: true,
      consentUpdates: true,
      consentBiometric: false,
      userId: user.id
    }
  })

  // Create sample user requests
  await prisma.userRequest.createMany({
    data: [
      {
        userId: user.id,
        type: 'Password Setup',
        description: 'Account security configuration',
        status: 'completed'
      },
      {
        userId: user.id,
        type: 'Profile Information',
        description: 'Personal details submission',
        status: 'completed'
      },
      {
        userId: user.id,
        type: 'Application Review Request',
        description: 'Application for student enrollment',
        status: 'submitted'
      }
    ]
  })

  // Create sample screening call data
  const screeningCall = await prisma.screeningCall.create({
    data: {
      applicationId: application.id,
      fullName: 'John Smith',
      childName: 'Sarah Smith',
      date: new Date('2024-01-15'),
      callerName: 'Emma Wilson',
      crmLeadTag: 'Hot',
      recordingPermission: 'Yes',
      introductionNotes: 'Parent was very engaged and asked detailed questions about the curriculum. Showed genuine interest in the innovative approach.',
      overviewNotes: 'Parent was excited about the personalized approach and asked about assessment methods. Very positive throughout the overview.',
      applicationReason: 'Looking for a more personalized learning experience for Sarah. Current school is too traditional and doesn\'t cater to individual learning styles.',
      currentSchoolIssues: 'Sarah is advanced in math but struggles with reading comprehension. The school doesn\'t provide differentiated instruction.',
      techResponseAtHome: 'Sarah loves using educational apps and tablets. She learns well through interactive content and visual learning.',
      parentWarmUpNotes: 'Parent is very tech-savvy and open to new learning methods. Concerned about traditional education not preparing children for future.',
      flexibleModelOpenness: 'Very open to flexible learning. Believes children learn better when they have control over their learning pace.',
      childFreeTime: 'Sarah enjoys reading, drawing, playing educational games, and building with LEGO blocks. Very creative and curious.',
      adaptiveTechComfort: 'Very comfortable with technology. Uses various educational apps and believes tech can enhance learning when used properly.',
      fitClarificationNotes: 'Excellent fit for our program. Parent values innovation and child is naturally curious and tech-comfortable.',
      generalNotes: 'This family shows strong potential. Parent is engaged, child is bright and adaptable. Good candidate for our program.',
      parentReactionsNotes: 'Parent was excited about the personalized approach and asked about assessment methods. Very positive throughout the call.',
      comprehensiveQuestionnaires: true,
      guidebookInfo: true,
      walkthroughDate: '2024-01-20 10:00',
      assessmentInvite: '2024-01-25 14:00',
      additionalNotes: 'Schedule follow-up call in one week to answer additional questions about curriculum details.',
      loggedToSystemDate: '2024-01-15 15:30',
      loggedBy: 'Emma Wilson'
    }
  })

  // Create additional sample applications with different statuses
  const application2 = await prisma.application.create({
    data: {
      parentFullName: 'Ahmed Al-Rashid',
      parentEmail: 'ahmed@example.com',
      parentPhone: '+973 5555 6666',
      relationToChild: 'Father',
      parentCity: 'Riffa',
      parentEthnicity: 'Arab',
      childFullName: 'Omar Al-Rashid',
      childDateOfBirth: new Date('2014-07-22'),
      childAge: 9,
      childGender: 'M',
      childEthnicity: 'Arab',
      childSchoolYear: '4th Grade',
      childCurrentSchool: 'International School of Bahrain',
      childSchoolType: 'International',
      childDiagnosedNeeds: 'Mild ADHD',
      caregiverFullName: 'Fatima Al-Rashid',
      caregiverPhone: '+973 7777 8888',
      qExcitesMost: 'STEM subjects and robotics',
      qNonTraditionalReason: 'Want more hands-on learning approach',
      qBiggestHope: 'To develop critical thinking skills',
      enjoysTech: 'Yes',
      enjoysHandsOn: 'Yes',
      consentContact: true,
      consentUpdates: true,
      consentBiometric: true,
      status: 'processing',
      userId: user.id
    }
  })

  const application3 = await prisma.application.create({
    data: {
      parentFullName: 'Priya Patel',
      parentEmail: 'priya@example.com',
      parentPhone: '+973 9999 0000',
      relationToChild: 'Mother',
      parentCity: 'Muharraq',
      parentEthnicity: 'Indian',
      childFullName: 'Arjun Patel',
      childDateOfBirth: new Date('2016-11-08'),
      childAge: 7,
      childGender: 'M',
      childEthnicity: 'Indian',
      childSchoolYear: '2nd Grade',
      childCurrentSchool: 'Bahrain School',
      childSchoolType: 'Public',
      childDiagnosedNeeds: 'None',
      caregiverFullName: 'Raj Patel',
      caregiverPhone: '+973 1111 3333',
      qExcitesMost: 'Art and creative activities',
      qNonTraditionalReason: 'Looking for more creative curriculum',
      qBiggestHope: 'To nurture artistic talents',
      enjoysTech: 'Moderate',
      enjoysHandsOn: 'Yes',
      consentContact: true,
      consentUpdates: true,
      consentBiometric: false,
      status: 'completed',
      isPaid: true,
      paymentAmount: 150,
      paidAt: new Date('2024-01-10'),
      userId: user.id
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin user:', admin.email)
  console.log('👤 Test user:', user.email)
  console.log('📝 Sample application:', application.id)
  console.log('📞 Sample screening call:', screeningCall.id)
  console.log('📝 Additional applications:', application2.id, application3.id)

  // Create sample Parent Guardian Questionnaire
  const parentGuardianQuestionnaire = await prisma.parentGuardianQuestionnaire.create({
    data: {
      applicationId: application.id,
      fullName: 'John Smith',
      childName: 'Sarah Smith',
      date: new Date('2024-01-20'),
      typicalWeekday: 'Sarah wakes up at 7 AM, has breakfast, goes to school from 8 AM to 3 PM, comes home, does homework, plays with toys, has dinner at 6 PM, and goes to bed at 8:30 PM.',
      screenTimeHours: 'Sarah uses screens for about 2-3 hours per day, mostly for educational games and watching educational videos. We limit recreational screen time.',
      homeActivities: 'Sarah enjoys reading books, drawing, playing with LEGO blocks, building puzzles, playing board games, and outdoor activities like cycling.',
      culturalBackground: 'We are a multicultural family with Middle Eastern and European heritage. We value education, respect for elders, and maintaining our cultural traditions while embracing new learning opportunities.',
      rulesDisciplineApproach: 'We use positive reinforcement and clear boundaries. We believe in explaining the reasons behind rules and encouraging independence while maintaining structure.',
      supportWhenStruggling: 'When Sarah struggles, we provide emotional support, break tasks into smaller steps, offer encouragement, and help her develop problem-solving skills rather than giving direct answers.',
      strengthsInterests: 'Sarah shows strong interest in mathematics, science experiments, art, and storytelling. She is naturally curious and asks thoughtful questions about how things work.',
      challengingAreas: 'Sarah sometimes finds reading comprehension challenging and can get frustrated with tasks that require sustained attention. She benefits from visual aids and hands-on learning.',
      learningApproach: 'Sarah learns best through visual and kinesthetic methods. She enjoys interactive activities, experiments, and learning through play. She needs movement breaks and variety in activities.',
      previousEducationalExperience: 'Sarah attended a traditional preschool and is currently in a conventional elementary school. She has experienced both structured learning and some Montessori-inspired activities at home.',
      covidLearningExperience: 'During COVID, Sarah adapted well to online learning initially, but missed social interaction with peers. We supplemented with educational apps and hands-on activities at home.',
      supportiveLearningEnvironment: 'A supportive learning environment includes a quiet space for focused work, access to various learning materials, encouragement to ask questions, and recognition of individual learning styles.',
      responseToFrustration: 'When frustrated, Sarah initially shows signs of withdrawal or tears, but with support, she learns to express her feelings and work through challenges step by step.',
      peerInteraction: 'Sarah is generally social and enjoys group activities. She can be shy initially but warms up quickly. She shows empathy towards others and enjoys collaborative projects.',
      emotionalBehavioralConcerns: 'Sarah sometimes experiences anxiety with new situations and can be perfectionistic. We are working on building her confidence and teaching her that mistakes are part of learning.',
      seekingHelp: 'Sarah is learning to ask for help when needed. She sometimes tries to solve problems independently first, which is good, but we encourage her to seek support when appropriate.',
      educationalHopesGoals: 'We hope Sarah develops critical thinking skills, creativity, confidence, and a love for learning. We want her to be prepared for future challenges while maintaining her natural curiosity.',
      creativityMovementEmotionalRole: 'We believe creativity, movement, and emotional development are essential. Children learn better when they can express themselves creatively, move their bodies, and understand their emotions.',
      parentingStyle: 'We practice authoritative parenting - setting clear expectations while being responsive to Sarah\'s needs. We encourage independence while providing guidance and support.',
      technologyConcerns: 'We are concerned about excessive screen time and the potential for technology to replace hands-on learning. We want technology to enhance rather than replace traditional learning methods.',
      applicationNumber: 'APP-2024-001',
      loggedToSystemDate: '2024-01-20',
      loggedBy: 'Emma Wilson'
    }
  })

  console.log('📋 Parent Guardian Questionnaire created:', parentGuardianQuestionnaire.id)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
