'use client';

import Dialog from '@/components/advanced/dialog/dialog';
import { Button, ButtonLink } from '@/components/basic/button/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ComponentProps, forwardRef, ReactNode } from 'react';

// prettier-ignore
type CookiesBannerProps = EnhancedHtmlProps<'dialog', {
  content: ReactNode;
  accept: ReactNode;
  readMore: {
    url: string;
    label: ReactNode;
  };
  onAccept: () => void;
}>;

const styles = {
  root: cn(
    'fixed top-auto bottom-0 z-dialog',
    'w-full max-w-none py-5',
    'bg-background1 shadow-sm-neg',
  ),
  wrapper: 'flex flex-col gap-4 items-center sm:flex-row',
  content: 'flex-grow',
  buttons: 'flex gap-2',
};

const Component = forwardRef<HTMLDialogElement, CookiesBannerProps>((props, ref) => {
  const { onAccept, content, readMore, accept, ...rest } = props;
  return (
    <>
      <Dialog.Backdrop />
      <Root ref={ref} {...rest}>
        <Wrapper>
          <Content>{content}</Content>
          <Buttons>
            <ButtonLink href={readMore.url}>{readMore.label}</ButtonLink>
            <Accept onClick={onAccept}>{accept}</Accept>
          </Buttons>
        </Wrapper>
      </Root>
    </>
  );
});

const Root = forwardRef<HTMLDialogElement, HtmlProps<'dialog'>>(({ className, ...rest }, ref) => {
  const classNames = cn(styles.root, className);
  return <Section ref={ref} as="dialog" aria-modal={true} className={classNames} {...rest} />;
});

const Wrapper = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <Container className={cn(styles.wrapper, className)} {...rest} />;
};

const Content = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <Container className={cn(styles.content, className)} {...rest} />;
};

const Buttons = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <Container className={cn(styles.buttons, className)} {...rest} />;
};

const ReadMore = (props: ComponentProps<typeof ButtonLink>) => {
  return <ButtonLink variant="secondary" {...props} />;
};

const Backdrop = Dialog.Backdrop;
const Accept = Button;

const CookiesBanner = Object.assign(Component, {
  Backdrop,
  Root,
  Wrapper,
  Content,
  Buttons,
  ReadMore,
  Accept,
});

export { CookiesBanner, styles };
