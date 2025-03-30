import { z } from 'zod';

const envSchema = z.object({
  // Default
  NEXT_PUBLIC_PAGE_TITLE: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
});

const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_PAGE_TITLE: process.env.NEXT_PUBLIC_PAGE_TITLE,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const clientEnv = {
  pageTitle: parsedEnv.NEXT_PUBLIC_PAGE_TITLE,
  publicUrl: parsedEnv.NEXT_PUBLIC_SERVER_URL,
};

export { clientEnv };
