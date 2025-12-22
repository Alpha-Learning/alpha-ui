import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  console.log('🔍 Testing database connection...\n')
  
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('❌ DATABASE_URL is not set in .env file!')
    process.exit(1)
  }

  // Mask password in URL for display
  const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':****@')
  console.log('📋 DATABASE_URL:', maskedUrl)
  console.log('')

  try {
    console.log('⏳ Attempting to connect...')
    await prisma.$connect()
    console.log('✅ Connection successful!')
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('✅ Database query test passed!')
    
    // Check if database exists and has tables
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `
    
    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} table(s) in database`)
      console.log('   Tables:', tables.map(t => t.tablename).join(', '))
    } else {
      console.log('⚠️  Database is empty (no tables found)')
      console.log('💡 Run: pnpm db:push to create tables')
    }
    
  } catch (error: any) {
    console.error('❌ Connection failed!')
    console.error('')
    console.error('Error:', error.message)
    console.error('')
    console.error('🔧 Troubleshooting steps:')
    console.error('   1. Verify PostgreSQL is running:')
    console.error('      - Windows: Check Services (services.msc) for "postgresql"')
    console.error('      - Or run: pg_isready -h localhost -p 5433')
    console.error('')
    console.error('   2. Verify credentials in .env file:')
    console.error('      DATABASE_URL="postgresql://username:password@localhost:5433/dbname?schema=public"')
    console.error('')
    console.error('   3. Test connection manually:')
    console.error('      psql -h localhost -p 5433 -U postgres -d alsworkflow')
    console.error('')
    console.error('   4. If database doesn\'t exist, create it:')
    console.error('      createdb -h localhost -p 5433 -U postgres alsworkflow')
    console.error('')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

