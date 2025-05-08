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
  const dialogRef = useRef<HTMLDialogElement>(null);

  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     if (!containerRef.current?.contains(e.target as Node)) {
  //       setActiveIndex(undefined);
  //     }
  //   };
  //   document.addEventListener('click', handleClick);
  //   return () => document.removeEventListener('click', handleClick);
  // }, []);

  useEffect(() => {
    if (activeIndex !== undefined) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden'; // Prevent scrolling when image is active
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = ''; // Re-enable scrolling when image is not active
    }
  }, [activeIndex]);

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <div ref={containerRef}>
        {/* {activeImage && <ActiveGalleryItem {...activeImage} />} */}
        {activeImage && (
          <dialog ref={dialogRef} onClick={() => setActiveIndex(undefined)} className="p-0">
            {activeImage && <ActiveGalleryItem {...activeImage} />}
          </dialog>
        )}
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
                    onChange={(e) => {
                      if (e.nativeEvent instanceof KeyboardEvent) {
                        const key = e.nativeEvent.key;
                        if (key === 'Enter' || key === ' ') {
                          setActiveIndex(index);
                        }
                      }
                    }}
                    className="sr-only"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveIndex(index);
                      } else if (e.key === 'Escape') {
                        setActiveIndex(undefined);
                      }
                    }}
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
