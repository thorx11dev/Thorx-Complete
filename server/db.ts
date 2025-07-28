import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Use a development fallback if DATABASE_URL is not set
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/thorx_dev';

if (!process.env.DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL not set. Using development fallback. Please set DATABASE_URL for production.');
}

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool, schema });