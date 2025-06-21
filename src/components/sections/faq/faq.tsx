import { Accordion } from '@/components/basic/accordion/accordion';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { HTMLAttributes, ReactNode } from 'react';

type FaqProps = HTMLAttributes<HTMLElement> & {
  heading?: string;
  subheading?: string;
  items: {
    question: string;
    answer: ReactNode;
  }[];
};

const Faq = ({ heading, subheading, items, ...props }: FaqProps) => {
  const hasHeader = Boolean(heading || subheading);

  return (
    <Section {...props}>
      <Container className="grid gap-16">
        {hasHeader && (
          <header className="text-center">
            {heading && <h2 className={cn('text-4xl font-semibold')}>{heading}</h2>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        <Accordion
          items={items.map((it) => ({
            heading: it.question,
            content: it.answer,
          }))}
        />
      </Container>
    </Section>
  );
};

export { Faq };
