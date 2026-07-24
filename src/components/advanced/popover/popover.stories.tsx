import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import { Popover as PopoverComponent } from './popover';

type Args = {
  trigger: string;
  title: string;
  content: string;
  close: string;
};

const meta = {
  title: 'Advanced/Popover',
  args: {
    trigger: DEFAULT_VALUE,
    title: DEFAULT_VALUE,
    content: DEFAULT_VALUE,
    close: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = (args: Args) => {
  const t = useTranslations('storybook.advanced.popover');
  const close = getFallback(args.close, t('close'));

  return (
    <PopoverComponent.Root>
      <PopoverComponent.Trigger>{getFallback(args.trigger, t('trigger'))}</PopoverComponent.Trigger>
      <PopoverComponent.Content aria-label={getFallback(args.title, t('title'))}>
        <p>{getFallback(args.content, t('content'))}</p>
        <PopoverComponent.Close aria-label={close}>{close}</PopoverComponent.Close>
        <PopoverComponent.Arrow />
      </PopoverComponent.Content>
    </PopoverComponent.Root>
  );
};

const Popover: StoryObj<Args> = { render: Render };

export { Popover };
export default meta;
