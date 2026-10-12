import { configDotenv } from "dotenv";
configDotenv()

import { Pool } from "pg";

const pool = new Pool ({connectionString : process.env.DATABASE_URL})

export default pool
