import { z } from 'zod';

const envSchema = z.object({
  // Default
  PAYLOAD_SECRET: z.string().min(10),
  DATABASE_URI: z.string(),

  // Other
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // Vercel
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

const parsedEnv = envSchema.parse({
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  DATABASE_URI: process.env.DATABASE_URI,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
});

const serverEnv = {
  payloadSecret: parsedEnv.PAYLOAD_SECRET,
  dbUri: parsedEnv.DATABASE_URI,
  sentry: {
    org: parsedEnv.SENTRY_ORG,
    project: parsedEnv.SENTRY_PROJECT,
  },
  vercel: {
    blobStorageToken: parsedEnv.BLOB_READ_WRITE_TOKEN,
  },
};

export { serverEnv };
