import configPromise from '@payload-config';
import type { StaticImageData } from 'next/image';
import { getPayload } from 'payload';
import { toPairs } from 'ramda';
import { clientEnv } from '@/config/env.client.config';
import type { defaultContentLocale } from '@/config/store/locales.config';
import type { Config, Image } from '@/payload.types';

type ImageToCreate = Omit<Image, 'createdAt' | 'id' | 'updatedAt'>;

const createImage = async (
  imageFile: StaticImageData,
  mainLocaleImage: ImageToCreate,
  getLocalizedImages: (
    image: Image,
  ) => Omit<Record<Config['locale'], ImageToCreate>, typeof defaultContentLocale>,
) => {
  const payload = await getPayload({ config: configPromise });
  const response = await fetch(`${clientEnv.publicUrl}${imageFile.src}`);
  const arrayBuffer = await response.arrayBuffer();
  const data = Buffer.from(arrayBuffer);

  const uploadedImage = await payload.create({
    collection: 'images',
    data: mainLocaleImage,
    file: {
      mimetype: `image/${imageFile.src.split('.').pop()}`,
      name: imageFile.src.split('/').pop() || `file-${Date.now()}`,
      data,
      size: data.byteLength,
    },
  });

  for (const [locale, data] of toPairs(getLocalizedImages(uploadedImage))) {
    await payload.update({
      collection: 'images',
      id: uploadedImage.id,
      locale,
      data,
    });
  }

  return uploadedImage;
};

export { createImage };
