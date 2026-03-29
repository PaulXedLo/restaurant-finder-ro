import {
  pgTable,
  text,
  doublePrecision,
  jsonb,
  bigint,
} from "drizzle-orm/pg-core";

export const restaurants = pgTable("restaurants", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  lat: doublePrecision("lat").notNull(),
  lon: doublePrecision("lon").notNull(),
  name: text("name"),
  amenity: text("amenity"),
  cuisine: text("cuisine"),
  tags: jsonb("tags").$type<Record<string, any>>(),
});
