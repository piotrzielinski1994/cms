'use client';

import { Image } from '@/components/basic/image/image';
import { optional } from '@/utils/optional';
import { cn } from '@/utils/tailwind';
import { useId, useState } from 'react';

type GalleryProps = {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
};

type ActiveGalleryItemProps = {
  src: string;
  alt: string;
  className?: string;
};

const Gallery = ({ images, className, ...props }: GalleryProps) => {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const activeImage = optional(activeIndex, (it) => images[it]);

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      {activeImage && <ActiveGalleryItem {...activeImage} />}
      <ul className="flex justify-center gap-4 flex-wrap">
        {images.map(({ src, alt }, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={index}>
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name={`${id}__product_gallery`}
                  checked={isActive}
                  onChange={() => setActiveIndex(index)}
                  className="sr-only"
                />
                <Image
                  src={src}
                  alt={alt}
                  sizing={{ default: '10rem' }}
                  className={cn('w-40 h-40', 'group-focus-within:tw-cms-outline', {
                    'opacity-80': !isActive,
                  })}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ActiveGalleryItem = ({ className, alt, ...props }: ActiveGalleryItemProps) => {
  return <Image {...props} alt={alt} className={cn('fixed z-50', className)} />;
};

export { Gallery };
