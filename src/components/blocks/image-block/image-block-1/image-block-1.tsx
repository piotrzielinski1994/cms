import { cn } from '@/_old/utilities/cn';
import ButtonLink from '@/components/basic/button-link/button-link';
import { ImageBlock1Props } from './image-block-1.types';

const ImageBlock1 = ({ heading, subheading, cta }: ImageBlock1Props) => {
  const path = cta?.reference?.value.path;

  return (
    <div className={cn('border-2 border-gray-600', 'grid md:grid-cols-2')}>
      <div className={cn('grid', 'justify-items-start content-center gap-4')}>
        <h3 className={cn('text-4xl font-semibold')}>{heading}</h3>
        {subheading && <p>{subheading}</p>}
        {cta && (
          <ButtonLink href={`${path}${cta.selector ? '#' + cta.selector : ''}`}>
            {cta.label}
          </ButtonLink>
        )}
      </div>
      <div className="border-2 border-gray-600">IMAGE</div>
    </div>
  );
};

export default ImageBlock1;
