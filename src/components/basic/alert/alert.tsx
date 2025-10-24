import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

type AlertType = 'success' | 'info' | 'warn' | 'error';
type RootProps = EnhancedHtmlProps<'div', { type?: AlertType }>;
type AlertProps = RootProps & {
  onClose?: () => void;
  t?: {
    close: string;
  };
};

const styles = {
  root: cn('p-2', 'flex gap-2 flex-wrap'),
  wrapper: 'flex-grow',
  closeButton: 'w-[1lh] h-[1lh]',
};

const Component = ({ type = 'info', onClose, t, children, ...rest }: AlertProps) => {
  return (
    <Root type={type} {...rest}>
      {iconMap[type]}
      <Wrapper>{children}</Wrapper>
      {onClose && (
        <CloseButton className={styles.closeButton} aria-label={t?.close} onClick={onClose}>
          <X />
        </CloseButton>
      )}
    </Root>
  );
};

const Root = ({ type = 'info', className, ...rest }: RootProps) => {
  return <div role="alert" {...rest} className={cn(styles.root, colorMap[type], className)} />;
};

const Wrapper = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.wrapper, className)} />;
};

const CloseButton = ({ className, ...rest }: HtmlProps<'button'>) => {
  return <button type="button" {...rest} className={cn(styles.closeButton, className)} />;
};

const iconMap = {
  success: <CheckCircle className="w-[1lh] h-[1lh]" />,
  info: <Info className="w-[1lh] h-[1lh]" />,
  warn: <AlertTriangle className="w-[1lh] h-[1lh]" />,
  error: <XCircle className="w-[1lh] h-[1lh]" />,
} satisfies Record<AlertType, ReactNode>;

const colorMap = {
  success: 'bg-green-500 text-green-950',
  info: 'bg-blue-500 text-blue-950',
  warn: 'bg-orange-500 text-orange-950',
  error: 'bg-red-500 text-red-950',
} satisfies Record<AlertType, string>;

const Alert = Object.assign(Component, { Root, Wrapper, CloseButton });

export { Alert, styles };
