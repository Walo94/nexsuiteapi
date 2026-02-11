// backend/src/scripts/runSeeds.ts
import { AppDataSource } from "@/config/data-source";
import { seedModulos } from "@/seedModulos";

async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log("🔌 Database connected");
    
    await seedModulos();
    
    console.log("✅ Seeds completed successfully");
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error running seeds:", error);
    process.exit(1);
  }
}

runSeeds();