import Form from '@/components/basic/form/root/form';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
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
    label: DEFAULT_VALUE,
    placeholder: DEFAULT_VALUE,
    options: [
      { value: 'one', label: DEFAULT_VALUE },
      { value: 'two', label: DEFAULT_VALUE },
    ],
    disabled: false,
  },
};

const Render = ({ label, placeholder, options, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form.select');
  const t2 = useTranslations('storybook.basic.form.textInput');

  return (
    <div className="grid gap-2">
      <Form.Group>
        <Form.Label htmlFor="input1">{getFallback(label, t('label'))}</Form.Label>
        <ControlledInput
          {...args}
          options={options.map((it, index) => ({
            value: it.value,
            label: getFallback(it.label, `${t('option')} ${index + 1}`),
          }))}
          placeholder={getFallback(placeholder, t('placeholder'))}
          id="input1"
          name="input1"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t2('disabled.label')}</Form.Label>
        <SelectComponent
          id="input2"
          name="input2"
          placeholder={t2('disabled.placeholder')}
          disabled
          options={[]}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t2('invalid.label')}</Form.Label>
        <SelectComponent
          {...args}
          id="input3"
          name="input3"
          value={t2('invalid.value')}
          error={t2('invalid.error')}
          options={options.map((it, index) => ({
            value: it.value,
            label: `${t('option')} ${index + 1}`,
          }))}
        />
      </Form.Group>
    </div>
  );
};

const Select: StoryObj<typeof SelectComponent> = { render: Render };

export { Select };
export default meta;
