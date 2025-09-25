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

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin user:', admin.email)
  console.log('👤 Test user:', user.email)
  console.log('📝 Sample application:', application.id)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
