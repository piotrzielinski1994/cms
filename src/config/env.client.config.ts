import { z } from 'zod';

const envSchema = z.object({
  // Default
  NODE_ENV: z.enum(['test', 'development', 'production']),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
  NEXT_PUBLIC_SITE_NAME: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  NEXT_PUBLIC_STORYBOOK_URL: z.string().url(),
  // Other
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_GTM_ID: z
    .string()
    .regex(/^GTM-[A-Z0-9]+$/)
    .optional(),
});

const parsedEnv = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_RUNTIME: process.env.NEXT_RUNTIME || undefined,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_STORYBOOK_URL: process.env.NEXT_PUBLIC_STORYBOOK_URL,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || undefined,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || undefined,
});

const clientEnv = {
  siteName: parsedEnv.NEXT_PUBLIC_SITE_NAME,
  publicUrl: parsedEnv.NEXT_PUBLIC_SERVER_URL,
  storybookUrl: parsedEnv.NEXT_PUBLIC_STORYBOOK_URL,
  sentryDsn: parsedEnv.NEXT_PUBLIC_SENTRY_DSN,
  gtmId: parsedEnv.NEXT_PUBLIC_GTM_ID,
  internal: {
    nodeEnv: parsedEnv.NODE_ENV,
    nextRuntime: parsedEnv.NEXT_RUNTIME,
  },
};

export { clientEnv };
