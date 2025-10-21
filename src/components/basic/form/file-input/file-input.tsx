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
        isDragging={isDragging}
        error={error}
        aria-label={t('component.uploadInput.clickToUpload')}
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
            <Items>
              {fileNames.map((fileName, index) => (
                <Item key={index}>{fileName}</Item>
              ))}
            </Items>
            <CloseAllButton onClick={onClear} aria-label={t('close')} />
          </>
        ) : (
          <Placeholder>{props.placeholder}</Placeholder>
        )}
      </Wrapper>
      <Error>{error}</Error>
    </Root>
  );
});

const Wrapper = (
  props: ComponentProps<typeof FileInputBase.Wrapper> &
    Pick<FileInputProps, 'error'> & { isDragging: boolean },
) => {
  const { isDragging, error, className, ...rest } = props;
  const defaultClassNames = cn(classNames.wrapper({ isValid: !error, isDragging }), className);
  return <FileInputBase.Wrapper className={defaultClassNames} {...rest} />;
};

const Input = forwardRef<HTMLInputElement, ComponentProps<typeof FileInputBase.Input>>(
  ({ className, ...rest }, ref) => {
    return <FileInputBase.Input ref={ref} className={cn('sr-only', className)} {...rest} />;
  },
);

const Items = ({ className, ...rest }: ComponentProps<typeof FileInputBase.Items>) => {
  const defaultClassNames = cn('flex-grow grid gap-1', className);
  return <FileInputBase.Items className={defaultClassNames} {...rest} />;
};

const CloseAllButton = (props: ComponentProps<typeof FileInputBase.CloseAllButton>) => {
  return (
    <FileInputBase.CloseAllButton {...props}>
      <X height="1lh" width="auto" />
    </FileInputBase.CloseAllButton>
  );
};

const Placeholder = ({ className, ...rest }: ComponentProps<typeof FileInputBase.Placeholder>) => {
  const defaultClassNames = cn('flex-grow text-foreground/50', className);
  return <FileInputBase.Placeholder className={defaultClassNames} {...rest} />;
};

const Root = FileInputBase.Root;
const Label = FileInputBase.Label;
const Item = FileInputBase.Item;
const Error = FileInputBase.Error;

Component.displayName = 'FileInputBase';
Input.displayName = 'FileInputBase.Input';

const FileInput = Object.assign(Component, {
  Root,
  Label,
  Input,
  Items,
  Item,
  CloseAllButton,
  Placeholder,
  Error,
});

export { FileInput };
