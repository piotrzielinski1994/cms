import { cn } from '@/utils/tailwind';
import { Circle } from 'lucide-react';
import { ComponentProps, forwardRef } from 'react';
import { checkboxClassNames } from '../checkbox/checkbox';
import RadioBase from './radio.base';

type RadioProps = ComponentProps<typeof RadioBase.Input> & {
  label: string;
  error?: string;
};

const Component = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
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

const Input = forwardRef<HTMLInputElement, Omit<RadioProps, 'label'>>((props, ref) => {
  const { error, className, ...rest } = props;
  const classNames = {
    wrapper: cn(checkboxClassNames.checkbox({ isValid: !error }), 'rounded-full', className),
    icon: cn(checkboxClassNames.icon, 'w-[0.4lh] h-[0.4lh]', 'fill-current'),
  };

  return (
    <div className={classNames.wrapper}>
      <RadioBase.Input ref={ref} className="sr-only" {...rest} />
      <Circle className={classNames.icon} />
    </div>
  );
});

const Root = RadioBase.Root;
const Label = RadioBase.Label;
const Error = RadioBase.Error;

const Radio = Object.assign(Component, { Root, Label, Input, Error });

export { Radio };
