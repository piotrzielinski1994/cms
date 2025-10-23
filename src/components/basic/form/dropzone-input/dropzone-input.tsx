'use client';

import Form from '@/components/basic/form/root/form';
import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { Upload, X } from 'lucide-react';
import { ChangeEvent, forwardRef, ReactNode, useState } from 'react';

type DropzoneInputProps = NativeProps & {
  label?: ReactNode;
  error?: string;
  fileNames: string[];
  onFileRemove?: (fileName: string, index: number) => void;
  t: {
    clickToUpload: ReactNode;
    orDragAndDrop: ReactNode;
    fileExtensions: ReactNode;
  };
};

// prettier-ignore
type NativeProps = EnhancedHtmlProps<'input', {
  name: string;
  accept?: string;
  multiple?: boolean;
}>;

const classNames = {
  wrapper: ({ isValid, isDragging }: { isValid: boolean; isDragging: boolean }) =>
    cn(
      'p-4 bg-red-500',
      'border border-solid border-foreground',
      'bg-input text-foreground/50',
      'has-[:enabled]:hover:border-foreground/90',
      'tw-has-focus:tw-cms-outline',
      { 'bg-foreground/5': isDragging },
      { '[&:not(:focus)]:border-red-500': !isValid },
      'grid gap-4',
      'cursor-pointer',
      'has-[:disabled]:cursor-not-allowed has-[:disabled]:border-foreground/50',
    ),
  itemButton: cn(
    'w-full p-2',
    'grid grid-cols-[1fr_auto] gap-2',
    'border border-current',
    'bg-background text-foreground',
    'text-xs text-left',
    'enabled:hover:bg-foreground/5',
    'disabled:cursor-not-allowed disabled:text-foreground/50',
  ),
};

const Component = ({ fileNames, onFileRemove, label, error, t, ...rest }: DropzoneInputProps) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Wrapper
        isDragging={isDragging}
        aria-invalid={!!error}
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
          rest.onChange?.(newEvent as unknown as ChangeEvent<HTMLInputElement>);
        }}
      >
        <div className="grid justify-items-center">
          <Upload />
          <p>
            <strong>{t.clickToUpload}</strong> <span>{t.orDragAndDrop}</span>
          </p>
          <p>{t.fileExtensions}</p>
          <Input aria-invalid={!!error} {...rest} />
        </div>
        {fileNames.length > 0 && (
          <Items
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
              <Item key={index}>
                <ItemButton
                  disabled={rest.disabled}
                  tabIndex={index === 0 ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    onFileRemove?.(fileName, index);
                  }}
                >
                  <span>{fileName}</span>
                  <X height="1lh" width="auto" />
                </ItemButton>
              </Item>
            ))}
          </Items>
        )}
      </Wrapper>
      <Form.Error>{error}</Form.Error>
    </Root>
  );
};

const Wrapper = (props: EnhancedHtmlProps<'label', { isDragging: boolean }>) => {
  const { isDragging, className, ...rest } = props;
  const base = classNames.wrapper({ isValid: !rest['aria-invalid'], isDragging });
  return <label className={cn(base, className)} {...rest} />;
};

const Input = forwardRef<HTMLInputElement, NativeProps>(({ className, ...rest }, ref) => {
  return <input ref={ref} type="file" className={cn('sr-only', className)} {...rest} />;
});

const Items = ({ className, ...rest }: HtmlProps['ul']) => {
  return <ul className={cn('grid gap-1', className)} {...rest} />;
};

const Item = (props: HtmlProps['li']) => {
  return <li {...props} />;
};

const ItemButton = (props: HtmlProps['button']) => {
  const { className, ...rest } = props;
  return <button type="button" className={cn(classNames.itemButton, className)} {...rest} />;
};

const Placeholder = (props: HtmlProps['span']) => {
  const { className, ...rest } = props;
  const defaultClassNames = cn('flex-grow text-foreground/50', className);
  return <span className={defaultClassNames} {...rest} />;
};

const Root = Form.Group;
const Label = Form.Label;

const DropzoneInput = Object.assign(Component, {
  Root,
  Label,
  Input,
  Items,
  Item,
  ItemButton,
  Placeholder,
  Error,
});

export { DropzoneInput };
