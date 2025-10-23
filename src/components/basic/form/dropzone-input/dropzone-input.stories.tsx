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
  const t2 = useTranslations('frontend.component.uploadInput');
  const [fileNames, setFileNames] = useState<string[]>([
    t('dropzoneInput.file', { index: 1 }),
    t('dropzoneInput.file', { index: 2 }),
  ]);
  const defaultTranslations: Args['t'] = {
    clickToUpload: t2('clickToUpload'),
    orDragAndDrop: t2('orDragAndDrop'),
    fileExtensions: t2('extensions.image'),
  };

  return (
    <div className="grid gap-2">
      <DropzoneInputComponent
        {...args}
        id="inpu1"
        name="inpu1"
        fileNames={fileNames}
        t={defaultTranslations}
        label={getFallback(label, t('dropzoneInput.label'))}
        onChange={(e) => {
          const { files } = e.target;
          if (!files) return;
          setFileNames((prev) => [...prev, ...[...files].map((file) => file.name)]);
        }}
        onFileRemove={(fileName) => {
          setFileNames((prev) => prev.filter((name) => name !== fileName));
        }}
      />
      <DropzoneInputComponent
        id="inpu2"
        name="inpu2"
        fileNames={[]}
        t={defaultTranslations}
        label={t('textInput.disabled.label')}
        disabled
      />
      <DropzoneInputComponent
        id="inpu3"
        name="inpu3"
        fileNames={[]}
        t={defaultTranslations}
        label={t('textInput.invalid.label')}
        error={t('textInput.invalid.error')}
      />
    </div>
  );
};

const DropzoneInput: StoryObj<typeof DropzoneInputComponent> = { render: Render };

export { DropzoneInput };
export default meta;
