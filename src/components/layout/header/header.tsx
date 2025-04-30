import { Container } from '@/components/basic/container';
import { Logo } from '@/components/basic/logo';
import { Section } from '@/components/basic/section';
import { getCachedGlobal } from '@/payload/utils/globals';
import { cn } from '@/utils/tailwind';
import { TypedLocale } from 'payload';
import FontScaler from './scaffold/font-scaler';
import LocaleSwitcher from './scaffold/locale-switcher';
import HeaderNav from './scaffold/navbar';
import ThemeSwitcher from './scaffold/theme-switcher';

type HeaderProps = {
  locale: TypedLocale;
};

const Header = async ({ locale }: HeaderProps) => {
  const header = await getCachedGlobal('header', locale)();
  return (
    <>
      <Section as="div" className="bg-black">
        <Container className={cn('flex justify-end items-center')}>
          <FontScaler />
          <ThemeSwitcher />
          <LocaleSwitcher />
        </Container>
      </Section>
      <Section as="header" className="py-5 bg-background1 sticky top-0 z-header">
        <Container className={cn('flex items-center')}>
          <Logo />
          <HeaderNav data={header} />
        </Container>
      </Section>
    </>
  );
};

export { Header };
