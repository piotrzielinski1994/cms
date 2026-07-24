import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import { Card as CardComponent } from './card';

type Args = ComponentProps<typeof CardComponent>;

const meta = {
  component: CardComponent,
  title: 'Basic/Card',
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    children: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ children, ...args }: Args) => {
  const t = useTranslations('storybook.basic.card');
  return (
    <div className="grid gap-4">
      <CardComponent {...args} header={t('header')} footer={t('footer')}>
        {getFallback(children, t('body'))}
      </CardComponent>
      <CardComponent>{t('body')}</CardComponent>
    </div>
  );
};

const Card: StoryObj<typeof CardComponent> = { render: Render };

export { Card };
export default meta;
