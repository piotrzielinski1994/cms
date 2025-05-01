import { Accordion } from '@/components/basic/accordion';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { FAQ } from '@/payload/payload.types';
import { cn } from '@/utils/tailwind';
import { RichText } from '@payloadcms/richtext-lexical/react';

const Faq = (props: FAQ) => {
  const items = (props.items ?? []).map((it) => ({
    heading: it.question,
    content: <RichText data={it.answer} />,
  }));

  return (
    <Section>
      <Container>
        <header className="text-center">
          <h2 className={cn('text-4xl font-semibold')}>{props.heading}</h2>
        </header>
        <Accordion items={items} />
      </Container>
    </Section>
  );
};

export { Faq };
