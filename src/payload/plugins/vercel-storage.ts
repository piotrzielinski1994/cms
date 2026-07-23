import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { serverEnv } from '@/config/env.server.config';

const vercelStorage = vercelBlobStorage({
  enabled: Boolean(serverEnv.vercel.blobStorageToken),
  token: serverEnv.vercel.blobStorageToken,
  collections: { images: true },
});

export { vercelStorage };
