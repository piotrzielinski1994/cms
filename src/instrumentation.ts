import * as Sentry from '@sentry/nextjs';

const register = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./config/sentry/sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./config/sentry/sentry.edge.config');
  }
};

const onRequestError = Sentry.captureRequestError;

export { onRequestError, register };
