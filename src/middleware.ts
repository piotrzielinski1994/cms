import { routing } from '@/payload/locale/routing';
import createMiddleware from 'next-intl/middleware';

// https://next-intl-docs.vercel.app/docs/routing/middleware
const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`, `/_vercel`, or `/admin`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|admin|next|.*\\..*).*)',
  ],
};

const middleware = createMiddleware(routing);

export { config };
export default middleware;
