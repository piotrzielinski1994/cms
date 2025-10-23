import { cn } from '@/utils/tailwind';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import { inputClassNames } from '../text-input/text-input';
import NumberInputBase from './number-input.base';

type NumberInputProps = ComponentProps<typeof NumberInputBase.Input> & {
  label?: ReactNode;
  error?: string;
  t?: {
    increment: string;
    decrement: string;
  };
};

const Component = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const { label, error, t, ...rest } = props;
  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Wrapper className="relative">
        <Input ref={ref} error={error} {...rest} />
        <div className="absolute inset-y-0 right-1 flex flex-col justify-center">
          <Button mode="increment" disabled={rest.disabled} aria-label={t?.increment}>
            <ChevronUp size="1rem" />
          </Button>
          <Button mode="decrement" disabled={rest.disabled} aria-label={t?.decrement}>
            <ChevronDown size="1rem" />
          </Button>
        </div>
      </Wrapper>
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLInputElement, Omit<NumberInputProps, 'label'>>((props, ref) => {
  const { error, className, ...rest } = props;
  const classNames = cn(inputClassNames.input({ isValid: !error }), 'w-full pr-6', className);
  return <NumberInputBase.Input ref={ref} {...rest} className={classNames} />;
});

const Root = NumberInputBase.Root;
const Label = NumberInputBase.Label;
const Wrapper = NumberInputBase.Wrapper;
const Button = NumberInputBase.Button;
const Error = NumberInputBase.Error;

const NumberInput = Object.assign(Component, { Root, Label, Input, Error });

export { NumberInput };
