import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Button as ButtonComponent } from './button';

type Args = ComponentProps<typeof ButtonComponent> & {
  label?: string;
};

const meta: Meta<Args> = {
  component: ButtonComponent,
  title: 'Components/Basic/Button',
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'] satisfies Array<
        ComponentProps<typeof ButtonComponent>['variant']
      >,
    },
    disabled: { control: 'boolean' },
  },
  args: {
    label: DEFAULT_VALUE,
    variant: 'primary',
    disabled: false,
  },
};

const Render = ({ label, ...args }: Args) => {
  const t = useTranslations('storybook.basic.button');
  return (
    <div className="grid gap-4">
      <ButtonComponent {...args}>{getFallback(label, t('default'))}</ButtonComponent>
      <ButtonComponent disabled>{t('disabled')}</ButtonComponent>
      <ButtonComponent variant="secondary">{t('secondary')}</ButtonComponent>
      <ButtonComponent variant="secondary" disabled>
        {t('disabled')}
      </ButtonComponent>
    </div>
  );
};

const Button: StoryObj<typeof ButtonComponent> = { render: Render };

export { Button };
export default meta;
