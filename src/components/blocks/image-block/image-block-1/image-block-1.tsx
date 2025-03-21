import { cn } from '@/_old/utilities/ui';
import ButtonLink from '@/components/basic/button-link/button-link';
import Image from '@/components/basic/image/image';
import * as PayloadTypes from '@/payload/payload.types';
import { ImageBlock1Props } from './image-block-1.types';

const ImageBlock1 = ({ isReversed, media, heading, subheading, cta }: ImageBlock1Props) => {
  // @ts-expect-error
  const path = cta?.reference?.value.path;
  const asd = media as PayloadTypes.Image;
  return (
    <div className="border-2 border-gray-600 grid md:grid-cols-2">
      <div
        className={cn(
          'grid justify-items-start content-center gap-4',
          isReversed ? 'md:order-2' : 'md:order-1',
        )}
      >
        <h3 className="text-4xl font-semibold">{heading}</h3>
        {subheading && <p>{subheading}</p>}
        {cta && (
          <ButtonLink href={`${path}${cta.selector ? '#' + cta.selector : ''}`}>
            {cta.label}
          </ButtonLink>
        )}
      </div>
      <div className={cn('border-2 border-gray-600', isReversed ? 'md:order-1' : 'md:order-2')}>
        <Image {...asd} />
        {/* <Media resource={media} src={''} /> */}
      </div>
    </div>
  );
};

export default ImageBlock1;
