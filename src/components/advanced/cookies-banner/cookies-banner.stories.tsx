import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, type ComponentProps } from 'react';
import { CookiesBanner as CookiesBannerComponent } from './cookies-banner';

type Args = ComponentProps<typeof CookiesBannerComponent>;

const meta = {
  component: CookiesBannerComponent,
  title: 'Advanced/CookiesBanner',
  argTypes: {
    readMore: { control: 'object' },
    accept: { control: 'text' },
  },
  args: {
    content: DEFAULT_VALUE,
    readMore: { url: '', label: DEFAULT_VALUE },
    accept: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ content, readMore, accept, ...args }: Args) => {
  const t = useTranslations('storybook.advanced.cookiesBanner');
  const ref = useRef<HTMLDivElement>(null);

  // Hack to prevent setting cookie, leading to not showing a banner
  useEffect(() => {
    if (!ref.current) return;
    const button = ref.current.querySelector('button');
    if (!button) return;
    const clone = button.cloneNode(true);
    button.replaceWith(clone);
  }, []);

  return (
    <div className="flex gap-1" ref={ref}>
      <CookiesBannerComponent
        {...args}
        content={getFallback(content, t('content'))}
        accept={getFallback(accept, t('accept'))}
        readMore={{
          ...readMore,
          label: getFallback(readMore.label, t('readMore')),
        }}
      />
    </div>
  );
};

const CookiesBanner: StoryObj<typeof CookiesBannerComponent> = { render: Render };

export { CookiesBanner };
export default meta;
