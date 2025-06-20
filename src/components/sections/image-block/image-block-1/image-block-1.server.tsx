'use client';

import { themes } from '@/config/themes.config';
import { ImageBlock1Block, Image as ImageModel, Page } from '@/payload.types';
import { useThemeStore } from '@/store/theme';
import { ImageBlock1 as ImageBlock1Component } from './image-block-1';

const ImageBlock1 = ({ isReversed, image, heading, subheading, buttons }: ImageBlock1Block) => {
  const theme = useThemeStore((store) => store.theme);
  const { default: defaultImage, dark: darkImage } = image as {
    default: ImageModel;
    dark?: ImageModel;
  };
  const prefersDark = themes[theme]._type === 'dark';
  const imageToShow = !prefersDark ? defaultImage : (darkImage ?? defaultImage);

  return (
    <ImageBlock1Component
      isReversed={isReversed ?? undefined}
      image={{
        src: imageToShow.url ?? '',
        alt: imageToShow.alt,
        width: imageToShow.width ?? undefined,
        height: imageToShow.height ?? undefined,
      }}
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      buttons={buttons?.map((button, index) => {
        const href = (button?.reference?.value as Page).path ?? '';
        const variant = index === 0 ? 'primary' : 'secondary';
        return { label: button.label, href, variant };
      })}
    />
  );
};

export { ImageBlock1 };
