'use client';

import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, ReactNode, useState } from 'react';
import Form from '../root/form';
import { styles as testInputStyles } from '../text-input/text-input';

type FileInputProps = NativeProps & {
  label?: ReactNode;
  error?: string;
  fileNames: string[];
  onClear?: () => void;
};

// prettier-ignore
type NativeProps = Omit<EnhancedHtmlProps<'input', {
  name: string;
  accept?: string;
  multiple?: boolean;
}>, 'type'>;

const styles = {
  wrapper: ({ isValid, isDragging }: { isValid: boolean; isDragging: boolean }) =>
    cn(
      testInputStyles.native({ isValid }),
      'has-[:enabled]:hover:border-foreground/90 has-[:enabled]:hover:ring-foreground/90',
      'has-[:disabled]:text-foreground/50',
      { 'has-[:enabled]:ring-1': isDragging },
      'flex items-start gap-2',
      'cursor-pointer has-[:disabled]:cursor-not-allowed',
    ),
  native: 'sr-only',
  items: 'flex-grow grid gap-1',
  placeholder: 'flex-grow text-foreground/50',
} as const;

const Component = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const { fileNames, onClear, label, error, className, ...rest } = props;
  const t = useTranslations('frontend');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Root className={className}>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Wrapper
        isDragging={isDragging}
        aria-invalid={!!error}
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
        <Native ref={ref} {...rest} />
        <Upload />
        {fileNames.length > 0 ? (
          <>
            <Items>
              {fileNames.map((fileName, index) => {
                return <Item key={index}>{fileName}</Item>;
              })}
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

const Wrapper = (props: ComponentPropsWithoutRef<'label'> & { isDragging: boolean }) => {
  const { isDragging, className, ...rest } = props;
  const base = styles.wrapper({ isValid: !rest['aria-invalid'], isDragging });
  return <label {...rest} className={cn(base, className)} />;
};

const Native = forwardRef<HTMLInputElement, NativeProps>(({ className, ...rest }, ref) => {
  return <input ref={ref} type="file" className={cn(styles.native, className)} {...rest} />;
});

const Items = ({ className, ...rest }: HtmlProps<'ul'>) => {
  return <ul className={cn(styles.items, className)} {...rest} />;
};

const Item = (props: HtmlProps<'li'>) => {
  return <li {...props} />;
};

const CloseAllButton = ({ children, ...rest }: HtmlProps<'button'>) => {
  return (
    <button type="button" {...rest}>
      {children ?? <X height="1lh" width="auto" />}
    </button>
  );
};

const Placeholder = ({ className, ...rest }: HtmlProps<'span'>) => {
  return <span className={cn(styles.placeholder, className)} {...rest} />;
};

const Root = Form.Group;
const Label = Form.Label;
const Error = Form.Error;

const FileInput = Object.assign(Component, {
  Root,
  Label,
  Native,
  Items,
  Item,
  CloseAllButton,
  Placeholder,
  Error,
});

export { FileInput, styles };
