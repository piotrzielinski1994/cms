import { z } from 'zod';

const envSchema = z.object({
  // Default
  NEXT_PUBLIC_SITE_NAME: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
});

const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const clientEnv = {
  siteName: parsedEnv.NEXT_PUBLIC_SITE_NAME,
  publicUrl: parsedEnv.NEXT_PUBLIC_SERVER_URL,
};

export { clientEnv };
