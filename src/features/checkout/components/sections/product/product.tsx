import { Accordion } from '@/components/advanced/accordion/accordion';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import { ProductPrice } from '@/features/checkout/components/basic/product-price/product-price';
import { Product as ProductType } from '@/payload/payload.types';
import { cn } from '@/utils/tailwind';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { PurchaseContainer } from './purchase/purchase.container';
import { ThemedGallery } from './themed-gallery';

type ProductProps = {
  product: ProductType;
};

const formatPrice = (priceInUSD?: number | null) => {
  if (typeof priceInUSD !== 'number') return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    priceInUSD / 100,
  );
};

const Product = ({ product }: ProductProps) => {
  const galleryImages =
    product.gallery
      ?.map((entry) => {
        if (typeof entry.image !== 'object' || !entry.image) return null;
        if (!entry.image.url) return null;
        return { src: entry.image.url, alt: entry.image.alt ?? product.title ?? '' };
      })
      .filter((it): it is { src: string; alt: string } => it !== null) ?? [];

  return (
    <Section>
      <Container
        className={cn(
          'grid grid-rows-[auto_1fr] gap-8 content-start',
          'sm:grid-cols-3 sm:items-start',
        )}
      >
        <ThemedGallery
          className="sm:col-span-2"
          images={galleryImages}
          productTitle={product.title ?? ''}
        />
        <div
          className={cn(
            'p-4 md:p-6',
            'bg-background1',
            'grid gap-4 justify-items-start',
            'sm:col-span-1 sm:row-span-2',
          )}
        >
          <header>
            <h1 className="text-2xl font-semibold leading-none">{product.title}</h1>
          </header>
          <ProductPrice current={formatPrice(product.priceInUSD)} />
          <PurchaseContainer product={product} />
        </div>
        {product.description && (
          <Accordion
            className="sm:col-span-2"
            activeItemIndex={0}
            items={[
              {
                heading: 'Product description',
                content: <RichText data={product.description} />,
              },
            ]}
          />
        )}
      </Container>
    </Section>
  );
};

export { Product };
