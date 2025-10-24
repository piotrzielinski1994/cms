import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { Circle } from 'lucide-react';
import { forwardRef } from 'react';
import { checkboxClassNames } from '../checkbox/checkbox';
import Form from '../root/form';

type RadioProps = NativeProps & {
  label: string;
  error?: string;
};

// prettier-ignore
type NativeProps = Omit<EnhancedHtmlProps<'input', {
  name: string;
  value?: string;
}>, 'type'>;

const classNames = {
  wrapper: ({ isValid }: { isValid: boolean }) =>
    cn(checkboxClassNames.checkbox({ isValid }), 'rounded-full'),
  icon: cn(checkboxClassNames.icon, 'w-[0.4lh] h-[0.4lh]', 'fill-current'),
};

const Component = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { label, error, className, ...rest } = props;
  return (
    <Root className={className}>
      <Label className={checkboxClassNames.wrapper}>
        <Input ref={ref} aria-invalid={!!error} {...rest} />
        <span>{label}</span>
      </Label>
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLInputElement, NativeProps>((props, ref) => {
  const { className, ...rest } = props;
  const base = classNames.wrapper({ isValid: !props['aria-invalid'] });
  return (
    <div className={cn(base, className)}>
      <input ref={ref} type="radio" className="sr-only" {...rest} />
      <Circle className={classNames.icon} />
    </div>
  );
});

const Root = Form.Group;
const Label = Form.Label;
const Error = Form.Error;

const Radio = Object.assign(Component, { Root, Label, Input, Error, classNames });

export { Radio };
