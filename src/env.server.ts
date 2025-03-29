import { z } from 'zod';

const envSchema = z.object({
  // Default
  PAYLOAD_SECRET: z.string().min(10),
  DATABASE_URI: z.string(),

  // Vercel
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

const env = envSchema.parse(process.env);

export const serverEnv = {
  payloadSecret: env.PAYLOAD_SECRET,
  dbUri: env.DATABASE_URI,
  vercel: {
    blobStorageToken: env.BLOB_READ_WRITE_TOKEN,
  },
};
