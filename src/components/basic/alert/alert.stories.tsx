import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Alert as AlertComponent } from './alert';

type Args = ComponentProps<typeof AlertComponent>;

const meta = {
  component: AlertComponent,
  title: 'Components/Basic/Alert',
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'warn', 'error'] satisfies Array<Args['type']>,
    },
    children: { control: 'text' },
  },
  args: {
    type: 'info',
    children: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ children, ...args }: Args) => {
  const t = useTranslations('storybook.basic.alert');
  return (
    <div className="grid gap-4">
      <AlertComponent {...args}>{getFallback(children, t('info'))}</AlertComponent>
      <AlertComponent type="success">{t('success')}</AlertComponent>
      <AlertComponent type="warn">{t('warn')}</AlertComponent>
      <AlertComponent type="error">{t('error')}</AlertComponent>
    </div>
  );
};

const Alert: StoryObj<typeof AlertComponent> = { render: Render };

export { Alert };
export default meta;
