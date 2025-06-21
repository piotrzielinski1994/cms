import Form from '@/components/basic/form/root/form';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { TextInput as TextInputComponent } from './text-input';

type Args = ComponentProps<typeof TextInputComponent> & {
  label?: string;
};

const ControlledInput = (props: Args) => {
  const [value, setValue] = useState('');
  return (
    <TextInputComponent
      {...props}
      onChange={(e) => setValue(e.currentTarget.value)}
      value={value}
    />
  );
};

const meta: Meta<ComponentProps<typeof ControlledInput>> = {
  component: ControlledInput,
  title: 'Components/Basic/Form/TextInput',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: DEFAULT_VALUE,
    placeholder: DEFAULT_VALUE,
    disabled: false,
  },
};

const Render = ({ label, placeholder, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form.textInput');

  return (
    <div className="grid gap-2">
      <Form.Group>
        <Form.Label htmlFor="input1">{getFallback(label, t('default.label'))}</Form.Label>
        <ControlledInput
          {...args}
          placeholder={getFallback(placeholder, t('default.placeholder'))}
          id="input1"
          name="input1"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t('disabled.label')}</Form.Label>
        <TextInputComponent
          id="input2"
          name="input2"
          placeholder={t('disabled.placeholder')}
          disabled
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t('invalid.label')}</Form.Label>
        <TextInputComponent
          {...args}
          id="input3"
          name="input3"
          value={t('invalid.value')}
          error={t('invalid.error')}
        />
      </Form.Group>
    </div>
  );
};

const TextInput: StoryObj<typeof TextInputComponent> = { render: Render };

export { TextInput };
export default meta;
