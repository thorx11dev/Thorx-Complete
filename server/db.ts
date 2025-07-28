import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

neonConfig.webSocketConstructor = ws;

// Use the provided DATABASE_URL or construct from individual components
const DATABASE_URL = process.env.DATABASE_URL || 
  `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=require`;

if (!DATABASE_URL || DATABASE_URL.includes('undefined')) {
  throw new Error("DATABASE_URL must be set. Please check your environment variables.");
}

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool, schema });