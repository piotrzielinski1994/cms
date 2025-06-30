import { clientEnv } from '@/config/env.client.config';
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: clientEnv.sentryDsn,
  tracesSampleRate: 1,
  sendDefaultPii: true,
  debug: false,
});
