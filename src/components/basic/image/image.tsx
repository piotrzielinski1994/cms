import NextImage from 'next/image';
// import { ImageProps } from './image.types';
import { cssVariables } from '@/_old/cssVariables';

const { breakpoints } = cssVariables;

const Image = (props: any) => {
  console.log('@@@ props | ', props);
  const sizes = props.size
    ? props.size
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ');
  console.log('@@@ sizes | ', sizes);
  return (
    <picture className="relative">
      {/* <NextImage src={props.src} alt={props.alt} width={1000} height={1000} /> */}
      <NextImage
        src={props.url}
        alt={props.alt}
        fill={!props.width}
        width={props.width}
        height={props.height}
        // sizes={sizes}
      />
    </picture>
  );
};

export default Image;
