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

const Gallery = ({ images, className, ...props }: GalleryProps) => {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const radiosRef = useRef<HTMLInputElement[]>([]);

  const activeImage = optional(activeIndex, (it) => images[it]);

  useEffect(() => {
    if (activeIndex !== undefined) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [activeIndex]);

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <dialog
        ref={dialogRef}
        onClick={() => setActiveIndex(undefined)}
        onKeyDown={(e) => {
          if (e.code !== 'Escape') return;
          setActiveIndex(undefined);
        }}
      >
        {activeImage && <Image src={activeImage.src} alt={activeImage.alt} />}
      </dialog>
      <ul className="flex justify-center gap-4 flex-wrap">
        {images.map(({ src, alt }, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={index}>
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name={`${id}__product_gallery`}
                  className="sr-only"
                  checked={isActive}
                  ref={(el) => {
                    if (!el) return;
                    radiosRef.current[index] = el;
                  }}
                  onChange={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (!e.code.startsWith('Arrow')) return;
                    e.preventDefault();
                    const index = radiosRef.current.indexOf(e.currentTarget);
                    const isNext = ['ArrowRight', 'ArrowDown'].includes(e.code);
                    const nextIndex = index + (isNext ? 1 : -1);
                    radiosRef.current[(nextIndex + images.length) % images.length]?.focus();
                  }}
                />
                <Image
                  src={src}
                  alt={alt}
                  sizing={{ default: '5rem', sm: '10rem' }}
                  className={cn(
                    'w-20 h-20',
                    'sm:w-40 sm:h-40',
                    'group-focus-within:tw-cms-outline',
                  )}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { Gallery };
