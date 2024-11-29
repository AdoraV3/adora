import { migrate } from "drizzle-orm/postgres-js/migrator";

import { env } from "env.mjs";
import { db } from "./index";

export async function runMigrate() {
  console.warn("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "migration" });

  const end = Date.now();

  console.warn(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
}
if (!env.DB_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations',
  );
}

runMigrate().catch(err => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
