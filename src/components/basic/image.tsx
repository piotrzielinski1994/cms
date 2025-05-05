import { cn } from '@/utils/tailwind';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import defaultTheme from 'tailwindcss/defaultTheme';

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: {
    width: number;
    height: number;
  };
};

const sizesPerBreakpoint = Object.values(defaultTheme.screens)
  .map((it) => parseInt(it))
  .sort((a, b) => a - b)
  .map((it) => `(max-width: ${it}px) 100vw`)
  .join(', ');

const Image = ({ aspectRatio, className, ...props }: ImageProps) => {
  const sizing: Partial<NextImageProps> = aspectRatio ?? {
    width: 0,
    height: 0,
    className: 'w-full h-auto',
  };

  return (
    <NextImage
      objectFit="cover"
      sizes={sizesPerBreakpoint}
      {...props}
      {...sizing}
      className={cn(sizing.className, 'cms-image', className)}
    />
  );
};

export { Image };
