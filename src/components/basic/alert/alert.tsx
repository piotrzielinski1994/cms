import { cn } from '@/utils/tailwind';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { JSX, PropsWithChildren } from 'react';

type AlertType = 'success' | 'info' | 'warn' | 'error';
type AlertProps = PropsWithChildren & {
  type?: AlertType;
  onClose?: () => void;
};

const Alert = ({ type = 'info', onClose, children }: AlertProps) => {
  const t = useTranslations('frontend');
  return (
    <div role="alert" className={cn('p-2', 'flex gap-2 flex-wrap', colorMap[type])}>
      {iconMap[type]}
      <div className="flex-grow">{children}</div>
      {onClose && (
        <button type="button" className="w-[1lh] h-[1lh]" aria-label={t('close')} onClick={onClose}>
          <X />
        </button>
      )}
    </div>
  );
};

const iconMap = {
  success: <CheckCircle className="w-[1lh] h-[1lh]" />,
  info: <Info className="w-[1lh] h-[1lh]" />,
  warn: <AlertTriangle className="w-[1lh] h-[1lh]" />,
  error: <XCircle className="w-[1lh] h-[1lh]" />,
} satisfies Record<AlertType, JSX.Element>;

const colorMap = {
  success: 'bg-green-500 text-green-950',
  info: 'bg-blue-500 text-blue-950',
  warn: 'bg-orange-500 text-orange-950',
  error: 'bg-red-500 text-red-950',
} satisfies Record<AlertType, string>;

export { Alert };
