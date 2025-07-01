import { captureRouterTransitionStart, init, replayIntegration } from '@sentry/nextjs';
import { clientEnv } from './config/env.client.config';

if (!!clientEnv.sentryDsn) {
  init({
    dsn: clientEnv.sentryDsn,
    integrations: [replayIntegration()],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: clientEnv.internal.nodeEnv === 'development',
  });
}

const onRouterTransitionStart = captureRouterTransitionStart;

export { onRouterTransitionStart };
