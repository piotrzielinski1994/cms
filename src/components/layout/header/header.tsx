import { Container } from '@/components/basic/container';
import { Logo } from '@/components/basic/logo';
import { Section } from '@/components/basic/section';
import { getCachedGlobal } from '@/payload/utils/globals';
import { cn } from '@/utils/tailwind';
import { Locale } from 'next-intl';
import { FontScaler } from './scaffold/font-scaler';
import { HeaderHeightMonitor } from './scaffold/header-height-monitor';
import { LocaleSwitcher } from './scaffold/locale-switcher';
import { HeaderNav } from './scaffold/navbar';
import { ThemeSwitcher } from './scaffold/theme-switcher';

type HeaderProps = {
  locale: Locale;
};

const Header = async ({ locale }: HeaderProps) => {
  const header = await getCachedGlobal('header', locale)();
  return (
    <>
      <HeaderHeightMonitor />
      <Section as="div" className="py-2 bg-black">
        <Container className={cn('flex justify-end items-center')}>
          <FontScaler />
          <ThemeSwitcher />
          <LocaleSwitcher />
        </Container>
      </Section>
      <Section
        as="header"
        className="sticky top-0 z-header py-5 bg-background1 shadow-sm"
        data-header
      >
        <Container className={cn('flex items-center')}>
          <Logo className="text-2xl" />
          <HeaderNav data={header} />
        </Container>
      </Section>
    </>
  );
};

export { Header };
