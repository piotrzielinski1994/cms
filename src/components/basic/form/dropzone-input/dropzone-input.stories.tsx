import Form from '@/components/basic/form/root/form';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { DropzoneInput as DropzoneInputComponent } from './dropzone-input';

type Args = ComponentProps<typeof DropzoneInputComponent> & {
  label: string;
};

const meta: Meta<Args> = {
  component: DropzoneInputComponent,
  title: 'Basic/Form/DropzoneInput',
  argTypes: {
    label: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fileNames: { table: { disable: true } },
    onFileRemove: { table: { disable: true } },
  },
  args: {
    label: DEFAULT_VALUE,
    multiple: true,
    disabled: false,
  },
};

const Render = ({ label, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form');
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <div className="grid gap-2">
      <Form.Group>
        <Form.Label htmlFor="inpu1">{getFallback(label, t('dropzoneInput'))}</Form.Label>
        <DropzoneInputComponent
          {...args}
          id="inpu1"
          name="inpu1"
          fileNames={fileNames}
          onChange={(e) => {
            const { files } = e.target;
            if (!files) return;
            setFileNames((prev) => [...prev, ...[...files].map((file) => file.name)]);
          }}
          onFileRemove={(fileName) => {
            setFileNames((prev) => prev.filter((name) => name !== fileName));
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t('textInput.disabled.label')}</Form.Label>
        <DropzoneInputComponent id="inpu2" name="inpu2" fileNames={[]} disabled />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t('textInput.invalid.label')}</Form.Label>
        <DropzoneInputComponent
          id="inpu3"
          name="inpu3"
          fileNames={[]}
          error={t('textInput.invalid.error')}
        />
      </Form.Group>
    </div>
  );
};

const DropzoneInput: StoryObj<typeof DropzoneInputComponent> = { render: Render };

export { DropzoneInput };
export default meta;
