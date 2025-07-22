import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { DropzoneInput as DropzoneInputComponent } from './dropzone-input';

type Args = ComponentProps<typeof DropzoneInputComponent> & {
  label?: string;
};

const meta: Meta<Args> = {
  component: DropzoneInputComponent,
  title: 'Basic/Form/DropzoneInput',
};

const Render = ({ label, ...args }: Args) => {
  const [fileNames, setFileNames] = useState<string[]>(['123.webp', '456.webp']);
  return (
    <DropzoneInputComponent
      fileNames={fileNames}
      multiple
      onChange={(e) => {
        const { files } = e.target;
        if (!files) return;
        setFileNames([...files].map((file) => file.name));
      }}
      onFileRemove={(fileName) => {
        setFileNames((prev) => prev.filter((name) => name !== fileName));
      }}
    />
  );
};

const DropzoneInput: StoryObj<typeof DropzoneInputComponent> = { render: Render };

export { DropzoneInput };
export default meta;
