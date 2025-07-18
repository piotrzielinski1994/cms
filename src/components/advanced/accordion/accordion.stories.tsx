import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Accordion as AccordionComponent } from './accordion';

type Args = ComponentProps<typeof AccordionComponent>;

const meta = {
  component: AccordionComponent,
  title: 'Advanced/Accordion',
  argTypes: {
    items: { control: 'object' },
    activeItemIndex: { control: 'number' },
  },
  args: {
    items: [
      { heading: DEFAULT_VALUE, content: DEFAULT_VALUE },
      { heading: DEFAULT_VALUE, content: DEFAULT_VALUE },
      { heading: DEFAULT_VALUE, content: DEFAULT_VALUE },
    ],
    activeItemIndex: 0,
  },
} satisfies Meta<Args>;

const Render = (args: Args) => {
  const t = useTranslations('storybook.advanced.accordion');
  const props = {
    ...args,
    id: THUMBNAIL_ID,
    items: args.items.map((item, index) => ({
      heading: getFallback(item.heading, `${t('heading')} ${index + 1}`),
      content: getFallback(item.content, `${t('content')} ${index + 1}`),
    })),
  };
  return <AccordionComponent key={args.activeItemIndex} {...props} />;
};

const Accordion: StoryObj<typeof AccordionComponent> = { render: Render };

export { Accordion };
export default meta;
