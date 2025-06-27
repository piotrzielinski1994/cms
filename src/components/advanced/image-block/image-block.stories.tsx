import {
  DEFAULT_VALUE,
  getFallback,
  imagesPerColorPref,
  THUMBNAIL_ID,
} from '@/config/storybook/utils';
import { themes } from '@/config/themes.config';
import type { Meta, StoryContext, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { ImageBlock as ImageBlockComponent } from './image-block';

type Args = ComponentProps<typeof ImageBlockComponent>;

const meta = {
  component: ImageBlockComponent,
  title: 'Components/Advanced/ImageBlock',
  argTypes: {
    isReversed: { control: 'boolean' },
    image: { control: 'object' },
    heading: { control: 'text' },
    subheading: { control: 'text' },
    buttons: { control: 'object' },
  },
  args: {
    isReversed: false,
    image: {
      src: DEFAULT_VALUE,
      alt: DEFAULT_VALUE,
      width: undefined,
      height: undefined,
    },
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    buttons: [
      { label: DEFAULT_VALUE, href: '/path-1', variant: 'primary' },
      { label: DEFAULT_VALUE, href: '/path-2', variant: 'secondary' },
    ],
  },
} satisfies Meta<Args>;

const Render = ({ image, heading, subheading, buttons, ...args }: Args, context) => {
  const { theme } = context.globals as StoryContext['globals'];
  const t2 = useTranslations('fields');
  const tButton = useTranslations('storybook.basic.button');

  return (
    <ImageBlockComponent
      {...args}
      id={THUMBNAIL_ID}
      image={{
        ...image,
        src: getFallback(image.src, imagesPerColorPref[themes[theme]._type]),
        alt: getFallback(image.alt, t2('image')),
      }}
      heading={getFallback(heading, t2('heading'))}
      subheading={getFallback(subheading, t2('subheading'))}
      buttons={buttons?.map((it, index) => ({
        ...it,
        label: getFallback(it.label, `${tButton('default')} ${index + 1}`),
      }))}
    />
  );
};

const ImageBlock: StoryObj<typeof ImageBlockComponent> = { render: Render };

export { ImageBlock };
export default meta;
