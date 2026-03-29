import { defineEventHandler, getQuery } from "h3";
import { and, gte, lte, ilike } from "drizzle-orm";
import { db } from "~~/lib/db/index";
import { restaurants } from "~~/lib/db/schema/restaurants";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const bboxString = query.bbox as string;
  const type = (query.type as string) || "all";

  if (!bboxString) return { error: "Missing bbox" };

  const [south, west, north, east] = bboxString.split(",").map(Number);
  let dbConditions = and(
    gte(restaurants.lat, south),
    lte(restaurants.lat, north),
    gte(restaurants.lon, west),
    lte(restaurants.lon, east),
  );
  if (type !== "all") {
    dbConditions = and(dbConditions, ilike(restaurants.cuisine, `%${type}%`));
  }
  const cachedData = await db.select().from(restaurants).where(dbConditions);

  if (cachedData.length > 5) {
    console.log(`Served ${cachedData.length} restaurants from database`);

    return cachedData.map((row) => ({
      id: row.id,
      lat: row.lat,
      lon: row.lon,
      tags: {
        ...row.tags,
        name: row.name,
        amenity: row.amenity,
        cuisine: row.cuisine,
      },
    }));
  }

  console.log(`Fetching area from Overpass...`);

  let queryNodes = `
    node["amenity"="restaurant"](${bboxString});
    node["amenity"="fast_food"](${bboxString});
    node["amenity"="cafe"](${bboxString});
  `;

  const overpassQuery = `[out:json][timeout:15];(${queryNodes});out body;`;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
    });

    const data = await response.json();
    const overpassElements = data.elements || [];

    if (overpassElements.length === 0) return [];

    // insert to neon
    const insertPayload = overpassElements.map((place: any) => ({
      id: place.id,
      lat: place.lat,
      lon: place.lon,
      name: place.tags?.name || null,
      amenity: place.tags?.amenity || null,
      cuisine: place.tags?.cuisine || null,
      tags: place.tags,
    }));

    await db
      .insert(restaurants)
      .values(insertPayload)
      .onConflictDoNothing({ target: restaurants.id });

    console.log(`Inserted ${insertPayload.length} new places into Neon.`);

    return overpassElements;
  } catch (error) {
    console.error("Server Error:", error);
    return [];
  }
});
