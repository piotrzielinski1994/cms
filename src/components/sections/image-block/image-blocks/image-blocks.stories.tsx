import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { ImageBlock1 } from '../image-block-1/image-block-1';
import { ImageBlocks as ImageBlocksComponent } from './image-blocks';

type Args = ComponentProps<typeof ImageBlocksComponent>;

const meta = {
  component: ImageBlocksComponent,
  title: 'Components/Sections/ImageBlock/ImageBlocks',
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
  },
  args: {
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ heading, subheading }: Args) => {
  const t2 = useTranslations('fields');
  const tButton = useTranslations('storybook.basic.button');

  return (
    <ImageBlocksComponent
      id={THUMBNAIL_ID}
      heading={getFallback(heading, t2('heading'))}
      subheading={getFallback(subheading, t2('subheading'))}
      items={[1, 2].map((it) => {
        return (
          <ImageBlock1
            key={it}
            isReversed={it % 2 === 0}
            image={{ src: '', alt: t2('image') }}
            heading={t2('heading')}
            subheading={t2('subheading')}
            buttons={[1, 2]?.map((it) => ({
              label: `${tButton('default')} ${it}`,
              href: `/path-${it}`,
              variant: it === 1 ? 'primary' : 'secondary',
            }))}
          />
        );
      })}
    />
  );
};

const ImageBlocks: StoryObj<typeof ImageBlocksComponent> = { render: Render };

export { ImageBlocks };
export default meta;
