import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: "./.env.local" });

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
