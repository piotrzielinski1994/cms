import { z } from 'zod';

const envSchema = z.object({
  // Default
  PAYLOAD_SECRET: z.string().min(10),
  DATABASE_URI: z.string(),

  // Vercel
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

const parsedEnv = envSchema.parse({
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  DATABASE_URI: process.env.DATABASE_URI,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
});

const serverEnv = {
  payloadSecret: parsedEnv.PAYLOAD_SECRET,
  dbUri: parsedEnv.DATABASE_URI,
  vercel: {
    blobStorageToken: parsedEnv.BLOB_READ_WRITE_TOKEN,
  },
};

export { serverEnv };
