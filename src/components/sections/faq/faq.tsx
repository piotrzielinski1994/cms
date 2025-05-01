import { Accordion } from '@/components/basic/accordion';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { FAQ } from '@/payload/payload.types';
import { cn } from '@/utils/tailwind';
import { RichText } from '@payloadcms/richtext-lexical/react';

const Faq = ({ heading, subheading, items }: FAQ) => {
  const hasHeader = Boolean(heading || subheading);
  return (
    <Section>
      <Container className="grid gap-16">
        {hasHeader && (
          <header className="text-center">
            {heading && <h2 className={cn('text-4xl font-semibold')}>{heading}</h2>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        <Accordion
          items={(items ?? []).map((it) => ({
            heading: it.question,
            content: <RichText data={it.answer} />,
          }))}
        />
      </Container>
    </Section>
  );
};

export { Faq };
