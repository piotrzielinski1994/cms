'use client';

import { Image } from '@/components/basic/image/image';
import { ReactContextError } from '@/utils/error';
import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { optional } from '@/utils/optional';
import { cn } from '@/utils/tailwind';
import { X } from 'lucide-react';
import {
  ComponentProps,
  createContext,
  forwardRef,
  PropsWithChildren,
  RefObject,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

// prettier-ignore
type GalleryProps = EnhancedHtmlProps<'div', {
  images: { src: string; alt: string }[];
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
} as const;

const GalleryContext = createContext<{
  state: { activeIndex?: number };
  actions: { setActiveIndex: (index?: number) => void };
  meta: {
    id: string;
    dialogRef: RefObject<HTMLDialogElement | null>;
    radiosRef: RefObject<HTMLInputElement[]>;
    images: GalleryProps['images'];
  };
} | null>(null);

const Provider = (props: PropsWithChildren & Pick<GalleryProps, 'images'>) => {
  const { images, children } = props;
  const id = useId();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const radiosRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (activeIndex !== undefined) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [activeIndex]);

  const value = useMemo(
    () => ({
      state: { activeIndex },
      actions: { setActiveIndex },
      meta: { id, dialogRef, radiosRef, images },
    }),
    [activeIndex, id, images],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div className={cn(styles.root, className)} {...rest} />;
};

const ActiveItem = forwardRef<HTMLDialogElement>((props, ref) => {
  const {
    state: { activeIndex },
    actions: { setActiveIndex },
    meta: { dialogRef, images },
  } = useGallery();

  const activeImage = optional(activeIndex, (it) => images[it]);

  return (
    <dialog
      {...props}
      ref={ref ?? dialogRef}
      className={cn(styles.activeItem)}
      onClick={() => setActiveIndex(undefined)}
      onKeyDown={(e) => {
        if (e.code === 'Escape') setActiveIndex(undefined);
      }}
    >
      {activeImage && (
        <>
          <CloseButton onClick={() => setActiveIndex(undefined)} />
          <ActiveItemImage src={activeImage.src} alt={activeImage.alt} />
        </>
      )}
    </dialog>
  );
});

const ActiveItemImage = ({ className, ...rest }: ComponentProps<typeof Image>) => {
  return <Image {...rest} className={cn(styles.activeItemImage, className)} />;
};

const CloseButton = ({ children, className, ...rest }: HtmlProps<'button'>) => {
  return (
    <button type="button" {...rest} className={cn(styles.closeButton, className)}>
      {children ?? <X />}
    </button>
  );
};

const Items = () => {
  const {
    state: { activeIndex },
    actions: { setActiveIndex },
    meta: { id, radiosRef, images },
  } = useGallery();

  return (
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
                  const currentIndex = radiosRef.current.indexOf(e.currentTarget);
                  const isNext = ['ArrowRight', 'ArrowDown'].includes(e.code);
                  const nextIndex = currentIndex + (isNext ? 1 : -1);
                  radiosRef.current[(nextIndex + images.length) % images.length]?.focus();
                }}
              />
              <ItemImage {...image} />
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const ItemImage = ({ src, alt, className, ...rest }: ComponentProps<typeof Image>) => {
  const defaultSizing = { default: '5rem', sm: '10rem' } satisfies (typeof rest)['sizing'];
  return (
    <Image
      sizing={defaultSizing}
      {...rest}
      src={src}
      alt={alt}
      className={cn(styles.itemImage, className)}
    />
  );
};

const Radio = forwardRef<HTMLInputElement, HtmlProps<'input'>>(({ className, ...rest }, ref) => {
  return <input ref={ref} type="radio" {...rest} className={cn(styles.radio, className)} />;
});

const Gallery = Object.assign(
  ({ images, ...rest }: GalleryProps) => {
    return (
      <Provider images={images}>
        <Root {...rest}>
          <ActiveItem />
          <Items />
        </Root>
      </Provider>
    );
  },
  { Provider, ActiveItem, ActiveItemImage, CloseButton, ItemImage, Radio },
);

const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context) return context;
  throw new ReactContextError('Gallery');
};

export { Gallery, styles, useGallery };
