import { z } from 'zod';

const envSchema = z.object({
  // Default
  PAYLOAD_SECRET: z.string().min(10),
  DATABASE_URI: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),

  // Vercel
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

const parsedEnv = envSchema.parse({
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  DATABASE_URI: process.env.DATABASE_URI,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
});

const env = {
  payloadSecret: parsedEnv.PAYLOAD_SECRET,
  dbUri: parsedEnv.DATABASE_URI,
  publicUrl: parsedEnv.NEXT_PUBLIC_SERVER_URL,
  vercel: {
    blobStorageToken: parsedEnv.BLOB_READ_WRITE_TOKEN,
  },
};

export { env };
