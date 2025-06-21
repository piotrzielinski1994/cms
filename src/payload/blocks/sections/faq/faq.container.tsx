import { Faq } from '@/components/sections/faq/faq';
import { FAQ } from '@/payload/payload.types';
import { RichText } from '@payloadcms/richtext-lexical/react';

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
