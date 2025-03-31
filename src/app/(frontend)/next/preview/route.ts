import configPromise from '@/payload/payload.config';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { CollectionSlug, getPayload, type PayloadRequest } from 'payload';

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  },
): Promise<Response> {
  const payload = await getPayload({ config: configPromise });
  const { searchParams } = new URL(req.url);
  const collection = searchParams.get('collection') as CollectionSlug;
  const slug = searchParams.get('slug');
  const path = searchParams.get('path')?.replace(/[^/]+$/, slug ?? '');
  const previewSecret = searchParams.get('previewSecret');

  if (previewSecret) {
    return new Response('You are not allowed to preview this page', { status: 403 });
  } else {
    if (path === undefined) {
      return new Response('No path provided', { status: 404 });
    }

    if (!collection) {
      return new Response('No path provided', { status: 404 });
    }

    if (!path.startsWith('/')) {
      return new Response('This endpoint can only be used for internal previews', { status: 500 });
    }

    let user;

    try {
      user = await payload.auth({
        req: req as unknown as PayloadRequest,
        headers: req.headers,
      });
    } catch (error) {
      payload.logger.error({ err: error }, 'Error verifying token for live preview');
      return new Response('You are not allowed to preview this page', { status: 403 });
    }

    const draft = await draftMode();

    // You can add additional checks here to see if the user is allowed to preview this page
    if (!user) {
      draft.disable();
      return new Response('You are not allowed to preview this page', { status: 403 });
    }

    const locales =
      payload.config.localization === false
        ? []
        : payload.config.localization.locales.map((locale) => locale.code);
    // Verify the given slug exists
    try {
      const docs = await payload.find({
        collection,
        draft: true,
        limit: 1,
        // pagination: false reduces overhead if you don't need totalDocs
        pagination: false,
        depth: 0,
        select: {},
        where: {
          or: [
            { slug: { equals: slug } },
            ...locales.map((locale) => ({ [`slug.${locale}`]: { equals: slug } })),
          ],
        },
      });

      if (!docs.docs.length) {
        return new Response('Document not found', { status: 404 });
      }
    } catch (error) {
      payload.logger.error({ err: error }, 'Error verifying token for live preview');
    }

    draft.enable();

    redirect(path);
  }
}
