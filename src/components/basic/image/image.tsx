import { cn } from '@/utils/tailwind';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import defaultTheme from 'tailwindcss/defaultTheme';

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  isEager?: boolean;
  aspectRatio?: {
    width: number;
    height: number;
  };
  sizing?: { default: string } & Partial<Record<keyof typeof defaultTheme.screens, string>>;
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
      sizes={Object.entries(breakpointSizing)
        .map(([breakpoint, size]) => [defaultTheme.screens[breakpoint], size])
        .map(([minWidth, size]) => `(min-width: ${minWidth}) ${size}`)
        .concat(defaultSizing)
        .join(', ')}
      {...props}
      {...dimensions}
      loading={isEager ? 'eager' : 'lazy'}
      className={cn(dimensions.className, 'object-cover cms-image', className)}
    />
  );
};

export { Image };
