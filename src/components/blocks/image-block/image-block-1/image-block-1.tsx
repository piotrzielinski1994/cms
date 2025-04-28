'use client';

import { ButtonLink } from '@/components/basic/button/button';
import { Image as BasicImage } from '@/components/basic/image/image';
import { themes } from '@/config/themes.config';
import { ImageBlock1Block, Image as ImageModel, Page } from '@/payload.types';
import { useThemeStore } from '@/store/theme';
import { cn } from '@/utils/tailwind';

const ImageBlock1 = ({ isReversed, image, heading, subheading, buttons }: ImageBlock1Block) => {
  const theme = useThemeStore((store) => store.theme);
  const { default: defaultImage, dark: darkImage } = image as {
    default: ImageModel;
    dark?: ImageModel;
  };
  const prefersDark = themes[theme]._type === 'dark';
  const imageToShow = !prefersDark ? defaultImage : (darkImage ?? defaultImage);

  return (
    <div className="grid md:grid-cols-2">
      <div
        className={cn(
          'grid justify-items-start content-center gap-4',
          isReversed ? 'md:order-2' : 'md:order-1',
        )}
      >
        <h3 className="text-4xl font-semibold">{heading}</h3>
        {subheading && <p>{subheading}</p>}
        {buttons?.map((button) => {
          const path = (button?.reference?.value as Page).path;
          return (
            <ButtonLink
              key={button.label}
              href={`${path}${button.selector ? '#' + button.selector : ''}`}
            >
              {button.label}
            </ButtonLink>
          );
        })}
      </div>
      <div className={cn(isReversed ? 'md:order-1' : 'md:order-2')}>
        <BasicImage {...imageToShow} />
      </div>
    </div>
  );
};

export { ImageBlock1 };
