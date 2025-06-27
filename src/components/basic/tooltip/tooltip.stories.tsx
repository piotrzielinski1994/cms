import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import { cn } from '@/utils/tailwind';
import type { Meta, StoryObj } from '@storybook/react';
import { HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Tooltip as TooltipComponent } from './tooltip';

type Args = ComponentProps<typeof TooltipComponent> & {
  location: 'left' | 'center' | 'right';
};

const meta = {
  component: TooltipComponent,
  title: 'Components/Basic/Tooltip',
  argTypes: {
    content: { control: 'text' },
    children: { control: 'text' },
    location: {
      control: 'select',
      options: ['left', 'center', 'right'] satisfies Array<Args['location']>,
    },
  },
  args: {
    content: DEFAULT_VALUE,
    children: DEFAULT_VALUE,
    location: 'left',
  },
} satisfies Meta<Args>;

const Render = ({ content, children, location, ...args }: Args) => {
  const t = useTranslations('storybook.basic');
  const classPerLocation = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  } satisfies Record<Args['location'], string>;

  return (
    <div className={cn('grid', classPerLocation[location])}>
      <TooltipComponent {...args} content={getFallback(content, t('tooltip'))}>
        {getFallback(children, <HelpCircle />)}
      </TooltipComponent>
    </div>
  );
};

const Tooltip: StoryObj<typeof TooltipComponent> = { render: Render };

export { Tooltip };
export default meta;
