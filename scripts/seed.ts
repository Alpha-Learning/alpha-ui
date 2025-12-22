import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Test database connection first
  try {
    console.log('🔌 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
  } catch (error: any) {
    console.error('❌ Failed to connect to database!')
    console.error('💡 Make sure:')
    console.error('   1. PostgreSQL is running')
    console.error('   2. DATABASE_URL in .env is correct')
    console.error('   3. Database exists (run: pnpm db:push)')
    console.error('   4. Credentials are correct')
    console.error('\n📋 Current DATABASE_URL:', process.env.DATABASE_URL ? 'Set (hidden)' : 'NOT SET')
    throw error
  }

  // Create admin user only
  try {
    const adminPassword = await bcrypt.hash('password', 12)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@gmail.com' },
      update: {},
      create: {
        email: 'admin@gmail.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'admin',
        phone: '+973 1234 5678',
        city: 'Manama'
      }
    })

    console.log('✅ Database seeded successfully!')
    console.log('👤 Admin user:', admin.email)
    console.log('🔑 Password: password')
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('ℹ️  Admin user already exists, skipping...')
    } else {
      throw error
    }
  }
}

main()
  .catch((e) => {
    console.error('\n❌ Error seeding database:', e.message || e)
    if (e.code) {
      console.error('   Error code:', e.code)
    }
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
