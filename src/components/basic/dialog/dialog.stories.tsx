import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useEffect, type ComponentProps } from 'react';
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
    type: {
      control: 'select',
      options: ['dialog', 'modal'] satisfies Array<Args['type']>,
    },
    header: { control: 'text' },
    children: { control: 'text' },
    className: { control: 'text' },
    submit: { control: 'text' },
    cancel: { control: 'text' },
  },
  args: {
    type: 'dialog',
    header: DEFAULT_VALUE,
    children: DEFAULT_VALUE,
    className: 'max-w-lg',
    submit: DEFAULT_VALUE,
    cancel: DEFAULT_VALUE,
  },
};

const Render = ({ type, ...args }: Args) => {
  const t = useTranslations('storybook.basic.dialog');
  const { setIsOpen, dialogRef } = useDialog({ initialIsOpen: false, type });

  useEffect(() => () => dialogRef.current?.close(), [type, dialogRef]);

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)}>
        {type === 'dialog' ? t('showDialog') : t('showModal')}
      </Button>
      <DialogComponent.Root
        {...args}
        ref={dialogRef}
        type={type}
        header={getFallback(args.header, t('header'))}
        footer={
          <DialogComponent.Footer
            submitBtn={{
              label: getFallback(args.submit, t('submit')),
              onClick: () => setIsOpen(false),
            }}
            cancelBtn={{
              label: getFallback(args.cancel, t('cancel')),
              onClick: () => setIsOpen(false),
            }}
          />
        }
        onClose={() => setIsOpen(false)}
      >
        {getFallback(args.children, t('content'))}
      </DialogComponent.Root>
    </>
  );
};

const Dialog: StoryObj<typeof DialogComponent.Root> = { render: Render };

export { Dialog };
export default meta;
