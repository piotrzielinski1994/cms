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

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOKS_SIGNING_SECRET: z.string().optional(),
});

const parsedEnv = envSchema.parse({
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  DATABASE_URI: process.env.DATABASE_URI,
  SENTRY_ORG: process.env.SENTRY_ORG || undefined,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT || undefined,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || undefined,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || undefined,
  STRIPE_WEBHOOKS_SIGNING_SECRET: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET || undefined,
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
  stripe: {
    secretKey: parsedEnv.STRIPE_SECRET_KEY,
    webhooksSigningSecret: parsedEnv.STRIPE_WEBHOOKS_SIGNING_SECRET,
  },
};

export { serverEnv };
