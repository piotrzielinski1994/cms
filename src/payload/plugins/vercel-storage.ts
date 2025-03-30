import { env } from '@/config/env.config';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

const vercelStorage = vercelBlobStorage({
  enabled: Boolean(env.vercel.blobStorageToken),
  token: env.vercel.blobStorageToken,
  collections: {
    images: true,
  },
});

export { vercelStorage };
