import {
  pgTable,
  text,
  varchar,
  timestamp,
  decimal,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
// Restaurant Table
export const restaurants = pgTable("restaurants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),

  // Coordinates for MapLibre
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),

  cuisineType: varchar("cuisine_type", { length: 100 }),
  priceRange: integer("price_range").default(1),
  featuredImage: text("featured_image"),
  createdAt: timestamp("created_at").defaultNow(),
});
