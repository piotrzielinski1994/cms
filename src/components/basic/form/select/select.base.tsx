import { HtmlProps } from '@/utils/html/html.types';
import { DetailedHTMLProps, forwardRef, OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import Form from '../root/form';

type NativeSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
type SelectProps = Omit<NativeSelectProps, 'name' | 'value'> & {
  name: string;
  value?: string;
};

type OptionProps = DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;

const Wrapper = (props: HtmlProps['div']) => {
  return <div {...props} />;
};

const Native = forwardRef<HTMLSelectElement, Omit<SelectProps, 'placeholder'>>((props, ref) => {
  return <select ref={ref} {...props} />;
});

const Option = forwardRef<HTMLOptionElement, OptionProps>((props, ref) => {
  return <option ref={ref} {...props} />;
});

Native.displayName = 'SelectBase.Native';
Option.displayName = 'SelectBase.Option';

const SelectBase = {
  Root: Form.Group,
  Label: Form.Label,
  Wrapper,
  Native,
  Option,
  Error: Form.Error,
};

export default SelectBase;
