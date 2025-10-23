import Form from '@/components/basic/form/root/form';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useState, type ComponentProps } from 'react';
import { FileInput as FileInputComponent } from './file-input';

type Args = ComponentProps<typeof FileInputComponent> & {
  label: string;
};

const meta: Meta<Args> = {
  component: FileInputComponent,
  title: 'Basic/Form/FileInput',
  argTypes: {
    label: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    fileNames: { table: { disable: true } },
    onClear: { table: { disable: true } },
  },
  args: {
    label: DEFAULT_VALUE,
    multiple: true,
    disabled: false,
    placeholder: DEFAULT_VALUE,
  },
};

const Render = ({ label, placeholder, ...args }: Args) => {
  const t = useTranslations('storybook.basic.form');
  const [fileNames, setFileNames] = useState<string[]>([
    t('fileInput.file', { index: 1 }),
    t('fileInput.file', { index: 2 }),
  ]);

  return (
    <div className="grid gap-2">
      <Form.Group>
        <Form.Label htmlFor="inpu1">{getFallback(label, t('fileInput.label'))}</Form.Label>
        <FileInputComponent
          {...args}
          placeholder={getFallback(placeholder, t('fileInput.placeholder'))}
          id="inpu1"
          name="inpu1"
          fileNames={fileNames}
          onChange={(e) => {
            const { files } = e.target;
            if (!files) return;
            setFileNames([...files].map((file) => file.name));
          }}
          onClear={() => setFileNames([])}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">{t('textInput.disabled.label')}</Form.Label>
        <FileInputComponent
          id="inpu2"
          name="inpu2"
          placeholder={t('fileInput.placeholder')}
          fileNames={[]}
          disabled
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input3">{t('textInput.invalid.label')}</Form.Label>
        <FileInputComponent
          id="inpu3"
          name="inpu3"
          placeholder={t('fileInput.placeholder')}
          fileNames={[]}
          error={t('textInput.invalid.error')}
        />
      </Form.Group>
    </div>
  );
};

const FileInput: StoryObj<typeof FileInputComponent> = { render: Render };

export { FileInput };
export default meta;
