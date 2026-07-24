import { Cta } from '@/components/sections/cta/cta';
import type { CtaBlock, Page } from '@/payload/payload.types';

const CtaContainer = ({ heading, subheading, buttons = [] }: CtaBlock) => {
  return (
    <Cta
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      buttons={buttons?.map((button, index) => {
        const href = (button?.reference?.value as Page).path ?? '';
        const variant = index === 0 ? 'primary' : 'secondary';
        return { label: button.label, href, variant };
      })}
    />
  );
};

export { CtaContainer };
