import { clientEnv } from '@/env.client';
import { Config, Image } from '@/payload.types';
import { contentLocale } from '@/payload/locale';
import { toEntries } from '@/utils/object';
import configPromise from '@payload-config';
import { StaticImageData } from 'next/image';
import { getPayload } from 'payload';

type ImageToCreate = Omit<Image, 'createdAt' | 'id' | 'updatedAt'>;

const createImage = async (
  imageFile: StaticImageData,
  mainLocaleImage: ImageToCreate,
  getLocalizedImages: (
    image: Image,
  ) => Omit<Record<Config['locale'], ImageToCreate>, typeof contentLocale.default>,
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

  for (const [locale, data] of toEntries(getLocalizedImages(uploadedImage))) {
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
