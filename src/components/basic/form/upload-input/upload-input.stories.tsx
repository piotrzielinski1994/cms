import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { UploadInput as UploadInputComponent } from './upload-input';

type Args = ComponentProps<typeof UploadInputComponent> & {
  label?: string;
};

const meta: Meta<Args> = {
  component: UploadInputComponent,
  title: 'Basic/Form/UploadInput',
};

const Render = ({ label, ...args }: Args) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  return (
    <UploadInputComponent
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

const UploadInput: StoryObj<typeof UploadInputComponent> = { render: Render };

export { UploadInput };
export default meta;
