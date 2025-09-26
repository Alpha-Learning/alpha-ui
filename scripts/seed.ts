import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user only
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
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
