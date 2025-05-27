'use client';

import { Accordion } from '@/components/basic/accordion/accordion';
import { Button } from '@/components/basic/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { useHeaderHeight } from '@/components/layout/header/header.hooks';
import { ProductPrice } from '@/features/products/components/basic/product-price/product-price';
import { ProductVariants } from '@/features/products/components/basic/product-variants/product-variants';
import placeholderDarkWebp from '@/placeholders/placeholder-dark.webp';
import placeholderWebp from '@/placeholders/placeholder.webp';
import { cn } from '@/utils/tailwind';
import { ProductGallery } from '../../basic/product-gallery/product-gallery';

const Product = () => {
  const headerHeight = useHeaderHeight();

  return (
    <Section>
      <Container
        className={cn(
          'grid grid-rows-[auto_1fr] gap-8 content-start',
          `sm:grid-cols-3 sm:items-start`,
        )}
      >
        <ProductGallery
          className="sm:col-span-2"
          images={[
            { src: placeholderWebp.src, alt: 'Light placeholder' },
            { src: placeholderDarkWebp.src, alt: 'Dark placeholder' },
          ]}
        />
        <div
          className={cn(
            'bg-background1',
            'grid gap-4 justify-items-start',
            'sm:col-span-1 sm:row-span-2',
            `sm:sticky`,
          )}
          style={{ top: `${headerHeight}px` }} // TODO: Check why the `sm:top-[${headerHeight}px]` doesn't work
        >
          <header>
            <h1 className="text-2xl font-semibold leading-none">PRODUCT</h1>
            <span>
              <strong className="font-semibold">Product code:</strong> 123-123-123-123-123-123
            </span>
          </header>
          <ProductPrice current="$5.00 - $10.00" last30Days="$15.00" regular="$20.00" />
          <ProductVariants />
          <Button>Add to cart</Button>
        </div>
        <Accordion
          className={cn('sm:col-span-2')}
          activeItemIndex={0}
          items={[
            {
              heading: 'Product description',
              content: (
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
              ),
            },
          ]}
        />
      </Container>
    </Section>
  );
};

export { Product };
