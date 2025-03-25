import { serverEnv } from '@/env';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

const vercelStorage = vercelBlobStorage({
  enabled: Boolean(serverEnv.vercel.blobStorageToken),
  token: serverEnv.vercel.blobStorageToken,
  collections: {
    images: true,
  },
});

export default vercelStorage;
