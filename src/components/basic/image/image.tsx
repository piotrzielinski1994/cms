import { cssVariables } from '@/_old/cssVariables';
import NextImage from 'next/image';

const { breakpoints } = cssVariables;

const Image = (props: any) => {
  const sizes = false
    ? props.sizes
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ');

  return (
    <picture className="relative">
      <NextImage
        src={props.url}
        alt={props.alt}
        fill={!props.width}
        width={props.width}
        height={props.height}
        // sizes="100vw"
        sizes={sizes}
        placeholder="blur"
        blurDataURL="/images/shapes-1-100x42.jpg"
      />
    </picture>
  );
};

export { Image };
