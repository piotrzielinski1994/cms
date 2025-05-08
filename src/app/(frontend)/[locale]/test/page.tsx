import { Gallery } from '@/components/advanced/gallery/gallery';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { Product } from '@/features/products/components/sections/product/product';

const TestPage = () => {
  return (
    <>
      <Section>
        <Container>
          <Gallery
            images={['blue.jpg', 'black.jpg', 'green.jpg', 'red.jpg', 'white.jpg'].map((it) => ({
              src: `/images/test/${it}`,
              alt: it,
            }))}
          />
        </Container>
      </Section>
      <Product />
    </>
  );
};

export default TestPage;
