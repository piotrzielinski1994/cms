'use client';

import { cn } from '@/utils/tailwind';
import { Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

type UploadInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  accept?: string;
  multiple?: boolean;
  fileNames: string[];
  onFileRemove?: (fileName: string) => void;
};

const UploadInput = ({ fileNames, onFileRemove, ...props }: UploadInputProps) => {
  const t = useTranslations('frontend.component.uploadInput');
  const [isDragging, setIsDragging] = useState(false);
  console.log('@@@ fileNames | ', fileNames);
  return (
    <>
      <label
        className={cn(
          'p-4 bg-red-500',
          'border border-solid border-foreground',
          'bg-input text-foreground/50',
          'has-[:enabled]:hover:border-foreground/90',
          'tw-has-focus:tw-cms-outline',
          { 'bg-foreground/5': isDragging },
          'grid gap-4',
          'cursor-pointer',
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
          <ul className="grid gap-1">
            {fileNames.map((fileName, index) => {
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => onFileRemove?.(fileName)}
                    className={cn(
                      'w-full p-2',
                      'grid grid-cols-[1fr_auto] gap-2',
                      'border border-foreground',
                      'bg-background text-foreground',
                      'text-xs text-left',
                      'hover:bg-foreground/5',
                    )}
                  >
                    <span>{fileName}</span>
                    <X height="1lh" width="auto" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </label>
    </>
  );
};

export { UploadInput };
