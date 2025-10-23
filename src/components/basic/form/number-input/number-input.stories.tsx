import Form from '@/components/basic/form/root/form';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { NumberInput as NumberInputComponent } from './number-input';

type Args = ComponentProps<typeof NumberInputComponent> & {
  label?: string;
};

const ControlledInput = (props: Args) => {
  const [value, setValue] = useState(props.value);
  return (
    <NumberInputComponent
      {...props}
      value={value}
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        setValue(isNaN(value) ? undefined : value);
      }}
    />
  );
};

const meta: Meta<ComponentProps<typeof ControlledInput>> = {
  component: ControlledInput,
  title: 'Basic/Form/NumberInput',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    maxIntLength: { control: 'number' },
    maxDecimalLength: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: DEFAULT_VALUE,
    placeholder: DEFAULT_VALUE,
    min: 0,
    max: 99_999,
    maxIntLength: 5,
    maxDecimalLength: 2,
    disabled: false,
  },
};

const Render = ({ label, placeholder, ...args }: Args) => {
  const t = useTranslations('frontend');
  const t2 = useTranslations('storybook.basic.form');
  const t3 = useTranslations('storybook.basic.form.textInput');

  return (
    <div className="grid gap-2">
      <Form.Group>
        <Form.Label htmlFor="input1">{getFallback(label, t2('numberInput'))}</Form.Label>
        <ControlledInput
          {...args}
          placeholder={getFallback(placeholder, t3('default.placeholder'))}
          id="input1"
          name="input1"
          t={{ increment: t('increment'), decrement: t('decrement') }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t3('disabled.label')}</Form.Label>
        <NumberInputComponent
          id="input2"
          name="input2"
          placeholder={t3('disabled.placeholder')}
          disabled
          t={{ increment: t('increment'), decrement: t('decrement') }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t3('invalid.label')}</Form.Label>
        <NumberInputComponent
          {...args}
          id="input3"
          name="input3"
          value={12345.67}
          error={t3('invalid.error')}
          t={{ increment: t('increment'), decrement: t('decrement') }}
        />
      </Form.Group>
    </div>
  );
};

const NumberInput: StoryObj<typeof NumberInputComponent> = { render: Render };

export { NumberInput };
export default meta;
