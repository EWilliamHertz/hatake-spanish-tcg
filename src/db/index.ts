import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Create the connection using the environment variable
const sql = neon(process.env.DATABASE_URL!);

// Export the db instance so we can use it anywhere in our app
export const db = drizzle(sql, { schema });