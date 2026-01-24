import { getThemeConfig } from '@/config/store/themes.config';
import { StoryContext } from '@/config/storybook/components';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Badge as BadgeComponent } from './badge';

type Args = ComponentProps<typeof BadgeComponent>;

const meta = {
  component: BadgeComponent,
  title: 'Basic/Badge',
  argTypes: {
    children: { control: 'text' },
    bgColor: { control: 'text' },
    textColor: { control: 'text' },
  },
  args: {
    children: DEFAULT_VALUE,
    bgColor: DEFAULT_VALUE,
    textColor: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ bgColor, textColor, children, ...args }: Args, context) => {
  const t = useTranslations('storybook.basic');
  const { theme } = context.globals as StoryContext['globals'];

  return (
    <div className="flex gap-1">
      <BadgeComponent
        {...args}
        bgColor={getFallback(bgColor, getThemeConfig(theme).foreground)}
        textColor={getFallback(textColor, getThemeConfig(theme).background)}
      >
        {getFallback(children, t('badge'))}
      </BadgeComponent>
    </div>
  );
};

const Badge: StoryObj<typeof BadgeComponent> = { render: Render };

export { Badge };
export default meta;
