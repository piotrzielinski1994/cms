import { z } from 'zod';

const isServer = typeof window === 'undefined';

const envSchema = z.object({
  // Default
  PAYLOAD_SECRET: isServer ? z.string().min(10) : z.undefined(),
  DATABASE_URI: isServer ? z.string() : z.undefined(),
  NEXT_PUBLIC_PAGE_TITLE: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),

  // Vercel
  BLOB_READ_WRITE_TOKEN: isServer ? z.string().optional() : z.undefined(),
});

const parsedEnv = envSchema.parse({
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  DATABASE_URI: process.env.DATABASE_URI,
  NEXT_PUBLIC_PAGE_TITLE: process.env.NEXT_PUBLIC_PAGE_TITLE,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
});

const env = {
  payloadSecret: parsedEnv.PAYLOAD_SECRET,
  dbUri: parsedEnv.DATABASE_URI,
  pageTitle: parsedEnv.NEXT_PUBLIC_PAGE_TITLE,
  publicUrl: parsedEnv.NEXT_PUBLIC_SERVER_URL,
  vercel: {
    blobStorageToken: parsedEnv.BLOB_READ_WRITE_TOKEN,
  },
};

export { env };
