'use client';

import { ButtonLink } from '@/components/basic/button/button';
import { Image as BasicImage } from '@/components/basic/image/image';
import { cn } from '@/utils/tailwind';
import { StaticImageData } from 'next/image';
import { ComponentProps, HTMLAttributes } from 'react';

type ImageBlockProps = HTMLAttributes<HTMLDivElement> & {
  isReversed?: boolean;
  image: Omit<StaticImageData, 'width' | 'height'> & {
    alt: string;
    width?: number;
    height?: number;
  };
  heading?: string;
  subheading?: string;
  buttons?: Array<Pick<ComponentProps<typeof ButtonLink>, 'href' | 'variant'> & { label: string }>;
};

const ImageBlock = ({
  isReversed,
  image,
  heading,
  subheading,
  buttons = [],
  ...props
}: ImageBlockProps) => {
  return (
    <div {...props} className="grid md:grid-cols-2 gap-4 md:gap-8">
      <div className={cn('order-1 md:order-2', { 'md:order-1': isReversed })}>
        <BasicImage
          className="bg-background1 min-h-full"
          src={image.src}
          alt={image.alt}
          aspectRatio={
            Boolean(image.width && image.height)
              ? { width: image.width!, height: image.height! }
              : undefined
          }
        />
      </div>
      <div
        className={cn('grid justify-items-start content-center gap-4', 'order-2 md:order-1', {
          'md:order-2': isReversed,
        })}
      >
        <h3 className="text-4xl font-semibold">{heading}</h3>
        {subheading && <p>{subheading}</p>}
        {buttons.length > 0 && (
          <div className="flex gap-4">
            {buttons.map((button) => {
              return (
                <ButtonLink key={button.label} href={button.href} variant={button.variant}>
                  {button.label}
                </ButtonLink>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { ImageBlock };
