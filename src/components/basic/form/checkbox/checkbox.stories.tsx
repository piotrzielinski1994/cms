import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { Checkbox as CheckboxComponent } from './checkbox';

type Args = ComponentProps<typeof CheckboxComponent>;

const ControlledCheckbox = (props: Args) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CheckboxComponent
      {...props}
      onChange={(e) => setIsChecked(e.currentTarget.checked)}
      checked={isChecked}
    />
  );
};

const meta: Meta<ComponentProps<typeof ControlledCheckbox>> = {
  component: ControlledCheckbox,
  title: 'Components/Basic/Form/Checkbox',
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: DEFAULT_VALUE,
    disabled: false,
  },
};

const Render = ({ label, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form.checkbox');

  return (
    <div className="grid gap-2">
      <ControlledCheckbox
        {...args}
        label={getFallback(label, t('default.label'))}
        id="input1"
        name="input1"
      />
      <CheckboxComponent id="input2" name="input2" label={t('disabled.label')} disabled />
      <CheckboxComponent
        {...args}
        id="input3"
        name="input3"
        label={t('invalid.label')}
        error={t('invalid.error')}
      />
    </div>
  );
};

const Checkbox: StoryObj<typeof CheckboxComponent> = { render: Render };

export { Checkbox };
export default meta;
