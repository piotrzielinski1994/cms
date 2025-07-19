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
  const [value, setValue] = useState<number | undefined>(props.value);
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
    maxIntLength: { control: 'number' },
    maxDecimalLength: { control: 'number' },
    disabled: { control: 'boolean' },
    mode: {
      control: 'select',
      options: ['integer', 'decimal'] satisfies Array<
        ComponentProps<typeof NumberInputComponent>['mode']
      >,
    },
  },
  args: {
    label: DEFAULT_VALUE,
    placeholder: DEFAULT_VALUE,
    maxIntLength: 5,
    maxDecimalLength: 2,
    disabled: false,
    mode: 'decimal',
  },
};

const Render = ({ label, placeholder, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form');
  const t2 = useTranslations('storybook.basic.form.textInput');

  return (
    <div className="grid gap-2">
      <Form.Group>
        <Form.Label htmlFor="input1">{getFallback(label, t('numberInput'))}</Form.Label>
        <ControlledInput
          {...args}
          placeholder={getFallback(placeholder, t2('default.placeholder'))}
          id="input1"
          name="input1"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t2('disabled.label')}</Form.Label>
        <NumberInputComponent
          id="input2"
          name="input2"
          placeholder={t2('disabled.placeholder')}
          disabled
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t2('invalid.label')}</Form.Label>
        <NumberInputComponent
          {...args}
          id="input3"
          name="input3"
          value={t2('invalid.value') as unknown as number}
          error={t2('invalid.error')}
        />
      </Form.Group>
    </div>
  );
};

const NumberInput: StoryObj<typeof NumberInputComponent> = { render: Render };

export { NumberInput };
export default meta;
