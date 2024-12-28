import type { CollectionConfig } from 'payload';

import path from 'path';

import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';

const root = path.resolve(process.cwd());

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.join(root, 'public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
      },
    ],
  },
};
