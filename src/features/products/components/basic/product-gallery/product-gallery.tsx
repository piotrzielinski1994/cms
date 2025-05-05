import { Image } from '@/components/basic/image';
import { cn } from '@/utils/tailwind';
import { useId, useState } from 'react';

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

  const activeImage = images[activeIndex];

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <Image src={activeImage.src} alt={activeImage.alt} />
      <ul className="flex justify-center gap-4 flex-wrap">
        {images.map(({ src, alt }, index) => {
          return (
            <li key={index}>
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name={`${id}__product_gallery`}
                  checked={activeIndex === index}
                  onChange={() => setActiveIndex(index)}
                  className="sr-only"
                />
                <Image
                  src={src}
                  alt={alt}
                  className="w-14 h-14 group-focus-within:tw-cms-outline"
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
