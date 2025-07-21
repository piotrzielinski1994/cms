'use client';

import { cn } from '@/utils/tailwind';
import { Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

type UploadInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  accept?: string;
  multiple?: boolean;
  fileNames?: string[];
  onFileRemove?: (fileName: string) => void;
};

const UploadInput = ({ fileNames = [], onFileRemove, ...props }: UploadInputProps) => {
  // TODO: Move out of local state
  const [isDragging, setIsDragging] = useState(false);
  const t = useTranslations('frontend.component.uploadInput');

  return (
    <label
      className={cn(
        'p-4 bg-red-500',
        'border border-solid border-foreground',
        'bg-input text-foreground/50',
        'has-[:enabled]:hover:border-foreground/90 has-[:enabled]:hover:bg-foreground/5',
        { 'bg-foreground/5': isDragging },
        'grid gap-2',
        'cursor-pointer',
      )}
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
      onDragLeave={() => setIsDragging(false)}
    >
      <div className="grid justify-items-center">
        <Upload />
        <p className="">
          <strong>{t('clickToUpload')}</strong> <span>{t('orDragAndDrop')}</span>
        </p>
        <p className="">{t('extensions.image')}</p>
        <input {...props} type="file" className={cn('hidden', props.className)} />
      </div>
      <ul className="grid" hidden={fileNames.length === 0}>
        {fileNames.map((fileName, index) => {
          return (
            <li key={index} className={cn('grid grid-cols-[1fr_auto] gap-2')}>
              <span className="text-foreground">{fileName}</span>
              <button
                type="button"
                onClick={() => onFileRemove?.(fileName)}
                className={cn(
                  'h-[1lh] w-[1lh]',
                  'grid place-items-center',
                  '-mr-[calc((1lh-1em)/2)]',
                )}
              >
                <X height="1em" width="auto" className="text-red-500" />
              </button>
            </li>
          );
        })}
      </ul>
    </label>
  );
};

export { UploadInput };
