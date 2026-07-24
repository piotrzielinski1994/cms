import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import { Content as ContentComponent } from './content';

type Args = ComponentProps<typeof ContentComponent>;

const meta: Meta<Args> = {
  component: ContentComponent,
  title: 'Sections/Content',
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    content: { control: 'text' },
  },
  args: {
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    content: DEFAULT_VALUE,
  },
};

const Render = ({ heading, subheading, content }: Args) => {
  const t = useTranslations('fields');
  const tCommon = useTranslations('common');
  return (
    <ContentComponent
      id={THUMBNAIL_ID}
      heading={getFallback(heading, t('heading'))}
      subheading={getFallback(subheading, t('subheading'))}
      content={<p>{getFallback(content, tCommon('content'))}</p>}
    />
  );
};

const Content: StoryObj<typeof ContentComponent> = { render: Render };

export { Content };
export default meta;
