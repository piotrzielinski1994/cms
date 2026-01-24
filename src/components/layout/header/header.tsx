import { Container } from '@/components/basic/container/container';
import { LogoContainer } from '@/components/basic/logo/logo.container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { ComponentProps } from 'react';
import { FontScaler } from './scaffold/font-scaler';
import { HeaderHeightMonitor } from './scaffold/header-height-monitor';
import { LocaleSwitcher } from './scaffold/locale-switcher';
import { HeaderNav } from './scaffold/navbar';
import { ThemeSwitcher } from './scaffold/theme-switcher';

type HeaderProps = {
  items: ComponentProps<typeof HeaderNav>['items'];
};

const Header = ({ items }: HeaderProps) => {
  return (
    <>
      <HeaderHeightMonitor />
      <Section as="div" className="py-2 bg-black">
        <Container className={cn('sm:px-6', 'flex justify-end items-center')}>
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
        <Container className={cn('sm:px-6', 'flex items-center')}>
          <LogoContainer className="text-2xl" />
          <HeaderNav items={items} />
        </Container>
      </Section>
    </>
  );
};

export { Header };
