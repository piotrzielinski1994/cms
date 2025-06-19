import Form from '@/components/basic/form/root/form';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { Select as SelectComponent } from './select';

type Args = ComponentProps<typeof SelectComponent> & {
  label?: string;
};

const ControlledInput = (props: Args) => {
  const [value, setValue] = useState('');
  return (
    <SelectComponent {...props} onChange={(e) => setValue(e.currentTarget.value)} value={value} />
  );
};

const meta: Meta<ComponentProps<typeof ControlledInput>> = {
  component: ControlledInput,
  title: 'Components/Basic/Form/Select',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Select Input',
    placeholder: 'Choose value',
    options: [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ],
    disabled: false,
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
        <SelectComponent
          id="input2"
          name="input2"
          placeholder={t('disabled.placeholder')}
          disabled
          options={[]}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t('invalid.label')}</Form.Label>
        <SelectComponent
          {...args}
          id="input3"
          name="input3"
          value={t('invalid.value')}
          error={t('invalid.error')}
          options={args.options}
        />
      </Form.Group>
    </>
  );
};

const Select: StoryObj<typeof SelectComponent> = { render: Render };

export { Select };
export default meta;
