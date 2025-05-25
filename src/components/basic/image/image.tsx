import { cn } from '@/utils/tailwind';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { toPairs } from 'ramda';
import defaultTheme from 'tailwindcss/defaultTheme';

type ImageSize = `${number}px` | `${number}rem` | `${number}vw`;
type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  isEager?: boolean;
  aspectRatio?: {
    width: number;
    height: number;
  };
  // default size + sizing per breakpoint
  sizing?: { default: ImageSize } & Partial<Record<keyof typeof defaultTheme.screens, ImageSize>>;
};

const Image = ({
  aspectRatio,
  className,
  isEager = false,
  sizing = { default: '100vw' },
  ...props
}: ImageProps) => {
  const { default: defaultSizing, ...breakpointSizing } = sizing;
  const dimensions: Partial<NextImageProps> = aspectRatio ?? {
    width: 0,
    height: 0,
    className: 'w-full h-auto',
  };

  return (
    <NextImage
      {...props}
      {...dimensions}
      loading={isEager ? 'eager' : 'lazy'}
      className={cn(dimensions.className, 'object-cover cms-image', className)}
      sizes={toPairs(breakpointSizing)
        .filter((it) => it !== undefined)
        .map(([breakpoint, size]) => [defaultTheme.screens[breakpoint], size])
        .map(([minWidth, size]) => `(min-width: ${minWidth}) ${size}`)
        .concat(defaultSizing)
        .join(', ')}
    />
  );
};

export { Image };
