import { Button } from '@/components/basic/button/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

type DialogProps = ComponentPropsWithoutRef<'dialog'> & {
  type?: 'dialog' | 'modal';
  header?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
};
type FooterProps = ComponentPropsWithoutRef<'div'> & {
  submitBtn: {
    label: string;
    onClick: () => void;
  };
  cancelBtn?: {
    label: string;
    onClick: () => void;
  };
};

const Root = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, type = 'dialog', header, footer, onClose, className, ...rest }, ref) => {
    const t = useTranslations('frontend');

    return (
      <>
        <Section
          as="div"
          className={cn('fixed inset-0 z-dialog', 'py-4 sm:py-6', 'hidden has-[:open]:grid', {
            'pointer-events-none': type === 'dialog',
          })}
        >
          <Backdrop className={cn({ 'backdrop-blur-none': type === 'dialog' })} />
          <Container
            data-dialog
            {...rest}
            as="dialog"
            ref={ref}
            className={cn(
              'relative z-dialog overflow-visible pointer-events-auto',
              'bg-background text-foreground',
              'focus-visible:tw-cms-dialog-outline',
              className,
            )}
            onKeyDown={(e) => {
              if (type === 'modal' && e.key === 'Escape' && onClose) {
                e.preventDefault();
                onClose();
              }
            }}
          >
            {Boolean(header || onClose) && (
              <header className="flex">
                {header !== undefined && <Header>{header}</Header>}
                {onClose !== undefined && (
                  <button
                    className="p-2 focus-visible:tw-cms-outline"
                    onClick={onClose}
                    aria-label={t('close')}
                    autoFocus={false}
                  >
                    <X />
                  </button>
                )}
              </header>
            )}
            <div className="p-2">{children}</div>
            {footer !== undefined && <footer className="p-2">{footer}</footer>}
          </Container>
        </Section>
      </>
    );
  },
);

const Backdrop = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        'fixed inset-0 z-backdrop backdrop-blur-sm',
        'bg-foreground/50 dark:bg-foreground/10',
        className,
      )}
    />
  );
};

const Header = ({ children }: PropsWithChildren) => {
  const Component = typeof children === 'string' ? 'p' : 'div';
  return <Component className="flex-grow p-2">{children}</Component>;
};

const Footer = ({ className, submitBtn, cancelBtn, ...props }: FooterProps) => {
  return (
    <div {...props} className={cn('flex justify-end gap-2 flex-wrap', className)}>
      {cancelBtn && (
        <Button variant="secondary" onClick={cancelBtn.onClick}>
          {cancelBtn.label}
        </Button>
      )}
      <Button onClick={submitBtn.onClick}>{submitBtn.label}</Button>
    </div>
  );
};

Root.displayName = 'Dialog.Root';

const Dialog = { Root, Backdrop, Footer };
export default Dialog;
