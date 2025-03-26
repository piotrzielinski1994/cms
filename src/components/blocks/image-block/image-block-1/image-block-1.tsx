import { cn } from '@/_old/utilities/ui';
import ButtonLink from '@/components/basic/button-link/button-link';
import Image from '@/components/basic/image/image';
import * as PayloadTypes from '@/payload/payload.types';
import { ImageBlock1Props } from './image-block-1.types';

const ImageBlock1 = ({ isReversed, image, heading, subheading, buttons }: ImageBlock1Props) => {
  const asd = image as PayloadTypes.Image;
  return (
    <div className="grid md:grid-cols-2">
      <div
        className={cn(
          'grid justify-items-start content-center gap-4',
          isReversed ? 'md:order-2' : 'md:order-1',
        )}
      >
        <h3 className="text-4xl font-semibold">{heading}</h3>
        {subheading && <p>{subheading}</p>}
        {buttons?.map((button) => {
          // @ts-expect-error
          const path = button?.reference?.value.path;
          return (
            <ButtonLink
              key={button.label}
              href={`${path}${button.selector ? '#' + button.selector : ''}`}
            >
              {button.label}
            </ButtonLink>
          );
        })}
      </div>
      <div className={cn(isReversed ? 'md:order-1' : 'md:order-2')}>
        <Image {...asd} />
        {/* <Media resource={media} src={''} /> */}
      </div>
    </div>
  );
};

export default ImageBlock1;
