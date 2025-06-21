import { Faq } from '@/components/sections/faq/faq';
import { FAQ } from '@/payload/payload.types';

const FaqContainer = ({ heading, subheading, items }: FAQ) => {
  return (
    <Faq heading={heading ?? undefined} subheading={subheading ?? undefined} items={items ?? []} />
  );
};

export { FaqContainer };
