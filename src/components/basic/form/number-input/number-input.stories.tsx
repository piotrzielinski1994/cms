import Form from '@/components/basic/form/root/form';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { NumberInput as NumberInputComponent } from './number-input';

type Args = ComponentProps<typeof NumberInputComponent> & {
  label?: string;
};

const ControlledInput = (props: Args) => {
  const [value, setValue] = useState<string>('');
  return (
    <NumberInputComponent
      {...props}
      onChange={(e) => setValue(e.currentTarget.value)}
      value={value}
    />
  );
};

const meta: Meta<ComponentProps<typeof ControlledInput>> = {
  component: ControlledInput,
  title: 'Components/Basic/Form/NumberInput',
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
    label: 'Number Input',
    placeholder: 'Type value',
    maxIntLength: 5,
    maxDecimalLength: 2,
    disabled: false,
    mode: 'decimal',
  },
};

const Render = ({ label, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form.textInput');

  return (
    <>
      <Form.Group>
        <Form.Label htmlFor="input1">{label}</Form.Label>
        <ControlledInput {...args} id="input1" name="input1" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t('disabled.label')}</Form.Label>
        <NumberInputComponent
          id="input2"
          name="input2"
          placeholder={t('disabled.placeholder')}
          disabled
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t('invalid.label')}</Form.Label>
        <NumberInputComponent
          {...args}
          id="input3"
          name="input3"
          value={t('invalid.value')}
          error={t('invalid.error')}
        />
      </Form.Group>
    </>
  );
};

const NumberInput: StoryObj<typeof NumberInputComponent> = { render: Render };

export { NumberInput };
export default meta;
