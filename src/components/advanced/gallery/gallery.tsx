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
  const radiosRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (activeIndex !== undefined) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = '';
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(undefined);
      }
    };

    const dialog = dialogRef.current;
    dialog?.addEventListener('keydown', handleEsc);

    return () => {
      dialog?.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <div ref={containerRef}>
        <dialog ref={dialogRef} onClick={() => setActiveIndex(undefined)} className="p-0">
          {activeImage && <ActiveGalleryItem {...activeImage} />}
        </dialog>
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
                    className="sr-only"
                    checked={isActive}
                    ref={(el) => {
                      if (!el) return;
                      radiosRef.current[index] = el;
                    }}
                    onChange={() => setActiveIndex(index)}
                    onKeyDown={(e) => {
                      console.log('@@@ e.code | ', e.code);
                      if (!e.key.startsWith('Arrow')) return;
                      e.preventDefault();
                      const index = radiosRef.current.indexOf(e.currentTarget);
                      const isNext = ['ArrowRight', 'ArrowDown'].includes(e.key);
                      const nextIndex = index + (isNext ? 1 : -1);
                      radiosRef.current[(nextIndex + images.length) % images.length]?.focus();
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
