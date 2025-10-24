import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';
import Form from '../root/form';

type CheckboxProps = NativeProps & {
  label: string;
  error?: string;
};

// prettier-ignore
type NativeProps = EnhancedHtmlProps<'input', {
  name: string;
  value?: string;
}>;

const styles = {
  wrapper: cn(
    'group',
    'has-[:disabled]:text-foreground/50',
    'grid grid-cols-[auto_1fr] gap-2',
    'cursor-pointer has-[:disabled]:cursor-not-allowed',
  ),
  native: ({ isValid }: { isValid: boolean }) => {
    return cn(
      'w-[1lh] h-[1lh]',
      'border border-solid border-current bg-input',
      'group-hover:group-has-[input:enabled]:border-foreground/90',
      'group-hover:group-has-[input:enabled]:ring-foreground/90',
      { '[&:not(:focus)]:text-red-500': !isValid },
      'ring-inset tw-has-focus:ring-1 ring-current',
      'grid place-items-center',
    );
  },
  icon: cn('hidden group-has-[:checked]:block', 'w-[0.7lh] h-[0.7lh]'),
};

const Component = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, error, ...rest } = props;
  return (
    <Root>
      <Label className={styles.wrapper}>
        <Input ref={ref} aria-invalid={!!error} {...rest} />
        <span>{label}</span>
      </Label>
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLInputElement, NativeProps>((props, ref) => {
  const { className, ...rest } = props;
  const base = styles.native({ isValid: !rest['aria-invalid'] });
  return (
    <div className={cn(base, className)}>
      <input ref={ref} type="checkbox" className="sr-only" {...rest} />
      <Check className={styles.icon} />
    </div>
  );
});

const Root = Form.Group;
const Label = Form.Label;
const Error = Form.Error;

const Checkbox = Object.assign(Component, { Root, Label, Input, Error });

export { Checkbox, styles };
