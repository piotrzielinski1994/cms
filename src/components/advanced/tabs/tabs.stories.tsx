import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Tabs as TabsComponent } from './tabs';

type Args = ComponentProps<typeof TabsComponent>;

const meta = {
  component: TabsComponent,
  title: 'Advanced/Tabs',
  argTypes: {
    tabs: { control: 'object' },
  },
  args: {
    tabs: [
      {
        heading: DEFAULT_VALUE,
        content: DEFAULT_VALUE,
      },
      {
        heading: DEFAULT_VALUE,
        content: DEFAULT_VALUE,
      },
    ],
  },
} satisfies Meta<Args>;

const Render = ({ tabs }: Args) => {
  const t = useTranslations('storybook.basic.tabs');
  const props = {
    tabs: tabs.map((tab, index) => ({
      heading: getFallback(tab.heading, `${t('tab')} ${index + 1}`),
      content: getFallback(tab.content, `${t('content')} ${index + 1}`),
    })),
  } satisfies Args;

  return <TabsComponent {...props} />;
};

const Tabs: StoryObj<typeof TabsComponent> = { render: Render };

export { Tabs };
export default meta;
