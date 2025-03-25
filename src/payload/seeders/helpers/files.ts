import { serverEnv } from '@/env';
import { StaticImageData } from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Config, Image } from '@/payload/payload.types';
import { contentLocale } from '@/payload/locale';
import { entries } from '@/utils/object';

type ImageToCreate = Omit<Image, 'createdAt' | 'id' | 'updatedAt'>;

export const createImage = async (
  imageFile: StaticImageData,
  mainLocaleImage: ImageToCreate,
  getLocalizedImages: (
    image: Image,
  ) => Omit<Record<Config['locale'], ImageToCreate>, typeof contentLocale.default>,
) => {
  const payload = await getPayload({ config: configPromise });
  const response = await fetch(`${serverEnv.publicUrl}${imageFile.src}`);
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

  for (const [locale, data] of entries(getLocalizedImages(uploadedImage))) {
    await payload.update({
      collection: 'images',
      id: uploadedImage.id,
      locale,
      data,
    });
  }

  return uploadedImage;
};
