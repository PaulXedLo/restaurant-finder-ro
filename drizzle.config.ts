import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./app/lib/db/migrations",
  schema: [
    "./app/lib/db/schema/users.ts",
    "./app/lib/db/schema/restaurants.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});
