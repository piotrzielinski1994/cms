import type { ReactNode } from 'react';
import type { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type CardProps = HtmlProps<'article'> & {
  header?: ReactNode;
  footer?: ReactNode;
};

const styles = {
  root: cn(
    'p-4 md:p-6',
    'grid gap-4',
    'bg-background1',
    'border border-solid border-foreground/15',
  ),
  header: 'font-semibold',
  body: '',
  footer: '',
} as const;

const Component = ({ header, footer, children, ...rest }: CardProps) => {
  return (
    <Root {...rest}>
      {header && <Header>{header}</Header>}
      <Body>{children}</Body>
      {footer && <Footer>{footer}</Footer>}
    </Root>
  );
};

const Root = ({ className, ...rest }: HtmlProps<'article'>) => {
  return <article {...rest} className={cn(styles.root, className)} />;
};

const Header = ({ className, ...rest }: HtmlProps<'header'>) => {
  return <header {...rest} className={cn(styles.header, className)} />;
};

const Body = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.body, className)} />;
};

const Footer = ({ className, ...rest }: HtmlProps<'footer'>) => {
  return <footer {...rest} className={cn(styles.footer, className)} />;
};

const Card = Object.assign(Component, { Root, Header, Body, Footer });

export { Card, styles };
