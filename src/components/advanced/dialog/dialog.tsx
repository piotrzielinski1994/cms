import { Button } from '@/components/basic/button/button';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { X } from 'lucide-react';
import { createContext, forwardRef, PropsWithChildren, ReactNode, useContext } from 'react';

// prettier-ignore
type DialogProps = EnhancedHtmlProps<'dialog', {
  type?: 'dialog' | 'modal';
  header?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  t?: {
    close: string
  }
}>;

// prettier-ignore
type FooterProps = EnhancedHtmlProps<'div', {
  submitBtn: {
    label: ReactNode;
    onClick: () => void;
  };
  cancelBtn?: {
    label: ReactNode;
    onClick: () => void;
  };
}>;

const styles = {
  root: ({ type }: Pick<DialogProps, 'type'>) =>
    cn('fixed inset-0 z-dialog', 'py-4 sm:py-6', 'hidden has-[:open]:grid', {
      'pointer-events-none': type === 'dialog',
    }),
  backdrop: cn(
    'fixed inset-0 z-backdrop backdrop-blur-sm',
    'bg-foreground/50 dark:bg-foreground/10',
  ),
  backdropEnhanced: ({ type }: Pick<DialogProps, 'type'>) =>
    cn({ 'backdrop-blur-none': type === 'dialog' }),
  wrapper: cn(
    'relative z-dialog overflow-visible pointer-events-auto',
    'bg-background text-foreground',
    'focus-visible:tw-cms-dialog-outline',
  ),
  header: cn('p-4 md:p-6', 'flex-grow'),
  closeButton: 'p-4 md:p-6 focus-visible:tw-cms-outline',
  content: 'p-4 pt-0 md:p-6 md:pt-0',
  footerContent: 'flex justify-end gap-2 md:gap-4 flex-wrap',
  footer: 'p-4 pt-0 md:p-6 md:pt-0',
} as const;

const DialogContext = createContext<Pick<DialogProps, 'type' | 'onClose'>>({
  type: 'dialog',
  onClose: () => undefined,
});

const Root = (props: PropsWithChildren & Pick<DialogProps, 'type' | 'onClose'>) => {
  const { type = 'dialog', onClose, children } = props;
  return <DialogContext.Provider value={{ type, onClose }}>{children}</DialogContext.Provider>;
};

const Backdrop = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.backdrop, className)} />;
};

const Wrapper = forwardRef<HTMLDialogElement, HtmlProps<'dialog'>>((props, ref) => {
  const { className, ...rest } = props;
  const { type, onClose } = useContext(DialogContext);
  return (
    <Container
      data-dialog
      {...rest}
      as="dialog"
      ref={ref}
      className={cn(styles.wrapper, className)}
      onKeyDown={(e) => {
        if (type !== 'modal' || e.key !== 'Escape' || !onClose) return;
        e.preventDefault();
        onClose();
        rest.onKeyDown?.(e);
      }}
    />
  );
});

const Header = ({ className, ...rest }: HtmlProps<'div'>) => {
  const Component = typeof rest.children === 'string' ? 'p' : 'div';
  return <Component {...rest} className={cn(styles.header, className)} />;
};

const CloseButton = ({ children, className, ...rest }: HtmlProps<'button'>) => {
  return (
    <button type="button" autoFocus={false} {...rest} className={cn(styles.closeButton, className)}>
      {children ?? <X />}
    </button>
  );
};

const Footer = ({ submitBtn, cancelBtn, children, className, ...rest }: FooterProps) => {
  return (
    <div {...rest} className={cn(styles.footerContent, className)}>
      {children}
      {cancelBtn && (
        <Button variant="secondary" onClick={cancelBtn.onClick}>
          {cancelBtn.label}
        </Button>
      )}
      <Button onClick={submitBtn.onClick}>{submitBtn.label}</Button>
    </div>
  );
};

const Dialog = Object.assign(
  forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
    const { children, type = 'dialog', header, footer, onClose, t, ...rest } = props;
    return (
      <Root type={type} onClose={onClose}>
        <Section as="div" className={styles.root({ type })}>
          <Backdrop className={styles.backdropEnhanced({ type })} />
          <Wrapper ref={ref} {...rest}>
            {Boolean(header || onClose) && (
              <header className="flex">
                {header !== undefined && <Header>{header}</Header>}
                {onClose !== undefined && <CloseButton onClick={onClose} aria-label={t?.close} />}
              </header>
            )}
            <div className={styles.content}>{children}</div>
            {footer !== undefined && <footer className={styles.footer}>{footer}</footer>}
          </Wrapper>
        </Section>
      </Root>
    );
  }),
  { Root, Backdrop, Wrapper, Header, Footer, CloseButton },
);

export { Dialog, styles };
