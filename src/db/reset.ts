// db.ts
import { sql } from "drizzle-orm";
import { db } from ".";

// reset.ts
async function reset() {
  const tableSchema = db._.schema;

  const tableName = db._.schema?.availablePhoneNumber.dbName; // db._.schema?.subscription.dbName;
  if (!tableSchema) {
    throw new Error("No table schema found");
  }

  if (tableName) {
    const table = Object.values(tableSchema).find(t => t.dbName === tableName);
    if (!table) {
      throw new Error(`Table "${tableName}" does not exist in the schema`);
    }

    console.warn(`🧨 Preparing delete query for table: ${tableName}`);
    const query = sql.raw(`TRUNCATE TABLE ${tableName} CASCADE;`);
    console.warn("📨 Sending delete query...");

    await db.transaction(async tx => {
      await tx.execute(query);
    });

    console.warn(`✅ Table "${tableName}" emptied`);

    return;
  }
  console.warn("🗑️  Emptying the entire database");
  const queries = Object.values(tableSchema).map(table => {
    console.warn(`🧨 Preparing delete query for table: ${table.dbName}`);
    return sql.raw(`TRUNCATE TABLE ${table.dbName} CASCADE;`);
  });

  console.warn("📨 Sending delete queries...");

  await db.transaction(async tx => {
    await Promise.all(
      queries.map(async query => {
        if (query) await tx.execute(query);
      }),
    );
  });

  console.warn("✅ Database emptied");
}

reset().catch(e => {
  console.error(e);
});
