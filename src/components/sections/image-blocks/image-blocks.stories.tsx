import { ImageBlock } from '@/components/advanced/image-block/image-block';
import { StoryContext } from '@/config/storybook/components';
import {
  DEFAULT_VALUE,
  getFallback,
  imagesPerColorPref,
  THUMBNAIL_ID,
} from '@/config/storybook/utils';
import { getThemeConfig } from '@/config/themes.config';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
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

const Render = ({ heading, subheading }: Args, context) => {
  const { theme } = context.globals as StoryContext['globals'];
  const t2 = useTranslations('fields');
  const tButton = useTranslations('storybook.basic.button');
  const themedImage = imagesPerColorPref[getThemeConfig(theme).colorPreference];

  return (
    <ImageBlocksComponent
      id={THUMBNAIL_ID}
      heading={getFallback(heading, t2('heading'))}
      subheading={getFallback(subheading, t2('subheading'))}
      items={[1, 2].map((it) => {
        return (
          <ImageBlock
            key={it}
            isReversed={it % 2 === 0}
            image={{
              src: themedImage.src,
              alt: t2('image'),
            }}
            heading={t2('heading')}
            subheading={t2('subheading')}
            buttons={[1, 2].map((it) => ({
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
