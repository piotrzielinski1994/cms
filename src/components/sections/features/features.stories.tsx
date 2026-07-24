import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import { Features as FeaturesComponent } from './features';

type Args = ComponentProps<typeof FeaturesComponent>;

const meta: Meta<Args> = {
  component: FeaturesComponent,
  title: 'Sections/Features',
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    items: { control: 'object' },
  },
  args: {
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    items: [
      { icon: 'rocket', title: DEFAULT_VALUE, description: DEFAULT_VALUE },
      { icon: 'zap', title: DEFAULT_VALUE, description: DEFAULT_VALUE },
      { icon: 'shield', title: DEFAULT_VALUE, description: DEFAULT_VALUE },
    ],
  },
};

const Render = ({ heading, subheading, items = [] }: Args) => {
  const t = useTranslations('fields');
  return (
    <FeaturesComponent
      id={THUMBNAIL_ID}
      heading={getFallback(heading, t('heading'))}
      subheading={getFallback(subheading, t('subheading'))}
      items={items.map((item) => ({
        ...item,
        title: getFallback(item.title, t('title')),
        description: getFallback(item.description, t('description')),
      }))}
    />
  );
};

const Features: StoryObj<typeof FeaturesComponent> = { render: Render };

export { Features };
export default meta;
