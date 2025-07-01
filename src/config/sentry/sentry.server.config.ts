import { clientEnv } from '@/config/env.client.config';
import { init } from '@sentry/nextjs';

if (!!clientEnv.sentryDsn) {
  init({
    dsn: clientEnv.sentryDsn,
    tracesSampleRate: 1,
    sendDefaultPii: true,
    debug: clientEnv.internal.nodeEnv === 'development',
  });
}
