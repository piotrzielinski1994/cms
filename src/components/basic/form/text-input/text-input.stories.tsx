import Form from '@/components/basic/form/root/form';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { TextInput } from './text-input';

type Args = ComponentProps<typeof TextInput> & {
  label?: string;
};

const ControlledInput = (props: Args) => {
  const [value, setValue] = useState('');
  return <TextInput {...props} onChange={(e) => setValue(e.currentTarget.value)} value={value} />;
};

const meta: Meta<ComponentProps<typeof ControlledInput>> = {
  component: ControlledInput,
  title: 'Components/TextInput',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Text Input',
    placeholder: 'Type value',
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
        <TextInput id="input2" name="input2" placeholder={t('disabled.placeholder')} disabled />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t('invalid.label')}</Form.Label>
        <TextInput
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

const Default: StoryObj<typeof TextInput> = { render: Render };

export { Default };
export default meta;
