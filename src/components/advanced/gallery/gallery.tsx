'use client';

import { Image } from '@/components/basic/image/image';
import { optional } from '@/utils/optional';
import { cn } from '@/utils/tailwind';
import { useEffect, useId, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const activeImage = optional(activeIndex, (it) => images[it]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setActiveIndex(undefined);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <div ref={containerRef}>
        {activeImage && <ActiveGalleryItem {...activeImage} />}
        <ul
          className="flex justify-center gap-4 flex-wrap"
          onClick={() => setActiveIndex(undefined)}
        >
          {images.map(({ src, alt }, index) => {
            const isActive = activeIndex === index;
            return (
              <li key={index}>
                <label className="group cursor-pointer" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};

const ActiveGalleryItem = ({ className, alt, ...props }: ActiveGalleryItemProps) => {
  return <Image {...props} alt={alt} className={cn('fixed z-50', className)} />;
};

export { Gallery };
