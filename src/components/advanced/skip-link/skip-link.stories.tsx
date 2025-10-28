import Form from '@/components/basic/form/root/form';
import { TextInput } from '@/components/basic/form/text-input/text-input';
import { Link } from '@/components/basic/link/link';
import { cn } from '@/utils/tailwind';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, type ComponentProps } from 'react';
import { SkipLink as SkipLinkComponent } from './skip-link';

type Args = ComponentProps<typeof SkipLinkComponent> & {
  label?: string;
};

const meta: Meta<Args> = {
  component: SkipLinkComponent,
  title: 'Advanced/SkipLink',
};

const Render = () => {
  const t = useTranslations('storybook.advanced.skipLink');
  const t2 = useTranslations('frontend');
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Programmatically prevent default Storybook's behavior after clicking link
    const el = skipLinkRef.current;
    if (!el) return;

    const focusMain = (e: MouseEvent) => {
      e.preventDefault();
      document.getElementById('main')?.focus();
    };

    el.addEventListener('click', focusMain);
    return () => el.removeEventListener('click', focusMain);
  }, []);

  return (
    <>
      {/* Compensate storybook's padding on body */}
      <div className="-mt-4">
        <SkipLinkComponent ref={skipLinkRef} t={{ label: t2('component.skipLink') }} />
      </div>

      <nav className={cn('flex justify-between gap-x-4 flex-wrap', 'p-2 bg-background1')}>
        <span>{t('navbar')}</span>
        <ul className="flex justify-end gap-2">
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <li key={index}>
                <Link href="">{`${t('link')} ${index + 1}`}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="focus-visible:tw-cms-outline" id="main" tabIndex={-1}>
        <Form.Group>
          <Form.Label htmlFor="input">{t('main')}</Form.Label>
          <TextInput id="input" name="input" placeholder={t('inputPlaceholder')} />
        </Form.Group>
      </main>
    </>
  );
};

const SkipLink: StoryObj<typeof SkipLinkComponent> = { render: Render };

export { SkipLink };
export default meta;
