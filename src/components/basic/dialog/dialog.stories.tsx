import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Button } from '../button/button';
import DialogComponent from './dialog';
import { useDialog } from './dialog.hooks';

type Args = ComponentProps<typeof DialogComponent.Root> & {
  submit: string;
  cancel: string;
};

const meta: Meta<Args> = {
  component: DialogComponent.Root,
  title: 'Components/Basic/Dialog',
  argTypes: {
    header: { control: 'text' },
    children: { control: 'text' },
    className: { control: 'text' },
    submit: { control: 'text' },
    cancel: { control: 'text' },
  },
  args: {
    header: DEFAULT_VALUE,
    children: DEFAULT_VALUE,
    className: 'max-w-lg',
    submit: DEFAULT_VALUE,
    cancel: DEFAULT_VALUE,
  },
};

const Render = ({ header, children, submit, cancel, ...args }: Args) => {
  const t = useTranslations('storybook.basic.dialog');
  const { setIsOpen, dialogRef } = useDialog(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{t('button')}</Button>
      <DialogComponent.Root
        {...args}
        ref={dialogRef}
        header={getFallback(header, t('header'))}
        footer={
          <DialogComponent.Footer
            submitBtn={{
              label: getFallback(submit, t('submit')),
              onClick: () => setIsOpen(false),
            }}
            cancelBtn={{
              label: getFallback(cancel, t('cancel')),
              onClick: () => setIsOpen(false),
            }}
          />
        }
        onClose={() => setIsOpen(false)}
      >
        {getFallback(children, t('content'))}
      </DialogComponent.Root>
    </>
  );
};

const Dialog: StoryObj<typeof DialogComponent.Root> = { render: Render };

export { Dialog };
export default meta;
