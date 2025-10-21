'use client';

import { cn } from '@/utils/tailwind';
import { Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, ComponentProps, forwardRef, ReactNode, useState } from 'react';
import { inputClassNames } from '../text-input/text-input';
import FileInputBase from './file-input.base';

type FileInputProps = ComponentProps<typeof FileInputBase.Input> & {
  label?: ReactNode;
  error?: string;
  fileNames: string[];
  onClear?: () => void;
};

const classNames = {
  wrapper: ({ isValid, isDragging }: { isValid: boolean; isDragging: boolean }) =>
    cn(
      inputClassNames.input({ isValid }),
      'has-[:enabled]:hover:border-foreground/90 has-[:enabled]:hover:ring-foreground/90',
      { 'has-[:enabled]:ring-1': isDragging },
      'flex items-start gap-2',
      'cursor-pointer has-[:disabled]:cursor-not-allowed',
    ),
};

const Component = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const { fileNames, onClear, label, error, ...rest } = props;
  const t = useTranslations('frontend');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Wrapper
        aria-label={t('component.uploadInput.clickToUpload')}
        className={classNames.wrapper({ isValid: !error, isDragging })}
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
        <Input ref={ref} {...rest} />
        <Upload />
        {fileNames.length > 0 ? (
          <>
            <ul className="flex-grow grid gap-1">
              {fileNames.map((fileName, index) => (
                <li key={index}>
                  <span>{fileName}</span>
                </li>
              ))}
            </ul>
            <CloseAllButton onClick={onClear} aria-label={t('close')} />
          </>
        ) : (
          <span className="flex-grow text-foreground/50">{props.placeholder}</span>
        )}
      </Wrapper>
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLInputElement, ComponentProps<typeof FileInputBase.Input>>(
  ({ className, ...rest }, ref) => {
    return <FileInputBase.Input ref={ref} className={cn('sr-only', className)} {...rest} />;
  },
);

const CloseAllButton = (props: ComponentProps<typeof FileInputBase.CloseAllButton>) => {
  return (
    <FileInputBase.CloseAllButton {...props}>
      <X height="1lh" width="auto" />
    </FileInputBase.CloseAllButton>
  );
};

const Root = FileInputBase.Root;
const Label = FileInputBase.Label;
const Wrapper = FileInputBase.Wrapper;
const Error = FileInputBase.Error;

Component.displayName = 'FileInputBase';
Input.displayName = 'FileInputBase.Input';

const FileInput = Object.assign(Component, { Root, Label, Input, CloseAllButton, Error });

export { FileInput };
