const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// If DATABASE_URL starts with postgres or postgresql, switch provider
if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    console.log("PostgreSQL database detected. Switching Prisma provider to 'postgresql'...");
    schema = schema.replace(/provider\s*=\s*"mysql"/, 'provider = "postgresql"');
    
    // Add directUrl if it doesn't exist
    if (!schema.includes('directUrl')) {
        schema = schema.replace(/url\s*=\s*env\("DATABASE_URL"\)/, 'url      = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")');
    }
    
    fs.writeFileSync(schemaPath, schema);
    console.log("Prisma schema updated for PostgreSQL.");
} else {
    console.log("Using local MySQL database (no changes to Prisma schema).");
}
