import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { forwardRef } from 'react';
import Form from '../root/form';

// prettier-ignore
type SelectProps = EnhancedHtmlProps<'select', {
  name: string;
  value?: string;
}>;

const Wrapper = (props: HtmlProps['div']) => {
  return <div {...props} />;
};

const Native = forwardRef<HTMLSelectElement, Omit<SelectProps, 'placeholder'>>((props, ref) => {
  return <select ref={ref} {...props} />;
});

const Option = forwardRef<HTMLOptionElement, HtmlProps['option']>((props, ref) => {
  return <option ref={ref} {...props} />;
});

const SelectBase = {
  Root: Form.Group,
  Label: Form.Label,
  Wrapper,
  Native,
  Option,
  Error: Form.Error,
};

export default SelectBase;
