import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import { findAggregatorPage } from '@/payload/collections/pages/pages.utils';
import { getProducts } from '@/payload/collections/products/products.utils';
import { getLocale } from 'next-intl/server';
import { ProductCard } from '../../advanced/product-card/product-card';

const Products = async () => {
  const locale = await getLocale();
  const [{ docs: products }, aggregator] = await Promise.all([
    getProducts({ locale }),
    findAggregatorPage({ aggregatorOf: 'products' }),
  ]);
  const aggregatorPath = aggregator?.pathPerLocale[locale] ?? '';

  return (
    <Section>
      <Container>
        <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                href={`${aggregatorPath}/${product.slug ?? ''}`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};

export { Products };
