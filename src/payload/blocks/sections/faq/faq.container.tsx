import { RichText } from '@payloadcms/richtext-lexical/react';
import { Faq } from '@/components/sections/faq/faq';
import type { FAQ } from '@/payload/payload.types';

const FaqContainer = ({ heading, subheading, items }: FAQ) => {
  return (
    <Faq
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      items={(items ?? []).map((it) => {
        return {
          question: it.question,
          answer: <RichText data={it.answer} />,
        };
      })}
    />
  );
};

export { FaqContainer };
