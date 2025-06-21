import { z } from 'zod';

const envSchema = z.object({
  // Default
  NEXT_PUBLIC_SITE_NAME: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  NEXT_PUBLIC_STORYBOOK_URL: z.string().url(),
  // Other
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
});

const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_STORYBOOK_URL: process.env.NEXT_PUBLIC_STORYBOOK_URL,
});

const clientEnv = {
  siteName: parsedEnv.NEXT_PUBLIC_SITE_NAME,
  publicUrl: parsedEnv.NEXT_PUBLIC_SERVER_URL,
  storybookUrl: parsedEnv.NEXT_PUBLIC_STORYBOOK_URL,
  gtmId: parsedEnv.NEXT_PUBLIC_GTM_ID,
};

export { clientEnv };
