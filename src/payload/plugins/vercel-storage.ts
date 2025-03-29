import { serverEnv } from '@/env.server';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

export const vercelStorage = vercelBlobStorage({
  enabled: Boolean(serverEnv.vercel.blobStorageToken),
  token: serverEnv.vercel.blobStorageToken,
  collections: {
    images: true,
  },
});
