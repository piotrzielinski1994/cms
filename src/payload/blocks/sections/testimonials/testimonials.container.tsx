import { Testimonials } from '@/components/sections/testimonials/testimonials';
import type { Image, TestimonialsBlock } from '@/payload/payload.types';

const TestimonialsContainer = ({ heading, subheading, items = [] }: TestimonialsBlock) => {
  return (
    <Testimonials
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      items={(items ?? []).map((item) => ({
        image: (item.image as Image).url ?? '',
        quote: item.quote,
        name: item.name,
        annotation: item.annotation ?? undefined,
      }))}
    />
  );
};

export { TestimonialsContainer };
