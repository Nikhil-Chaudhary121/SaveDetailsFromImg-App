
import pool from "./db.js";

async function testConnection() {
  try {
    const result = await pool.query("SELECT * FROM public.shops;");

    console.log("Database connected successfully!");
    console.log("Current database :", result.rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
