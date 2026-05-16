'use client';

import { ButtonLink } from '@/components/basic/button/button';
import { Image } from '@/components/basic/image/image';
import { Product } from '@/payload/payload.types';
import { placeholderDarkWebp, placeholderWebp } from '@/placeholders';
import { useThemeStore } from '@/store/theme';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { useTranslations } from 'next-intl';

type ProductCardProps = HtmlProps<'div'> & {
  layout?: 'grid' | 'list';
  product: Product;
  href: string;
};

const formatPrice = (priceInUSD?: number | null) => {
  if (typeof priceInUSD !== 'number') return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    priceInUSD / 100,
  );
};

const ProductCard = ({ product, href, layout = 'grid', className, ...props }: ProductCardProps) => {
  const t = useTranslations('frontend.product');
  const { themeConfig } = useThemeStore();
  const prefersDark = themeConfig.colorPreference === 'dark';
  const placeholder = prefersDark ? placeholderDarkWebp : placeholderWebp;

  const firstGalleryImage =
    typeof product.gallery?.[0]?.image === 'object' ? product.gallery?.[0]?.image : null;
  const imageSrc = firstGalleryImage?.url ?? placeholder.src;
  const imageAlt = firstGalleryImage?.alt ?? product.title ?? 'product';

  return (
    <div
      {...props}
      className={cn(
        {
          'grid justify-items-start': layout === 'grid',
          'flex items-center': layout === 'list',
        },
        'bg-background1',
        className,
      )}
    >
      <div className="w-full aspect-square bg-background1 overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} className="w-full h-full" />
      </div>
      <div className={cn('p-4 md:p-6', 'grid gap-2')}>
        <div>
          <h2>{product.title}</h2>
          <span>{formatPrice(product.priceInUSD)}</span>
        </div>
        <ButtonLink href={href}>{t('buyNow')}</ButtonLink>
      </div>
    </div>
  );
};

export { ProductCard };
