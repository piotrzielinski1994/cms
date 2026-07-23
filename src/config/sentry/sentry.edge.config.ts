import { init } from '@sentry/nextjs';
import { clientEnv } from '@/config/env.client.config';

if (clientEnv.sentryDsn) {
  init({
    dsn: clientEnv.sentryDsn,
    tracesSampleRate: 1,
    sendDefaultPii: true,
    debug: clientEnv.internal.nodeEnv === 'development',
  });
}
