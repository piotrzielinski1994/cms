import Form from '@/components/basic/form/root/form';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { TextArea as TextAreaComponent } from './text-area';

type Args = ComponentProps<typeof TextAreaComponent> & {
  label?: string;
};

const ControlledInput = (props: Args) => {
  const [value, setValue] = useState('');
  return (
    <TextAreaComponent {...props} onChange={(e) => setValue(e.currentTarget.value)} value={value} />
  );
};

const meta: Meta<ComponentProps<typeof ControlledInput>> = {
  component: ControlledInput,
  title: 'Components/Basic/Form/TextArea',
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
  const t = useTranslations('storybook.basic.form');
  const t2 = useTranslations('storybook.basic.form.textInput');

  return (
    <div className="grid gap-2">
      <Form.Group>
        <Form.Label htmlFor="input1">{getFallback(label, t('textArea'))}</Form.Label>
        <ControlledInput
          {...args}
          placeholder={getFallback(placeholder, t2('default.placeholder'))}
          id="input1"
          name="input1"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t2('disabled.label')}</Form.Label>
        <TextAreaComponent
          id="input2"
          name="input2"
          placeholder={t2('disabled.placeholder')}
          disabled
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t2('invalid.label')}</Form.Label>
        <TextAreaComponent
          {...args}
          id="input3"
          name="input3"
          value={t2('invalid.value')}
          error={t2('invalid.error')}
        />
      </Form.Group>
    </div>
  );
};

const TextArea: StoryObj<typeof TextAreaComponent> = { render: Render };

export { TextArea };
export default meta;
