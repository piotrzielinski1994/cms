import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from 'react';
import { Button } from '../button/button';

type DialogProps = ComponentPropsWithoutRef<'dialog'> & {
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

const Root = ({ children, header, footer, onClose, className, ...rest }: DialogProps) => {
  const t = useTranslations('frontend');

  return (
    <>
      <Backdrop />
      <Section as="div" className={cn('fixed inset-0 z-dialog', 'py-4 sm:py-6')}>
        <Container
          {...rest}
          as="dialog"
          open
          className={cn('relative', 'bg-background text-foreground', className)}
        >
          {(header !== undefined || onClose !== undefined) && (
            <header className="flex">
              {header !== undefined && <Header>{header}</Header>}
              <div className="flex-grow p-2"></div>
              {onClose !== undefined && (
                <button className="p-2 border-solid" onClick={onClose} aria-label={t('close')}>
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
};

const Backdrop = () => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-backdrop backdrop-blur-sm',
        'bg-foreground/50 dark:bg-foreground/10',
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

const Dialog = { Root, Backdrop, Footer };
export default Dialog;
