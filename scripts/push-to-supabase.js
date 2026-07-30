const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const originalPath = path.join(__dirname, '../prisma/schema.prisma');
const backupPath = path.join(__dirname, '../prisma/schema.prisma.backup');

// Backup original
fs.copyFileSync(originalPath, backupPath);

// Prepare for postgres
let schema = fs.readFileSync(originalPath, 'utf8');
schema = schema.replace(/provider\s*=\s*"mysql"/, 'provider = "postgresql"');
if (!schema.includes('directUrl')) {
    schema = schema.replace(/url\s*=\s*env\("DATABASE_URL"\)/, 'url      = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")');
}
fs.writeFileSync(originalPath, schema);

console.log("Pushing schema to Supabase...");
try {
    execSync('npx prisma db push --accept-data-loss', { 
        stdio: 'inherit',
        env: {
            ...process.env,
            DATABASE_URL: 'postgresql://postgres.cfzwdjthhvtlyzzdgfjc:ArbhAm%401234567899@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true',
            DIRECT_URL: 'postgresql://postgres.cfzwdjthhvtlyzzdgfjc:ArbhAm%401234567899@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true'
        }
    });
    console.log("Successfully created tables in Supabase!");
} catch (e) {
    console.error("Failed to push schema:", e.message);
}

// Restore original MySQL schema so local dev is unaffected
fs.copyFileSync(backupPath, originalPath);
fs.unlinkSync(backupPath);
console.log("Restored local MySQL schema.");
