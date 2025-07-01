import { captureRequestError } from '@sentry/nextjs';
import { clientEnv } from './config/env.client.config';

const register = async () => {
  if (clientEnv.internal.nextRuntime === 'nodejs') {
    await import('./config/sentry/sentry.server.config');
  }

  if (clientEnv.internal.nextRuntime === 'edge') {
    await import('./config/sentry/sentry.edge.config');
  }
};

const onRequestError = captureRequestError;

export { onRequestError, register };
