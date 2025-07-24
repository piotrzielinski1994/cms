'use client';

import Form from '@/components/basic/form/root/form';
import { cn } from '@/utils/tailwind';
import { Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

type DropzoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  name: string;
  accept?: string;
  multiple?: boolean;
  fileNames: string[];
  onFileRemove?: (fileName: string) => void;
  error?: string;
};

const DropzoneInput = ({ fileNames, onFileRemove, error, ...props }: DropzoneInputProps) => {
  const t = useTranslations('frontend.component.uploadInput');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn(
          'p-4 bg-red-500',
          'border border-solid border-foreground',
          'bg-input text-foreground/50',
          'has-[:enabled]:hover:border-foreground/90',
          'tw-has-focus:tw-cms-outline',
          { 'bg-foreground/5': isDragging },
          { '[&:not(:focus)]:border-red-500': !!error },
          'grid gap-4',
          'cursor-pointer',
          'has-[:disabled]:cursor-not-allowed has-[:disabled]:border-foreground/50',
        )}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const { files } = e.dataTransfer;
          const target = Object.assign(e.target, { files });
          const currentTarget = Object.assign(e.currentTarget, { files });
          const newEvent = Object.assign({}, e, { target, currentTarget });
          props.onChange?.(newEvent as unknown as ChangeEvent<HTMLInputElement>);
        }}
      >
        <div className="grid justify-items-center">
          <Upload />
          <p className="">
            <strong>{t('clickToUpload')}</strong> <span>{t('orDragAndDrop')}</span>
          </p>
          <p className="">{t('extensions.image')}</p>
          <input {...props} type="file" className={cn('sr-only', props.className)} />
        </div>
        {fileNames.length > 0 && (
          <ul
            className="grid gap-1"
            onKeyDown={(e) => {
              const arrowKeys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
              if (!arrowKeys.includes(e.key)) return;
              e.preventDefault();

              const buttons = Array.from(e.currentTarget.querySelectorAll('button'));
              const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
              const offset = ['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : -1;

              buttons[(index + offset + buttons.length) % buttons.length]?.focus();
            }}
          >
            {fileNames.map((fileName, index) => (
              <li key={index}>
                <button
                  type="button"
                  disabled={props.disabled}
                  tabIndex={index === 0 ? 0 : -1}
                  className={cn(
                    'w-full p-2',
                    'grid grid-cols-[1fr_auto] gap-2',
                    'border border-current',
                    'bg-background text-foreground',
                    'text-xs text-left',
                    'enabled:hover:bg-foreground/5',
                    'disabled:cursor-not-allowed disabled:text-foreground/50',
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    onFileRemove?.(fileName);
                  }}
                >
                  <span>{fileName}</span>
                  <X height="1lh" width="auto" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </label>
      <Form.Error>{error}</Form.Error>
    </div>
  );
};

export { DropzoneInput };
