import config from '@/payload/payload.config';
import { seed } from '@/payload/seeders';
import { headers } from 'next/headers';
import { createLocalReq, getPayload } from 'payload';

export const maxDuration = 60;

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config });
  const requestHeaders = await headers();
  const { user } = await payload.auth({ headers: requestHeaders });

  if (!user) {
    return new Response('Action forbidden.', { status: 403 });
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload);
    await seed({ payload, req: payloadReq });
    return Response.json({ success: true });
  } catch (error) {
    payload.logger.error({ error }, 'Error seeding data');
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
