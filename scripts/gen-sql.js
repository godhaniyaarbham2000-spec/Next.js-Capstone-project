const fs = require('fs');
const { execSync } = require('child_process');

let s = fs.readFileSync('prisma/schema.prisma', 'utf8');
fs.writeFileSync('prisma/schema.prisma', s.replace('"mysql"', '"postgresql"'));

try {
    const sql = execSync('npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script').toString();
    fs.writeFileSync('supabase_schema.sql', sql);
    console.log("Generated SQL successfully!");
} catch(e) {
    console.log("Error", e);
}

fs.writeFileSync('prisma/schema.prisma', s);
