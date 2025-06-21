import { Hero1 } from '@/components/sections/hero/hero-1/hero-1';
import { Hero1Block, Page } from '@/payload/payload.types';

const Hero1Container = ({ heading, subheading, buttons = [] }: Hero1Block) => {
  return (
    <Hero1
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

export { Hero1Container };
