import { DEFAULT_VALUE, getFallback, imagesPerColorPref } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';

import { StoryContext } from '@/config/storybook/components';
import { themes } from '@/config/themes.config';
import { useTranslations } from 'next-intl';
import { Gallery as GalleryComponent } from './gallery';

type Args = ComponentProps<typeof GalleryComponent>;

const meta = {
  component: GalleryComponent,
  title: 'Components/Advanced/Gallery',
  argTypes: {
    images: { control: 'object' },
  },
  args: {
    images: [
      { src: DEFAULT_VALUE, alt: DEFAULT_VALUE },
      { src: DEFAULT_VALUE, alt: DEFAULT_VALUE },
      { src: DEFAULT_VALUE, alt: DEFAULT_VALUE },
    ],
  },
} satisfies Meta<Args>;

const Render = ({ images, ...args }: Args, context) => {
  const { theme } = context.globals as StoryContext['globals'];
  const t = useTranslations('fields');
  const updatedImages = images.map((it) => {
    return {
      ...it,
      src: getFallback(it.src, imagesPerColorPref[themes[theme]._type]),
      alt: getFallback(it.alt, t('image')),
    };
  });

  return <GalleryComponent {...args} images={updatedImages} />;
};

const Gallery: StoryObj<typeof GalleryComponent> = { render: Render };

export { Gallery };
export default meta;
