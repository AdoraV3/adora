import * as seeds from "./seeds";

async function main() {
  console.warn("⏳ Running seed...");
  const start = Date.now();

  await seeds.subscription();
  // await seeds.agent();

  const end = Date.now();

  console.warn(`✅ Seed completed in ${end - start}ms`);
}

main()
  .then()
  .catch(error => {
    console.error(error);
    process.exit(0);
  });
