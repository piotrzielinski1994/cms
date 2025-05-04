import { Button } from '@/components/basic/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { ProductVariants } from '@/features/checkout/components/basic/product-variants/product-variants';

const Product = () => {
  return (
    <Section>
      <Container className="bg-background1 grid gap-2">
        <img src="https://placehold.co/600x400" />
        <h1>PRODUCT</h1>
        <span>$10.00</span>
        <div>
          {Array.from({ length: 2 }, (_, i) => i).map((group) => {
            return (
              <ProductVariants
                key={group}
                name={`group-${group}`}
                label={`Variant group ${group}`}
                variants={Array.from({ length: 5 }, (_, i) => i).map((it) => {
                  return {
                    value: String(it),
                    label: `Variant ${it}`,
                  };
                })}
              />
            );
          })}
          <Button>Add to cart</Button>
        </div>
      </Container>
    </Section>
  );
};

export { Product };
