import { cn } from '@/utils/tailwind';
import { Check } from 'lucide-react';
import { ComponentProps, forwardRef } from 'react';
import CheckboxBase from './checkbox.base';

type CheckboxProps = ComponentProps<typeof CheckboxBase.Input> & {
  label: string;
  error?: string;
};

const checkboxClassNames = {
  wrapper: cn(
    'group',
    'has-[:disabled]:text-foreground/50',
    'grid grid-cols-[auto_1fr] gap-2',
    'cursor-pointer has-[:disabled]:cursor-not-allowed',
  ),
  checkbox: ({ isValid }: { isValid: boolean }) => {
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
      <Label className={checkboxClassNames.wrapper}>
        <Input ref={ref} error={error} {...rest} />
        <span>{label}</span>
      </Label>
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLInputElement, Omit<CheckboxProps, 'label'>>((props, ref) => {
  const { error, className, ...rest } = props;
  return (
    <div className={cn(checkboxClassNames.checkbox({ isValid: !error }), className)}>
      <CheckboxBase.Input ref={ref} className="sr-only" {...rest} />
      <Check className={checkboxClassNames.icon} />
    </div>
  );
});

const Root = CheckboxBase.Root;
const Label = CheckboxBase.Label;
const Error = CheckboxBase.Error;

const Checkbox = Object.assign(Component, { Root, Label, Input, Error });

export { Checkbox, checkboxClassNames };
