import { Features } from '@/components/sections/features/features';
import type { FeaturesBlock } from '@/payload/payload.types';

const FeaturesContainer = ({ heading, subheading, items = [] }: FeaturesBlock) => {
  return (
    <Features
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      items={(items ?? []).map((item) => ({
        icon: item.icon ?? undefined,
        title: item.title,
        description: item.description ?? undefined,
      }))}
    />
  );
};

export { FeaturesContainer };
