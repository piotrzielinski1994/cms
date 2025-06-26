import { cn } from '@/utils/tailwind';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { JSX, PropsWithChildren } from 'react';

type AlertType = 'success' | 'info' | 'warn' | 'error';
type AlertProps = PropsWithChildren & {
  type?: AlertType;
};

const Alert = ({ type = 'info', children }: AlertProps) => {
  return (
    <div role="alert" className={cn('p-2', 'flex gap-2 flex-wrap', colorMap[type])}>
      {iconMap[type]}
      <div>{children}</div>
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
