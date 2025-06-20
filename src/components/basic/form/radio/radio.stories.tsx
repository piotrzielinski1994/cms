import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { Radio as RadioComponent } from './radio';

type Args = ComponentProps<typeof RadioComponent>;

const meta: Meta<Args> = {
  component: RadioComponent,
  title: 'Components/Basic/Form/Radio',
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    name: { table: { disable: true } },
  },
  args: {
    label: DEFAULT_VALUE,
    disabled: false,
  },
};

const Render = ({ label, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form.radio');
  const [selected, setSelected] = useState('');

  const radiosProps = [
    { ...args, label: getFallback(label, t('default.label')) },
    { label: t('disabled.label'), disabled: true },
    { label: t('invalid.label'), error: t('invalid.error') },
  ];

  return (
    <div role="radiogroup" aria-invalid={!!args.error}>
      {radiosProps.map((props, index) => {
        return (
          <RadioComponent
            key={index}
            {...props}
            name="group"
            value={index.toString()}
            checked={selected === index.toString()}
            onChange={(e) => setSelected(e.currentTarget.value)}
          />
        );
      })}
    </div>
  );
};

const Radio: StoryObj<Args> = { render: Render };

export { Radio };
export default meta;
