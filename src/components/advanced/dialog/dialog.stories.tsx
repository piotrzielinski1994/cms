import { Button } from '@/components/basic/button/button';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useEffect, type ComponentProps } from 'react';
import { Dialog as DialogComponent } from './dialog';
import { useDialog } from './dialog.hooks';

type Args = ComponentProps<typeof DialogComponent> & {
  submit: string;
  cancel: string;
};

const meta: Meta<Args> = {
  component: DialogComponent,
  title: 'Advanced/Dialog',
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
  const t = useTranslations('storybook.advanced.dialog');
  const t2 = useTranslations('frontend');
  const { setIsOpen, dialogRef } = useDialog({ initialIsOpen: true, type });

  useEffect(() => () => dialogRef.current?.close(), [type, dialogRef]);

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)}>
        {type === 'dialog' ? t('showDialog') : t('showModal')}
      </Button>
      <DialogComponent
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
        t={{ close: t2('close') }}
      >
        {getFallback(args.children, t('content'))}
      </DialogComponent>
    </>
  );
};

const Dialog: StoryObj<typeof DialogComponent> = { render: Render };

export { Dialog };
export default meta;
