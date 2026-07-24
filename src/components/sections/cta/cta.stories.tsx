import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import { Cta as CtaComponent } from './cta';

type Args = ComponentProps<typeof CtaComponent>;

const meta: Meta<Args> = {
  component: CtaComponent,
  title: 'Sections/Cta',
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
    <CtaComponent
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

const Cta: StoryObj<typeof CtaComponent> = { render: Render };

export { Cta };
export default meta;
