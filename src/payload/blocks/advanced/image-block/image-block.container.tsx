'use client';

import { ImageBlock } from '@/components/advanced/image-block/image-block';
import { ImageBlockBlock, Image as ImageModel, Page } from '@/payload.types';
import { useThemeStore } from '@/store/theme';

const ImageBlock1Container = (props: ImageBlockBlock) => {
  const { isReversed, image, heading, subheading, buttons } = props;
  const { themeConfig } = useThemeStore();
  const { default: defaultImage, dark: darkImage } = image as {
    default: ImageModel;
    dark?: ImageModel;
  };
  const prefersDark = themeConfig.colorPreference === 'dark';
  const imageToShow = !prefersDark ? defaultImage : (darkImage ?? defaultImage);

  return (
    <ImageBlock
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

export { ImageBlock1Container };
