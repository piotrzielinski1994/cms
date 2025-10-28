'use client';

import { ButtonLink } from '@/components/basic/button/button';
import { Image as BaseImage } from '@/components/basic/image/image';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { StaticImageData } from 'next/image';
import { ComponentProps } from 'react';

type ImageBlockProps = HtmlProps<'div'> & {
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

const styles = {
  root: 'grid md:grid-cols-2 gap-4 md:gap-8',
  imageWrapper: ({ isReversed }: BoolMap<'isReversed'>) =>
    cn('order-1 md:order-2', { 'md:order-1': isReversed }),
  image: 'bg-background1 min-h-full',
  content: ({ isReversed }: BoolMap<'isReversed'>) =>
    cn('grid justify-items-start content-center gap-4', 'order-2 md:order-1', {
      'md:order-2': isReversed,
    }),
  heading: 'text-4xl font-semibold',
  buttons: 'flex gap-4',
};

const Component = (props: ImageBlockProps) => {
  const { isReversed = false, image, heading, subheading, buttons = [], ...rest } = props;
  return (
    <Root {...rest}>
      <ImageWrapper isReversed={isReversed}>
        <Image
          {...image}
          aspectRatio={
            Boolean(image.width && image.height)
              ? { width: image.width!, height: image.height! }
              : undefined
          }
        />
      </ImageWrapper>
      <div className={styles.content({ isReversed })}>
        <Heading>{heading}</Heading>
        {subheading && <p>{subheading}</p>}
        {buttons.length > 0 && (
          <Buttons>
            {buttons.map((button) => {
              return (
                <ButtonLink key={button.label} {...button}>
                  {button.label}
                </ButtonLink>
              );
            })}
          </Buttons>
        )}
      </div>
    </Root>
  );
};

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.root, className)} />;
};

const ImageWrapper = (props: HtmlProps<'div'> & Pick<ImageBlockProps, 'isReversed'>) => {
  const { isReversed = false, className, ...rest } = props;
  return <div {...rest} className={cn(styles.imageWrapper({ isReversed }), className)} />;
};

const Image = ({ className, ...rest }: ComponentProps<typeof BaseImage>) => {
  return <BaseImage {...rest} className={cn(styles.image, className)} />;
};

const Heading = ({ className, ...rest }: HtmlProps<'h3'>) => {
  return <div {...rest} className={cn(styles.heading, className)} />;
};

const Buttons = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.buttons, className)} />;
};

const ImageBlock = Object.assign(Component, {
  Root,
  ImageWrapper,
  Image,
  Heading,
  Buttons,
});

export { ImageBlock, styles };
