'use client';

import { ProductGallery } from '@/features/checkout/components/basic/product-gallery/product-gallery';
import { placeholderDarkWebp, placeholderWebp } from '@/placeholders';
import { useThemeStore } from '@/store/theme';
import { ComponentProps } from 'react';

type GalleryImage = ComponentProps<typeof ProductGallery>['images'][number];

type ThemedGalleryProps = {
  images: GalleryImage[];
  productTitle: string;
  className?: string;
};

const ThemedGallery = ({ images, productTitle, className }: ThemedGalleryProps) => {
  const { themeConfig } = useThemeStore();
  const prefersDark = themeConfig.colorPreference === 'dark';
  const placeholder = prefersDark ? placeholderDarkWebp : placeholderWebp;

  const finalImages = images.length > 0 ? images : [{ src: placeholder.src, alt: productTitle }];

  return <ProductGallery className={className} images={finalImages} />;
};

export { ThemedGallery };
