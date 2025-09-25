#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up ALS Workflow Full-Stack Application...\n');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Please create a .env file with your database URL:');
  console.log('DATABASE_URL="postgresql://username:password@localhost:5432/als_workflow?schema=public"');
  console.log('JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"');
  process.exit(1);
}

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Push database schema
  console.log('🗄️  Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  // Seed database
  console.log('🌱 Seeding database...');
  execSync('npx tsx scripts/seed.ts', { stdio: 'inherit' });
  
  console.log('\n✅ Setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Update your .env file with the correct DATABASE_URL');
  console.log('2. Run: pnpm run dev');
  console.log('3. Visit: http://localhost:3000');
  console.log('\n👤 Test accounts:');
  console.log('Admin: admin@example.com / admin123');
  console.log('User: test@example.com / password123');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
