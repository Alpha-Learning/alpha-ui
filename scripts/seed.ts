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
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
