'use client';

import Form from '@/components/basic/form/root/form';
import { cn } from '@/utils/tailwind';
import { Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { inputClassNames } from '../text-input/text-input';

type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  name: string;
  accept?: string;
  multiple?: boolean;
  fileNames: string[];
  onClear?: () => void;
  error?: string;
};

const FileInput = ({ fileNames, onClear, error, ...props }: FileInputProps) => {
  const t = useTranslations('frontend');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        aria-label={t('component.uploadInput.clickToUpload')}
        className={cn(
          inputClassNames.input({ isValid: !error }),
          'has-[:enabled]:hover:border-foreground/90 has-[:enabled]:hover:ring-foreground/90',
          { 'has-[:enabled]:ring-1': isDragging },
          'flex items-start gap-2',
          'cursor-pointer has-[:disabled]:cursor-not-allowed',
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
        <input type="file" {...props} className={cn('sr-only', props.className)} />
        <div>
          <Upload />
        </div>
        {fileNames.length > 0 ? (
          <>
            <ul className="flex-grow grid gap-1">
              {fileNames.map((fileName, index) => (
                <li key={index}>
                  <span>{fileName}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={onClear} aria-label={t('close')}>
              <X height="1lh" width="auto" />
            </button>
          </>
        ) : (
          <span className="flex-grow text-foreground/50">{props.placeholder}</span>
        )}
      </label>
      <Form.Error>{error}</Form.Error>
    </div>
  );
};

export { FileInput };
