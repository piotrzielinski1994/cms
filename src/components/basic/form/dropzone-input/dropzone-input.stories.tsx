import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { DropzoneInput as DropzoneInputComponent } from './dropzone-input';

type Args = ComponentProps<typeof DropzoneInputComponent>;

const meta: Meta<Args> = {
  component: DropzoneInputComponent,
  title: 'Basic/Form/DropzoneInput',
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fileNames: { table: { disable: true } },
    onFileRemove: { table: { disable: true } },
  },
  args: {
    multiple: true,
    disabled: false,
  },
};

const Render = (args: Args) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  return (
    <DropzoneInputComponent
      {...args}
      fileNames={fileNames}
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
