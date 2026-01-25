import { Container } from '@/components/basic/container/container';
import { LogoContainer } from '@/components/basic/logo/logo.container';
import { Section } from '@/components/basic/section/section';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ComponentProps } from 'react';
import { FontScaler } from './scaffold/font-scaler';
import { HeaderHeightListener } from './scaffold/header-height-listener';
import { LocaleSwitcher } from './scaffold/locale-switcher';
import { HeaderNav } from './scaffold/navbar';
import { ThemeSwitcher } from './scaffold/theme-switcher';

type HeaderProps = {
  items: ComponentProps<typeof HeaderNav>['items'];
};

const styles = {
  topBar: {
    root: 'py-2 bg-black',
    container: 'sm:px-6 flex justify-end items-center',
  },
  header: {
    root: 'sticky top-0 z-header py-5 bg-background1 shadow-sm',
    container: 'sm:px-6 flex items-center',
    logo: 'text-2xl',
  },
} as const;

const TopBar = ({ className, ...rest }: HtmlProps<'div'>) => {
  return (
    <Section {...rest} as="div" className={cn(styles.topBar.root, className)}>
      <Container className={styles.topBar.container}>
        <FontScaler />
        <ThemeSwitcher />
        <LocaleSwitcher />
      </Container>
    </Section>
  );
};

const Native = ({ items }: HeaderProps) => {
  return (
    <>
      <HeaderHeightListener />
      <Section as="header" className={styles.header.root} data-header>
        <Container className={styles.header.container}>
          <LogoContainer className={styles.header.logo} />
          <HeaderNav items={items} />
        </Container>
      </Section>
    </>
  );
};

const Header = Object.assign(
  ({ items }: HeaderProps) => {
    return (
      <>
        <TopBar />
        <Native items={items} />
      </>
    );
  },
  { TopBar, Native },
);

export { Header, styles };
