import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Hero1 as Hero1Component } from './hero-1';

type Args = ComponentProps<typeof Hero1Component>;

const meta: Meta<Args> = {
  component: Hero1Component,
  title: 'Sections/Hero/Hero1',
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    buttons: { control: 'object' },
  },
  args: {
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    buttons: [
      { label: DEFAULT_VALUE, href: '/path-1', variant: 'primary' },
      { label: DEFAULT_VALUE, href: '/path-2', variant: 'secondary' },
    ],
  },
};

const Render = ({ heading, subheading, buttons }: Args) => {
  const t = useTranslations('fields');
  const tButton = useTranslations('storybook.basic.button');
  return (
    <Hero1Component
      id={THUMBNAIL_ID}
      heading={getFallback(heading, t('heading'))}
      subheading={getFallback(subheading, t('subheading'))}
      buttons={buttons?.map((it, index) => ({
        ...it,
        label: getFallback(it.label, `${tButton('default')} ${index + 1}`),
      }))}
    />
  );
};

const Hero1: StoryObj<typeof Hero1Component> = { render: Render };

export { Hero1 };
export default meta;
