import { Hero1Block, Page } from '@/payload/payload.types';
import { Hero1 as Hero1Component } from './hero-1';

const Hero1 = ({ heading, subheading, buttons = [] }: Hero1Block) => {
  return (
    <Hero1Component
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

export { Hero1 };
