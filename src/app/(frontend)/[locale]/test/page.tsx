import { Gallery } from '@/components/advanced/gallery/gallery';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { Product } from '@/features/products/components/sections/product/product';
import placeholderDarkWebp from '@/placeholders/placeholder-dark.webp';
import placeholderWebp from '@/placeholders/placeholder.webp';

const TestPage = () => {
  return (
    <>
      <Section>
        <Container>
          <Gallery
            images={[
              placeholderWebp.src,
              placeholderDarkWebp.src,
              placeholderWebp.src,
              placeholderDarkWebp.src,
              placeholderWebp.src,
              placeholderDarkWebp.src,
            ].map((it) => ({ src: it, alt: it }))}
          />
        </Container>
      </Section>
      <Product />
    </>
  );
};

export default TestPage;
