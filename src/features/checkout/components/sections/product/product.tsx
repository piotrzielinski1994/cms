'use client';

import { Button } from '@/components/basic/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { useHeaderHeight } from '@/components/layout/header/header.hooks';
import { ProductPrice } from '@/features/checkout/components/basic/product-price/product-price';
import { ProductVariants } from '@/features/checkout/components/basic/product-variants/product-variants';
import { cn } from '@/utils/tailwind';

const Product = () => {
  const headerHeight = useHeaderHeight();
  return (
    <Section>
      <Container
        className={cn(
          'bg-background1 grid gap-8 justify-items-start',
          `sm:grid-cols-5 sm:items-start`,
        )}
      >
        <img src="https://placehold.co/600x400" className={cn('sm:col-span-3')} />
        <div
          className={cn(
            'grid gap-4 justify-items-start',
            'sm:col-span-2 sm:row-span-2',
            `sm:sticky sm:top-[${headerHeight}px]`,
          )}
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
        <div className={cn('sm:col-span-3')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </div>
      </Container>
    </Section>
  );
};

export { Product };
