import type { ComponentProps } from 'react';
import { Testimonial } from '@/components/advanced/testimonial/testimonial';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import type { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type TestimonialsProps = HtmlProps<'section'> & {
  heading?: string;
  subheading?: string;
  items?: Array<
    Pick<ComponentProps<typeof Testimonial>, 'image' | 'quote' | 'name' | 'annotation'>
  >;
};

const Testimonials = ({
  heading,
  subheading,
  items = [],
  className,
  ...rest
}: TestimonialsProps) => {
  const hasHeader = Boolean(heading || subheading);

  return (
    <Section {...rest} className={className}>
      <Container className="grid gap-8">
        {hasHeader && (
          <header className="text-center">
            {heading && <h2 className={cn('text-5xl font-semibold')}>{heading}</h2>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Testimonial key={item.quote} {...item} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export { Testimonials };
