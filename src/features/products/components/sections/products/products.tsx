'use client';

import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '../../advanced/product-card/product-card';

const products = Array.from({ length: 5 }, (_, i) => i).map((it) => {
  return {
    id: it,
    slug: `product-${it}`,
    name: `Product ${it}`,
    price: `$${(it * 10).toFixed(2)}`,
  };
});

const Products = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  return (
    <Section>
      <Container>
        <div className="flex justify-end">
          <button type="button" onClick={() => setLayout('grid')} className="p-2">
            <LayoutGrid />
          </button>
          <button type="button" onClick={() => setLayout('list')} className="p-2">
            <LayoutList />
          </button>
        </div>
        <ul
          className={cn('grid gap-4', {
            'grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]': layout === 'grid',
            'grid-cols-1': layout === 'list',
          })}
        >
          {products.map((product) => {
            return (
              <li key={product.id}>
                <ProductCard product={product} layout={layout} />
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
};

export { Products };
