import { Image as ImageModel } from '@/payload/payload.types';
import NextImage from 'next/image';

const Image = (props: ImageModel) => {
  return (
    <picture className="relative">
      <NextImage
        src={props.url ?? ''}
        alt={props.alt}
        fill={!props.width}
        width={props.width!}
        height={props.height!}
        placeholder="blur"
        blurDataURL="/images/shapes-1-100x42.jpg"
      />
    </picture>
  );
};

export { Image };
