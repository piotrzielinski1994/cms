'use client';

import { Image } from '@/components/basic/image/image';
import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { optional } from '@/utils/optional';
import { cn } from '@/utils/tailwind';
import { X } from 'lucide-react';
import { ComponentProps, forwardRef, useEffect, useId, useRef, useState } from 'react';

// prettier-ignore
type GalleryProps = EnhancedHtmlProps<'div', {
  images: {
    src: string;
    alt: string;
  }[];
}>;

const styles = {
  root: 'grid gap-4',
  activeItem: cn('fixed inset-0', 'w-full h-full max-w-none max-h-none p-4'),
  activeItemImage: cn('h-full w-full', 'object-contain'),
  closeButton: 'absolute top-2 right-2 p-2 cursor-pointer',
  items: 'flex justify-center gap-4 flex-wrap',
  item: 'group cursor-pointer',
  itemImage: cn('w-20 h-20', 'sm:w-40 sm:h-40', 'group-has-[:focus-visible]:tw-cms-outline'),
  radio: 'sr-only',
};

const Component = ({ images, ...rest }: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const radiosRef = useRef<HTMLInputElement[]>([]);
  const id = useId();

  const activeImage = optional(activeIndex, (it) => images[it]);

  useEffect(() => {
    if (activeIndex !== undefined) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [activeIndex]);

  return (
    <Root {...rest}>
      <ActiveItem
        ref={dialogRef}
        onClick={() => setActiveIndex(undefined)}
        onKeyDown={(e) => {
          if (e.code !== 'Escape') return;
          setActiveIndex(undefined);
        }}
      >
        {activeImage && (
          <>
            <CloseButton onClick={() => setActiveIndex(undefined)} />
            <ActiveItemImage src={activeImage.src} alt={activeImage.alt} />
          </>
        )}
      </ActiveItem>
      <ul className={styles.items}>
        {images.map((image, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={index}>
              <label className={styles.item}>
                <Radio
                  name={`${id}__product_gallery`}
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
                <ItemImage {...image} />
              </label>
            </li>
          );
        })}
      </ul>
    </Root>
  );
};

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div className={cn(styles.root, className)} {...rest} />;
};

const ActiveItem = forwardRef<HTMLDialogElement, HtmlProps<'dialog'>>((props, ref) => {
  const { className, ...rest } = props;
  return <dialog ref={ref} {...rest} className={cn(styles.activeItem, className)} />;
});

const ActiveItemImage = ({ src, alt, className, ...rest }: ComponentProps<typeof Image>) => {
  return <Image {...rest} src={src} alt={alt} className={cn(styles.activeItemImage, className)} />;
};

const CloseButton = ({ children, className, ...rest }: HtmlProps<'button'>) => {
  return (
    <button type="button" {...rest} className={cn(styles.closeButton, className)}>
      {children ?? <X />}
    </button>
  );
};

const ItemImage = ({ src, alt, className, ...rest }: ComponentProps<typeof Image>) => {
  const classNames = cn(styles.itemImage, className);
  const defaultSizing = { default: '5rem', sm: '10rem' } satisfies (typeof rest)['sizing'];
  return <Image sizing={defaultSizing} {...rest} src={src} alt={alt} className={classNames} />;
};

const Radio = forwardRef<HTMLInputElement, HtmlProps<'input'>>(({ className, ...rest }, ref) => {
  return <input ref={ref} type="radio" {...rest} className={cn(styles.radio, className)} />;
});

const Gallery = Object.assign(Component, {
  Root,
  ActiveItem,
  ActiveItemImage,
  CloseButton,
  ItemImage,
  Radio,
});

export { Gallery, styles };
