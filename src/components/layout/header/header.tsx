import { Container } from '@/components/layout/container/container';
import { Section } from '@/components/layout/section/section';
import { Link } from '@/config/next.routing.config';
import LogoSvg from '@/icons/logo.svg';
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
    <Section as="header" className="py-5 bg-background1 sticky top-0 z-header">
      <Container className={cn('flex items-center')}>
        <Link href="/">
          <LogoSvg />
        </Link>
        <HeaderNav data={header} />
        <FontScaler />
        <ThemeSwitcher />
        <LocaleSwitcher />
      </Container>
    </Section>
  );
};

export { Header };
