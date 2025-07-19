import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Link as LinkComponent } from './link';

type Args = ComponentProps<typeof LinkComponent>;

const meta = {
  component: LinkComponent,
  title: 'Basic/Link',
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    href: '/',
    children: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ children, ...args }: Args) => {
  const t = useTranslations('common');
  return <LinkComponent {...args}>{getFallback(children, t('link'))}</LinkComponent>;
};

const Link: StoryObj<typeof LinkComponent> = { render: Render };

export { Link };
export default meta;
