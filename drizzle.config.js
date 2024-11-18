/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    out: "./drizzle/migrations", // Directory for generated migrations
    // driver: "pg",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
    }
};