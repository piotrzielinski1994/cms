import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
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
  return (
    <Section>
      <Container className="flex gap-4 flex-wrap">
        {products.map((product) => {
          return <ProductCard key={product.id} className="basis-40" product={product} />;
        })}
      </Container>
    </Section>
  );
};

export { Products };
