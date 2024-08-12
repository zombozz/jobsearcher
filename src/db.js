// lib/db.js

import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_POSTGRES_USER,
  host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
  database:process.env.NEXT_PUBLIC_POSTGRES_DB,
  password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
  port: process.env.NEXT_PUBLIC_POSTGRES_PORT,
});

export default pool;
