import { Image } from '@/components/basic/image/image';
import { cn } from '@/utils/tailwind';
import { useEffect, useId, useRef, useState } from 'react';

type ProductGalleryProps = {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
};

const ProductGallery = ({ images, className, ...props }: ProductGalleryProps) => {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const activeImage = images[activeIndex];

  useEffect(() => {
    if (isMaximized) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isMaximized]);

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <dialog
        ref={dialogRef}
        onClick={() => setIsMaximized(false)}
        onKeyDown={(e) => {
          if (e.code !== 'Escape') return;
          setIsMaximized(false);
        }}
      >
        <Image src={activeImage.src} alt={activeImage.alt} />
      </dialog>
      <button type="button" onClick={() => setIsMaximized(true)}>
        <Image src={activeImage.src} alt={activeImage.alt} isEager />
      </button>
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
                  sizing={{ default: '3.5rem' }}
                  className={cn('w-14 h-14', 'group-focus-within:tw-cms-outline', {
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

export { ProductGallery };
