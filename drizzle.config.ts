import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./lib/db/migrations",
  schema: ["./lib/db/schema/users.ts", "./lib/db/schema/restaurants.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});
