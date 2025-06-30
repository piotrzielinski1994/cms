import * as Sentry from '@sentry/nextjs';
import { clientEnv } from './config/env.client.config';

Sentry.init({
  dsn: clientEnv.sentryDsn,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});

const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

export { onRouterTransitionStart };
