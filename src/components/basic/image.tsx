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
  sizing?: { maxViewport: number; size: string }[];
};

const defaultSizing: ImageProps['sizing'] = Object.values(defaultTheme.screens)
  .map((it) => parseInt(it))
  .sort((a, b) => a - b)
  .map((it) => ({ maxViewport: it, size: '100vw' }));

const Image = ({
  aspectRatio,
  className,
  isEager = false,
  sizing = defaultSizing,
  ...props
}: ImageProps) => {
  const dimensions: Partial<NextImageProps> = aspectRatio ?? {
    width: 0,
    height: 0,
    className: 'w-full h-auto',
  };

  return (
    <NextImage
      sizes={sizing
        .map(({ maxViewport, size }) => `(max-width: ${maxViewport}px) ${size}`)
        .join(', ')
        .concat(', 100vw')}
      {...props}
      {...dimensions}
      loading={isEager ? 'eager' : 'lazy'}
      className={cn(dimensions.className, 'object-cover cms-image', className)}
    />
  );
};

export { Image };
