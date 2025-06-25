import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Faq as FaqComponent } from './faq';

type Args = ComponentProps<typeof FaqComponent>;

const meta: Meta<Args> = {
  component: FaqComponent,
  title: 'Components/Sections/Faq',
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    items: { table: { disable: true } },
  },
  args: {
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    items: [
      { question: DEFAULT_VALUE, answer: DEFAULT_VALUE },
      { question: DEFAULT_VALUE, answer: DEFAULT_VALUE },
      { question: DEFAULT_VALUE, answer: DEFAULT_VALUE },
    ],
  },
};

const Render = ({ heading, subheading, items, ...args }: Args) => {
  const t = useTranslations('common');
  const t2 = useTranslations('fields');
  return (
    <FaqComponent
      {...args}
      id={THUMBNAIL_ID}
      heading={getFallback(heading, t2('heading'))}
      subheading={getFallback(subheading, t2('subheading'))}
      items={items.map((it, index) => ({
        question: `${getFallback(it.question, t('question'))} ${index + 1}`,
        answer: `${getFallback(it.answer, t('answer'))} ${index + 1}`,
      }))}
    />
  );
};

const Faq: StoryObj<typeof FaqComponent> = { render: Render };

export { Faq };
export default meta;
