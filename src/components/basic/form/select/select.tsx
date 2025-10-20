import { cn } from '@/utils/tailwind';
import { ChevronDown } from 'lucide-react';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import { inputClassNames } from '../text-input/text-input';
import SelectBase from './select.base';

type SelectProps = {
  label?: ReactNode;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
} & Omit<ComponentProps<typeof SelectBase.Native>, 'children'>;

const selectClassNames = {
  select: ({ isEmpty, isValid }: { isEmpty: boolean; isValid: boolean }) =>
    cn(
      'appearance-none',
      '[&:not(:disabled)]:cursor-pointer',
      inputClassNames.input({ isValid }),
      'border-foreground',
      { '[&:not(:focus)]:border-red-500': !isValid },
      'col-start-1 row-start-1',
      { 'text-foreground': !isEmpty, 'text-foreground/50': isEmpty },
    ),
  option: 'text-foreground',
  icon: 'col-start-1 row-start-1 justify-self-end mr-1',
};

const Component = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { label, error, options, placeholder = '', ...rest } = props;
  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Wrapper className="grid items-center">
        <Native ref={ref} {...rest}>
          <Option value="" className="text-foreground/50">
            {placeholder}
          </Option>
          {options.map((o) => {
            return (
              <Option key={o.value} value={o.value}>
                {o.label}
              </Option>
            );
          })}
        </Native>
        <ChevronDown size="1rem" className={selectClassNames.icon} />
      </Wrapper>
      <Error>{error}</Error>
    </Root>
  );
});

const Native = forwardRef<
  HTMLSelectElement,
  ComponentProps<typeof SelectBase.Native> & Pick<SelectProps, 'error'>
>(({ error, className, ...rest }, ref) => {
  const classNames = cn(
    selectClassNames.select({ isEmpty: rest.value !== '', isValid: !error }),
    className,
  );
  return <SelectBase.Native ref={ref} className={classNames} {...rest} />;
});

const Option = forwardRef<HTMLOptionElement, ComponentProps<typeof SelectBase.Option>>(
  ({ className, ...rest }, ref) => {
    const classNames = cn(selectClassNames.option, className);
    return <SelectBase.Option ref={ref} className={classNames} {...rest} />;
  },
);

const Root = SelectBase.Root;
const Label = SelectBase.Label;
const Wrapper = SelectBase.Wrapper;
const Error = SelectBase.Error;

Component.displayName = 'Select';
Native.displayName = 'Select.Native';
Option.displayName = 'Select.Option';

const Select = Object.assign(Component, { Root, Label, Native, Error });

export { Select };
