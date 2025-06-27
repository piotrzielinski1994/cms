import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Tooltip as TooltipComponent } from './tooltip';

type Args = ComponentProps<typeof TooltipComponent>;

const meta = {
  component: TooltipComponent,
  title: 'Components/Basic/Tooltip',
  argTypes: {
    content: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    content: DEFAULT_VALUE,
    children: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ content, children, ...args }: Args) => {
  const t = useTranslations('storybook.basic');

  return (
    <TooltipComponent {...args} content={getFallback(content, t('tooltip'))}>
      {getFallback(children, <HelpCircle />)}
    </TooltipComponent>
  );
};

const Tooltip: StoryObj<typeof TooltipComponent> = { render: Render };

export { Tooltip };
export default meta;
