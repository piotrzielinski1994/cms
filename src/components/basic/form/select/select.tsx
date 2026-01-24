import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { ChevronDown } from 'lucide-react';
import { forwardRef, ReactNode } from 'react';
import Form from '../root/form';
import { styles as textInputStyles } from '../text-input/text-input';

type SelectProps = Omit<NativeProps, 'children'> & {
  label?: ReactNode;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
};

// prettier-ignore
type NativeProps = EnhancedHtmlProps<'select', {
  name: string;
  value?: string;
}>;

const styles = {
  wrapper: 'grid items-center',
  select: ({ isEmpty, isValid }: BoolMap<'isEmpty' | 'isValid'>) =>
    cn(
      'appearance-none',
      '[&:not(:disabled)]:cursor-pointer',
      textInputStyles.native({ isValid }),
      'border-foreground',
      { '[&:not(:focus)]:border-red-500': !isValid },
      'col-start-1 row-start-1',
      { 'text-foreground': !isEmpty, 'text-foreground/50': isEmpty },
    ),
  option: 'text-foreground',
  placeholder: 'text-foreground/50',
  icon: 'col-start-1 row-start-1 justify-self-end mr-1',
} as const;

const Component = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { label, error, options, placeholder = '', ...rest } = props;
  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Wrapper className={styles.wrapper}>
        <Native ref={ref} {...rest}>
          <Option value="" className={styles.placeholder}>
            {placeholder}
          </Option>
          {options.map((o) => {
            // prettier-ignore
            return <Option key={o.value} value={o.value}>{o.label}</Option>;
          })}
        </Native>
        <ChevronDown size="1rem" className={styles.icon} />
      </Wrapper>
      <Error>{error}</Error>
    </Root>
  );
});

const Wrapper = (props: HtmlProps<'div'>) => {
  return <div {...props} />;
};

const Native = forwardRef<HTMLSelectElement, NativeProps>((props, ref) => {
  const { className, ...rest } = props;
  const base = styles.select({
    isEmpty: rest.value !== '',
    isValid: !rest['aria-invalid'],
  });
  return <select ref={ref} className={cn(base, className)} {...rest} />;
});

const Option = forwardRef<HTMLOptionElement, HtmlProps<'option'>>((props, ref) => {
  const { className, ...rest } = props;
  return <option ref={ref} className={cn(styles.option, className)} {...rest} />;
});

const Root = Form.Group;
const Label = Form.Label;
const Error = Form.Error;

const Select = Object.assign(Component, { Root, Label, Native, Error });

export { Select };
