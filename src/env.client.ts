import { z } from 'zod';

const envSchema = z.object({
  // Default
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
});

// https://stackoverflow.com/questions/69715833/why-is-the-process-env-object-empty-but-i-can-access-its-properties
const env = envSchema.parse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const clientEnv = {
  publicUrl: env.NEXT_PUBLIC_SERVER_URL,
};

export { clientEnv };
