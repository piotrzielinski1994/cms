import { serverEnv } from '@/env';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

const vercelStorage = vercelBlobStorage({
  collections: {
    images: true,
  },
  token: serverEnv.vercel.blobStorageToken,
});

export default vercelStorage;
